---
title: Tile38
---

- [tidwall/tile38](https://github.com/tidwall/tile38)
  - MIT, Go, GeoSpatial
  - Real-time Geospatial and Geofencing.

## Usage

Start server:

```bash
tile38-server -d ./data
# Port: 9851
```

Geofencing Example:

```bash
# 监听 people 中距离在 5000m 中的任意两个点
NEARBY people FENCE ROAM people * 5000

# 开启另外一个客户端
# 添加 bob
SET people bob POINT 33.01 -115.01
# 添加 alice -> 触发事件
SET people alice POINT 33.02 -115.03
# 添加 wener -> 触发两个事件 (bob, alice)
SET people wener POINT 33.02 -115.02
```

[Website](http://tile38.com/)
