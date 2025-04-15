// src/pages/game/Game.js
import "./Game.css";
import { useAtom } from "jotai";
import {
  arcanesXpAtom,
  alchemyXpAtom,
  shapingXpAtom,
  activeDomainAtom,
} from "../../atoms/skills";
import { progressAtom } from "../../atoms/game";
import useGameLoop from "../../hooks/useGameLoop";
import { DOMAIN_LIST, getLabel } from "../../constants/domains";

export default function Game() {
  const [arcanesXp] = useAtom(arcanesXpAtom);
  const [alchemyXp] = useAtom(alchemyXpAtom);
  const [shapingXp] = useAtom(shapingXpAtom);
  const [activeDomain, setActiveDomain] = useAtom(activeDomainAtom);
  const [progress] = useAtom(progressAtom);

  useGameLoop();

  const currentDomain = DOMAIN_LIST.find((d) => d.key === activeDomain);
  const delay = currentDomain?.delay || null;

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
          {DOMAIN_LIST.map(({ key, label }) => {
            const xp =
              key === "arcanes"
                ? arcanesXp
                : key === "alchemy"
                ? alchemyXp
                : shapingXp;

            return (
              <Domain
                key={key}
                name={label}
                xp={xp}
                isActive={activeDomain === key}
                onActivate={() => handleActivate(key)}
              />
            );
          })}
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
        <strong>{activeDomain ? getLabel(activeDomain) : "Repos méditatif"}</strong>
      </p>
      <div className="progress-bar">
        <div
          className={`progress-bar-fill ${progress === 0 ? "no-transition" : ""}`}
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
