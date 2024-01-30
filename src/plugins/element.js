import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// element-plus 国际化处理
// 目前 element-plus 尚未提供配合 vue-i18n 实现国际化的方式
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import store from '@/store'

export default (app) => {
  app.use(ElementPlus, {
    locale: store.getters.language === 'en' ? en : zhCn
  })
}
