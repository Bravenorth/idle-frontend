import { atom } from 'jotai';

// XP pour chaque domaine mystique
export const arcanesXpAtom = atom(0);       // Arcanes anciennes
export const alchemyXpAtom = atom(0);       // Alchimie élémentaire
export const shapingXpAtom = atom(0);       // Arts de la Transmutation

// Domaine actuellement actif (null par défaut)
export const activeDomainAtom = atom(null);
