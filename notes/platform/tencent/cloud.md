---
title: 腾讯云
---

# 腾讯云

| abbr.  | stand for                                | meaning  | notes |
| ------ | ---------------------------------------- | -------- | ----- |
| TKE    | Tencent Kubernetes Engine                |
| CLS    | Cloud Log Service                        |
|        | Ad-hoc analysis                          | 即席分析 |
| COS    | Cloud Object Storage                     |
| TCADP  | Tencent Cloud Agent Development Platform |
| CKafka | Cloud Kafka                              |
| DLC    | Data Lake Compute                        |

- tccli

## 日志

- 查询语法支持 CQL, Lucene, SQL
- 完整内容存储在 `__CONTENT__`

**CQL**

```
(level:ERROR OR level:WARNING) AND pid:1234
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

```
request_body:* | SELECT json_extract_scalar(request_body, '$.model') AS model
```
