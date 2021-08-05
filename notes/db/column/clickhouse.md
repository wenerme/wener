---
title: ClickHouse
---

# ClickHouse

## Tips
* [单页文档](https://clickhouse.yandex/docs/en/single/)
* [wiki/ClickHouse](https://en.wikipedia.org/wiki/ClickHouse)
* [yandex/ClickHouse](https://github.com/yandex/ClickHouse)
* [clickhouse.yandex](https://clickhouse.yandex/)

* 8123 HTTP
* 9000 native client
* 默认库 default
* DataGrip 可以使用 JDBC 连接

https://clickhouse.yandex/docs/en/development/architecture/

```bash
# https://hub.docker.com/r/yandex/clickhouse-server/
docker run -d --name some-clickhouse-server --ulimit nofile=262144:262144 yandex/clickhouse-server

docker run --rm -it -p 8123:8123 -p 9000:9000 --name ch-server --ulimit nofile=262144:262144 -v $PWD/data:/var/lib/clickhouse yandex/clickhouse-server

# 镜像拉取
# docker pull dockerhub.azk8s.cn/library/yandex/clickhouse-server
# docker pull docker.mirrors.ustc.edu.cn/yandex/clickhouse-server

docker run -d --name some-clickhouse-server --ulimit nofile=262144:262144 -v /path/to/your/config.xml:/etc/clickhouse-server/config.xml yandex/clickhouse-server

# Build from source
git clone -b stable --depth 1 --recursive https://github.com/yandex/ClickHouse.git
cd ClickHouse

mkdir build
cd build
apk add libressl-dev
cmake ..
make -j $(nproc)
cd ..

# 启动
clickhouse-server --config-file=/etc/clickhouse-server/config.xml
clickhouse-client --host=example.com

# 导入 CSV
cat my.csv | clickhouse-client --host=example-perftest01j --query="INSERT INTO rankings_tiny FORMAT CSV"
# 导入 TSV, 并计算时间
time clickhouse-client --query="INSERT INTO trips FORMAT TabSeparated" < trips.tsv
```

```sql
COPY(
  SELECT t.id,t.name FROM t
) TO '/opt/data/export.tsv';

-- 从 PostgreSQL 导入
COPY ... TO PROGRAM
```
