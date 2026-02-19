# Patisserie Drop

| 항목 | 내용 |
|---|---|
| URL 슬러그 | `/patisserie-drop` |
| 앱 디렉토리 | `apps/patisserie-drop` |
| 장르 컨셉 | 낙하 / 퍼즐 |
| 현재 상태 | Phase 1 MVP 구현 완료 (메타 기능 제외) |

---

## 현재 단계 요약 (Phase 1)

- Phaser 3 + Matter.js 기반 플레이 루프 구현
- 드랍/물리 안착/합성/연쇄 합성/점수/오버플로/게임오버/재시작 구현
- HUD(Score, Next 2) 적용
- 오버플로우는 상단 기준선 침범 지속시간 기반으로 게임오버 판정
- 경고 게이지/경고 인디케이터는 MVP 범위에서 제외
- 메타 기능(홈/이어하기/설정/기록/연습모드) 제외

---

## 구현 문서

- 스펙: `.agent/specs/patisserie-drop-spec.md`
- 플랜: `.agent/specs/patisserie-drop-plan.md`
- 태스크: `.agent/specs/patisserie-drop-tasks.md`
