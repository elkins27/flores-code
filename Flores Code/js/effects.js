export function startConfetti() {
  setInterval(() => {
    const el = document.createElement("div");

    el.textContent = ["✨", "💛", "🌙"][Math.floor(Math.random() * 3)];

    el.style.position = "absolute";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = "100vh";
    el.style.fontSize = Math.random() * 10 + 10 + "px";
    el.style.opacity = 0.7;

    document.body.appendChild(el);

    el.animate([
      { transform: "translateY(0)", opacity: 0 },
      { transform: "translateY(-100vh)", opacity: 1 },
      { transform: "translateY(-120vh)", opacity: 0 }
    ], {
      duration: 8000,
      easing: "ease-out"
    });

    setTimeout(() => el.remove(), 8000);
  }, 500);
}