---
title: opal
---

## opal

- [permitio/opal](https://github.com/permitio/opal)
  - Apache-2.0, Python
- https://raw.githubusercontent.com/permitio/opal/master/docker/docker-compose-example.yml
  - postgres
    - broadcast
  - permitio/opal-server
    - 7002
  - permitio/opal-client
    - sidecar

```bash
curl -Lo docker-compose.yml https://raw.githubusercontent.com/permitio/opal/master/docker/docker-compose-example.yml
docker-compose up
```
