/**
 * 实现原理
 *
 * 1、通过一个变量来 控制 语言环境
 * 2、所有语言环境下的数据源要 预定义 好
 * 3、通过一个方法来获取 当前语言 下 指定属性 的值
 * 4、该值即为国际化下展示的值
 */

import { createI18n } from 'vue-i18n'
// 数据源
const messages = {
  en: {
    msg: {
      test: 'hello world'
    }
  },
  zh: {
    msg: {
      test: '你好世界'
    }
  }
}

// 变量
const locale = 'en'

const i18n = createI18n({
  // 使用 composition API
  legacy: false,
  // 使用全局 t 函数
  globalInjection: true,
  locale,
  messages
})

export default i18n
