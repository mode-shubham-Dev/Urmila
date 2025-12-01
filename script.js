// ===== CONFIG & SETUP =====
const config = {
  enableConfetti: true,
  enableHearts: true,
  enableParticles: true,
  musicAutoPlay: false,
};

// ===== HELPER FUNCTIONS =====
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPosition() {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  };
}

// ===== CURSOR HEART TRAIL =====
const cursorTrail = document.getElementById("cursor-trail");
let cursorX = 0;
let cursorY = 0;

document.addEventListener("mousemove", (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;

  if (Math.random() < 0.3) {
    createHeartTrail(cursorX, cursorY);
  }
});

function createHeartTrail(x, y) {
  const heart = document.createElement("div");
  heart.className = "heart-trail";
  heart.textContent = ["❤️", "💕", "💖"][getRandomInt(0, 2)];
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  cursorTrail.appendChild(heart);

  setTimeout(() => heart.remove(), 1000);
}

// ===== CONFETTI EXPLOSION =====
function createConfetti() {
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "2001";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const particles = [];

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 15,
      vy: (Math.random() - 0.5) * 15 - 5,
      life: 1,
      char: ["❤️", "💖", "💕", "✨", "🎉"][getRandomInt(0, 4)],
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3; // gravity
      p.life -= 0.01;

      ctx.globalAlpha = p.life;
      ctx.font = "30px Arial";
      ctx.fillText(p.char, p.x, p.y);

      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    });

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  }

  animate();
}

// ===== PARTICLES BACKGROUND =====
function initParticles() {
  const container = document.getElementById("particles-container");

  const emojis = ["❤️", "💕", "💖", "✨", "🌹", "💐", "💝"];

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.textContent = emojis[getRandomInt(0, emojis.length - 1)];
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.fontSize = getRandomInt(16, 32) + "px";
    particle.style.opacity = Math.random() * 0.4 + 0.1;
    particle.style.animation = `float-up ${getRandomInt(
      8,
      15
    )}s ease-in infinite`;
    particle.style.animationDelay = Math.random() * 5 + "s";

    container.appendChild(particle);
  }
}

// ===== FLOATING HEARTS =====
function createFloatingHearts() {
  const container = document.querySelector(".floating-hearts");
  if (!container) return;

  for (let i = 0; i < 5; i++) {
    const heart = document.createElement("div");
    heart.className = "heart-float";
    heart.textContent = "💕";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDelay = Math.random() * 2 + "s";
    container.appendChild(heart);

    setTimeout(() => {
      if (container) {
        heart.remove();
        createFloatingHearts();
      }
    }, 4000);
  }
}

// ===== PROPOSAL FLOATING HEARTS =====
function createProposalHearts() {
  const container = document.querySelector(".floating-hearts-proposal");
  if (!container) return;

  for (let i = 0; i < 8; i++) {
    const heart = document.createElement("div");
    heart.className = "heart-proposal";
    heart.textContent = ["❤️", "💕", "💖"][getRandomInt(0, 2)];
    heart.style.left = getRandomInt(10, 90) + "%";
    heart.style.top = getRandomInt(50, 200) + "px";
    heart.style.animationDelay = Math.random() * 2 + "s";
    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 5000);
  }
}

// ===== RINGS ANIMATION =====
function createRings() {
  const container = document.querySelector(".rings-animation");
  if (!container) return;

  for (let i = 0; i < 3; i++) {
    const ring = document.createElement("div");
    ring.className = "ring";
    container.appendChild(ring);
  }

  setTimeout(() => {
    if (container) {
      container.innerHTML = "";
      createRings();
    }
  }, 3000);
}

// ===== TYPING ANIMATION =====
function typeText(element) {
  const text = element.textContent;
  element.textContent = "";
  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
      setTimeout(type, 30);
    }
  }

  type();
}

// ===== BUBBLE MESSAGES =====
const compliments = [
  "You're my sunshine ☀️",
  "Forever yours 💕",
  "My heart is yours ❤️",
  "I adore you 😍",
  "You're perfect 👑",
  "I love you 💖",
  "You light my world ✨",
  "Always & forever 💝",
];

