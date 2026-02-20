export const GAME_WIDTH = 480;
export const GAME_HEIGHT = 854;

export const CONTAINER_WIDTH = 420;
export const CONTAINER_HEIGHT = 680;

export const CONTAINER_LEFT = (GAME_WIDTH - CONTAINER_WIDTH) / 2;
export const CONTAINER_RIGHT = CONTAINER_LEFT + CONTAINER_WIDTH;
export const CONTAINER_TOP = 92;
export const CONTAINER_BOTTOM = CONTAINER_TOP + CONTAINER_HEIGHT;

// Visible overflow threshold line inside the container.
export const OVERFLOW_LINE_Y = CONTAINER_TOP + 18;
export const DROP_SPAWN_Y = CONTAINER_TOP - 20;

export const OVERFLOW_GAMEOVER_ACTIVATE_MS = 1000;
// Balls moving upward faster than this threshold (px/frame, negative = up) are
// excluded from overflow detection — they are bouncing after a merge, not stacking.
export const OVERFLOW_VELOCITY_IGNORE_THRESHOLD = -0.5;

export const PHYSICS_GRAVITY_Y = 1.95;
export const PHYSICS_FRICTION = 0.24;
export const PHYSICS_FRICTION_AIR = 0.025;
export const PHYSICS_FRICTION_STATIC = 0.36;
export const PHYSICS_RESTITUTION = 0.06;
export const PHYSICS_DENSITY_FACTOR = 0.0024;

export const MERGE_IMPULSE_X_MIN = -0.7;
export const MERGE_IMPULSE_X_MAX = 0.7;
export const MERGE_IMPULSE_Y = -1.05;

// Sprite content fills ~75% of its canvas (transparent border + drop shadow account for the rest).
// Scale display size up so the visible bread edge aligns with the physics circle boundary.
// Formula: content_fill_ratio × SPRITE_DISPLAY_SCALE ≈ 1.0
// e.g. 0.75 × 1.33 ≈ 1.0 → bread edge meets physics circle when items touch.
export const SPRITE_DISPLAY_SCALE = 1.33;
