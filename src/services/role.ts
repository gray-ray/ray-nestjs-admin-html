import request from './http'

// 创建
export async function createRoleApi(data: API.CreateRoleVo) {
  return request<API.Res_Vo<any>>('role/create', {
    method: 'POST',
    data,
    throttleUrl: 'role/create'
  })
}

// 更新
export async function updateRoleApi(data: API.UpdateRoleVo) {
  return request<API.Res_Vo<any>>('role/update', {
    method: 'POST',
    data,
    throttleUrl: 'role/update'
  })
}

// 详情
export async function roleDetailApi(id: number | string) {
  return request<API.Res_Vo<any>>(`role/detail/${id}`, {
    method: 'GET'
  })
}

// 删除
export async function roleDellApi(id: number | string) {
  return request<API.Res_Vo<any>>(`role/delete/${id}`, { method: 'GET' })
}

// 分页
export async function pageRoleApi(data: API.Query_Vo<Partial<API.RoleVo>>) {
  return request<API.Res_Vo<API.Page_Vo<API.RoleVo>>>('role/list', {
    method: 'POST',
    data
  })
}

// all
export async function roleAllApi() {
  return request<API.Res_Vo<API.RoleVo[]>>('role/all', {
    method: 'POST'
  })
}
