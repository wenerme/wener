---
title: Schema Design
tags:
  - Design
---

# Schema Design

## 主键

- [ULID](./ulid.md)
  - 有序 - 可以用于排序
  - 顺序访问更容易命中缓存
  - 缺点
    - 只能存储为 string
    - 需要额外的 function
    - 不一定能保证全局递增 - 因为需要维护全局状态
- UUIDv4
  - 128bit - 编码后 36 字符
  - 随机
  - 数据库支持 UUID 类型的话能使用更少空间 -
- [NanoID](https://github.com/ai/nanoid)
  - 一般不直接用于 DB
  - `A-Za-z0-9_-`
  - 26 bytes

## 元数据

> **Note**
>
> * 元数据不要用于业务依赖
> * 可以创建模板表然后 CREATE TABLE LIKE

```sql
create table tpl_res
(
    -- 基础
    id                  text        not null default gen_ulid(),
    tid                 bigint      not null default current_tenant_id(), -- 租户
    uid                 uuid        not null default gen_random_uuid(),
    sid                 bigint      not null default (next_res_sid('tpl_pri_resources')),
    created_at          timestamptz not null default current_timestamp,
    updated_at          timestamptz not null default current_timestamp,
    deleted_at          timestamptz,
    -- auditor 信息
    created_by_id       text                 default current_setting('app.user.id'),
    updated_by_id       text                 default current_setting('app.user.id'),
    deleted_by_id       text,
    -- 按需附加任意层面的数据
    -- 例如: attributes 允许客户端修改, properties 不允许客户端修改, extensions 客户端不可见
    extensions          jsonb,
    properties          jsonb,
    attributes          jsonb,
    -- 业务 owner 信息
    owner_id            text,
    owner_type          text,
    owner_uid           uuid,
    owner_user_id       text,
    owner_team_id       text,
    owner_department_id text,
    primary key (tid, id),
    unique (tid, sid),
    unique (tid, uid)
);
```

- id 可按照业务逻辑生成 - 例如: `<tid>-<资源名称>-UUID/ULID`
  - 类似于 GraphQL NodeID
  - 类似于 AIP 的 resource-name
- sid 租户维度单调递增 - 用户友好
- owner 逻辑取决于业务 - 例如: 权限，孤儿对象判断
- 其他元数据
  - version - 用于支持场景的更新逻辑 - 例如: Hibernate

# FAQ

## created_at vs create_time

- created_at - 推荐
  - 语义 准确
  - 与 `created_by_id` 形式上类似
  - 使用: Spring, Gorm 默认
- create_time
  - 使用: AIP

