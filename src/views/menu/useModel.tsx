import type { ColumnsType } from 'ant-design-vue/es/table'
import { ref, reactive, onMounted } from 'vue'
import { Button, Modal, message, Switch } from 'ant-design-vue'
import { menuTreeApi, menuDellApi, menuDetailApi } from '@/services/menu'

import { storeToRefs } from 'pinia'
import { useMenuStore, ActEnum } from '@/stores/menu'

export default function useModel() {
  const store = useMenuStore()
  // 同时通过插件添加的属性也会被提取为 ref
  // 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
  const { optRef, openFlag, voRef } = storeToRefs(store)

  // 作为 action 可以直接解构
  const { setModalShow, setModalAct, setVoRef, setParentVoRef } = store

  const loading = ref(false)

  const dataSource = ref<API.MenuVo[]>([])

  const fetchData = async () => {
    loading.value = true
    const res = await menuTreeApi()

    loading.value = false

    dataSource.value = res?.data
    return
    // TODO:
  }

  const handleDel = (r: API.MenuVo) => {
    Modal.confirm({
      title: `是否删除 ${r?.menuName}`,
      onOk: async () => {
        const res = await menuDellApi(r?.id)
        if (!res?.success) return
        message.success(res?.message)
        fetchData()
      }
    })
  }

  const getDetail = async (r: API.MenuVo) => {
    setModalAct(ActEnum.编辑)

    // const res = await menuDetailApi(r?.id)
    // if (!res?.success) return

    setVoRef(r)

    setModalShow(true)
  }

  const getAddSub = async (r: API.MenuVo) => {
    setModalAct(ActEnum.新增子节点)

    setParentVoRef(r)

    setModalShow(true)
  }

  const columns: ColumnsType<API.MenuVo> = [
    {
      dataIndex: 'menuName',
      title: '菜单名称'
    },
    {
      dataIndex: 'sortNum',
      title: '序号'
    },
    {
      dataIndex: 'route',
      title: '路由'
    },
    {
      dataIndex: 'component',
      title: '组件'
    },
    {
      dataIndex: 'show',
      title: '是否显示',
      customRender: ({ record }) => (
        <Switch
          checked={record?.show}
          disabled
          checked-children="显示"
          un-checked-children="隐藏"
        />
      )
    },
    {
      dataIndex: 'status',
      title: '状态',
      customRender: ({ record }) => (
        <Switch
          checked={record?.status}
          disabled
          checked-children="正常"
          un-checked-children="停用"
        />
      )
    },
    {
      dataIndex: 'type',
      title: '类型'
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
            onClick={() => getAddSub(record)}
            size="small"
            style={{ marginLeft: 8 }}
          >
            新增
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
