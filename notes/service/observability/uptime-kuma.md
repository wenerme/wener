---
tags:
- Uptime
---

# uptime-kuma

- [louislam/uptime-kuma](https://github.com/louislam/uptime-kuma)
  - MIT, JS, Vue
  - 监控网站 uptime
  - https://demo.uptime.kuma.pet/

```bash
docker run --rm -it \
  -p 3001:3001 \
  -v $PWD/data:/app/data \
  --name uptime-kuma louislam/uptime-kuma:1
```
