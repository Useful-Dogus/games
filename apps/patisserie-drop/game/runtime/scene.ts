import * as Phaser from "phaser";

import {
  CONTAINER_BOTTOM,
  CONTAINER_HEIGHT,
  CONTAINER_LEFT,
  CONTAINER_RIGHT,
  CONTAINER_TOP,
  CONTAINER_WIDTH,
  DROP_SPAWN_Y,
  GAME_HEIGHT,
  GAME_WIDTH,
  OVERFLOW_GAMEOVER_ACTIVATE_MS,
  OVERFLOW_LINE_Y,
  OVERFLOW_VELOCITY_IGNORE_THRESHOLD,
  MERGE_IMPULSE_X_MAX,
  MERGE_IMPULSE_X_MIN,
  MERGE_IMPULSE_Y,
  PHYSICS_DENSITY_FACTOR,
  PHYSICS_FRICTION,
  PHYSICS_FRICTION_AIR,
  PHYSICS_FRICTION_STATIC,
  PHYSICS_GRAVITY_Y,
  PHYSICS_RESTITUTION,
  SPRITE_DISPLAY_SCALE
} from "../config";
import { getLevelDefinition, MAX_LEVEL } from "../core/model/levels";
import { pickNextDropLevel } from "../core/rules/drop-table";
import { getMergeScore } from "../core/rules/score";
import { RuntimeEvents } from "./events";
import type { HudState } from "./types";

interface BallEntity {
  id: number;
  level: number;
  radius: number;
  body: MatterJS.BodyType;
  display: Phaser.GameObjects.Image;
}

function spriteKey(level: number): string {
  return `item-lv${String(level).padStart(2, "0")}`;
}

export class PatisserieDropScene extends Phaser.Scene {
  private eventsBridge: RuntimeEvents;

  private score = 0;
  private overflowBreachMs = 0;
  private nextDropLevels: [number, number] = [1, 1];
  private currentDropX = GAME_WIDTH / 2;
  private isGameOver = false;
  private canDrop = true;
  private pendingLandingBallId: number | null = null;
  private isDragging = false;

  private ballIdCounter = 0;
  private balls = new Map<number, BallEntity>();
  private bodyToBall = new Map<number, number>();
  private mergeQueue: Array<[number, number]> = [];

  private previewImage?: Phaser.GameObjects.Image;
  private previewGuide?: Phaser.GameObjects.Graphics;

  constructor(eventsBridge: RuntimeEvents) {
    super("patisserie-drop-scene");
    this.eventsBridge = eventsBridge;
  }

  preload(): void {
    for (let i = 1; i <= 11; i++) {
      const key = spriteKey(i);
      this.load.image(key, `/assets/sprites/${key}.png`);
    }
  }

  create(): void {
    this.matter.world.setGravity(0, PHYSICS_GRAVITY_Y);
    this.setupBackground();
    this.setupContainerBodies();
    this.setupInput();
    this.setupCollisionHandler();

    this.startRound();
  }

  update(_time: number, delta: number): void {
    this.syncDisplayObjects();
    this.processMergeQueue();

    if (this.isGameOver) {
      return;
    }

    const hasOverflow = this.hasOverflowObject();

    if (hasOverflow) {
      this.overflowBreachMs = Phaser.Math.Clamp(this.overflowBreachMs + delta, 0, OVERFLOW_GAMEOVER_ACTIVATE_MS);
    } else {
      this.overflowBreachMs = 0;
    }

    if (this.overflowBreachMs >= OVERFLOW_GAMEOVER_ACTIVATE_MS) {
      this.isGameOver = true;
      this.eventsBridge.emit("game:over", { finalScore: this.score });
    }

    this.publishHudState();
  }

  restartRound(): void {
    this.clearRoundObjects();
    this.startRound();
  }

  private setupBackground(): void {
    const graphics = this.add.graphics();
    graphics.lineStyle(3, 0x8b5e3c, 1);
    graphics.strokeRect(CONTAINER_LEFT, CONTAINER_TOP, CONTAINER_WIDTH, CONTAINER_HEIGHT);

    this.add.rectangle(GAME_WIDTH / 2, OVERFLOW_LINE_Y, CONTAINER_WIDTH - 8, 2, 0xc75a4a, 0.9).setDepth(9);
  }

  private setupContainerBodies(): void {
    this.matter.add.rectangle(CONTAINER_LEFT - 14, CONTAINER_TOP + CONTAINER_HEIGHT / 2, 28, CONTAINER_HEIGHT + 120, {
      isStatic: true
    });

    this.matter.add.rectangle(
      CONTAINER_RIGHT + 14,
      CONTAINER_TOP + CONTAINER_HEIGHT / 2,
      28,
      CONTAINER_HEIGHT + 120,
      {
        isStatic: true
      }
    );

    this.matter.add.rectangle(GAME_WIDTH / 2, CONTAINER_BOTTOM + 18, CONTAINER_WIDTH + 56, 36, {
      isStatic: true
    });
  }

