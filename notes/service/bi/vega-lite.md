---
title: veta lite
---

# veta lite

- [vega/vega-lite](https://github.com/vega/vega-lite)
  - 会编译为 Vega

```json
{
  "data": { "url": "data/seattle-weather.csv" },
  "mark": "bar",
  "encoding": {
    "x": { "timeUnit": "month", "field": "date", "type": "ordinal" },
    "y": { "aggregate": "mean", "field": "precipitation" }
  }
}
```

## spec

- [spec](https://vega.github.io/vega-lite/docs/spec.html)
  - single view
  - 组合: layer, facet, concat, repeat

```json
{
  // top-level
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "background": "white",
  "padding": 5,
  "autosize": "pad", // fit, none
  "config": {},
  "usermeta": {},

  // common
  "title": "",
  "name": "",
  "description": "",
  "data": {},
  "transform": [],
  "params": [],

  // view composition - layer, facet, concat, repeat
  "resolve": {},
  // layout composition - facet, concat, repeat
  "align": "all",
  "bounds": "full",
  "center": false,
  "spacing": 20,

  // single view
  "mark": "", // bar, circle, square, tick, line, area, point, rule, geoshape, text
  "encoding": {},
  "width": 0,
  "height": 0,
  "view": null,
  "projection": ""
}
```

### data

```json title="inline"
{
  "values": "a\n1\n2\n3\n4",
  "format": {
    "type": "csv"
  }
}
```

```json title="url"
{ "url": "data/cars.json" }
```

```json title="named"
{
  // top-level
  "datasets": {
    "somedata": [1, 2, 3]
  },
  "data": {
    "name": "somedata"
  }
}
```

**format**

```json
{
  "format": "json", // json, csv, tsv, dsv, topojson
  "parse": {
    // number, date, boolean
    "created_at": "date" // 将 created_at 解析为 date
  }
}
```

- "date:'%m%d%Y'" - 支持 [d3 time-format](https://github.com/d3/d3-time-format#locale_format)
- "utc:'%m%d%Y'" - UTC 时间

**generate**

```json
{
  "sequence": {
    "start": 0,
    "stop": 12.7,
    "step": 0.1,
    "as": "x"
  },
  "graticule": {
    "step": [15, 15]
  }
}
```

## transform

- density
  - 转换为密度 - density, value
  - 统计占比

# FAQ

## 移除边框

```json
{
  "config": {
    "style": {
      "cell": {
        "stroke": "transparent"
      }
    }
  }
}
```

```json
{
  "config": {
    "view": {
      "stroke": "transparent"
    }
  }
}
```
