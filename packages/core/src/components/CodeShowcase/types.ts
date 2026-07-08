/**
 * CodeShowcase 컴포넌트 타입 정의
 *
 * CodeShowcase = 예제 탭 + FileTree(파일 트리) + CodeViewer(코드 뷰어)
 * FileTree, CodeViewer는 독립 컴포넌트로도 사용 가능합니다.
 */

/** 쇼케이스에 표시할 파일 하나 */
export interface ShowcaseFile {
  /** 파일 경로 (예: 'app/app.vue') — 트리 구조는 경로에서 자동 생성 */
  path: string
  /** 파일 내용 (코드 원문) */
  code: string
  /** 신택스 하이라이팅 언어 (생략 시 확장자에서 추론) */
  lang?: string
}

/** 쇼케이스 예제 (상단 탭 하나에 해당) */
export interface ShowcaseExample {
  /** 예제 고유 식별자 */
  value: string
  /** 탭에 표시할 라벨 */
  label: string
  /** 탭 아이콘 (이모지 또는 짧은 텍스트) */
  icon?: string
  /** 예제에 포함된 파일 목록 */
  files: ShowcaseFile[]
  /** 처음 선택될 파일 경로 (생략 시 첫 번째 파일) */
  activeFile?: string
}

export interface CodeShowcaseProps {
  /** 예제 목록 */
  examples: ShowcaseExample[]
  /** 현재 활성화된 예제 value (v-model) */
  modelValue?: string
  /** Shiki 테마 이름 */
  theme?: string
  /** 콘텐츠 영역 높이 (CSS 값) */
  height?: string
  /** ARIA 레이블 (접근성) */
  ariaLabel?: string
}

/** 파일 트리 내부 노드 (경로에서 생성됨) */
export interface FileTreeNodeData {
  /** 표시 이름 (경로의 마지막 세그먼트) */
  name: string
  /** 전체 경로 */
  path: string
  /** 하위 노드 — 있으면 폴더, 없으면 파일 */
  children?: FileTreeNodeData[]
}

export interface FileTreeProps {
  /** 파일 경로 목록 (예: ['app/app.vue', 'package.json']) */
  files: string[]
  /** 현재 선택된 파일 경로 (v-model) */
  modelValue?: string
  /** ARIA 레이블 (접근성) */
  ariaLabel?: string
}

export interface CodeViewerProps {
  /** 표시할 코드 원문 */
  code: string
  /** 신택스 하이라이팅 언어 (생략 시 filename 확장자에서 추론) */
  lang?: string
  /** 헤더에 표시할 파일 경로/이름 (생략 시 헤더 미표시) */
  filename?: string
  /** Shiki 테마 이름 */
  theme?: string
}
