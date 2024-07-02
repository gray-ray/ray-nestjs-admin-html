import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export enum ActEnum {
  新增 = 1,
  编辑,
  新增子节点,
  编辑子节点
}

export const useMenuStore = defineStore('menu', () => {
  const optRef = ref<ActEnum>(ActEnum.新增)

  const openFlag = ref(false)

  const openFlag1 = ref(false)

  const nullVo = {
    status: true,
    show: true,
    remark: '',
    menuName: '',
    component: '',
    route: '',
    sortNum: 0,
    id: undefined,
    roleIds: []
  }

  const voRef = ref<API.UpdateMenuVo & API.CreateMenuVo>(nullVo)

  const parentVoRef = ref<API.UpdateMenuVo & API.CreateMenuVo>(nullVo)

  const setVoRef = (v: API.UpdateMenuVo & API.CreateMenuVo) => {
    voRef.value = v
  }

  const resetVoRef = () => {
    voRef.value = nullVo
  }

  const setParentVoRef = (v: API.UpdateMenuVo & API.CreateMenuVo) => {
    parentVoRef.value = v
  }

  const resetParentVoRef = () => {
    parentVoRef.value = nullVo
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
    resetVoRef,
    parentVoRef,
    setParentVoRef,
    resetParentVoRef
  }
})
