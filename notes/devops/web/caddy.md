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

## Caddyfile

- 环境变量 `{$SITE_ADDRESS}`
  - `{env.HOME}`
- 默认值 `{$DOMAIN:localhost}`
- 占位/变量 - `{}`
  - env.
  - system.{hostname,slash,os,arch,wd}
  - time.now, time.now.{unix,unix_ms,common_log,year}
- 存储位置 $XDG_DATA_HOME/caddy
- Named matchers - `@name`
- 表达式 匹配
  - https://github.com/google/cel-spec

```
@mutable `{method}.startsWith("P")`
expression {method}.startsWith("P")
```

```caddyfile
example.com {
  gzip
  reverse_proxy / 127.0.0.1:9000 {
    transport fastcgi
	}
}

example.com {
	root * /var/www
	file_server
}
```

```caddyfile
# 定义片段
(redirect) {
	@http {
		protocol http
	}
	redir @http https://{host}{uri}
}
(snippet) {
  respond "Yahaha! You found {args.0}!"
}

# 引用片段
import redirect
a.example.com {
	import snippet "Example A"
}
```

```
rewrite * {path}?{query}&host={host}
```

**重写 header 到 path**

- `abc-dev.domain.co` -> `abc/def/{uri}`

```
@parseHost header_regexp parsedHost Host ^([a-z0-9]+)-([a-z0-9]+)\.domain\.co$
root @parseHost /opt/serve/{re.parsedHost.2}/stages/{re.parsedHost.1}
```


- `abc.builds.wener.me` -> `abc/{uri}`
  - `http.request.host.labels` 从 0 开始

```
*.builds.wener.me {
  root * /opt/serve/builds/{http.request.host.labels.3}
  try_files {path} /index.html
  file_server
}


```

## Docker reload

```bash
docker exec -w /etc/caddy caddy caddy reload
```
