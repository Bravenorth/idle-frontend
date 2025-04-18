import "./SkillList.css";
export default function SkillList({ skills, activeSkill, onToggle }) {
    return (
      <div className="game-domains">
        {skills.map((skill) => (
          <div key={skill.key} className="domain-card">
            <h2>{skill.label}</h2>
            <button onClick={() => onToggle(skill.key)}>
              {activeSkill === skill.key ? "Interrompre" : "Pratiquer"}
            </button>
          </div>
        ))}
      </div>
    );
  }
  