<template>
  <Modal
    :title="optRef === ActEnum.新增 ? '新增' : '编辑'"
    :open="openFlag"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <Form
      :model="voRef"
      autocomplete="off"
      :label-align="'right'"
      :label-col="{ span: 4 }"
      ref="formRef"
    >
      <Form.Item label="菜单名称" name="menuName" :rules="[{ required: true, message: '角色名' }]">
        <Input placeholder="角色名" allow-clear v-model:value="voRef.menuName" />
      </Form.Item>

      <Form.Item label="路由" name="route">
        <Input placeholder="路由" allow-clear v-model:value="voRef.route" />
      </Form.Item>
      <Form.Item label="组件" name="component">
        <Input placeholder="组件" allow-clear v-model:value="voRef.component" />
      </Form.Item>
      <Form.Item label="类型" name="type">
        <Input placeholder="类型" allow-clear v-model:value="voRef.type" />
      </Form.Item>
      <Form.Item label="显示" name="show">
        <Switch v-model:checked="voRef.show" checked-children="显示" un-checked-children="隐藏" />
      </Form.Item>

      <Form.Item label="状态" name="status">
        <Switch v-model:checked="voRef.status" checked-children="正常" un-checked-children="停用" />
      </Form.Item>

      <Form.Item label="序号" name="sortNum">
        <InputNumber :min="1" v-model:value="voRef.sortNum" />
      </Form.Item>

      <Form.Item label="关联应用" name="appId">
        <Select
          :disabled="disabledApp"
          :options="optionsState?.appList?.map((o) => ({ label: o?.appName, value: o?.id }))"
          allow-clear
          v-model:value="voRef.appId"
        />
      </Form.Item>
    </Form>
  </Modal>
</template>
<script setup lang="ts">
import { reactive, computed, ref, type Ref, onMounted } from 'vue'
import { Modal, Form, Input, Switch, Select, message, InputNumber } from 'ant-design-vue'

import { createMenuApi, updateMenuApi } from '@/services/menu'
import { appAllApi } from '@/services/application'

import { storeToRefs } from 'pinia'
import { useMenuStore, ActEnum } from '@/stores/menu'

const store = useMenuStore()
// 同时通过插件添加的属性也会被提取为 ref
// 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
const { optRef, openFlag, voRef, parentVoRef } = storeToRefs(store)

// 作为 action 可以直接解构
const { setModalShow, resetVoRef, resetParentVoRef } = store

const emits = defineEmits(['refresh'])

const formRef = ref()

const optionsState = reactive<{ appList: API.AppVo[] }>({
  appList: []
})

const disabledApp = computed(() => {
  if (optRef.value === ActEnum.新增子节点) return true
  if (optRef.value === ActEnum.编辑 && voRef.value?.parentId) return true
  return false
})

const handleCancel = () => {
  resetVoRef()
  setModalShow(false)
}

const handleOk = async () => {
  const values = await formRef.value.validate().catch(() => false)

  if (!values) return

  const params =
    optRef.value === ActEnum.新增子节点
      ? {
          parentId: parentVoRef?.value?.id,
          appId: parentVoRef?.value?.appId,
          ...values
        }
      : { ...voRef.value, ...values }

  const apiMp = {
    [ActEnum.新增]: createMenuApi,
    [ActEnum.编辑]: updateMenuApi,
    [ActEnum.新增子节点]: createMenuApi
  }

  const res = await apiMp[optRef.value]?.(params)
  if (!res?.success) return

  if (optRef.value === ActEnum.新增子节点) {
    resetParentVoRef()
  } else {
    resetVoRef()
  }
  message.success(res?.message)
  setModalShow(false)

  emits('refresh')
}

const fetchApp = async () => {
  const res = await appAllApi()
  if (!res?.success) return
  optionsState.appList = res?.data ?? []
}

onMounted(() => {
  fetchApp()
})
</script>

<style scoped="less"></style>
