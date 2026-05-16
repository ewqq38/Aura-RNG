const auraBar = document.getElementById("auraBar");
const rollBtn = document.getElementById("rollBtn");
const result = document.getElementById("result");

const auras = [
  {
    name: "COMMON",
    color: "gray",
    chance: 50
  },
  {
    name: "RARE",
    color: "blue",
    chance: 30
  },
  {
    name: "EPIC",
    color: "purple",
    chance: 12
  },
  {
    name: "LEGENDARY",
    color: "gold",
    chance: 5
  },
  {
    name: "MYTHIC",
    color: "hotpink",
    chance: 1.8
  },
  {
    name: "DIVINE",
    color: "white",
    chance: 0.2
  }
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
}

function generateRollVisuals(finalAura) {
  auraBar.innerHTML = "";

  for (let i = 0; i < 25; i++) {
    const aura = auras[Math.floor(Math.random() * auras.length)];

    const div = document.createElement("div");
    div.className = "aura-card";

    div.textContent = aura.name;
    div.style.background = aura.color;

    auraBar.appendChild(div);
  }

  const finalCard = document.createElement("div");
  finalCard.className = "aura-card";
  finalCard.textContent = finalAura.name;
  finalCard.style.background = finalAura.color;

  auraBar.appendChild(finalCard);
}

rollBtn.addEventListener("click", () => {
  const finalAura = getRandomAura();

  generateRollVisuals(finalAura);

  auraBar.style.transition = "none";
  auraBar.style.transform = "translateX(0px)";

  setTimeout(() => {
    auraBar.style.transition = "transform 4s cubic-bezier(.1,.8,.1,1)";
    auraBar.style.transform = "translateX(-3900px)";
  }, 50);

  result.textContent = "ROLLING...";

  setTimeout(() => {
    result.textContent = "YOU GOT: " + finalAura.name;

    result.style.color = finalAura.color;

    if (
      finalAura.name === "LEGENDARY" ||
      finalAura.name === "MYTHIC" ||
      finalAura.name === "DIVINE"
    ) {
      document.body.classList.add("shake");
      result.classList.add("legendary");

      setTimeout(() => {
        document.body.classList.remove("shake");
      }, 600);
    }
  }, 4200);
});
