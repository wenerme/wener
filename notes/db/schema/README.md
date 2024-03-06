---
title: Service Schema
---

# 数据和结构

## 规则

- 主键 `tagid_ULID` 或 `tagid_UUIDv7`
- 表名单数形式 - singularity
  - 特殊情况除外 - users, roles - 避免冲突
- table prefix over schema
  - wecom.users -> wecom_users
  - 把 schema 保留给业务/租户
  - 让 schema 更容易迁移
  - 避免出错
- 用 表 记录枚举
- 用 表 记录 EntitySchema
- 服务分层为
  - Resource - REST, GQL
  - EntityService - RPC - 走网络
  - Entity - Native
  - DB

## i18n

1. multi column
   ```sql
   create table article
   (
       title    text,
       title_en text
   );
   ```
2. by message id
   ```sql
   create table message
   (
       id    text,
       text  text,
       en    text,
       en_US text,
       cn    text,
       zh_CN text
   );
   ```
3. by jsonb
   ```sql
   create table message
   (
       id    text,
       title jsonb
   );
   insert into message (id, title)
   values ('help','{"zh_CN":"","en":""}'::jsonb);
   ```
