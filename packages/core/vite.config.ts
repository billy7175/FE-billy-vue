/**
 * Vite 라이브러리 빌드 설정
 * 
 * 왜 Vite를 사용하나?
 * - Vue SFC(.vue) 파일을 네이티브로 지원
 * - 라이브러리 모드로 ESM/CJS 동시 출력
 * - 빠른 빌드 속도
 * - Vue 생태계와 완벽 호환
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    // TypeScript 타입 선언 파일 생성
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      outDir: 'dist',
      // Vue 파일의 타입도 생성
      staticImport: true,
      insertTypesEntry: true
    })
  ],
  
  build: {
    // 라이브러리 모드
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        plugin: resolve(__dirname, 'src/plugin.ts')
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const ext = format === 'es' ? 'js' : 'cjs'
        return `${entryName}.${ext}`
      }
    },
    
    // 외부 의존성 (번들에 포함하지 않음)
    rollupOptions: {
      external: ['vue'],
      output: {
        // Vue를 전역 변수로 사용할 때의 이름
        globals: {
          vue: 'Vue'
        },
        // CSS를 별도 파일로 추출
        assetFileNames: 'styles.[ext]'
      }
    },
    
    // 소스맵 생성
    sourcemap: true,
    
    // 빌드 전 dist 폴더 정리
    emptyOutDir: true
  }
})

