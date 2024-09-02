---
title: immich
---

# immich

- Helm
  - https://github.com/immich-app/immich-charts
- Docker Compose
  - immich-server
  - immich-machine-learning
  - redis
  - database - PG
  - https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml

```bash

```

```sql
CREATE EXTENSION cube;
CREATE EXTENSION earthdistance;
CREATE EXTENSION vectors;
```

| env                               | default    | notes                       |
| --------------------------------- | ---------- | --------------------------- |
| TZ                                |
| IMMICH_ENV                        | production |
| IMMICH_LOG_LEVEL                  | log        |
| IMMICH_MEDIA_LOCATION             | ./upload   |
| IMMICH_CONFIG_FILE                |
| NO_COLOR                          | false      |
| CPU_CORES                         |
| IMMICH_API_METRICS_PORT           | 8081       |
| IMMICH_MICROSERVICES_METRICS_PORT | 8082       |
| IMMICH_PROCESS_INVALID_IMAGES     |
| IMMICH_TRUSTED_PROXIES            |
| DB_URL                            |
| DB_VECTOR_EXTENSION               | pgvecto.rs | pgvector, pgvecto.rs        |
| DB_SKIP_MIGRATIONS                | false      |
| REDIS_URL                         |            | `ioredis://${base64(json)}` |

- 默认 WORKDIR = /usr/src/app
- https://immich.app/docs/install/environment-variables/
