import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => ({
    // 从 localStorage 中取token，以便自动登录
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      // 存储持久层
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    /**
     * 登录请求动作
     * @param {*} context
     * @param {*} userInfo
     * @returns
     */
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((data) => {
            this.commit('user/setToken', data.token)
            // 跳转
            router.push('/')
            // 保存登录时间
            setTimeStamp()
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    /**
     * 获取用户信息
     */
    async getUserInfo() {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },
    /**
     * 退出登录
     *
     * 分为两种情况：用户主动退出； 用户被动退出
     *
     * 用户被动退出 的场景主要有两个：
     * 1、token 失效
     * 2、单点登录：其他人登录该账号被 “顶下来”
     *
     * 这两种场景下，前端对应的处理方案一共也分为两种，共分为 主动处理 、被动处理 两种 ：
     * 1、主动处理：主要应对 token 失效
     * 2、被动处理：同时应对 token 失效 与 单点登录
     */
    logout() {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      // TODO: 清理权限相关配置
      router.push('/login')
    }
  }
}
