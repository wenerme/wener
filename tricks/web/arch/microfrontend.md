# 微前端
## Tips
* 目的 - 并不是要达到所有 - 需要权衡
  * 垂直切分前端
  * 技术无关 - 可混合多种框架
  * 团队切分 - 独立
  * 外部依赖共享 - React - Import Map
  * 独立部署 - 能部署某个组件或页面
* 附加
  * SSR 支持
* 微前端划分点
  * 路由
  * 页面布局
  * 模块
* 常见技术
  * iframe
  * webpack federation [#10352](https://github.com/webpack/webpack/issues/10352)
  * bundle 外部依赖
    * webpack [external](https://webpack.js.org/configuration/externals/#root)
    * rollup [external](https://rollupjs.org/guide/en/#external)
  * import map - [Import maps](https://developers.google.com/web/updates/2019/03/kv-storage#import_maps)
  * [systemjs/systemjs](https://github.com/systemjs/systemjs)
  * NextJS [multi-zone](https://nextjs.org/docs/advanced-features/multi-zones) - url 切分
* 反应 microservice 概念 - isolation
* 参考
  * single-spa [Recommended Setup](https://single-spa.js.org/docs/recommended-setup/)
* 问题
  * [single-spa/single-spa#103](https://github.com/single-spa/single-spa/issues/103) - RFC: Server Rendering
  * [vercel/next.js#6040](https://github.com/vercel/next.js/issues/6040) - Feasibility of micro frontends
  * [webpack/webpack#10352](https://github.com/webpack/webpack/issues/10352) - Module federation and code sharing between bundles. Many builds act as one


```html
<!-- The import map is inlined into your page -->
<script type="importmap">
{
  "imports": {
    "/path/to/kv-storage-polyfill.mjs": [
      "std:kv-storage",
      "/path/to/kv-storage-polyfill.mjs"
    ]
  }
}
</script>

<!-- Then any module scripts with import statements use the above map -->
<script type="module">
  import storage from '/path/to/kv-storage-polyfill.mjs';

  // Use `storage` ...
</script>
```
