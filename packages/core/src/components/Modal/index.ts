/**
 * Modal 컴포넌트 진입점
 * 
 * 왜 개별 index.ts를 두나?
 * - tree-shaking 최적화: 사용자가 필요한 컴포넌트만 import 가능
 * - 깔끔한 import 경로: import { Modal } from '@billy7175/my-ui-core'
 * - 타입 re-export 용이
 */

export { default as Modal } from './Modal.vue'

// 타입도 함께 export (사용자가 타입을 직접 사용할 수 있도록)
export type { ModalProps } from './types'
