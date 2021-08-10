---
title: dgraph
---

# dgraph

- 底层存储 [dgraph-io/badger](https://github.com/dgraph-io/badger)
- 参考
  - [Dgraph Compared to Other Databases](https://dgraph.io/docs/migration/dgraph-compared-to-other-databases/)
- application/dql - 扩展后的 GraphQL
- 组件
  - Dgraph Zero - dgraph zero - 控制数据库集群
  - Dgraph Alpha - dgraph alpha - 提供数据接口和管理接口
  - Ratel - dgraph-ratel

```bash
# standalone 用于测试 - 初次尝试失败
# Ratel UI http://localhost:8000
# API http://localhost:8080
docker run --rm -it \
  -p "8080:8080" -p "9080:9080" -p "8000:8000" \
  -v $PWD/dgraph:/dgraph \
  dgraph/standalone
```
