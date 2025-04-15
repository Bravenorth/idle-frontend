import "./Game.css";
import { useAtom } from "jotai";
import { useEffect, useState, useCallback } from "react";
import {
  arcanesXpAtom,
  alchemyXpAtom,
  shapingXpAtom,
  activeDomainAtom,
} from "../../atoms/skills";
import useTickEngine from "../../hooks/useTickEngine"; // ← notre hook

const DOMAIN_LIST = [
  { key: "arcanes", label: "Arcanes anciennes", delay: 1000 },
  { key: "alchemy", label: "Alchimie élémentaire", delay: 1000 },
  { key: "shaping", label: "Arts de la Transmutation", delay: 1000 },
];

export default function Game() {
  const [arcanesXp, setArcanesXp] = useAtom(arcanesXpAtom);
  const [alchemyXp, setAlchemyXp] = useAtom(alchemyXpAtom);
  const [shapingXp, setShapingXp] = useAtom(shapingXpAtom);
  const [activeDomain, setActiveDomain] = useAtom(activeDomainAtom);

  const [delay, setDelay] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const current = DOMAIN_LIST.find((d) => d.key === activeDomain);
    setDelay(current?.delay || null);
    setProgress(0);
  }, [activeDomain]);

  const handleTick = useCallback(() => {
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
  }, [activeDomain, setArcanesXp, setAlchemyXp, setShapingXp]);

  const handleProgress = useCallback((value) => {
    setProgress(value);
  }, []);

  // ✅ Utilisation du moteur de tick
  useTickEngine({
    delay,
    enabled: !!activeDomain,
    onTick: handleTick,
    onProgress: handleProgress,
  });

  const handleActivate = (key) => {
    setActiveDomain((prev) => (prev === key ? null : key));
  };

  return (
    <div className="game-wrapper">
      <header className="game-header">
        <button onClick={() => (window.location.href = "/")}>
          Retour à l'accueil
        </button>
      </header>

      <div className="game-container">
        <StatusBar activeDomain={activeDomain} progress={progress} />
        <h1 className="game-title">Évolution mystique</h1>
        <p>Délai d’itération : {delay ? delay / 1000 + "s" : "—"}</p>

        <div className="game-domains">
          {DOMAIN_LIST.map(({ key, label }) => (
            <Domain
              key={key}
              name={label}
              xp={
                key === "arcanes"
                  ? arcanesXp
                  : key === "alchemy"
                  ? alchemyXp
                  : shapingXp
              }
              isActive={activeDomain === key}
              onActivate={() => handleActivate(key)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBar({ activeDomain, progress }) {
  return (
    <div className="game-status">
      <p>
        Activité en cours :{" "}
        <strong>
          {activeDomain ? getDomainLabel(activeDomain) : "Repos méditatif"}
        </strong>
      </p>
      <div className="progress-bar">
        <div
          className={`progress-bar-fill ${
            progress === 0 ? "no-transition" : ""
          }`}
          style={{ width: `${activeDomain ? progress : 0}%` }}
        />
      </div>
    </div>
  );
}

function Domain({ name, xp, isActive, onActivate }) {
  return (
    <div className="domain-card">
      <h2>{name}</h2>
      <p>XP : {xp}</p>
      <button onClick={onActivate}>
        {isActive ? "Interrompre" : "Pratiquer"}
      </button>
    </div>
  );
}

function getDomainLabel(key) {
  return DOMAIN_LIST.find((d) => d.key === key)?.label;
}
