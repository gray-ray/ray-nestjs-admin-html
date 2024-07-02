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
      <Form.Item label="角色名" name="roleName" :rules="[{ required: true, message: '角色名' }]">
        <Input placeholder="角色名" allow-clear v-model:value="voRef.roleName" />
      </Form.Item>
      <Form.Item label="code" name="code">
        <Input placeholder="code" allow-clear v-model:value="voRef.code" />
      </Form.Item>

      <Form.Item label="状态" name="status">
        <Switch v-model:checked="voRef.status" checked-children="正常" un-checked-children="停用" />
      </Form.Item>
      <Form.Item label="备注" name="remark">
        <Input.TextArea placeholder="备注" allow-clear v-model:value="voRef.remark" />
      </Form.Item>
      <!-- <Form.Item label="角色" name="roleIds">
        <Select
          mode="multiple"
          :options="optionsState?.roleList?.map((o) => ({ label: o?.roleName, value: o?.id }))"
          allow-clear
          v-model:value="voRef.roleIds"
        />
      </Form.Item> -->
    </Form>
  </Modal>
</template>
<script setup lang="ts">
import { reactive, watch, ref, type Ref, onMounted } from 'vue'
import { Modal, Form, Input, Switch, Select, message } from 'ant-design-vue'

import { createRoleApi, updateRoleApi } from '@/services/role'
import { roleAllApi } from '@/services/role'

import { storeToRefs } from 'pinia'
import { useRoleStore, ActEnum } from '@/stores/role'

const store = useRoleStore()
// 同时通过插件添加的属性也会被提取为 ref
// 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
const { optRef, openFlag, voRef } = storeToRefs(store)

// 作为 action 可以直接解构
const { setModalShow, resetVoRef } = store

const emits = defineEmits(['refresh'])

const formRef = ref()

const optionsState = reactive<{ roleList: API.RoleVo[] }>({
  roleList: []
})

const handleCancel = () => {
  resetVoRef()
  setModalShow(false)
}

const handleOk = async () => {
  const values = await formRef.value.validate().catch(() => false)

  if (!values) return

  const params = { ...voRef.value, ...values }

  const apiMp = {
    [ActEnum.新增]: createRoleApi,
    [ActEnum.编辑]: updateRoleApi
  }

  const res = await apiMp[optRef.value]?.(params)
  if (!res?.success) return

  message.success(res?.message)
  setModalShow(false)
  resetVoRef()
  emits('refresh')
}

const fetchRole = async () => {
  const res = await roleAllApi()
  if (!res?.success) return
  optionsState.roleList = res?.data ?? []
}

onMounted(() => {
  fetchRole()
})
</script>

<style scoped="less"></style>
