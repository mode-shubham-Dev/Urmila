// Typing Animation for Messages
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

function typeLoveLetter() {
  const letterContent = document.getElementById("letterContent");
  if (!letterContent) return;

  const letterText = [
    "My Dearest Urmila,",
    "",
    "There are moments in life when you meet someone who changes everything. You are that person for me.",
    "",
    "From the first day, you made my world brighter. Your presence brings peace to my chaos, and your love gives me strength to face anything.",
    "",
    "I promise to be your biggest supporter, your safe place, and your forever companion. I want to build beautiful memories with you, laugh until our bellies hurt, and grow old together.",
    "",
    "You deserve all the love in this world, and I'm ready to give you that and more.",
    "",
    "Forever Yours,",
    "Shubham ❤️",
  ];

  let paragraphIndex = 0;

  function typeParagraph() {
    if (paragraphIndex < letterText.length) {
      const p = document.createElement("p");
      if (letterText[paragraphIndex] === "") {
        letterContent.appendChild(p);
        paragraphIndex++;
        setTimeout(typeParagraph, 500);
      } else {
        let charIndex = 0;
        const text = letterText[paragraphIndex];
        p.textContent = "";
        letterContent.appendChild(p);

        function typeChar() {
          if (charIndex < text.length) {
            p.textContent += text[charIndex];
            charIndex++;
            setTimeout(typeChar, 30);
          } else {
            paragraphIndex++;
            setTimeout(typeParagraph, 800);
          }
        }

        typeChar();
      }
    }
  }

  typeParagraph();
}

function createHeartBurst(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "💕";
    heart.style.position = "absolute";
    heart.style.left = "50%";
    heart.style.top = "50%";
    heart.style.fontSize = "40px";
    heart.style.pointerEvents = "none";
    heart.style.userSelect = "none";

    const angle = (i / 30) * Math.PI * 2;
    const velocity = 3 + Math.random() * 4;
    const tx = Math.cos(angle) * velocity * 40;
    const ty = Math.sin(angle) * velocity * 40;

    heart.animate(
      [
        { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
        {
          transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: 2000,
        easing: "ease-out",
      }
    );

    container.appendChild(heart);
  }
}

function createConfetti() {
  const container = document.createElement("div");
  container.id = "confetti";
  document.body.appendChild(container);

  const emojis = ["💕", "💍", "✨", "🎉", "💖", "🌹"];

  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement("div");
    confetti.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "-20px";
    confetti.style.fontSize = 16 + Math.random() * 20 + "px";
    confetti.style.opacity = Math.random();
    confetti.style.pointerEvents = "none";
    confetti.style.zIndex = "2";

    const duration = 2.5 + Math.random() * 2;
    const delay = Math.random() * 0.5;

    confetti.animate(
      [
        {
          transform: `translate(${
            (Math.random() - 0.5) * 100
          }px, 0) rotate(0deg)`,
          opacity: 1,
        },
        {
          transform: `translate(${
            (Math.random() - 0.5) * 200
          }px, 100vh) rotate(${Math.random() * 720}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    );

    container.appendChild(confetti);

    setTimeout(() => confetti.remove(), (duration + delay) * 1000 + 100);
  }

  setTimeout(() => container.remove(), 6000);
}

function createRoseRain() {
  const container = document.createElement("div");
  container.id = "roseRain";
  document.body.appendChild(container);

  for (let i = 0; i < 50; i++) {
    const rose = document.createElement("div");
    rose.innerHTML = "🌹";
    rose.style.position = "fixed";
    rose.style.left = Math.random() * 100 + "%";
    rose.style.top = "-50px";
    rose.style.fontSize = "30px";
    rose.style.pointerEvents = "none";
    rose.style.zIndex = "2";
    rose.style.opacity = Math.random() * 0.7 + 0.3;

    const duration = 4 + Math.random() * 3;
    const delay = Math.random() * 1;

    rose.animate(
      [
        { transform: "translateY(0) rotate(0deg)", opacity: 1 },
        {
          transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: "ease-in",
      }
    );

    container.appendChild(rose);

    setTimeout(() => rose.remove(), (duration + delay) * 1000 + 100);
  }

  setTimeout(() => container.remove(), 8000);
}

// Music Toggle
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

if (musicToggle && bgMusic) {
  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {
        console.log("[v0] Audio playback not supported");
      });
      musicToggle.classList.add("playing");
    } else {
      bgMusic.pause();
      musicToggle.classList.remove("playing");
    }
  });
}

const yesBtn = document.getElementById("yesBtn");
if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    // Show celebration modal
    const modal = document.getElementById("celebrationModal");
    if (modal) {
      modal.classList.add("show");

      // Trigger animations
      setTimeout(() => {
        createHeartBurst("heartBurst");
        createConfetti();
        createRoseRain();
      }, 300);
    }
  });
}

// NO Button Handler
const noBtn = document.getElementById("noBtn");
if (noBtn) {
  noBtn.addEventListener("click", () => {
    noBtn.textContent = "Try Again! 💕";
    noBtn.style.background =
      "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)";
    noBtn.style.color = "white";
    noBtn.style.border = "none";

    setTimeout(() => {
      noBtn.textContent = "Ask me later";
      noBtn.style.background = "white";
      noBtn.style.color = "var(--dark)";
      noBtn.style.border = "2px solid var(--dark)";
    }, 2000);
  });
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  typeMessage();
  typeLoveLetter();

  // Smooth scrolling for scroll indicator
  document.querySelector(".scroll-indicator")?.addEventListener("click", () => {
    document.getElementById("messages").scrollIntoView({ behavior: "smooth" });
  });
});

// Intersection Observer for animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target.style.opacity === "0") {
      entry.target.style.opacity = "1";
    }
  });
}, observerOptions);

document.querySelectorAll(".reason-card, .quote-card").forEach((el) => {
  observer.observe(el);
});
