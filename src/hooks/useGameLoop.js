import { useEffect, useRef } from "react";
import { useAtom, useAtomValue } from "jotai";
import { tickAtom, progressAtom } from "../atoms/game";
import {
  arcanesXpAtom,
  alchemyXpAtom,
  shapingXpAtom,
  activeDomainAtom,
} from "../atoms/skills";
import { getDomainByKey } from "../constants/domains";

export default function useGameLoop() {
  const [activeDomain] = useAtom(activeDomainAtom);
  const [, setTick] = useAtom(tickAtom);
  const [, setProgress] = useAtom(progressAtom);

  const [, setArcanesXp] = useAtom(arcanesXpAtom);
  const [, setAlchemyXp] = useAtom(alchemyXpAtom);
  const [, setShapingXp] = useAtom(shapingXpAtom);

  const tickValue = useAtomValue(tickAtom);

  const tickRef = useRef(null);
  const progressRef = useRef(null);

  // 🌀 Tick Engine
  useEffect(() => {
    clearInterval(tickRef.current);
    clearInterval(progressRef.current);
    setProgress(0);

    const domain = getDomainByKey(activeDomain);
    if (!domain) return;

    const { delay } = domain;

    tickRef.current = setInterval(() => {
      setTick((t) => t + 1);
    }, delay);

    const stepMs = 50;
    let current = 0;
    const step = (stepMs / delay) * 100;

    progressRef.current = setInterval(() => {
      current += step;
      if (current >= 100) current = 0;
      setProgress(current);
    }, stepMs);

    return () => {
      clearInterval(tickRef.current);
      clearInterval(progressRef.current);
    };
  }, [activeDomain, setTick, setProgress]);

  // ✅ Gagne l'XP uniquement quand le tick change
  useEffect(() => {
    const domain = getDomainByKey(activeDomain);
    if (!domain) return;

    switch (domain.key) {
      case "arcanes":
        setArcanesXp((xp) => xp + 1);
        break;
      case "alchemy":
        setAlchemyXp((xp) => xp + 1);
        break;
      case "shaping":
        setShapingXp((xp) => xp + 1);
        break;
      default:
        break;
    }

    setProgress(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickValue]); // ← uniquement au tick
}