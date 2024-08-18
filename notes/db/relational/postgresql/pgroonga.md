---
title: pgroonga
---

# pgroonga

- [pgroonga/pgroonga](https://github.com/pgroonga/pgroonga)
  - 基于 [Groonga](https://groonga.org/)
  - 支持索引 string int array jsonb
- 支持操作
  - &@ 搜索单个关键词
  - &@~ 搜索多个关键词 `Hello OR Hi` - 默认空格间隔为 AND 关系
  - LIKE - `like '%engine%'` -> `&@ 'engine'`
  - ILIKE
  - `&~` 正则
  - `&@*` 相似搜索
- pgroonga_snippet_html - 高亮内容
  - `<span class="keyword">fast</span>`
- [pgroonga_tokenize](https://pgroonga.github.io/reference/functions/pgroonga-tokenize.html)
- 默认 TokenBigram
- double precision pgroonga_score(tableoid, ctid)
  - 分数 - 多少个词匹配

```bash
# 基于 postgres:12-alpine
docker pull groonga/pgroonga:latest-alpine-12
```

```sql
create extension if not exists pgroonga;

CREATE TABLE memos (
  id integer,
  content text
);
CREATE INDEX pgroonga_content_index ON memos USING pgroonga (content);

-- 测试禁用 seqscan 强制走索引
SET enable_seqscan = off;

-- 基于分数排序
SELECT *, pgroonga_score(tableoid, ctid) AS score
FROM score_memos
WHERE content &@ 'PGroonga' OR content &@ 'PostgreSQL'
ORDER BY pgroonga_score(tableoid, ctid) DESC;

-- 如果自己加了 friso 插件，可以注册
SELECT pgroonga_command('register tokenizer/friso');
```

- tokenizer='TokenMecab'
  - Yet Another Part-of-Speech and Morphological Analyzer
  - https://taku910.github.io/mecab/
- https://pgroonga.github.io/v1/reference/create-index-using-pgroonga.html
