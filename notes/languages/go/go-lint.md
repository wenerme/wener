---
title: Golang Linter
---

# Golang Linter

- vet
- [securego/gosec](https://github.com/securego/gosec)
- [dominikh/go-tools](https://github.com/dominikh/go-tools)

## gosec

```bash
go get github.com/securego/gosec/v2/cmd/gosec
cat <<CONF > gosec.conf.json
{
  "global": {
    "nosec": "enabled",
    "audit": "enabled"
  }
}
CONF
gosec -conf gosec.conf.json ./...
```

## golangci-lint

- https://github.com/golangci/golangci-lint/blob/master/.golangci.yml

```go
//nolint
//nolint:golint,unused
```

```bash
curl -LO https://github.com/golangci/golangci-lint/releases/download/v1.41.1/golangci-lint-1.41.1-darwin-amd64.tar.gz
tar zxvf golangci-lint-1.41.1-darwin-amd64.tar.gz
# curl -LO https://github.com/golangci/golangci-lint/releases/download/v1.32.2/golangci-lint-1.32.2-linux-amd64.tar.gz
```
