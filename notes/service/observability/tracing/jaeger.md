---
title: Jaeger
---

# Jaeger

- [jaegertracing/jaeger](https://github.com/jaegertracing/jaeger)
  - from Uber
- 存储
  - 默认内存存储
  - badger - 本地文件存储
  - cassandra - 兼容 scyllab
  - elasticsearch
  - kafka

```bash
# badger 持久存储
docker run -it --rm \
  -v $PWD/data:/badger \
  -e SPAN_STORAGE_TYPE=badger \
  -e BADGER_EPHEMERAL=false \
  -e BADGER_DIRECTORY_VALUE=/badger/data \
  -e BADGER_DIRECTORY_KEY=/badger/key \
  -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 \
  -p5775:5775/udp -p6831:6831/udp -p6832:6832/udp \
  -p5778:5778 -p16686:16686 -p14268:14268 -p9411:9411 \
  jaegertracing/all-in-one:latest
```

| Port  | Protocol | Component | Function                                                                       |
| ----- | -------- | --------- | ------------------------------------------------------------------------------ |
| 5775  | UDP      | agent     | accept zipkin.thrift over compact thrift protocol (deprecated, legacy clients) |
| 6831  | UDP      | agent     | accept jaeger.thrift over compact thrift protocol                              |
| 6832  | UDP      | agent     | accept jaeger.thrift over binary thrift protocol                               |
| 5778  | HTTP     | agent     | serve configs                                                                  |
| 16686 | HTTP     | query     | serve frontend                                                                 |
| 14268 | HTTP     | collector | accept jaeger.thrift directly from clients                                     |
| 14250 | HTTP     | collector | accept model.proto                                                             |
| 9411  | HTTP     | collector | Zipkin compatible endpoint (optional)                                          |
