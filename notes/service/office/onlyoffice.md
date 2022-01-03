---
id: onlyoffice
title: ONLYOFFICE
---

# ONLYOFFICE

- [ONLYOFFICE/CommunityServer](https://github.com/ONLYOFFICE/CommunityServer)
  - Apache-2.0, C#
- [ONLYOFFICE/DocumentServer](https://github.com/ONLYOFFICE/DocumentServer)
  - AGPL-3.0
  - server+core+sdkjs+web-apps+dictionaries+sdkjs-plugins
- 服务端将文档转换为 JSON
- 客户端是一个完整的 Office 套件
- 客户端负责编辑文档
- 服务端合并 JSON 再回传
- Community Edition - GNU AGPL v.3
  - 社区版限制 20 个用户
  - 无 White label
  - 无 Mobile web editors
  - 无 Adding Content control
  - 无 Comparing Documents
  - 无 Sheet Views
- Developer Edition - Proprietary

## 编辑器

- [ONLYOFFICE/DesktopEditors](https://github.com/ONLYOFFICE/DesktopEditors)

## Document Server Docker

- https://helpcenter.onlyoffice.com/server/docker/document/docker-installation.aspx
- 组件
  - PostgreSQL
  - RabbitMQ
  - Redis
  - SpellChecker
  - DocService
  - FileConverter
- `/var/log/onlyoffice` Document Server 日志
- `/var/www/onlyoffice/Data` 证书
- `/var/lib/onlyoffice` 文件缓存
- `/var/lib/postgresql` 数据库
- 包含的功能
  - Document Editor
  - Spreadsheet Editor
  - Presentation Editor
  - Documents application for iOS and Android
  - 协作编辑
  - Hieroglyph support
  - 支持格式: DOC, DOCX, TXT, ODT, RTF, ODP, EPUB, ODS, XLS, XLSX, CSV, PPTX, HTML
- 配置
  - 只要配置的 host 不是 localhost 就会使用外部服务而不是本地
  - mq
    - AMQP_SERVER_URL - AMQP URL
    - AMQP_SERVER_TYPE - rabbitmq 或 activemq
  - pg
    - DB_TYPE = postgres mariadb
    - DB_HOST
    - DB_PORT
    - DB_NAME
    - DB_USER
    - DB_PWD
  - redis
    - REDIS_SERVER_HOST
    - REDIS_SERVER_PORT
  - jwt
    - JWT_ENABLED - 开启 jwt secret 校验
    - JWT_SECRET - 用于校验 jwt token 的 secret
    - JWT_HEADER - jwt 的 http 头 - 默认 Authorization
- 配置
  - 默认配置文件 `/etc/onlyoffice/documentserver/default.json` - 不要编辑
  - 本地配置文件 `/etc/onlyoffice/documentserver/local.json`
  - 配置说明 https://api.onlyoffice.com/editors/signature/
- 接口
  - [文档转换](https://api.onlyoffice.com/editors/conversionapi) - https://documentserver/ConvertService.ashx
  - [文档构建](https://api.onlyoffice.com/editors/documentbuilderapi) - [.docbuilder](https://api.onlyoffice.com/docbuilder/integrationapi/usingdocbuilderfile)
  - [嵌入编辑器](https://api.onlyoffice.com/editors/example/nodejs) - [配置](https://api.onlyoffice.com/editors/config)

```bash
# CPU 2 GHz RAM 2 GB Swap 4 GB
# 镜像特别大 700MB+
docker run --rm -it -p 8088:80 --name ds onlyoffice/documentserver
```

### 配置

- 这些配置都可以通过环境变量配置

```json
{
  "services": {
    "CoAuthoring": {
      "sql": {
        "type": "postgres",
        "dbHost": "localhost",
        "dbPort": "5432",
        "dbName": "onlyoffice",
        "dbUser": "onlyoffice",
        "dbPass": "onlyoffice"
      },
      "redis": {
        "host": "localhost"
      },
      "token": {
        "enable": {
          "request": {
            "inbox": false,
            "outbox": false
          },
          "browser": false
        },
        "inbox": {
          "header": "Authorization"
        },
        "outbox": {
          "header": "Authorization"
        }
      },
      "secret": {
        "inbox": {
          "string": "secret"
        },
        "outbox": {
          "string": "secret"
        },
        "session": {
          "string": "secret"
        }
      }
    }
  },
  "rabbitmq": {
    "url": "amqp://guest:guest@localhost"
  }
}
```

## Dev

- https://api.onlyoffice.com/editors/save
