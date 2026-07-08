<template>
  <!--
    Playground 메인 앱
    - 컴포넌트들을 실제 환경에서 테스트
    - 다크모드 전환 기능 포함
    - Sidebar에서 컴포넌트 선택
  -->
  <div class="playground">
    <header class="playground__header">
      <h1>🎨 My UI Playground</h1>
      <button class="theme-toggle" @click="toggleTheme">
        {{ isDark ? '☀️ 라이트 모드' : '🌙 다크 모드' }}
      </button>
    </header>

    <div class="playground__body">
      <!-- Sidebar -->
      <aside class="playground__sidebar">
        <nav class="sidebar__nav">
          <h3 class="sidebar__title">Components</h3>
          <ul class="sidebar__list">
            <li
              v-for="component in components"
              :key="component.id"
              class="sidebar__item"
              :class="{ 'sidebar__item--active': selectedComponent === component.id }"
              @click="selectedComponent = component.id"
            >
              {{ component.name }}
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="playground__content">
      <!-- Button 컴포넌트 테스트 섹션 -->
      <section v-if="selectedComponent === 'button'" class="section">
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

      <!-- Input 컴포넌트 테스트 섹션 -->
      <section v-if="selectedComponent === 'input'" class="section">
        <h2>Input 컴포넌트</h2>
        
        <div class="demo-group">
          <h3>기본 Input</h3>
          <div class="demo-row">
            <UiInput v-model="inputValue" placeholder="입력하세요" />
          </div>
          <p style="margin-top: 8px; color: var(--myui-text-muted, #6c757d);">
            입력값: {{ inputValue }}
          </p>
        </div>

        <div class="demo-group">
          <h3>Sizes (크기)</h3>
          <div class="demo-row" style="flex-direction: column; align-items: flex-start; gap: 12px;">
            <UiInput size="sm" placeholder="Small input" />
            <UiInput size="md" placeholder="Medium input" />
            <UiInput size="lg" placeholder="Large input" />
          </div>
        </div>

        <div class="demo-group">
          <h3>Types (타입)</h3>
          <div class="demo-row" style="flex-direction: column; align-items: flex-start; gap: 12px;">
            <UiInput type="text" placeholder="Text input" />
            <UiInput type="email" placeholder="Email input" />
            <UiInput type="password" placeholder="Password input" />
            <UiInput type="number" placeholder="Number input" />
          </div>
        </div>

        <div class="demo-group">
          <h3>States (상태)</h3>
          <div class="demo-row" style="flex-direction: column; align-items: flex-start; gap: 12px;">
            <UiInput placeholder="Normal input" />
            <UiInput disabled placeholder="Disabled input" />
            <UiInput readonly placeholder="Readonly input" value="읽기 전용" />
            <UiInput error placeholder="Error input" />
          </div>
        </div>

        <div class="demo-group">
          <h3>Block (전체 너비)</h3>
          <UiInput block placeholder="Full width input" />
        </div>
      </section>

      <!-- Tab 컴포넌트 테스트 섹션 -->
      <section v-if="selectedComponent === 'tab'" class="section">
        <h2>Tab 컴포넌트</h2>
        
        <div class="demo-group">
          <h3>기본 Tab</h3>
          <UiTab v-model="activeTab" :tabs="tabTabs">
            <template #tab-tab1>
              <div style="padding: 20px; background: var(--myui-bg-secondary, #f8f9fa); border-radius: 6px;">
                <h4>탭 1 콘텐츠</h4>
                <p>첫 번째 탭의 내용입니다.</p>
              </div>
            </template>
            <template #tab-tab2>
              <div style="padding: 20px; background: var(--myui-bg-secondary, #f8f9fa); border-radius: 6px;">
                <h4>탭 2 콘텐츠</h4>
                <p>두 번째 탭의 내용입니다.</p>
              </div>
            </template>
            <template #tab-tab3>
              <div style="padding: 20px; background: var(--myui-bg-secondary, #f8f9fa); border-radius: 6px;">
                <h4>탭 3 콘텐츠</h4>
                <p>세 번째 탭의 내용입니다.</p>
              </div>
            </template>
          </UiTab>
          <p style="margin-top: 12px; color: var(--myui-text-muted, #6c757d);">
            현재 활성 탭: {{ activeTab }}
          </p>
        </div>

        <div class="demo-group">
          <h3>Variants (스타일 변형)</h3>
          <div style="margin-bottom: 24px;">
            <h4 style="margin-bottom: 12px; font-size: 14px;">Default</h4>
            <UiTab v-model="activeTab" :tabs="tabTabs" variant="default" />
          </div>
          <div style="margin-bottom: 24px;">
            <h4 style="margin-bottom: 12px; font-size: 14px;">Pills</h4>
            <UiTab v-model="activeTab" :tabs="tabTabs" variant="pills" />
          </div>
          <div style="margin-bottom: 24px;">
            <h4 style="margin-bottom: 12px; font-size: 14px;">Underline</h4>
            <UiTab v-model="activeTab" :tabs="tabTabs" variant="underline" />
          </div>
        </div>

        <div class="demo-group">
          <h3>Sizes (크기)</h3>
          <div style="margin-bottom: 24px;">
            <h4 style="margin-bottom: 12px; font-size: 14px;">Small</h4>
            <UiTab v-model="activeTab" :tabs="tabTabs" size="sm" />
          </div>
          <div style="margin-bottom: 24px;">
            <h4 style="margin-bottom: 12px; font-size: 14px;">Medium</h4>
            <UiTab v-model="activeTab" :tabs="tabTabs" size="md" />
          </div>
          <div style="margin-bottom: 24px;">
            <h4 style="margin-bottom: 12px; font-size: 14px;">Large</h4>
            <UiTab v-model="activeTab" :tabs="tabTabs" size="lg" />
          </div>
        </div>

        <div class="demo-group">
          <h3>Block (전체 너비)</h3>
          <UiTab v-model="activeTab" :tabs="tabTabs" block />
        </div>

        <div class="demo-group">
          <h3>Disabled (비활성화)</h3>
          <UiTab 
            v-model="activeTab" 
            :tabs="[
              { value: 'tab1', label: '탭 1' },
              { value: 'tab2', label: '탭 2', disabled: true },
              { value: 'tab3', label: '탭 3' }
            ]" 
          />
        </div>
      </section>

      <!-- Modal 컴포넌트 테스트 섹션 -->
      <section v-if="selectedComponent === 'modal'" class="section">
        <h2>Modal 컴포넌트</h2>
        
        <div class="demo-group">
          <h3>기본 Modal</h3>
          <div class="demo-row">
            <UiButton @click="isModalOpen = true">모달 열기</UiButton>
            <UiModal v-model="isModalOpen" title="기본 모달">
              <p>이것은 기본 모달입니다.</p>
              <p>닫기 버튼을 클릭하거나 Overlay를 클릭하면 닫힙니다.</p>
            </UiModal>
          </div>
        </div>

        <div class="demo-group">
          <h3>Sizes (크기)</h3>
          <div class="demo-row" style="flex-direction: column; align-items: flex-start; gap: 12px;">
            <UiButton @click="isModal2Open = true">Small 모달</UiButton>
            <UiModal v-model="isModal2Open" title="Small 모달" size="sm">
              <p>Small 크기의 모달입니다.</p>
            </UiModal>

            <UiButton @click="isModal3Open = true">Large 모달</UiButton>
            <UiModal v-model="isModal3Open" title="Large 모달" size="lg">
              <p>Large 크기의 모달입니다.</p>
              <p>더 넓은 공간을 제공합니다.</p>
            </UiModal>

            <UiButton @click="isModal4Open = true">Fullscreen 모달</UiButton>
            <UiModal v-model="isModal4Open" title="Fullscreen 모달" size="fullscreen">
              <p>전체 화면 모달입니다.</p>
            </UiModal>
          </div>
        </div>

        <div class="demo-group">
          <h3>Footer 슬롯</h3>
          <div class="demo-row">
            <UiButton @click="isModalOpen = true">Footer 있는 모달</UiButton>
            <UiModal v-model="isModalOpen" title="Footer 모달">
              <p>Footer 슬롯을 사용한 모달입니다.</p>
              <template #footer>
                <UiButton variant="secondary" @click="isModalOpen = false">취소</UiButton>
                <UiButton variant="primary" @click="isModalOpen = false">확인</UiButton>
              </template>
            </UiModal>
          </div>
        </div>

        <div class="demo-group">
          <h3>옵션</h3>
          <div class="demo-row" style="flex-direction: column; align-items: flex-start; gap: 12px;">
            <p style="color: var(--myui-text-muted, #6c757d); font-size: 14px;">
              • closeable: 닫기 버튼 표시 여부<br/>
              • closeOnClickOutside: Overlay 클릭 시 닫기 여부<br/>
              • closeOnEsc: ESC 키로 닫기 여부<br/>
              • lockScroll: 모달 열릴 때 body 스크롤 방지 여부
            </p>
          </div>
        </div>
      </section>

      <!-- CodeShowcase 컴포넌트 테스트 섹션 -->
      <section v-if="selectedComponent === 'code-showcase'" class="section">
        <h2>CodeShowcase 컴포넌트</h2>

        <!-- 액자 느낌을 원하면 demo-group--framed 클래스를 추가 (스타일은 하단 주석 참고) -->
        <div class="demo-group">
          <h3>기본 CodeShowcase</h3>
          <UiCodeShowcase v-model="activeShowcase" :examples="showcaseExamples" />
        </div>

        <div class="demo-group">
          <h3>옵션</h3>
          <p style="color: var(--myui-text-muted, #6c757d); font-size: 14px;">
            • examples: 예제 목록 (탭 라벨/아이콘 + 파일 경로/코드)<br/>
            • lightTheme / darkTheme: Shiki 하이라이팅 테마 (사이트 테마를 따라 자동 전환)<br/>
            • height: 콘텐츠 영역 높이<br/>
            • FileTree / CodeViewer는 독립 컴포넌트로도 사용 가능
          </p>
        </div>
      </section>

      <!-- 추가 컴포넌트들은 여기에 섹션 추가 -->
      </main>
    </div>

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

