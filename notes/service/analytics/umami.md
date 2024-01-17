---
title: umami
---

# umami

- [umami-software/umami](https://github.com/umami-software/umami)
  - MIT, Node + PostgreSQL/MySQL/Clickhouse
  - 符合 GDPR
  - 数据结构 https://github.com/umami-software/umami/blob/master/db/postgresql/schema.prisma

```bash
# admin:admin
# http://127.0.0.1:3000
docker run --rm -it \
  -e DATABASE_URL= \
  -e DATABASE_TYPE=postgresql \
  -e APP_SECRET=$UMANI_APP_SECRET \
  -e DISABLE_TELEMETRY=1 \
  -e IGNORE_IP=127.0.0.1 \
  -p 3000:3000 \
  --name umami ghcr.io/umami-software/umami:postgresql-latest
```

- https://umami.is/docs/environment-variables
- https://umami.is/docs/api
