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

function createHeartBurstPopup(containerId) {
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
    const velocity = 2 + Math.random() * 3;
    const tx = Math.cos(angle) * velocity * 30;
    const ty = Math.sin(angle) * velocity * 30;

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

function createPopupConfetti() {
  const container = document.getElementById("popupConfetti");
  if (!container) return;

  const emojis = ["💕", "💍", "✨", "🌹", "💖"];

  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement("div");
    confetti.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    confetti.style.position = "absolute";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = Math.random() * 100 + "%";
    confetti.style.fontSize = 12 + Math.random() * 16 + "px";
    confetti.style.opacity = Math.random();
    confetti.style.pointerEvents = "none";
    confetti.style.animation = `popupConfettiFall ${
      2 + Math.random() * 2
    }s ease-out forwards`;

    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
  }
}

// Add keyframe animation for popup confetti
const style = document.createElement("style");
style.textContent = `
  @keyframes popupConfettiFall {
    to {
      transform: translateY(150px) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

const musicToggle = document.getElementById("musicToggle");

if (musicToggle) {
  musicToggle.addEventListener("click", () => {
    musicToggle.classList.toggle("playing");
  });
}

const yesBtn = document.getElementById("yesBtn");
if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    const backdrop = document.getElementById("modalBackdrop");
    const popup = document.getElementById("celebrationPopup");

    if (backdrop && popup) {
      backdrop.classList.add("show");
      popup.classList.add("show");

      setTimeout(() => {
        createHeartBurstPopup("heartBurstPopup");
        createPopupConfetti();
      }, 400);
    }
  });
}

const closeBtn = document.getElementById("closeBtn");
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    const backdrop = document.getElementById("modalBackdrop");
    const popup = document.getElementById("celebrationPopup");

    if (backdrop && popup) {
      backdrop.classList.remove("show");
      popup.classList.remove("show");
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

document.addEventListener("DOMContentLoaded", () => {
  typeMessage();
  typeLoveLetter();

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

document
  .querySelectorAll(".reason-card, .quote-card, .timeline-item")
  .forEach((el) => {
    observer.observe(el);
  });
