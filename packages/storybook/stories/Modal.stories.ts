/**
 * Modal 컴포넌트 스토리
 */
import type { Meta, StoryObj } from '@storybook/vue3'
import { Modal, Button } from '@billy7175/my-ui-core'
import { ref, computed } from 'vue'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    modelValue: false,
    size: 'md',
    closeable: true,
    closeOnClickOutside: true,
    closeOnEsc: true,
    title: '모달 제목',
    ariaLabel: '모달',
    lockScroll: true
  },
  argTypes: {
    // modelValue는 v-model로 관리되므로 argTypes에서 제외
    size: {
      description: '모달 크기',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'fullscreen']
    },
    closeable: {
      description: '닫기 버튼 표시 여부',
      control: { type: 'boolean' }
    },
    closeOnClickOutside: {
      description: 'Overlay 클릭 시 닫기 여부',
      control: { type: 'boolean' }
    },
    closeOnEsc: {
      description: 'ESC 키로 닫기 여부',
      control: { type: 'boolean' }
    },
    title: {
      description: '모달 제목',
      control: { type: 'text' }
    },
    ariaLabel: {
      description: '모달 설명 (접근성)',
      control: { type: 'text' }
    },
    lockScroll: {
      description: '모달이 열릴 때 body 스크롤 방지 여부',
      control: { type: 'boolean' }
    }
  }
}

export default meta
type Story = StoryObj<typeof Modal>

/**
 * 기본 모달
 */
export const Default: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false)
      // modelValue를 제외한 props만 바인딩
      const modalProps = computed(() => {
        const { modelValue, ...rest } = args
        return rest
      })
      return { isOpen, modalProps }
    },
    template: `
      <div>
        <Button @click="isOpen = true">모달 열기</Button>
        <Modal v-model="isOpen" v-bind="modalProps">
          <p>이것은 기본 모달입니다.</p>
          <p>닫기 버튼을 클릭하거나 Overlay를 클릭하면 닫힙니다.</p>
        </Modal>
      </div>
    `
  })
}

/**
 * Small 모달
 */
export const Small: Story = {
  args: {
    size: 'sm',
    title: 'Small 모달'
  },
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false)
      const modalProps = computed(() => {
        const { modelValue, ...rest } = args
        return rest
      })
      return { isOpen, modalProps }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Small 모달 열기</Button>
        <Modal v-model="isOpen" v-bind="modalProps">
          <p>Small 크기의 모달입니다.</p>
        </Modal>
      </div>
    `
  })
}

/**
 * Medium 모달 (기본)
 */
export const Medium: Story = {
  args: {
    size: 'md',
    title: 'Medium 모달'
  },
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false)
      const modalProps = computed(() => {
        const { modelValue, ...rest } = args
        return rest
      })
      return { isOpen, modalProps }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Medium 모달 열기</Button>
        <Modal v-model="isOpen" v-bind="modalProps">
          <p>Medium 크기의 모달입니다. (기본값)</p>
        </Modal>
      </div>
    `
  })
}

/**
 * Large 모달
 */
export const Large: Story = {
  args: {
    size: 'lg',
    title: 'Large 모달'
  },
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false)
      const modalProps = computed(() => {
        const { modelValue, ...rest } = args
        return rest
      })
      return { isOpen, modalProps }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Large 모달 열기</Button>
        <Modal v-model="isOpen" v-bind="modalProps">
          <p>Large 크기의 모달입니다.</p>
          <p>더 넓은 공간을 제공합니다.</p>
        </Modal>
      </div>
    `
  })
}

/**
 * Fullscreen 모달
 */
export const Fullscreen: Story = {
  args: {
    size: 'fullscreen',
    title: 'Fullscreen 모달'
  },
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false)
      const modalProps = computed(() => {
        const { modelValue, ...rest } = args
        return rest
      })
      return { isOpen, modalProps }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Fullscreen 모달 열기</Button>
        <Modal v-model="isOpen" v-bind="modalProps">
          <p>전체 화면 모달입니다.</p>
        </Modal>
      </div>
    `
  })
}

