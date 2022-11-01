---
title: rudder
---

# rudder

:::caution

- rudder-server 为 Data Plane，通过 配置服务 或 JSON 启动
- 配置服务 [rudderlabs/config-generator](https://github.com/rudderlabs/config-generator)
- 线上版本 不能导出 JSON

:::

- [rudderlabs/rudder-server](https://github.com/rudderlabs/rudder-server)
  - AGPL-3.0, Go, TS, React
  - Segment-alternative
  - 后端 PostgreSQL
  - Customer Data Platform, CDP
- 8082

```bash
docker run --rm -it \
  --name rudder rudderlabs/rudder-server
```

- https://github.com/rudderlabs/rudder-server/blob/master/rudder-docker.yml
- [rudderlabs/rudder-transformer](https://github.com/rudderlabs/rudder-transformer)
  - 将 RudderStack 事件 转换为 目标格式

**Control Plane**

| env                      | for                        |
| ------------------------ | -------------------------- |
| CONFIG_BACKEND_URL       | https://api.rudderlabs.com |
| ~~CONFIG_BACKEND_TOKEN~~ |
| WORKSPACE_TOKEN          |

## 配置

- https://github.com/rudderlabs/rudder-server/blob/master/config/config.yaml
- https://github.com/rudderlabs/rudder-server/blob/master/config/sample.env

## rudderlabs/config-generator

- Control Plane Lite
- https://github.com/rudderlabs/config-generator
- https://raw.githubusercontent.com/rudderlabs/rudder-server/master/rudder-docker.yml
