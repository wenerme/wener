---
title: qryn
---

# qryn

- [metrico/qryn](https://github.com/metrico/qryn)
  - AGPLv3, Javascript
  - cLoki

```bash
docker run --rm -it \
    -e CLICKHOUSE_SERVER=clickhouse \
    -e CLICKHOUSE_AUTH=qryn:qryn \
    -e CLICKHOUSE_PROTO=http \
    -e CLICKHOUSE_PORT=8123 \
    -e CLICKHOUSE_DB=qryn \
    -p 3100:3100 \
    ghcr.io/metrico/qryn:latest
```






- LogQL
- Tempo API
- Prometheus API
- Elastic API
- POST /influx/api/v2/write Influx API
