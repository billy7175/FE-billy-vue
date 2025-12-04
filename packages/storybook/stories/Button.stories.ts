/**
 * Button 컴포넌트 스토리
 * 
 * 스토리란?
 * - 컴포넌트의 특정 상태를 캡처한 것
 * - 각 스토리는 컴포넌트의 다른 사용 사례를 보여줌
 * 
 * 스토리북에서 할 수 있는 것:
 * - 모든 props 조합을 시각적으로 확인
 * - 인터랙션 테스트
 * - 자동 문서 생성
 */
import type { Meta, StoryObj } from '@storybook/vue3'
import { Button } from '@billy7175/my-ui-core'

// 메타 정보 - 컴포넌트에 대한 기본 설정
const meta: Meta<typeof Button> = {
  title: 'Components/Button',  // 사이드바에서의 위치
  component: Button,
  tags: ['autodocs'],  // 자동 문서 생성 활성화
  
  // 기본 args (props)
  args: {
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    block: false
  },
  
  // args에 대한 컨트롤 설정
  argTypes: {
    variant: {
      description: '버튼 스타일 변형',
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'ghost']
    },
    size: {
      description: '버튼 크기',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    loading: {
      description: '로딩 상태',
      control: { type: 'boolean' }
    },
    disabled: {
      description: '비활성화 상태',
      control: { type: 'boolean' }
    },
    block: {
      description: '전체 너비 사용',
      control: { type: 'boolean' }
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트'
    }
  }
}

export default meta
type Story = StoryObj<typeof Button>

// ===== 개별 스토리들 =====

/**
 * 기본 Primary 버튼
 */
export const Primary: Story = {
  args: {
    variant: 'primary'
  },
  render: (args) => ({
    components: { Button },
    setup() { return { args } },
    template: '<Button v-bind="args">Primary Button</Button>'
  })
}

/**
 * Secondary 버튼 - 보조 액션에 사용
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary'
  },
  render: (args) => ({
    components: { Button },
    setup() { return { args } },
    template: '<Button v-bind="args">Secondary Button</Button>'
  })
}

/**
 * Danger 버튼 - 위험한 액션 (삭제 등)에 사용
 */
export const Danger: Story = {
  args: {
    variant: 'danger'
  },
  render: (args) => ({
    components: { Button },
    setup() { return { args } },
    template: '<Button v-bind="args">Delete</Button>'
  })
}

/**
 * Ghost 버튼 - 텍스트 링크처럼 보이는 버튼
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost'
  },
  render: (args) => ({
    components: { Button },
    setup() { return { args } },
    template: '<Button v-bind="args">Ghost Button</Button>'
  })
}

/**
 * 모든 사이즈 비교
 */
export const Sizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; align-items: center; gap: 12px;">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    `
  })
}

/**
 * 로딩 상태
 */
export const Loading: Story = {
  args: {
    loading: true
  },
  render: (args) => ({
    components: { Button },
    setup() { return { args } },
    template: '<Button v-bind="args">Loading...</Button>'
  })
}

/**
 * 비활성화 상태
 */
export const Disabled: Story = {
  args: {
    disabled: true
  },
  render: (args) => ({
    components: { Button },
    setup() { return { args } },
    template: '<Button v-bind="args">Disabled</Button>'
  })
}

/**
 * 전체 너비 버튼
 */
export const Block: Story = {
  args: {
    block: true
  },
  render: (args) => ({
    components: { Button },
    setup() { return { args } },
    template: '<Button v-bind="args">Full Width Button</Button>'
  })
}

/**
 * 모든 변형 한눈에 보기
 */
export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 12px; align-items: center;">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" loading>Loading</Button>
        </div>
      </div>
    `
  })
}

