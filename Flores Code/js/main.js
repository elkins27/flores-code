import { mensajes } from "./messages.js";
import { startBouquet } from "./canvas.js";
import { startConfetti } from "./effects.js";

const textElement = document.getElementById("messageText");
const btn = document.getElementById("actionBtn");
const canvas = document.getElementById("flowerCanvas");

let step = 1;
let animating = false;

btn.addEventListener("click", () => {
  if (animating) return;

  if (step < mensajes.length) {
    nextMessage();
  } else {
    showFlowers();
  }
});

function typeWriter(text, speed = 40) {
  return new Promise((resolve) => {
    let i = 0;
    textElement.textContent = "";

    function write() {
      if (i < text.length) {
        textElement.textContent += text.charAt(i);
        i++;
        setTimeout(write, speed);
      } else {
        resolve();
      }
    }

    write();
  });
}

async function nextMessage() {
  if (animating) return;
  animating = true;

  textElement.classList.remove("show");

  setTimeout(async () => {
    textElement.classList.add("show");

    await typeWriter(mensajes[step]);

    step++;
    animating = false;

    if (step === mensajes.length) {
      btn.textContent = "Ver regalo 🌻";
    }
  }, 300);
}

function showFlowers() {
  document.querySelector(".text-area").style.display = "none";
  btn.style.display = "none";

  canvas.style.display = "block";

  startBouquet(canvas);
  startConfetti();
}