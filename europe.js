// --- CONFIG ---
const SCALE = 10;
const MAP_WIDTH = 2794 * SCALE; // 21320
const MAP_HEIGHT = 2176 * SCALE; // 21760

// Centre du repère
const ORIGIN_X = MAP_WIDTH / 2;
const ORIGIN_Y = MAP_HEIGHT / 2;

// --- ELEMENTS ---
const player = document.getElementById("europePlayer");
const map = document.querySelector(".map");
const zones = Array.from(document.querySelectorAll(".zone"));

// MINI-MAP
const miniMap = document.getElementById("miniMap");
const miniPlayer = document.getElementById("miniPlayer");

const MINI_W = 220;
const MINI_H = 220;

const scaleX = MINI_W / MAP_WIDTH;
const scaleY = MINI_H / MAP_HEIGHT;

const spawnAreas = {
  france: {
    minX: -9000,
    maxX: -6400,
    minY: -5600,
    maxY: -2600,
  },
};

// --- PLAYER POSITION IN LOGICAL COORDS ---
let x = 0; // centre du repère
let y = 0;
let speed = 40;

let keys = {};
let captures = {};
let capturedZones = new Set();

// --- INPUT ---
window.addEventListener("keydown", (e) => (keys[e.key.toLowerCase()] = true));
window.addEventListener("keyup", (e) => (keys[e.key.toLowerCase()] = false));

// --- CONVERSION LOGIQUE → CSS ---
function worldToCSS(wx, wy) {
  return {
    left: ORIGIN_X + wx,
    top: ORIGIN_Y - wy,
  };
}

function updateCoordDisplay() {
  const el = document.getElementById("coordDisplay");
  el.textContent = `(${Math.round(x)}, ${Math.round(y)})`;
}

function spawnInCountry(countryId) {
  const area = spawnAreas[countryId];
  if (!area) {
    console.error("Spawn area not defined for", countryId);
    return;
  }

  const x = Math.random() * (area.maxX - area.minX) + area.minX;
  const y = Math.random() * (area.maxY - area.minY) + area.minY;

  spawnPlayer(x, y);
}

// --- PLACEMENT DES ZONES ---
function placeZone(id, wx, wy, size = 2000) {
  const el = document.getElementById(id);
  if (!el) return;

  // appliquer la taille
  el.style.width = size + "px";
  el.style.height = size + "px";

  // conversion repère → CSS
  const cssLeft = ORIGIN_X + wx - size / 2;
  const cssTop = ORIGIN_Y - wy - size / 2;

  el.style.left = cssLeft + "px";
  el.style.top = cssTop + "px";
}

// --- PLAYER MOVEMENT ---
function updatePlayer() {
  let vx = 0,
    vy = 0;

  if (keys["z"] || keys["w"]) vy += speed;
  if (keys["s"]) vy -= speed;
  if (keys["q"] || keys["a"]) vx -= speed;
  if (keys["d"]) vx += speed;

  const len = Math.hypot(vx, vy);
  if (len > 0) {
    vx = (vx / len) * speed;
    vy = (vy / len) * speed;
  }

  x += vx;
  y += vy;

  // limites logiques
  x = Math.max(-ORIGIN_X, Math.min(ORIGIN_X, x));
  y = Math.max(-ORIGIN_Y, Math.min(ORIGIN_Y, y));

  const css = worldToCSS(x, y);

  // position joueur
  player.style.left = css.left - 20 + "px";
  player.style.top = css.top - 20 + "px";

  // caméra centrée
  const camX = window.innerWidth / 2 - css.left;
  const camY = window.innerHeight / 2 - css.top;
  map.style.transform = `translate(${camX}px, ${camY}px)`;
}

// --- MINI-MAP ---
function updateMiniMap() {
  const miniX = (x + ORIGIN_X) * scaleX +10;
  const miniY = (ORIGIN_Y - y) * scaleY;

  miniPlayer.style.left = miniX + "px";
  miniPlayer.style.top = miniY + "px";
}

// --- ZONE DETECTION ---
function isPlayerInZone(zone) {
  const rect = zone.getBoundingClientRect();
  const zoneX = rect.left + rect.width / 2;
  const zoneY = rect.top + rect.height / 2;

  const dx = player.getBoundingClientRect().left + 20 - zoneX;
  const dy = player.getBoundingClientRect().top + 20 - zoneY;

  return Math.hypot(dx, dy) < rect.width / 2;
}

