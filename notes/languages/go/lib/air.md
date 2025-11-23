---
title: air
---

# air

- [air-verse/air](https://github.com/air-verse/air)
  - GPLv3, Go
  - Live Reload

```bash
go install github.com/air-verse/air@latest

air --build.cmd "go build -o bin/api cmd/run.go" --build.bin "./bin/api"
```

## conf

- https://github.com/air-verse/air/blob/master/air_example.toml

# FAQ

## Multiple Services

- air.toml 不能 extends

```makefile
.PHONY: dev-a dev-b

# 通用基础命令
AIR_BASE = air -c air.base.toml

# 启动服务 A
dev-a:
    @$(AIR_BASE) \
    --build.cmd "go build -o ./tmp/a ./cmds/a" \
    --build.bin "tmp/a" \
    --log.prefix "[Air: App A]" \
    --build.include_dir "cmds/a,pkg"

# 启动服务 B
dev-b:
    @$(AIR_BASE) \
    --build.cmd "go build -o ./tmp/b ./cmds/b" \
    --build.bin "tmp/b" \
    --log.prefix "[Air: App B]" \
    --build.include_dir "cmds/b,pkg"

# 使用 overmind 一起启动
dev:
    overmind start -f Procfile.dev
```

```Procfile
app_a: make dev-a
app_b: make dev-b
```
