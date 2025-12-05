/**
 * Tab 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { Tab } from '@billy7175/my-ui-core'

const meta: Meta<typeof Tab> = {
  title: 'Components/Tab',
  component: Tab,
  tags: ['autodocs'],
  
  args: {
    tabs: [
      { value: 'tab1', label: '탭 1' },
      { value: 'tab2', label: '탭 2' },
      { value: 'tab3', label: '탭 3' }
    ],
    size: 'md',
    variant: 'default',
    block: false
  },
  
  argTypes: {
    tabs: {
      description: '탭 목록',
      control: { type: 'object' }
    },
    size: {
      description: '탭 크기',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    variant: {
      description: '탭 스타일 변형',
      control: { type: 'select' },
      options: ['default', 'pills', 'underline']
    },
    block: {
      description: '전체 너비 사용',
      control: { type: 'boolean' }
    }
  }
}

export default meta
type Story = StoryObj<typeof Tab>

// 기본 Tab
export const Default: Story = {
  render: (args) => ({
    components: { Tab },
    setup() {
      const activeTab = ref('tab1')
      return { args, activeTab }
    },
    template: `
      <Tab v-model="activeTab" v-bind="args">
        <template #tab-tab1>
          <div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">
            <h4>탭 1 콘텐츠</h4>
            <p>첫 번째 탭의 내용입니다.</p>
          </div>
        </template>
        <template #tab-tab2>
          <div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">
            <h4>탭 2 콘텐츠</h4>
            <p>두 번째 탭의 내용입니다.</p>
          </div>
        </template>
        <template #tab-tab3>
          <div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">
            <h4>탭 3 콘텐츠</h4>
            <p>세 번째 탭의 내용입니다.</p>
          </div>
        </template>
      </Tab>
    `
  })
}

// 모든 Variants
export const Variants: Story = {
  render: () => ({
    components: { Tab },
    setup() {
      const tabs = [
        { value: 'tab1', label: '탭 1' },
        { value: 'tab2', label: '탭 2' },
        { value: 'tab3', label: '탭 3' }
      ]
      const activeTab1 = ref('tab1')
      const activeTab2 = ref('tab1')
      const activeTab3 = ref('tab1')
      return { tabs, activeTab1, activeTab2, activeTab3 }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px;">Default</h4>
          <Tab v-model="activeTab1" :tabs="tabs" variant="default">
            <template #tab-tab1><div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">탭 1 콘텐츠</div></template>
            <template #tab-tab2><div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">탭 2 콘텐츠</div></template>
            <template #tab-tab3><div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">탭 3 콘텐츠</div></template>
          </Tab>
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px;">Pills</h4>
          <Tab v-model="activeTab2" :tabs="tabs" variant="pills">
            <template #tab-tab1><div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">탭 1 콘텐츠</div></template>
            <template #tab-tab2><div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">탭 2 콘텐츠</div></template>
            <template #tab-tab3><div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">탭 3 콘텐츠</div></template>
          </Tab>
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px;">Underline</h4>
          <Tab v-model="activeTab3" :tabs="tabs" variant="underline">
            <template #tab-tab1><div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">탭 1 콘텐츠</div></template>
            <template #tab-tab2><div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">탭 2 콘텐츠</div></template>
            <template #tab-tab3><div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">탭 3 콘텐츠</div></template>
          </Tab>
        </div>
      </div>
    `
  })
}

// 모든 사이즈
export const Sizes: Story = {
  render: () => ({
    components: { Tab },
    setup() {
      const tabs = [
        { value: 'tab1', label: '탭 1' },
        { value: 'tab2', label: '탭 2' },
        { value: 'tab3', label: '탭 3' }
      ]
      const activeTab1 = ref('tab1')
      const activeTab2 = ref('tab1')
      const activeTab3 = ref('tab1')
      return { tabs, activeTab1, activeTab2, activeTab3 }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px;">
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px;">Small</h4>
          <Tab v-model="activeTab1" :tabs="tabs" size="sm">
            <template #tab-tab1><div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">탭 1 콘텐츠</div></template>
            <template #tab-tab2><div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">탭 2 콘텐츠</div></template>
            <template #tab-tab3><div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">탭 3 콘텐츠</div></template>
          </Tab>
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px;">Medium</h4>
          <Tab v-model="activeTab2" :tabs="tabs" size="md">
            <template #tab-tab1><div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">탭 1 콘텐츠</div></template>
            <template #tab-tab2><div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">탭 2 콘텐츠</div></template>
            <template #tab-tab3><div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">탭 3 콘텐츠</div></template>
          </Tab>
        </div>
        <div>
          <h4 style="margin-bottom: 12px; font-size: 14px;">Large</h4>
          <Tab v-model="activeTab3" :tabs="tabs" size="lg">
            <template #tab-tab1><div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">탭 1 콘텐츠</div></template>
            <template #tab-tab2><div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">탭 2 콘텐츠</div></template>
            <template #tab-tab3><div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">탭 3 콘텐츠</div></template>
          </Tab>
        </div>
      </div>
    `
  })
}

// Disabled 상태
export const Disabled: Story = {
  render: () => ({
    components: { Tab },
    setup() {
      const tabs = [
        { value: 'tab1', label: '탭 1' },
        { value: 'tab2', label: '탭 2', disabled: true },
        { value: 'tab3', label: '탭 3' }
      ]
      const activeTab = ref('tab1')
      return { tabs, activeTab }
    },
    template: `
      <Tab v-model="activeTab" :tabs="tabs">
        <template #tab-tab1>
          <div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">
            <h4>탭 1 콘텐츠</h4>
            <p>첫 번째 탭의 내용입니다.</p>
          </div>
        </template>
        <template #tab-tab2>
          <div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">
            <h4>탭 2 콘텐츠 (비활성화됨)</h4>
            <p>이 탭은 비활성화되어 있습니다.</p>
          </div>
        </template>
        <template #tab-tab3>
          <div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">
            <h4>탭 3 콘텐츠</h4>
            <p>세 번째 탭의 내용입니다.</p>
          </div>
        </template>
      </Tab>
    `
  })
}

// 전체 너비
export const Block: Story = {
  render: () => ({
    components: { Tab },
    setup() {
      const tabs = [
        { value: 'tab1', label: '탭 1' },
        { value: 'tab2', label: '탭 2' },
        { value: 'tab3', label: '탭 3' }
      ]
      const activeTab = ref('tab1')
      return { tabs, activeTab }
    },
    template: `
      <Tab v-model="activeTab" :tabs="tabs" block>
        <template #tab-tab1>
          <div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">
            <h4>탭 1 콘텐츠</h4>
            <p>전체 너비를 사용하는 탭입니다.</p>
          </div>
        </template>
        <template #tab-tab2>
          <div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">
            <h4>탭 2 콘텐츠</h4>
            <p>두 번째 탭의 내용입니다.</p>
          </div>
        </template>
        <template #tab-tab3>
          <div style="padding: 20px; background: #f8f9fa; border-radius: 6px;">
            <h4>탭 3 콘텐츠</h4>
            <p>세 번째 탭의 내용입니다.</p>
          </div>
        </template>
      </Tab>
    `
  })
}

