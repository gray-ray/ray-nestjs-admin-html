import request from './http'

// 应用创建
export async function createAppApi(data: API.CreateAppVo) {
  return request<API.Res_Vo<any>>('application/create', {
    method: 'POST',
    data,
    throttleUrl: 'application/create'
  })
}

// 应用更新
export async function updateAppApi(data: API.UpdateAppVo) {
  return request<API.Res_Vo<any>>('application/update', {
    method: 'POST',
    data,
    throttleUrl: 'application/update'
  })
}

// 应用详情
export async function appDetailApi(id: number) {
  return request<API.Res_Vo<any>>(`application/detail/${id}`, {
    method: 'GET'
  })
}

// 应用删除
export async function appDellApi(id: number) {
  return request<API.Res_Vo<any>>(`application/delete/${id}`, {
    method: 'GET'
  })
}

// 应用分页
export async function pageAppApi(data: API.Query_Vo<Partial<API.AppVo>>) {
  return request<API.Res_Vo<API.Page_Vo<API.AppVo>>>('application/list', {
    method: 'POST',
    data
  })
}

// 应用下菜单

export async function appMenuApi(id: number) {
  return request<API.Res_Vo<API.MenuVo[]>>(`application/menus/${id}`, {
    method: 'GET'
  })
}

// 所有应用
export async function appAllApi() {
  return request<API.Res_Vo<API.AppVo[]>>(`application/all`, {
    method: 'GET'
  })
}
