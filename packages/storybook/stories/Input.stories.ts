/**
 * Input 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { Input } from '@billy7175/my-ui-core'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  
  args: {
    type: 'text',
    size: 'md',
    disabled: false,
    readonly: false,
    error: false,
    block: false,
    placeholder: '입력하세요'
  },
  
  argTypes: {
    type: {
      description: 'input 타입',
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url']
    },
    size: {
      description: 'input 크기',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    placeholder: {
      description: 'placeholder 텍스트',
      control: { type: 'text' }
    },
    disabled: {
      description: '비활성화 상태',
      control: { type: 'boolean' }
    },
    readonly: {
      description: '읽기 전용',
      control: { type: 'boolean' }
    },
    error: {
      description: '에러 상태',
      control: { type: 'boolean' }
    },
    block: {
      description: '전체 너비 사용',
      control: { type: 'boolean' }
    }
  }
}

export default meta
type Story = StoryObj<typeof Input>

// 기본 Input
export const Default: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Input v-model="value" v-bind="args" />'
  })
}

// 모든 사이즈
export const Sizes: Story = {
  render: () => ({
    components: { Input },
    setup() {
      return {
        sm: ref(''),
        md: ref(''),
        lg: ref('')
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 300px;">
        <Input v-model="sm" size="sm" placeholder="Small input" />
        <Input v-model="md" size="md" placeholder="Medium input" />
        <Input v-model="lg" size="lg" placeholder="Large input" />
      </div>
    `
  })
}

// 모든 타입
export const Types: Story = {
  render: () => ({
    components: { Input },
    setup() {
      return {
        text: ref(''),
        email: ref(''),
        password: ref(''),
        number: ref('')
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 300px;">
        <Input v-model="text" type="text" placeholder="Text input" />
        <Input v-model="email" type="email" placeholder="Email input" />
        <Input v-model="password" type="password" placeholder="Password input" />
        <Input v-model="number" type="number" placeholder="Number input" />
      </div>
    `
  })
}

// 상태들
export const States: Story = {
  render: () => ({
    components: { Input },
    setup() {
      return {
        normal: ref(''),
        disabled: ref(''),
        readonly: ref('읽기 전용'),
        error: ref('')
      }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 300px;">
        <Input v-model="normal" placeholder="Normal input" />
        <Input v-model="disabled" disabled placeholder="Disabled input" />
        <Input v-model="readonly" readonly placeholder="Readonly input" />
        <Input v-model="error" error placeholder="Error input" />
      </div>
    `
  })
}

// 전체 너비
export const Block: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { value }
    },
    template: '<Input v-model="value" block placeholder="Full width input" />'
  })
}

