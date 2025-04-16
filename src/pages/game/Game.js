// src/pages/game/Game.js
import "./Game.css";
import { useAtom } from "jotai";
import {
  skillXpAtoms,
  skillLevelAtoms,
  activeSkillAtom,
} from "../../atoms/skills";
import { getSkillByKey } from "../../constants/skills";
import ProgressTicker from "../../components/ProgressTicker";
import useLevelSystem from "../../hooks/useLevelSystem";
import useSkillDelay from "../../hooks/useSkillDelay";

export default function Game() {
  const [activeSkill, setActiveSkill] = useAtom(activeSkillAtom);
  const [xp, setXp] = useAtom(skillXpAtoms.mining);
  const [level, setLevel] = useAtom(skillLevelAtoms.mining);

  const skill = getSkillByKey("mining");

  const scaledDelay = useSkillDelay(level, skill.baseDelay, skill.delayFactor, skill.minDelay);
  const xpNeeded = useLevelSystem(xp, level, setXp, setLevel, skill.baseXp, skill.xpGrowthFactor);

  const handleTickComplete = () => {
    setXp((xp) => xp + 1);
  };

  return (
    <div className="game-wrapper">
      <header className="game-header">
        <button onClick={() => (window.location.href = "/")}>
          Retour à l'accueil
        </button>
      </header>

      <div className="game-container">
        <div className="game-status">
          <p>
            Activité en cours :{" "}
            <strong>{activeSkill ? skill.label : "Repos méditatif"}</strong>
          </p>
          <ProgressTicker
            delay={scaledDelay}
            enabled={activeSkill === "mining"}
            onComplete={handleTickComplete}
          />
        </div>

        <h1 className="game-title">Évolution mystique</h1>
        <p>
          XP : {xp} / {xpNeeded} | Niveau : {level}
        </p>
        <p>Délai actuel : {scaledDelay.toFixed(0)} ms</p>
        <p>Délai minimum possible : {skill.minDelay} ms</p>

        <div className="game-domains">
          <SkillCard
            skillKey="mining"
            label="Minage"
            isActive={activeSkill === "mining"}
            onToggle={() =>
              setActiveSkill((prev) => (prev === "mining" ? null : "mining"))
            }
          />
        </div>
      </div>
    </div>
  );
}

function SkillCard({ skillKey, label, isActive, onToggle }) {
  return (
    <div className="domain-card">
      <h2>{label}</h2>
      <button onClick={onToggle}>
        {isActive ? "Interrompre" : "Pratiquer"}
      </button>
    </div>
  );
}