/**
 * Footer 슬롯 사용
 */
export const WithFooter: Story = {
  args: {
    title: 'Footer 모달'
  },
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false)
      const modalProps = computed(() => {
        const { modelValue, ...rest } = args
        return rest
      })
      return { isOpen, modalProps }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Footer 있는 모달 열기</Button>
        <Modal v-model="isOpen" v-bind="modalProps">
          <p>Footer 슬롯을 사용한 모달입니다.</p>
          <template #footer>
            <Button variant="secondary" @click="isOpen = false">취소</Button>
            <Button variant="primary" @click="isOpen = false">확인</Button>
          </template>
        </Modal>
      </div>
    `
  })
}

/**
 * 닫기 버튼 없음
 */
export const WithoutCloseButton: Story = {
  args: {
    closeable: false,
    title: '닫기 버튼 없는 모달'
  },
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false)
      const modalProps = computed(() => {
        const { modelValue, ...rest } = args
        return rest
      })
      return { isOpen, modalProps }
    },
    template: `
      <div>
        <Button @click="isOpen = true">모달 열기</Button>
        <Modal v-model="isOpen" v-bind="modalProps">
          <p>닫기 버튼이 없는 모달입니다.</p>
          <p>Overlay를 클릭하거나 ESC 키를 눌러 닫을 수 있습니다.</p>
          <template #footer>
            <Button variant="primary" @click="isOpen = false">닫기</Button>
          </template>
        </Modal>
      </div>
    `
  })
}

/**
 * Overlay 클릭으로 닫기 비활성화
 */
export const NoCloseOnClickOutside: Story = {
  args: {
    closeOnClickOutside: false,
    title: 'Overlay 클릭으로 닫기 비활성화'
  },
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false)
      const modalProps = computed(() => {
        const { modelValue, ...rest } = args
        return rest
      })
      return { isOpen, modalProps }
    },
    template: `
      <div>
        <Button @click="isOpen = true">모달 열기</Button>
        <Modal v-model="isOpen" v-bind="modalProps">
          <p>Overlay를 클릭해도 닫히지 않습니다.</p>
          <p>닫기 버튼이나 ESC 키로만 닫을 수 있습니다.</p>
        </Modal>
      </div>
    `
  })
}

/**
 * 제목 없음
 */
export const WithoutTitle: Story = {
  args: {
    title: '',
    closeable: true
  },
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false)
      const modalProps = computed(() => {
        const { modelValue, ...rest } = args
        return rest
      })
      return { isOpen, modalProps }
    },
    template: `
      <div>
        <Button @click="isOpen = true">제목 없는 모달 열기</Button>
        <Modal v-model="isOpen" v-bind="modalProps">
          <p>제목이 없는 모달입니다.</p>
        </Modal>
      </div>
    `
  })
}

/**
 * 긴 콘텐츠
 */
export const LongContent: Story = {
  args: {
    title: '긴 콘텐츠 모달'
  },
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false)
      const modalProps = computed(() => {
        const { modelValue, ...rest } = args
        return rest
      })
      return { isOpen, modalProps }
    },
    template: `
      <div>
        <Button @click="isOpen = true">긴 콘텐츠 모달 열기</Button>
        <Modal v-model="isOpen" v-bind="modalProps">
          <p>이 모달은 스크롤 가능한 긴 콘텐츠를 포함합니다.</p>
          <div v-for="i in 20" :key="i" style="margin-bottom: 16px;">
            <h4>섹션 {{ i }}</h4>
            <p>이것은 섹션 {{ i }}의 내용입니다. 모달의 body 영역이 스크롤 가능하도록 설계되었습니다.</p>
          </div>
        </Modal>
      </div>
    `
  })
}

