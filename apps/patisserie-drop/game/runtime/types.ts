export interface HudState {
  score: number;
  nextDropLevels: [number, number];
  isGameOver: boolean;
}

export interface GameOverState {
  finalScore: number;
}

export interface DropEventPayload {
  level: number;
  x: number;
}

export interface MergeEventPayload {
  fromLevel: number;
  toLevel: number;
  scoreDelta: number;
}

export interface RuntimeBridge {
  onHudUpdate: (state: HudState) => void;
  onGameOver: (state: GameOverState) => void;
}
