---
title: Date
---

# 时间日期

- to_timestamp 转 timestamptz
- to_date 转 date
- to_char 转 text
- 参考
  - [Data Type Formatting Functions](https://www.postgresql.org/docs/current/functions-formatting.html)
- ts 支持小数点后六位 - nano 精度

```sql
SELECT TO_DATE('20170103','YYYYMMDD');
SELECT TO_DATE('2020年7月28日','YYYY年MM月DD日');
SELECT TO_CHAR(TO_DATE('2020年7月28日','YYYY年MM月DD日'),'YYYY-MM-DD');

-- ms 转 ts - 支持小数点
select to_timestamp(1630402380252::float / 1000);
-- ts 转 epoch - 包含小数点
select extract(epoch from now());
```

```sql
-- 转换为 DATE
select
  date(now()),
  cast(now() as date),
  to_char(now(), 'YYYY-MM-DD'),
  now()::date,
  extract(month from now()),
  date_part('YEAR',now())
;
```
