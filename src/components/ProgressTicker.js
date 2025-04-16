import { useEffect, useRef, useState } from "react";

/**
 * Composant entièrement indépendant pour gérer une itération avec progression.
 *
 * Props :
 * - delay : durée en ms d’une itération complète
 * - enabled : booléen pour activer/désactiver l’itération
 * - onComplete : callback appelé à chaque fin d’itération
 * - render : fonction facultative pour rendre une UI personnalisée avec `progress`
 */
export default function ProgressTicker({ delay = 1000, enabled = false, onComplete, render }) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    clearInterval(intervalRef.current);
    setProgress(0);

    if (!enabled || !delay || delay <= 0) return;

    const stepMs = 50;
    let current = 0;
    const step = (stepMs / delay) * 100;

    intervalRef.current = setInterval(() => {
      current += step;
      if (current >= 100) {
        current = 0;
        onComplete?.();
      }
      setProgress(current);
    }, stepMs);

    return () => clearInterval(intervalRef.current);
  }, [enabled, delay, onComplete]);

  if (render) {
    return render(progress);
  }

  // Rendu par défaut (UI simple)
  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${enabled ? progress : 0}%` }}
      />
    </div>
  );
}
