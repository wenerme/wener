---
title: Gitlab Repository
---

# Gitlab Repository


## Go Proxy

- GOENV
  - macOS `~/Library/Application Support/go/env`
  - ~/.go/env
  - `$GOPATH/env`
- GOPROXY
  - 默认 https://proxy.golang.org,direct
  - 国内建议 https://goproxy.io,direct
- passworkd 为 PTA 需要 api 和 read_api 权限

```bash
# 建议隔离环境配置
cat "$(go env GOENV)"
go env GOENV

go env -w GOPROXY='https://gitlab.com/api/v4/projects/1234/packages/go,https://goproxy.io,direct'
go env -w GONOSUMDB='gitlab.com/my/project,<previous value>'
```

```netrc title="~/.netrc"
machine <url> login <username> password <token>
```
