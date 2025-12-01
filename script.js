// Performance Optimization: Reduce particle count
const PARTICLE_COUNT = 12;
const HEART_PARTICLES = 8;
const CONFETTI_COUNT = 30;

// Optimized particle generation
function createParticles() {
  const container = document.getElementById("particlesContainer");
  if (!container) return;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.textContent = ["❤️", "✨", "💕", "🌹"][
      Math.floor(Math.random() * 4)
    ];

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = 15 + Math.random() * 10;

    particle.style.left = x + "%";
    particle.style.top = y + "%";
    particle.style.animation = `float ${duration}s infinite linear`;
    particle.style.opacity = Math.random() * 0.5 + 0.3;

    container.appendChild(particle);
  }
}

// Optimized CSS animation for particles
function addParticleAnimations() {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0.3; }
            25% { opacity: 0.6; }
            50% { transform: translateY(-100vh) translateX(100px); opacity: 0.4; }
            100% { transform: translateY(-200vh) translateX(-100px); opacity: 0; }
        }
        
        @keyframes heart-float {
            0% { transform: translateY(100vh) translateX(0) scale(1); opacity: 1; }
            100% { transform: translateY(-100vh) translateX(150px) scale(0.5); opacity: 0; }
        }
        
        @keyframes confetti-fall {
            0% { transform: translateY(0) rotateZ(0deg) scale(1); opacity: 1; }
            100% { transform: translateY(100vh) rotateZ(360deg) scale(0); opacity: 0; }
        }
    `;
  document.head.appendChild(style);
}

// Cursor heart trail (optimized - every 50ms max)
let lastHeartTime = 0;
document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastHeartTime < 50) return; // Throttle to 50ms
  lastHeartTime = now;

  const heart = document.createElement("div");
  heart.className = "particle";
  heart.textContent = "❤️";
  heart.style.left = e.clientX + "px";
  heart.style.top = e.clientY + "px";
  heart.style.position = "fixed";
  heart.style.pointerEvents = "none";
  heart.style.fontSize = "20px";
  heart.style.animation = "heart-float 1s ease-out forwards";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 1000);
});

// Typing animation
function typeText() {
  const typingText = document.getElementById("typingText");
  if (!typingText) return;

  const fullText =
    "Urmila, you have the purest heart and the most beautiful soul.\nEvery moment with you feels like a blessing.\nI may not be perfect, but my feelings for you are.";
  let index = 0;

  function type() {
    if (index < fullText.length) {
      typingText.textContent += fullText[index];
      index++;
      setTimeout(type, 50);
    }
  }

  type();
}

// Confetti explosion (optimized)
function triggerConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;

  function frame() {
    const confetti = document.createElement("div");
    confetti.className = "particle";
    confetti.textContent = ["❤️", "💕", "✨", "🎉"][
      Math.floor(Math.random() * 4)
    ];
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "-20px";
    confetti.style.position = "fixed";
    confetti.style.pointerEvents = "none";
    confetti.style.fontSize = Math.random() * 20 + 15 + "px";
    confetti.style.animation =
      "confetti-fall " + (Math.random() * 2 + 2) + "s ease-in forwards";

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3000);

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }

  frame();
}

// Proposal button click handler
document.addEventListener("DOMContentLoaded", () => {
  // Initialize
  addParticleAnimations();
  createParticles();
  typeText();

  // Proposal button
  const proposalButton = document.getElementById("proposalButton");
  if (proposalButton) {
    proposalButton.addEventListener("click", () => {
      triggerConfetti();

      setTimeout(() => {
        const celebrationSection =
          document.getElementById("celebrationSection");
        if (celebrationSection) {
          celebrationSection.classList.add("show");
          celebrationSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    });
  }

  // Music toggle
  const musicToggle = document.getElementById("musicToggle");
  const backgroundMusic = document.getElementById("backgroundMusic");

  if (musicToggle && backgroundMusic) {
    let isPlaying = false;

    musicToggle.addEventListener("click", () => {
      if (isPlaying) {
        backgroundMusic.pause();
        musicToggle.style.opacity = "0.6";
      } else {
        backgroundMusic.volume = 0.3;
        backgroundMusic.play().catch(() => {
          console.log("Audio autoplay prevented by browser");
        });
        musicToggle.style.opacity = "1";
      }
      isPlaying = !isPlaying;
    });
  }

  // Smooth scroll for scroll indicator
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    });
  }
});

// Intersection Observer for fade-in animations (efficient)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade-in").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });
});
