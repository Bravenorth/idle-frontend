// src/hooks/useTickEngine.js
import { useEffect, useRef } from "react";

export default function useTickEngine({ delay, enabled, onTick, onProgress }) {
  const tickRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    clearInterval(tickRef.current);
    clearInterval(progressRef.current);
    onProgress(0);

    if (!enabled || !delay || delay <= 0) {
      return;
    }

    tickRef.current = setInterval(() => {
      onTick();
    }, delay);

    const stepMs = 50;
    let progressValue = 0;
    const step = (stepMs / delay) * 100;

    progressRef.current = setInterval(() => {
      progressValue += step;
      if (progressValue >= 100) progressValue = 0;
      onProgress(progressValue);
    }, stepMs);

    return () => {
      clearInterval(tickRef.current);
      clearInterval(progressRef.current);
    };
  }, [delay, enabled, onTick, onProgress]);
}
