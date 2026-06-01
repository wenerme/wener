---
title: Schema Design
tags:
  - Design
---

# Schema Design

## 专题

- [Resource](./design-schema-resource.md) - 资源表、基础字段、扩展字段、来源字段。
- [State](./design-schema-state.md) - `state` / `status` / `*_changed_at` / reason / 软删除。
- [Ownership](./design-schema-ownership.md) - `created_by`、`owner_user_id`、`owner_type`、visibility、共享授权。
- [Auth](./design-schema-auth.md) - AuthN、AuthZ、access token、permission grant、RBAC 边界。
- [Logging](./design-schema-logging.md) - request log、audit log、append-only 分析日志、脱敏。
- [Wode Practice](./design-schema-wode.md) - 历史 Wode PostgreSQL schema 实践参考。
- [Migration](./design-schema-migration.md) - schema migration。

:::tip Schema 设计参考

- 表尽量不要前缀 - 清晰明了
  - MySQL 额外考虑
  - PG 支持 Schema 隔离 - 避免直接使用 public schema
- 字段尽量不要缩写
- 尽量不要用 拼音
  - 做国内环境除外 - 例如：政企数据无法很好翻译
- 维护开发字典 - 例如 [开发用词字典](https://wener.me/notes/dev/dict)
- 尽量 **不要** 用自增长 ID
  - 容易被遍历
  - 面向用户的可以 增加额外的 自增长 编号/序号
- 使用 有序的 随机主键 - ULID, UUID, UUIDv7
- 建议主键增加 type tag
- PostgreSQL
  - 尽量用 text, bigint, jsonb, bool, timestamptz
  - 看情况用 array - array 能简化不少需要 join 表的场景 - 例如 `tags text[]`
  - 避免 varchar(n) 限定长度
    - 业务层控制 validation
    - 通过 check 验证

:::

## 主键生成 {#id}

:::tip

- 建议 K-Sortable
- 建议小写
- 不要大小写混合
- 可以考虑加类型 tag
- 可以用 `_`, 避免用 `-`, 方便双击选中 例如 usr_123

:::

- UUIDv7
- [ULID](../../db/ulid.md)
  - 128bit - 编码后 26 字符 - base32
  - timestamp 48bits + random 80bits
  - 有序 - 可以用于排序
  - 顺序访问更容易命中缓存
  - 缺点
    - 只能存储为 string
    - 需要额外的 function - 比较少有内部实现
    - 不一定能保证全局递增 - 因为需要维护全局状态 - 大多时候没问题
- UUIDv4
  - 128bit - 编码后 36 字符 - hex+4dash - `8-4-4-4-12` - 32+4
  - `2*int64` / `2*long`
  - 数据库支持 UUID 类型的话能使用更少空间 - 36 -> 16
- [Snowflake ID](https://en.wikipedia.org/wiki/Snowflake_ID)
  - by Twitter 2010-06
  - 64bit - 实际只用了 63bit - **能放在 long 里**
  - timestamp 41bits + instance 10bits + sequence 12bits
    - sequence - 4096 个 - 正常 1ms 内达到了会递增 timestamp - **需要维护全局状态**
  - 69 years
    - timestamp 通过 offset 调整 - e.g `(2023-1970)*31536000*1000`
  - instance - Machine ID
    - 注意选择，通常使用 IP/Hostname/Mac
    - AmazonEC2MachineID
  - 如果 instance 有业务含义，那么无法 DB 直接 生成
  - adopted by Discord, Instagram, Mastodon
    - Discord: epoch 2015-01-01
    - Instagram: ts 41bits + shard id 13bits + sequence 10bits
    - Mastodon: ts ms 48bits + sequence 16bits
  - [sony/sonyflake](https://github.com/sony/sonyflake)
    - ts 10msec 39bit + machine 16bit + sequence 8bit
    - 174 years
    - 处理更多的 instance
- [UUIDv7](https://www.ietf.org/archive/id/draft-ietf-uuidrev-rfc4122bis-00.html#name-uuid-version-7)
  - `{unix_ts_ms:48 bit}{ver:4bit}{rand_a:12bit}{var:2bit}{rand_b:64bit}`
  - 兼容 UUID
  - 有序 - 时间戳
  - 类似于 ULID
  - [craigpastro/pg_uuidv7](https://github.com/craigpastro/pg_uuidv7)
    - Postgres extension
- [NanoID](https://github.com/ai/nanoid)
  - 一般不直接用于 DB, 前端用的多
  - `A-Za-z0-9_-`
  - 26 bytes
- [hashid](https://hashids.org/)
  - 数字+字符串生成
  - 可用于隐藏部分信息
  - 例如 微信
- [segmentio/ksuid](https://github.com/segmentio/ksuid)
  - `0ujsswThIGTUYm2K8FjOOfXtY1K`
- [beyonddream/snowid](https://github.com/beyonddream/snowid)
- K-Sortable
  - 基本有序
  - Prefetch 优化 - 非常容易连续命中
- https://sqids.org/
  - HN https://news.ycombinator.com/item?id=38414914

## 主键类型 {#typed-id}

- `type-RANDOM`
  - OpenAI `sk-`,`org-`, `chat-`
- `type_RANDOM`
- GraphQL 的 NodeID 包含 Type 信息
  - Github [Using global node IDs](https://docs.github.com/en/graphql/guides/using-global-node-ids)
    - MDQ6VXNlcjU4MzIzMQ==
      - `04:User583231`
  - [Global Object Identification](https://graphql.org/learn/global-object-identification/)
- [jetpack-io/typeid](https://github.com/jetpack-io/typeid)
  - Type-safe, K-sortable, globally unique identifier inspired by Stripe IDs
  - [HN](https://news.ycombinator.com/item?id=36508811)
  - Tagged Id https://joist-orm.io/docs/advanced/tagged-ids
    - `TAG:ID`
- Reddit
  - `tN_ID`
- 💡 使用 `_` 可以双击选中复制
- 参考
  - [Strongly typed identifier](https://en.wikipedia.org/wiki/Strongly_typed_identifier)

<!--
a_1_b_0
a-1-b-0
-->

## 元数据 {#metadata}

> **Note**
>
> - 元数据不要用于业务依赖
> - 可以创建模板表然后 CREATE TABLE LIKE

| column        | for                                                      |
| ------------- | -------------------------------------------------------- |
| id            | 主键 - ULID, tagged ID                                   |
| sid           | 租户维度单调递增 - 用户友好                              |
| uid           | UUID                                                     |
| tid           | 租户 ID                                                  |
| eid           | 用于导入数据关联 - tid+eid 唯一                          |
| cid           | 外部系统租户 ID - Colocate ID/Corp ID - tid+cid+rid 唯一 |
| rid           | 外部系统资源 ID - Ref ID/Relative ID                     |
| created_at    |
| updated_at    |
| deleted_at    |
| version       | 基于版本的乐观锁                                         |
| metadata      | 补充数据                                                 |
| attributes    | 使用端自定义数据 - 客户端 读写                           |
| properties    | 服务端自定义数据 - 客户端 只读                           |
| extensions    | 内部扩展数据 - 客户端 不可见                             |
| owner_id      | 所有者                                                   |
| owner_type    | User, Team, Department, Organization                     |
| owner_user_id | `case owner_type when 'User' then owner_id end`          |
| owner_team_id | `case owner_type when 'Team' then owner_id end`          |
| entity_id     | 关联任意实体                                             |
| entity_type   |
| created_by_id |
| updated_by_id |
| deleted_by_id |
| state         | 状态 - 面向系统，不可自定义                              |
| status        | 业务状态、阶段、原因、细节 - 可自定义                    |

- eid
  - 同质系统导入外建关联 - 例如: SaaS <-> 现存内部系统
  - 也可能会导出再导入
- cid & rid
  - 非同质系统 - 例如: 服务商、平台
  - -> sourceType+sourceId
  - -> vendorType+vendorId

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
    owner_id            text,
    owner_type          text, -- User, Team, Department
    owner_user_id       text generated always as ( case owner_type when 'User' then owner_id end ) stored,
    owner_team_id       text generated always as ( case owner_type when 'Team' then owner_id end ) stored,
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

## 租户 ID/TID 字符串还是数字 {#choose-tid}

- 不做特殊考虑可选择字符串

---

- 数字
  - 内部好处理
  - 短小好记
  - 不易于迁移
- 字符串
  - 无特殊语义
  - 可以忽略
  - 建议符合 domain 规范，或者能处理为 domain 规范，方便 `<TID>.wener.me` 形式域名访问

# FAQ

## created_at vs create_time

- created_at, `*_at`
  - 语义 准确
  - 与 `created_by_id` 形式上类似
  - 使用: Spring, Gorm 默认
  - 面向 **系统**
- create_time, `*_time`
  - 使用: AIP
  - 面向 **用户**, 业务

## 扩展 {#extension}

- extensions
  - 内部使用
- properties
  - 服务端使用，前端可见
- attributes
  - 前端使用，服务端可见
- metadata
  - 对数据内容的补充说明
- raw
  - 外部导入原始数据
  - 也可以记录到 metadata, properties.raw, extensions.raw

## 单数还是复数表名 {#plural}

> 推荐单数形式。
> 部分关键词使用复数: users, groups。

- 复数
  - 大多框架默认
  - 语义上更准确
  - 逻辑上更复杂
- 单数
  - 代码层面更好统一
  - 但部分单数形式可能需要 quote
  - user 也可以用 `app_user` 之类的作为区分
- 参考
  - https://stackoverflow.com/questions/338156

## 尽量使用外键 {#fk}

- 能一定程度提升查询性能
- 增加部分 插入 和 更新 成本
- 确保业务逻辑准确
- 非强业务看情况

## User Defined Order

- 目前方案
  - 全局使用一个 sequence
  - 存储为 numberic
  - 通过中间值来排序

---

- https://begriffs.com/posts/2018-03-20-user-defined-order.html

## serial id

- 很多时候需要一个有序的 id
  - 例如 自动的客户编号
- 这样的 ID 可能是限定租户或者上下文的

```sql
create table if not exists users
(

  id  text   not null default 'user_' || public.gen_ulid() primary key,
  uid uuid   not null default gen_random_uuid() unique,
  sid bigint not null default next_entity_sid('user')
);
```

```sql
create table if not exists public.entity_sequence
(
  tid        text      not null,
  type_name  text      not null,
  sequence   bigint    not null,
  created_at timestamp not null,
  updated_at timestamp not null,
  primary key (tid, type_name),
  foreign key (tid) references public.tenant (tid)
);

create or replace function public.next_entity_sid(in_type_name text,
                                                  in_tid public.tenant.tid%TYPE = public.current_tenant_id())
  returns bigint
  language plpgsql
  volatile
as
$$
declare
  out_next entity_sequence.sequence%TYPE;
begin
  if in_type_name is null then
    raise exception 'Empty sequence'
      using hint = 'check you table definition';
  end if;
  -- trigger less default computing
  update entity_sequence
  set sequence=sequence + 1
  where tid = in_tid
    and type_name = in_type_name
    and updated_at = now()
  returning sequence into out_next;
  if out_next is null
  then
    insert into entity_sequence(tid, type_name, sequence, created_at, updated_at)
    values (in_tid, in_type_name, 1, now(), now())
    on conflict(tid,type_name) do update set (sequence, updated_at)= (excluded.sequence + 1, excluded.updated_at)
    returning sequence into out_next;
  end if;
  return out_next;
end;
$$;
```

## table prefix vs schema

> - 不要用 public schema
> - SQL 标准里没有 public schema

- schema - crm.account
  - 优点
    - 更好隔离
    - 更好权限控制
    - 名字易读，避免冲突
  - 缺点
    - 增加管理的复杂性
    - 跨 schema 查询复杂
    - schema 某种程度隐含了业务逻辑 - 例如 只支持 PG，启动限定了 schema
      - 也可以作为可配置，类似于以前的 PHP 应用套餐支持修改 table prefix
- prefix - crm_account
  - 优点
    - 简单
    - 查询简便
    - 所有 DB 都支持
  - 缺点
    - 隔离性较差
    - 容易冲突
    - 权限控制复杂

---

- https://www.postgresql.org/docs/current/ddl-schemas.html

## date vs timestamptz

- 建议统一使用 timestamptz
  - 避免处理时区和转换问题
- 建议通过 column 名字来区分, 例如 `start_date timestamptz`

---

- timestamptz
  - 不是 immutable 的，依赖当前 TZ 信息
  - 在 immutable 场景使用时，需要先转换为无 tz 的格式，例如 `payment_time at time zone 'Asia/Shanghai'`
- date
  - 是 immutable 的
  - 但其值取决于当前转换的上下文 TZ
  - 除非确定是 date 的上下文，否则尽量用 timestamptz

## 通过生成实现多态 ID 关联 {#entity_id_type}

- 可以实现外按键关联多态类型

```sql
create table entity_label(
  id                  text        not null default gen_ulid(),

  -- 多态关联，无法外键
  entity_id           text        not null,
  entity_type         text        not null,

  account_id text generated always as ( case entity_type when 'Account' then entity_id end ) stored,

  foreign key (account_id) references account(id),
)
```
