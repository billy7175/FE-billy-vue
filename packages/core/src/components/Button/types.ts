/**
 * Button 컴포넌트 타입 정의
 */
export interface ButtonProps {
  /** 버튼 스타일 종류 */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  /** 버튼 크기 */
  size?: 'sm' | 'md' | 'lg'
  /** 로딩 상태 - true일 때 스피너 표시 및 클릭 비활성화 */
  loading?: boolean
  /** 비활성화 상태 */
  disabled?: boolean
  /** 전체 너비 사용 여부 */
  block?: boolean
  /** HTML button type 속성 */
  type?: 'button' | 'submit' | 'reset'
}


