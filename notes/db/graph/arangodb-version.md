---
tags:
  - Version
---

# ArangoDB Version

| version        | date       |
| -------------- | ---------- |
| [ArangoDB 3.9] | 2021-02-15 |
| [ArangoDB 3.8] | 2021-07-29 |
| [ArangoDB 3.7] | 2020-08-27 |
| [ArangoDB 3.6] | 2020-08-27 |
| [ArangoDB 3.7] | 2020-08-27 |

[arangodb 3.9]: #arangodb-39
[arangodb 3.8]: #arangodb-38
[arangodb 3.7]: #arangodb-37
[arangodb 3.6]: #arangodb-36
[arangodb 3.7]: #arangodb-37

- [Release Notes](https://www.arangodb.com/docs/stable/release-notes.html)
- ArangoML

## ArangoDB 3.9

- Multi-dimensional Indexes (experimental)
  - zkd
  - https://www.arangodb.com/docs/stable/indexing-multi-dim.html
- AQL Decay 函数
- AQL Vector 函数 - 计算相似
- Upsert with Index Hint
- **Enterprise**
  - Hybrid Smart Graphs

```aql
UPSERT { a: 1234 }
  INSERT { a: 1234, name: "AB"}
  UPDATE {name: "ABC"} IN myCollection
  // hint
  OPTIONS { indexHint: "index_name", forceIndexHint: true }
```

## ArangoDB 3.8
- AQL window 操作 - 分析时间序列数据
- Weighted Traversal
- Pipeline Analyzer
- Search GEO
  - ArangoSearch 支持分析 GeoJSON, GeoPoint
## ArangoDB 3.7

- Fuzzy Search - ArangoSearch
  - N-gram
  - Levenshtein
- Insert-Update, Insert-Ignore
- Schema Validation
- Security Enhancements
  - rotate JWT, TLS
- Cluster Performance
- **Enterprise**
  - Satellite Graphs
  - Disjoint SmartGraphs
  - Parallel Graph Traversals
  - SNI
- https://www.arangodb.com/2020/08/arangodb-3-7-a-big-step-forward-for-multi-model/

## ArangoDB 3.5

- ArangoSearch 搜索支持中文
  - TFIDF BM25
    - 不支持中文

## ArangoDB 3.2

- arangoimp
  - 支持 key 转换
  - 支持 jsonl 格式
  - 可指定类型 auto 通过文件扩展名检测类型
