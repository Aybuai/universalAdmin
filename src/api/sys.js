import request from '@/utils/request'

/**
 * 登录接口
 * return promise
 */

export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 * return promise
 */
export const getUserInfo = () => {
  return request({
    url: '/sys/profile',
    method: 'get'
  })
}
