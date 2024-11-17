const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // webpack devServer 提供了代理的功能，该代理可以把请求到当前服务中的请求，转发（代理）到另一个服务器上
  devServer: {
    proxy: {
      // 地址中包含 /api，触发此代理
      '/api': {
        target: 'https://api.imooc-admin.lgdsunday.club/',
        // 当前请求是否是跨域请求
        changeOrigin: true
      }
    },
    // 报错解决参考： https://blog.csdn.net/weixin_68443051/article/details/140343081
    client: {
      overlay: false
    }
  },
  // path-browserify 是一个 npm 的库，提供了 path 相似的方法
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve('path-browserify')
      }
    }
  },
  transpileDependencies: true,
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    // config 为 webpack 配置对象
    // config.module 表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule('svg')
      // 忽略
      .exclude.add(resolve('src/icons'))
      // 结束
      .end()
    config.module
      // 规则
      .rule('icons')
      // 正则，解析以 .svg 结尾的文件
      .test(/\.svg$/)
      // 解析的文件
      .include.add(resolve('src/icons'))
      // 结束
      .end()
      // 新增了一个解析的loader
      .use('svg-sprite-loader')
      // 具体的loader
      .loader('svg-sprite-loader')
      // loader 的配置
      .options({
        symbolId: 'icon-[name]'
      })
      // 结束
      .end()
  }
})

// 文章地址： https://juejin.cn/post/7093019506066980877?from=search-suggest
/**
 * 注意Dependencies需要引入
 * "sass": "^1.32.7",
 *"sass-loader": "^12.0.0",
 *"sass-resources-loader": "^2.2.5"
 * 全局变量的Sass引方法，值得收藏
 * @param config  chainWebpack(config) 中来的一个配置
 */
// const globalSass = (config) => {
//   const oneOfsMap = config.module.rule('scss').oneOfs.store
//   oneOfsMap.forEach((item) => {
//     item
//       .use('sass-resources-loader')
//       .loader('sass-resources-loader')
//       .options({
//         // 相对路径
//         resources: [
//           './src/styles/mixin.scss',
//           './src/styles/sidebar.scss',
//           './src/styles/variables.scss'
//         ]
//       })
//       .end()
//   })
// }
