---
id: n8n
---

# n8n

- [n8n-io/n8n](https://github.com/n8n-io/n8n) 是什么
  - Sustainable Use License, TS, Vue
  - 带图形化界面的工作流自动化服务
  - Vue+Typescript+TypeORM
- 参考
  - HN [N8n.io – Workflow automation alternative to Zapier](https://news.ycombinator.com/item?id=21191676)

:::caution

- Apache 协议但禁止用于直接提供 n8n 作为服务 - 不能做竞品
- 非 OSS 协议
- 社区版只能单用户
- EE 功能
  - LogStream
  - LDAP
  - Collaborate

:::

```bash



# /home/node/.n8n
# SQLite
docker run -it --rm \
  -v $PWD/n8n/data:/home/node/.n8n \
  -p 5678:5678 \
  -e N8N_RUNNERS_ENABLED=true \
  -e N8N_DIAGNOSTICS_ENABLED=false \
  -e N8N_VERSION_NOTIFICATIONS_ENABLED=false \
  -e N8N_SECURE_COOKIE=false \
  -e GENERIC_TIMEZONE="Asia/Shanghai" \
  -e TZ="Asia/Shanghai" \
  --name n8n n8nio/n8n


# 中文
curl -LO https://github.com/other-blowsnow/n8n-i18n-chinese/releases/download/n8n%401.95.3/editor-ui.tar.gz
mkdir -p n8n/n8n-editor-ui
tar zxvf editor-ui.tar.gz -C ./n8n/n8n-editor-ui

# -v $PWD/n8n/n8n-editor-ui/dist:/usr/local/lib/node_modules/n8n/node_modules/n8n-editor-ui/dist \
# -e N8N_DEFAULT_LOCALE=zh-CN \
```

- i18n
  - 需要添加后从新编译 https://github.com/n8n-io/n8n/tree/master/packages/frontend/%40n8n/i18n/src/locales
  - /usr/local/lib/node_modules/n8n/node_modules/n8n-editor-ui/dist
  - https://github.com/n8n-io/n8n/blob/master/packages/frontend/%40n8n/i18n/docs/README.md
  - https://docs.n8n.io/hosting/configuration/environment-variables/
- https://github.com/other-blowsnow/n8n-i18n-chinese

| env                         | for  | note                |
| --------------------------- | ---- | ------------------- |
| EXECUTIONS_PROCESS          | main |
| EXECUTIONS_TIMEOUT          | -1   | seconds             |
| N8N_CUSTOM_EXTENSIONS       |
| NODE_FUNCTION_ALLOW_BUILTIN | `*`  | crypto,lodash,dayjs |
| N8N_USER_FOLDER             | .n8n |
| WEBHOOK_URL                 |
| N8N_PROTOCOL                |
| N8N_HOST                    |
| N8N_PORT                    |
| N8N_METRICS                 | true |

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