function createBubbleMessages() {
  const container = document.querySelector(".bubble-messages");
  if (!container) return;

  const randomCompliments = compliments
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  randomCompliments.forEach((msg, i) => {
    setTimeout(() => {
      const bubble = document.createElement("div");
      bubble.className = "bubble-msg";
      bubble.textContent = msg;
      container.appendChild(bubble);
    }, i * 200);
  });
}

// ===== MUSIC TOGGLE =====
const musicToggle = document.getElementById("music-toggle");
const backgroundMusic = document.getElementById("background-music");
let isMusicPlaying = false;

musicToggle.addEventListener("click", () => {
  if (isMusicPlaying) {
    backgroundMusic.pause();
    musicToggle.classList.remove("playing");
    isMusicPlaying = false;
  } else {
    backgroundMusic
      .play()
      .catch((err) => console.log("Audio play failed:", err));
    musicToggle.classList.add("playing");
    isMusicPlaying = true;
  }
});

// ===== COMPATIBILITY METER =====
function animateCompatibilityMeter() {
  const meter = document.querySelector(".meter-fill");
  if (meter) {
    setTimeout(() => {
      meter.style.width = "92%";
    }, 500);
  }

  // Animate percentage counter
  let currentPercent = 0;
  const targetPercent = 92;
  const percentSpan = document.getElementById("compatibility-percent");

  const interval = setInterval(() => {
    if (currentPercent < targetPercent) {
      currentPercent++;
      percentSpan.textContent = currentPercent;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

// ===== LOVE LETTER MODAL =====
const loveLetter = document.getElementById("love-letter");
const closeLetter = document.querySelector(".close-letter");

closeLetter.addEventListener("click", () => {
  loveLetter.style.display = "none";
});

loveLetter.addEventListener("click", (e) => {
  if (e.target === loveLetter) {
    loveLetter.style.display = "none";
  }
});

// ===== YES BUTTON HANDLER =====
const yesButton = document.getElementById("yes-button");
const finalMessage = document.getElementById("final-message");

yesButton.addEventListener("click", () => {
  // Shake effect
  document.body.style.animation = "shake 0.5s";

  // Trigger confetti
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      createConfetti();
    }, i * 200);
  }

  // Show final message
  setTimeout(() => {
    finalMessage.classList.remove("hidden");
  }, 500);
});

// Shake animation
const style = document.createElement("style");
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ===== PAGE SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll('[class*="section"]').forEach((el) => {
  observer.observe(el);
});

// ===== SCROLL ARROW FUNCTIONALITY =====
const scrollArrow = document.querySelector(".scroll-arrow");
if (scrollArrow) {
  scrollArrow.addEventListener("click", () => {
    document
      .getElementById("message-section")
      .scrollIntoView({ behavior: "smooth" });
  });
}

// ===== PAGE LOAD ANIMATIONS =====
window.addEventListener("load", () => {
  initParticles();
  createFloatingHearts();
  createRings();
  createBubbleMessages();
  animateCompatibilityMeter();
  typeText(document.getElementById("typing-text"));

  // Auto-trigger proposal hearts
  setInterval(() => {
    if (Math.random() < 0.3) {
      createProposalHearts();
    }
  }, 2000);
});

// ===== RESPONSIVE HANDLING =====
window.addEventListener("resize", () => {
  const canvas = document.querySelector("canvas");
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

// ===== DOUBLE-TAP EASTER EGG =====
let lastTap = 0;
document.addEventListener("touchend", () => {
  const currentTime = new Date().getTime();
  const tapLength = currentTime - lastTap;

  if (tapLength < 300 && tapLength > 0) {
    createConfetti();
  }

  lastTap = currentTime;
});

// ===== CONSOLE MESSAGE =====
console.log(
  "%cUrmila, This Website is Made With Love For You! 💕",
  "color: #e89bb5; font-size: 20px; font-weight: bold;"
);
