---
title: Strapi
---

# Strapi

- [strapi/strapi](https://github.com/strapi/strapi)
  - MIT+[EE](https://github.com/strapi/strapi/blob/86e0cf0f55d58e714a67cf4daee2e59e39974dd9/packages/strapi-admin/ee/LICENSE)
    - strapi-admin 包含部分 EE 协议 - Strapi Enterprise Edition
  - 生成代码 - 代码在本地
  - 半开发半可视化操作的 Headless CMS
    - 半开发
      - 接口、模型、组件、插件均可以代码操作
      - 首选操作方式是生成项目而不是作为服务使用
      - 区分 开发、预发、生产 环境
      - 一般只有开发环境才能生成模型
    - 半可视化
      - 模型定义可视化
      - 数据编就可视化
      - 组件定义
- [Roadmap](https://portal.productboard.com/strapi/1-public-roadmap/tabs/2-under-consideration)
- 开发
  - [文件结构](https://strapi.io/documentation/3.0.0-beta.x/concepts/file-structure.html)
  - [strapi/strapi-examples](https://github.com/strapi/strapi-examples) - 集成参考
- 参考
  - [将 Strapi 转为 Typescript](https://medium.com/@alexdevmotion/1cc852fbf504)
- ./config/env/{env}/plugins.js

```bash
npx -y create-strapi-app@latest --ts --quickstart --use-npm --no-run my-project
cd my-strapi

# https://docs.strapi.io/dev-docs/plugins/i18n
# https://github.com/strapi/strapi/blob/v4.20.2/packages/plugins/i18n/server/src/constants/iso-locales.json
npm run strapi install i18n graphql documentation
npm install @strapi/plugin-color-picker

# http://localhost:1337/admin
# http://localhost:1337/graphql
npm run develop --watch-admin --bundler=vite --debug

# for db
npm add pg
```

## REST

- https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html

```bash
KEY=
curl -H "Authorization: Bearear $KEY" 127.0.0.1/api/posts
```

## Plugins

- editor
  - 默认为 markdown
  - strapi-tiptap-editor 生成 html
  - strapi-plugin-react-editorjs 生成 json
- graphql
- [strapi-plugin-placeholder](https://github.com/WalkingPizza/strapi-plugin-placeholder)
  - 针对现有 image 生成 placeholder
  - 并不是提供 placeholder 图像
  - https://plaiceholder.co/docs/usage
- [@strapi/plugin-documentation](https://github.com/strapi/strapi/tree/master/packages/plugins/documentation)
  - 生成 OpenAPIv3
- [@strapi/plugin-graphql](https://docs.strapi.io/developer-docs/latest/plugins/graphql.html)
  - 提供 GraphQL 接口
  - [docs](https://docs.strapi.io/developer-docs/latest/plugins/graphql.html)
  - sort 参数格式 `<prop>:{desc|asc}`
- strapi-plugin-slugify
  - 生成/维护 slug
- [strapi-plugin-rest-cache](https://github.com/strapi-community/strapi-plugin-rest-cache)
  - 缓存 REST 请求
  - 只支持 REST 不支持 GraphQL [#4](https://github.com/strapi-community/strapi-plugin-rest-cache/issues/4)
- [strapi-middleware-upload-plugin-cache](https://github.com/alexkainzinger/strapi-middleware-upload-plugin-cache)
  - 本地上传文件添加缓存头
  - 默认 max-age 60

## Midleware

- Strapi middlewares
  - 全局
- Route middlewares
  - 局限于路由
- ctx https://koajs.com/#context

## 内置数据库

- admin_permissions
- admin_permissions_role_links
- admin_roles
- admin_users
- admin_users_roles_links
- files
- files_folder_links
- files_related_morphs
- i18n_locale
- sqlite_master
- sqlite_sequence
- strapi_api_token_permissions
- strapi_api_token_permissions_token_links
- strapi_api_tokens
- strapi_core_store_settings
- strapi_database_schema
- strapi_migrations
- strapi_release_actions
- strapi_release_actions_release_links
- strapi_releases
- strapi_transfer_token_permissions
- strapi_transfer_token_permissions_token_links
- strapi_transfer_tokens
- strapi_webhooks
- up_permissions
- up_permissions_role_links
- up_roles
- up_users
- up_users_role_links
- upload_folders
- upload_folders_parent_links
