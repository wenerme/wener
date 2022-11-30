---
title: Caddy
---

# Caddy

- [mholt/caddy](https://github.com/mholt/caddy)
  - Apache-2.0, Golang

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
