import { useEffect, useRef, useState } from "react";
import "./ProgressTicker.css"

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

  return (
    <div className="progress-bar">
      <div
        className={`progress-bar-fill ${progress === 0 ? "no-transition" : ""}`}
        style={{ width: `${enabled ? progress : 0}%` }}
      />
    </div>
  );
}
