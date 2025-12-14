---
tags:
  - Gateway
---

# bifrost

- [maximhq/bifrost](https://github.com/maximhq/bifrost)
  - Apache-2.0, Go, Typescript
- 参考
  - 价格数据 https://getbifrost.ai/datasheet
- 头
  - x-bf-key
    - Virtual Keys
  - x-bf-cache-key

:::caution

- 目前还不支持 alias 别名，请求是 PROVIDER/MODEL

:::

```bash
npx -y @maximhq/bifrost
docker run -p 8080:8080 -v $PWD/data:/app/data maximhq/bifrost
```

- config.json - Configuration file (optional)
- config.db - SQLite database for UI configuration
- logs.db - Request logs database

```json
{
  "client": {
    "drop_excess_requests": false
  },
  "providers": {
    "openai": {
      "keys": [
        {
          "name": "openai-key-1",
          "value": "env.OPENAI_API_KEY",
          "models": ["gpt-4o-mini", "gpt-4o"],
          "weight": 1.0
        }
      ]
    }
  },
  "config_store": {
    "enabled": true,
    "type": "sqlite",
    "config": {
      "path": "./config.db"
    }
  }
}
```

- 如果没有 config_store
  - 只读模式
  - 没有 UI
  - 都在内存

```json
{
  "config_store": {
    "enabled": true,
    "type": "postgres",
    "config": {
      "host": "localhost",
      "port": "5432",
      "user": "postgres",
      "password": "password",
      "db_name": "bifrost_config",
      "ssl_mode": "disable", // e.g., "disable", "require", "verify-full"
      "max_idle_conns": 5, // (可选) 默认 5
      "max_open_conns": 50 // (可选) 默认 50
    }
  }
}
```
