//src/atoms/skills.js
import { atom } from 'jotai';
import { SKILLS } from '../constants/skills';

// Skill actif (un seul à la fois)
export const activeSkillAtom = atom(null);

// Génère dynamiquement les atoms d'XP pour chaque skill
export const skillXpAtoms = Object.fromEntries(
  SKILLS.map((skill) => [skill.key, atom(0)])
);

// Génère dynamiquement les atoms de niveau pour chaque skill
export const skillLevelAtoms = Object.fromEntries(
  SKILLS.map((skill) => [skill.key, atom(1)])
);
