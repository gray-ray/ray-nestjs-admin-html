import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export enum ActEnum {
  新增 = 1,
  编辑
}

export const useAppStore = defineStore('app', () => {
  const optRef = ref<ActEnum>(ActEnum.新增)

  const openFlag = ref(false)

  const openFlag1 = ref(false)

  const nullVo = {
    status: true,
    remark: '',
    appName: '',
    id: undefined,
    roleIds: []
  }

  const voRef = ref<API.UpdateAppVo & API.CreateAppVo>(nullVo)

  const setVoRef = (v: API.UpdateAppVo & API.CreateAppVo) => {
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
  const setModal1Show = (v = false) => {
    openFlag1.value = v
  }

  return {
    optRef,
    openFlag,
    voRef,
    openFlag1,
    setModalShow,
    setModalAct,
    setModal1Show,
    setVoRef,
    resetVoRef
  }
})
