# 🎨 My UI Monorepo

> 실무형 Vue 3 컴포넌트 라이브러리 Monorepo 템플릿

## 📁 프로젝트 구조

```
my-ui-monorepo/
├── package.json              # 루트 패키지 설정
├── pnpm-workspace.yaml       # pnpm 워크스페이스 설정
├── tsconfig.json             # 루트 TypeScript 설정
├── packages/
│   ├── core/                 # 📦 배포되는 컴포넌트 라이브러리
│   │   ├── src/
│   │   │   ├── components/   # 컴포넌트들
│   │   │   ├── styles/       # 전역 스타일/토큰
│   │   │   ├── index.ts      # 메인 진입점
│   │   │   └── plugin.ts     # Vue 플러그인
│   │   ├── package.json
│   │   └── tsup.config.ts    # 빌드 설정
│   ├── playground/           # 🎮 개발용 Vue 앱
│   │   ├── src/
│   │   └── package.json
│   └── storybook/            # 📚 컴포넌트 문서/개발
│       ├── .storybook/
│       ├── stories/
│       └── package.json
└── scripts/
    └── create-component.js   # 🛠️ 컴포넌트 생성 CLI
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
# pnpm 사용 (권장)
pnpm install

# 또는 npm
npm install
```

### 2. 개발 서버 실행

```bash
# Playground 실행 (컴포넌트 테스트)
pnpm dev:playground

# Storybook 실행 (컴포넌트 문서)
pnpm dev:storybook
```

### 3. 빌드

```bash
# 모든 패키지 빌드
pnpm build

# core 패키지만 빌드
pnpm --filter @my-ui/core build
```

## 🛠️ 새 컴포넌트 생성

```bash
# 기본 컴포넌트 생성
pnpm new:component MyComponent

# 스토리 파일과 함께 생성
pnpm new:component MyComponent --with-story
```

생성 후 `packages/core/src/index.ts`에 export 추가:

```typescript
export { MyComponent } from './components/MyComponent'
```

## 📦 라이브러리 사용법

### 설치

```bash
npm install @my-ui/core
```

### 개별 import (권장 - Tree-shaking)

```typescript
import { Button } from '@my-ui/core'
```

### 전역 플러그인

```typescript
import { createApp } from 'vue'
import { MyUIPlugin } from '@my-ui/core'

const app = createApp(App)
app.use(MyUIPlugin) // 모든 컴포넌트가 전역 등록됨
// <UiButton>, <UiInput> 등으로 사용
```

## 🎨 테마 커스터마이징

CSS 변수를 오버라이드하여 테마 변경:

```css
:root {
  --myui-primary: #your-color;
  --myui-text: #your-color;
}

/* 다크모드 */
[data-theme="dark"] {
  --myui-primary: #your-dark-color;
}
```

## 📚 주요 기술 스택

- **Vue 3** - Composition API
- **TypeScript** - 타입 안전성
- **tsup** - 빠른 번들링 (ESM + CJS + d.ts)
- **Vite** - 개발 서버
- **Storybook** - 컴포넌트 문서화
- **pnpm** - 패키지 매니저

## 📂 핵심 설계 원칙

1. **Tree-shaking 지원**: 개별 컴포넌트 import로 번들 최적화
2. **타입 안전성**: TypeScript + 자동 d.ts 생성
3. **테마 시스템**: CSS 변수 기반 런타임 테마 변경
4. **접근성**: ARIA 속성, 키보드 네비게이션 지원
5. **BEM 명명 규칙**: 스타일 충돌 방지 (`myui-` 프리픽스)

## 🔧 스크립트 명령어

| 명령어 | 설명 |
|--------|------|
| `pnpm install` | 모든 의존성 설치 |
| `pnpm build` | 모든 패키지 빌드 |
| `pnpm dev:playground` | Playground 개발 서버 |
| `pnpm dev:storybook` | Storybook 개발 서버 |
| `pnpm new:component <Name>` | 새 컴포넌트 생성 |

## 📄 라이선스

MIT License

