# CockroachDB

## Tips
* BSL 协议
  * Can host CockroachDB as a service for internal use at organization
  *  third parties cannot modify table schemas.
* [Design](https://github.com/cockroachdb/cockroach/blob/master/docs/design.md)
* [Known Limitations](https://www.cockroachlabs.com/docs/stable/known-limitations.html)
  * Database and table renames are not transactional
  * DISTINCT operations cannot operate over JSON values

https://www.cockroachlabs.com/docs/stable/migrate-from-mysql.html
https://www.cockroachlabs.com/docs/stable/migrate-from-postgres.html


https://www.cockroachlabs.com/docs/stable/postgresql-compatibility.html
CockroachDB is compatible with PostgreSQL 9.5 and works with majority of PostgreSQL database

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
