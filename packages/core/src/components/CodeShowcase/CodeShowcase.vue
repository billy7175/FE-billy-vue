<template>
  <!--
    CodeShowcase 컴포넌트

    Nuxt 홈페이지 스타일의 코드 예제 쇼케이스:
    - 상단: 예제 탭 (Minimal / Routing / ...)
    - 좌측: 파일 트리
    - 우측: 신택스 하이라이팅된 읽기 전용 코드 뷰어

    설계 원칙:
    - 예제 데이터는 전부 props로 주입 (표현만 담당)
    - 활성 예제는 v-model, 활성 파일은 내부 상태
    - FileTree / CodeViewer 조합으로 구성
  -->
  <div class="myui-code-showcase">
    <!-- 예제 탭 -->
    <div class="myui-code-showcase__tabs" role="tablist" :aria-label="ariaLabel">
      <button
        v-for="example in examples"
        :key="example.value"
        type="button"
        class="myui-code-showcase__tab"
        :class="{ 'myui-code-showcase__tab--active': example.value === activeValue }"
        role="tab"
        :aria-selected="example.value === activeValue"
        @click="selectExample(example.value)"
      >
        <span v-if="example.icon" class="myui-code-showcase__tab-icon" aria-hidden="true">
          {{ example.icon }}
        </span>
        {{ example.label }}
      </button>
    </div>

    <!-- 파일 트리 + 코드 뷰어 -->
    <div class="myui-code-showcase__panel" :style="{ height }">
      <aside class="myui-code-showcase__sidebar">
        <FileTree
          v-model="activeFile"
          :files="activeExample?.files.map(f => f.path) ?? []"
        />
      </aside>

      <CodeViewer
        v-if="currentFile"
        class="myui-code-showcase__viewer"
        :code="currentFile.code"
        :lang="currentFile.lang"
        :filename="currentFile.path"
        :light-theme="lightTheme"
        :dark-theme="darkTheme"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * CodeShowcase 컴포넌트 스크립트
 */

import { ref, computed, watch } from 'vue'
import FileTree from './FileTree.vue'
import CodeViewer from './CodeViewer.vue'
import type { CodeShowcaseProps } from './types'

const props = withDefaults(defineProps<CodeShowcaseProps>(), {
  examples: () => [],
  modelValue: '',
  lightTheme: 'github-light',
  darkTheme: 'github-dark',
  height: '480px',
  ariaLabel: '코드 예제'
})

const emit = defineEmits<{
  /** 예제 변경 이벤트 (v-model) */
  'update:modelValue': [value: string]
}>()

// v-model 미사용 시에도 동작하도록 내부 상태로 폴백
const internalValue = ref(props.modelValue || props.examples[0]?.value || '')

const activeValue = computed(() => props.modelValue || internalValue.value)

const activeExample = computed(() =>
  props.examples.find(e => e.value === activeValue.value) ?? props.examples[0]
)

// 현재 선택된 파일 경로
const activeFile = ref('')

const currentFile = computed(() =>
  activeExample.value?.files.find(f => f.path === activeFile.value)
    ?? activeExample.value?.files[0]
)

// 예제가 바뀌면 해당 예제의 기본 파일로 선택 초기화
watch(
  activeExample,
  (example) => {
    activeFile.value = example?.activeFile ?? example?.files[0]?.path ?? ''
  },
  { immediate: true }
)

function selectExample(value: string) {
  internalValue.value = value
  emit('update:modelValue', value)
}
</script>

<style lang="scss">
/**
 * CodeShowcase 스타일
 *
 * 테마 토큰(--myui-code-*)은 tokens.scss에서 라이트 기본값 +
 * [data-theme="dark"] 오버라이드로 정의됨 (다른 컴포넌트와 동일한 방식)
 */
@import '../../styles/tokens.scss';

.myui-code-showcase {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

// ===== 예제 탭 =====
.myui-code-showcase__tabs {
  display: flex;
  gap: 4px;
  overflow-x: auto;
}

.myui-code-showcase__tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: transparent;
  color: var(--myui-code-muted, #6c757d);
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition:
    color var(--myui-transition-fast, 150ms ease),
    background-color var(--myui-transition-fast, 150ms ease);

  &:hover:not(&--active) {
    color: var(--myui-code-text, #24292e);
  }

  &:focus-visible {
    outline: 2px solid var(--myui-primary, #1867ff);
    outline-offset: 2px;
  }

  &--active {
    background: var(--myui-code-tab-active, rgba(0, 0, 0, 0.06));
    border-color: var(--myui-code-border, rgba(0, 0, 0, 0.12));
    color: var(--myui-code-text, #24292e);
    font-weight: 600;
  }
}

.myui-code-showcase__tab-icon {
  font-size: 15px;
}

// ===== 콘텐츠 패널 =====
.myui-code-showcase__panel {
  display: flex;
  overflow: hidden;
  border: 1px solid var(--myui-code-border, rgba(0, 0, 0, 0.14));
  border-radius: 12px;
  background: var(--myui-code-sidebar-bg, #f1f5f9);
  box-shadow: var(--myui-shadow, 0 4px 6px rgba(0, 0, 0, 0.1));
}

.myui-code-showcase__sidebar {
  width: 240px;
  flex-shrink: 0;
  overflow-y: auto;
  border-right: 1px solid var(--myui-code-border, rgba(0, 0, 0, 0.12));
}

.myui-code-showcase__viewer {
  flex: 1;
}

// 좁은 화면: 트리를 위로 스택
@media (max-width: 640px) {
  .myui-code-showcase__panel {
    flex-direction: column;
  }

  .myui-code-showcase__sidebar {
    width: 100%;
    max-height: 160px;
    border-right: none;
    border-bottom: 1px solid var(--myui-code-border, rgba(0, 0, 0, 0.12));
  }
}
</style>
