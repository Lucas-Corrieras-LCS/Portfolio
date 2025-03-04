const themeToggleCheckbox = document.getElementById("theme");
const body = document.body;

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  body.classList.add("light");
  themeToggleCheckbox.checked = true;
} else {
  body.classList.remove("light");
  themeToggleCheckbox.checked = false;
}

themeToggleCheckbox.addEventListener("change", () => {
  if (themeToggleCheckbox.checked) {
    body.classList.add("light");
    localStorage.setItem("theme", "light");
  } else {
    body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
  applyVantaBackground(themeToggleCheckbox.checked ? "light" : "dark");
});

function applyVantaBackground(theme) {
  if (window.vantaEffect) window.vantaEffect.destroy();

  window.vantaEffect = VANTA.GLOBE({
    el: "#dot",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1,
    scaleMobile: 1,
    color: theme === "light" ? 0x000000 : 0xffffff,
    color2: theme === "light" ? 0x000000 : 0xffffff,
    size: 2,
    backgroundColor: theme === "light" ? 0xffffff : 0x000000,
  });
}

applyVantaBackground(savedTheme);

window.addEventListener("load", function () {
  const loading = document.getElementById("loading");
  if (loading) {
    setTimeout(() => {
      loading.style.opacity = "0";
      loading.addEventListener("transitionend", () => {
        loading.remove();
      });
    }, 1500);
  }
});

window.onload = function () {
  setTimeout(() => {
    document.getElementById("scr").classList.add("small-text");
  }, 2000);

  setTimeout(() => {
    smoothScrollTo(document.getElementById("txtpro").offsetTop, 2000);
  }, 2900);
};

const curseur = document.getElementById("curseur");
let mouseX = 0,
  mouseY = 0,
  isMouseMoving = false;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  isMouseMoving = true;
});

function updateCursor() {
  if (isMouseMoving) {
    curseur.style.left = mouseX + "px";
    curseur.style.top = mouseY + "px";
    isMouseMoving = false;
  }
  requestAnimationFrame(updateCursor);
}

requestAnimationFrame(updateCursor);

const carousel = document.querySelector(".carousel");
const items = Array.from(carousel.children);
const fragment = document.createDocumentFragment();

items.forEach((item) => {
  const clone = item.cloneNode(true);
  fragment.appendChild(clone);
});

carousel.appendChild(fragment);

function smoothScrollTo(targetPosition, duration) {
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animationStep(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    window.scrollTo(0, startPosition + distance * easeOutQuad(progress));

    if (elapsedTime < duration) {
      requestAnimationFrame(animationStep);
    }
  }

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  requestAnimationFrame(animationStep);
}
