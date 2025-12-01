// Optimize performance with requestAnimationFrame
let animationFrame;

// ==================== Particle System ====================
function createParticles() {
  const container = document.getElementById("particlesContainer");
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${
              [
                "rgba(231, 84, 128, 0.5)",
                "rgba(212, 165, 217, 0.5)",
                "rgba(244, 212, 168, 0.5)",
              ][Math.floor(Math.random() * 3)]
            };
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 8 + 4}s linear infinite;
            pointer-events: none;
        `;
    container.appendChild(particle);
  }

  const style = document.createElement("style");
  style.textContent = `
        @keyframes particleFloat {
            0% { transform: translateY(0px) translateX(0px); opacity: 1; }
            100% { transform: translateY(-${
              Math.random() * 100 + 50
            }px) translateX(${Math.random() * 50 - 25}px); opacity: 0; }
        }
    `;
  document.head.appendChild(style);
}

// ==================== Sparkles System ====================
function createSparkles() {
  const container = document.getElementById("sparklesContainer");
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const sparkle = document.createElement("div");
    sparkle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(244, 212, 168, 0.8);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: sparkleFlash ${
              Math.random() * 3 + 2
            }s ease-in-out infinite;
            pointer-events: none;
        `;
    container.appendChild(sparkle);
  }

  const style = document.createElement("style");
  style.textContent = `
        @keyframes sparkleFlash {
            0%, 100% { opacity: 0; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
        }
    `;
  document.head.appendChild(style);
}

// ==================== Confetti Animation ====================
function createConfetti() {
  const confettiContainer = document.getElementById("confetti");
  confettiContainer.innerHTML = "";

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    const randomX = Math.random() * window.innerWidth;
    const randomDelay = Math.random() * 0.5;
    const randomDuration = Math.random() * 2 + 2;

    confetti.style.cssText = `
            position: fixed;
            left: ${randomX}px;
            top: -10px;
            width: 10px;
            height: 10px;
            background: ${
              ["#e75480", "#d4a5d9", "#f4d4a8"][Math.floor(Math.random() * 3)]
            };
            border-radius: 50%;
            pointer-events: none;
            animation: fall ${randomDuration}s linear ${randomDelay}s forwards;
        `;
    confettiContainer.appendChild(confetti);
  }

  const style = document.createElement("style");
  style.textContent = `
        @keyframes fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(${
              window.innerHeight + 100
            }px) rotate(360deg); opacity: 0; }
        }
    `;
  document.head.appendChild(style);
}

// ==================== Typing Text Animation ====================
function typeText(element, text, speed = 50) {
  element.innerHTML = "";
  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
      setTimeout(type, speed);
    }
  }

  type();
}

// ==================== Scroll Intersection Observer ====================
function observeElements() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target.id;

          if (
            section === "messageSection" &&
            !entry.target.classList.contains("typed")
          ) {
            typeText(
              document.getElementById("typingText"),
              "Urmila, you have the purest heart and the most beautiful soul.\n\nEvery moment with you feels like a blessing.\n\nI may not be perfect, but my feelings for you are. 💕",
              40
            );
            entry.target.classList.add("typed");
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
}

// ==================== Music Toggle ====================
function setupMusicToggle() {
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");

  // Create a simple sine wave audio for romantic background music
  function createAudio() {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.frequency.value = 220; // A note
    gain.gain.setValueAtTime(0.1, audioContext.currentTime);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 2);
  }

  let isPlaying = false;

  musicToggle.addEventListener("click", () => {
    isPlaying = !isPlaying;
    musicToggle.classList.toggle("playing", isPlaying);

    if (isPlaying) {
      musicToggle.textContent = "🎵";
    } else {
      musicToggle.textContent = "🎵";
    }
  });
}

// ==================== Yes Button Handler ====================
function setupYesButton() {
  const yesButton = document.getElementById("yesButton");

  yesButton.addEventListener("click", () => {
    // Hide proposal section
    document.getElementById("proposalSection").style.display = "none";

    // Show final section
    document.getElementById("finalSection").style.display = "flex";

    // Create confetti
    createConfetti();

    // Scroll to final section
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Trigger heart explosions
    createHeartExplosion();
  });
}

// ==================== Heart Explosion ====================
function createHeartExplosion() {
  const container = document.getElementById("confetti");

  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("div");
    const angle = (i / 30) * Math.PI * 2;
    const velocity = 5 + Math.random() * 5;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    heart.textContent = "❤️";
    heart.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            font-size: 20px;
            pointer-events: none;
            z-index: 101;
        `;

    container.appendChild(heart);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let velX = vx;
    let velY = vy - 2;
    let life = 2;

    function animate() {
      life -= 0.016;
      x += velX;
      y += velY;
      velY += 0.1; // gravity

      heart.style.transform = `translate(${x - 10}px, ${y - 10}px)`;
      heart.style.opacity = life;

      if (life > 0) {
        requestAnimationFrame(animate);
      } else {
        heart.remove();
      }
    }

    animate();
  }
}

// ==================== Smooth Scroll Enhancement ====================
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// ==================== Mobile Optimization ====================
function optimizeForMobile() {
  if (window.innerWidth < 768) {
    // Reduce particle count for mobile
    document.querySelectorAll(".particles").forEach((el) => {
      el.querySelectorAll("div").forEach((div, i) => {
        if (i > 15) div.remove();
      });
    });
  }
}

// ==================== Initialize All ====================
document.addEventListener("DOMContentLoaded", () => {
  // Disable animations on mobile if needed for performance
  const isMobile = window.innerWidth < 768;

  createParticles();
  createSparkles();
  observeElements();
  setupMusicToggle();
  setupYesButton();
  smoothScroll();

  if (isMobile) {
    optimizeForMobile();
  }

  // Hide scroll indicator after first scroll
  let hasScrolled = false;
  window.addEventListener("scroll", () => {
    if (!hasScrolled && window.scrollY > 100) {
      document.querySelector(".scroll-indicator").style.opacity = "0";
      document.querySelector(".scroll-indicator").style.pointerEvents = "none";
      hasScrolled = true;
    }
  });
});

// Handle window resize for responsiveness
window.addEventListener("resize", () => {
  optimizeForMobile();
});
