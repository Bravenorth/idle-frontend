// src/constants/skills.js
export const SKILLS = [
    {
      key: "mining",
      label: "Minage",
      baseDelay: 3000,       // Temps de base en ms (avant ajustement par le niveau)
      delayFactor: 0.95,     // Réduction du délai à chaque niveau (asymptotique)
      baseXp: 10,            // XP nécessaire pour le niveau 1 → 2
      xpGrowthFactor: 1.15,  // Facteur multiplicatif de la courbe d'XP
      minDelay: 250          // Valeur plancher pour éviter un delay trop faible
    },
  ];
  
  export const getSkillByKey = (key) => SKILLS.find((s) => s.key === key);
