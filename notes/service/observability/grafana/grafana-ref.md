---
tags:
  - Reference
---

# Grafana Reference

| Macro                 | Description                                |
| --------------------- | ------------------------------------------ |
| `${__org.id}`         | grafana org id where the request came from |
| `${__plugin.id}`      | the plugin id                              |
| `${__plugin.version}` | the plugin version                         |
| `${__ds.uid}`         | the datasource uid                         |
| `${__ds.name}`        | the datasource name                        |
| `${__ds.id}`          | the datasource id (deprecated)             |
| `${__user.login}`     | the user login id                          |
| `${__user.email}`     | the user login email                       |
| `${__user.name}`      | the user name                              |

```
${__from:date:YYYY-MM}
${__to:date:YYYY-MM}

${__timeFrom}
${__timeTo}
```

## annotations

```sql
SELECT
  created_at,
  action,
  operator,
  id,
  target,
  title ,
  text
FROM audit_logs
WHERE $__timeFilter(created_at)
-- WHERE created_at >= FROM_UNIXTIME($__unixEpochFrom()) AND created_at <= FROM_UNIXTIME($__unixEpochTo())
ORDER BY id DESC
LIMIT 50;
```

- `$__timeFilter(created_at)`
  - -> `created_at BETWEEN '2023-11-28 10:00:00' AND '2023-11-28 11:00:00'`
- Quota 问题
  - multi value 的时候
  - `${var:raw}` 得到原始，然后自己做 quote 处理


## Variable Formatting Options
