---
tags:
  - Logging
---

# 腾讯云日志服务

- CLS - Cloud Log Service
- 查询语法支持 CQL, Lucene, SQL
- 服务地址
  - cls.intl.tencentcloudapi.com
  - 国内 `https://${region}.cls.tencentcs.com/`
  - 海外 `https://${region}.cls.tencentyun.com/`
  - `cls.${region}.tencentcloudapi.com`
  - 就近位置 cls.tencentcloudapi.com
    - 非金融区
      - 华东地区（上海金融） cls.ap-shanghai-fsi.tencentcloudapi.com
      - 华南地区（深圳金融） cls.ap-shenzhen-fsi.tencentcloudapi.com
      - 金融区和非金融区是隔离不互通的
- 提供 Elasticsearch 兼容的查询接口
  - `https://${region}.cls.tencentcs.com/elasticsearch/`
  - `https://${region}.cls.tencentyun.com/elasticsearch/`
  - Basic Auth SecretId:SecretKey
- 参考
  - https://cloud.tencent.com/document/product/614
  - [语法规则](https://cloud.tencent.com/document/product/614/47044)

| attr               | for       |
| ------------------ | --------- |
| `__FILENAME__`     | 文件名    |
| `__HOSTNAME__`     | 主机名    |
| `__INDEX_STATUS__` | 索引状态  |
| `__PKGID__`        | 包 ID     |
| `__PKG_LOGID__`    | 包日志 ID |
| `__RAWLOG__`       | 原始日志  |
| `__SOURCE__`       | 来源      |
| `__TIMESTAMP__`    | 时间戳    |
| `__TAG__`          |
| `__CONTENT__`      |

**CQL**

```
(level:ERROR OR level:WARNING) AND pid:1234

key:* # 字段存在
```

**Lucene**

```
timeCost>=20 AND timeCost<=30
warning OR error
```

**SQL**

```
status:4* | SELECT count(*) as error_count, avg(request_time) as avg_latency
```

- approx_distinct
  - 估算 distinct 值
- `__TIMESTAMP__`
- ip_to_province

```
request_body:* | SELECT json_extract_scalar(request_body, '$.model') AS model
```

## CQL

1. 日志查询模式
2. 分析查询模式 `日志查询 | SQL` - 使用 SQL 对日志查询做分析, 例如 `* | select count(*)`

| 语法      | 说明                                                                                                                                           |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| key:value | 键值检索，查询字段（key）的值中包含 value 的日志                                                                                               |
| value     | 全文检索，查询日志全文中包含 value 的日志                                                                                                      |
| AND       | "与"逻辑操作符，不区分大小写                                                                                                                   |
| OR        | "或"逻辑操作符，不区分大小写                                                                                                                   |
| NOT       | "非"逻辑操作符，不区分大小写                                                                                                                   |
| ()        | 逻辑分组操作符，控制逻辑运算优先级                                                                                                             |
| `""`      | 短语检索，使用双引号包裹一个字符串，日志需包含字符串内的各个词，且顺序保持不变。短语检索中不存在逻辑操作符，其等同于查询字符本身。             |
| `''`      | 短语检索，使用单引号包裹一个字符串，功能等价于""，当被检索短语中包含双引号时，可使用单引号包裹该短语，以避免语法错误。                         |
| `*`       | 模糊检索，匹配零个、单个、多个字符。不支持前缀模糊检索                                                                                         |
| `>`       | 范围操作符，表示大于某个数值                                                                                                                   |
| `>=`      | 范围操作符，表示大于等于某个数值                                                                                                               |
| `<`       | 范围操作符，表示小于某个数值                                                                                                                   |
| `<=`      | 范围操作符，表示小于等于某个数值                                                                                                               |
| =         | 范围操作符，表示等于某个数值                                                                                                                   |
| `\`       | 转义符号，转义后的字符表示符号本身。被检索的值包含空格、:、(、)、>、=、<、"、'、`*` 时，需进行转义。                                           |
|           | 使用双引号进行短语检索时，仅需转义"及`*`                                                                                                       |
|           | 使用单引号进行短语检索时，仅需转义'及`*`                                                                                                       |
|           | 未转义的\*代表模糊检索                                                                                                                         |
| `key:*`   | text 类型字段：查询字段（key）存在的日志，无论值是否为空<br>long/double 类型字段：查询字段（key）存在，且值为数值的日志                        |
| key:""    | text 类型字段：查询字段（key）存在且值为空的日志，值仅包含分词符时也等价为空<br>long/double 类型字段：查询字段值不为数值的日志，包含字段不存在 |

**注意** 未使用括号时，AND 优先级高于 OR

```
trace_id:"ABC"
user_id:"ABC"
code:"200"

level:ERROR

# 全文检索
ERROR
# 短语检索
"staus code"

# 逻辑操作符
level:ERROR AND pid:1234
level:ERROR OR level:WARNING
level:(ERROR OR WARNING)
level:ERROR NOT pid:1234
level:ERROR AND NOT pid:1234
level:(ERROR OR WARNING) AND pid:1234

level:(NOT "INFO")

# 短语检索
name:"john Smith"
name:"and"
body:'user_name:"bob"'

# 模糊检索
host:www.test*.com

# 范围操作符
status>400
status:>400
status>=400
status:>=400
status<400
status:<400
status<=400
status:<=400
status=400
status:400
status:("429" OR "500")

# 转义符号
body:user_name\:bob

# 字段存在性检查
url:*
response_time:*

# 空值检查
url:""
response_time:""
```

# FAQ

## LogParseFailure
