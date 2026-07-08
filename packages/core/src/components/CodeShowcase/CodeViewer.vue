<template>
  <!--
    CodeViewer 컴포넌트

    설계 원칙:
    - 읽기 전용 코드 뷰어 (편집 불가)
    - Shiki 기반 신택스 하이라이팅 (동적 import로 번들 분리)
    - Shiki 로딩 실패/로딩 중에는 일반 텍스트로 폴백 → 콘텐츠가 먼저 보임
  -->
  <div class="myui-code-viewer">
    <div v-if="filename" class="myui-code-viewer__header">
      <span class="myui-code-viewer__file-icon" aria-hidden="true">{{ fileIcon }}</span>
      <span class="myui-code-viewer__filename">{{ filename }}</span>
    </div>

    <div class="myui-code-viewer__body">
      <!-- Shiki가 생성한 HTML (코드는 Shiki가 이스케이프하므로 v-html 안전) -->
      <div
        v-if="highlightedHtml"
        class="myui-code-viewer__code"
        v-html="highlightedHtml"
      />
      <!-- 하이라이팅 전/실패 시 폴백 -->
      <pre v-else class="myui-code-viewer__plain"><code>{{ code }}</code></pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * CodeViewer 컴포넌트 스크립트
 */

import { ref, computed, watch } from 'vue'
import type { CodeViewerProps } from './types'

const props = withDefaults(defineProps<CodeViewerProps>(), {
  lang: '',
  filename: '',
  theme: 'github-dark'
})

const highlightedHtml = ref('')

// ===== 언어 추론 =====

/** 확장자 → Shiki 언어 매핑 */
const EXT_TO_LANG: Record<string, string> = {
  vue: 'vue',
  ts: 'typescript',
  tsx: 'tsx',
  js: 'javascript',
  jsx: 'jsx',
  json: 'json',
  css: 'css',
  scss: 'scss',
  html: 'html',
  md: 'markdown',
  yaml: 'yaml',
  yml: 'yaml',
  sh: 'shellscript'
}

const resolvedLang = computed(() => {
  if (props.lang) return props.lang
  const ext = props.filename.split('.').pop()?.toLowerCase() ?? ''
  return EXT_TO_LANG[ext] ?? 'text'
})

/** 헤더에 표시할 파일 타입 아이콘 (확장자 기반 텍스트 글리프) */
const fileIcon = computed(() => {
  const ext = props.filename.split('.').pop()?.toLowerCase() ?? ''
  if (ext === 'vue') return 'V'
  if (ext === 'json') return '{}'
  if (ext === 'ts' || ext === 'tsx') return 'TS'
  if (ext === 'js' || ext === 'jsx') return 'JS'
  return '≡'
})

// ===== Shiki 하이라이팅 =====

// Shiki 모듈은 무겁기 때문에 동적 import로 로드하고 모듈 단위로 1회만 로드
let shikiPromise: Promise<typeof import('shiki') | null> | null = null

function loadShiki() {
  if (!shikiPromise) {
    shikiPromise = import('shiki').catch(() => null)
  }
  return shikiPromise
}

// 연속 변경 시 마지막 요청 결과만 반영하기 위한 요청 번호
let requestId = 0

async function highlight() {
  const currentRequest = ++requestId

  const shiki = await loadShiki()
  if (!shiki || currentRequest !== requestId) return

  try {
    const html = await shiki.codeToHtml(props.code, {
      lang: resolvedLang.value,
      theme: props.theme
    })
    if (currentRequest === requestId) {
      highlightedHtml.value = html
    }
  } catch {
    // 지원하지 않는 언어/테마 → 일반 텍스트 폴백 유지
    if (currentRequest === requestId) {
      highlightedHtml.value = ''
    }
  }
}

watch(
  () => [props.code, resolvedLang.value, props.theme],
  () => highlight(),
  { immediate: true }
)
</script>

<style lang="scss">
/**
 * CodeViewer 스타일
 *
 * 코드 영역은 Nuxt 홈페이지처럼 항상 어두운 배경을 기본으로 하되,
 * CSS 변수로 오버라이드 가능하게 설계
 */
@import '../../styles/tokens.scss';

.myui-code-viewer {
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
  background: var(--myui-code-bg, #0b1120);
  color: var(--myui-code-text, #d6deeb);
}

// ===== 파일명 헤더 =====
.myui-code-viewer__header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--myui-code-border, rgba(255, 255, 255, 0.08));
  font-size: 14px;
  flex-shrink: 0;
}

.myui-code-viewer__file-icon {
  font-size: 12px;
  font-weight: 700;
  color: var(--myui-code-accent, #41b883);
  font-family: var(--myui-code-font, ui-monospace, 'SF Mono', Menlo, Consolas, monospace);
}

.myui-code-viewer__filename {
  font-family: var(--myui-code-font, ui-monospace, 'SF Mono', Menlo, Consolas, monospace);
  color: var(--myui-code-text, #d6deeb);
}

// ===== 코드 영역 =====
.myui-code-viewer__body {
  flex: 1;
  overflow: auto;
  min-height: 0;
}

.myui-code-viewer__code,
.myui-code-viewer__plain {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;

  // Shiki가 인라인으로 넣는 배경색 대신 컨테이너 배경 사용
  pre.shiki {
    margin: 0;
    padding: 20px;
    background: transparent !important;
    overflow-x: auto;
  }

  code {
    font-family: var(--myui-code-font, ui-monospace, 'SF Mono', Menlo, Consolas, monospace);
  }
}

.myui-code-viewer__plain {
  padding: 20px;
  overflow-x: auto;

  code {
    color: var(--myui-code-text, #d6deeb);
  }
}
</style>
