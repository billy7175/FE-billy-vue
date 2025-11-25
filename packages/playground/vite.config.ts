/**
 * Vite 설정 파일
 * 
 * playground는 개발 중 컴포넌트를 실제 환경에서 테스트하기 위한 앱입니다.
 * @my-ui/core를 workspace 의존성으로 가져와서 실시간으로 변경사항을 확인할 수 있습니다.
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  
  resolve: {
    alias: {
      // 워크스페이스 패키지가 자동으로 연결되지만, 명시적 alias도 가능
      '@': resolve(__dirname, 'src')
    }
  },
  
  server: {
    port: 3000,
    open: true // 개발 서버 시작 시 브라우저 자동 열기
  }
})

