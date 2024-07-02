declare namespace API {
  // common
  type Res_Vo<T> = {
    status: number
    data: T
    success: boolean
    message: string
  }

  type Query_Vo<T> = {
    pageSize: number
    pageNum: number
  } & T

  type Page_Vo<T> = {
    list: T[]
    total: number
  }

  type LoginVo = {
    username: string
    password: string
  }
  // 用户
  type UserVo = {
    id: number | undefined
    username: string
    nickname?: string
    status?: boolean
    createTime?: string
    updateTime?: string
    email?: string
    phone?: string
    remark?: string
    password?: string
    roleIds?: number[]
  }

  type UpdateUserVo = Omit<API.UserVo, 'password'>

  type CreateUserVo = Omit<API.UserVo, 'id'>

  // 角色

  type RoleVo = {
    id: number
    roleName: string
    code?: string
    status?: boolean
    createTime?: string
    updateTime?: string
    remark?: string
    appIds: number[]
  }

  type UpdateRoleVo = API.RoleVo

  type CreateRoleVo = Omit<API.RoleVo, 'id'>

  // 菜单

  type MenuVo = {
    id: number
    menuName: string
    parentId: number
    component: string
    type: string
    sortNum: number
    route: string
    status: string
    show: boolean
    appId: number
    children: MenuVo[]
  }

  type UpdateMenuVo = Omit<API.MenuVo, 'children'>

  type CreateMenuVo = Omit<API.MenuVo, 'children' | 'id'>

  // 应用

  type AppVo = {
    id: number
    appName: string
    status: string
    remark?: string
    roleIds: number[]
  }

  type UpdateAppVo = API.AppVo

  type CreateAppVo = Omit<API.AppVo, 'id'>
}
