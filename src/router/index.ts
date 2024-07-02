import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

import { RouteEnum } from './RouteEnum'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: RouteEnum.home,
      name: 'home',
      component: MainLayout,
      children: [
        { path: RouteEnum.home, redirect: RouteEnum.user },
        { path: RouteEnum.user, component: () => import('@/views/user/index.vue') },
        { path: RouteEnum.role, component: () => import('@/views/role/index.vue') },
        { path: RouteEnum.menu, component: () => import('@/views/menu/index.vue') },
        { path: RouteEnum.application, component: () => import('@/views/application/index.vue') }
      ]
    },
    {
      path: RouteEnum.login,
      name: 'login',
      component: AuthLayout,
      children: [{ path: '', component: () => import('@/views/login.vue') }]
    }
  ]
})

export default router
