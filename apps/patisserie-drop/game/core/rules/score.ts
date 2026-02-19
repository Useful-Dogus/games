export interface MergeScoreBreakdown {
  baseScore: number;
  highLevelBonus: number;
  spaceClearBonus: number;
  totalScore: number;
}

export function getBaseMergeScore(level: number): number {
  return 10 * 2 ** (level - 1);
}

export function getHighLevelBonus(level: number): number {
  if (level === 10) {
    return 10000;
  }

  if (level === 11) {
    return 30000;
  }

  return 0;
}

export function getMergeScore(level: number, isSpaceClear: boolean): MergeScoreBreakdown {
  const baseScore = getBaseMergeScore(level);
  const highLevelBonus = getHighLevelBonus(level);
  const spaceClearBonus = isSpaceClear ? 50 : 0;

  const totalScore = Math.floor(baseScore + highLevelBonus + spaceClearBonus);

  return {
    baseScore,
    highLevelBonus,
    spaceClearBonus,
    totalScore
  };
}
