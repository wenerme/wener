---
title: CubeJS Frontend
---

# CubeJS Frontend

- [React Dashboard Guide](https://react-dashboard.cube.dev/)
  - [demo](https://react-dashboard-demo.cube.dev/)
  - ReactGridLayout
- data blending - 一次性查询多个
- 查询类型
  - regularQuery
  - compareDateRangeQuery
    - timeDimensions 包含 compareDateRange
  - blendingQuery
    - 多个查询
    - 只能是 regularQuery, 不能组合 compareDateRange

```js
const client = cubejs(async () => 'Bearer ' + getAuthToken(), { apiUrl: 'http://localhost:4000/cubejs-api/v1' });
```

```json title="query"
{
  "queryType": "multi", // 比较查询和 blending 查询需要指定
  "query": {}
}
```

- 可以 POST 也可以 GET 传递参数

## date

- date 格式 [packages/cubejs-api-gateway/src/dateParser.js](https://github.com/cube-js/cube/blob/master/packages/cubejs-api-gateway/src/dateParser.js)
  - [chrono-node](http://github.com/wanasit/chrono)
- `from (.*) to (.*)`
  - 使用 chrono 解析

```pegjs
Expression
  = Since _ Unit
  / ("last"/"next") _ Integer _ Unit
  / "today" /"yesterday" / "torrow" / "tomorrow"

Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

Unit= ("day"/"week"/"month"/"year"/"quarter"/"hour"/"minute"/"second")"s"? {return text()}
Since= "this"/"last"/"next"

_ "whitespace"
  = [ \t\n\r]* {return ''}
```
