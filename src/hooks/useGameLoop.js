import { useEffect, useRef } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  tickAtom,
  progressAtom,
} from "../atoms/game";
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

  const tickIntervalRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const initialTimeoutRef = useRef(null);

  useEffect(() => {
    clearTimeout(initialTimeoutRef.current);
    clearInterval(tickIntervalRef.current);
    clearInterval(progressIntervalRef.current);
    setProgress(0);

    const domain = getDomainByKey(activeDomain);
    if (!domain) return;

    const { delay } = domain;

    // On attend 1 cycle complet avant de lancer le tick
    initialTimeoutRef.current = setTimeout(() => {
      setTick((t) => t + 1);
      tickIntervalRef.current = setInterval(() => {
        setTick((t) => t + 1);
      }, delay);
    }, delay);

    // Progression fluide de la barre
    const stepMs = 50;
    let current = 0;
    const step = (stepMs / delay) * 100;

    progressIntervalRef.current = setInterval(() => {
      current += step;
      if (current >= 100) current = 0;
      setProgress(current);
    }, stepMs);

    return () => {
      clearTimeout(initialTimeoutRef.current);
      clearInterval(tickIntervalRef.current);
      clearInterval(progressIntervalRef.current);
    };
  }, [activeDomain, setTick, setProgress]);

  useEffect(() => {
    switch (activeDomain) {
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
  }, [
    tickValue,
    setArcanesXp,
    setAlchemyXp,
    setShapingXp,
    setProgress,
    activeDomain,
  ]);
}
