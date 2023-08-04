---
title: TimeScale
---

# TimeScale

:::tip

- 适用于
  - 需要时序数据存储
- 不适用于
  - 监控
  - Metrics
- promscale 停止开发 [promscale#1836](https://github.com/timescale/promscale/issues/1836)

:::

- [TimeScale](http://www.timescale.com/)
- [timescale/timescaledb](https://github.com/timescale/timescaledb)
  - Apache-2.0
  - An open-source time-series database optimized for fast ingest and complex queries. Engineered up from PostgreSQL, packaged as an extension.
  - data retention policies, continuous aggregate views, downsampling, data gap-filling, interpolation
- 参考
  - [Problems with PostgreSQL 10 for time-series data](https://blog.timescale.com/time-series-data-postgresql-10-vs-timescaledb-816ee808bac5)
  - [Building a distributed time-series database on PostgreSQL](https://blog.timescale.com/blog/building-a-distributed-time-series-database-on-postgresql/)
  - [timescale/pg_prometheus](https://github.com/timescale/pg_prometheus) - [timescale/prometheus-postgresql-adapter](https://github.com/timescale/prometheus-postgresql-adapter)
    - PostgreSQL extension for Prometheus data
    - 不再使用该结构
  - [timescale/timescale-prometheus](https://github.com/timescale/timescale-prometheus)
    - prometheus 交互新的架构
    - 作为 RemoteStorage
    - prometheus [remote_write](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#remote_write)
  - https://docs.timescaledb.com/using-timescaledb/telemetry
    - `timescaledb.telemetry_level=off`
    - `ALTER [SYSTEM | DATABASE | USER] { *db_name* | *role_specification* } SET timescaledb.telemetry_level=off`
  - [timescale/timescaledb#638](https://github.com/timescale/timescaledb/issues/638) - List of recommended ZFS/Zpool settings

```bash
# 基于 postgres 上游构建的镜像
# https://github.com/timescale/timescaledb-docker
# timescale/timescaledb-postgis 包含 postgis 扩展
docker run --rm -it \
  -p 5432:5432 \
  -v $PWD/data:/var/lib/postgresql/data \
  -e POSTGRES_DB=timescale \
  -e POSTGRES_USER=timescale \
  -e POSTGRES_PASSWORD=timescale \
  --name timescaledb timescale/timescaledb:latest-pg12

# http://localhost:9201/metrics
# -log-level 默认 debug
# -async-acks 在写入到数据库之前响应 - 可能丢但 metric 场景下一般不影响
docker run --rm -it --link timescaledb:db \
  -p 9201:9201 \
  --name ts-prometheus timescale/timescale-prometheus \
  -async-acks \
  -db-host=db -db-name=timescale -db-port=5432 -db-user=timescale -db-password=timescale

prometheus --config.file=prometheus.yml
```

**prometheus.yml**

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node'
    static_configs:
      - targets: ['localhost:9100']

  - job_name: 'tsdb-prom'
    static_configs:
      - targets: ['localhost:9201']

remote_write:
  - url: 'http://localhost:9201/write'
remote_read:
  - url: 'http://localhost:9201/read'
```

## Notes

- create_hypertable
  - chunk_time_interval=7d
  - partitioning_column
  - number_partitions - 基于 partitioning_column 的 hash 分片
  - associated_schema_name=`_timescaledb_internal`
  - associated_table_prefix=`_hyper`
  - replication_factor=timescaledb.hypertable_replication_factor_default
  - https://docs.timescale.com/api/latest/hypertable/create_hypertable/

```sql
SELECT create_hypertable('samples', 'ts', chunk_time_interval => INTERVAL '7 day');

select chunks_detailed_size('samples');
select * from timescaledb_information.chunks;
```

---

- [Architecture & Concepts](https://docs.timescale.com/introduction/architecture)
- https://docs.timescale.com/use-timescale/latest/hypertables/
