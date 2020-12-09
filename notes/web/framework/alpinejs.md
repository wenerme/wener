---
title: AlpineJS
---

# AlpineJS
* 是什么？
  * 通过在纯 HTML 中添加控制属性来驱动页面的框架
  * 语法类似 Vue 但不需要额外编译、脚本等
  * 相当于增强 HTML 语法
  * 配合 tailwind 在不需要额外 js 的前提下即可实现较为丰富的前端
    * 项目受 tailwind 资助
    * codepen [AlpineJS+TailwindCSS](https://codepen.io/wenerme/pen/MWjemLX)
* [alpinejs/alpine](https://github.com/alpinejs/alpine)
* 注意
  * 位置与 React 等框架相同，因此不易共存 - React 可以通过 dangerouslySetInnerHTML 使用 alpinejs
* 参考
  * [ryangjchandler/spruce](https://github.com/ryangjchandler/spruce) - 全局状态管理

```html
<!-- 引入 -->
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" defer></script>

<!-- 定义数据/状态 -->
<div x-data="{ open: false }">
  <!-- 事件驱动 -->
  <button @click="open = true">Open Dropdown</button>
  <!-- 状态控制 -->
  <ul x-show="open" @click.away="open = false">
    Dropdown Body
  </ul>
</div>
```
