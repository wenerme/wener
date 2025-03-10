---
title: Caddy
---

# Caddy

- [mholt/caddy](https://github.com/mholt/caddy)
  - Apache-2.0, Golang
- 参考
  - [caddy-dns/acmedns](https://github.com/caddy-dns/acmedns)
    - ACME DNS-01 challenge solver for Caddy
  - [caddyserver/ingress](https://github.com/caddyserver/ingress)
    - WIP - not ready for production use

:::caution

- Caddy 有点耗内存，很容易内存就接近 G 级别

:::

```bash
brew install caddy # macOS - /usr/local/etc/Caddyfile

# 启动 并监听配置变化
caddy run --watch --config Caddyfile --adapter caddyfile
# caddy start # 后台启动

caddy build-info
caddy list-modules

caddy reload

# Caddyfile -> JSON
# --validate --pretty
caddy adapt --config Caddyfile | jq
caddy validate Caddyfile
caddy fmt --overwrite Caddyfile

caddy trust # 安装证书
caddy untrust

# 快速启动服务
# ==========
# --root $PWD --listen :80 --templates
caddy file-server --access-log # 文件服务
caddy respond --status 401     # 返回相同响应 - 用于测试

caddy reverse-proxy --to https://wener.me --internal-certs --from :8081 --change-host-header # 反向代理 http://127.0.0.1:8081/

# 包管理
# ==========
caddy add-package github.com/caddy-dns/cloudflare
# caddy remove-package
```

## Docker reload

```bash
docker exec -w /etc/caddy caddy caddy reload

docker exec caddy curl -s http://127.0.0.1:2019/config/
```

## file_server

```bash
caddy file-server export-template
```

- https://github.com/caddyserver/website/blob/master/src/docs/index.html
- https://pastebin.com/9EkfCuhu
- 页面模板 https://github.com/caddyserver/caddy/blob/master/modules/caddyhttp/fileserver/browse.html
- https://caddyserver.com/docs/caddyfile/directives/file_server

## templates

- https://github.com/caddyserver/website/blob/master/src/docs/index.html
- https://caddyserver.com/docs/caddyfile/directives/templates

## docker proxy

- [lucaslorentz/caddy-docker-proxy](https://github.com/lucaslorentz/caddy-docker-proxy)

```bash
docker exec caddy cat /config/caddy/autosave.json
docker exec caddy curl -s http://127.0.0.1:2019/config/
```

```bash
docker network create caddy
```

```yaml
services:
  caddy:
    image: lucaslorentz/caddy-docker-proxy:ci-alpine
    ports:
      - 80:80
      - 443:443
    environment:
      - CADDY_INGRESS_NETWORKS=caddy
    networks:
      - caddy
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - caddy_data:/data
    restart: unless-stopped

networks:
  caddy:
    external: true

volumes:
  caddy_data:
    driver: local
    driver_opts:
      type: none
      device: ./caddy_data
      o: bind
```

## modules

- https://caddyserver.com/docs/modules/
