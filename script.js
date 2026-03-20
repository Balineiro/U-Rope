document.getElementById("playBtn").addEventListener("click", () => {
  window.location.href = "game.html";
});

const playBtn = document.getElementById("playBtn");
const playerNameInput = document.getElementById("playerName");

// récupérer pseudo précédent si existe
if (localStorage.getItem("playerName")) {
  playerNameInput.value = localStorage.getItem("playerName");
}

playBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim() || "Player";
  localStorage.setItem("playerName", name);

  window.location.href = "game.html";
});
// Boutons paramètres et crédits
const settingsBtn = document.getElementById("settingsBtn");
const creditsBtn = document.getElementById("creditsBtn");
const settingsMenu = document.getElementById("settingsMenu");
const creditsPopup = document.getElementById("creditsPopup");
const closeSettings = document.getElementById("closeSettings");
const closeCredits = document.getElementById("closeCredits");

settingsBtn.addEventListener("click", () => {
  settingsMenu.classList.toggle("active");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    settingsMenu.classList.remove("active");
  }
});

creditsBtn.addEventListener("click", () => {
  creditsPopup.classList.toggle("active");
});

// Fermer popup crédits
closeCredits.addEventListener("click", () => {
  creditsPopup.classList.remove("active");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    creditsPopup.classList.remove("active");
  }
});

// ---------- Canvas background presets ----------
const canvas = document.getElementById("menuBG");
const ctx = canvas.getContext("2d");

// ------------------------------
// Particules animées en fond
function presetParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const particles = [];
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 2,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.5 + 0.3,
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }

    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}

