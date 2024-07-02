import type { ColumnsType } from 'ant-design-vue/es/table'
import { ref, reactive, onMounted } from 'vue'
import { Button, Modal, message } from 'ant-design-vue'
import { pageRoleApi, roleDellApi, roleDetailApi } from '@/services/role'

import { storeToRefs } from 'pinia'
import { useRoleStore, ActEnum } from '@/stores/role'

export default function useModel() {
  const store = useRoleStore()
  // 同时通过插件添加的属性也会被提取为 ref
  // 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
  const { optRef, openFlag, voRef } = storeToRefs(store)

  // 作为 action 可以直接解构
  const { setModalShow, setModalAct, setVoRef } = store

  const loading = ref(false)

  const dataSource = ref<API.RoleVo[]>([])

  const queryState = reactive({
    pageSize: 10,
    pageNum: 1
  })

  const fetchData = async () => {
    loading.value = true
    const res = await pageRoleApi(queryState)

    loading.value = false

    dataSource.value = res?.data?.list
    return
    // TODO:
  }

  const handleDel = (r: API.RoleVo) => {
    Modal.confirm({
      title: `是否删除 ${r?.roleName}`,
      onOk: async () => {
        const res = await roleDellApi(r?.id)
        if (!res?.success) return
        message.success(res?.message)
        fetchData()
      }
    })
  }

  const getDetail = async (r: API.RoleVo) => {
    setModalAct(ActEnum.编辑)

    const res = await roleDetailApi(r?.id)
    if (!res?.success) return

    setVoRef(res?.data)

    setModalShow(true)
  }

  const columns: ColumnsType<API.RoleVo> = [
    {
      dataIndex: 'roleName',
      title: '角色名'
    },
    {
      dataIndex: 'code',
      title: 'code'
    },
    {
      dataIndex: 'status',
      title: '状态',
      customRender: (r) => (r?.text ? '正常' : '停用')
    },
    {
      dataIndex: 'createTime',
      title: '创建时间'
    },
    {
      dataIndex: 'remark',
      title: '备注'
    },
    {
      dataIndex: 'id',
      title: '操作',
      customRender: ({ record }) => (
        <span>
          <Button
            type="link"
            onClick={() => getDetail(record)}
            size="small"
            style={{ marginLeft: 8 }}
          >
            编辑
          </Button>
          <Button
            type="link"
            size="small"
            style={{ marginLeft: 8 }}
            onClick={() => handleDel(record)}
          >
            删除
          </Button>
        </span>
      )
    }
  ]

  onMounted(() => {
    fetchData()
  })

  return {
    columns,
    dataSource,
    loading,
    fetchData,

    ActEnum,

    optRef,
    openFlag,
    voRef,
    setModalShow,
    setModalAct,
    setVoRef
  }
}
