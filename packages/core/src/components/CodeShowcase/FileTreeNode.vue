<template>
  <!--
    FileTreeNode 컴포넌트 (FileTree 내부용, 재귀)

    - 폴더: 접기/펼치기 토글
    - 파일: 클릭 시 선택 이벤트
  -->
  <li
    class="myui-file-tree__node"
    :role="isFolder ? undefined : 'treeitem'"
    :aria-selected="isFolder ? undefined : node.path === selectedPath"
  >
    <!-- 폴더 -->
    <template v-if="isFolder">
      <button
        type="button"
        class="myui-file-tree__row myui-file-tree__row--folder"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <span class="myui-file-tree__icon" aria-hidden="true">📂</span>
        <span class="myui-file-tree__name">{{ node.name }}</span>
        <span
          class="myui-file-tree__chevron"
          :class="{ 'myui-file-tree__chevron--open': isOpen }"
          aria-hidden="true"
        >⌃</span>
      </button>

      <ul v-show="isOpen" class="myui-file-tree__children" role="group">
        <FileTreeNode
          v-for="child in node.children"
          :key="child.path"
          :node="child"
          :selected-path="selectedPath"
          @select="emit('select', $event)"
        />
      </ul>
    </template>

    <!-- 파일 -->
    <button
      v-else
      type="button"
      class="myui-file-tree__row myui-file-tree__row--file"
      :class="{ 'myui-file-tree__row--active': node.path === selectedPath }"
      @click="emit('select', node.path)"
    >
      <span
        class="myui-file-tree__icon myui-file-tree__icon--file"
        :data-ext="ext"
        aria-hidden="true"
      >{{ fileIcon }}</span>
      <span class="myui-file-tree__name">{{ node.name }}</span>
    </button>
  </li>
</template>

<script lang="ts" setup>
/**
 * FileTreeNode 컴포넌트 스크립트
 *
 * script setup에서는 파일명(FileTreeNode)으로 자기 자신을 재귀 참조할 수 있음
 */

import { ref, computed } from 'vue'
import type { FileTreeNodeData } from './types'

const props = defineProps<{
  /** 렌더링할 트리 노드 */
  node: FileTreeNodeData
  /** 현재 선택된 파일 경로 */
  selectedPath?: string
}>()

const emit = defineEmits<{
  /** 파일 선택 이벤트 */
  select: [path: string]
}>()

// 폴더는 기본적으로 펼침 상태
const isOpen = ref(true)

const isFolder = computed(() => Array.isArray(props.node.children))

const ext = computed(() => props.node.name.split('.').pop()?.toLowerCase() ?? '')

/** 확장자 기반 텍스트 글리프 아이콘 */
const fileIcon = computed(() => {
  if (ext.value === 'vue') return 'V'
  if (ext.value === 'json') return '{}'
  if (ext.value === 'ts' || ext.value === 'tsx') return 'TS'
  if (ext.value === 'js' || ext.value === 'jsx') return 'JS'
  return '≡'
})
</script>
