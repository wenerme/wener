---
title: groonga
---

# groonga

- [groonga/groonga](https://github.com/groonga/groonga)
  - LGPL-2.1, C
  - 搜索引擎和列存储
  - 有 MySQL 和 PostgreSQL 插件
  - 支持嵌入
  - 支持 CS 结构 - Groonga Query Transfer Protocol [GQTP](https://groonga.org/docs/spec/gqtp.html)
- [normalizers](https://groonga.org/docs/reference/normalizers.html)
- [tokenizers](https://groonga.org/docs/reference/tokenizers.html)
- [token filters](http://groonga.org/docs/reference/token_filters.html)
- friso 中文分词
  - [lionsoul2014/friso](https://github.com/lionsoul2014/friso)
  - [groonga/groonga-tokenizer-friso](https://github.com/groonga/groonga-tokenizer-friso)

```bash
# macOS
brew install groonga
groonga -n /tmp/test/test.db  # 创建数据库
groonga /tmp/test/test.db     # 进入数据库

# Docker
docker run -v $PWD/db:/db groonga/groonga /db
```

- status
- table_list
- column_list
- table_create
- column_create
- select
- load
- quite

```bash
status

table_create --name Site --flags TABLE_HASH_KEY --key_type ShortText
select --table Site

column_create --table Site --name title --type ShortText
select --table Site
load --table Site

select --table Site --query _id:1
select --table Site --query '_key:"http://example.org/"'

table_create --name Terms --flags TABLE_PAT_KEY --key_type ShortText --default_tokenizer TokenBigram --normalizer NormalizerAuto
column_create --table Terms --name blog_title --flags COLUMN_INDEX|WITH_POSITION --type Site --source title

# 全文搜索
select --table Site --query title:@this

select --table Site --match_columns title --query this
select --table Site --output_columns _key,title,_score --query title:@test
select --table Site --offset 0 --limit 3

select --table Site --sort_keys -_id
```
