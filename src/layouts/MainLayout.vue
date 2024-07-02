<template>
  <div class="pageWrap">
    <div class="header">
      <span style="padding-left: 24px">Vite + ant-design-vue 实现基于nestjs 管理后台</span>
    </div>
    <div class="aside">
      <Menu
        v-model:items="menusRef"
        v-model:selected-keys="activeKey"
        theme="light"
        @click="handleClick"
      />
    </div>
    <div class="content">
      <div style="background-color: #fff">
        <RouterView :key="$route.fullPath" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import { Menu, type ItemType } from 'ant-design-vue'
import { RouteEnum } from '@/router/RouteEnum'
import router from '@/router/index'

const route = useRoute()

const activeKey = ref([])

watch(
  () => route?.path,
  (n) => {
    activeKey.value = [n]
  },
  { immediate: true }
)

const menusRef = ref<ItemType[]>([
  {
    label: '用户',
    key: RouteEnum.user,
    title: '用户',
    disabled: false
  },
  {
    label: '角色',
    key: RouteEnum.role,
    title: '角色',
    disabled: false
  },
  {
    label: '应用',
    key: RouteEnum.application,
    title: '应用',
    disabled: false
  },
  {
    label: '菜单',
    key: RouteEnum.menu,
    title: '菜单',
    disabled: false
  }
])

const handleClick = (o) => {
  router.push(o?.key)
}
</script>

<style scoped lang="less">
.pageWrap {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.header {
  height: 50px;
  line-height: 50px;
  width: 100%;
  background-color: var(--vt-c-indigo);
  span {
    color: #fff;
  }
}
.aside {
  width: 256px;
  height: calc(100% - 50px);
  float: left;
}
.content {
  width: calc(100% - 256px);
  height: calc(100% - 50px);
  box-sizing: border-box;
  padding: 16px;
  float: right;
}
</style>
