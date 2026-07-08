---
name: verify
description: 이 모노레포의 컴포넌트 변경을 playground에서 실행·관찰하는 검증 레시피
---

# 검증 레시피 (vue-component-library)

컴포넌트 변경은 playground에서 실제로 렌더링해 확인한다. 단위 테스트는 없음.

## 빌드 & 실행

```bash
# core는 라이브러리 빌드 산출물(dist)을 playground가 소비하므로 먼저 빌드
pnpm --filter @billy7175/my-ui-core build

# playground 개발 서버 (3000이 점유 중이면 3001, 3002...로 자동 이동 — 로그에서 실제 포트 확인)
pnpm dev:playground
```

## 화면 조작 & 캡처

Playwright는 설치되어 있지 않다. headless Chrome + CDP(Node 전역 WebSocket)로 조작한다:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --remote-debugging-port=9223 \
  --user-data-dir=<scratch>/chrome-profile --no-first-run about:blank &
```

- `http://127.0.0.1:9223/json/list`에서 page 타깃의 `webSocketDebuggerUrl`로 WS 연결
- `Page.navigate` → `Runtime.evaluate`로 클릭/상태 덤프 → `Page.captureScreenshot`
- 좌측 사이드바에서 컴포넌트명 텍스트로 버튼을 찾아 클릭하면 해당 데모 섹션 표시

## 주의

- `vue-tsc` 1.8이 TS 5.9와 비호환이라 `pnpm typecheck`는 현재 깨져 있음 (환경 문제)
- Vite 접속 로그의 `[vite] connecting...` console.debug는 정상
