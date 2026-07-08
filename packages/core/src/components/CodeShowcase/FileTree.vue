<template>
  <!--
    FileTree 컴포넌트

    설계 원칙:
    - 평평한 경로 목록(['app/app.vue', 'package.json'])에서 트리 구조 자동 생성
    - 선택된 파일은 v-model로 양방향 바인딩
    - CodeShowcase 내부용이지만 독립 사용도 가능
  -->
  <ul class="myui-file-tree" role="tree" :aria-label="ariaLabel">
    <FileTreeNode
      v-for="node in tree"
      :key="node.path"
      :node="node"
      :selected-path="modelValue"
      @select="handleSelect"
    />
  </ul>
</template>

<script lang="ts" setup>
/**
 * FileTree 컴포넌트 스크립트
 */

import { computed } from 'vue'
import FileTreeNode from './FileTreeNode.vue'
import type { FileTreeProps, FileTreeNodeData } from './types'

const props = withDefaults(defineProps<FileTreeProps>(), {
  files: () => [],
  ariaLabel: '파일 트리'
})

const emit = defineEmits<{
  /** 파일 선택 이벤트 (v-model) */
  'update:modelValue': [path: string]
}>()

/**
 * 경로 목록 → 중첩 트리 변환
 *
 * 예: ['app/app.vue', 'package.json']
 * → [{ name: 'app', children: [{ name: 'app.vue' }] }, { name: 'package.json' }]
 */
const tree = computed<FileTreeNodeData[]>(() => {
  const root: FileTreeNodeData[] = []

  for (const filePath of props.files) {
    const segments = filePath.split('/').filter(Boolean)
    let siblings = root
    let currentPath = ''

    segments.forEach((segment, index) => {
      currentPath = currentPath ? `${currentPath}/${segment}` : segment
      const isFile = index === segments.length - 1

      let node = siblings.find(n => n.path === currentPath)
      if (!node) {
        node = isFile
          ? { name: segment, path: currentPath }
          : { name: segment, path: currentPath, children: [] }
        siblings.push(node)
      }
      if (node.children) siblings = node.children
    })
  }

  sortTree(root)
  return root
})

/** 폴더 우선 + 이름순 정렬 (재귀) */
function sortTree(nodes: FileTreeNodeData[]) {
  nodes.sort((a, b) => {
    const aFolder = a.children ? 0 : 1
    const bFolder = b.children ? 0 : 1
    return aFolder - bFolder || a.name.localeCompare(b.name)
  })
  for (const node of nodes) {
    if (node.children) sortTree(node.children)
  }
}

function handleSelect(path: string) {
  emit('update:modelValue', path)
}
</script>

<style lang="scss">
/**
 * FileTree 스타일
 *
 * 명명 규칙: BEM
 * - Block: myui-file-tree
 * - Element: myui-file-tree__node, myui-file-tree__row, myui-file-tree__icon
 * - Modifier: myui-file-tree__row--active, myui-file-tree__row--folder
 */
@import '../../styles/tokens.scss';

.myui-file-tree {
  margin: 0;
  padding: 8px;
  list-style: none;
  font-size: 14px;
  color: var(--myui-code-text, #24292e);

  &__children {
    margin: 0;
    padding-left: 16px;
    list-style: none;
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px 12px;
    border: none;
    border-radius: var(--myui-border-radius, 6px);
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    text-align: left;
    cursor: pointer;
    transition: background-color var(--myui-transition-fast, 150ms ease);

    &:hover {
      background: var(--myui-code-hover, rgba(0, 0, 0, 0.05));
    }

    &:focus-visible {
      outline: 2px solid var(--myui-primary, #1867ff);
      outline-offset: -2px;
    }

    &--active {
      background: var(--myui-code-active, rgba(0, 0, 0, 0.08));
    }
  }

  &__icon {
    flex-shrink: 0;
    font-size: 13px;

    &--file {
      font-size: 11px;
      font-weight: 700;
      font-family: var(--myui-code-font, ui-monospace, 'SF Mono', Menlo, Consolas, monospace);

      // 파일 타입별 아이콘 색상 (라이트 기본)
      &[data-ext='vue'] { color: #35945f; }
      &[data-ext='json'] { color: #9c8500; }
      &[data-ext='ts'], &[data-ext='tsx'] { color: #3178c6; }
      &[data-ext='js'], &[data-ext='jsx'] { color: #9c8500; }

      // 다크 모드: 어두운 배경에서 더 밝은 색으로
      [data-theme='dark'] & {
        &[data-ext='vue'] { color: #41b883; }
        &[data-ext='json'] { color: #cbcb41; }
        &[data-ext='ts'], &[data-ext='tsx'] { color: #519aba; }
        &[data-ext='js'], &[data-ext='jsx'] { color: #cbcb41; }
      }
    }
  }

  &__name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__chevron {
    flex-shrink: 0;
    font-size: 12px;
    color: var(--myui-code-muted, #6c757d);
    transition: transform var(--myui-transition-fast, 150ms ease);
    transform: rotate(180deg);

    &--open {
      transform: rotate(0deg);
    }
  }
}
</style>
