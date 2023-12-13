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

## Notes

### 前端

- Angular

### 后端

- fastify
- BullMQ+redis
- [Isolate](https://github.com/ioi/isolate) sandbox
- Flow Queue - BullMQ
- Flow Worker
- 使用 Webpack Bundle

#### Flow Worker

- 创建 sandbox - /var/local/lib/isolate/BOX_ID
- 准备 sandbox - /var/local/lib/isolate/BOX_ID/box
  - 下载文件

```
.
├── BOX_ID
│   ├── box
│   │   ├── activepieces-engine.js
│   │   ├── flows
│   │   │   │── flow_version_id.json
│   │   ├── code
│   │   │   │── code_one_file_id.js
│   │   │   │── code_two_file_id.js
```

- pnpm install
- 调用引擎

```bash
./isolate --box-id=%d --processes --wall-time=500 --run node /var/local/lib/isolate/BOX_ID/box/activepieces-engine.js
```

- `_output.json` 记录结果

### EE
