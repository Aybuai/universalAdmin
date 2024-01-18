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
