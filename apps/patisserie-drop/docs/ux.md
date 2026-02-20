# Patisserie Drop — UI/UX 구조

## 화면 영역 구성

```
┌──────────────────────────────────────┐
│           Patisserie Drop            │  Title
├──────────────────────────────────────┤
│  Score            │  Next            │  HUD
│  12,340           │  [○] [○]         │
├──────────────────────────────────────┤
│                                      │
│             [  ○  ]                  │  Holder
│               |                      │  (drop guide)
│  ┌────────────────────────────────┐  │
│  │ - - - - overflow line - - - - │  │
│  │                                │  │
│  │                                │  │  Field
│  │      (쌓인 아이템들)            │  │
│  │                                │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

---

## 영역별 정의

### HUD (헤드업 디스플레이)

**구현**: React overlay (`game/components/patisserie-drop-game.tsx`)

두 개의 패널로 구성됩니다.

#### Score 패널
- 현재 누적 점수를 표시합니다.
- 합체가 일어날 때마다 실시간 갱신됩니다.
- 8자리(99,999,999)까지 잘림 없이 표시합니다.

#### Queue 패널 ("Next")
- **다음 두 개** 아이템의 스프라이트 썸네일을 나란히 표시합니다.
- 왼쪽이 바로 다음(Holder와 동일), 오른쪽이 그다음입니다.
- 스프라이트 이미지로 표시해 Holder와 시각적 연속성을 유지합니다.
- 데이터 흐름: `Phaser scene → RuntimeEvents("hud:update") → React state`

```
Queue:  [마카롱] [사블레]
           ↓
Holder: [마카롱]  ← 지금 들고 있는 아이템
```

---

### Holder (홀더)

**구현**: Phaser `previewImage` + `previewGuide` (`game/runtime/scene.ts`)

플레이어가 현재 **들고 있는 아이템**입니다.

- 아이템 스프라이트를 실제 물리 반지름 크기로 표시합니다.
- 드래그 시 좌우로 이동하며, 컨테이너 벽 안으로만 이동 가능합니다.
- 포인터를 놓는 순간 Field로 낙하합니다 (`pointerup` 이벤트).
- **Drop Guide**: Holder 하단에서 컨테이너 바닥까지 수직 점선을 그려 낙하 위치를 예고합니다. 드래그 중에 불투명도가 높아집니다.
- 아이템이 착지하는 동안(`pendingLandingBallId`) 다음 드롭이 잠깁니다 (`canDrop = false`).

> **레벨 숫자 오버레이 없음**: 스프라이트가 충분히 식별 가능하므로 숫자를 겹치지 않습니다. Queue 패널에서 어떤 아이템인지 확인할 수 있습니다.

---

### Field (필드)

**구현**: Phaser Matter.js 물리 씬 (`game/runtime/scene.ts`)

아이템이 실제로 쌓이고 합체되는 **게임 플레이 영역**입니다.

- 컨테이너 좌표: `x: 30–450`, `y: 92–772` (420 × 680 px)
- 각 아이템은 `BallEntity` (물리 바디 + 스프라이트 이미지)로 구성됩니다.
- 같은 레벨 두 개가 충돌하면 합체(Merge)되어 한 단계 높은 아이템으로 변합니다.
- **스프라이트 이미지만 표시** — 레벨 숫자 없음. 스프라이트 디자인이 레벨을 직관적으로 전달합니다.

#### Overflow Line (오버플로 경계선)
- `y = 110` (컨테이너 상단 + 18 px)에 위치합니다.
- 아이템이 이 선을 일정 시간(`OVERFLOW_GAMEOVER_ACTIVATE_MS`) 이상 벗어나면 게임 오버입니다.
- 위로 튀어오르는 아이템(`velocity.y < 0`)은 카운트하지 않습니다.

---

## 데이터 흐름

```
[Phaser Scene]
    │
    ├─ hud:update ──→ [React HudState]
    │                     ├─ score        → Score 패널
    │                     └─ nextDropLevels → Queue 패널 (스프라이트 썸네일)
    │
    └─ game:over  ──→ [React GameOverState]
                          └─ finalScore   → Game Over 오버레이
```

---

## 아이템 생애주기

```
Queue[1] ──→ Holder ──(drop)──→ Field
                                  │
                          같은 레벨 충돌
                                  │
                               Merge
                                  │
                           한 단계 높은 아이템
                           (Lv11이면 제자리)
```

드롭 시 Queue가 한 칸씩 앞으로 당겨지고, 새 아이템이 Queue 뒤에 추가됩니다.

```
Before drop:  Queue = [A, B]  Holder = A
After drop:   Queue = [B, C]  Holder = B   (C는 새로 생성)
```

---

## 레벨 시스템

| 티어 | 레벨 | 드롭 가능 | 파티스리 |
|---|---|---|---|
| Drop | Lv1–6 | ✅ | 마카롱 → 크로아상 |
| Rare | Lv7–9 | ❌ (합체만) | 타르트 → 샤를로트 |
| Epic | Lv10–11 | ❌ (합체만) | 밀 푀유, 크로캉부슈 |

스프라이트 경로: `/assets/sprites/item-lv{01..11}.png`
