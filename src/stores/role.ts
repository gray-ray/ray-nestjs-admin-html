import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export enum ActEnum {
  新增 = 1,
  编辑
}

export const useRoleStore = defineStore('role', () => {
  const optRef = ref<ActEnum>(ActEnum.新增)

  const openFlag = ref(false)

  const nullVo = {
    roleName: '',
    code: '',
    status: true,
    remark: '',
    id: undefined,
    appIds: []
  }

  const voRef = ref<API.UpdateRoleVo & API.CreateRoleVo>(nullVo)

  const setVoRef = (v: API.UpdateRoleVo & API.CreateRoleVo) => {
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
