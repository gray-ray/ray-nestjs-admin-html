import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

/**
 * 组合方式
 * ref() 就是 state 属性
 * computed() 就是 getters
 * function() 就是 actions
 */

export const useSystem = defineStore('system', () => {
  // 侧边栏收缩、用户信息、主题色、菜单信息

  return {}
})
