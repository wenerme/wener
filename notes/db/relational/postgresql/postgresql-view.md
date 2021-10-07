---
title: 视图
---

# 视图

## 可更新视图

:::caution

- 列没有默认值
- `ON CONFLICT` 无效

:::

- 限制
  - FROM 只能有一个表，可以是另外一个可更新视图
  - 顶级定义不允许包含 WITH, DISTINCT, GROUP BY, HAVING, LIMIT, OFFSET
  - 顶级定义不允许包含集合操作 UNION, INTERSECT, EXCEPT
  - 视图列不允许包含聚合、窗口函数、集合返回函数
- [The pros and cons of updatable views in PostgreSQL](https://hasura.io/blog/the-pros-and-cons-of-updatable-views/)

```sql
CREATE TABLE articles (
  id integer NOT NULL PRIMARY KEY
  , title text NOT NULL
  , description text
  , public bool NOT NULL DEFAULT 'false'
);

CREATE VIEW public_articles AS
  SELECT * FROM articles
  WHERE public;
```
