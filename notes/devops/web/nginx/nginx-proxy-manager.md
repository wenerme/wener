---
tags:
  - Admin
  - WebUI
---

# nginx-proxy-manager

- [NginxProxyManager/nginx-proxy-manager](https://github.com/NginxProxyManager/nginx-proxy-manager)
  - MIT, JS
  - NPM - nginx-proxy-manager
  - Docker container for managing Nginx proxy hosts with a simple, powerful interface

```bash
# http://127.0.0.1:81
# admin@example.com
# changeme
docker run --rm -it \
  -p 80:80 \
  -p 443:443 \
  -p 81:81 \
  -v $PWD/data:/data \
  -v $PWD/letsencrypt:/etc/letsencrypt \
  --name nginx-proxy-manager \
  jc21/nginx-proxy-manager
```
