import request from '@/utils/request'

/**
 * 超管添加用户
 * @param {*} groupId 参数
 * @param {*} nickname 参数
 * @param {*} phone 参数
 * @param {*} roleId 参数
 * @param {*} username 参数
 */

export function ADMIN_ADD_USER(data) {
  return request({
    url: 'admin/add-user',
    method: 'post',
    data
  })
}

/**
 * 超管获取队信息用于添加队长账号
 */

export function ADMIN_GROUPS() {
  return request({
    url: 'admin/groups',
    method: 'get',
    params: {}
  })
}

/**
 * 超管重置密码
 *
 * @param {*} userId 参数
 */

export function ADMIN_RESET_PWD(userId) {
  return request({
    url: 'admin/reset-pwd',
    method: 'put',
    params: {
      userId
    }
  })
}

/**
 * 超管获取用户角色用于添加管理和队长账号
 *
 */

export function ADMIN_ROLES() {
  return request({
    url: 'admin/roles',
    method: 'get'
  })
}

/**
 * 用户更新自己的密码
 * @param {*} newPassword 参数
 * @param {*} oldPassword 参数
 * @param {*} userId 参数
 */

export function USER_UPDATE_PWD(data) {
  return request({
    url: 'user/update-pwd',
    method: 'put',
    data
  })
}

/**
 * 超管删除一个账号
 * @param {*} userId 参数
 */

export function ADMIN_USER_DELETE(userId) {
  return request({
    url: 'admin/user-delete',
    method: 'delete',
    params: {
      userId
    }
  })
}

/**
 * 超管禁用一个账号
 * @param {*} userId 参数
 */

export function ADMIN_USER_DISABLE(userId) {
  return request({
    url: 'admin/user-disable',
    method: 'put',
    data: {
      userId
    }
  })
}

/**
 * 超管获取用户账号列表
 */

export function ADMIN_USER_LIST() {
  return request({
    url: 'admin/user-list',
    method: 'get'
  })
}

/**
 * 超管开启一个账号
 * @param {*} userId 参数
 */

export function ADMIN_USER_USABLE(userId) {
  return request({
    url: 'admin/user-usable',
    method: 'put',
    data: {
      userId
    }
  })
}

export default {
  ADMIN_ADD_USER,
  ADMIN_GROUPS,
  ADMIN_RESET_PWD,
  ADMIN_ROLES,
  USER_UPDATE_PWD,
  ADMIN_USER_DELETE,
  ADMIN_USER_DISABLE,
  ADMIN_USER_LIST,
  ADMIN_USER_USABLE
}
