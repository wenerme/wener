---
tags:
  - FAQ
---

# Strapi FAQ

- relations
  - has one
  - has and belongs to one
  - belongs to many
  - has many
  - has and belongs to many
  - has many
- has 被关联的一方不需要配置

## 关联关系会用中间表

- site_articles_site_links
  - id
  - site_article_id
  - site_id
  - site_article_order - 需要存储排序

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
