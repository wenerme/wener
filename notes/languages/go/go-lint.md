---
title: Golang Linter
---

# Golang Linter

- vet
- [securego/gosec](https://github.com/securego/gosec)
- [dominikh/go-tools](https://github.com/dominikh/go-tools)

## gofumpt

- 替代 gofmt - 更严格

```bash
go install mvdan.cc/gofumpt@latest
```

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
VER=1.46.2
# curl -LO https://github.com/golangci/golangci-lint/releases/download/v$VER/golangci-lint-$VER-darwin-amd64.tar.gz
curl -LO https://ghproxy.com/https://github.com/golangci/golangci-lint/releases/download/v$VER/golangci-lint-$VER-darwin-amd64.tar.gz
tar zxvf golangci-lint-$VER-darwin-amd64.tar.gz
mv golangci-lint-$VER-darwin-amd64/golangci-lint ~/go/bin/
```

- [golangci/golangci-lint-action](https://github.com/golangci/golangci-lint-action)

## revive

- [mgechev/revive](https://github.com/mgechev/revive)
