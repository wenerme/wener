---
title: zinc
---

# zinc

- [zinclabs/zinc](https://github.com/zinclabs/zinc)
  - Apache-2.0, Golang
  - 基于 bluge 索引
  - 部分兼容 Elastic 的搜索服务
- 参考
  - https://mp.weixin.qq.com/s/g9fcKNSEHqwiK8Tt3MY3GA
    - 中文搜索
    - [go-ego/gse](https://github.com/go-ego/gse)
    - [#111](https://github.com/zinclabs/zinc/pull/111)

```bash
# macOS
curl -LO https://github.com/zinclabs/zinc/releases/download/v0.3.5/zinc_0.3.5_Darwin_x86_64.tar.gz
xattr -r -d com.apple.quarantine ./zinc

# http://localhost:4080
# ZINC_PLUGIN_GSE_DICT_PATH=./plugins/gse/dict
# stop.txt, user.txt
# filter gse_stop
mkdir -p ./plugins/gse/dict

ZINC_FIRST_ADMIN_USER=admin ZINC_FIRST_ADMIN_PASSWORD=admin ZINC_PROMETHEUS_ENABLE=true \
  ZINC_PLUGIN_GSE_ENABLE=true ZINC_PLUGIN_GSE_DICT_EMBED=big ./zinc

curl http://admin:admin@localhost:4080/es/_analyze -d '{"analyzer":"gse_standard", "text":"今天天气真真好"}' | jq
curl http://admin:admin@localhost:4080/es/_analyze -d '{"analyzer":"gse_search", "text":"今天天气真真好"}' | jq
```

```http
POST http://admin:admin@localhost:4080/es/_analyze

{"analyzer":"gse_search", "text":"上海文雪发展科技有限公司"}
```

```http
PUT http://admin:admin@localhost:4080/api/index

{
  "name": "comments",
  "mappings": {
    "properties": {
      "content": {
        "type": "text",
        "index": true,
        "highlightable": true,
        "analyzer": "gse_search",
        "search_analyzer": "gse_standard"
      },
      "author": {
        "type": "keyword",
        "index": true,
        "store": false
      },
      "create_time": {
        "type":"time"
      }
    }
  }
}
```

```http
PUT http://admin:admin@localhost:4080/api/comments/_doc

{
  "content": "给狗扔一块肉，肯定会被叼走 给人一点权力的话，他会变得野蛮",
  "author": "SITIS",
  "create_time": "2022-10-29T19:55:40+08:00"
}
```

```http
PUT http://admin:admin@localhost:4080/api/comments/_doc

{
  "content": "政治权谋者为一己私欲发动战争，送愚昧天真的爱国者上前线当炮灰。",
  "author": "SITIS",
  "create_time": "2022-10-29T19:55:40+08:00"
}
```

```http
POST http://admin:admin@localhost:4080/es/comments/_search

{
  "size": 10,
  "query": {
    "match": {
      "content": "权力"
    }
  }
}
```

- https://docs.zincsearch.com/environment-variables/

```txt title="user.txt"
word    frequency   property
```
