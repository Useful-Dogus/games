# 아키텍처

> 이 문서는 `docs/platform.md` §5의 에이전트용 요약본입니다. 전체 명세는 `docs/platform.md`를 참조하세요.

## 레포 구조

```
games/                              # 모노레포 루트
├── apps/
│   ├── web/                        # 허브 사이트 (dogusgames.com)
│   ├── patisserie-drop/            # 게임 앱 (플레이스홀더)
│   ├── sadari/                     # 게임 앱 (플레이스홀더)
│   └── santa-endless-runner/       # 게임 앱 (플레이스홀더)
│
├── packages/
│   ├── ui/                         # 공통 UI 컴포넌트 (버튼, 카드, 레이아웃 등)
│   ├── game-core/                  # 공통 게임 유틸 (향후 실제 게임 개발 시 활용)
│   └── config/                     # tsconfig, eslint, prettier 공통 설정
│
├── .agent/                         # 에이전트 협업 Single Source of Truth
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## 기술 스택

| 레이어 | 기술 | 비고 |
|---|---|---|
| 모노레포 | pnpm workspace + Turborepo | 빌드 캐싱, 병렬 실행 |
| 허브 사이트 | Next.js 15 (App Router) | SSG/SSR, 파일 기반 라우팅 |
| 게임 앱 (초기) | Next.js 또는 Vite + React | 게임 특성에 따라 선택 |
| 공통 UI | React + Tailwind CSS | packages/ui |
| 언어 | TypeScript (strict) | 전 앱 통일 |
| 배포 | Vercel | 앱별 독립 프로젝트 |

## 배포 전략

- 각 게임 앱은 독립된 Vercel 프로젝트로 배포.
- `apps/web`는 허브(카탈로그) 역할을 수행하고, 배포된 게임은 외부 게임 URL로 직접 이동.
- 사용자에게는 `dogusgames.com` 허브를 통해 게임에 진입하지만, 실제 게임은 각 앱이 독립 배포·운영.
- 배포 URL이 아직 없는 게임 slug는 허브 내부 안내 페이지(Coming Soon)로 처리합니다.

## 게임 메타데이터 구조

허브 사이트 게임 목록 렌더링에 사용되는 중앙 config 파일:

```ts
// apps/web/config/games.config.ts
export interface GameMeta {
  slug: string;       // URL 슬러그 (예: "patisserie-drop"), apps/ 디렉토리명과 일치해야 함
  title: string;
  description: string;
  genre: string[];
  thumbnail: string;
  status: 'live' | 'coming-soon';
  deploymentEnvKey?: string; // 허브가 참조할 배포 URL 환경변수 키
}
```

게임 추가 시 이 파일에 항목을 추가하면 허브 사이트 목록에 자동 반영됩니다.
신규 게임 추가 절차는 `.agent/skills/add-new-game.md`를 따르세요.
