---
title: roadrunner
---

# roadrunner

- [roadrunner-server](https://github.com/roadrunner-server)
  - [roadrunner](https://github.com/roadrunner-server/roadrunner)
    - MIT, Go
    - load-balancer, process manager written in Golang
  - [goridge](https://github.com/roadrunner-server/goridge)
    - PHP-to-Golang IPC/RPC bridge
  - [endure](https://github.com/roadrunner-server/endure)
    - Fault-tolerant service container for Golang applications
  - [sdk](https://github.com/roadrunner-server/sdk)
  - [api](https://github.com/roadrunner-server/api)
    - protobuf
- [spiral/framework](https://github.com/spiral/framework)
  - MIT, PHP
  - 基于 RoadRunner
  - Long-Living PHP Framework
- https://roadrunner.dev/docs/plugins-jobs/2.x/en

```bash
composer require spiral/roadrunner:v2.0 nyholm/psr7
./vendor/bin/rr get-binary

# Docker
# https://hub.docker.com/r/spiralscout/roadrunner

# 镜像
composer config repo.packagist composer https://packagist.phpcomposer.com
```

## 配置

- [.rr.yaml](https://github.com/roadrunner-server/roadrunner/blob/master/.rr.yaml)

```yaml
version: '2.7'

rpc:
  listen: tcp://127.0.0.1:6001

server:
  # 主入口
  command: 'php psr-worker.php'
  env:
    - KEY: 'VALUE'

logs:
  # development, production, raw
  mode: development
  # panic, error, warn, info, debug
  level: debug
  # console, json
  encoding: console
  # stderr, stdout, /var/log/rr.log
  output: stderr
  err_output: stderr
  file_logger_options:

  # log for plugins
  channels:
    http:
    server:
    rpc:

temporal:
  address: 127.0.0.1:7233

kv:
  mem-store:
    # boltdb, redis, memcached, memory
    driver: memory

# 服务插件
service:

# HTTP 插件
http:
  address: 127.0.0.1:8080
  trusted_subnets: ['10.0.0.0/8', '127.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16', '::1/128', 'fc00::/7', 'fe80::/10']
  cache:
    driver: memory
    cache_methods: ['GET', 'HEAD', 'POST']
    config: {}
  uploads:
    # $TEMP
    dir: ''
    forbid: ['.php', '.exe', '.bat', '.sh']
    allow: []
  headers:
    cors:
    request:
    response:
  static:
    dir: '.'
    forbid: []
    calculate_etag: false
    weak: false
    allow: ['.txt', '.php']
    request:
    response:
  pool:
    debug: false
  ssl:
    acme:
  fcgi:
  http2:
    h2c: false
    max_concurrent_streams: 128
# broadcast driver for the websockets
redis:
websockets:
  broker: default-redis
broadcast:
metrics:
  address: '127.0.0.1:2112'

status:
  address: 127.0.0.1:2114
  unavailable_status_code: 503

reload:
  interval: 1s
  patterns: ['.php']
  services:

# NATS jobs driver
nats:
  addr: nats://127.0.0.1:4222

jobs:

grpc:
  listen: 'tcp://localhost:9001'
  proto:
    - 'first.proto'
    - 'second.proto'
```

## spiral

```bash
composer create-project spiral/app
cd app
php ./app.php configure
```

# FAQ

## Could not find package spiral/roadrunner

fixed by change composer repo
