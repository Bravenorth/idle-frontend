import "./SkillInfo.css";
export default function SkillInfo({ xp, xpNeeded, level, delay, minDelay }) {
    return (
      <div className="skill-info">
        <h1 className="game-title">Détail d'activité</h1>
        <p>XP : {xp} / {xpNeeded} | Niveau : {level}</p>
        <p>Délai actuel : {delay.toFixed(0)} ms</p>
        <p>Délai minimum : {minDelay} ms</p>
      </div>
    );
  }
  