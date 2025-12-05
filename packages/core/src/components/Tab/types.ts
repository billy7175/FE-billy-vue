/**
 * Tab 컴포넌트 타입 정의
 */
export interface TabItem {
  /** 탭 고유 식별자 */
  value: string | number
  /** 탭 제목 */
  label: string
  /** 탭 비활성화 여부 */
  disabled?: boolean
}

export interface TabProps {
  /** 탭 목록 */
  tabs: TabItem[]
  /** 현재 활성화된 탭 (v-model) */
  modelValue?: string | number
  /** 탭 크기 */
  size?: 'sm' | 'md' | 'lg'
  /** 탭 스타일 변형 */
  variant?: 'default' | 'pills' | 'underline'
  /** 전체 너비 사용 여부 */
  block?: boolean
  /** ARIA 레이블 (접근성) */
  ariaLabel?: string
}

