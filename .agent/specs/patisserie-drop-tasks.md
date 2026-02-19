# Patisserie Drop Phase 1 작업 명세서 (Tasks)

## 문서 메타

- Feature: `patisserie-drop`
- Phase: `1단계 핵심 기능(MVP)`
- 기준 문서:
  - `/Users/chanheepark/dev/laboratory/games/.agent/specs/patisserie-drop-spec.md`
  - `/Users/chanheepark/dev/laboratory/games/.agent/specs/patisserie-drop-plan.md`
  - `/Users/chanheepark/dev/laboratory/games/.agent/references/PRD_Patisserie_Drop_v1.3.md`

---

## Task List

1. [x] Phaser 런타임 골격 및 480x854 스케일 환경 구성
- Purpose: 플레이스홀더를 실제 게임 런타임 엔트리로 전환하고 해상도 정책 고정
- Estimated time: 25 min
- Completion criterion: Phaser 캔버스가 480x854 내부 좌표계로 생성되고 뷰포트 비례 스케일 동작 확인
- Verification method: 375px/1440px에서 초기 씬 렌더 확인

2. [x] 도메인 상수 및 레벨 정의 모델 분리
- Purpose: Phase 2 치환 가능성을 위해 레벨/반지름/점수 상수를 규칙 코드와 분리
- Estimated time: 20 min
- Completion criterion: 레벨 정의와 기본 점수/보너스 규칙이 독립 모듈로 존재
- Verification method: 타입 체크 + 정적 import 경로 점검

3. [x] 드랍 테이블 계산 로직 구현
- Purpose: 점수 구간별 드랍 가능 레벨 정책 반영
- Estimated time: 15 min
- Completion criterion: 점수 입력 시 허용 레벨 범위를 반환하는 함수 구현 완료
- Verification method: 경계값(199/200/799/800/2499/2500) 테스트

4. [x] 점수 계산 로직 구현
- Purpose: 기본 합성 점수와 고레벨/공간 보너스 점수 규칙을 정확히 반영
- Estimated time: 25 min
- Completion criterion: 합성 이벤트 시 최종 점수 계산 함수가 PRD 규칙을 재현
- Verification method: 샘플 이벤트 시퀀스 기반 단위 검증

5. [x] 기준선 침범 기반 게임오버 판정 구현
- Purpose: 침범 지속시간 기반 게임오버 판정을 안정적으로 적용
- Estimated time: 20 min
- Completion criterion: 기준선 침범이 임계 시간 이상 지속될 때만 게임오버 발생
- Verification method: 침범 유지/복귀 시나리오 수동 검증

6. [x] 입력 및 드랍 제어 구현(좌우 슬라이드 + 탭/클릭)
- Purpose: 핵심 조작 루프 시작점 구현
- Estimated time: 30 min
- Completion criterion: 낙하 전 위치 조절 가능, 낙하 중 조작 잠금 적용
- Verification method: 마우스/터치 수동 테스트

7. [x] 물리 안착 및 합성/연쇄 처리 구현
- Purpose: 핵심 재미 요소(충돌-합성-연쇄) 구현
- Estimated time: 30 min
- Completion criterion: 동일 레벨 접촉 시 상위 레벨 생성 및 연쇄 합성 발생
- Verification method: 디버그 로그/화면 관찰로 연쇄 합성 재현

8. [x] 이벤트 훅 계층 구축 (Phase 2 확장 포인트)
- Purpose: 드랍/합성/게임오버 이벤트를 표현 레이어와 분리
- Estimated time: 20 min
- Completion criterion: 이벤트 발행 지점이 로직 코드에서 분리되고 구독 가능 구조 확보
- Verification method: 임시 리스너로 이벤트 수신 로그 확인

9. [x] 최소 HUD 구현 (점수, 다음 드랍)
- Purpose: 플레이 상태 가시화
- Estimated time: 25 min
- Completion criterion: 핵심 HUD 항목이 실시간 반영됨
- Verification method: 플레이 중 상태 값 변화 확인

10. [x] 게임오버 화면 및 즉시 재시작 구현
- Purpose: 시작-종료-재시작 루프 완성
- Estimated time: 20 min
- Completion criterion: 기준선 침범 지속시간 조건 충족 시 게임오버 전환, 다시하기로 보드 리셋
- Verification method: 강제 오버플로 상황 수동 재현

11. [x] 1단계 수동 테스트 시나리오 문서화
- Purpose: 이슈 #4 Acceptance Criteria 증적 확보
- Estimated time: 15 min
- Completion criterion: 시작/플레이/게임오버/재시작 시나리오와 기대결과 문서 작성
- Verification method: 문서 체크리스트와 실제 실행 결과 대조

12. [x] 최종 검증 및 리스크 기록
- Purpose: DoD 충족 여부와 후속 이슈(Phase 2 연계 리스크) 정리
- Estimated time: 15 min
- Completion criterion: 검증 로그와 잔여 리스크가 구현 보고에 포함
- Verification method: Acceptance Criteria 매핑 점검표 작성

---

## Dependencies

- Prerequisite tasks:
  - Task 1 선행 후 Task 6~10 수행
  - Task 2 선행 후 Task 3~5, 7 수행
  - Task 8은 Task 7과 병행 가능하나 Task 9/10 전에 완료 필요
  - Task 11은 Task 9~10 이후 수행
  - Task 12는 모든 구현/검증 태스크 완료 후 수행
- Tasks that can run in parallel:
  - Task 3, 4, 5 (규칙 계산 모듈)
  - Task 8, 9 (이벤트 계층 기반 HUD 연결)

---

## Risk Notes

- Potential bottlenecks:
  - Matter 충돌 이벤트 중복으로 다중 합성 오작동 가능
  - 모바일 터치 입력과 스크롤/브라우저 기본 동작 충돌 가능
  - HUD 동기화 지연으로 상태 표시 불일치 가능
- Workaround / mitigation:
  - 합성 처리 큐와 중복 처리 가드 적용
  - 입력 영역의 터치 기본 동작 제어 및 포인터 이벤트 통합
  - 상태 업데이트 단일 경로(이벤트 기반)로 통일

---

## Open Questions / Assumptions

- Open questions:
  - 없음
- Assumptions:
  - 없음

---

## Approval Status

- Status: APPROVED
- Approver: chanheepark
- Approved at: 2026-02-19

---

## Status

- Current phase: DONE
- Last updated: 2026-02-19
