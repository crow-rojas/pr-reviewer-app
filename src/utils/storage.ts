import { Developer, ReviewHistory } from '../types';

const DEVELOPERS_KEY = 'pr-reviewers-developers';
const HISTORY_KEY = 'pr-reviewers-history';

export const loadDevelopers = (): Developer[] => {
  const stored = localStorage.getItem(DEVELOPERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveDevelopers = (developers: Developer[]) => {
  localStorage.setItem(DEVELOPERS_KEY, JSON.stringify(developers));
};

export const loadHistory = (): ReviewHistory[] => {
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveHistory = (history: ReviewHistory[]) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};