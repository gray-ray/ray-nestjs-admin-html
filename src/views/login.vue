<template>
  <div class="wrapper">
    <Form
      class="formWrap"
      :model="formState"
      name="loginFrom"
      autocomplete="off"
      layout="vertical"
      @finish="login"
    >
      <Form.Item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]"
      >
        <Input v-model:value="formState.username" :allow-clear="true" />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
      >
        <Input.Password v-model:value="formState.password" :allow-clear="true" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" html-type="submit" block>登录</Button>
      </Form.Item>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { loginApi } from '@/services/user'
import { setToken, getToken } from '@/services/http'
import { Button, Form, Input } from 'ant-design-vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formState = reactive<API.LoginVo>({
  username: 'root',
  password: 'root'
})

async function login(values: API.LoginVo) {
  const res = await loginApi(values)

  setToken(res?.access_token)

  // 验证 token 是否正确设置
  console.log('Token set in local storage:', getToken())

  router.push('/')
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.formWrap {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}
</style>
