---
title: Keep
---

# Keep

- [keephq/keep](https://github.com/keephq/keep)
  - MIT+EE, Python, Typescript
  - FastAPI, SQLite, PostgreSQL, Redis, Elasticsearch, Pusher, Socket.IO
  - React, NextJS, React Chrono, Chart.js, Recharts, TailwindCSS
  - AIOps 和告警管理平台
- 服务
  - keep-frontend
  - keep-backend
  - keep-websocket-server

```yaml
workflow:
  id: example-workflow
  name: Example Workflow
  description: Example workflow description
  # Manual, Alert, Interval, Incident
  # filter: CEL, Legacy filter
  triggers:
    # 触发器定义

  # query
  steps:
    # 查询步骤定义
  # notify
  # 执行动作定义
  actions:
    - name: notify-slack
      if: "{{ alert.severity }} == 'critical' and {{ steps.get-data.results.value }} > 90"
      provider:
        type: slack
        config: '{{ providers.slack }}'
        with:
          message: 'Critical alert!'
  # 常量定义
  consts:
  vars:
```

**DSL**

- celpy
- 数学函数: add(), sub(), mul(), div(), mod(), exp()
- 字符串函数: uppercase(), lowercase(), split(), replace(), slice()
- 时间函数: datetime_compare(), is_business_hours(), timestamp_delta()
- 工具函数: get_firing_time(), is_first_time(), dictget()