function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Preset 1: confetti triangles (many small colored triangles)
function bg_style1(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);
  // subtle gradient background
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#001437");
  g.addColorStop(1, "#002b72");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 120; i++) {
    const x = Math.random() * w,
      y = Math.random() * h;
    const rot = Math.random() * Math.PI * 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    const colors = ["#ff0055", "#00cfff", "#fcd303", "#22ff88"];
    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(5, 5);
    ctx.lineTo(-5, 5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

// Preset 2: big geometric triangles + glow
function bg_style2(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#021022");
  g.addColorStop(1, "#042a3f");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 10; i++) {
    const x = Math.random() * w,
      y = Math.random() * h;
    const size = 120 + Math.random() * 260;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.random() * Math.PI * 2);
    // draw blurred triangle by drawing multiple translucent layers
    for (let s = 0; s < 6; s++) {
      const alpha = 0.06 * (6 - s);
      ctx.fillStyle = `rgba(${(12 + Math.random() * 240) | 0}, ${
        (120 + Math.random() * 130) | 0
      }, ${(200 + Math.random() * 55) | 0}, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.lineTo(-size / 2, size / 2);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }
}

// Preset 3: constellation network
function bg_style3(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);
  // dark subtle background
  ctx.fillStyle = "#071226";
  ctx.fillRect(0, 0, w, h);

  const pts = [];
  const N = 48;
  for (let i = 0; i < N; i++) {
    pts.push({ x: Math.random() * w, y: Math.random() * h });
  }
  // points
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  for (let p of pts)
    ctx.beginPath(), ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2), ctx.fill();

  // lines (connect if close)
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
      const d = Math.hypot(dx, dy);
      if (d < 160) {
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.stroke();
      }
    }
  }
}

// Apply CSS vars from a theme object
function applyCSSVars(vars) {
  if (!vars) return;
  for (const k in vars) {
    document.documentElement.style.setProperty(k, vars[k]);
  }
}

//----------------------------------------------------
// 1) référence canvas menu
const menuCanvas = document.getElementById("menuBG");
const menuCtx = menuCanvas.getContext("2d");

function resizeMenuCanvas() {
  menuCanvas.width = window.innerWidth;
  menuCanvas.height = window.innerHeight;
}
resizeMenuCanvas();
window.addEventListener("resize", resizeMenuCanvas);

//----------------------------------------------------
// 2) appliquer couleurs UI
function applyUI(color) {
  document.getElementById("logo").style.color = color;
  document.getElementById("playerName").style.borderColor = color;
  document.getElementById("playerName").style.color = color;
  document.getElementById("playBtn").style.backgroundColor = color;
}
//----------------------------------------------------
// 3) THEMES

// ---- theme 1 : tes particules originales
function themeParticles() {
  applyUI("#1e90ff"); // bleu dodgerblue
  const particles = [];
  const particleCount = 50;
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * menuCanvas.width,
      y: Math.random() * menuCanvas.height,
      r: Math.random() * 3 + 2,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      a: Math.random() * 0.5 + 0.3,
    });
  }

  function loop() {
    menuCtx.clearRect(0, 0, menuCanvas.width, menuCanvas.height);
    for (let p of particles) {
      menuCtx.beginPath();
      menuCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      menuCtx.fillStyle = `rgba(255,255,255,${p.a})`;
      menuCtx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > menuCanvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > menuCanvas.height) p.dy *= -1;
    }
    requestAnimationFrame(loop);
  }
  loop();
}

// ---- theme 2 : grille neon
function themeNeonGrid() {
  applyUI("#ff1493"); // rose neon
  function loop() {
    menuCtx.fillStyle = "#000";
    menuCtx.fillRect(0, 0, menuCanvas.width, menuCanvas.height);
    menuCtx.strokeStyle = "rgba(255,20,147,0.4)";
    for (let x = 0; x < menuCanvas.width; x += 40) {
      menuCtx.beginPath();
      menuCtx.moveTo(x, 0);
      menuCtx.lineTo(x, menuCanvas.height);
      menuCtx.stroke();
    }
    for (let y = 0; y < menuCanvas.height; y += 40) {
      menuCtx.beginPath();
      menuCtx.moveTo(0, y);
      menuCtx.lineTo(menuCanvas.width, y);
      menuCtx.stroke();
    }
    requestAnimationFrame(loop);
  }
  loop();
}

// ---- theme 3 : vague radial
function themeRadialPulse() {
  applyUI("#00ffbf"); // vert turquoise
  let t = 0;
  function loop() {
    t += 0.01;
    const grd = menuCtx.createRadialGradient(
      menuCanvas.width / 2,
      menuCanvas.height / 2,
      0,
      menuCanvas.width / 2,
      menuCanvas.height / 2,
      menuCanvas.width * 0.7
    );
    grd.addColorStop(0, `rgba(0,255,191,${0.7 + Math.sin(t) * 0.3})`);
    grd.addColorStop(1, "#000");
    menuCtx.fillStyle = grd;
    menuCtx.fillRect(0, 0, menuCanvas.width, menuCanvas.height);
    requestAnimationFrame(loop);
  }
  loop();
}

// Chargement des touches depuis localStorage si existant
const defaultBindings = {
  keyUp: "Z",
  keyLeft: "Q",
  keyDown: "S",
  keyRight: "D",
  keyCenter: "SPACE",
};

const bindings = JSON.parse(localStorage.getItem("playerBindings")) || {
  ...defaultBindings,
};

// Mettre à jour les labels initialement
document.querySelector(".key-up .key-label").textContent = bindings.keyUp;
document.querySelector(".key-left .key-label").textContent = bindings.keyLeft;
document.querySelector(".key-down .key-label").textContent = bindings.keyDown;
document.querySelector(".key-right .key-label").textContent = bindings.keyRight;
document.querySelector(".key-center .key-label").textContent =
  bindings.keyCenter;

let activeSquare = null;

// Clique sur une touche pour rebind
document.querySelectorAll(".key-square").forEach((square) => {
  square.addEventListener("click", () => {
    if (activeSquare) activeSquare.classList.remove("waiting");
    activeSquare = square;
    square.classList.add("waiting"); // optionnel: ajoute un style
    square.querySelector(".key-label").textContent = ""; // vide le label
  });
});

// Appui sur une touche du clavier
window.addEventListener("keydown", (e) => {
  if (!activeSquare) return;

  let newKey = e.code; // 'KeyZ', 'Space', etc.

  // Simplifier pour afficher seulement la lettre ou SPACE
  if (newKey.startsWith("Key")) newKey = newKey.slice(3);
  else if (newKey === "Space") newKey = "SPACE";
  else if (newKey.startsWith("Arrow")) newKey = newKey.replace("Arrow", "");

  activeSquare.querySelector(".key-label").textContent = newKey;

  // Mettre à jour bindings selon la classe du carré
  if (activeSquare.classList.contains("key-up")) bindings.keyUp = newKey;
  else if (activeSquare.classList.contains("key-left"))
    bindings.keyLeft = newKey;
  else if (activeSquare.classList.contains("key-down"))
    bindings.keyDown = newKey;
  else if (activeSquare.classList.contains("key-right"))
    bindings.keyRight = newKey;
  else if (activeSquare.classList.contains("key-center"))
    bindings.keyCenter = newKey;

  // Sauvegarde locale
  localStorage.setItem("playerBindings", JSON.stringify(bindings));

  // Fin du rebinding
  activeSquare.classList.remove("waiting");
  activeSquare = null;
});

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// lance le preset "original"
presetParticles();
