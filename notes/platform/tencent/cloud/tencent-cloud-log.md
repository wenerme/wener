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
  - [配额限制](https://cloud.tencent.com/document/product/614/17413)

| 限制                | 值                    | note                                                                                                                                                                                                        |
| ------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 单条日志大小        | 512 KB                | 单条日志写入大小上限；日志组可包含多条日志，不能把单条上限等同于日志组上限                                                                                                                                  |
| SQL 分析语句长度    | 12,000 字符           | 查询文本长度边界；过长时应拆分查询、减少重复 CASE/字段表达式                                                                                                                                                |
| 单 Topic 写请求     | 每分区 500 QPS        | 官方 FAQ；写请求按日志组计算，不等于日志条数                                                                                                                                                                |
| 单 Topic 写流量     | 每分区 5 MB/s         | 官方 FAQ；日志上传会打包并压缩，不能直接按原始日志字节数换算                                                                                                                                                |
| 单 Topic 最大分区   | 50 个                 | 开启主题分区自动分裂时，理论上最多 50 个分区                                                                                                                                                                |
| 单 Topic 最大写能力 | 25,000 QPS / 250 MB/s | 50 个分区 × 每分区上限；实际受账号、地域、资源和压缩/打包影响                                                                                                                                               |
| 读 QPS              | n/a                   | `FailedOperation.ReadQpsLimit`                                                                                                                                                                              |
| 写 QPS              | n/a                   | `FailedOperation.WriteQpsLimit`                                                                                                                                                                             |
| Topic 并发查询      | 公开限制 15 / Topic   | `LimitExceeded.LogSearch`；查询与分析共用该并发额度，Dashboard、告警、定时 SQL 等也会占用。官方基础资源文档允许对不足配额提交工单申请放开，但检索分析文档没有承诺该 15 并发一定可提升，需由腾讯技术支持确认 |
| 检索内存            | n/a                   | `LimitExceeded.SearchResources`                                                                                                                                                                             |
| 单次检索返回体      | 20 MB                 | `LimitExceeded.SearchResultTooLarge`；raw 明细应缩短时间范围、限制字段和行数                                                                                                                                |
| 单次检索日志条数    | n/a                   | `FailedOperation.GetlogReachLimit`；优先使用聚合 SQL，不要拉取宽 raw 明细                                                                                                                                   |
| 检索游标有效性      | 游标可能失效          | `FailedOperation.InvalidContext`；分页/上下文查询失败时需要重新发起检索                                                                                                                                     |
| 短语检索通配词      | 最多匹配 128 个词     | 仅适用于短语内通配符；非短语检索不受此 128 词限制                                                                                                                                                           |
| 统计字段有效长度    | 32,766 字符           | text 字段开启统计后，过长值仅前 32,766 个字符参与 SQL 统计                                                                                                                                                  |

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

```
LogsetId   日志集：管理分类，不存日志
TopicId    日志主题：日志采集、存储、检索的基本单元
BTime
LogGroup
PkgId
PkgLogId
```

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

## 区域

- https://cloud.tencent.com/document/product/614/18940

# FAQ

## LogParseFailure

- 解析失败的日志

## K8S

```yaml
# 单行日志不限制长度，或者不做截断
eks.tke.cloud.tencent.com/stdout-line-size: '-1'

# 轮转后只保留 5 个日志文件
eks.tke.cloud.tencent.com/container-log-max-files: '5'
```

## The request is missing the required parameter "Version".
