export function startConfetti() {
  setInterval(() => {
    const el = document.createElement("div");

    const symbols = ["💛", "❣️", "🌻"];
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    el.style.position = "absolute";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = "100vh";
    el.style.fontSize = Math.random() * 15 + 15 + "px";
    el.style.opacity = 0.8;
    el.style.pointerEvents = "none";

    document.body.appendChild(el);

    el.animate([
      { transform: "translateY(0) scale(1)", opacity: 0 },
      { transform: "translateY(-60vh) scale(1.2)", opacity: 1 },
      { transform: "translateY(-120vh) scale(0.8)", opacity: 0 }
    ], {
      duration: 7000,
      easing: "ease-out"
    });

    setTimeout(() => el.remove(), 7000);
  }, 400);
}
