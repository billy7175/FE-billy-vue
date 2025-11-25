#!/usr/bin/env node

/**
 * 컴포넌트 생성기 CLI
 * 
 * 사용법:
 *   pnpm new:component MyComponent
 *   node scripts/create-component.js MyComponent
 * 
 * 생성되는 파일:
 *   packages/core/src/components/MyComponent/
 *   ├── MyComponent.vue      // 컴포넌트 파일
 *   ├── index.ts             // export 파일
 *   └── MyComponent.stories.ts  // Storybook 스토리 (선택)
 * 
 * 옵션:
 *   --with-story    스토리북 스토리 파일도 함께 생성
 *   --with-test     테스트 파일도 함께 생성 (TODO: 구현 예정)
 * 
 * 목적:
 * - 팀 규약에 맞는 일관된 컴포넌트 구조 유지
 * - 보일러플레이트 작성 시간 절약
 * - 새 팀원의 온보딩 시간 단축
 */

const fs = require('fs')
const path = require('path')

// ===== 인자 파싱 =====
const args = process.argv.slice(2)
const componentName = args.find(arg => !arg.startsWith('--'))
const withStory = args.includes('--with-story')
const withTest = args.includes('--with-test')

// ===== 유효성 검사 =====
if (!componentName) {
  console.error(`
❌ 컴포넌트 이름을 입력해주세요.

사용법:
  pnpm new:component <ComponentName> [options]

옵션:
  --with-story    Storybook 스토리 파일 생성
  --with-test     테스트 파일 생성 (예정)

예시:
  pnpm new:component Button
  pnpm new:component MyWidget --with-story
  `)
  process.exit(1)
}

// PascalCase 검증
if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
  console.error(`
❌ 컴포넌트 이름은 PascalCase여야 합니다.
   예: Button, MyWidget, DataTable

입력된 이름: ${componentName}
  `)
  process.exit(1)
}

// ===== 경로 설정 =====
const componentDir = path.join(
  __dirname,
  '..',
  'packages',
  'core',
  'src',
  'components',
  componentName
)

// 이미 존재하는지 확인
if (fs.existsSync(componentDir)) {
  console.error(`
❌ 이미 존재하는 컴포넌트입니다: ${componentName}
   경로: ${componentDir}
  `)
  process.exit(1)
}

// ===== 유틸 함수 =====

/**
 * PascalCase를 kebab-case로 변환
 * MyComponent → my-component
 */
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

/**
 * PascalCase를 camelCase로 변환
 * MyComponent → myComponent
 */
function toCamelCase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

// ===== 템플릿 정의 =====
const pascal = componentName
const kebab = toKebabCase(componentName)
const camel = toCamelCase(componentName)

// Vue 컴포넌트 템플릿
const vueTemplate = `<template>
  <!--
    ${pascal} 컴포넌트
    TODO: 컴포넌트 설명 추가
  -->
  <div class="myui-${kebab}">
    <slot />
  </div>
</template>

<script lang="ts" setup>
/**
 * ${pascal} 컴포넌트
 * 
 * @example
 * <${pascal}>내용</${pascal}>
 */

// Props 타입 정의
export interface ${pascal}Props {
  // TODO: props 정의
}

const props = withDefaults(defineProps<${pascal}Props>(), {
  // 기본값
})

// Emits 정의
const emit = defineEmits<{
  // TODO: emit 이벤트 정의
}>()
</script>

<style lang="scss">
@import '../../styles/tokens.scss';

.myui-${kebab} {
  // TODO: 스타일 작성
}
</style>
`

// index.ts 템플릿
const indexTemplate = `/**
 * ${pascal} 컴포넌트 진입점
 */

export { default as ${pascal} } from './${pascal}.vue'
export type { ${pascal}Props } from './${pascal}.vue'
`

// Storybook 스토리 템플릿
const storyTemplate = `import type { Meta, StoryObj } from '@storybook/vue3'
import { ${pascal} } from '@my-ui/core'

const meta: Meta<typeof ${pascal}> = {
  title: 'Components/${pascal}',
  component: ${pascal},
  tags: ['autodocs'],
  args: {
    // 기본 args
  },
  argTypes: {
    // TODO: argTypes 정의
  }
}

export default meta
type Story = StoryObj<typeof ${pascal}>

/**
 * 기본 스토리
 */
export const Default: Story = {
  render: (args) => ({
    components: { ${pascal} },
    setup() { return { args } },
    template: '<${pascal} v-bind="args">Content</${pascal}>'
  })
}
`

// ===== 파일 생성 =====
console.log(`\n🚀 컴포넌트 생성 중: ${pascal}\n`)

// 디렉토리 생성
fs.mkdirSync(componentDir, { recursive: true })

// Vue 파일 생성
const vuePath = path.join(componentDir, `${pascal}.vue`)
fs.writeFileSync(vuePath, vueTemplate)
console.log(`  ✅ ${pascal}.vue`)

// index.ts 생성
const indexPath = path.join(componentDir, 'index.ts')
fs.writeFileSync(indexPath, indexTemplate)
console.log(`  ✅ index.ts`)

// 스토리 파일 생성 (옵션)
if (withStory) {
  const storyPath = path.join(componentDir, `${pascal}.stories.ts`)
  fs.writeFileSync(storyPath, storyTemplate)
  console.log(`  ✅ ${pascal}.stories.ts`)
}

// 테스트 파일 생성 (옵션, TODO)
if (withTest) {
  console.log(`  ⚠️  테스트 파일 생성은 아직 구현되지 않았습니다.`)
}

// ===== 다음 단계 안내 =====
console.log(`
✨ 컴포넌트 생성 완료!

📁 생성된 파일:
   ${componentDir}/

📝 다음 단계:
   1. packages/core/src/index.ts에 export 추가:
      export { ${pascal} } from './components/${pascal}'

   2. 컴포넌트 구현:
      ${vuePath}

   3. (선택) Storybook 스토리 작성:
      ${withStory ? `${componentDir}/${pascal}.stories.ts` : `pnpm new:component ${pascal} --with-story`}
`)

