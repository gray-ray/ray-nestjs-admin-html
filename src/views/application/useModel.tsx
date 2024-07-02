import type { ColumnsType } from 'ant-design-vue/es/table'
import { ref, reactive, onMounted } from 'vue'
import { Button, Modal, message } from 'ant-design-vue'
import { pageAppApi, appDetailApi, appDellApi } from '@/services/application'

import { storeToRefs } from 'pinia'
import { useAppStore, ActEnum } from '@/stores/application'

export default function useModel() {
  const store = useAppStore()
  // 同时通过插件添加的属性也会被提取为 ref
  // 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
  const { optRef, openFlag, voRef, openFlag1 } = storeToRefs(store)

  // 作为 action 可以直接解构
  const { setModalShow, setModalAct, setVoRef, setModal1Show } = store

  const loading = ref(false)

  const dataSource = ref<API.AppVo[]>([])

  const queryState = reactive({
    pageSize: 10,
    pageNum: 1
  })

  const fetchData = async () => {
    loading.value = true
    const res = await pageAppApi(queryState)

    loading.value = false

    dataSource.value = res?.data?.list
    return
    // TODO:
  }

  const handleDel = (r: API.AppVo) => {
    Modal.confirm({
      title: `是否删除 ${r?.appName}`,
      onOk: async () => {
        const res = await appDellApi(r?.id)
        if (!res?.success) return
        message.success(res?.message)
        fetchData()
      }
    })
  }

  const getDetail = async (r: API.AppVo) => {
    setModalAct(ActEnum.编辑)

    const res = await appDetailApi(r?.id)
    if (!res?.success) return

    setVoRef(res?.data)

    setModalShow(true)
  }

  const getMenusTree = (r) => {
    setModal1Show(true)

    setVoRef(r)
  }

  const columns: ColumnsType<API.AppVo> = [
    {
      dataIndex: 'appName',
      title: '应用名称'
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
          <Button
            type="link"
            size="small"
            style={{ marginLeft: 8 }}
            onClick={() => getMenusTree(record)}
          >
            菜单
          </Button>
        </span>
      )
    }
  ]

  const columnsMenu: ColumnsType<API.AppVo> = [
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
      title: '是否显示'
    },
    {
      dataIndex: 'type',
      title: '类型'
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
    columnsMenu,
    ActEnum,

    optRef,
    openFlag,
    voRef,
    setModalShow,
    setModalAct,
    setVoRef
  }
}
