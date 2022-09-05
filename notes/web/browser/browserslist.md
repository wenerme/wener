---
title: browserslist
---

# browserslist

- [browserslist/browserslist](https://github.com/browserslist/browserslist)
- .browserslistrc - ini 格式
  - 默认 or 关系
- 支持环境配置 BROWSERSLIST_ENV, NODE_ENV
- https://browserslist.dev/
  - 查看覆盖率，测试查询
- https://browsersl.ist/

```bash
# 查看匹配
npx browserslist defaults
npx browserslist "last 1 version, >1%"
```

```json title="package.json"
{
  "browserslist": [
    // > 0.5%, last 2 versions, Firefox ESR, not dead
    "defaults",
    // 可以继承
    "extends browserslist-config-mycompany"
  ]
}
```

```js title="browserslist-config-mycompany/index.js"
module.exports = [
  'last 1 version',
  '> 1%',
  'ie 10'
]
```
