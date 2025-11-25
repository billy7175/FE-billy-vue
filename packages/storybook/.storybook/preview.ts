/**
 * Storybook 프리뷰 설정
 * 
 * 모든 스토리에 적용되는 전역 설정:
 * - 데코레이터 (래퍼 컴포넌트)
 * - 글로벌 파라미터
 * - 테마 설정
 */
import type { Preview } from '@storybook/vue3'

// core 패키지의 스타일 import (필수!)
import '@my-ui/core/styles.css'

const preview: Preview = {
  parameters: {
    // 액션 핸들러 자동 감지 패턴
    actions: { argTypesRegex: '^on[A-Z].*' },
    
    // Controls 애드온 설정
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    
    // 배경색 옵션 (라이트/다크 테마 테스트용)
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0b1220' }
      ]
    }
  },
  
  // 전역 데코레이터 - 모든 스토리에 적용
  decorators: [
    (story, context) => ({
      components: { story },
      template: `
        <div :data-theme="theme" style="padding: 20px;">
          <story />
        </div>
      `,
      data() {
        return {
          // 배경색에 따라 테마 자동 설정
          theme: context.globals.backgrounds?.value === '#0b1220' ? 'dark' : 'light'
        }
      }
    })
  ]
}

export default preview

