/**
 * Vue 전역 등록 플러그인
 * 
 * 사용법:
 *   import { createApp } from 'vue'
 *   import { MyUIPlugin } from '@my-ui/core'
 *   // 또는: import MyUIPlugin from '@my-ui/core/plugin'
 *   
 *   const app = createApp(App)
 *   app.use(MyUIPlugin)
 *   // 이제 <UiButton> 등을 템플릿에서 바로 사용 가능
 * 
 * 왜 플러그인을 제공하나?
 * - 빠른 프로토타이핑: 모든 컴포넌트를 전역으로 등록하여 바로 사용
 * - 개별 import가 번거로운 경우에 유용
 * 
 * 주의:
 * - 프로덕션에서는 tree-shaking을 위해 개별 import 권장
 */

import type { App, Plugin } from 'vue'

// 모든 컴포넌트 import
import { Button } from './components/Button'
import { Input } from './components/Input'
import { Tab } from './components/Tab'

// 컴포넌트 레지스트리
// - 이름: 전역 등록될 컴포넌트 이름
// - 값: 컴포넌트 객체
const components: Record<string, any> = {
  Button,
  Input,
  Tab
}

/**
 * 플러그인 옵션 타입
 */
export interface MyUIPluginOptions {
  /** 컴포넌트 이름 프리픽스 (기본값: 'Ui') */
  prefix?: string
}

/**
 * MyUI 플러그인
 * 모든 컴포넌트를 전역으로 등록
 */
const MyUIPlugin: Plugin = {
  install(app: App, options: MyUIPluginOptions = {}) {
    const prefix = options.prefix ?? 'Ui'
    
    // 모든 컴포넌트를 전역 등록
    // 예: Button → UiButton
    for (const [name, component] of Object.entries(components)) {
      const componentName = `${prefix}${name}`
      app.component(componentName, component)
    }
  }
}

export default MyUIPlugin

