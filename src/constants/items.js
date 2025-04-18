export const ITEMS = [
  {
    id: "rock",
    name: "Pierre",
    icon: "🪨",
    chance: 0.5,
  },
  {
    id: "ore",
    name: "Minerai brut",
    icon: "⛏️",
    chance: 0.2,
  },
  {
    id: "gem",
    name: "Gemme",
    icon: "💎",
    chance: 0.05,
  },
  {
    id: "fossil",
    name: "Fossile",
    icon: "🦴",
    chance: 0.03,
  },
  {
    id: "crystal",
    name: "Cristal magique",
    icon: "🔮",
    chance: 0.02,
  },
  {
    id: "relic",
    name: "Relique ancienne",
    icon: "🏺",
    chance: 0.01,
  },
  {
    id: "coin",
    name: "Pièce d'or",
    icon: "🪙",
    chance: 0.15,
  },
];

export const getItemById = (id) => ITEMS.find((item) => item.id === id);