  private setupInput(): void {
    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      if (this.isGameOver || !this.canDrop) {
        return;
      }

      this.isDragging = true;

      const previewRadius = this.getPreviewRadius(this.nextDropLevels[0]);
      this.currentDropX = Phaser.Math.Clamp(pointer.x, CONTAINER_LEFT + previewRadius, CONTAINER_RIGHT - previewRadius);
      this.updatePreviewPosition();
      this.updatePreviewVisuals();
    });

    this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      if (this.isGameOver || !this.isDragging || !this.canDrop) {
        return;
      }

      const previewRadius = this.getPreviewRadius(this.nextDropLevels[0]);
      this.currentDropX = Phaser.Math.Clamp(pointer.x, CONTAINER_LEFT + previewRadius, CONTAINER_RIGHT - previewRadius);
      this.updatePreviewPosition();
      this.updatePreviewVisuals();
    });

    const finalizeDrag = () => {
      if (!this.isDragging) {
        return;
      }

      this.isDragging = false;

      if (this.isGameOver || !this.canDrop) {
        return;
      }

      this.dropCurrentPreview();
    };

    this.input.on("pointerup", () => {
      finalizeDrag();
    });

    this.input.on("pointerupoutside", () => {
      finalizeDrag();
    });

    this.input.on("gameout", () => {
      if (!this.isDragging) {
        return;
      }

      this.isDragging = false;
    });
  }

  private setupCollisionHandler(): void {
    this.matter.world.on(
      "collisionstart",
      (event: { pairs: Array<{ bodyA: MatterJS.BodyType; bodyB: MatterJS.BodyType }> }) => {
        if (this.isGameOver) {
          return;
        }

        event.pairs.forEach((pair) => {
          const firstId = this.bodyToBall.get(pair.bodyA.id);
          const secondId = this.bodyToBall.get(pair.bodyB.id);

          if (
            this.pendingLandingBallId !== null &&
            (firstId === this.pendingLandingBallId || secondId === this.pendingLandingBallId)
          ) {
            this.canDrop = true;
            this.pendingLandingBallId = null;
            this.updatePreviewVisuals();
          }

          if (firstId === undefined || secondId === undefined || firstId === secondId) {
            return;
          }

          const first = this.balls.get(firstId);
          const second = this.balls.get(secondId);

          if (!first || !second || first.level !== second.level) {
            return;
          }

          const sortedA = Math.min(firstId, secondId);
          const sortedB = Math.max(firstId, secondId);
          const alreadyQueued = this.mergeQueue.some(([a, b]) => a === sortedA && b === sortedB);

          if (!alreadyQueued) {
            this.mergeQueue.push([sortedA, sortedB]);
          }
        });
      }
    );
  }

  private startRound(): void {
    this.score = 0;
    this.overflowBreachMs = 0;
    this.isGameOver = false;
    this.canDrop = true;
    this.pendingLandingBallId = null;
    this.isDragging = false;
    this.currentDropX = GAME_WIDTH / 2;

    this.nextDropLevels = [pickNextDropLevel(this.score), pickNextDropLevel(this.score)];
    this.ensurePreviewObjects();
    this.updatePreviewVisuals();
    this.publishHudState();
  }

  private clearRoundObjects(): void {
    this.balls.forEach((ball) => {
      this.matter.world.remove(ball.body);
      ball.display.destroy();
    });

    this.balls.clear();
    this.bodyToBall.clear();
    this.mergeQueue = [];
  }

  private ensurePreviewObjects(): void {
    if (!this.previewImage) {
      const level = this.nextDropLevels[0];
      const { radius } = getLevelDefinition(level);
      const displaySize = radius * 2 * SPRITE_DISPLAY_SCALE;
      this.previewImage = this.add
        .image(this.currentDropX, CONTAINER_TOP - radius - 4, spriteKey(level))
        .setDisplaySize(displaySize, displaySize)
        .setDepth(8);
    }

    if (!this.previewGuide) {
      this.previewGuide = this.add.graphics().setDepth(5);
    }
  }

  private updatePreviewPosition(): void {
    if (!this.previewImage) {
      return;
    }

    this.previewImage.setX(this.currentDropX);
  }

  private updatePreviewVisuals(): void {
    if (!this.previewImage || !this.previewGuide) {
      return;
    }

    if (!this.canDrop || this.isGameOver) {
      this.previewImage.setVisible(false);
      this.previewGuide.clear();
      return;
    }

    const previewLevel = this.nextDropLevels[0];
    const previewRadius = this.getPreviewRadius(previewLevel);
    const previewY = CONTAINER_TOP - previewRadius - 4;

    this.previewImage.setVisible(true);

    this.previewImage
      .setTexture(spriteKey(previewLevel))
      .setDisplaySize(previewRadius * 2 * SPRITE_DISPLAY_SCALE, previewRadius * 2 * SPRITE_DISPLAY_SCALE)
      .setPosition(this.currentDropX, previewY);

    this.previewGuide.clear();
    this.previewGuide.lineStyle(1, 0x8b5e3c, this.isDragging ? 0.5 : 0.22);
    this.previewGuide.beginPath();
    this.previewGuide.moveTo(this.currentDropX, previewY + previewRadius + 3);
    this.previewGuide.lineTo(this.currentDropX, CONTAINER_BOTTOM - 3);
    this.previewGuide.strokePath();
  }

  private getPreviewRadius(level: number): number {
    const { radius } = getLevelDefinition(level);
    return radius;
  }

  private dropCurrentPreview(): void {
    if (!this.canDrop) {
      return;
    }

    const level = this.nextDropLevels[0];

    const dropped = this.addBall(level, this.currentDropX, DROP_SPAWN_Y);
    this.pendingLandingBallId = dropped.id;
    this.canDrop = false;

    this.eventsBridge.emit("game:drop", { level, x: this.currentDropX });

    this.nextDropLevels = [this.nextDropLevels[1], pickNextDropLevel(this.score)];
    this.updatePreviewVisuals();
    this.publishHudState();
  }

  private addBall(level: number, x: number, y: number): BallEntity {
    const { radius } = getLevelDefinition(level);
    const id = ++this.ballIdCounter;

    const body = this.matter.add.circle(x, y, radius, {
      friction: PHYSICS_FRICTION,
      frictionAir: PHYSICS_FRICTION_AIR,
      frictionStatic: PHYSICS_FRICTION_STATIC,
      restitution: PHYSICS_RESTITUTION,
      density: level * PHYSICS_DENSITY_FACTOR
    });

    const displaySize = radius * 2 * SPRITE_DISPLAY_SCALE;
    const display = this.add
      .image(x, y, spriteKey(level))
      .setDisplaySize(displaySize, displaySize)
      .setDepth(6);

    const entity: BallEntity = {
      id,
      level,
      radius,
      body,
      display
    };

    this.balls.set(id, entity);
    this.bodyToBall.set(body.id, id);

    return entity;
  }

  private syncDisplayObjects(): void {
    this.balls.forEach((entity) => {
      entity.display.setPosition(entity.body.position.x, entity.body.position.y);
      entity.display.setRotation(entity.body.angle);
    });
  }

  private processMergeQueue(): void {
    while (this.mergeQueue.length > 0) {
      const [firstId, secondId] = this.mergeQueue.shift() as [number, number];
      const first = this.balls.get(firstId);
      const second = this.balls.get(secondId);

      if (!first || !second || first.level !== second.level) {
        continue;
      }

      const level = first.level;
      const totalMass = first.body.mass + second.body.mass;
      const centerX =
        (first.body.position.x * first.body.mass + second.body.position.x * second.body.mass) /
        (totalMass || 1);
      const centerY =
        (first.body.position.y * first.body.mass + second.body.position.y * second.body.mass) /
        (totalMass || 1);

      this.removeBall(first);

      let targetLevel = level + 1;
      let mergedEntity: BallEntity;

      if (level >= MAX_LEVEL) {
        targetLevel = MAX_LEVEL;
        mergedEntity = second;
        this.matter.body.setPosition(mergedEntity.body, { x: centerX, y: centerY });
      } else {
        this.removeBall(second);
        mergedEntity = this.addBall(targetLevel, centerX, centerY);
      }

      this.matter.body.setVelocity(mergedEntity.body, {
        x: Phaser.Math.FloatBetween(MERGE_IMPULSE_X_MIN, MERGE_IMPULSE_X_MAX),
        y: MERGE_IMPULSE_Y
      });

      const mergeScore = getMergeScore(targetLevel, this.isTopAreaClear());

      this.score += mergeScore.totalScore;

      this.eventsBridge.emit("game:merge", {
        fromLevel: level,
        toLevel: targetLevel,
        scoreDelta: mergeScore.totalScore
      });

      this.updatePreviewVisuals();
      this.publishHudState();
    }
  }

  private isTopAreaClear(): boolean {
    const topThreshold = CONTAINER_TOP + CONTAINER_HEIGHT * 0.2;

    return Array.from(this.balls.values()).every((ball) => ball.body.position.y - ball.radius >= topThreshold);
  }

  private hasOverflowObject(): boolean {
    return Array.from(this.balls.values()).some((ball) => {
      if (this.pendingLandingBallId !== null && ball.id === this.pendingLandingBallId) {
        return false;
      }

      if (ball.body.position.y - ball.radius >= OVERFLOW_LINE_Y) {
        return false;
      }

      if (ball.body.velocity.y < OVERFLOW_VELOCITY_IGNORE_THRESHOLD) {
        return false;
      }

      return true;
    });
  }

  private removeBall(ball: BallEntity): void {
    this.matter.world.remove(ball.body);
    this.bodyToBall.delete(ball.body.id);
    this.balls.delete(ball.id);
    ball.display.destroy();
  }

  private publishHudState(): void {
    const hudState: HudState = {
      score: this.score,
      nextDropLevels: [...this.nextDropLevels] as [number, number],
      isGameOver: this.isGameOver
    };

    this.eventsBridge.emit("hud:update", hudState);
  }
}
