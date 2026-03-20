let mouseX = 0;
let mouseY = 0;
const player = document.getElementById("player");
const map = document.querySelector(".map");
const zones = Array.from(document.querySelectorAll(".zone"));
const obstacles = [];
const binds = {
  up: "keyw",
  down: "keys",
  left: "keya",
  right: "keyd",
  ability: "space",
};

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (document.pointerLockElement === gameArea) {
    // rotation relative
    const angleDelta = e.movementX; // déplacement horizontal
    playerRotation += angleDelta * 0.2; // facteur de sensibilité
    player.style.transform = `rotate(${playerRotation}deg)`;
  }
});

// --- HUD attaché au player (création) ---
if (!player.querySelector(".player-hud")) {
  const hud = document.createElement("div");
  hud.className = "player-hud";

  // pseudo
  const nameEl = document.createElement("div");
  nameEl.className = "player-name";
  nameEl.textContent = localStorage.getItem("playerName") || "Player";
  hud.appendChild(nameEl);

  // conteneur des barres
  const healthWrap = document.createElement("div");
  healthWrap.className = "health-wrap";

  // barre 1
  const hb1 = document.createElement("div");
  hb1.className = "health-bar";
  const hb1fill = document.createElement("div");
  hb1fill.className = "health-fill";
  hb1fill.style.width = "100%"; // full au début
  hb1.appendChild(hb1fill);

  // barre 2
  const hb2 = document.createElement("div");
  hb2.className = "health-bar";
  const hb2fill = document.createElement("div");
  hb2fill.className = "health-fill";
  hb2fill.style.width = "100%";
  hb2.appendChild(hb2fill);

  healthWrap.appendChild(hb1);
  healthWrap.appendChild(hb2);

  hud.appendChild(healthWrap);

  player.appendChild(hud);

  // expose references si tu veux manipuler plus tard
  player._hud = {
    root: hud,
    nameEl,
    healthWrap,
    hb1fill,
    hb2fill,
  };
}

// Mettre à jour la position du pseudo à chaque frame
function updatePlayerPosition() {
  // --- Déplacement joueur ---
  let vx = 0;
  let vy = 0;

  if (keys[binds.up]) vy -= 1;
  if (keys[binds.down]) vy += 1;
  if (keys[binds.left]) vx -= 1;
  if (keys[binds.right]) vx += 1;

  const length = Math.sqrt(vx * vx + vy * vy);
  if (length > 0) {
    vx = (vx / length) * speed;
    vy = (vy / length) * speed;

    posX += vx;
    posY += vy;
  }

  // Limites circulaires centrées sur la map
  const centerX = map.clientWidth / 2;
  const centerY = map.clientHeight / 2;
  const maxRadius = 2500 - 50;

  let dx = posX - centerX;
  let dy = posY - centerY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist > maxRadius) {
    const angle = Math.atan2(dy, dx);
    dx = Math.cos(angle) * maxRadius;
    dy = Math.sin(angle) * maxRadius;
    posX = centerX + dx;
    posY = centerY + dy;
  }

  // --- Collision ---
  for (let obs of obstacles) {
    const dx = posX - obs.x;
    const dy = posY - obs.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = 55 + obs.r;

    if (dist < minDist) {
      const angle = Math.atan2(dy, dx);
      const overlap = minDist - dist;
      posX += Math.cos(angle) * overlap;
      posY += Math.sin(angle) * overlap;
    }
  }

  // --- Position joueur ---
  player.style.left = posX - 50 + "px";
  player.style.top = posY - 50 + "px";

  // --- Centrer la caméra ---
  const camX = window.innerWidth / 2 - posX;
  const camY = window.innerHeight / 2 - posY;
  map.style.transform = `translate(${camX}px, ${camY}px)`;
}

const speed = 6;
let posX, posY; // position joueur sur la grande map

let keys = {};
let captures = {};
let capturedZones = new Set();

const storedBinds = JSON.parse(localStorage.getItem("binds"));
if (storedBinds) {
  binds = storedBinds; // utilise la variable binds déjà existante
}

let lastObstacleTime = 0;
const obstacleCooldown = 5000; // en ms

window.addEventListener("keydown", (e) => {
  const k = e.code.toLowerCase(); // ex: "space", "keyz", "keyg"
  keys[k] = true;

  if (k === binds.ability && abilityReady) {
    const now = Date.now();
    if (now - lastObstacleTime > obstacleCooldown) {
      spawnObstacle();
      triggerAbilityCooldown();
      lastObstacleTime = now;
    }
  }
});

window.addEventListener("keyup", (e) => {
  const k = e.code.toLowerCase();
  keys[k] = false;
});

// Position des zones sur la grande map (fixe)
function positionZones() {
  const centerX = map.clientWidth / 2;
  const centerY = map.clientHeight / 2;

  // Zone principale (id 0)
  const mainZone = zones[0];
  mainZone.style.left = centerX - 500 + "px";
  mainZone.style.top = centerY - 500 + "px";

  // Zones secondaires autour
  const distance = 2000;
  const angles = [270, 315, 180, 225, 90, 135, 0, 45];

  for (let i = 1; i < zones.length; i++) {
    const zone = zones[i];
    const angleRad = (angles[i - 1] * Math.PI) / 180;
    const x = centerX + distance * Math.cos(angleRad) - 250;
    const y = centerY + distance * Math.sin(angleRad) - 250;
    zone.style.left = x + "px";
    zone.style.top = y + "px";
  }
}

