---
title: bluge
---

# bluge

- [blugelabs/bluge](https://github.com/blugelabs/bluge)
  - Apache-2.0, Golang
  - 支持字段类型 - Text, Numeric, Date, Geo Point
    - 数字内部表示为 float64 - int 只能精确到 ±2^53
  - 支持查询类型
    - Term, Phrase, Match, Match Phrase, Prefix
    - Conjunction, Disjunction, Boolean
    - Numeric Range, Date Range
    - [BM25](https://en.wikipedia.org/wiki/Okapi_BM25)
  - 支持聚合
    - sum, min, max, avg, weighted avg
    - count
    - duration
    - cardinality estimation
    - quantil approximation
    - buckets
- 参考
  - [blugelabs/query_string](https://github.com/blugelabs/query_string)
    - blevel 形式的查询字符串
  - [blugelabs/ice](https://github.com/blugelabs/ice)
    - segment plugin
  - [blevesearch/segment](https://github.com/blevesearch/segment)
    - Unicode Text Segmentation
    - http://www.unicode.org/reports/tr29/
    - SegmentWords
    - ragel

## Notes

- 默认
  - 搜索字段名 `_all`
  - analyzer.NewStandardAnalyzer
    - tokenizer.UnicodeTokenizer
    - token.LowerCaseFilter
  - similarity.NewBM25Similarity
- analyzer.Analyzer = CharFilters+Tokenizer+TokenFilters
  - 配置里的 默认 analyzer 只用于搜索
  - 每个字段关联 analyzer
- 修改推荐使用 Batch 操作
- 排序
  - `_score`
  - 添加 `-` 前缀 表示 desc
- Tokenizer
  - ExceptionsTokenizer
  - CharacterTokenizer
  - RegexpTokenizer
  - SingleTokenTokenizer
  - UnicodeTokenizer
- 聚合
  - WithStandardAggregations
    - Count
    - Duration
    - max_score
- Query
  - 基于类型的 Searcher
  - FuzzQuery - vellum, Levenshtein
  - Prefix, Regex, Term, TermRange, Wildcard

```go
batch.Insert(doc)
batch.Update(doc.ID(), doc)
batch.Delete(doc)
```
