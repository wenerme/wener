---
title: luckysheet
---

# luckysheet

- [mengshukeji/luckysheet](https://github.com/mengshukeji/luckysheet)
  - MIT, JS+jQuery
  - 2.9MB/606kB
- [mengshukeji/Luckyexcel](https://github.com/mengshukeji/Luckyexcel)
  - xlsx 转 luckysheet
  - 目前 **不支持导出** - [mengshukeji/Luckyexcel#16](https://github.com/mengshukeji/Luckyexcel/issues/16)
    - 可基于 exceljs 自行导出 [参考](https://github.com/oy-paddy/luckysheet-vue-importAndExport/blob/master/src/components/export.js)
- [ruilisi/fortune-sheet](https://github.com/ruilisi/fortune-sheet)
  - rewrite in ts
  - 移除 jQuery，依赖 React/Vue + immer
  - formula fork [handsontable/formula-parser](https://github.com/handsontable/formula-parser)
    - @formulajs/formula-parser
  - @fortune-sheet/core
    - 1.6MB/375kB - @formulajs/formulajs, lodash, jstat
  - @fortune-sheet/react


:::caution

- 目前依赖很复杂 - [gulpfile.js](https://github.com/mengshukeji/Luckysheet/blob/ee5ac0313cdc6920109beb487c56c081dec5a7f1/gulpfile.js#L95-L109)
  - bundle 的 plugin.js 包含了 jquery+jqeruy-plugins+其他工具库
- 最好通过 iframe 使用 - 嵌入到页面会污染当前环境
- npm install 的无法直接 import plugin.js [#539](https://github.com/mengshukeji/Luckysheet/issues/539#issuecomment-789434753)
  - 目前只能通过引入 cdn 方便解决

:::

:::info

- TS 重写 [mengshukeji/Luckysheet#799](https://github.com/mengshukeji/Luckysheet/issues/799)
- 目前只支持单个实例 - 因为有全局状态

:::


```ts
const options = {
  allowEdit: false, // 只读
}
```
