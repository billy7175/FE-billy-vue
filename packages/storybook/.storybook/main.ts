/**
 * Storybook 메인 설정 파일
 * 
 * Storybook의 역할:
 * - 컴포넌트를 독립적으로 개발하고 테스트
 * - 자동 문서 생성
 * - 다양한 상태/props 조합을 시각적으로 확인
 * - 디자이너/개발자 협업 도구
 */
import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  // 스토리 파일 위치 - core 패키지의 stories 파일들을 참조
  stories: [
    '../../core/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  
  // 사용할 애드온
  addons: [
    '@storybook/addon-links',       // 스토리 간 링크
    '@storybook/addon-essentials',  // 필수 애드온 번들 (docs, controls, actions 등)
    '@storybook/addon-interactions' // 인터랙션 테스팅
  ],
  
  // Vue 3 + Vite 프레임워크
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  
  // 자동 문서 생성
  docs: {
    autodocs: 'tag' // @storybook/addon-docs 자동 문서화
  }
}

export default config

