const rollBtn = document.getElementById("rollBtn");
const auraBar = document.getElementById("auraBar");
const result = document.getElementById("result");

let totalRolls = 0;
let isRolling = false;

const auras = [
  { name: "COMMON", color: "#888888", chance: 50 },
  { name: "RARE", color: "#3388ff", chance: 30 },
  { name: "EPIC", color: "#9933ff", chance: 12 },
  { name: "LEGENDARY", color: "#ffaa00", chance: 5 },
  { name: "MYTHIC", color: "#ff1493", chance: 1.8 },
  { name: "DIVINE", color: "#00ffff", chance: 1.2 }
];

function getRandomAura() {
  let random = Math.random() * 100;
  let total = 0;

  for (let aura of auras) {
    total += aura.chance;
    if (random <= total) {
      return aura;
    }
  }

  return auras[auras.length - 1];
}

function generateRollVisuals(finalAura) {
  auraBar.innerHTML = "";

  // Generate random auras for the scrolling effect
  for (let i = 0; i < 25; i++) {
    const randomAura = auras[Math.floor(Math.random() * auras.length)];
    const card = document.createElement("div");
    card.className = "aura-card";
    card.textContent = randomAura.name;
    card.style.background = randomAura.color;
    auraBar.appendChild(card);
  }

  // Add the final aura
  const finalCard = document.createElement("div");
  finalCard.className = "aura-card final";
  finalCard.textContent = finalAura.name;
  finalCard.style.background = finalAura.color;
  auraBar.appendChild(finalCard);
}

rollBtn.addEventListener("click", () => {
  if (isRolling) return;

  isRolling = true;
  rollBtn.disabled = true;

  const finalAura = getRandomAura();
  generateRollVisuals(finalAura);

  // Reset position
  auraBar.style.transition = "none";
  auraBar.style.transform = "translateX(0px)";

  // Trigger animation
  setTimeout(() => {
    auraBar.style.transition = "transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)";
    auraBar.style.transform = "translateX(-3900px)";
  }, 50);

  result.textContent = "ROLLING...";
  result.classList.remove("legendary");

  // Show final result
  setTimeout(() => {
    result.textContent = "YOU GOT: " + finalAura.name;
    result.style.color = finalAura.color;

    // Special effect for rare auras
    if (
      finalAura.name === "LEGENDARY" ||
      finalAura.name === "MYTHIC" ||
      finalAura.name === "DIVINE"
    ) {
      document.body.classList.add("shake");
      result.classList.add("legendary");

      setTimeout(() => {
        document.body.classList.remove("shake");
        isRolling = false;
        rollBtn.disabled = false;
      }, 600);
    } else {
      isRolling = false;
      rollBtn.disabled = false;
    }

    totalRolls++;
  }, 4200);
});
