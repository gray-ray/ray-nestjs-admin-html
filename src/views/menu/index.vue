<template>
  <div>
    <!-- <Form :model="formState" name="loginFrom" autocomplete="off" @finish="login">
      <Form.Item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: '请输入用户名' }]"
      >
        <Input :allow-clear="true" />
      </Form.Item>
      <Form.Item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <Input :allow-clear="true" />
      </Form.Item>
    </Form> -->
    <Button
      @click="
        () => {
          setModalShow(true)
          setModalAct(ActEnum.新增)
        }
      "
      >新增</Button
    >
    <Table
      :columns="columns"
      :pagination="false"
      :loading="loading"
      row-key="id"
      :data-source="dataSource"
    />

    <EditModal @refresh="fetchData" />
  </div>
</template>

<script setup lang="ts">
import useModel from './useModel.tsx'

import EditModal from './EditModal.vue'

import { Table, Button } from 'ant-design-vue'

const { columns, dataSource, loading, fetchData, ActEnum, setModalShow, setModalAct } = useModel()
</script>

<style scoped></style>
