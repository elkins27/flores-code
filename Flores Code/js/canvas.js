export function startBouquet(canvas) {
  const ctx = canvas.getContext("2d");

  const dpr = window.devicePixelRatio || 1;
  ctx.scale(dpr, dpr);
  animateBouquet(ctx);

  const size = Math.min(window.innerWidth * 0.9, 400);

canvas.style.width = size + "px";
canvas.style.height = size * 1.3 + "px";

canvas.width = size * dpr;
canvas.height = size * 1.3 * dpr;

ctx.scale(dpr, dpr);
}

/* =========================
   COLORES
========================= */
const COLORS = {
  petalLight: "#fff3bf",
  petalMain: "#ffd43b",
  petalDark: "#f59f00",
  centerDark: "#3b2a00",
  centerLight: "#5c3d00",
  stem: "#3f7d20",
  leaf: "#74b816",
  filler: "#fff3bf",
  bow: "#fab005"
};

/* =========================
   UTILIDADES
========================= */
const random = (min, max) => Math.random() * (max - min) + min;

/* =========================
   FLOR
========================= */
function drawFlower(ctx, x, y, size, delay) {
  setTimeout(() => {

    const petals = 20;

    // 🌻 PÉTALOS
    for (let i = 0; i < petals; i++) {
      const angle = (Math.PI * 2 / petals) * i;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      const grad = ctx.createLinearGradient(0, 0, 0, size);
      grad.addColorStop(0, COLORS.petalLight);
      grad.addColorStop(1, COLORS.petalMain);

      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(size * 0.2, size * 0.6, 0, size);
      ctx.quadraticCurveTo(-size * 0.2, size * 0.6, 0, 0);
      ctx.fill();

      ctx.restore();
    }

    // 🟤 CENTRO
    const gradCenter = ctx.createRadialGradient(x, y, 2, x, y, size * 0.3);
    gradCenter.addColorStop(0, COLORS.centerLight);
    gradCenter.addColorStop(1, COLORS.centerDark);

    ctx.fillStyle = gradCenter;
    ctx.beginPath();
    ctx.arc(x, y, size * 0.25, 0, Math.PI * 2);
    ctx.fill();

  }, delay);
}

/* =========================
   TALLO
========================= */
function drawStem(ctx, x, y, height, width, delay) {
  setTimeout(() => {
    let progress = 0;

    const interval = setInterval(() => {
      progress += 0.05;

      ctx.beginPath();
      ctx.moveTo(x, y);

      const currentHeight = height * progress;

      ctx.quadraticCurveTo(
        x,
        y - currentHeight / 2,
        x,
        y - currentHeight
      );

      ctx.strokeStyle = COLORS.stem;
      ctx.shadowColor = "rgba(0,0,0,0.2)";
      ctx.shadowBlur = 4;
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.stroke();

      if (progress >= 1) clearInterval(interval);

    }, 30);
  }, delay);
}

/* =========================
   HOJAS
========================= */
function drawLeaf(ctx, x, y, dir, delay) {
  setTimeout(() => {
    ctx.beginPath();
    ctx.fillStyle = COLORS.leaf;

    ctx.ellipse(
      x + 10 * dir,
      y,
      12,
      6,
      dir * -0.5,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }, delay);
}

/* =========================
   RELLENO
========================= */
function drawFiller(ctx, cx, cy, delay) {
  setTimeout(() => {
    ctx.fillStyle = COLORS.filler;

    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 30;

      ctx.beginPath();
      ctx.arc(
        cx + Math.cos(angle) * r,
        cy + Math.sin(angle) * r,
        random(2, 4),
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }, delay);
}

/* =========================
   LAZO
========================= */
function drawBow(ctx, x, y, delay) {
  setTimeout(() => {
    ctx.fillStyle = COLORS.bow;

    ctx.beginPath();
    ctx.moveTo(x, y);

    ctx.bezierCurveTo(x - 40, y - 20, x - 40, y + 20, x, y + 5);
    ctx.bezierCurveTo(x + 40, y - 20, x + 40, y + 20, x, y + 5);

    ctx.fill();
  }, delay);
}

/* =========================
   ANIMACIÓN PRINCIPAL
========================= */
function animateBouquet(ctx) {
  ctx.clearRect(0, 0, 400, 520);

  const baseY = 400;
  const centerX = 200;

  // 🌼 FONDO
  drawStem(ctx, centerX - 80, baseY, 140, 3, 0);
  drawFlower(ctx, centerX - 90, baseY - 150, 20, 400);

  drawStem(ctx, centerX + 80, baseY, 150, 3, 200);
  drawFlower(ctx, centerX + 90, baseY - 160, 20, 600);

  drawFiller(ctx, centerX - 100, baseY - 80, 800);
  drawFiller(ctx, centerX + 100, baseY - 80, 900);

  // 🌻 PRINCIPAL
  const delay = 1200;

  drawStem(ctx, centerX - 40, baseY, 200, 5, delay);
  drawLeaf(ctx, centerX - 40, baseY - 80, -1, delay + 200);
  drawFlower(ctx, centerX - 50, baseY - 200, 40, delay + 900);

  drawStem(ctx, centerX + 40, baseY, 190, 5, delay + 200);
  drawLeaf(ctx, centerX + 40, baseY - 90, 1, delay + 400);
  drawFlower(ctx, centerX + 50, baseY - 190, 40, delay + 1100);

  drawStem(ctx, centerX, baseY, 230, 6, delay);
  drawFlower(ctx, centerX, baseY - 230, 55, delay + 1400);

  // 🎀 LAZO
  drawBow(ctx, centerX, baseY, delay + 1500);

  // 💛 TEXTO FINAL
  setTimeout(() => {
    ctx.textAlign = "center";
    ctx.font = "bold 26px Quicksand";
    ctx.fillStyle = COLORS.petalDark;

    ctx.fillText("Para ti 💛", centerX, 60);
  }, delay + 2000);
}