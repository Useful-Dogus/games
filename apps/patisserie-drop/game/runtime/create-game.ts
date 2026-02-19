import { GAME_HEIGHT, GAME_WIDTH, PHYSICS_GRAVITY_Y } from '../config';
import { RuntimeEvents } from './events';
import { PatisserieDropScene } from './scene';
import type { RuntimeBridge } from './types';

type PhaserModule = typeof import('phaser');

export interface GameController {
  destroy: () => void;
  restart: () => void;
}

export function createPatisserieDropGame(
  Phaser: PhaserModule,
  parent: HTMLElement,
  bridge: RuntimeBridge,
): GameController {
  const runtimeEvents = new RuntimeEvents();
  const scene = new PatisserieDropScene(runtimeEvents);

  const unbindHud = runtimeEvents.on('hud:update', bridge.onHudUpdate);
  const unbindGameOver = runtimeEvents.on('game:over', bridge.onGameOver);

  const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    parent,
    backgroundColor: '#f6ebdd',
    physics: {
      default: 'matter',
      matter: {
        gravity: { x: 0, y: PHYSICS_GRAVITY_Y },
      },
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.NO_CENTER,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
    },
    scene: [scene],
  });

  return {
    destroy: () => {
      unbindHud();
      unbindGameOver();
      game.destroy(true, false);
    },
    restart: () => {
      const activeScene = game.scene.keys['patisserie-drop-scene'] as PatisserieDropScene | undefined;
      activeScene?.restartRound();
    },
  };
}
