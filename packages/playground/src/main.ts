/**
 * Playground 앱 진입점
 * 
 * 이 파일에서 @my-ui/core 컴포넌트를 import하고 테스트합니다.
 * 두 가지 방식으로 사용 가능:
 * 1. 개별 import (권장)
 * 2. 플러그인으로 전역 등록
 */
import { createApp } from 'vue'
import App from './App.vue'

// 방법 1: 개별 컴포넌트 import (tree-shaking 가능)
// import { Button } from '@my-ui/core'

// 방법 2: 전역 플러그인 사용 (모든 컴포넌트 전역 등록)
import { MyUIPlugin } from '@billy7175/my-ui-core'

// 스타일 import (필수!)
import '@billy7175/my-ui-core/styles.css'

const app = createApp(App)

// 플러그인 사용 - 모든 컴포넌트가 Ui 프리픽스로 전역 등록됨
// 예: <UiButton>, <UiInput> 등
app.use(MyUIPlugin, {
  prefix: 'Ui' // 기본값, 생략 가능
})

app.mount('#app')