// Input 값
const inputValue = ref('')

// Tab 값
const activeTab = ref('tab1')
const tabTabs = [
  { value: 'tab1', label: '탭 1' },
  { value: 'tab2', label: '탭 2' },
  { value: 'tab3', label: '탭 3' }
]

// Modal 값
const isModalOpen = ref(false)
const isModal2Open = ref(false)
const isModal3Open = ref(false)
const isModal4Open = ref(false)

// CodeShowcase 값
const activeShowcase = ref('minimal')
const showcaseExamples = [
  {
    value: 'minimal',
    label: 'Minimal',
    icon: '🌱',
    files: [
      {
        path: 'app/app.vue',
        code: `<script setup lang="ts">
const version = 4
<\/script>

<template>
  <h1>
    Hello Nuxt {{ version }}!
  </h1>
</template>

<style scoped>
h1 {
  font-size: 3rem;
}
</style>
`
      },
      {
        path: 'package.json',
        code: `{
  "name": "nuxt-app",
  "dependencies": {
    "nuxt": "^4.0.0"
  }
}
`
      }
    ]
  },
  {
    value: 'routing',
    label: 'Routing',
    icon: '🧭',
    files: [
      {
        path: 'app/pages/index.vue',
        code: `<template>
  <NuxtLink to="/about">
    About 페이지로 이동
  </NuxtLink>
</template>
`
      },
      {
        path: 'app/pages/about.vue',
        code: `<template>
  <h1>About</h1>
</template>
`
      }
    ]
  }
]

