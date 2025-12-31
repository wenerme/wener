---
title: certbot
---

# certbot

- [certbot/certbot](https://github.com/certbot/certbot)
  - Apache-2.0, Python

```bash
certbot certonly --standalone --preferred-challenges tls-sni -d example.com --staple-ocsp -m example@example.com --agree-tos --work-dir . --config-dir ./config --logs-dir ./logs
```
