/**
 * CodeShowcase 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { CodeShowcase, CodeViewer, FileTree } from '@billy7175/my-ui-core'
import type { ShowcaseExample } from '@billy7175/my-ui-core'

// ===== 샘플 예제 데이터 (Nuxt 홈페이지 스타일) =====
const sampleExamples: ShowcaseExample[] = [
  {
    value: 'minimal',
    label: 'Minimal',
    icon: '🌱',
    files: [
      {
        path: 'app/app.vue',
        code: `<script setup lang="ts">
const version = 4
</script>

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
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build"
  },
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
  <NuxtLink to="/">홈으로</NuxtLink>
</template>
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
    value: 'data-fetching',
    label: 'Data Fetching',
    icon: '📡',
    files: [
      {
        path: 'app/app.vue',
        code: `<script setup lang="ts">
const { data: page } = await useFetch('/api/page')
</script>

<template>
  <h1>{{ page.title }}</h1>
</template>
`
      },
      {
        path: 'server/api/page.ts',
        code: `export default defineEventHandler(() => {
  return {
    title: 'Hello from the server!'
  }
})
`
      }
    ]
  }
]

const meta: Meta<typeof CodeShowcase> = {
  title: 'Components/CodeShowcase',
  component: CodeShowcase,
  tags: ['autodocs'],

  args: {
    examples: sampleExamples,
    theme: 'github-dark',
    height: '480px'
  },

  argTypes: {
    examples: {
      description: '예제 목록 (탭 + 파일 + 코드)',
      control: { type: 'object' }
    },
    theme: {
      description: 'Shiki 신택스 하이라이팅 테마',
      control: { type: 'select' },
      options: ['github-dark', 'github-light', 'nord', 'one-dark-pro', 'vitesse-dark']
    },
    height: {
      description: '콘텐츠 영역 높이',
      control: { type: 'text' }
    }
  }
}

export default meta
type Story = StoryObj<typeof CodeShowcase>

// 기본 CodeShowcase
export const Default: Story = {
  render: (args) => ({
    components: { CodeShowcase },
    setup() {
      const activeExample = ref('minimal')
      return { args, activeExample }
    },
    template: `
      <div style="padding: 24px; background: #020617; border-radius: 12px;">
        <CodeShowcase v-model="activeExample" v-bind="args" />
      </div>
    `
  })
}

// CodeViewer 단독 사용
export const ViewerOnly: Story = {
  render: () => ({
    components: { CodeViewer },
    setup() {
      const code = `export function add(a: number, b: number): number {
  return a + b
}
`
      return { code }
    },
    template: `
      <div style="height: 240px; border-radius: 12px; overflow: hidden;">
        <CodeViewer :code="code" filename="src/utils/math.ts" />
      </div>
    `
  })
}

// FileTree 단독 사용
export const TreeOnly: Story = {
  render: () => ({
    components: { FileTree },
    setup() {
      const selected = ref('src/components/Button.vue')
      const files = [
        'src/components/Button.vue',
        'src/components/Input.vue',
        'src/utils/format.ts',
        'package.json'
      ]
      return { selected, files }
    },
    template: `
      <div style="width: 280px; background: #0d1526; border-radius: 12px; padding: 8px;">
        <FileTree v-model="selected" :files="files" />
        <p style="color: #8b95a7; font-size: 13px; padding: 8px 12px;">선택됨: {{ selected }}</p>
      </div>
    `
  })
}
