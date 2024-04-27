---
title: graphile-worker
---

# graphile-worker

- [graphile/worker](https://github.com/graphile/worker)
  - MIT, TS
  - 支持 cron
  - PostgreSQL
    - LISTEN/NOTIFY
      - pgbouncer 需要 connection 模式

```bash
npm add graphile-worker
```

```bash
docker run \
  --init \
  --rm -it \
  --network=host \
  -v "$PWD/tasks":/worker/tasks \
  graphile/worker \
    -c "postgres://postgres:postgres@localhost:5432/postgres"
```
