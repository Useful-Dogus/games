'use client';

import { useEffect, useRef, useState } from 'react';
import type { GameController } from '../runtime/create-game';
import type { GameOverState, HudState } from '../runtime/types';

function spriteUrl(level: number): string {
  return `/assets/sprites/item-lv${String(level).padStart(2, '0')}.png`;
}

const INITIAL_HUD: HudState = {
  score: 0,
  nextDropLevels: [1, 1],
  isGameOver: false,
};

export function PatisserieDropGame() {
  const mountRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<GameController | null>(null);

  const [hud, setHud] = useState<HudState>(INITIAL_HUD);
  const [gameOver, setGameOver] = useState<GameOverState | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function bootstrap(): Promise<void> {
      if (!mountRef.current) {
        return;
      }

      const [Phaser, { createPatisserieDropGame }] = await Promise.all([
        import('phaser'),
        import('../runtime/create-game'),
      ]);

      if (!isMounted || !mountRef.current) {
        return;
      }

      controllerRef.current = createPatisserieDropGame(Phaser, mountRef.current, {
        onHudUpdate: (nextHud) => {
          setHud(nextHud);

          if (!nextHud.isGameOver) {
            setGameOver(null);
          }
        },
        onGameOver: (state) => {
          setGameOver(state);
        },
      });
    }

    bootstrap();

    return () => {
      isMounted = false;
      controllerRef.current?.destroy();
      controllerRef.current = null;
    };
  }, []);

  return (
    <section className="game-shell">
      <h1 className="game-title">Patisserie Drop</h1>

      <header className="hud-panel">
        <div className="hud-item hud-score">
          <span>Score</span>
          <strong>{hud.score.toLocaleString()}</strong>
        </div>
        <div className="hud-item hud-queue">
          <span>Next</span>
          <div className="hud-queue-sprites">
            <img src={spriteUrl(hud.nextDropLevels[0])} alt={`Level ${hud.nextDropLevels[0]}`} width={32} height={32} />
            <img src={spriteUrl(hud.nextDropLevels[1])} alt={`Level ${hud.nextDropLevels[1]}`} width={32} height={32} />
          </div>
        </div>
      </header>

      <div className="game-viewport">
        <div ref={mountRef} className="game-canvas" />

        {gameOver ? (
          <div className="gameover-overlay" role="dialog" aria-modal="true" aria-labelledby="gameover-title">
            <h2 id="gameover-title">Game Over</h2>
            <p>Final Score: {gameOver.finalScore.toLocaleString()}</p>
            <button
              type="button"
              onClick={() => {
                controllerRef.current?.restart();
                setGameOver(null);
              }}
            >
              다시하기
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