// 선택된 컴포넌트
const selectedComponent = ref('button')

// 컴포넌트 목록
const components = [
  { id: 'button', name: 'Button' },
  { id: 'input', name: 'Input' },
  { id: 'tab', name: 'Tab' },
  { id: 'modal', name: 'Modal' },
  { id: 'code-showcase', name: 'CodeShowcase' }
]

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

.playground__body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.playground__sidebar {
  width: 250px;
  border-right: 1px solid var(--myui-border, rgba(0,0,0,0.12));
  background: var(--myui-bg-secondary, #f8f9fa);
  overflow-y: auto;
}

.sidebar__nav {
  padding: 20px;
}

.sidebar__title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--myui-text-muted, #6c757d);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
}

.sidebar__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar__item {
  padding: 12px 16px;
  margin-bottom: 4px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--myui-text, #222);
  font-size: 14px;
}

.sidebar__item:hover:not(.sidebar__item--active) {
  background: var(--myui-bg, #fff);
}

.sidebar__item--active {
  background: var(--myui-primary, #1867ff);
  color: var(--myui-text-inverse, #fff);
  font-weight: 500;
}

.sidebar__item--active:hover {
  background: var(--myui-primary, #1867ff);
  color: var(--myui-text-inverse, #fff);
}

.playground__content {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
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

/* 데모에 액자 느낌이 필요할 때 demo-group에 함께 붙여 쓰는 modifier
   (예: <div class="demo-group demo-group--framed">)
.demo-group--framed {
  padding: 24px;
  background: #020617;
  border-radius: 12px;
}
*/

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

