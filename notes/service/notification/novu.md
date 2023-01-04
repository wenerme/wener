---
title: novu
---

# novu

- [novuhq/novu](https://github.com/novuhq/novu)
  - MIT, Typescript, MongoDB, Redis
  - notifire -> novu
  - Notification Infrastructure

```bash
git clone --depth 1 https://github.com/novuhq/novu
cd novu/docker
cp .env.example ./local/deployment/.env
# redis, mongodb, api, ws, web, widget, embed
docker-compose -f ./local/deployment/docker-compose.yml up
```
