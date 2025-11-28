/**
 * Input 컴포넌트 타입 정의
 */
export interface InputProps {
  /** input 타입 */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  /** placeholder 텍스트 */
  placeholder?: string
  /** input 값 (v-model) */
  modelValue?: string | number
  /** 비활성화 상태 */
  disabled?: boolean
  /** 읽기 전용 */
  readonly?: boolean
  /** 에러 상태 */
  error?: boolean
  /** input 크기 */
  size?: 'sm' | 'md' | 'lg'
  /** 전체 너비 사용 여부 */
  block?: boolean
}

