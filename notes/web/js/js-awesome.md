---
title: JavaScript Awesome
---

# JavaScript Awesome

## Tricks
* [Virtual Machine Detection In The Browser](https://bannedit.github.io/Virtual-Machine-Detection-In-The-Browser.html)

```js
var canvas = document.createElement('canvas');
var gl = canvas.getContext('webgl');

var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
var vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
var renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

console.log(vendor);
console.log(renderer);
```

* [enkimute/ganja.js](https://github.com/enkimute/ganja.js) - 几何代数

## UI
* react like
  * preact
  * [ryansolid/solid](https://github.com/ryansolid/solid)
    * 快、小、类 React
    * jsx 直接预先生成 dom 模板，属性变化动态插入到 dom 里 - 没有 react 的 vdom 比较合并
* tiny
  * [jorgebucaran/hyperapp](https://github.com/jorgebucaran/hyperapp)
