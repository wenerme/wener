---
title: PostgreSQL 全文检索
tags:
  - FTS
---

# PostgreSQL 全文检索

:::tip 怎么选择

- 简单场景 - 80%: like 或 fuzzystrmatch
  - 数据量少 - 业务数据 - 能够扫表
  - 数据经常变化
- 基础场景 - 15%: 内建 tssearch + 中文分词插件 - zhparser,pg_trgm
  - 数据量大 - 需要索引
  - 检索大量文本
  - 相关性排序
  - 中文分词操作起来有点麻烦，但定制性高
- 扩展场景 - 3%: 不考虑使用内建 FTS 使用 [pgroonga](./pgroonga.md)
  - 需要支持补全和多种语言
- 搜索引擎场景 - 2%: Solr, Elasticsearch
  - 不要使用 PG - 将数据同步到专业的搜索引擎
  - 索引的内容不怎么变化
  - 专门做索引业务
- 扩展场景 - pgvector, postgresql ml
  - 向量化
  - Embedding
  - 理解自然语言
- 特殊场景
  - GEO - PostGIS
  - 寻路 - pgRouting

:::

- pg_trgm
- pg_bgram
- pgroonga
- rum
- zhparser
- 可通过 [postgrespro/rum](https://github.com/postgrespro/rum) 索引提高效率
  - 基于 GIN 索引
  - 排序更快
  - 支持额外字段信息
  - 构建和插入更慢
- 参考
  - https://news.ycombinator.com/item?id=27973497
  - [Do you need a Full-Text Search in PostgreSQL ?](https://www.postgresql.eu/events/pgconfeu2018/sessions/session/2116/slides/137/pgconf.eu-2018-fts.pdf)
  - [zombodb/zombodb](https://github.com/zombodb/zombodb)
  - [pg_search](https://github.com/paradedb/paradedb/tree/dev/pg_search)
    - bm25
- 中文
  - [jaiminpan/pg_jieba](https://github.com/jaiminpan/pg_jieba)
  - [amutu/zhparser](https://github.com/amutu/zhparser)

## rum

- [postgrespro/rum](https://github.com/postgrespro/rum)
  - 基于 GIN
- 比 GIN 好的地方
  - 速度更快
    - 存储更多额外信息来辅助排序 - 例如 词素的位置
    - ts_rank, ts_rank_cd
  - 短语搜索效果更好
  - 允许在索引中与词素一起存储额外的数据
    - 例如 时间戳 做辅助排序
- 比 GIN 差的地方
  - 存储更多信息
  - 构建更新相对更慢

## pg_trgm

- 将文本进行 [ngram](https://en.wikipedia.org/wiki/N-gram) 分词
- `similarity(text, text):real`
  - 计算两个文本的相似度
  - 范围 `[0,1]`，1 完全相同
- `show_trgm(text):text[]`
  - 显示文本的 ngram 分词
- `word_similarity(text, text):real`
  - 计算两个文本的相似度，使用词而不是字符
- `text % text -> boolean`
  - 相似度大于 0.3 / pg_trgm.similarity_threshold
  - 可以被索引
- `text <% text -> boolean`
  - word_similarity, pg_trgm.word_similarity_threshold
  - `>%`
- `text <-> text -> real`
  - 1 - `similarity(text, text)`
  - `<<->` , `<->>`
- 暴力搜索，可以被索引
- 今天天气很好
  - 2 -> `今天 天气 很好`
  - 3 -> `今天天 气很好`
- 支持 multi-byte character
- 需要 collate 和 ctype 不是 C

```sql
-- 查看当前数据库的 collate 和 ctype
-- 需要是 UTF8
SELECT datcollate, datctype
FROM pg_database
WHERE datname = current_database();

create extension pg_trgm;

-- 0.2
select similarity('今天天气很好，你还好么？','今天你好么');

-- 分词
select show_trgm('今天天气很好，你还好么？');

-- 索引
CREATE TABLE words AS SELECT word FROM
        ts_stat('SELECT to_tsvector(''simple'', bodytext) FROM documents');
CREATE INDEX words_idx ON words USING GIN (word gin_trgm_ops);
```

## 模糊搜索

- [模糊匹配](https://www.postgresql.org/docs/current/fuzzystrmatch.html)
- 不能被索引
- 目前 soundex, metaphone, dmetaphone 对 UTF8 支持不太好
- 因此可选项只有 levenshtein

```sql
create extension fuzzystrmatch;

-- 来文斯坦距离
-- 7
select levenshtein('今天天气很好，你还好么？','今天你好么');
```

## zhparser

- 中文分词
- 基于 [scws](http://www.xunsearch.com/scws) 分词
  - [hightman/scws](https://github.com/hightman/scws)

## 内建全文搜索

- 不能支持中文 - 无法分词
- [Full Text Search](https://www.postgresql.org/docs/current/textsearch.html)
- 基于文档的倒排索引
- 使用 GIN 进行索引
- [限制](https://www.postgresql.org/docs/current/textsearch-limitations.html)
  - lexeme < 2Kb
  - tsvector (lexemes + positions) < 1Mb
  - lexemes 数量 < 2^64
  - tsvector 中的位置 > 0 < 16383
  - The match distance in a `<N>` (FOLLOWED BY) tsquery operator cannot be more than 16,384
  - 每个 lexeme 不超过 256 个位置
  - The number of nodes (lexemes + operators) in a tsquery must be less than 32,768
- 类型
  - document - 文档
  - tsvector - 文本搜索向量
  - tsquery - 文本查询对象
- [字典](https://www.postgresql.org/docs/current/textsearch-dictionaries.html)
  - 辅助分词
  - 记录停止词
  - 系统分词存储于 `$SHAREDIR/tsearch_data/english.stop`
    - SHAREDIR - `pg_config --sharedir`

```sql
-- 分词
-- have 和 a 会被去掉 - 'day':4 'nice':3
-- 词后面是位置
-- english 可以写成 pg_catalog.english
SELECT to_tsvector('english', 'have a nice day');
-- 都会保留 - 'a':2 'day':4 'have':1 'nice':3
SELECT to_tsvector('simple', 'have a nice day');
```

```sql
-- 自定义分词
CREATE TEXT SEARCH DICTIONARY public.simple_dict (
    TEMPLATE = pg_catalog.simple,
    STOPWORDS = english
);

ALTER TEXT SEARCH DICTIONARY public.simple_dict ( Accept = false );

SELECT ts_lexize('public.simple_dict','YeS');

-- debug 分词逻辑
SELECT * FROM ts_debug('english', 'Paris');
```
