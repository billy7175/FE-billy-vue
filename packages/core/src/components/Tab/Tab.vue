<template>
  <!--
    Tab 컴포넌트
    
    설계 원칙:
    - 접근성(a11y): ARIA 속성, 키보드 네비게이션 지원
    - 유연성: variant, size 등 다양한 스타일 지원
    - 일관성: CSS 변수를 통한 테마 연동
  -->
  <div class="myui-tabs" :class="[`myui-tabs--${variant}`, { 'myui-tabs--block': block }]">
    <!-- 탭 헤더 -->
    <div class="myui-tabs__header" role="tablist" :aria-label="ariaLabel">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="myui-tabs__item"
        :class="[
          `myui-tabs__item--size-${size}`,
          { 'myui-tabs__item--active': modelValue === tab.value },
          { 'myui-tabs__item--disabled': tab.disabled }
        ]"
        :disabled="tab.disabled"
        role="tab"
        :aria-selected="modelValue === tab.value"
        :aria-controls="`tabpanel-${tab.value}`"
        :id="`tab-${tab.value}`"
        @click="handleTabClick(tab.value)"
        @keydown="handleKeydown($event, tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- 탭 패널 -->
    <div
      v-for="tab in tabs"
      :key="tab.value"
      v-show="modelValue === tab.value"
      class="myui-tabs__panel"
      role="tabpanel"
      :id="`tabpanel-${tab.value}`"
      :aria-labelledby="`tab-${tab.value}`"
    >
      <slot :name="`tab-${tab.value}`" :tab="tab">
        <div class="myui-tabs__panel-content">
          {{ tab.label }} 콘텐츠
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * Tab 컴포넌트 스크립트
 */

import type { TabProps } from './types'

const props = withDefaults(defineProps<TabProps>(), {
  tabs: () => [],
  size: 'md',
  variant: 'default',
  block: false,
  ariaLabel: '탭 목록'
})

const emit = defineEmits<{
  /** 탭 변경 이벤트 */
  'update:modelValue': [value: string | number]
  /** 탭 클릭 이벤트 */
  'tab-click': [value: string | number, tab: any]
}>()

/**
 * 탭 클릭 핸들러
 */
function handleTabClick(value: string | number) {
  const tab = props.tabs.find(t => t.value === value)
  if (tab?.disabled) return
  
  emit('update:modelValue', value)
  emit('tab-click', value, tab)
}

/**
 * 키보드 네비게이션 핸들러
 */
function handleKeydown(event: KeyboardEvent, currentValue: string | number) {
  const currentIndex = props.tabs.findIndex(t => t.value === currentValue)
  let targetIndex = currentIndex

  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      targetIndex = currentIndex > 0 ? currentIndex - 1 : props.tabs.length - 1
      break
    case 'ArrowRight':
      event.preventDefault()
      targetIndex = currentIndex < props.tabs.length - 1 ? currentIndex + 1 : 0
      break
    case 'Home':
      event.preventDefault()
      targetIndex = 0
      break
    case 'End':
      event.preventDefault()
      targetIndex = props.tabs.length - 1
      break
    default:
      return
  }

  // 비활성화된 탭 건너뛰기
  while (props.tabs[targetIndex]?.disabled) {
    if (event.key === 'ArrowLeft' || event.key === 'Home') {
      targetIndex = targetIndex > 0 ? targetIndex - 1 : props.tabs.length - 1
    } else {
      targetIndex = targetIndex < props.tabs.length - 1 ? targetIndex + 1 : 0
    }
    
    // 모든 탭이 비활성화된 경우 무한 루프 방지
    if (targetIndex === currentIndex) break
  }

  const targetTab = props.tabs[targetIndex]
  if (targetTab && !targetTab.disabled) {
    handleTabClick(targetTab.value)
    // 포커스 이동
    const targetElement = document.getElementById(`tab-${targetTab.value}`)
    if (targetElement) {
      ;(targetElement as HTMLElement).focus()
    }
  }
}
</script>

<style lang="scss">
/**
 * Tab 스타일
 * 
 * 명명 규칙: BEM (Block Element Modifier)
 * - Block: myui-tabs
 * - Element: myui-tabs__header, myui-tabs__item, myui-tabs__panel
 * - Modifier: myui-tabs--default, myui-tabs__item--active
 */
@import '../../styles/tokens.scss';

.myui-tabs {
  width: 100%;
}

// ===== 탭 헤더 =====
.myui-tabs__header {
  display: flex;
  gap: 4px;
  border-bottom: 2px solid var(--myui-border, rgba(0, 0, 0, 0.12));
  margin-bottom: 16px;
  
  .myui-tabs--pills & {
    border-bottom: none;
    gap: 8px;
  }
  
  .myui-tabs--underline & {
    border-bottom: 1px solid var(--myui-border, rgba(0, 0, 0, 0.12));
    gap: 0;
  }
}

// ===== 탭 아이템 =====
.myui-tabs__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border: none;
  background: transparent;
  color: var(--myui-text-muted, #6c757d);
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  border-radius: var(--myui-border-radius) var(--myui-border-radius) 0 0;
  transition: 
    color var(--myui-transition-fast),
    background-color var(--myui-transition-fast),
    border-color var(--myui-transition-fast);
  white-space: nowrap;
  min-width: 0;
  
  // 호버 효과 (기본 스타일)
  &:hover:not(&--disabled):not(&--active) {
    color: var(--myui-text, #222);
    background-color: var(--myui-bg-secondary, #f8f9fa);
  }
  
  // 포커스 스타일 (접근성)
  &:focus-visible {
    outline: 2px solid var(--myui-primary);
    outline-offset: -2px;
  }
  
  // 활성화 상태
  &--active {
    color: var(--myui-primary, #1867ff);
    border-bottom: 2px solid var(--myui-primary, #1867ff);
    margin-bottom: -2px;
    font-weight: 600;
  }
  
  // 비활성화 상태
  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  // 사이즈
  &--size-sm {
    padding: 6px 12px;
    font-size: 13px;
  }
  
  &--size-md {
    padding: 10px 16px;
    font-size: 14px;
  }
  
  &--size-lg {
    padding: 14px 20px;
    font-size: 16px;
  }
  
  // Pills 스타일
  .myui-tabs--pills & {
    border-radius: var(--myui-border-radius);
    border-bottom: none;
    
    &--active {
      background-color: var(--myui-primary, #1867ff);
      color: var(--myui-text-inverse, #fff);
      margin-bottom: 0;
    }
    
    &:hover:not(&--disabled):not(&--active) {
      background-color: var(--myui-bg-secondary, #f8f9fa);
    }
  }
  
  // Underline 스타일
  .myui-tabs--underline & {
    border-radius: 0;
    border-bottom: 2px solid transparent;
    
    &--active {
      border-bottom-color: var(--myui-primary, #1867ff);
      margin-bottom: -2px;
    }
    
    &:hover:not(&--disabled):not(&--active) {
      color: var(--myui-text, #222);
      border-bottom-color: var(--myui-border, rgba(0, 0, 0, 0.12));
    }
  }
  
  // 전체 너비
  .myui-tabs--block & {
    flex: 1;
  }
}

// ===== 탭 패널 =====
.myui-tabs__panel {
  padding: 16px 0;
  color: var(--myui-text, #222);
}

.myui-tabs__panel-content {
  padding: 16px;
  background: var(--myui-bg-secondary, #f8f9fa);
  border-radius: var(--myui-border-radius);
}
</style>

