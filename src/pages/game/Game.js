// src/pages/game/Game.js
import "./Game.css";
import { useAtom } from "jotai";
import {
  skillXpAtoms,
  skillLevelAtoms,
  activeSkillAtom,
} from "../../atoms/skills";
import { inventoryAtom } from "../../atoms/inventory";
import { getSkillByKey, SKILLS } from "../../constants/skills";
import { ITEMS } from "../../constants/items";

import useLevelSystem from "../../hooks/useLevelSystem";
import useSkillDelay from "../../hooks/useSkillDelay";

import GameStatus from "../../components/GameStatus";

import Inventory from "../../components/Inventory";
import SkillInfo from "../../components/SkillInfo";
import SkillList from "../../components/SkillList";

export default function Game() {
  const [activeSkill, setActiveSkill] = useAtom(activeSkillAtom);
  const [xp, setXp] = useAtom(skillXpAtoms.mining);
  const [level, setLevel] = useAtom(skillLevelAtoms.mining);
  const [, setInventory] = useAtom(inventoryAtom);

  const skill = getSkillByKey("mining");

  const delay = useSkillDelay(
    level,
    skill.baseDelay,
    skill.delayFactor,
    skill.minDelay
  );

  const xpNeeded = useLevelSystem(
    xp,
    level,
    setXp,
    setLevel,
    skill.baseXp,
    skill.xpGrowthFactor
  );

  const handleTickComplete = () => {
    setXp((prevXp) => prevXp + 1);

    ITEMS.forEach((item) => {
      if (Math.random() < item.chance) {
        setInventory((prev) => [...prev, { id: item.id }]);
      }
    });
  };

  const toggleSkill = (key) => {
    setActiveSkill((prev) => (prev === key ? null : key));
  };

  return (
    <>
      {/* Bouton de retour */}
      <header className="game-header">
        <button onClick={() => (window.location.href = "/")}>
          Retour à l'accueil
        </button>
      </header>

      <div className="game-layout">
        {/* Contenu principal du jeu */}
        <main className="game-main">
          <div className="section-box">
            <GameStatus
              skillLabel={activeSkill ? skill.label : null}
              delay={delay}
              enabled={activeSkill === "mining"}
              onComplete={handleTickComplete}
            />
          </div>

          <div className="section-box">
            <SkillInfo
              xp={xp}
              xpNeeded={xpNeeded}
              level={level}
              delay={delay}
              minDelay={skill.minDelay}
            />
          </div>

          <div className="section-box">
            <SkillList
              skills={SKILLS}
              activeSkill={activeSkill}
              onToggle={toggleSkill}
            />
          </div>
        </main>

        {/* Inventaire visuellement séparé */}
        <aside className="game-inventory">
          <Inventory />
        </aside>
      </div>
    </>
  );
}
