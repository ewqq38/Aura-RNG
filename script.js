onst rollBtn = document.getElementById("rollBtn");
const rollTrack = document.getElementById("rollTrack");
const auraName = document.getElementById("auraName");
const auraDescription = document.getElementById("auraDescription");
const recentRolls = document.getElementById("recentRolls");
const equippedAura = document.getElementById("equippedAura");
const rollsText = document.getElementById("rolls");

let totalRolls = 0;

const auras = [

  { name: "Quicksand", rarity: "COMMON", color: "#b89b5e", description: "The desert slowly swallows reality." },
  { name: "Stone", rarity: "COMMON", color: "#888888", description: "Cold and unbreakable." },
  { name: "Mist", rarity: "COMMON", color: "#bbbbbb", description: "A drifting cloud of silence." },
  { name: "Forest", rarity: "COMMON", color: "#55aa55", description: "Nature watches quietly." },
  { name: "Ocean", rarity: "COMMON", color: "#3388ff", description: "The tides never rest." },
