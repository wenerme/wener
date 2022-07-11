---
title: Search Engine Awesome
tags:
  - Awesome
---

# Search Engine Awesome

- [Search Benchmark](https://mosuka.github.io/search-benchmark-game/)
- [quickwit-oss/tantivy](https://github.com/quickwit-oss/tantivy)
  - MIT, Rust
  - 等同于基于 Rust 的 Lucene
- 基于 Tantivy
  - [toshi-search/Toshi](https://github.com/toshi-search/Toshi)
    - MIT, Rust
  - [mosuka/bayard](https://github.com/mosuka/bayard)
  - [quickwit-oss/quickwit](https://github.com/quickwit-oss/quickwit)
    - AGPLv3, Rust
    - Like Elasticsearch, but highly reliable & cost-efficient for log management.
  - [lnx-search/lnx](https://github.com/lnx-search/lnx)
- [valeriansaliou/sonic](https://github.com/valeriansaliou/sonic)
  - MPL-2.0, Rust
  - schema-less search backend
  - 非常小巧，对于一个词组默认索引 1000 条记录
- [groonga/groonga](https://github.com/groonga/groonga)
  - LGPL-2.1, C
  - 有 MySQL 和 PostgreSQL 插件 - 非常易用
- [manticoresoftware/manticoresearch](https://github.com/manticoresoftware/manticoresearch)
  - GPL-2.0, C++
  - Database for search
- [typesense/typesense](https://github.com/typesense/typesense)
  - GPL-3.0, C++
  - 不支持 CJK - [typesense/typesense#228](https://github.com/typesense/typesense/issues/228)
- [pisa-engine/pisa](https://github.com/pisa-engine/pisa)
  - Performant Indexes and Search for Academia
- [Apache Lucene Core](https://lucene.apache.org/core/)
- [olivernn/lunr.js](https://github.com/olivernn/lunr.js)
- Apache [nutch](https://nutch.apache.org/)
- [sphinxsearch](http://sphinxsearch.com/)
  - v3 后不开源
- [blevesearch/bleve](https://github.com/blevesearch/bleve)
  - Apache-2.0, Go
- [mosuka/blast](https://github.com/mosuka/blast)
  - 基于 bleve
- [os-fulltext-search-solutions](https://medevel.com/os-fulltext-search-solutions/)
- [gajus/liqe](https://github.com/gajus/liqe)
  - Lucene-like parser and search engine
- [blugelabs/bluge](https://github.com/blugelabs/bluge)
  - Apache-2.0, Go
  - indexing library for Go
- Bluge
  - [prabhatsharma/zinc](https://github.com/prabhatsharma/zinc)
    - Apache-2.0, Go+Vue
    - alternative to elasticsearch
    - 目标是日志分析，不是 ES 兼容 https://github.com/prabhatsharma/zinc/issues/52#issuecomment-1000064449
  - [mosuka/phalanx](https://github.com/mosuka/phalanx)
    - Apache-2.0, Go
    - cloud-native distributed search engine
- [MeiliSearch](https://github.com/meilisearch/MeiliSearch)
  - MIT, Rust
- Vector
  - [facebookresearch/faiss](https://github.com/facebookresearch/faiss)
    - MIT, C++
    - efficient similarity search and clustering of dense vectors
  - [semi-technologies/weaviate](https://github.com/semi-technologies/weaviate)
    - BSD-3, Golang
    - cloud-native, modular, real-time vector search engine
- [wibyweb/wiby](https://github.com/wibyweb/wiby)
  - GPLv2

## Lcoal Search

- [xapian/xapian](https://github.com/xapian/xapian)
- [searx/searx](https://github.com/searx/searx)
- [The Lemur Project](http://www.lemurproject.org/)
- [A Local Search Engine](https://siboehm.com/articles/21/a-local-search-engine)
- [Building Monocle, a universal personal search engine for life](https://thesephist.com/posts/monocle/)
- [recoll](https://www.lesbonscomptes.com/recoll/)
  - desktop full-text search tool
  - [HN](https://news.ycombinator.com/item?id=28950947)

## 中文分词

- [fxsjy/jieba](https://github.com/fxsjy/jieba)
- [hightman/scws](https://github.com/hightman/scws)

## Library

- Golang
  - FST
    - [blevesearch/vellum](https://github.com/blevesearch/vellum)
      - [couchbase/vellum](https://github.com/couchbase/vellum)
- [BurntSushi/fst](https://github.com/BurntSushi/fst)
  - Rust

## Tech

- TF-IDF
- FST - finite state transducer - 有限状态传感器
  - term -> id
  - 实现推荐 - O(length(querry))
  - 共享尾部
  - 内存少于 tire
- DFSA - Deterministric acyclic finite state acceptor - 确定无环有限状态接收机
  - tire-tree
    - 适合英文词典 - 字符集少，唯一前缀少
- Double Array Trie
  - 适合做中文词典，内存占用小
  - https://linux.thai.net/~thep/datrie/datrie.html
- [Ternary Search Tree](https://en.wikipedia.org/wiki/Ternary_search_tree)
- [Ragel](https://en.wikipedia.org/wiki/Ragel)
  - [adrian-thurston/ragel](https://github.com/adrian-thurston/ragel)
  - https://www.colm.net/open-source/ragel/

## Story

- [Index 1,600,000,000 Keys with Automata and Rust](https://blog.burntsushi.net/transducers/)
