---
id: datatype
title: 数据类型
---

# Postgres 数据类型

- [Data Types](https://www.postgresql.org/docs/current/datatype.html)

| type             |
| ---------------- |
| smallint,int2    |
| integer,int,int4 |
| bigint,int8      |

## UUID

- 原生支持 `uuid` 类型 - 底层为 `byte[4]` - 比存字符串效率更高

```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- pg 13 后不需要扩展也能使用该函数
SELECT gen_random_uuid();
```

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
  - 历史遗留 - 不要使用
- 参考
  - [PostgreSQL: Which Datatype should be used for Currency?](https://stackoverflow.com/q/15726535/1870054)
  - [数字类型](https://www.postgresql.org/docs/current/static/datatype-numeric.html)

## 经纬度

- float8 存储单字段
- point 存储两个字段
- 如果使用了 PostGIS 则用 geometry 或 geography 类型
- 参考
  - [Which data type for latitude and longitude?](https://stackoverflow.com/a/8150944/1870054)

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
