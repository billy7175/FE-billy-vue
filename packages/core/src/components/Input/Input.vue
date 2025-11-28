<template>
  <input
    class="myui-input"
    :class="[
      `myui-input--size-${size}`,
      { 'myui-input--error': error },
      { 'myui-input--block': block }
    ]"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    :disabled="disabled"
    :readonly="readonly"
    @input="handleInput"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
  />
</template>

<script lang="ts" setup>
import type { InputProps } from './types'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
  error: false,
  block: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style lang="scss">
@import '../../styles/tokens.scss';

.myui-input {
  display: inline-block;
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--myui-border);
  border-radius: var(--myui-border-radius);
  background-color: var(--myui-bg);
  color: var(--myui-text);
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  transition: 
    border-color var(--myui-transition-fast),
    box-shadow var(--myui-transition-fast);

  &:focus {
    outline: none;
    border-color: var(--myui-primary);
    box-shadow: 0 0 0 3px rgba(24, 103, 255, 0.1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background-color: var(--myui-bg-secondary);
  }

  &:readonly {
    background-color: var(--myui-bg-secondary);
  }

  // 사이즈
  &--size-sm {
    padding: 6px 10px;
    font-size: 13px;
  }

  &--size-md {
    padding: 8px 12px;
    font-size: 14px;
  }

  &--size-lg {
    padding: 12px 16px;
    font-size: 16px;
  }

  // 에러 상태
  &--error {
    border-color: var(--myui-danger);

    &:focus {
      border-color: var(--myui-danger);
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
  }

  // 전체 너비
  &--block {
    width: 100%;
  }
}
</style>

