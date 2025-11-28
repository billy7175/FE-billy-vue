/**
 * @my-ui/core 라이브러리 메인 진입점
 * 
 * 사용법:
 * 1. 개별 import (권장 - tree-shaking 최적화)
 *    import { Button } from '@my-ui/core'
 * 
 * 2. 전역 플러그인 사용
 *    import { MyUIPlugin } from '@my-ui/core'
 *    app.use(MyUIPlugin)
 */

// ===== 컴포넌트 개별 export (tree-shaking friendly) =====
export { Button } from './components/Button'
export type { ButtonProps } from './components/Button/types'

export { Input } from './components/Input'
export type { InputProps } from './components/Input/types'

// ===== 전역 등록 플러그인 =====
export { default as MyUIPlugin } from './plugin'

// ===== 유틸리티 (필요시 추가) =====
// export * from './utils'

// ===== 타입 =====
// export * from './types'

