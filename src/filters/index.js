import dayjs from 'dayjs'
import rt from 'dayjs/plugin/relativeTime'
// 语言包，dayjs 默认为 en，不支持 zh-cn，需要手动导入
import 'dayjs/locale/zh-cn'
import store from '@/store'

export const dateFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}

// 相对时间
dayjs.extend(rt)
const relativeTime = (val) => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs()
    .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(val))
}

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}
