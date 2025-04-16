/**
 * Calcule dynamiquement le délai d’un skill selon son niveau.
 * Le délai diminue de façon asymptotique.
 */
export default function useSkillDelay(level, baseDelay, delayFactor, minDelay) {
    const rawDelay = baseDelay * Math.pow(delayFactor, level - 1);
    return Math.max(minDelay, rawDelay);
  }
  