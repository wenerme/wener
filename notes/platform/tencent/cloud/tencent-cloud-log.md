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

# FAQ

## LogParseFailure
