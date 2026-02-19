# Dogus Games

웹 브라우저에서 바로 플레이할 수 있는 캐주얼 게임 플랫폼.

## 시작하기

```bash
pnpm install
pnpm dev:all
```

개별 실행이 필요하면:

```bash
pnpm dev:web
pnpm dev:games
```

## 로컬 URL 설정

- 기본 로컬 포트:
  - 허브: `http://127.0.0.1:3000`
  - `patisserie-drop`: `http://127.0.0.1:3001`
  - `sadari`: `http://127.0.0.1:3002`
  - `santa-endless-runner`: `http://127.0.0.1:3003`
- 환경변수로 URL을 바꾸려면 루트 `.env.example`을 참고해 설정한다.

## 구조

```
apps/web          — 허브 사이트 (dogusgames.com)
apps/<slug>       — 개별 게임 앱
packages/         — 공유 패키지 (ui, game-core, config)
docs/             — 프로젝트 요구사항 문서
.agent/           — AI 에이전트 협업 가이드
```

## 문서

- 플랫폼 요구사항: [`docs/platform.md`](docs/platform.md)
- 게임별 요구사항: [`docs/games/`](docs/games/)
- 에이전트 가이드: [`.agent/README.md`](.agent/README.md)

## AI 에이전트

- Claude Code: [`CLAUDE.md`](CLAUDE.md)
- 기타 툴 (Codex 등): [`AGENTS.md`](AGENTS.md)
