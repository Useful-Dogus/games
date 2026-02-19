# 프로젝트 제약 및 규칙

> 이 문서는 이 모노레포와 게임 플랫폼에 특화된 운영 규칙입니다.
> 일반 에이전트 행동 원칙은 `.agent/WORKING_AGREEMENT.md`를 참조하세요.

---

## 모노레포 규칙

### 패키지 설치 범위

의존성 설치 전 올바른 워크스페이스를 확인한다:

| 종류 | 설치 위치 |
|---|---|
| 특정 앱 전용 의존성 | `apps/<app>/` |
| 2개 이상 앱이 공유하는 라이브러리 | `packages/<package>/` |
| 공통 개발 툴링 | 모노레포 루트 |

### Turborepo

- 새 빌드 태스크 추가 전 `turbo.json`의 `dependsOn`을 확인하여 task graph 무결성을 유지한다.
- `packages/*` 변경 후 영향받는 모든 앱을 구현 보고서에 명시한다.
- PR 오픈 전 `pnpm turbo build`로 전체 빌드를 검증한다.

### 패키지 매니저

- `pnpm`만 사용한다. `npm install` 또는 `yarn add`는 실행하지 않는다.

---

## 게임 플랫폼 규칙

### 신규 게임 추가

- `.agent/skills/add-new-game.md` 절차를 정확히 따른다.
- 추가 완료 후 `.agent/project/games-registry.md`와 `docs/games/<slug>.md`를 업데이트한다.

### 슬러그 규칙

- 게임 앱의 URL 슬러그는 `apps/` 디렉토리명과 반드시 일치시킨다 (`docs/platform.md` GAME-003 참조).

### 게임 엔진 도입

- Phaser, Pixi.js 등 게임 엔진 의존성은 APPROVED 상태의 스펙과 플랜이 존재할 때만 도입한다.
- 단순 게임의 기본값: 바닐라 Canvas API 또는 CSS 애니메이션을 먼저 검토한다.
