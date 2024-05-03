---
title: MiniQuery
---

# MiniQuery

SQL Where like **safe** filter expression for ORM.

**目标**

- 类似 SQL 的 Where 语法
  - 学习成本低
  - 语法友好直观 - 对比 GraphQL 和 Mongo
- 提供安全的查询 - 抽取值作为 binding 参数，避免注入
- 尽量泛化关联关系的处理
  - 例如 `profile.name = "wener"`
    - profile 可能为外部关联可能为 JSON 字段

**Raodmap**

- 利用 schema 预先校验
  - 例如 `profile.name = "wener"`
    - 如果实现支持获取 Scheme，那么可以在查询之前提前检测是否可以执行
- 实现 ACL 控制
  - 同 schema 校验逻辑，但利用 acl 信息
  - 控制可用查询 - 例如: 限制耗时高的查询

### 实现

miniquery 语法层松散，具体实现会加限制，例如 column 必须在左边，哪些函数可以用等。
根据实现的库不同，不一定所有逻辑都能暴露出来。

- java-miniquery
  - nutz - 最早实现，用于内部系统
- [go-miniquery](https://github.com/wenerme/go-miniquery)
  - gorm
  - ent - entsql, entql
- [js-miniquery](https://github.com/wenerme/js-miniquery)
  - sequelize
  - NPM ohm-grammar-miniquery
- https://github.com/wenerme/wode/tree/main/packages/miniquery

---

- 参考
  - [AIP-160](https://google.aip.dev/160) filter
    - 字段名必须在左边

## 参考

- [stalniy/ucast](https://github.com/stalniy/ucast)
  - Universal Conditions AST
  - `@ucast/js`
  - `@ucast/mongo2js`
  - `@ucast/sql`
  - `@ucast/mongo`

## mongodb

| Query          | Desc                                                                                                                                          |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Comparison** |
| `$eq`          | Matches values that are equal to a specified value.                                                                                           |
| `$gt`          | Matches values that are greater than a specified value.                                                                                       |
| `$gte`         | Matches values that are greater than or equal to a specified value.                                                                           |
| `$in`          | Matches any of the values specified in an array.                                                                                              |
| `$lt`          | Matches values that are less than a specified value.                                                                                          |
| `$lte`         | Matches values that are less than or equal to a specified value.                                                                              |
| `$ne`          | Matches all values that are not equal to a specified value.                                                                                   |
| `$nin`         | Matches none of the values specified in an array.                                                                                             |
| **Logical**    |
| `$and`         | Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.                                       |
| `$not`         | Inverts the effect of a query expression and returns documents that do not match the query expression.                                        |
| `$nor`         | Joins query clauses with a logical NOR returns all documents that fail to match both clauses.                                                 |
| `$or`          | Joins query clauses with a logical OR returns all documents that match the conditions of either clause.                                       |
| **Element**    |
| $exists        | Matches documents that have the specified field.                                                                                              |
| $type          | Selects documents if a field is of the specified type.                                                                                        |
| **Evaluation** |
| $expr          | Allows use of aggregation expressions within the query language.                                                                              |
| $jsonSchema    | Validate documents against the given JSON Schema.                                                                                             |
| $mod           | Performs a modulo operation on the value of a field and selects documents with a specified result.                                            |
| $regex         | Selects documents where values match a specified regular expression.                                                                          |
| $text          | Performs text search.                                                                                                                         |
| $where         | Matches documents that satisfy a JavaScript expression.                                                                                       |
| **Geospatial** |
| $geoIntersects | Selects geometries that intersect with a GeoJSON geometry. The 2dsphere index supports $geoIntersects.                                        |
| $geoWithin     | Selects geometries within a bounding GeoJSON geometry. The 2dsphere and 2d indexes support $geoWithin.                                        |
| $near          | Returns geospatial objects in proximity to a point. Requires a geospatial index. The 2dsphere and 2d indexes support $near.                   |
| $nearSphere    | Returns geospatial objects in proximity to a point on a sphere. Requires a geospatial index. The 2dsphere and 2d indexes support $nearSphere. |
| **Array**      |
| $all           | Matches arrays that contain all elements specified in the query.                                                                              |
| $elemMatch     | Selects documents if element in the array field matches all the specified $elemMatch conditions.                                              |
| $size          | Selects documents if the array field is a specified size.                                                                                     |
| **Bitwise**    |
| $bitsAllClear  | Matches numeric or binary values in which a set of bit positions all have a value of 0.                                                       |
| $bitsAllSet    | Matches numeric or binary values in which a set of bit positions all have a value of 1.                                                       |
| $bitsAnyClear  | Matches numeric or binary values in which any bit from a set of bit positions has a value of 0.                                               |
| $bitsAnySet    | Matches numeric or binary values in which any bit from a set of bit positions has a value of 1.                                               |

- https://www.mongodb.com/docs/manual/reference/operator/query/

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

- https://mikro-orm.io/docs/query-conditions

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
