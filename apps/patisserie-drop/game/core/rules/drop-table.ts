import { MIN_LEVEL } from '../model/levels';

export interface DropLevelRange {
  min: number;
  max: number;
}

export function getDropLevelRange(score: number): DropLevelRange {
  if (score < 200) {
    return { min: MIN_LEVEL, max: 3 };
  }

  if (score < 800) {
    return { min: MIN_LEVEL, max: 4 };
  }

  if (score < 2500) {
    return { min: MIN_LEVEL, max: 5 };
  }

  return { min: MIN_LEVEL, max: 6 };
}

export function pickNextDropLevel(score: number, randomValue: number = Math.random()): number {
  const { min, max } = getDropLevelRange(score);
  const size = max - min + 1;
  const clamped = Math.min(0.999999, Math.max(0, randomValue));

  return min + Math.floor(clamped * size);
}
