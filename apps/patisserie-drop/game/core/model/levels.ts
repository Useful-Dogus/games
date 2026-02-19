export interface LevelDefinition {
  level: number;
  radius: number;
  label: string;
}

const LEVEL_RADII = [18, 24, 32, 42, 55, 73, 96, 127, 168, 221, 295] as const;

export const LEVEL_DEFINITIONS: LevelDefinition[] = LEVEL_RADII.map((radius, index) => ({
  level: index + 1,
  radius,
  label: `Lv${index + 1}`,
}));

export const MIN_LEVEL = 1;
export const MAX_LEVEL = 11;
export const MAX_DROP_LEVEL = 6;

export function getLevelDefinition(level: number): LevelDefinition {
  const definition = LEVEL_DEFINITIONS[level - 1];

  if (!definition) {
    throw new Error(`Invalid level: ${level}`);
  }

  return definition;
}
