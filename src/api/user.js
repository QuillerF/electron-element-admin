import request from '@/utils/request'
// import hashjs from 'hash.js'
// const setSha256 = type => {
//   return hashjs
//     .sha256()
//     .update(type.trim())
//     .digest('hex')
// }
export function login(data) {
  // data.password = setSha256(data.password)
  // return request({
  //   url: 'user/login',
  //   method: 'post',
  //   data
  // })
  return Promise.resolve({
    nickname: '小熊',
    roleId: 'super-admin'
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'logout',
    method: 'post'
  })
}
