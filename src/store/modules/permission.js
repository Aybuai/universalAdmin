import { publicRoutes, privateRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    // 路由表：初始拥有静态路由权限
    routes: publicRoutes
  },
  mutations: {
    /**
     * 增加路由
     */
    setRoutes(state, newRoutes) {
      // 永远在静态路由的基础上增加新路由
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    /**
     * 根据权限数据筛选路由
     * @param {*} context 当前模块 store 实例
     * @param {*} menus 权限数据
     */
    filterRoutes(context, menus) {
      const routes = []

      // 路由权限匹配
      menus.forEach((key) => {
        // 权限名 与 路由的 name 匹配
        routes.push(...privateRoutes.filter((item) => item.name === key))
      })

      // 最后添加 不匹配路由进入 404
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      context.commit('setRoutes', routes)

      return routes
    }
  }
}
