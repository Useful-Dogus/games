# Vercel 운영 가이드

Dogus Games는 모노레포이지만 게임 앱을 독립 배포하는 전략을 사용한다.
허브(`apps/web`)는 카탈로그/진입점 역할을 담당하고, 배포된 게임은 외부 URL로 직접 이동한다.

## 1) 프로젝트 구성

Vercel에서 동일 Git 저장소로 프로젝트를 분리 생성한다.

- `apps/web`
- `apps/patisserie-drop`
- `apps/sadari`
- `apps/santa-endless-runner`

각 프로젝트에서 반드시 `Root Directory`를 해당 앱 폴더로 지정한다.

## 2) 허브 라우팅 정책

- 허브 카드 클릭 시:
  - 게임 `status`가 `live`이고 해당 배포 URL env가 설정되어 있으면 외부 URL로 이동
  - 그 외에는 허브 내부 안내 페이지(Coming Soon) 표시
- 즉, 스캐폴드 게임은 배포하지 않아도 허브에서 안전하게 안내 가능

## 3) 허브 환경변수

`apps/web` 프로젝트 환경변수:

- `PATISSERIE_DROP_URL`
- `SADARI_URL`
- `SANTA_ENDLESS_RUNNER_URL`

규칙:

- 실제 배포된 `live` 게임만 설정한다.
- 미배포 게임은 비워둔다.
- 환경변수 변경 후 `apps/web`를 재배포한다.

## 4) 게임 앱 환경변수

각 게임 프로젝트 환경변수(권장):

- `NEXT_PUBLIC_HUB_URL=https://dogusgames.com`

도메인 연결 전에는 허브 Vercel URL을 사용한다.

## 5) 신규 게임 추가 운영 절차

1. 모노레포에 새 게임 앱 추가 및 허브 메타데이터 반영
2. 게임 상태를 `coming-soon`으로 유지한 채 허브 배포
3. 게임 개발/QA 완료 후 게임 앱을 Vercel에 배포
4. 허브에 게임 배포 URL env 추가
5. 게임 상태를 `live`로 변경 후 허브 재배포
6. 허브 카드 이동/복귀 링크 스모크 테스트

## 6) 스모크 테스트 체크리스트

- 허브 홈 렌더링 정상
- `coming-soon` 게임: `/slug` 접근 시 안내 페이지 표시
- `live` 게임: 카드 클릭 시 게임 배포 URL로 이동
- 게임에서 허브 복귀 링크 정상 동작

## 7) 장애 대응

- 특정 게임 장애 시 해당 게임 프로젝트만 롤백
- 허브 장애 시 허브 프로젝트만 롤백
- 허브 env 오입력 시 env 수정 후 허브 재배포
