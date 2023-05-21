---
title: ZincObserve
---

# ZincObserve

- [zinclabs/zincobserve](https://github.com/zinclabs/zincobserve)
  - Apache-2.0, Rust
  - 从 ZincSearch 演化而来
  - Log & Trace

```bash
docker run --rm -it \
  -v $PWD/data:/data \
  -e ZO_DATA_DIR="/data" \
  -e ZO_ROOT_USER_EMAIL=root@example.com -e ZO_ROOT_USER_PASSWORD=PASSWORD \
  -e ZO_TELEMETRY=false \
  -p 5080:5080 \
  --name zincobserve public.ecr.aws/zinclabs/zincobserve:latest
```

```http
POST /api/{organization}/{stream}/_json

[{}]
```

- organization
- stream

```bash
curl -X POST zincobserve:5080/api/default/default/_json --user $ZO_USER --password $ZO_PASSWORD -d '[]'
```

- $DATA/stream/files/ORG/{logs|metrics}/NAME/YRAR/MONTH/DAY/HOUR/ID.parquet
- $DTAT/db
- $DTAT/wal

## API

- http://zincobserve.monitoring-system:5080/api/default/prometheus/api/v1/
- Grafana
  - /api/default/prometheus
