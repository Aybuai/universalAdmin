import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']

/**
 * 路由前置守卫
 */

router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    // 1、用户已登录，则不允许进入 login页面
    if (to.path === '/login') next('/')
    next()
  } else {
    // 2、用户未登录，只允许进入 login 页面
    if (!whiteList.includes(to.path)) next('/login')
    next()
  }
})
