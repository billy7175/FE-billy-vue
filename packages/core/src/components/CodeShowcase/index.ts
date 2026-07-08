/**
 * CodeShowcase 컴포넌트 진입점
 *
 * CodeShowcase(조합) 외에 FileTree, CodeViewer도 독립적으로 사용할 수 있도록
 * 함께 export 합니다.
 */

export { default as CodeShowcase } from './CodeShowcase.vue'
export { default as FileTree } from './FileTree.vue'
export { default as CodeViewer } from './CodeViewer.vue'

// 타입도 함께 export (사용자가 타입을 직접 사용할 수 있도록)
export type {
  CodeShowcaseProps,
  ShowcaseExample,
  ShowcaseFile,
  FileTreeProps,
  FileTreeNodeData,
  CodeViewerProps
} from './types'
