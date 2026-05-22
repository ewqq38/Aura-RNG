// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
  CARD_WIDTH: 140,
  NUM_CARDS: 35,
  ANIMATION_DURATION: 4000,
  STAR_COUNT: 100,
  PARTICLE_COUNT: 25,
  CARD_DELAY: 50,
};

const AURAS = [
  { name: "COMMON", color: "#888888", chance: 50, rarity: 0 },
  { name: "RARE", color: "#3388ff", chance: 30, rarity: 1 },
  { name: "EPIC", color: "#9933ff", chance: 12, rarity: 2 },
  { name: "LEGENDARY", color: "#ffaa00", chance: 5, rarity: 3 },
  { name: "MYTHIC", color: "#ff1493", chance: 1.8, rarity: 4 },
  { name: "DIVINE", color: "#00ffff", chance: 1.2, rarity: 5 },
];

// ============================================
// STATE MANAGEMENT
// ============================================

const STATE = {
  isRolling: false,
  totalRolls: 0,
  legendaryCount: 0,
};

// ============================================
// DOM ELEMENTS
// ============================================

const rollBtn = document.getElementById("rollBtn");
const auraBar = document.getElementById("auraBar");
const result = document.getElementById("result");
const resultRarity = document.getElementById("resultRarity");
const totalRollsDisplay = document.getElementById("totalRolls");
const legendaryCountDisplay = document.getElementById("legendaryCount");
const particlesContainer = document.getElementById("particlesContainer");
const starsCanvas = document.getElementById("starsCanvas");

// ============================================
// STARFIELD CLASS
// ============================================

class Starfield {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.stars = [];
    this.shootingStars = [];
    this.resize();
    this.init();
    window.addEventListener("resize", () => this.resize());
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    this.stars = [];
    for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
  }

  createShootingStar() {
    this.shootingStars.push({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height * 0.5,
      vx: Math.random() * 5 + 2,
      vy: Math.random() * 5 + 2,
      length: Math.random() * 100 + 50,
      opacity: 1,
    });
  }

  animate() {
    this.ctx.fillStyle = "transparent";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw stars
    this.ctx.fillStyle = "#ffffff";
    for (let star of this.stars) {
      star.twinklePhase += star.twinkleSpeed;
      const currentOpacity = star.opacity + Math.sin(star.twinklePhase) * 0.3;
      this.ctx.globalAlpha = currentOpacity;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Draw shooting stars
    this.ctx.globalAlpha = 1;
    this.ctx.strokeStyle = "#00ffff";
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const ss = this.shootingStars[i];
      this.ctx.globalAlpha = ss.opacity;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(ss.x, ss.y);
      this.ctx.lineTo(ss.x - ss.vx * 2, ss.y - ss.vy * 2);
      this.ctx.stroke();

      ss.x += ss.vx;
      ss.y += ss.vy;
      ss.opacity -= 0.01;

      if (ss.opacity <= 0) {
        this.shootingStars.splice(i, 1);
      }
    }

    this.ctx.globalAlpha = 1;
    requestAnimationFrame(() => this.animate());
  }
}

// ============================================
// PARTICLE SYSTEM
// ============================================

class ParticleSystem {
  static createBurst(x, y, color, count = CONFIG.PARTICLE_COUNT) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const velocity = {
        x: Math.cos(angle) * (Math.random() * 8 + 4),
        y: Math.sin(angle) * (Math.random() * 8 + 4),
      };

      const particle = document.createElement("div");
      particle.className = "particle particle-burst";
      particle.style.color = color;
      particle.style.left = x + "px";
      particle.style.top = y + "px";
      particle.style.backgroundColor = color;
      particlesContainer.appendChild(particle);

      let opacity = 1;
      let life = 60;
      const startX = x;
      const startY = y;
      let currentX = x;
      let currentY = y;

      const animate = () => {
        currentX += velocity.x;
        currentY += velocity.y;
        velocity.y += 0.2; // gravity
        opacity -= 1 / 60;
        life--;

        particle.style.left = currentX + "px";
        particle.style.top = currentY + "px";
        particle.style.opacity = Math.max(0, opacity);

        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      };

      animate();
    }
  }
}

// ============================================
// AURA FUNCTIONS
// ============================================

function getRandomAura() {
  let random = Math.random() * 100;
  let total = 0;

  for (let aura of AURAS) {
    total += aura.chance;
    if (random <= total) {
      return aura;
    }
  }

  return AURAS[AURAS.length - 1];
}

function generateRollVisuals(finalAura) {
  auraBar.innerHTML = "";

  // Calculate total width needed
  const totalWidth = CONFIG.CARD_WIDTH * CONFIG.NUM_CARDS;

  // Generate random auras for the scrolling effect
  for (let i = 0; i < CONFIG.NUM_CARDS - 1; i++) {
    const randomAura = AURAS[Math.floor(Math.random() * AURAS.length)];
    const card = document.createElement("div");
    card.className = "aura-card";
    card.textContent = randomAura.name;
    card.style.background = randomAura.color;
    auraBar.appendChild(card);
  }

  // Add the final aura as the last card
  const finalCard = document.createElement("div");
  finalCard.className = "aura-card";
  finalCard.textContent = finalAura.name;
  finalCard.style.background = finalAura.color;
  auraBar.appendChild(finalCard);
}

