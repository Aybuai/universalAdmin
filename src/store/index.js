import { createStore } from 'vuex'
import user from './modules/user'
import app from './modules/app'
import theme from './modules/theme'
import permission from './modules/permission'
import getters from './getters'

export default createStore({
  // state: {},
  // mutations: {},
  // actions: {},
  getters,
  modules: {
    user,
    app,
    theme,
    permission
  }
})
