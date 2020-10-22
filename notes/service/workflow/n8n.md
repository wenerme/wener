---
id: n8n
---

# n8n

- 是什么
  - 带图形化界面的工作流自动化服务
  - Vue+Typescript+TypeORM
- [n8n-io/n8n](https://github.com/n8n-io/n8n)
  - HN [N8n.io – Workflow automation alternative to Zapier](https://news.ycombinator.com/item?id=21191676)

:::note

- Apache 协议但禁止用于直接提供 n8n 作为服务 - 不能做竞品

:::

```bash
# /root/.n8n
```

## 配置

- [Configuration](https://docs.n8n.io/reference/configuration.html)
- 默认使用 SQLite，推荐使用 PostgresDB
- 敏感配置支持文件 `*_FILE`,例如 `DB_POSTGRESDB_PASSWORD_FILE`

| env                     | demo                 |
| ----------------------- | -------------------- |
| N8N_BASIC_AUTH_ACTIVE   | true                 |
| N8N_BASIC_AUTH_USER     | n8n                  |
| N8N_BASIC_AUTH_PASSWORD | n8n                  |
| N8N_JWT_AUTH_ACTIVE     | true                 |
| N8N_JWT_AUTH_HEADER     | Authentication       |
| N8N_JWKS_URI            | auth.example.com     |
| N8N_HOST                | n8n.wener.me         |
| N8N_PORT                | 5678                 |
| N8N_PROTOCOL            | https                |
| NODE_ENV                | production           |
| WEBHOOK_TUNNEL_URL      | https://n8n.wener.me |
| VUE_APP_URL_BASE_API    | https://n8n.wener.me |
| GENERIC_TIMEZONE        | Asia/Shanghai        |
| N8N_ENCRYPTION_KEY      |
| DB_TABLE_PREFIX         | n8n                  |
| DB_TYPE                 | postgresdb           |
| DB_POSTGRESDB_DATABASE  | n8n                  |
| DB_POSTGRESDB_HOST      | localhost            |
| DB_POSTGRESDB_PORT      | 5432                 |
| DB_POSTGRESDB_USER      | root                 |
| DB_POSTGRESDB_PASSWORD  |
| DB_POSTGRESDB_SCHEMA    | public               |
