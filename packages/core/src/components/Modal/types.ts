/**
 * Modal 컴포넌트 타입 정의
 */
export interface ModalProps {
  /** 모달 열림/닫힘 상태 (v-model) */
  modelValue: boolean
  /** 모달 크기 */
  size?: 'sm' | 'md' | 'lg' | 'fullscreen'
  /** 닫기 버튼 표시 여부 */
  closeable?: boolean
  /** Overlay 클릭 시 닫기 여부 */
  closeOnClickOutside?: boolean
  /** ESC 키로 닫기 여부 */
  closeOnEsc?: boolean
  /** 모달 제목 */
  title?: string
  /** 모달 설명 (접근성) */
  ariaLabel?: string
  /** 모달이 열릴 때 body 스크롤 방지 여부 */
  lockScroll?: boolean
}

