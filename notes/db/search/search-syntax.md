---
tags:
  - Syntax
---

# Search Syntax

## Github

**非代码搜索**

- 整数
- 日期
  - YYYY-MM-DD
  - `YYYY-MM-DDTHH:MM:SS+00:00`
  - `YYYY-MM-DDTHH:MM:SSZ`
- 操作符
  - `:`,`:>`,`:>=`,`:<`,`:<=`,`min..max`,`n..*`,`*..n`
  - 排除 `-QUALIFIER`
  - `NOT` - 排除关键词 `hello NOT world`
  - `"a n"` - 作为整体搜索
  - `QUALIFIER:@me` - 用户名 - 特殊情况
  - `is:`
  - `has:`
- 排序
  - sort:interactions, sort:interactions-desc
  - `sort:interactions-asc`

**代码搜索**

- regex
  - `/(?-i)True/`
- `path:`
  - `path:/^MIT.txt$/`
- `symbol:`
  - `symbol:/^String::to_.*/`
- `language:`
- `content:README.md`
- `is:`
  - archived, fork, vendored, generated

---

- repository
  - `in:{name,description,topics,readme}`
  - `repo:owner/name`
  - `user:USERNAME`
  - `org:ORGNAME`
  - `followers:>=n`,`followers:n..n`
  - 整数
    - size - Size in KB
    - stars
    - forks
  - fork:true language:LANGUAGE
  - `topic:TOPIC`
- Searching on GitHub
  - https://docs.github.com/en/search-github/searching-on-github/
- https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax

## Elastic

```http
GET /_search
{
  "query": {
    "query_string": {
      "query": "(new york city) OR (big apple)",
      "default_field": "content"
    }
  }
}
```

- `status:active` - 字段包含
- `title:(quick OR brown)`
- `author:"John Smith"` - 精确匹配
- `book.\*:(quick OR brown)` - 多字段
- `_exists_:title`
  - 字段存在
- `date:[2012-01-01 TO 2012-12-31]`
- `count:[1 TO 5]`
- `tag:{alpha TO omega}` - 不包含边界
- `count:[10 TO *]`
- `date:{* TO 2012-01-01}`
- `count:[1 TO 5}`

```
age:>10
age:>=10
age:<10
age:<=10

age:(>=10 AND <20)
age:(+>=10 +<20)

# boosting
quick^2 fox

# boolean
quick brown +fox -news
```

- https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html

## Mongo

```js
db.students.updateOne({ _id: 3 }, [{ $set: { test3: 98, modified: '$$NOW' } }]);
```

- https://www.mongodb.com/zh-cn/docs/manual/reference/aggregation-variables/
