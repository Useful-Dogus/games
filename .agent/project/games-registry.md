# 게임 레지스트리

> 플랫폼에 등록된 게임 목록입니다. 게임 추가 또는 상태 변경 시 에이전트가 이 파일을 업데이트해야 합니다.

## 현재 게임 목록

| 앱 디렉토리 | URL 슬러그 | 제목 | 장르 | 상태 |
|---|---|---|---|---|
| `apps/patisserie-drop` | `/patisserie-drop` | Patisserie Drop | 퍼즐, 낙하 | Placeholder |
| `apps/sadari` | `/sadari` | 사다리 | 캐주얼 | Placeholder |
| `apps/santa-endless-runner` | `/santa-endless-runner` | Santa Endless Runner | 러너, 아케이드 | Placeholder |

## 업데이트 규칙

- **게임 추가 시**: `.agent/skills/add-new-game.md` 스킬을 완료한 후 이 파일에 행을 추가.
- **상태 변경 시** (`Placeholder` → `Live` 등): 이 파일과 `apps/web/config/games.config.ts`를 동시에 업데이트.
- **위 두 경우 모두**: `docs/games/<slug>.md`도 함께 업데이트.

## 상태 정의

| 상태 | 의미 |
|---|---|
| `Placeholder` | 게임 로직 없이 UI 껍데기만 존재 (`coming-soon` in config) |
| `Live` | 실제 게임 로직 구현 완료 및 배포 (`live` in config) |
