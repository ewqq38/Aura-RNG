onst rollBtn = document.getElementById("rollBtn");
const rollTrack = document.getElementById("rollTrack");
const auraName = document.getElementById("auraName");
const auraDescription = document.getElementById("auraDescription");
const recentRolls = document.getElementById("recentRolls");
const equippedAura = document.getElementById("equippedAura");
const rollsText = document.getElementById("rolls");

let totalRolls = 0;

const auras = [

  {
    name: "Quicksand",
    rarity: "RARE",
    color: "#ccaa55",
    description: "The shifting desert consumes all."
  },

  {
    name: "The Rift",
    rarity: "RARE",
    color: "#3388ff",
    description: "Reality tears apart."
  },

  {
    name: "Cursed Flame",
    rarity: "EPIC",
    color: "#bb44ff",
    description: "Purple fire from another world."
  },

  {
    name: "Divine Light",
    rarity: "LEGENDARY",
    color: "gold",
    description: "Pure celestial energy."
  },

  {
    name: "Galaxy",
    rarity: "EPIC",
    color: "#9944ff",
    description: "A spiral of stars."
  },

  {
    name: "Primordial Chaos",
    rarity: "PRIMAL",
    color: "#
