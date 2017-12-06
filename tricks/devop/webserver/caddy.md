# Caddy

## 信号量处理

Signal|Behavior
----|----
TERM|Forcefully exits the process without executing shutdown hooks.
INT|Forcefully exits the process after executing shutdown hooks. This is the only "signal" that works on Windows (Ctrl+C). A second SIGINT forces immediate termination, even if shutdown hooks are still running.
HUP|Gracefully stops the server, but does not execute shutdown hooks.
QUIT|Gracefully stops the server after executing shutdown hooks.
USR1|Reloads the configuration file, then gracefully restarts the server. This spins up a process with a different process ID.


## Tips
```bash
# 从命令行直接添加配置
caddy -port 8080 browse markdown "log access.log"
# 重载配置
kill -USR1 PID
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
