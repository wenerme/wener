---
title: croc
---

# croc

- [schollz/croc](https://github.com/schollz/croc)
  - MIT, Go
  - 命令行
  - 依赖 relay，可以 selfhost - tcp 协议
  - 支持 resume
- https://github.com/schollz/croc/issues/453
  - This project needs your help

```bash
brew install croc # macOS

# from Source
git clone https://github.com/schollz/croc.git
cd croc
GOOS=linux GOARCH=amd64 CGO=0 go build -ldflags='-s -w -extldflags "-static"' -o croc-linux-amd64
```

# FAQ

## room not ready

- `--debug`
- relay
  - `[2a01:4ff:f0:23c2::14c:1]:9009`
  - 5.161.69.143:9009
- send 端有 ipv6，接收端没有，使用 --no-local 关闭

```

```
