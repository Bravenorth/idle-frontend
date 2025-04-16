import { useEffect } from "react";

/**
 * Hook qui gère automatiquement la montée de niveau
 * @param {number} xp - XP actuel
 * @param {number} level - Niveau actuel
 * @param {Function} setXp - Setter de l'XP
 * @param {Function} setLevel - Setter du niveau
 * @param {number} baseXp - XP de base pour niveau 1
 * @param {number} xpGrowthFactor - facteur exponentiel de croissance
 * @returns {number} - XP requis pour le prochain niveau
 */
export default function useLevelSystem(xp, level, setXp, setLevel, baseXp, xpGrowthFactor) {
  const xpNeeded = Math.round(baseXp * Math.pow(xpGrowthFactor, level - 1));

  useEffect(() => {
    if (xp >= xpNeeded) {
      setXp((x) => x - xpNeeded);
      setLevel((l) => l + 1);
    }
  }, [xp, xpNeeded, setXp, setLevel]);

  return xpNeeded;
}
