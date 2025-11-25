<template>
  <!--
    Button 컴포넌트
    
    설계 원칙:
    - 접근성(a11y): aria 속성 적용, 키보드 네비게이션 지원
    - 유연성: variant, size, loading 등 다양한 상태 지원
    - 일관성: CSS 변수를 통한 테마 연동
  -->
  <button
    class="myui-button"
    :class="[
      `myui-button--${variant}`,
      `myui-button--size-${size}`,
      { 'myui-button--loading': loading },
      { 'myui-button--block': block }
    ]"
    :disabled="disabled || loading"
    :type="type"
    :aria-busy="loading ? 'true' : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    @click="handleClick"
  >
    <!-- 로딩 스피너 -->
    <span v-if="loading" class="myui-button__spinner" aria-hidden="true">
      <svg class="myui-button__spinner-icon" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-dasharray="32" stroke-dashoffset="12" />
      </svg>
    </span>
    
    <!-- 버튼 내용 -->
    <span class="myui-button__content" :class="{ 'myui-button__content--hidden': loading }">
      <slot />
    </span>
  </button>
</template>

<script lang="ts" setup>
/**
 * Button 컴포넌트 스크립트
 * 
 * 왜 defineProps로 작성하나?
 * - Vue 3 Composition API의 표준 방식
 * - 타입 안전성 보장
 * - 자동 런타임 props 검증
 */

import type { ButtonProps } from './types'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  block: false,
  type: 'button'
})

// Emit 정의
const emit = defineEmits<{
  /** 클릭 이벤트 - disabled/loading 상태에서는 발생하지 않음 */
  click: [event: MouseEvent]
}>()

/**
 * 클릭 핸들러
 * - disabled/loading 상태에서는 이벤트 전파를 막음
 */
function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  emit('click', event)
}
</script>

<style lang="scss">
/**
 * Button 스타일
 * 
 * 명명 규칙: BEM (Block Element Modifier)
 * - Block: myui-button
 * - Element: myui-button__spinner, myui-button__content
 * - Modifier: myui-button--primary, myui-button--size-sm
 * 
 * 프리픽스 myui-를 사용하는 이유:
 * - 다른 CSS 라이브러리와의 충돌 방지
 * - 라이브러리 컴포넌트임을 명확히 표시
 */
@import '../../styles/tokens.scss';

.myui-button {
  // 기본 스타일
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  border: none;
  border-radius: var(--myui-border-radius);
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.5;
  text-decoration: none;
  
  transition: 
    background-color var(--myui-transition-fast),
    border-color var(--myui-transition-fast),
    color var(--myui-transition-fast),
    box-shadow var(--myui-transition-fast);
  
  // 포커스 스타일 (접근성)
  &:focus-visible {
    outline: 2px solid var(--myui-primary);
    outline-offset: 2px;
  }
  
  // 비활성화 상태
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  // ===== 사이즈 변형 =====
  &--size-sm {
    padding: 6px 12px;
    font-size: 13px;
  }
  
  &--size-md {
    padding: 10px 18px;
    font-size: 14px;
  }
  
  &--size-lg {
    padding: 14px 24px;
    font-size: 16px;
  }
  
  // ===== 스타일 변형 =====
  &--primary {
    background-color: var(--myui-primary);
    color: var(--myui-text-inverse);
    
    &:hover:not(:disabled) {
      background-color: var(--myui-primary-hover);
    }
    
    &:active:not(:disabled) {
      background-color: var(--myui-primary-active);
    }
  }
  
  &--secondary {
    background-color: transparent;
    color: var(--myui-text);
    border: 1px solid var(--myui-border);
    
    &:hover:not(:disabled) {
      background-color: var(--myui-bg-secondary);
    }
  }
  
  &--danger {
    background-color: var(--myui-danger);
    color: var(--myui-text-inverse);
    
    &:hover:not(:disabled) {
      background-color: darken(#dc3545, 10%);
    }
  }
  
  &--ghost {
    background-color: transparent;
    color: var(--myui-primary);
    
    &:hover:not(:disabled) {
      background-color: rgba(24, 103, 255, 0.1);
    }
  }
  
  // ===== 상태 변형 =====
  &--loading {
    cursor: wait;
    position: relative;
  }
  
  &--block {
    width: 100%;
  }
  
  // ===== 하위 요소 =====
  &__spinner {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &__spinner-icon {
    width: 1em;
    height: 1em;
    animation: myui-spin 0.8s linear infinite;
  }
  
  &__content {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    
    &--hidden {
      visibility: hidden;
      position: absolute;
    }
  }
}

// 스피너 애니메이션
@keyframes myui-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>

