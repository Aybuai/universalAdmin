import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import installElementPlus from './plugins/element'
// 导入全局样式
import '@/styles/index.scss'
// 导入 SvgIcon
import installIcons from '@/icons'
// 导入路由鉴权
import './permission'
// 全局过滤属性
import installFilters from '@/filters'
// 指令
import installDirectives from '@/directives'
// 导入 element-plus icons
import installIconsVue from '@/icons-vue'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilters(app)
installDirectives(app)
installIconsVue(app)
app.use(store).use(router).use(i18n).mount('#app')
