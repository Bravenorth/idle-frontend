// src/pages/game/Game.js
import "./Game.css";
import { useAtom } from "jotai";
import {
  skillXpAtoms,
  skillLevelAtoms,
  activeSkillAtom,
} from "../../atoms/skills";
import { inventoryAtom } from "../../atoms/inventory";
import { getSkillByKey } from "../../constants/skills";
import { ITEMS } from "../../constants/items";

import useLevelSystem from "../../hooks/useLevelSystem";
import useSkillDelay from "../../hooks/useSkillDelay";

import ProgressTicker from "../../components/ProgressTicker";
import Inventory from "../../components/Inventory";

export default function Game() {
  const [activeSkill, setActiveSkill] = useAtom(activeSkillAtom);
  const [xp, setXp] = useAtom(skillXpAtoms.mining);
  const [level, setLevel] = useAtom(skillLevelAtoms.mining);
  const [, setInventory] = useAtom(inventoryAtom);

  const skill = getSkillByKey("mining");
  const delay = useSkillDelay(level, skill.baseDelay, skill.delayFactor, skill.minDelay);
  const xpNeeded = useLevelSystem(xp, level, setXp, setLevel, skill.baseXp, skill.xpGrowthFactor);

  const handleTickComplete = () => {
    setXp((prevXp) => prevXp + 1);

    ITEMS.forEach((item) => {
      if (Math.random() < item.chance) {
        setInventory((prev) => [...prev, { id: item.id }]);
      }
    });
  };

  const toggleSkill = () => {
    setActiveSkill((prev) => (prev === "mining" ? null : "mining"));
  };

  return (
    <div className="game-wrapper">
      {/* Bouton retour */}
      <header className="game-header">
        <button onClick={() => (window.location.href = "/")}>
          Retour à l'accueil
        </button>
      </header>

      {/* Contenu principal */}
      <div className="game-container">
        {/* Section - activité */}
        <section className="section-box">
          <h2>Activité en cours</h2>
          <p>
            <strong>{activeSkill ? skill.label : "Repos méditatif"}</strong>
          </p>
          <ProgressTicker
            delay={delay}
            enabled={activeSkill === "mining"}
            onComplete={handleTickComplete}
          />
        </section>

        {/* Section - progression */}
        <section className="section-box">
          <h2>Évolution mystique</h2>
          <p><strong>Niveau :</strong> {level}</p>
          <p><strong>XP :</strong> {xp} / {xpNeeded}</p>
          <p><strong>Délai actuel :</strong> {delay.toFixed(0)} ms</p>
          <p><strong>Délai minimum :</strong> {skill.minDelay} ms</p>
        </section>

        {/* Section - skills */}
        <section className="section-box">
          <h2>Compétences disponibles</h2>
          <SkillCard
            label={skill.label}
            isActive={activeSkill === "mining"}
            onToggle={toggleSkill}
          />
        </section>
      </div>

      {/* Inventaire (positionné à droite) */}
      <Inventory />
    </div>
  );
}

function SkillCard({ label, isActive, onToggle }) {
  return (
    <div className="domain-card">
      <h3>{label}</h3>
      <button onClick={onToggle}>
        {isActive ? "Interrompre" : "Pratiquer"}
      </button>
    </div>
  );
}
