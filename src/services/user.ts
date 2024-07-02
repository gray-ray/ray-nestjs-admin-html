import request from './http'

// 登录
export async function loginApi(data: API.LoginVo) {
  return request<{ access_token: string }>('auth/login', {
    method: 'POST',
    data,
    throttleUrl: 'auth/login'
  })
}

// 用户创建
export async function createUserApi(data: API.CreateUserVo) {
  return request<API.Res_Vo<any>>('user/create', {
    method: 'POST',
    data,
    throttleUrl: 'user/create'
  })
}

// 用户更新
export async function updateUserApi(data: API.UpdateUserVo) {
  return request<API.Res_Vo<any>>('user/update', {
    method: 'POST',
    data,
    throttleUrl: 'user/update'
  })
}

// 用户详情
export async function userDetailApi(id: number) {
  return request<API.Res_Vo<any>>(`user/detail/${id}`, {
    method: 'GET'
  })
}

// 用户删除
export async function userDellApi(id: number) {
  return request<API.Res_Vo<any>>(`user/delete/${id}`, {
    method: 'GET'
  })
}

// 用户分页
export async function pageUserApi(data: API.Query_Vo<Partial<API.UserVo>>) {
  return request<API.Res_Vo<API.Page_Vo<API.UserVo>>>('user/list', {
    method: 'POST',
    data
  })
}
