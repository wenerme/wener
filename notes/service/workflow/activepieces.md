---
title: activepieces
---

# activepieces

- [activepieces/activepieces](https://github.com/activepieces/activepieces)
  - MIT, Typescript
  - no-code workflow builder
  - 存储: Postgres, SQLite3, Redis
  - 替代 n8n
  - 使用 [isolate](../../os/linux/sys/isolate.md) 做安全隔离
  - nx 项目结构
  - 前端 angular

```bash
docker run --rm -it \
  -p 8080:80 -v $PWD/data:/root/.activepieces \
  -e AP_TELEMETRY_ENABLED=false \
  -e AP_QUEUE_MODE=MEMORY \
  -e AP_DB_TYPE=SQLITE3 \
  -e AP_FRONTEND_URL="http://localhost:8080" \
  --name=activepieces activepieces/activepieces:latest
```


## Configuration

- https://www.activepieces.com/docs/install/configurations/environment-variables
