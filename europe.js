// Variables
const player = document.getElementById("player");
const map = document.querySelector(".map");

let posX, posY; // Position joueur
let keys = {};
const speed = 6;

// Gestion clavier
window.addEventListener("keydown", (e) => {
  const k = e.code.toLowerCase();
  keys[k] = true;
});

window.addEventListener("keyup", (e) => {
  const k = e.code.toLowerCase();
  keys[k] = false;
});

// Spawn joueur au centre de la map
function spawnPlayer() {
  posX = map.clientWidth / 2;
  posY = map.clientHeight / 2;
}

// Mise à jour position joueur
function updatePlayerPosition() {
  let vx = 0;
  let vy = 0;

  // WASD (keyw, keya, keys, keyd)
  if (keys['keyw']) vy -= 1;
  if (keys['keys']) vy += 1;
  if (keys['keya']) vx -= 1;
  if (keys['keyd']) vx += 1;

  // Normaliser le vecteur
  const length = Math.sqrt(vx * vx + vy * vy);
  if (length > 0) {
    vx = (vx / length) * speed;
    vy = (vy / length) * speed;
    posX += vx;
    posY += vy;
  }

  // Limites de la map
  posX = Math.max(50, Math.min(map.clientWidth - 50, posX));
  posY = Math.max(50, Math.min(map.clientHeight - 50, posY));

  // Position joueur
  player.style.left = posX - 50 + "px";
  player.style.top = posY - 50 + "px";

  // Centrer la caméra sur le joueur
  const camX = window.innerWidth / 2 - posX;
  const camY = window.innerHeight / 2 - posY;
  map.style.transform = `translate(${camX}px, ${camY}px)`;
}

// Loop principal
function gameLoop() {
  updatePlayerPosition();
  requestAnimationFrame(gameLoop);
}

// Init
spawnPlayer();
updatePlayerPosition();
gameLoop();