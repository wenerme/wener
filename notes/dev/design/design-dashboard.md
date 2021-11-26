---
title: Design Dashboard
---

# Design Dashboard

- Grafana [Dashboard JSON model](https://grafana.com/docs/grafana/latest/dashboards/json-model/)
- [react-grid-layout/react-grid-layout](https://github.com/react-grid-layout/react-grid-layout)
  - Layout 模型

```json title="react-grid layout"
{
  "i": "",
  "x": 0,
  "y": 0,
  "w": 0,
  "h": 0,
  "minW": null,
  "maxW": null,
  "minH": null,
  "maxH": null,
  "static": false, // true = isDraggable=false && isResizable=false
  "isDraggable": true,
  "isResizable": true,
  "resizeHandles": [], // 控制 resize 的位置
  "isBounded": false // 是否允许超出 grid 范围
}
```

```json title="react-grid 响应式"
{
  "lg": [],
  "md": [],
  "sm": []
}
```

## grafana

- columns=24
- height=30
- [packages/grafana-schema/src/scuemata/dashboard/dashboard.cue](https://github.com/grafana/grafana/blob/main/packages/grafana-schema/src/scuemata/dashboard/dashboard.cue)
- Panel
  - RowPanel
  - GraphPanel - legacy graph panels

```json title="dashboard.json"
{
  "id": null,
  "uid": "cLV5GDCkz",
  "title": "New dashboard",
  "tags": [],
  "style": "dark",
  "timezone": "browser",
  "editable": true,
  "hideControls": false,
  "graphTooltip": 1,
  "panels": [],
  "time": {
    "from": "now-6h",
    "to": "now"
  },
  "timepicker": {
    "time_options": [],
    "refresh_intervals": []
  },
  "templating": {
    "enable": true,
    "list": []
  },
  "annotations": {
    "list": []
  },
  "refresh": "5s",
  "schemaVersion": 17,
  "version": 0,
  "links": []
}
```

```json title="panel.json"
{
  "id": 4,
  "type": "text", // plugin type id
  "title": "Panel Title",
  "description": "",
  "transparent": false,
  "datasource": "",
  "mode": "markdown",
  "content": "# title",
  "gridPos": {
    "x": 0,
    "y": 0,
    "w": 12,
    "h": 9,
    "static": false
  }
}
```
