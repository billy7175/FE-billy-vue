/**
 * 공통 타입 정의
 * 
 * 여러 컴포넌트에서 공통으로 사용되는 타입들을 여기에 정의합니다.
 * 컴포넌트별 types.ts에서는 이 공통 타입을 import해서 사용합니다.
 */

/**
 * 컴포넌트 크기
 * - sm: 작은 크기
 * - md: 중간 크기 (기본값)
 * - lg: 큰 크기
 */
export type ComponentSize = 'sm' | 'md' | 'lg'

/**
 * 모달 크기 (fullscreen 추가)
 */
export type ModalSize = ComponentSize | 'fullscreen'

/**
 * 기본 컴포넌트 Props
 * 대부분의 컴포넌트에서 공통으로 사용되는 props
 */
export interface BaseComponentProps {
  /** 비활성화 상태 */
  disabled?: boolean
  /** 전체 너비 사용 여부 */
  block?: boolean
}

/**
 * 크기 관련 Props
 */
export interface SizeableProps {
  /** 컴포넌트 크기 */
  size?: ComponentSize
}

/**
 * 크기 + 기본 Props 조합
 * 많은 컴포넌트에서 사용되는 조합
 */
export interface BaseSizeableProps extends BaseComponentProps, SizeableProps {}

/**
 * 색상 변형 (Variant)
 * 일부 컴포넌트에서 사용
 */
export type ColorVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'ghost'

/**
 * HTML input 타입
 */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'

/**
 * HTML button type 속성
 */
export type ButtonType = 'button' | 'submit' | 'reset'

/**
 * 상태 타입
 */
export type ComponentState = 'default' | 'loading' | 'error' | 'success' | 'warning'


