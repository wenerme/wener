---
id: caddy
title: Caddy
---

# Caddy

## 概述

* [#1806](https://github.com/mholt/caddy/issues/1806) - Watch Caddyfile for changes

```bash
# macOS 安装
# 不会安装插件
brew install caddy

# 直接启动, 会使用当前目录下的 Caddyfile 作为配置文件
caddy
# 查看安装的插件
caddy -plugins
# 验证配置
caddy -validate -conf Caddyfile

# Docker 启动
# 配置 /etc/Caddyfile 
# root /srv
# cert /root/.caddy 或 CADDYPATH
# 该镜像不包含插件, 插件需要自己构建
docker run --rm -it -v $PWD:/srv -p 2015:2015 abiosoft/caddy
# 包含所有插件
# 其他标签: latest 基于 Alpine, php 添加了 PHP 支持
docker run --rm -it -v $PWD:/srv -p 2015:2015 wener/caddy:full
# 验证配置
docker exec web caddy -validate -conf /caddy/Caddyfile

# 从命令行直接添加配置
caddy -port 8080 browse markdown "log access.log"
# 重载配置
kill -USR1 PID
# 使用 Docker 重载
docker kill -s USR1 web

# 常用的配置
mkdir root
caddy -conf Caddyfile
```

## 信号量处理

Signal|Behavior
----|----
TERM|Forcefully exits the process without executing shutdown hooks.
INT|Forcefully exits the process after executing shutdown hooks. This is the only "signal" that works on Windows (Ctrl+C). A second SIGINT forces immediate termination, even if shutdown hooks are still running.
HUP|Gracefully stops the server, but does not execute shutdown hooks.
QUIT|Gracefully stops the server after executing shutdown hooks.
USR1|Reloads the configuration file, then gracefully restarts the server. This spins up a process with a different process ID.

## 日志配置

* 格式
  * `{common}` - `{remote} - {user} [{when}] \"{method} {uri} {proto}\" {status} {size}`
  * `{combined}` - `{common} \"{>Referer}\" \"{>User-Agent}\"`

```
log requests.log {
	rotate_size 50  # Rotate after 50 MB
	rotate_age  90  # Keep rotated files for 90 days
	rotate_keep 20  # Keep at most 20 log files
	rotate_compress # Compress rotated log files in gzip format
}
```

## Example
```
# 内部文件文档服务
localhost:2016 {
  gzip
  log internal/access-2016.log
  errors visible
  browse
  hugo
  root files
  bind 127.0.0.1
  ext .html .htm .md
}

:80 {
  # startup echo started > start
  gzip
  internal /internal
  log internal/access-8080.log

  # 在 localhost:9180/metrics 查看
  prometheus

  tls {
  	max_certs 10
  }

  # 授权
  basicauth /files wener wener
  # 转发到 /files
  proxy /files http://localhost:2016 {
    # policy round_robin
    # health_check /health
    without /files
    # proxy_header X-Real-IP {remote}
    proxy_header X-Forwarded-Proto {scheme}
    proxy_header X-Forwarded-For {host}
    proxy_header Host {host}
  }

  # 转发远程服务到本地
  proxy /api api.wener.me {
    without /api
  }
  header /api {
    # Access-Control-Allow-Origin  *
    # Access-Control-Allow-Methods "GET, POST, OPTIONS"
    X-Do-Proxy "true"
    -Server
  }
  # 允许 CORS 避过无法直接访问远程的问题
  cors /api http://editor.swagger.io
  jsonp /api

  # 需要通过 JWT_SECRET 环境变量设置
  jwt {
    path /secret.md
    allow role user
  }
}

```

## CHANGELOG

### 0.10.12
* [Caddy 0.10.12 Released with ACMEv2 and Wildcard Certificates](https://caddyserver.com/blog/caddy-0_10_12-released)
* ACMEv2 通配符
* 支持共享挂载 `~/.caddy/acme`
* `{labelN}` 占位符

```
// 1.
*.example.com
tls {
    dns provider
}

// 2. 使用 macro
(wildcard_cert) {
    tls {
        dns provider
        wildcard
    }
}
sub1.example.com {
    import wildcard_cert
    ...
}

sub1000000.example.com {
    import wildcard_cert
    ...
}
```

```
*.example.com
rewrite {
    to /{label1}{uri}
}
```

PDNS_API_KEY 
PDNS_API_URL 地址要以 / 结尾

https://github.com/xenolf/lego/blob/master/providers/dns/pdns/pdns.go

## FAQ

### 禁用重定向 http 到 https

* [#504](https://github.com/mholt/caddy/issues/504)
* https://caddyserver.com/docs/automatic-https
* 目前只能用配置两个的方式来避免

```
http://yousite.com {
  log logs www.chinazs.gov.cn.log
  proxy / upstream
}

https://yousite.com {
  proxy / localhost {
    transparent
  }
}
```

### 在日志文件名中使用占位符
* https://github.com/mholt/caddy/issues/1396
