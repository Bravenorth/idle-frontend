import ProgressTicker from "../ProgressTicker";
import "./GameStatus.css";

export default function GameStatus({ skillLabel, delay, enabled, onComplete }) {
  return (
    <div className="game-status section-box">
      <h2>Activité en cours</h2>
      <p>
        <strong>{skillLabel || "Repos méditatif"}</strong>
      </p>
      <ProgressTicker delay={delay} enabled={enabled} onComplete={onComplete} />
    </div>
  );
}
