import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export enum ActEnum {
  新增 = 1,
  编辑
}

export const useUserStore = defineStore('user', () => {
  const optRef = ref<ActEnum>(ActEnum.新增)

  const openFlag = ref(false)

  const nullVo = {
    username: '',
    password: '',
    status: true,
    phone: '',
    nickname: '',
    email: '',
    remark: '',
    id: undefined,
    roleIds: []
  }

  const voRef = ref<API.UpdateUserVo & API.CreateUserVo>(nullVo)

  const setVoRef = (v: API.UpdateUserVo & API.CreateUserVo) => {
    voRef.value = v
  }

  const resetVoRef = () => {
    voRef.value = nullVo
  }

  const setModalAct = (a: ActEnum) => {
    optRef.value = a
  }

  const setModalShow = (v = false) => {
    openFlag.value = v
  }

  return { optRef, openFlag, voRef, setModalShow, setModalAct, setVoRef, resetVoRef }
})
