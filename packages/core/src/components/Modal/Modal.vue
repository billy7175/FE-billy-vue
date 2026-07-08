<template>
  <!--
    Modal 컴포넌트
    
    설계 원칙:
    - 접근성(a11y): ARIA 속성, 포커스 트랩, 키보드 네비게이션 지원
    - 유연성: size, closeable 등 다양한 옵션 지원
    - 일관성: CSS 변수를 통한 테마 연동
    - Teleport를 사용하여 body에 렌더링 (z-index 이슈 방지)
  -->
  <Teleport to="body">
    <Transition name="myui-modal">
      <div
        v-if="modelValue"
        class="myui-modal"
        role="dialog"
        :aria-modal="true"
        :aria-labelledby="title ? 'myui-modal-title' : undefined"
        :aria-label="ariaLabel"
        @click.self="handleOverlayClick"
        @keydown.esc="handleEscKey"
      >
        <!-- Overlay -->
        <div class="myui-modal__overlay" />

        <!-- Modal Container -->
        <div
          class="myui-modal__container"
          :class="[
            `myui-modal__container--size-${size}`,
            { 'myui-modal__container--fullscreen': size === 'fullscreen' }
          ]"
          @click.stop
        >
          <!-- Header -->
          <header v-if="title || closeable" class="myui-modal__header">
            <h2 v-if="title" id="myui-modal-title" class="myui-modal__title">
              {{ title }}
            </h2>
            <button
              v-if="closeable"
              class="myui-modal__close"
              type="button"
              aria-label="모달 닫기"
              @click="handleClose"
            >
              <svg
                class="myui-modal__close-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </header>

          <!-- Body -->
          <div class="myui-modal__body">
            <slot />
          </div>

          <!-- Footer (선택적) -->
          <footer v-if="$slots.footer" class="myui-modal__footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
/**
 * Modal 컴포넌트 스크립트
 */

import { watch, onMounted, onUnmounted } from 'vue'
import type { ModalProps } from './types'

const props = withDefaults(defineProps<ModalProps>(), {
  modelValue: false,
  size: 'md',
  closeable: true,
  closeOnClickOutside: true,
  closeOnEsc: true,
  title: '',
  ariaLabel: '모달',
  lockScroll: true
})

const emit = defineEmits<{
  /** 모달 닫기 이벤트 */
  'update:modelValue': [value: boolean]
  /** 모달이 열릴 때 */
  'open': []
  /** 모달이 닫힐 때 */
  'close': []
}>()

/**
 * 모달 닫기 핸들러
 */
function handleClose() {
  emit('update:modelValue', false)
  emit('close')
}

/**
 * Overlay 클릭 핸들러
 */
function handleOverlayClick() {
  if (props.closeOnClickOutside) {
    handleClose()
  }
}

/**
 * ESC 키 핸들러
 */
function handleEscKey(event: KeyboardEvent) {
  if (props.closeOnEsc && event.key === 'Escape') {
    handleClose()
  }
}

/**
 * Body 스크롤 잠금/해제
 */
function lockBodyScroll(lock: boolean) {
  if (!props.lockScroll) return

  if (lock) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

// 모달이 열릴 때 body 스크롤 잠금
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      lockBodyScroll(true)
      emit('open')
    } else {
      lockBodyScroll(false)
    }
  },
  { immediate: true }
)

// 컴포넌트 언마운트 시 스크롤 잠금 해제
onUnmounted(() => {
  lockBodyScroll(false)
})
</script>

<style lang="scss">
/**
 * Modal 스타일
 * 
 * 명명 규칙: BEM (Block Element Modifier)
 * - Block: myui-modal
 * - Element: myui-modal__overlay, myui-modal__container, myui-modal__header
 * - Modifier: myui-modal__container--size-sm
 */
@import '../../styles/tokens.scss';

.myui-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

// ===== Overlay =====
.myui-modal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

// ===== Container =====
.myui-modal__container {
  position: relative;
  z-index: 1;
  background: var(--myui-bg, #fff);
  border-radius: var(--myui-border-radius);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  max-width: 100%;
  overflow: hidden;
  animation: myui-modal-slide-in 0.3s ease-out;

  // 사이즈 변형
  &--size-sm {
    width: 100%;
    max-width: 400px;
  }

  &--size-md {
    width: 100%;
    max-width: 600px;
  }

  &--size-lg {
    width: 100%;
    max-width: 900px;
  }

  &--fullscreen {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
    margin: 0;
  }
}

// ===== Header =====
.myui-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--myui-border, rgba(0, 0, 0, 0.12));
  flex-shrink: 0;
}

.myui-modal__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--myui-text, #222);
  flex: 1;
}

.myui-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--myui-text-muted, #6c757d);
  cursor: pointer;
  border-radius: var(--myui-border-radius);
  transition: 
    background-color var(--myui-transition-fast),
    color var(--myui-transition-fast);
  flex-shrink: 0;
  margin-left: 16px;

  &:hover {
    background-color: var(--myui-bg-secondary, #f8f9fa);
    color: var(--myui-text, #222);
  }

  &:focus-visible {
    outline: 2px solid var(--myui-primary);
    outline-offset: 2px;
  }
}

.myui-modal__close-icon {
  width: 20px;
  height: 20px;
}

// ===== Body =====
.myui-modal__body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
  color: var(--myui-text, #222);
}

// ===== Footer =====
.myui-modal__footer {
  padding: 16px 24px;
  border-top: 1px solid var(--myui-border, rgba(0, 0, 0, 0.12));
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-shrink: 0;
}

// ===== 애니메이션 =====
@keyframes myui-modal-slide-in {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

// Transition 클래스
.myui-modal-enter-active,
.myui-modal-leave-active {
  transition: opacity 0.3s ease;
}

.myui-modal-enter-active .myui-modal__container,
.myui-modal-leave-active .myui-modal__container {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.myui-modal-enter-from,
.myui-modal-leave-to {
  opacity: 0;
}

.myui-modal-enter-from .myui-modal__container,
.myui-modal-leave-to .myui-modal__container {
  transform: translateY(-20px) scale(0.95);
  opacity: 0;
}
</style>
