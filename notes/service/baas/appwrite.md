---
title: AppWrite
---

# AppWrite

- [docker-compose.yml & .env ](https://gist.github.com/eldadfux/977869ff6bdd7312adfd4e629ee15cc5)
  - `docker-compose up -d --remove-orphans`
  - mariadb, redis, traefik, influxdb, telegraf
  - appwrite 入口 worker-usage, worker-audits, worker-webhooks, worker-tasks, worker-deletes, worker-certificates, worker-functions, worker-mails, appwrite-maintenance, appwrite-schedule

```bash
docker run -it --rm \
  --volume /var/run/docker.sock:/var/run/docker.sock \
  --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
  --entrypoint="install" \
  appwrite/appwrite:0.8.0
```
