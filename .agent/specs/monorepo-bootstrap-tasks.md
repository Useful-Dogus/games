# 모노레포 부트스트랩 및 허브/게임 플레이스홀더 1차 구축 태스크

## Task List

1. [ ] 루트 모노레포 실행 골격 파일 생성
- Purpose: pnpm workspace + Turborepo 실행 기반 마련
- Estimated time: 20 min
- Completion criterion: 루트에 `package.json`, `pnpm-workspace.yaml`, `turbo.json`이 생성되고 기본 스크립트가 정의된다.
- Verification method: 파일 존재 확인 및 `pnpm install` 실행 준비 상태 점검

2. [ ] 공유 패키지 최소 스캐폴드 생성 (`packages/ui`, `packages/game-core`, `packages/config`)
- Purpose: 다중 앱 공유를 위한 패키지 레이어의 초기 구조 확보
- Estimated time: 20 min
- Completion criterion: 3개 패키지에 최소 `package.json` 및 엔트리 파일이 존재한다.
- Verification method: workspace 인식 여부 확인 (`pnpm -r list --depth -1`)

3. [ ] 허브 앱(`apps/web`) Next.js 기본 페이지 및 최소 CSS 구성
- Purpose: 게임 목록 진입점 역할을 하는 허브 앱의 최소 동작 확보
- Estimated time: 30 min
- Completion criterion: 허브 홈 페이지가 렌더링되고 공통 최소 CSS가 적용된다.
- Verification method: `pnpm --filter web dev` 실행 후 브라우저 확인

4. [ ] 3개 게임 앱 Next.js 플레이스홀더 페이지 구성
- Purpose: 슬러그별 독립 앱의 플레이스홀더 동작 확보
- Estimated time: 30 min
- Completion criterion: `apps/patisserie-drop`, `apps/sadari`, `apps/santa-endless-runner`가 각자 플레이스홀더 페이지를 제공한다.
- Verification method: 각 앱 `dev` 실행 및 경로 렌더링 확인

5. [ ] 허브 게임 메타데이터 및 rewrite 규칙 반영
- Purpose: 허브 목록과 슬러그 라우팅 연결 규칙을 구현 상태로 고정
- Estimated time: 25 min
- Completion criterion: `games.config.ts`에 3개 게임 메타데이터가 정의되고, `next.config.mjs`에 배포 URL 환경변수가 설정된 slug만 rewrite 대상으로 구성된다.
- Verification method: 환경변수 유무에 따라 rewrite 결과가 달라지는지 설정 파일/실행 결과로 확인

6. [ ] 로컬 실행/URL 구성 정리 (`dev:all`, 환경변수 오버라이드)
- Purpose: 로컬 검증 동선을 단순화하고 URL 하드코딩 문제를 제거
- Estimated time: 15 min
- Completion criterion: 루트에서 `pnpm dev:all`로 허브+3개 게임 앱이 동시에 실행되고, `.env.example`에 URL 오버라이드 예시가 존재하며, 배포 미연결 slug는 허브 안내 페이지로 표시된다.
- Verification method: `pnpm dev:all` 실행 로그 확인 + 허브/게임 링크 라우팅 수동 확인

7. [ ] 모노레포 전체 빌드/실행 검증
- Purpose: task graph 및 workspace 구성이 실제로 동작함을 검증
- Estimated time: 20 min
- Completion criterion: `pnpm install`, `pnpm turbo build`가 모두 성공한다.
- Verification method: 명령 실행 로그 기록

8. [ ] 문서 정합성 업데이트 및 구현 보고 정리
- Purpose: 코드/문서 상태 동기화 및 추적 가능성 확보
- Estimated time: 20 min
- Completion criterion: 필요 시 `.agent/project/games-registry.md`, `docs/games/*.md`, PR 템플릿 항목(검증/리스크)이 최신 상태로 반영된다.
- Verification method: 변경 파일 diff 검토 및 스펙/플랜-구현 추적 링크 확인

9. [ ] PR 준비 및 병합 후 운영 스모크 테스트 기록
- Purpose: 첫 이슈 종료 조건(운영 검증 기록) 충족
- Estimated time: 15 min
- Completion criterion: PR 생성 후 병합되고, 운영 URL(허브+3개 슬러그) 접속 확인 결과가 이슈 코멘트에 기록된다.
- Verification method: PR 링크, 이슈 코멘트 링크 확인

## Dependencies

- Prerequisite tasks:
  - 1 → 2, 3, 4, 7 선행
  - 3, 4 완료 후 5 진행
  - 2, 5 완료 후 6 진행
  - 2, 5, 6 완료 후 7 진행
  - 7 완료 후 8 진행
  - 8 완료 후 9 진행
- Tasks that can run in parallel:
  - 2, 3, 4는 1 완료 후 병렬 가능
  - 8의 문서 정합성 점검 일부는 7 직전부터 선행 가능 (최종 반영은 7 이후)

## Risk Notes

- Potential bottlenecks:
  - Next.js 다중 앱 초기화 시 설정 불일치로 빌드 오류 발생 가능
  - rewrite 대상 URL과 실제 배포 URL 불일치 가능
  - 초기 workspace 설정 실수로 패키지 인식 누락 가능
- Workaround / mitigation:
  - 공통 스크립트/버전 규칙을 한 번에 정렬
  - 배포 URL은 병합 직전 재확인
  - `pnpm turbo build`를 병합 전 필수 게이트로 유지

## Open Questions / Assumptions

- Open questions:
  - 없음
- Assumptions:
  - 없음

## Approval Status

- Status: APPROVED
- Approver: Chanhee Park
- Approved at: 2026-02-19
