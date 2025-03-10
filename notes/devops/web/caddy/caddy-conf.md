---
tags:
  - Configuration
---

# Caddyfile

```bash
# Caddyfile to JSON
caddy adapt --config Caddyfile --adapter caddyfile --pretty

# 不支持 SIGUSR1
caddy reload -c /data/Caddyfile
```

- 全局 `{}`
- snippet `(snippet) {}`
- Site block `example.com {}`
- 环境变量 `{$SITE_ADDRESS}`
  - `{env.HOME}`
- 默认值 `{$DOMAIN:localhost}`
- 占位/变量 - `{}`
  - env.
  - system.{hostname,slash,os,arch,wd}
  - time.now, time.now.{unix,unix_ms,common_log,year}
- 存储位置
  - `$XDG_DATA_HOME/caddy`
  - ~/.config/caddy
  - ~/.share/caddy
- Named matchers - `@name`
- 表达式 匹配
  - https://github.com/google/cel-spec
- placeholders
  - https://caddyserver.com/docs/caddyfile/concepts#placeholders
  - https://caddyserver.com/docs/json/apps/http/#docs
  - https://caddyserver.com/docs/conventions#placeholders

:::caution

- log format append 的 value 只支持 global 的 placeholder
  - 因为日志是在 HTTP 请求上下文之外处理的
  - 不支持 per-request placeholders

:::

| directive                           | for                                 |
| ----------------------------------- | ----------------------------------- |
| `handle [<matcgher>]`               |
| `handle_path <path_matcher>`        | handle+uri_strip_prefix             |
| `handle_errors [<status_codes...>]` |
| `route [<matcgher>]`                | 类似 handle, 但只分组不互斥, 不重排 |

```caaddyfile
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

## matcher

- `*`
- `/path`
- `@name` - named matcher
  - path
  - method
  - header
  - EXPRESSION
- Request Matchers
  - client_ip
  - remote_ip
  - `protocol http|https|grpc|http/<version>[+]`
  - method
  - host
  - path
  - path_regexp
  - header
  - header_regexp
  - `query <key>=<val>`
  - not
  - vars
  - vargs_regexp
  - expression
- 参考
  - https://caddyserver.com/docs/caddyfile/matchers

```caddyfile
@postfoo {
	method POST
	path /foo/*
}
```

**多个路径**

```caddyfile
@api {
  path /api
  path /api/*
  path /graphql
  path /graphql/*
}
reverse_proxy @api http://server:3000
reverse_proxy http://console:3000
```
