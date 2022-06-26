---
title: Nodejs Awesome
tags:
  - Awesome
---

# Nodejs Awesome

:::tip

- 最好选择 TypeScript 开发的或支持 TypeScript 的
- TypeScript 的 decorator 比 Java 的 Annotation 弱得多
  - 不支持获取字段实际类型信息 - 因为不存在这样的信息

:::

:::caution Nodejs 后端开发不太活跃

最近一两年 (2020-2021)，可能是因为 Go 和 Rust 的盛行，导致 Nodejs 的后端开发弱化了，很多项目开发都不太活跃。

:::

## DB

- [sequelize/sequelize](https://github.com/sequelize/sequelize)
  - ORM
  - Postgres, MySQL, MariaDB, SQLite, Microsoft SQL Server.
  - 因为需要支持很多 DB 类型，丢失一定的特性
- [knex/knex](https://github.com/knex/knex)
  - SQL Builder
  - Composite - 解耦构建最终 query 的过程
  - 对于基础的访问模式提供跨库支持
  - ⚠️ 不支持 typescript 实体类型安全
  - Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, Amazon Redshift
- [Vincit/objection.js](https://github.com/Vincit/objection.js)
  - 🚧 开发停滞
  - SQL-friendly ORM
  - 基于 knex
- [typeorm/typeorm](https://github.com/typeorm/typeorm)
  - 基于 typescript decoration 的 ORM
  - 🚧 开发缓慢
- [bookshelf/bookshelf](https://github.com/bookshelf/bookshelf)
  - 基于 knex 的 ORM
  - 🚧 开发停止

## Web

- [fastify](./fastify.md)
  - 🌟 推荐
- express
- koa
  - 🚧 开发停滞

## Server

- 日志
  - [pinojs/pino](https://github.com/pinojs/pino)

## Scraper

- [jsdom/jsdom](https://github.com/jsdom/jsdom)
- [cheeriojs/cheerio](https://github.com/cheeriojs/cheerio)
- [rchipka/node-osmosis](https://github.com/rchipka/node-osmosis)
- https://www.webscrapingapi.com/

## Browser Automation

- [puppeteer/puppeteer](https://github.com/puppeteer/puppeteer)
- [Microsoft/playwright](https://github.com/Microsoft/playwright)
  - 统一 API 支持 Chromium, Firefox, WebKit
- [matthewmueller/x-ray](https://github.com/matthewmueller/x-ray)
  - web scraper
- [segmentio/nightmare](https://github.com/segmentio/nightmare)
  - 基于 Electron

## 工具

- shell
  - [google/zx](https://github.com/google/zx)
