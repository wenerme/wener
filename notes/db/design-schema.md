---
title: Schema Design
tags:
  - Design
---

# Schema Design

:::tip Schema 设计参考

- 表尽量不要前缀 - 清晰明了
  - MySQL 额外考虑
  - PG 支持 Schema 隔离
- 字段尽量不要缩写
- 尽量不要用 拼音
  - 做国内环境除外 - 例如：政企数据无法很好翻译
- 维护开发字典
- 尽量 **不要** 用自增长 ID
  - 容易被遍历
  - 面向用户的可以 增加额外的 自增长 编号/序号
- PostgreSQL
  - 尽量用 text, bigint, jsonb, bool
  - 看情况用 array - array 能简化不少需要 join 表的场景
  - 避免 varchar(n) 限定长度
    - 业务层控制 validation
    - 通过 check 验证

:::

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
    eid                 text        null , -- 用于导入数据关联
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
    - 例如: `1-user-xxxxxxxxxxx`
  - 类似于 AIP 的 resource-name
- sid 租户维度单调递增 - 用户友好
- owner 逻辑取决于业务 - 例如: 权限，孤儿对象判断
- 其他元数据
  - version - 用于支持场景的更新逻辑 - 例如: Hibernate
- 表分类
  - primary - 主要资源
    - 例如: accounts, orders
    - 有 owener、附加元信息、auditor
  - 用户无关表
    - 无 owner、auditor
  - 关联表 - 中间表
    - 可能有额外信息、可能有 tid
  - 系统表
    - 只有基础字段 - id、sid、tid、uid

## current_tenant_id

```sql
create function current_tenant_id() returns text
    stable
    parallel safe
    language plpgsql
as
$$
DECLARE
    tid text := coalesce(
            nullif(current_setting('tenant.id', true), '')::text,
            ((regexp_match(current_user, '(^|_)tenant_([^_]+)$'))[1])::text
        );
BEGIN
    IF tid IS NULL THEN
        RAISE EXCEPTION 'Missing tenant in context'
            USING HINT = 'Please check your execution context';
    END IF;
    RETURN tid;
END;
$$;
```


```sql
select set_config('tenant.id','1', true);
```

# FAQ

## created_at vs create_time

- created_at - 推荐
  - 语义 准确
  - 与 `created_by_id` 形式上类似
  - 使用: Spring, Gorm 默认
  - 面向 系统
- create_time
  - 使用: AIP
  - 面向 用户

