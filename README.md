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

## 배포 정책 (허브 라우팅)

- 허브는 **환경변수가 설정된 게임만** 외부 배포 URL로 rewrite한다.
- 환경변수가 없는 게임 slug는 허브 내부 안내 페이지(Coming Soon)로 응답한다.
- 따라서 스캐폴드 게임은 별도 배포 없이도 404 대신 안내 페이지를 제공할 수 있다.

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
