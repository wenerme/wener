---
title: 数据类型
---

# Postgres 数据类型

|                                 type | alias            | desc                                       |
| -----------------------------------: | ---------------- | ------------------------------------------ |
|                               bigint | int8             | 有符号的八字节整数                         |
|                            bigserial | serial8          | 自增的八字节整数                           |
|                           `bit[(n)]` |                  | 固定长度的位串                             |
|                   `bit varying[(n)]` | `varbit[(n)]`    | 可变长度的位串                             |
|                              boolean | bool             | 逻辑布尔值（真/假）                        |
|                                  box |                  | 平面上的矩形框                             |
|                                bytea |                  | 二进制数据（“字节数组”）                   |
|                     `character[(n)]` | `char[(n)]`      | 固定长度的字符串                           |
|             `character varying[(n)]` | `varchar[(n)]`   | 可变长度的字符串                           |
|                                 cidr |                  | IPv4或IPv6网络地址                         |
|                               circle |                  | 平面上的圆                                 |
|                                 date |                  | 日历日期（年，月，日）                     |
|                     double precision | float8           | 双精度浮点数（8字节）                      |
|                                 inet |                  | IPv4或IPv6主机地址                         |
|                              integer | int, int4        | 有符号的四字节整数                         |
|           `interval [ fields ][(p)]` |                  | 时间跨度                                   |
|                                 json |                  | 文本JSON数据                               |
|                                jsonb |                  | 二进制JSON数据，解构后的                   |
|                                 line |                  | 平面上的无限线                             |
|                                 lseg |                  | 平面上的线段                               |
|                              macaddr |                  | MAC（媒体访问控制）地址                    |
|                             macaddr8 |                  | MAC（媒体访问控制）地址（EUI-64格式）      |
|                                money |                  | 货币金额                                   |
|                     `numeric[(p,s)]` | `decimal[(p,s)]` | 可选择精度的精确数字                       |
|                                 path |                  | 平面上的几何路径                           |
|                               pg_lsn |                  | PostgreSQL日志序列号                       |
|                          pg_snapshot |                  | 用户级事务ID快照                           |
|                                point |                  | 平面上的几何点                             |
|                              polygon |                  | 平面上的封闭几何路径                       |
|                                 real | float4           | 单精度浮点数（4字节）                      |
|                             smallint | int2             | 有符号的两字节整数                         |
|                          smallserial | serial2          | 自增的两字节整数                           |
|                               serial | serial4          | 自增的四字节整数                           |
|                                 text |                  | 可变长度的字符串                           |
|      `time[(p)] [without time zone]` |                  | 时间（无时区）                             |
|           `time[(p)] with time zone` | timetz           | 包含时区的时间                             |
| `timestamp[(p)] [without time zone]` |                  | 日期和时间（无时区）                       |
|      `timestamp[(p)] with time zone` | timestamptz      | 包含时区的日期和时间                       |
|                              tsquery |                  | 文本搜索查询                               |
|                             tsvector |                  | 文本搜索文档                               |
|                    ~~txid_snapshot~~ |                  | 用户级事务ID快照（已弃用；见 pg_snapshot） |
|                                 uuid |                  | 通用唯一标识符                             |
|                                  xml |                  | XML数据                                    |

- [Data Types](https://www.postgresql.org/docs/current/datatype.html)

## UUID

- 原生支持 `uuid` 类型 - 底层为 `byte[4]` - 比存字符串效率更高

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- pg 13 后不需要扩展也能使用该函数
SELECT gen_random_uuid();
```

## OID

- [Object Identifier Types](https://www.postgresql.org/docs/current/datatype-oid.html)
- regproc

## 时间日期

- [Date/Time Types](https://www.postgresql.org/docs/current/datatype-datetime.html)

| Name        | Min              | Max             | Resolution | Size     |
| ----------- | ---------------- | --------------- | ---------- | -------- |
| timestamp   | 4713 BC          | 294276 AD       | 微秒       | 8 bytes  |
| timestamptz | 4713 BC          | 294276 AD       | 微秒       | 8 bytes  |
| date        | 4713 BC          | 5874897 AD      | 天         | 4 bytes  |
| time        | 00:00:00         | 24:00:00        | 微秒       | 8 bytes  |
| timetz      | 00:00:00+1459    | 24:00:00-1459   | 微秒       | 12 bytes |
| interval    | -178000000 years | 178000000 years | 微秒       | 16 bytes |

```sql
-- 时区缩写
select * from pg_timezone_abbrevs;
-- 时区名字
select * from pg_timezone_names;
```

## 二进制数据

- [BinaryFilesInDB](https://wiki.postgresql.org/wiki/BinaryFilesInDB)
- 使用 bytea 或 text，都使用 toast
- 单记录最大 1G
- 每个表最多 40 亿 > 2KB 的记录
- 在读写时可能需要编码解码
- 对内存要求较高，即便数据量较少

## 金额类型

- 大部分情况会使用 `decimal(12,2)`
  - `decimal` 是 `numeric` 的别名
  - 也可以考虑直接使用 `integer` 来存分
- [money](https://www.postgresql.org/docs/current/static/datatype-money.html)
  - 功能有限
  - 比 `numeric` 性能更好
  - 历史遗留 - **不要使用**
- 参考
  - [PostgreSQL: Which Datatype should be used for Currency?](https://stackoverflow.com/q/15726535/1870054)
  - [数字类型](https://www.postgresql.org/docs/current/static/datatype-numeric.html)

## 经纬度

- float8 存储单字段
- point 存储两个字段
- 如果使用了 PostGIS 则用 geometry 或 geography 类型
- 参考
  - [Which data type for latitude and longitude?](https://stackoverflow.com/a/8150944/1870054)

## ARRAY

```sql
CREATE TABLE test (
    id serial PRIMARY KEY,
    tags text[]
);

select * from test where 'tag' = ANY(tags);

```

# FAQ

## VARCHAR vs TEXT

- 存储完全相同
- 只是 VARCHAR 会做长度验证
- 建议都使用 TEXT, 在应用层做限制
- 参考
  - [PostgreSQL: Difference between text and varchar (character varying)](https://stackoverflow.com/a/4849030/1870054)

## INT vs BIGINT

- 在 64 位的服务器上, 两者占用的空间相同
- 因此建议使用 bigint
