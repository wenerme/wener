# CockroachDB

## Tips
* [CockroachDB beta-20160829](https://jepsen.io/analyses/cockroachdb-beta-20160829)
* [Design](https://github.com/cockroachdb/cockroach/blob/master/docs/design.md)
* [CockroachDB: First Impressions](https://opencredo.com/cockroachdb-first-impressions/)

https://www.cockroachlabs.com/docs/stable/migrate-from-mysql.html
https://www.cockroachlabs.com/docs/stable/migrate-from-postgres.html

```bash

brew install cockroach
docker pull cockroachdb/cockroach:v2.1.0

# http://localhost:26256
cockroach start --insecure


```

## 本地集群

```bash
# 第一个节点
cockroach start --insecure --listen-addr=localhost
# 第二个节点
cockroach start \
--insecure \
--store=node2 \
--listen-addr=localhost:26258 \
--http-addr=localhost:8081 \
--join=localhost:26257
# 第三个节点
cockroach start \
--insecure \
--store=node3 \
--listen-addr=localhost:26259 \
--http-addr=localhost:8082 \
--join=localhost:26257

# 命令行
cockroach sql --insecure --host=localhost:26257
```