// Vérifie si le joueur est dans une zone (distance au centre)
function isPlayerInZone(zone) {
  const zoneLeft = parseFloat(zone.style.left);
  const zoneTop = parseFloat(zone.style.top);
  const zoneRadius = zone.clientWidth / 2;

  const dx = posX - (zoneLeft + zoneRadius);
  const dy = posY - (zoneTop + zoneRadius);
  const dist = Math.sqrt(dx * dx + dy * dy);

  return dist < zoneRadius;
}

// Mise à jour captures zones (progression)
function updateCaptures() {
  const fps = 60;
  zones.forEach((zone) => {
    const id = zone.dataset.id;
    if (!captures[id]) captures[id] = 0;

    const isMain = zone.classList.contains("main-zone");
    const increment = isMain ? 100 / (fps * 10) : 100 / (fps * 5);
    const decrement = increment / 2;

    if (isPlayerInZone(zone)) {
      if (!capturedZones.has(id)) {
        captures[id] += increment;
        if (captures[id] >= 100) {
          captures[id] = 100;
          capturedZones.add(id);
          zone.classList.add("captured");
          // Effet flash
          const flash = document.createElement("div");
          flash.classList.add("zone-flash");
          zone.appendChild(flash);

          setTimeout(() => {
            flash.remove();
          }, 400);
          // Effet particules
          for (let i = 0; i < 15; i++) {
            const particle = document.createElement("div");
            particle.classList.add("zone-particle");
            zone.appendChild(particle);

            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * 150 + 50;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            particle.style.setProperty("--x", `${x}px`);
            particle.style.setProperty("--y", `${y}px`);

            setTimeout(() => {
              particle.remove();
            }, 800);
          }
          // Effet vague circulaire
          const wave = document.createElement("div");
          wave.classList.add("zone-wave");
          zone.appendChild(wave);

          setTimeout(() => {
            wave.remove();
          }, 1000);
        }
      }
    } else {
      if (!capturedZones.has(id)) {
        captures[id] -= decrement;
        if (captures[id] < 0) captures[id] = 0;
      }
    }
  });
}

// Dessine la progression sur les zones (arcs)
function drawCaptureProgress() {
  zones.forEach((zone) => {
    const id = zone.dataset.id;
    const progress = captures[id] || 0;
    const canvas = zone.querySelector(".zone-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const size = canvas.width;
    ctx.clearRect(0, 0, size, size);

    if (progress <= 0) return;

    const lineWidth = 14;
    const radius = size / 2 - lineWidth / 2;
    const center = size / 2;

    let color = "rgba(30, 144, 255, 0.7)";
    if (capturedZones.has(id)) color = "dodgerblue";

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.arc(
      center,
      center,
      radius,
      -Math.PI / 2,
      -Math.PI / 2 + (2 * Math.PI * progress) / 100
    );
    ctx.stroke();
  });
}

const cooldownOverlay = document.querySelector(".cooldownOverlay");
let abilityReady = true;
const cooldownDuration = 5000;

function triggerAbilityCooldown() {
  abilityReady = false;
  cooldownOverlay.style.opacity = "1";

  let start = null;
  function animateCooldown(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / cooldownDuration, 1);
    const angle = progress * 360;

    // Inversion : cercle noir plein qui se vide
    cooldownOverlay.style.background = `conic-gradient(transparent ${angle}deg, black ${angle}deg)`;

    abilityHUD.style.backgroundColor = "#525252";

    if (progress < 1) {
      requestAnimationFrame(animateCooldown);
    } else {
      cooldownOverlay.style.opacity = "0";
      const abilityHUD = document.getElementById("abilityHUD");
      abilityHUD.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      abilityReady = true;

      // Vibration + morphose
      abilityHUD.style.animation = "vibrate 0.3s ease, morphFade 0.6s ease";
      setTimeout(() => {
        abilityHUD.style.animation = ""; // reset
      }, 600);
    }
  }
  abilityHUD.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
  requestAnimationFrame(animateCooldown);
}

// Spawn joueur dans le cercle central de la map
function spawnPlayerRandom() {
  const radiusMap = 2500 - 50;

  let x, y;
  do {
    x = Math.random() * 2 * radiusMap - radiusMap;
    y = Math.random() * 2 * radiusMap - radiusMap;
  } while (x * x + y * y > radiusMap * radiusMap);

  const centerX = map.clientWidth / 2;
  const centerY = map.clientHeight / 2;

  posX = centerX + x;
  posY = centerY + y;
}

