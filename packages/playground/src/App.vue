<template>
  <!--
    Playground 메인 앱
    - 컴포넌트들을 실제 환경에서 테스트
    - 다크모드 전환 기능 포함
  -->
  <div class="playground">
    <header class="playground__header">
      <h1>🎨 My UI Playground</h1>
      <button class="theme-toggle" @click="toggleTheme">
        {{ isDark ? '☀️ 라이트 모드' : '🌙 다크 모드' }}
      </button>
    </header>

    <main class="playground__content">
      <!-- Button 컴포넌트 테스트 섹션 -->
      <section class="section">
        <h2>Button 컴포넌트</h2>
        
        <div class="demo-group">
          <h3>Variants (스타일 변형)</h3>
          <div class="demo-row">
            <UiButton variant="primary">Primary</UiButton>
            <UiButton variant="secondary">Secondary</UiButton>
            <UiButton variant="danger">Danger</UiButton>
            <UiButton variant="ghost">Ghost</UiButton>
          </div>
        </div>

        <div class="demo-group">
          <h3>Sizes (크기)</h3>
          <div class="demo-row">
            <UiButton size="sm">Small</UiButton>
            <UiButton size="md">Medium</UiButton>
            <UiButton size="lg">Large</UiButton>
          </div>
        </div>

        <div class="demo-group">
          <h3>States (상태)</h3>
          <div class="demo-row">
            <UiButton>Normal</UiButton>
            <UiButton disabled>Disabled</UiButton>
            <UiButton :loading="isLoading" @click="handleLoadingClick">
              {{ isLoading ? 'Loading...' : 'Click to Load' }}
            </UiButton>
          </div>
        </div>

        <div class="demo-group">
          <h3>Block (전체 너비)</h3>
          <UiButton block>Full Width Button</UiButton>
        </div>
      </section>

      <!-- 추가 컴포넌트들은 여기에 섹션 추가 -->
    </main>

    <footer class="playground__footer">
      <p>@my-ui/core 컴포넌트 라이브러리 개발용 Playground</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 다크모드 상태
const isDark = ref(false)

// 로딩 상태 데모
const isLoading = ref(false)

/**
 * 테마 전환 함수
 */
function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.setAttribute(
    'data-theme',
    isDark.value ? 'dark' : 'light'
  )
}

/**
 * 로딩 버튼 클릭 핸들러
 */
function handleLoadingClick() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}

// 시스템 다크모드 감지
onMounted(() => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true
    document.documentElement.setAttribute('data-theme', 'dark')
  }
})
</script>

<style>
/* Playground 전용 스타일 */
.playground {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.playground__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  border-bottom: 1px solid var(--myui-border, rgba(0,0,0,0.12));
  background: var(--myui-bg-secondary, #f8f9fa);
}

.playground__header h1 {
  font-size: 1.5rem;
  font-weight: 600;
}

.theme-toggle {
  padding: 8px 16px;
  border: 1px solid var(--myui-border, rgba(0,0,0,0.12));
  border-radius: 6px;
  background: var(--myui-bg, #fff);
  color: var(--myui-text, #222);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  background: var(--myui-primary, #1867ff);
  color: white;
  border-color: var(--myui-primary, #1867ff);
}

.playground__content {
  flex: 1;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.section {
  margin-bottom: 48px;
}

.section h2 {
  font-size: 1.5rem;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--myui-primary, #1867ff);
}

.demo-group {
  margin-bottom: 32px;
}

.demo-group h3 {
  font-size: 1rem;
  color: var(--myui-text-muted, #6c757d);
  margin-bottom: 16px;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.playground__footer {
  padding: 20px 40px;
  text-align: center;
  border-top: 1px solid var(--myui-border, rgba(0,0,0,0.12));
  color: var(--myui-text-muted, #6c757d);
  font-size: 14px;
}
</style>

