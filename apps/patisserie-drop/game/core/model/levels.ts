export interface LevelDefinition {
  level: number;
  radius: number;
  label: string;
  hitColor: number;
}

const LEVEL_RADII = [18, 24, 32, 42, 55, 73, 96, 127, 168, 221, 295] as const;

const LEVEL_HIT_COLORS = [
  0xf5d99a, // Lv1  밝은 황금
  0xedc87a, // Lv2  황색
  0xf0d0a0, // Lv3  연한 크림
  0xe8a87a, // Lv4  살구
  0xd4886a, // Lv5  연어색
  0xc07050, // Lv6  중간 브라운
  0xa85840, // Lv7  붉은 브라운
  0x905048, // Lv8  다크 브라운
  0x784060, // Lv9  딥 퍼플
  0xb84878, // Lv10 딸기 핑크
  0xd4609a, // Lv11 밝은 핑크
] as const;

export const LEVEL_DEFINITIONS: LevelDefinition[] = LEVEL_RADII.map((radius, index) => ({
  level: index + 1,
  radius,
  label: `Lv${index + 1}`,
  hitColor: LEVEL_HIT_COLORS[index],
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
