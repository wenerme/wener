---
title: hysteria
---

# hysteria

- [apernet/hysteria](https://github.com/apernet/hysteria)
- Protocol
  - QUIC
  - https://v2.hysteria.network/docs/developers/Protocol/
- Server - Client -> SOCKS5, HTTP

```bash
docker run --rm -it \
  -v $PWD/hysteria.yaml:/etc/hysteria.yaml \
  -p 8080:8080 \
  --name hysteria tobyxdd/hysteria \
  server -c /etc/hysteria.yaml
```
