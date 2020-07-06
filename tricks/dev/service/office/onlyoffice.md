---
id: onlyoffice
title: ONLYOFFICE
---

# ONLYOFFICE

* 服务端将文档转换为 JSON
* 客户端是一个完整的 Office 套件
* 客户端负责编辑文档
* 服务端合并 JSON 再回传
* 社区版限制 20 个用户

## 编辑器
* [ONLYOFFICE/DesktopEditors](https://github.com/ONLYOFFICE/DesktopEditors)

## Document Server Docker
* https://helpcenter.onlyoffice.com/server/docker/document/docker-installation.aspx
* 组件
  * PostgreSQL
  * RabbitMQ
  * Redis
  * SpellChecker
  * DocService
  * FileConverter
* `/var/log/onlyoffice`  Document Server 日志
* `/var/www/onlyoffice/Data` 证书
* `/var/lib/onlyoffice` 文件缓存
* `/var/lib/postgresql` 数据库
* 包含的功能
  * Document Editor
  * Spreadsheet Editor
  * Presentation Editor
  * Documents application for iOS and Android
  * 协作编辑
  * Hieroglyph support
  * 支持格式: DOC, DOCX, TXT, ODT, RTF, ODP, EPUB, ODS, XLS, XLSX, CSV, PPTX, HTML
* 配置
  * mq
    * AMQP_SERVER_URL - AMQP URL
    * AMQP_SERVER_TYPE - rabbitmq 或 activemq
  * pg
    * POSTGRESQL_SERVER_HOST
    * POSTGRESQL_SERVER_PORT
    * POSTGRESQL_SERVER_DB_NAME
    * POSTGRESQL_SERVER_USER
    * POSTGRESQL_SERVER_PASS
  * redis
    * REDIS_SERVER_HOST
    * REDIS_SERVER_PORT
  * jwt
    * JWT_ENABLED
    * JWT_SECRET - 用于校验 jwt token 的 secret
    * JWT_HEADER - jwt 的 http 头 - 默认 Authorization
* 配置
  * 默认配置文件 `/etc/onlyoffice/documentserver/default.json` - 不要编辑
  * 本地配置文件 `/etc/onlyoffice/documentserver/local.json`
  * 配置说明 https://api.onlyoffice.com/editors/signature/
* 接口
  * [文档转换](https://api.onlyoffice.com/editors/conversionapi) -  https://documentserver/ConvertService.ashx
  * [文档构建](https://api.onlyoffice.com/editors/documentbuilderapi) - [.docbuilder](https://api.onlyoffice.com/docbuilder/integrationapi/usingdocbuilderfile)
  * [嵌入编辑器](https://api.onlyoffice.com/editors/example/nodejs) - [配置](https://api.onlyoffice.com/editors/config)

```bash
# CPU 2 GHz RAM 2 GB Swap 4 GB
# 镜像特别大 700MB+
docker run --rm -it -p 8088:80 --name ds onlyoffice/documentserver
```
