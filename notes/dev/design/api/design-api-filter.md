---
tags:
  - Filter
---

# Filter

:::tip

- 减少接口数量 - 提升开发效率
- 增加业务灵活性 - 业务变化接口不变
- Query - Source + Selector + Filter + Sort + Pagination
- Condition == Filter

:::

- JSON Path
- XML Path/XPath
- SQL Like/DSL
  - Google Charts 查询语言
    - https://developers.google.com/chart/interactive/docs/querylanguage
  - [MiniQuery](https://wener.me/notes/languages/miniquery)
    - 允许前端直接传类似 where 的语句，后端重写为安全的查询过滤
    - [wenerme/js-miniquery](https://github.com/wenerme/js-miniquery)
  - AIP-160
    - `field > 1`
    - 字段在左边
- Document Query Language / JSON Query DSL
  - 使用 JSON/Object 作为查询条件
  - Apache Solr
  - Druid
    - https://druid.apache.org/docs/latest/api-reference/json-querying-api/
  - MikroORM
    - https://mikro-orm.io/docs/query-conditions
    - https://mikro-orm.io/docs/query-builder
  - CouchDB
    - https://docs.couchdb.org/en/stable/api/database/find.html
  - MongoDB
    - https://www.mongodb.com/docs/manual/reference/operator/query/
    - https://www.mongodb.com/docs/manual/tutorial/query-documents/
  - Elasticsearch
    - https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html
    - https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html
  - https://github.com/stalniy/casl
- Query Builder
  - SDK/API - 不直接暴露数据结构
  - https://firebase.google.com/docs/firestore/query-data/queries
  - knex
  - QueryDSL
- PostgREST
  - `GET /people?age=gte.18&student=is.true HTTP/1.1`
    - `age=gte.18` -> `age > 18`
    - 通过操作过滤
  - `GET /people?or=(age.lt.18,age.gt.21) HTTP/1.1`
    - `age < 18 OR age > 21`
- [kusto](https://learn.microsoft.com/en-us/kusto/) query language / KQL
- [stalniy/ucast](https://github.com/stalniy/ucast)
  - Universal Conditions AST
  - `@ucast/js`
  - `@ucast/mongo2js`
  - `@ucast/sql`
  - `@ucast/mongo`

## mongodb

| Query            | Desc                                                                                      |
| ---------------- | ----------------------------------------------------------------------------------------- |
| **比较运算符**   |
| `$eq`            | 匹配等于指定值的值。                                                                      |
| `$gt`            | 匹配大于指定值的值。                                                                      |
| `$gte`           | 匹配大于或等于指定值的值。                                                                |
| `$in`            | 匹配数组中指定的任何值。                                                                  |
| `$lt`            | 匹配小于指定值的值。                                                                      |
| `$lte`           | 匹配小于或等于指定值的值。                                                                |
| `$ne`            | 匹配不等于指定值的所有值。                                                                |
| `$nin`           | 不匹配数组中指定的任何值。                                                                |
| **逻辑运算符**   |
| `$and`           | 使用逻辑 AND 连接查询子句，返回符合所有子句条件的文档。                                   |
| `$not`           | 反转查询表达式的效果，返回不符合查询表达式的文档。                                        |
| `$nor`           | 使用逻辑 NOR 连接查询子句，返回不符合所有子句条件的文档。                                 |
| `$or`            | 使用逻辑 OR 连接查询子句，返回符合任一子句条件的文档。                                    |
| **元素运算符**   |
| `$exists`        | 匹配具有指定字段的文档。                                                                  |
| `$type`          | 选择字段类型为指定类型的文档。                                                            |
| **评估运算符**   |
| `$expr`          | 允许在查询语言中使用聚合表达式。                                                          |
| `$jsonSchema`    | 根据给定的 JSON Schema 验证文档。                                                         |
| `$mod`           | 对字段值进行模运算，并选择具有指定结果的文档。                                            |
| `$regex`         | 选择值匹配指定正则表达式的文档。                                                          |
| `$text`          | 执行文本搜索。                                                                            |
| `$where`         | 匹配满足 JavaScript 表达式的文档。                                                        |
| **地理空间**     |
| `$geoIntersects` | 选择与 GeoJSON 几何图形相交的几何图形。2dsphere 索引支持 $geoIntersects。                 |
| `$geoWithin`     | 选择边界 GeoJSON 几何图形内的几何图形。2dsphere 和 2d 索引支持 $geoWithin。               |
| `$near`          | 返回接近某点的地理空间对象。需要地理空间索引。2dsphere 和 2d 索引支持 $near。             |
| `$nearSphere`    | 返回接近球面上某点的地理空间对象。需要地理空间索引。2dsphere 和 2d 索引支持 $nearSphere。 |
| **数组运算符**   |
| `$all`           | 匹配包含查询中指定的所有元素的数组。                                                      |
| `$elemMatch`     | 如果数组字段中的元素匹配所有指定的 $elemMatch 条件，则选择文档。                          |
| `$size`          | 选择数组字段大小为指定值的文档。                                                          |
| **位运算符**     |
| `$bitsAllClear`  | 匹配一组位位置都为 0 的数字或二进制值。                                                   |
| `$bitsAllSet`    | 匹配一组位位置都为 1 的数字或二进制值。                                                   |
| `$bitsAnyClear`  | 匹配一组位位置中任何一位为 0 的数字或二进制值。                                           |
| `$bitsAnySet`    | 匹配一组位位置中任何一位为 1 的数字或二进制值。                                           |

- Query & Projection
  - Comparison Query - $eq, $gt, $gte, $in, $lt, $lte, $ne, $nin
  - Logical Query - $and, $not, $nor, $or
  - Element Query - $exists, $type
  - Evaluation Query - $expr, $jsonSchema, $mod, $regex, $text, $where
  - Geospatial Query
  - Array Query - $all, $elemMatch, $size
  - Bitwise Query
  - Projection - $, $elemMatch, $slice
- $expr - MongoDB 3.6+, 2018+
  - 字段比较
  - 计算
  - 复杂筛选逻辑
  - https://www.mongodb.com/docs/manual/reference/operator/query/expr/
  - $eq, $lt, $lte, $gt, $gte

```js
db.monthlyBudget.find({ $expr: { $gt: ['$spent', '$budget'] } });
```

- 参考
  - https://www.mongodb.com/docs/manual/reference/operator/query/
  - 聚合操作 https://www.mongodb.com/docs/manual/reference/operator/aggregation/

## mikro-orm

| 操作符         | SQL         | 描述                                                      |
| -------------- | ----------- | --------------------------------------------------------- |
| **比较**       |
| `$eq`          | `=`         | 匹配等于指定值的值。                                      |
| `$gt`          | `>`         | 匹配大于指定值的值。                                      |
| `$gte`         | `>=`        | 匹配大于或等于指定值的值。                                |
| `$in`          | `IN`        | 匹配数组中指定的任何值。                                  |
| `$lt`          | `<`         | 匹配小于指定值的值。                                      |
| `$lte`         | `<=`        | 匹配小于或等于指定值的值。                                |
| `$ne`          | `<>`        | 匹配不等于指定值的所有值。                                |
| `$nin`         | `NOT IN`    | 不匹配数组中指定的任何值。                                |
| `$like`        | `LIKE`      | 使用 LIKE 操作符。                                        |
| `$re`          | `REGEXP`    | 使用 REGEXP 操作符。                                      |
| `$fulltext`    | `FULL TEXT` | 使用驱动特定的全文搜索功能。                              |
| `$ilike`       | `ILIKE`     | 仅限 PostgreSQL。                                         |
| `$overlap`     | `&&`        | 仅限 PostgreSQL。                                         |
| `$contains`    | `@>`        | 仅限 PostgreSQL。                                         |
| `$contained`   | `<@`        | 仅限 PostgreSQL。                                         |
| `$hasKey`      | `?`         | 仅限 PostgreSQL。                                         |
| `$hasSomeKeys` | `?\|`       | 仅限 PostgreSQL。                                         |
| `$hasKeys`     | `?&`        | 仅限 PostgreSQL。                                         |
| **逻辑**       |
| `$and`         | `AND`       | 用逻辑 AND 连接查询子句，返回符合两个子句条件的所有文档。 |
| `$not`         | `NOT`       | 反转查询表达式的效果，返回不符合查询表达式的文档。        |
| `$or`          | `OR`        | 用逻辑 OR 连接查询子句，返回符合任一子句条件的所有文档。  |
| **集合**       |
| `$some`        | `= ANY`     | 查找至少有一条记录符合条件的集合。                        |
| `$none`        | `<> ANY`    | 查找没有任何记录符合条件的集合。                          |
| `$every`       |             | 查找所有记录均符合条件的集合。                            |

```ts
const query = [
  //
  { [sql`(select ${1} = ${1})`]: [] },
  { [raw('length(perex)')]: { $gt: 10000 } },
  { [sql`lower(name)`]: name.toLowerCase() },
  { time: sql`now()` },
  { [raw(alias => `lower(${alias}.name)`)]: name.toLowerCase() },
  // 函数
  { [sql.upper('title')]: 'TITLE' },
  // 字段引用
  { foo: sql.ref('bar') },
];
```

- https://mikro-orm.io/docs/query-conditions
- https://mikro-orm.io/docs/raw-queries

## hasura

- 类似 mongo 的语法
- 使用 `_` 前缀 - `$` 在 graphql 里表示变量
- Equality - `_eq`, `_neq`
- Greater than or less than - `_gt`, `_lt`, `_gte`, `_lte`
- List based search - `_in`
- Filter or check for null - `_is_null`
- `_not`
- `_and`, `_or`
- Text - `_like`, `_nlike`, `_ilike`, `_nilike`, `_similar`, `_nsimilar`, `_regex`, `_nregex`, `_iregex`, `_niregex`
- `_cast` - `where:{ address: {_cast: {String: {_ilike: "%bengaluru%"}}} }`
- 参考
  - https://hasura.io/docs/3.0/graphql-api/queries/filters/index/

## supabase

- Operator
  - eq, neq, gt, gte, in, lt, lte, is, startsWith, like, ilike, regex, iregex
- https://supabase.com/docs/guides/graphql/api

```graphql
input BlogFilter {
  nodeId: IDFilter
  id: IntFilter
  name: StringFilter
  description: StringFilter
  createdAt: DatetimeFilter
  updatedAt: DatetimeFilter
  and: [BlogFilter!]
  or: [BlogFilter!]
  not: BlogFilter
}

"""
查询数据的根类型
"""
type Query {
  """
  可分页的`Blog`类型集合
  """
  blogCollection(
    """
    查询集合中的前`n`个记录
    """
    first: Int

    """
    查询集合中的后`n`个记录
    """
    last: Int

    """
    查询提供的游标之前的集合中的值
    """
    before: Cursor

    """
    查询提供的游标之后的集合中的值
    """
    after: Cursor

    """
    从游标后跳过n个值。游标分页的替代方案。不支持向后分页。
    """
    offset: Int

    """
    查询集合时应用到结果集的过滤器
    """
    filter: BlogFilter

    """
    应用到集合的排序顺序
    """
    orderBy: [BlogOrderBy!]
  ): BlogConnection
}
```

# FAQ

## Condition vs Filter

- Condition - 条件
  - 条件描述
  - 更广泛
  - if-then-else / switch-case
  - 逻辑判断、决策分支、程序逻辑、业务规则
  - 侧重于状态或业务逻辑
  - 强调 **单个对象** 自身状态或逻辑分支
- Filter - 过滤器
  - 条件的一种具体用途
  - 对 Collection/集合 进行保留筛选 - 减少数据
  - 侧重于数据，用途明确
  - 多用于 API/RESTful/GraphQL