// ----------- Mini-map Setup -----------
const miniMapSize = 200; // 200x200 px
const miniMapCanvas = document.createElement("canvas");
miniMapCanvas.width = miniMapSize;
miniMapCanvas.height = miniMapSize;
miniMapCanvas.style.position = "fixed";
miniMapCanvas.style.top = "10px";
miniMapCanvas.style.right = "10px";
miniMapCanvas.style.borderRadius = "50%";
miniMapCanvas.style.zIndex = 1000;
miniMapCanvas.style.pointerEvents = "none";
document.body.appendChild(miniMapCanvas);

const miniCtx = miniMapCanvas.getContext("2d");

// Centre et rayon de la map dans le mini-map (échelle)
const mapRadius = 2500; // grande map rayon (5000/2)
const miniMapRadius = miniMapSize / 2 - 10; // marge pour contour

function drawMiniMap() {
  miniCtx.clearRect(0, 0, miniMapSize, miniMapSize);

  // Cercle de fond blanc uni
  miniCtx.fillStyle = "white";
  miniCtx.beginPath();
  miniCtx.arc(miniMapSize / 2, miniMapSize / 2, miniMapRadius, 0, 2 * Math.PI);
  miniCtx.fill();

  // Contour noir circulaire
  miniCtx.lineWidth = 4;
  miniCtx.strokeStyle = "black";
  miniCtx.beginPath();
  miniCtx.arc(miniMapSize / 2, miniMapSize / 2, miniMapRadius, 0, 2 * Math.PI);
  miniCtx.stroke();

  // Dessiner zones sur mini-map
  zones.forEach((zone) => {
    const id = zone.dataset.id;
    const zoneLeft = parseFloat(zone.style.left);
    const zoneTop = parseFloat(zone.style.top);
    const zoneRadius = zone.clientWidth / 2;

    const centerX = map.clientWidth / 2;
    const centerY = map.clientHeight / 2;

    const relX = zoneLeft + zoneRadius - centerX;
    const relY = zoneTop + zoneRadius - centerY;

    const scale = miniMapRadius / mapRadius;
    const miniX = miniMapSize / 2 + relX * scale;
    const miniY = miniMapSize / 2 + relY * scale;
    const miniRadius = zoneRadius * scale;

    let fillColor = "rgba(128, 128, 128, 0.3)"; // grise si non capturée
    if (capturedZones.has(id)) fillColor = "dodgerblue";

    miniCtx.beginPath();
    miniCtx.arc(miniX, miniY, miniRadius, 0, 2 * Math.PI);
    miniCtx.fillStyle = fillColor;
    miniCtx.fill();
    miniCtx.lineWidth = 2;
    miniCtx.strokeStyle = "black";
    miniCtx.stroke();
  });

  // Dessiner joueur sur mini-map
  const centerX = map.clientWidth / 2;
  const centerY = map.clientHeight / 2;
  const relPlayerX = posX - centerX;
  const relPlayerY = posY - centerY;

  const scale = miniMapRadius / mapRadius;
  const playerMiniX = miniMapSize / 2 + relPlayerX * scale;
  const playerMiniY = miniMapSize / 2 + relPlayerY * scale;

  miniCtx.beginPath();
  miniCtx.arc(playerMiniX, playerMiniY, 6, 0, 2 * Math.PI);
  miniCtx.fillStyle = "dodgerblue";
  miniCtx.shadowColor = "dodgerblue";
  miniCtx.shadowBlur = 8;
  miniCtx.fill();
  miniCtx.shadowBlur = 0;
}

window.addEventListener("click", () => {
  document.body.classList.add("no-cursor");
});

function spawnObstacle() {
  const obstacle = document.createElement("div");
  obstacle.className = "obstacle";

  // Position du joueur dans la fenêtre
  const playerRect = player.getBoundingClientRect();
  const px = playerRect.left + playerRect.width / 2;
  const py = playerRect.top + playerRect.height / 2;

  // Direction vers la souris
  const dx = mouseX - px;
  const dy = mouseY - py;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Normaliser le vecteur direction
  const dirX = dx / dist;
  const dirY = dy / dist;

  // Décalage de 120px dans la direction du curseur
  const spawnX = px + dirX * 120;
  const spawnY = py + dirY * 120;

  // Décalage dû à la caméra (transform: translate)
  const transform = map.style.transform;
  const match = transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
  const offsetX = match ? parseFloat(match[1]) : 0;
  const offsetY = match ? parseFloat(match[2]) : 0;

  // Position dans la map
  const mapX = spawnX - offsetX - 55; // 55 = rayon obstacle
  const mapY = spawnY - offsetY - 55;

  obstacle.style.left = mapX + "px";
  obstacle.style.top = mapY + "px";

  map.appendChild(obstacle);

  // Stocker pour collision
  obstacles.push({
    el: obstacle,
    x: mapX + 60,
    y: mapY + 55,
    r: 55,
  });
}

// Setup initial
positionZones();
spawnPlayerRandom();
updatePlayerPosition();

// Loop principal
function gameLoop() {
  updatePlayerPosition();
  updateCaptures();
  drawCaptureProgress();
  drawMiniMap();
  requestAnimationFrame(gameLoop);
}

gameLoop();
