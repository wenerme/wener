---
title: Strapi
---

# Strapi

- [strapi/strapi](https://github.com/strapi/strapi)
  - MIT+[EE](https://github.com/strapi/strapi/blob/86e0cf0f55d58e714a67cf4daee2e59e39974dd9/packages/strapi-admin/ee/LICENSE)
    - strapi-admin 包含部分 EE 协议 - Strapi Enterprise Edition
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
yarn create strapi-app my-strapi --quickstart
cd my-strapi

#  http://localhost:1337/admin
npm run strapi develop --watch-admin
```

## 配置

- ADMIN_PATH

```js title="src/admin/app.js"
export default {
  config: {
    // en 不可以移除，会作为第一次打开时的默认语言
    // @strapi/admin/admin/src/translations/[language-name].json
    // localStorage['strapi-admin-language']
    // https://github.com/strapi/strapi/blob/v4.0.0/packages/plugins/i18n/server/constants/iso-locales.json
    locales: ['zh-Hans', 'en'],
    // 自定义翻译
    translations: {
      fr: {
        'Auth.form.email.label': 'test',
        Users: 'Utilisateurs',
        City: 'CITY (FRENCH)',
        // Customize the label of the Content Manager table.
        Id: 'ID french',
      },
    },
  },
  bootstrap() {},
};
```

- https://docs.strapi.io/developer-docs/latest/development/admin-customization.html
- https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/server.html

```js title="./config/server.js"
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  // 配置后 url 会返回完整路径 - 涉及到第三方时可能要求必须配置 - 例如 回调
  // build 是会写入到 js 中，无法启动修改
  // STRAPI_ADMIN_BACKEND_URL
  url: env('WEBSITE', 'http://127.0.0.1:1337'),
  // 是否信任 proxy 头
  proxy: false,
  emitErrors: false,
  socket: '/tmp/nginx.socket',
  cron: {
    enabled: false,
    tasks: {},
  },
  dir: {
    public: './public',
  },
});
```

```js title="./config/admin.js"
module.exports = ({ env }) => ({
  // 后台路径
  url: '/admin',
});
```

```js tiitle="./config/plugins.js"
export default {
  //
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
};
```

```bash
# ADMIN 后台路径 server.url
# 不配置为空
egrep -o 'STRAPI_ADMIN_BACKEND_URL[^}]+' build/*.js
```

## REST

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

# FAQ

## 升级

```bash
yarn oudated
sed '/strapi/s/3.0.0-beta.18.7/3.0.1/g' package.json -i
yarn
yarn build
```

## GraphQL

```bash
# http://localhost:1337/graphql
yarn strapi install graphql
```

### Swagger

```bash
yarn strapi install documentation
```

## S3

```bash
# https://www.npmjs.com/search?q=strapi-provider-upload-
# 配置 http://localhost:1337/admin/plugins/upload/configurations/development
yarn add strapi-provider-upload-aws-s3@beta
# 支持自定义 Endpoint
yarn add strapi-provider-upload-amazon-s3-endpoint@beta

# Aliyun OSS strapi-provider-upload-oss
```

## 总是请求 localhost:1337/admin/project-type

- https://github.com/strapi/strapi/issues/12418#issuecomment-1031915741
