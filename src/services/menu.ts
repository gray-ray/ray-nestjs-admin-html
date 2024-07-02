import request from './http'

// 创建
export async function createMenuApi(data: API.CreateMenuVo) {
  return request<API.Res_Vo<any>>('menu/create', {
    method: 'POST',
    data,
    throttleUrl: 'menu/create'
  })
}

// 更新
export async function updateMenuApi(data: API.UpdateMenuVo) {
  return request<API.Res_Vo<any>>('menu/update', {
    method: 'POST',
    data,
    throttleUrl: 'menu/update'
  })
}

// 详情
export async function menuDetailApi(id: number | string) {
  return request<API.Res_Vo<any>>(`menu/detail/${id}`, {
    method: 'GET'
  })
}

// 删除
export async function menuDellApi(id: number | string) {
  return request<API.Res_Vo<any>>(`menu/delete/${id}`, {})
}

// trees
export async function menuTreeApi() {
  return request<API.Res_Vo<API.MenuVo[]>>('menu/trees', {
    method: 'POST'
  })
}
