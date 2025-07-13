---
title: immich
---

# immich

- [immich-app/immich](https://github.com/immich-app/immich)
  - AGPLv3, TS, Dart, Svelte
  - High performance self-hosted photo and video management solution.
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


## docker

- ghcr.io/immich-app/immich-server
- ghcr.io/immich-app/immich-machine-learning
- docker.io/redis
- docker.io/tensorchord/pgvecto-rs
- 查看当前版本号 https://github.com/immich-app/immich/releases/

```bash
curl -LO https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml
curl -L -o .env https://github.com/immich-app/immich/releases/latest/download/example.env
curl -LO https://github.com/immich-app/immich/releases/latest/download/hwaccel.transcoding.yml
curl -LO https://github.com/immich-app/immich/releases/latest/download/hwaccel.ml.yml

# 修改 .env
# IMMICH_VERSION

# 127.0.0.1:2283
docker compose up -d
```
