---
title: manticoresearch
---

# manticoresearch

- [manticoresoftware/manticoresearch](https://github.com/manticoresoftware/manticoresearch)
  - GPLv2, C++
  - Database for search
  - MySQL 协议和语法
  - 支持 行存、列存、文档存储
  - Replication based on [Galera](https://github.com/codership/galera)
  - forked from Sphinx 2.3.2 in 2017
  - JSON interface
  - cjk, non_cjk
  - 支持 Declarative 定义
- 参考
  - https://play.manticoresearch.com/
  - https://manual.manticoresearch.com/
  - [manticoresoftware/columnar](https://github.com/manticoresoftware/columnar)
    - Apache-2.0
  - [PGM algorithm](https://pgm.di.unipi.it/) 二级索引

:::caution

- 不支持 automatic sharding
- ID 固定为 bigint

:::

| port | for             |
| ---- | --------------- |
| 9306 | mysql           |
| 9308 | HTTP            |
| 9312 | binary protocol |

```bash
# https://hub.docker.com/r/manticoresearch/manticore/
# /var/lib/manticore/
# /etc/manticoresearch/manticore.conf
docker run --rm -it \
  -v $(pwd)/data:/var/lib/manticore \
  -v $(pwd)/manticore.conf:/etc/manticoresearch/manticore.conf \
  -p 127.0.0.1:9306:9306 \
  -p 127.0.0.1:9308:9308 \
  -p 127.0.0.1:9312:9312 \
  --ulimit nofile=65536:65536 \
  --cap-add=IPC_LOCK --ulimit memlock=-1:-1 \
  --name manticore manticoresearch/manticore
docker exec -it manticore mysql -w

curl -s "http://localhost:9308/search"
curl -sX POST http://localhost:9308/cli -d "create table products(title text, price float) morphology='stem_en'"

# macOS
brew install manticoresoftware/manticore/manticoresearch
```

- HTTP
  - /search
  - /cli
  - /insert
  - /update
  - /delete

```sql
-- table 即为一个索引
create table
  movies(title text, year int) morphology = 'stem_en' html_strip = '1' stopwords = 'en';

insert into
  movies(title, year)
values
  ('The Seven Samurai', 1954),
  ('Bonnie and Clyde', 1954),
  ('Reservoir Dogs', 1992),
  ('Airplane!', 1980),
  ('Raging Bull', 1980),
  ('Groundhog Day', 1993),
  (
    '<a href="http://google.com/">Jurassic Park</a>',
    1993
  ),
  ('Ferris Bueller''s Day Off', 1986);

select
  highlight(),
  year
from
  movies
where
  match('the dog');

select
  highlight(),
  year
from
  movies
where
  match('days') facet year;

select
  *
from
  movies
where
  match('google');

-- Column
create table
  idx(title text, type int, price float engine = 'rowwise') engine = 'columnar'
create table
  idx(title text, type int, price float engine = 'columnar');

create table
  idx(title text, type int, price float engine = 'columnar') engine = 'rowwise';

-- 修改 plain index 配置后
-- ALTER TABLE <index_name> RECONFIGURE
```

## HTTP

## Notes

- Real-time index
  - 由多个 plain indexes 组成
  - 可更新 schema
  - 不可以用 indexer
  - 不可以关联 source
  - 生成文件
    - `.lock`
    - `.ram` - RAM chunk
      - rt_mem_limit
    - `.meta` - RT index headers
    - `.*.sp*` - disk chunks
      - optimize_cutoff - chunk 数量
- Plain index
  - 适用于静态数据 - 数据不可修改
  - source+indexer
    - source 必须包含唯一标识符
    - source 支持 main+delta 增量构建
  - 在配置文件中直接配置好
- `string|text [stored|attribute] [indexed]`
  - indexed - FTS
  - stored - docstore, 存储在磁盘, lazy read
  - attribute - 可以 sort, group by
  - `string` 默认 attribute
  - `text` 默认 `stored indexed`
- multi,multi64 - 多值类型
- columnar
  - 不支持存储 JSON
- `fast_fetch='0'`
  - 节省空间，不额外存储到 docstore

```
source source {
  type             = mysql
  sql_host         = localhost
  sql_user         = myuser
  sql_pass         = mypass
  sql_db           = mydb
  sql_query        = SELECT id, title, description, category_id  from mytable
  sql_attr_uint    = category_id
  sql_field_string = title
 }

index idx {
  # plain,rt
  type   = plain
  source = source
  path   = /path/to/index

  stored_fields = title, content
  stored_only_fields = title,content

  rt_field          = subject
  rt_attr_uint      = gid
  rt_attr_bigint    = gid
  rt_attr_multi     = tags
  rt_attr_multi_64  = wide_tags
  rt_attr_float     = lat
  rt_attr_float     = lon
  rt_attr_bool      = available
  rt_attr_string    = title
  rt_attr_json      = properties
  rt_attr_timestamp = date_added
  rt_mem_limit      = 128M

  # plain
  killlist_target = main:kl
  columnar_attrs = *
  columnar_attrs = id, attr1, attr2, attr3
 }
```

## NLP

- Chinese
  - charset_table=chinese or ngram_chars=chinese
  - zh
  - morphology=icu_chinese or ngram_chars=1 correspondingly
  - ICU 更准确

```sql
CREATE TABLE
  products(title text, price float) charset_table = 'cjk' morphology = 'icu_chinese' stopwords = 'zh';

-- n-grams
CREATE TABLE
  products(title text, price float) charset_table = 'non_cjk' ngram_len = '1' ngram_chars = 'cjk';
```

## Kubernetes

- https://github.com/manticoresoftware/manticoresearch-helm

## Cluster

```sql
-- primary
CREATE TABLE
  testrt (title text, content text, gid integer);

CREATE CLUSTER posts;

ALTER CLUSTER posts
ADD
  testrt;

-- replica
JOIN CLUSTER posts AT 'manticore-1:9312';

INSERT INTO
  posts: testrt(title, content, gid)
VALUES
  ('hello', 'world', 1);

-- 类似 sharding 效果
create table
  user type = 'distributed' local = 'user1' local = 'user2';
```
