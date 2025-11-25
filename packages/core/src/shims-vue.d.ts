/**
 * Vue SFC 타입 선언
 * TypeScript가 .vue 파일을 모듈로 인식하도록 함
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

