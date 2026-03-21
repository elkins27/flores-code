export function startBouquet(canvas) {
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;

  const size = Math.min(window.innerWidth * 0.9, 400);

  canvas.style.width = size + "px";
  canvas.style.height = size * 1.3 + "px";

  canvas.width = size * dpr;
  canvas.height = size * 1.3 * dpr;

  ctx.scale(dpr, dpr);

  animateBouquet(ctx);
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

    // brillo en pétalos
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.arc(x - size * 0.1, y - size * 0.1, size * 0.15, 0, Math.PI * 2);
    ctx.fill();

  }, delay);
}

/* =========================
   TALLO
========================= */
function drawStem(ctx, x, y, height, width) {
  ctx.beginPath();
  ctx.moveTo(x, y);

  ctx.quadraticCurveTo(
    x,
    y - height / 2,
    x,
    y - height
  );

  ctx.strokeStyle = COLORS.stem;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.stroke();
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
function drawFiller(ctx, cx, cy) {
  for (let i = 0; i < 20; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * 50;

    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;

    // tallo mini
    ctx.beginPath();
    ctx.moveTo(x, y + 5);
    ctx.lineTo(x, y + 12);
    ctx.strokeStyle = "#74b816";
    ctx.lineWidth = 1;
    ctx.stroke();

    // pétalos mini
    for (let j = 0; j < 6; j++) {
      const a = (Math.PI * 2 / 6) * j;

      ctx.beginPath();
      ctx.fillStyle = "#f1ca04";
      ctx.arc(
        x + Math.cos(a) * 3,
        y + Math.sin(a) * 3,
        2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // centro
    ctx.beginPath();
    ctx.fillStyle = "#554303";
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* =========================
   LAZO
========================= */
function drawBow(ctx, x, y) {
  ctx.fillStyle = "#f59f00";

  // lado izquierdo
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - 40, y - 25, x - 40, y + 25, x, y + 5);
  ctx.fill();

  // lado derecho
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x + 40, y - 25, x + 40, y + 25, x, y + 5);
  ctx.fill();

  // centro
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.fill();

  // cintas abajo
  ctx.strokeStyle = "#e67700";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(x, y + 5);
  ctx.quadraticCurveTo(x - 15, y + 40, x - 20, y + 60);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x, y + 5);
  ctx.quadraticCurveTo(x + 15, y + 40, x + 20, y + 60);
  ctx.stroke();
}

/* =========================
   ANIMACIÓN PRINCIPAL
========================= */
function animateBouquet(ctx) {
  ctx.clearRect(0, 0, 400, 520);

  const baseY = 400;
  const centerX = 200;

  // 🌿 1. TALLOS (ATRÁS)
  drawStem(ctx, centerX - 80, baseY, 140, 3);
  drawStem(ctx, centerX + 80, baseY, 150, 3);
  drawStem(ctx, centerX - 40, baseY, 200, 5);
  drawStem(ctx, centerX + 40, baseY, 190, 5);
  drawStem(ctx, centerX, baseY, 230, 6);

  // 🍃 2. HOJAS
  drawLeaf(ctx, centerX - 40, baseY - 80, -1, 0);
  drawLeaf(ctx, centerX + 40, baseY - 90, 1, 0);

  // 🌼 3. FLORES (ENCIMA)
  drawFlower(ctx, centerX - 90, baseY - 150, 20, 0);
  drawFlower(ctx, centerX + 90, baseY - 160, 20, 0);

  drawFlower(ctx, centerX - 50, baseY - 200, 40, 0);
  drawFlower(ctx, centerX + 50, baseY - 190, 40, 0);
  drawFlower(ctx, centerX, baseY - 230, 55, 0);

  // ✨ 4. DETALLES
  drawFiller(ctx, centerX - 100, baseY - 80, 0);
  drawFiller(ctx, centerX + 100, baseY - 80, 0);

  // 🎀 5. LAZO (ENCIMA DE TODO)
  drawBow(ctx, centerX, baseY, 0);

  // 💛 TEXTO
  ctx.textAlign = "center";
  ctx.font = "bold 26px Quicksand";
  ctx.fillStyle = COLORS.petalDark;
  ctx.fillText("Para ti 💛", centerX, 60);

  // MENSAJE FINAL
  setTimeout(() => {
  showFinalMessage();
  }, 1500);

}

function showFinalMessage() {
  const msg = document.createElement("div");

  msg.textContent = "Solo quería hacerte algo bonito 💝";

  msg.style.position = "absolute";
  msg.style.bottom = "10vh"; 
  msg.style.left = "50%";
  msg.style.transform = "translateX(-50%)";
  msg.style.fontSize = "1.2rem";
  msg.style.fontFamily = "Quicksand, sans-serif";
  msg.style.color = "#5c4a00";
  msg.style.opacity = "0";
  msg.style.transition = "all 1s ease";
  msg.style.textAlign = "center";

  msg.style.width = "90%";
  msg.style.maxWidth = "400px";
  msg.style.lineHeight = "1.4";

  document.body.appendChild(msg);

  setTimeout(() => {
    msg.style.opacity = "1";
    msg.style.transform = "translate(-50%, -10px)";
  }, 100);
}