// --- CAPTURE SYSTEM ---
function updateCaptures() {
  const fps = 60;

  zones.forEach((zone) => {
    const id = zone.id;
    if (!captures[id]) captures[id] = 0;

    const increment = 100 / (fps * 4);
    const decrement = increment / 2;

    if (isPlayerInZone(zone)) {
      if (!capturedZones.has(id)) {
        captures[id] += increment;

        if (captures[id] >= 100) {
          captures[id] = 100;
          capturedZones.add(id);
          zone.classList.add("captured");

          // colorer le pays
          document.querySelectorAll(`.country.${id}`).forEach((p) => {
            p.classList.add("captured");
          });
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

// --- DRAW PROGRESS ---
function drawProgress() {
  zones.forEach((zone) => {
    const id = zone.id;
    const progress = captures[id] || 0;
    const canvas = zone.querySelector(".zone-canvas");
    const ctx = canvas.getContext("2d");

    const rect = zone.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (progress <= 0) return;

    const radius = canvas.width / 2 - 8;
    const center = canvas.width / 2;

    ctx.beginPath();
    ctx.lineWidth = 12;
    ctx.strokeStyle = capturedZones.has(id)
      ? "dodgerblue"
      : "rgba(30,144,255,0.7)";
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

function spawnPlayer(wx, wy) {
  x = wx;
  y = wy;

  const css = worldToCSS(x, y);

  player.style.left = css.left - 20 + "px";
  player.style.top = css.top - 20 + "px";

  // recalcule la caméra immédiatement
  const camX = window.innerWidth / 2 - css.left;
  const camY = window.innerHeight / 2 - css.top;
  map.style.transform = `translate(${camX}px, ${camY}px)`;
}

// --- PLACEMENT DES ZONES ---

placeZone("france", -7700, -4100, 1800);
placeZone("spain", -11400, -7100, 1600);
placeZone("germany", -1000, -1000, 1800);
placeZone("united-kingdom", -5500, 100, 1000);
placeZone("portugal", -13100, -7100, 500);
placeZone("ireland", -7500, 1000, 700);
placeZone("luxembourg", -2750, -2100, 150);
placeZone("netherlands", -2750, -500, 500);
placeZone("denmark", -1300, 1700, 500);
placeZone("poland", 2200, -500, 1800);
placeZone("austria", 600, -2200, 800);
placeZone("hungary", 2300, -2800, 600);
placeZone("czechia", 700, -3500, 1000);
placeZone("slovakia", 2300, -4000, 800);
placeZone("switzerland", -2000, -3800, 600);
placeZone("slovenia", 600, -4450, 350);
placeZone("croatia", 1400, -4600, 400);
placeZone("bosnia", 2000, -5450, 600);
placeZone("serbia", 3400, -5550, 800);
placeZone("kosovo", 3450, -6440, 300);
placeZone("montenegro", 2700, -6350, 300);
placeZone("macedonia", 3850, -7000, 400);
placeZone("albania", 3170, -7660, 400);
placeZone("greece", 3900, -8200, 600);
placeZone("bulgaria", 5400, -6200, 1000);
placeZone("romania", 5100, -4200, 1500);
placeZone("moldova", 6180, -3000, 400);
placeZone("ukraine", 7500, -1800, 2000);
placeZone("belarus", 5500, 600, 1500);
placeZone("lithuania", 3900, 1500, 800);
placeZone("latvia", 4300, 2450, 600);
placeZone("estonia", 4000, 3500, 600);
placeZone("norway", -900, 4400, 1000);
placeZone("sweden", 450, 2800, 800);
placeZone("finland", 3800, 6000, 1500);
placeZone("iceland", -7600, 8600, 800);

spawnPlayer(-8350, -6250); //-> z spawn particulier
// spawnInCountry("france"); // -> spawn dans une région

// --- MAIN LOOP ---
function loop() {
  updatePlayer();
  updateCaptures();
  drawProgress();
  updateMiniMap();
  updateCoordDisplay();
  requestAnimationFrame(loop);
}

loop();
