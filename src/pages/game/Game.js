import './Game.css';
import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import {
  miningXpAtom,
  activeSkillAtom
} from '../../atoms/skills';
import {
  tickAtom,
  progressAtom
} from '../../atoms/game';
import { getSkillByKey } from '../../constants/skills';

export default function Game() {
  const [miningXp, setMiningXp] = useAtom(miningXpAtom);
  const [activeSkill, setActiveSkill] = useAtom(activeSkillAtom);
  const [, setTick] = useAtom(tickAtom);
  const [progress, setProgress] = useAtom(progressAtom);

  const tickRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    clearInterval(tickRef.current);
    clearInterval(progressRef.current);
    setProgress(0);

    const skill = getSkillByKey(activeSkill);
    if (!skill) return;

    const { delay } = skill;

    tickRef.current = setInterval(() => {
      setTick(t => t + 1);
      setMiningXp(xp => xp + 1);
      setProgress(0);
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
  }, [activeSkill, setMiningXp, setTick, setProgress]);

  const handleClick = () => {
    setActiveSkill(prev => (prev === 'mining' ? null : 'mining'));
  };

  return (
    <div className="game-wrapper">
      <header className="game-header">
        <button onClick={() => (window.location.href = '/')}>Retour</button>
      </header>

      <div className="game-container">
        <div className="game-status">
          <p>Activité en cours : <strong>{activeSkill ? 'Minage' : 'Repos'}</strong></p>
          <div className="progress-bar">
            <div
              className={`progress-bar-fill ${progress === 0 ? 'no-transition' : ''}`}
              style={{ width: `${activeSkill ? progress : 0}%` }}
            />
          </div>
        </div>

        <h1 className="game-title">Activité : Minage</h1>
        <p>XP : {miningXp}</p>
        <button onClick={handleClick}>
          {activeSkill === 'mining' ? 'Arrêter' : 'Commencer'}
        </button>
      </div>
    </div>
  );
}