function calculateRollDistance() {
  // Position final card at center (50% scroll - half card width)
  const visibleWidth = 280; // roll-box width
  const cardCenter = CONFIG.CARD_WIDTH / 2;
  const targetPosition = (CONFIG.NUM_CARDS - 1.5) * CONFIG.CARD_WIDTH;
  return targetPosition;
}

// ============================================
// DISPLAY FUNCTIONS
// ============================================

function displayResult(aura) {
  result.textContent = `YOU GOT: ${aura.name}`;
  result.style.color = aura.color;
  result.className = `result ${aura.name.toLowerCase()}`;

  // Display rarity description
  const rarityText = getRarityDescription(aura);
  resultRarity.textContent = rarityText;
  resultRarity.className = `result-rarity ${aura.name.toLowerCase()}`;
}

function getRarityDescription(aura) {
  const descriptions = {
    COMMON: "✦ Your fate is ordinary...",
    RARE: "✧ A glimpse of fortune!",
    EPIC: "★ An epic destiny awaits!",
    LEGENDARY: "✦✦ LEGENDARY POWER! ✦✦",
    MYTHIC: "✧✧ MYTHIC BEING AWAKENED! ✧✧",
    DIVINE: "★★ DIVINE TRANSCENDENCE! ★★",
  };
  return descriptions[aura.name] || "";
}

function updateStats() {
  totalRollsDisplay.textContent = STATE.totalRolls;
  legendaryCountDisplay.textContent = STATE.legendaryCount;
}

function saveStats() {
  localStorage.setItem(
    "auraRngStats",
    JSON.stringify({
      totalRolls: STATE.totalRolls,
      legendaryCount: STATE.legendaryCount,
    })
  );
}

function loadStats() {
  const saved = localStorage.getItem("auraRngStats");
  if (saved) {
    const stats = JSON.parse(saved);
    STATE.totalRolls = stats.totalRolls || 0;
    STATE.legendaryCount = stats.legendaryCount || 0;
    updateStats();
  }
}

// ============================================
// ROLL FUNCTION
// ============================================

function performRoll() {
  if (STATE.isRolling) return;

  STATE.isRolling = true;
  rollBtn.disabled = true;

  const finalAura = getRandomAura();
  generateRollVisuals(finalAura);

  // Reset position
  auraBar.style.transition = "none";
  auraBar.style.transform = "translateX(0px)";

  // Brief delay then trigger animation
  setTimeout(() => {
    const distance = calculateRollDistance();
    auraBar.style.transition = `transform ${CONFIG.ANIMATION_DURATION}ms cubic-bezier(0.15, 0.8, 0.15, 1)`;
    auraBar.style.transform = `translateX(-${distance}px)`;
  }, CONFIG.CARD_DELAY);

  result.textContent = "ROLLING...";
  result.classList.remove("legendary");
  resultRarity.textContent = "";

  // Show final result
  setTimeout(() => {
    displayResult(finalAura);

    // Track statistics
    STATE.totalRolls++;
    if (
      finalAura.name === "LEGENDARY" ||
      finalAura.name === "MYTHIC" ||
      finalAura.name === "DIVINE"
    ) {
      STATE.legendaryCount++;
    }
    updateStats();
    saveStats();

    // Special effect for rare auras
    if (finalAura.rarity >= 3) {
      document.body.classList.add("shake");
      result.classList.add("legendary");
      ParticleSystem.createBurst(
        window.innerWidth / 2,
        window.innerHeight / 2,
        finalAura.color,
        50
      );

      setTimeout(() => {
        document.body.classList.remove("shake");
        STATE.isRolling = false;
        rollBtn.disabled = false;
      }, 600);
    } else {
      STATE.isRolling = false;
      rollBtn.disabled = false;
    }
  }, CONFIG.ANIMATION_DURATION + 200);

  // Randomly create shooting stars during roll
  if (Math.random() > 0.5) {
    starfield.createShootingStar();
  }
}

// ============================================
// EVENT LISTENERS
// ============================================

rollBtn.addEventListener("click", performRoll);

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.code === "Enter" || e.code === "Space") {
    e.preventDefault();
    performRoll();
  }
});

// ============================================
// INITIALIZATION
// ============================================

let starfield;

window.addEventListener("load", () => {
  // Initialize starfield
  starfield = new Starfield(starsCanvas);

  // Load saved stats
  loadStats();

  // Create initial shooting stars occasionally
  setInterval(() => {
    if (Math.random() > 0.7) {
      starfield.createShootingStar();
    }
  }, 3000);

  // Update result display initially
  result.textContent = "Press ROLL to begin";
  resultRarity.textContent = "✧ Your destiny awaits ✧";
});

// ============================================
// RESPONSIVE ADJUSTMENTS
// ============================================

window.addEventListener("resize", () => {
  // Adjust for mobile
  if (window.innerWidth < 768) {
    CONFIG.PARTICLE_COUNT = 15;
  } else {
    CONFIG.PARTICLE_COUNT = 25;
  }
});
