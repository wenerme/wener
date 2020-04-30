# Next 版本

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
