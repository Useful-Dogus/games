# Patisserie Drop Phase 1 구현 계획서 (Plan)

## 문서 메타

- Feature: `patisserie-drop`
- Phase: `1단계 핵심 기능(MVP)`
- 입력 기준:
  - `/Users/chanheepark/dev/laboratory/games/.agent/specs/patisserie-drop-spec.md`
  - `/Users/chanheepark/dev/laboratory/games/.agent/references/PRD_Patisserie_Drop_v1.3.md`
  - GitHub Issue `#4`

---

## 1. Technical Direction

- Stack:
  - Next.js(App Router) + React + TypeScript(strict)
  - Phaser 3 + Matter.js
  - Architecture:
  - `GameScene` 중심의 단일 플레이 씬 + UI/HUD React 래퍼 구조
  - 게임 규칙 레이어와 표현 레이어 분리:
    - `core/rules`: 합성 점수, 드랍 테이블
    - `core/model`: 오브젝트 레벨 정의/반지름/식별자
    - `runtime/events`: 드랍/합성/게임오버 이벤트 훅
    - `render/adapters`: 임시 비주얼 렌더(Phase 1), 이후 Phase 2 리소스 치환 포인트
  - 해상도 정책:
    - 내부 좌표계 480x854 고정
    - Phaser Scale Manager로 디바이스별 비례 스케일
- Design principles:
  - 규칙 우선: 시각 요소는 최소화하고 물리/합성/점수 정확성 우선
  - 확장 가능성 우선: 하드코딩된 이미지/사운드 참조를 규칙 코드에 섞지 않음
  - 테스트 가능성 우선: 순수 계산 로직은 유닛 테스트 가능한 함수로 분리

---

## 2. System Impact

- Change targets:
  - `apps/patisserie-drop/` 내부 게임 런타임 구조 전면 교체(플레이스홀더 → 실제 게임)
  - 필요 시 `app/page.tsx`, 게임 엔트리 컴포넌트, 스타일, 도메인 모듈 추가
- Integration points:
  - 브라우저 입력(마우스/터치) → Phaser 씬 입력 처리
  - 게임 상태 이벤트 → React HUD 표시 동기화
  - GameOver 이벤트 → 재시작 액션 연결
- Migration required:
  - 데이터 마이그레이션 없음(Phase 1은 메타 저장 정책 범위 밖)

---

## 3. Alternative Comparison

- Option A: 씬 내부 단일 파일 중심 구현
  - 장점: 초기 구현 속도 빠름
  - 단점: 규칙/표현 결합으로 Phase 2에서 교체 비용 증가
- Option B: 규칙/표현/이벤트 분리 모듈 구조 (선택)
  - 장점: 2단계 아트·사운드·연출 치환 시 로직 회귀 리스크 감소
  - 단점: 1단계 초반 구조 설계 시간 증가
- Decision rationale:
  - 이슈 #4의 핵심 Acceptance Criteria가 “2단계에서 로직 수정 없이 리소스 교체 가능”이므로 Option B가 필수다.

---

## 4. Risks and Mitigations

- Risks:
  - 물리 엔진 튜닝 실패로 합성 안정성이 낮을 수 있음
  - 모바일 입력 지연/오조작으로 사용자 경험 저하 가능
  - 연쇄 합성 시 이벤트 중복 처리로 점수 오집계 가능
  - 기준선 침범 지속시간 판정이 프레임 타이밍 영향으로 체감 편차가 생길 수 있음
- Mitigation strategy:
  - 물리 초기값은 PRD 권장값에서 시작하고 수치 상수화
  - 입력은 포인터 이벤트 단일 경로로 통합
  - 합성 처리 시 중복 방지 토큰/락 또는 처리 큐 적용
  - 기준선 침범 판정은 델타타임 누적 방식으로 일관성 확보
- Rollback strategy:
  - 핵심 로직 변경은 태스크 단위 커밋으로 분리
  - 회귀 발생 시 해당 태스크 커밋 단위로 롤백 가능하도록 구조화

---

## 5. Quality / Operational Criteria

- Test strategy:
  - 규칙 함수 유닛 검증:
    - 드랍 테이블 레벨 범위
    - 고레벨 보너스 계산
    - 기준선 침범 지속시간 기반 게임오버 판정
  - 수동 E2E 시나리오:
    - 시작 → 드랍/합성 발생 → 점수 증가 → 기준선 침범 → 게임오버 → 재시작
  - 반응형 확인:
    - 375px, 1440px에서 HUD/입력/게임 영역 정상 동작
- Performance criteria:
  - 일반 모바일/데스크탑에서 플레이 중 입력 지연이 체감적으로 크지 않을 것
  - 합성 연쇄 시 치명적 프레임 드랍으로 진행 불가 상태가 없을 것
- Security criteria:
  - 외부 입력 기반 HTML 삽입 금지
  - 클라이언트 단독 실행(서버 의존 없음)
- Monitoring / alerting:
  - 외부 APM 도입 없음
  - 개발자 콘솔 치명적 에러 0건을 검증 로그로 남김

---

## 6. Delivery Strategy (Phase Split Alignment)

- Phase 1 (현재 문서 범위):
  - 게임 규칙/물리/점수/오버플로/최소 UI/재시작 완성
- Phase 2 (후속):
  - 아트/사운드/합체 연출 폴리시 추가
- Phase 3 (후속):
  - 제외된 메타 기능 중 유저 선호도 기반 우선순위 논의 후 구현 범위 확정

---

## 7. Open Questions / Assumptions

- Open questions:
  - 없음
- Assumptions:
  - 없음

---

## 8. Approval Status

- Status: APPROVED
- Approver: chanheepark
- Approved at: 2026-02-19
