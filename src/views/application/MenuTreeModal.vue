<template>
  <Modal title="应用菜单" width="80%" :open="openFlag1" @cancel="handleCancel" :footer="null">
    <Table
      :pagination="false"
      :columns="columns"
      rowKey="id"
      :dataSource="dataSource"
      :scroll="{ y: 500 }"
    />
  </Modal>
</template>
<script setup lang="ts">
import { reactive, watch, ref, type Ref, onMounted } from 'vue'
import { Modal, Table } from 'ant-design-vue'
import type { ColumnsType } from 'ant-design-vue/es/table'
import { appMenuApi } from '@/services/application'

import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/application'

defineProps<{ columns: ColumnsType<any> }>()

const store = useAppStore()
// 同时通过插件添加的属性也会被提取为 ref
// 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
const { voRef, openFlag1 } = storeToRefs(store)

const dataSource = ref([])

// 作为 action 可以直接解构
const { setModal1Show, resetVoRef } = store

const handleCancel = () => {
  resetVoRef()
  setModal1Show(false)
}

const fetchRole = async () => {
  const res = await appMenuApi(voRef?.value?.id)
  if (!res?.success) return
  console.log(res?.data)
  dataSource.value = res?.data
}

watch(openFlag1, async (n) => {
  if (!n) return
  fetchRole()
})
</script>

<style scoped="less"></style>
