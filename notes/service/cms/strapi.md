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

```bash
yarn create strapi-app my-strapi --quickstart
```

# FAQ

## 升级

```bash
yarn oudated
sed '/strapi/s/3.0.0-beta.18.7/3.0.1/g'  package.json -i
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
