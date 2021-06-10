---
title: CMS Awesome
---

# CMS Awesome

## CMS

- [dotCMS/core](https://github.com/dotCMS/core)
  - GPL-3.0, Java
  - 功能强大, 体系复杂
- Ghost

## Headless CMS

- [strapi/strapi](https://github.com/strapi/strapi)
  - MIT+企业版特性, NodeJS
- [directus/directus](https://github.com/directus/directus)
  - GPL-3.0, Typescript
- [agentejo/cockpit](https://github.com/agentejo/cockpit)
  - MIT, PHP
- [webiny/webiny-js](https://github.com/webiny/webiny-js)
  - MIT, Typescript
  - Page Builder, Form Builder, File Manager
  - 依赖 AWS ElasticsearchService
- [bramw/baserow](https://gitlab.com/bramw/baserow)
  - Airtable Alternative
  - Django + Nuxt.js + PostgreSQL
- [ponzu-cms/ponzu](https://github.com/ponzu-cms/ponzu)
  - Golang
  - 停止开发
- [sanity-io/sanity](https://github.com/sanity-io/sanity)
  - Sanity Studio
  - MIT
  - 实时结构化内容协作平台
  - Typescript
- [craftcms/cms](https://github.com/craftcms/cms)
  - PHP
- [gentics/mesh](https://github.com/gentics/mesh)
  - Apache-2.0, Java
- [daptin/daptin](https://github.com/daptin/daptin)
  - AGPL-3.0, Go
  - BAAS, GraphQL/JSON-API
  - 用户, 数据, 存储, 站点, 集成, 邮件

## API for Database

> 将数据库暴露为接口，应用开发直接使用。

- 特点
  - 支持管理 Schema
  - 包含 Playground 能力
  - 对开发友好

* [PostgREST/postgrest](https://github.com/PostgREST/postgrest)
  - RESTful for PostgreSQL
* [hasura/graphql-engine](https://github.com/hasura/graphql-engine)
  - GraphQL + PostgreSQL 为主
  - 支持 MS SQL - Metadata 还是需要在 PG
  - 支持 REST
* [graphile/postgraphile](https://github.com/graphile/postgraphile)
  - Typescript + NodeJS
  - 自定义扩展性强
* Prisma
  - 目前感觉定位有点混乱
  - v2 和 v1 变化很大

## Toolkit

- [tinacms/tinacms](https://github.com/tinacms/tinacms)
  - React visual editing
  - 核心 form 构建 - 基于 final-form
- [artf/grapesjs](https://github.com/artf/grapesjs)
  - jQuery 传统结构
  - Page Builder
- [prevwong/craft.js](https://github.com/prevwong/craft.js)
  - React
  - Page Builder - 类似于 Dreamweaver 效果

## Knowledge Base

> Knowledge Base / 知识库 / Wiki 概念相似

- [outline/outline](https://github.com/outline/outline)
  - BSL 1.1 licensed
  - [outline/rich-markdown-editor](https://github.com/outline/rich-markdown-editor) - 编辑器
    - 基于 Prosemirror
- [gilbitron/Raneto ](https://github.com/gilbitron/Raneto)
  - demo http://docs.raneto.com/
- [mrvautin/openKB](https://github.com/mrvautin/openKB)

## Documentation

文档类 CMS 通常用于生成产品的文档站点。

- 特点
  - 多版本
  - 一般会支持 MDX 方便自定义
  - 通常需要在页面中嵌入代码 或 Demo
  - 多语言
  - 嵌入的代码一般支持多语言

* [facebook/docusaurus](https://github.com/facebook/docusaurus)
* [docsifyjs/docsify](https://github.com/docsifyjs/docsify)
* [doczjs/docz](https://github.com/doczjs/docz)

## API Documentation

基于接口规范生成文档。

- 特点
  - 支持多编程语言
  - 可能能在页面执行
  - 生成

* [slatedocs/slate](https://github.com/slatedocs/slate)

## JAM

> JavaScript, API & Markup - 是一种概念

- [jamstack.wtf](https://jamstack.wtf/)
- [jamstack.org](https://jamstack.org/)
  - [best-practices](https://jamstack.org/best-practices/)

## BAAS

- Backend As A Service
  - 一种概念
  - 前端开发不需要后段
  - 直接由通用的服务提供数据
  - 支持相关服务功能: 用户、通知、推送、实时
  - 可能的外部服务集成: 支付、三方平台
  - 支持自定义: WebHook, 自定义服务集成
  - 例如 strapi, hasura, postgrest, dotCMS
  - vs CMS
    - BAAS 不只是数据内容，还包括服务
    - CMS 更多面向编辑
    - BAAS 更多面向开发
