// Typing Animation
const typingMessages = [
  "Urmila, you have the purest heart and the most beautiful soul.",
  "Every moment with you feels like a blessing.",
  "I may not be perfect, but my feelings for you are absolutely real and true.",
  "You inspire me to be a better person every single day.",
  "Your smile is my favorite thing to see.",
  "Being with you feels like home.",
];

let messageIndex = 0;

function typeMessage() {
  const typingElement = document.getElementById("typingText");
  if (!typingElement) return;

  const message = typingMessages[messageIndex];
  typingElement.textContent = "";
  let charIndex = 0;

  function typeChar() {
    if (charIndex < message.length) {
      typingElement.textContent += message[charIndex];
      charIndex++;
      setTimeout(typeChar, 50);
    } else {
      setTimeout(() => {
        messageIndex = (messageIndex + 1) % typingMessages.length;
        setTimeout(typeMessage, 2000);
      }, 3000);
    }
  }

  typeChar();
}

// Heart Explosion Animation
function createHeartExplosion(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "💕";
    heart.style.position = "absolute";
    heart.style.left = "50%";
    heart.style.top = "50%";
    heart.style.fontSize = "30px";
    heart.style.pointerEvents = "none";
    heart.style.userSelect = "none";

    const angle = (i / 20) * Math.PI * 2;
    const velocity = 5 + Math.random() * 5;
    const tx = Math.cos(angle) * velocity * 20;
    const ty = Math.sin(angle) * velocity * 20;

    heart.animate(
      [
        { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
        {
          transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: 1500,
        easing: "ease-out",
      }
    );

    container.appendChild(heart);
  }
}

// Confetti Animation
function createConfetti() {
  const container = document.getElementById("confettiContainer");
  if (!container) return;

  container.innerHTML = "";
  const colors = ["#ff6b9d", "#c984d4", "#ffd89b", "#f4d9a6", "#ff1493"];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.innerHTML = ["💕", "💍", "✨", "🎉"][
      Math.floor(Math.random() * 4)
    ];
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "-10px";
    confetti.style.fontSize = "20px" + Math.random() * 10;
    confetti.style.opacity = Math.random();
    confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s linear`;
    confetti.style.animationDelay = Math.random() * 0.5 + "s";

    container.appendChild(confetti);

    setTimeout(() => confetti.remove(), (2 + Math.random() * 2 + 0.5) * 1000);
  }
}

// Music Toggle
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

if (musicToggle && bgMusic) {
  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {
        console.log("[v0] Audio playback failed");
      });
      musicToggle.classList.add("playing");
    } else {
      bgMusic.pause();
      musicToggle.classList.remove("playing");
    }
  });
}

// Yes Button Handler
const yesBtn = document.getElementById("yesBtn");
if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    document.body.style.overflow = "hidden";

    createHeartExplosion("heartExplosion");
    createConfetti();

    setTimeout(() => {
      const celebration = document.getElementById("celebration");
      if (celebration) {
        celebration.classList.add("show");
        celebration.scrollIntoView({ behavior: "smooth" });
        document.body.style.overflow = "auto";

        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 500);
      }
    }, 800);
  });
}

// No Button Handler
const noBtn = document.getElementById("noBtn");
if (noBtn) {
  noBtn.addEventListener("click", () => {
    noBtn.textContent = "Try Again! 💕";
    noBtn.style.background =
      "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)";
    noBtn.style.color = "white";
    noBtn.style.border = "none";

    setTimeout(() => {
      noBtn.textContent = "No";
      noBtn.style.background = "white";
      noBtn.style.color = "var(--dark)";
      noBtn.style.border = "2px solid var(--dark)";
    }, 2000);
  });
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  typeMessage();

  // Smooth scrolling for scroll indicator
  document.querySelector(".scroll-indicator")?.addEventListener("click", () => {
    document.getElementById("messages").scrollIntoView({ behavior: "smooth" });
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation =
        entry.target.style.animation || "slideInUp 0.8s ease-out forwards";
    }
  });
}, observerOptions);

document.querySelectorAll(".reason-card, .timeline-item").forEach((el) => {
  observer.observe(el);
});
