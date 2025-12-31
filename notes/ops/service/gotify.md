---
title: Gotify
tags:
  - Ops
  - Service
  - Notification
---

# Gotify

- [Configuration](https://gotify.net/docs/config)

```bash
# sqlite backend
docker run --rm -it \
  -e GOTIFY_DATABASE_DIALECT=sqlite3 \
  -e GOTIFY_DATABASE_CONNECTION=gotify.db \
  --name gotify gotify/server
```
