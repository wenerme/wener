---
title: Debugging
---

# Go Debug

- [go-delve/delve](https://github.com/go-delve/delve)

```bash
go install github.com/go-delve/delve/cmd/dlv@latest

# 仓库内运行 go.mod
dlv debug --headless --listen=:2345 --api-version=2 --accept-multiclient
# 编译后远程运行
go build -gcflags "all=-N -l" github.com/app/demo
dlv --listen=:2345 --headless=true --api-version=2 --accept-multiclient exec ./demo
```
