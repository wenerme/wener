# UI


## Guideline
蚂蚁金服
https://ant.design/
饿了么
http://element.eleme.io
Material Design
https://material.io
微软的 Fluent 设计
https://fluent.microsoft.com/
https://developer.microsoft.com/zh-cn/windows/apps/design
苹果设计规范
https://developer.apple.com/design/
Clarity Design System
http://clarity.design/
星巴克设计规范
https://www.starbucks.com/static/reference/styleguide/

Airbnb
https://github.com/airbnb/Lona

https://github.com/gztchan/awesome-design

类 MD 管理后台界面
https://gurayyarar.github.io/AdminBSBMaterialDesign
http://demos.creative-tim.com/material-dashboard/examples/dashboard.html
https://wrappixel.com/demos/free-admin-templates/material-pro-lite/lite/index.html

## 配色
* https://material.google.com/style/color.html
  * Material Design 中色板
* https://color.adobe.com/

## 尺寸
* http://mydevice.io/devices/
* https://material.io/devices/
* http://screensiz.es/

## 字体图标
* https://iconmonstr.com/
* https://www.iconfinder.com/

## 如何选取前端框架
* 场景
  * 中后端
    * 组件多
    * 功能丰富
    * 功能性为主
    * 能接受较大的 Bundle
    * 逻辑为主
  * 前端
    * 支持一定样式控制
    * 轻量
    * 主题定制化
    * 容易修改样式
    * 偏 CSS
  * 文章内容
    * 可能不需要框架 - jQuery+CSS 或 React+CSS
    * 支持 SSR
    * 弱化组件
    * 样式为主
    * 集成某种 CSS in JSS 支持 - emotion、styled、jsx
    * 轻量
    * 可能是对 CSS 的封装 - 例如 twindcss
* 完整性
  * 自定义堆叠组件 - 框架提供 Building Block
  * All in One - 功能完整组件
  * 功能性组件 - 完整的单一功能
* 语言平台
  * 相同语言开发 - 最好的集成
  * 首要语言支持 - 能得到较好的文档和帮助
  * 扩展语言移植 - 支持较弱，能用
* 风格选择 - 清爽、圆角、留白
* 设计选择
  * 一般一个大型的前端框架都有自己的设计规范
  * 一般设计规范配套相关标准 - sketch、psd 等
  * 常见设计 - material、bootstrap、antd
* 配套图标
* B 端
* C 端

## 前端框架
* React
  * antd
  * [material-ui](https://material-ui.com/)
  * [react-bootstrap](https://react-bootstrap.github.io/)
  * [blueprint](https://blueprintjs.com/)
  * semantic-ui [react]9https://react.semantic-ui.com/
  * [rebassjs](https://rebassjs.org/)
  * [chakra-ui](https://chakra-ui.com/)
  * [evergreen](https://evergreen.segment.com/)
  * [grommet](https://v2.grommet.io/)
## 功能性组件
* React
  * [tannerlinsley/react-table](https://github.com/tannerlinsley/react-table)
    * 5kb - 14kb+
    * Headless - 无 UI
    * 排序、过滤、
    * 行选择、行展开
    * 列排序、透视、聚合
    * 动画
    * 虚拟滚动、大小调整
    * SSR
    * 基于 Hook
  * [tannerlinsley/react-query](https://github.com/tannerlinsley/react-query)
    * 6.3kb
    * 用于数据获取、缓存、更新的 Hook
    * Transport/protocol/backend agnostic data fetching (REST, GraphQL, promises, whatever!)
    * Auto Caching + Refetching (stale-while-revalidate, Window Refocus, Polling/Realtime)
    * Parallel + Dependent Queries
    * Mutations + Reactive Query Refetching
    * Multi-layer Cache + Automatic Garbage Collection
    * Paginated + Cursor-based Queries
    * Load-More + Infinite Scroll Queries w/ Scroll Recovery
    * Request Cancellation
    * React Suspense + Fetch-As-You-Render Query Prefetching
    * Dedicated Devtools (React Query Devtools)

```bash
yarn add react-query
```

```ts
// 查询
const { status, data, error, isFetching } = useQuery("posts", async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return data;
});

// 访问缓存
const post = queryCache.getQueryData(["post", post.id])
  ? {
      fontWeight: "bold",
      color: "green"
    }
  : {}

```
