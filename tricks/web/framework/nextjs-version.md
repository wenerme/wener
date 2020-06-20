# Next 版本

## 9.4
* 快速刷新
  * 基于 [React Refresh](https://github.com/facebook/react/tree/master/packages/react-refresh)
  * 尽量只刷新组件不丢失状态，异常友好显示
  * 之前是可能整个页面刷新，异常不太友好
* 增量静态从新生成 SSG - Beta
* 内建支持 `.env` 和 `NEXT_PUBLIC_` 前缀环境变量
  * 💚 之前都是需要在配置中添加 dotenv
* 内建 fetch 的 polyfill
* 集成 [Vitals](https://web.dev/vitals/) 报告
  * 修改 `_app.js` 进行记录
```js
// Will be called once for every metric that has to be reported.
export function reportWebVitals(metric) {
  // These metrics can be sent to any analytics service
  console.log(metric)
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
```
* 支持绝对路径导入和别名
  * 💚 之前需要配置 `tsconfig-paths-webpack-plugin`
  * 识别 jsconfig.json 和 tsconfig.json 中的配置
* 内建 Sass 支持配置
* 优化日志输出



## 9.3
* [9.3](https://nextjs.org/blog/next-9-3)
* SSG 服务端静态生成 HTML
  * `getStaticProps` -  构建时获取数据 - 静态生成
    * 支持预览模式 - cookie
  * `getStaticPaths` - 获取动态路由
    * 支持 fallback - 构建时不存在是否运行时请求
  * `getServerSideProps` - __每次__ 请求时获取数据 - 服务端渲染
    * `getInitialProps` 只会在服务端请求一次
* 预览模式 - 条件性跳过 SSG
* 内建 Sass 全局样式
* 内建 Sass CSS 模块支持
* 404 静态优化
* 运行时减少 32 kB

## 9.2
* [9.2](https://nextjs.org/blog/next-9-2)
* 内建 CSS 全局样式支持 - 不再需要 `next-css` 依赖
* 内建 CSS 模块支持 `.module.css`
* 增强代码切分策略
* 新增 `[...slug].js` 全部捕获的动态路由

## 9.1
* [9.1](https://nextjs.org/blog/next-9-1)
* 支持 `src/pages` 作为页面目录
* 支持 `public` 作为静态目录而不是 `static`
