---
title: Golang Linter
---

# Golang Linter

- vet
- [securego/gosec](https://github.com/securego/gosec)
- [dominikh/go-tools](https://github.com/dominikh/go-tools)

## gofumpt

- 替代 gofmt - 更严格
- [mvdan/gofumpt](https://github.com/mvdan/gofumpt)

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


```go
//nolint
//nolint:golint,unused
//nolint:golint,unused // 解释说明
```

```bash
VER=1.50.1
# curl -LO https://github.com/golangci/golangci-lint/releases/download/v$VER/golangci-lint-$VER-darwin-amd64.tar.gz
curl -LO https://echo.wener.cc/https://github.com/golangci/golangci-lint/releases/download/v$VER/golangci-lint-$VER-darwin-amd64.tar.gz
tar zxvf golangci-lint-$VER-darwin-amd64.tar.gz
mv golangci-lint-$VER-darwin-amd64/golangci-lint ~/go/bin/
```

- https://golangci-lint.run/usage/configuration/
  - https://golangci-lint.run/usage/linters
- Support of generics [#2649](https://github.com/golangci/golangci-lint/issues/2649)
- [golangci/golangci-lint-action](https://github.com/golangci/golangci-lint-action)
- https://github.com/golangci/golangci-lint/blob/master/.golangci.yml
- https://github.com/github/git-sizer/blob/master/.golangci.toml

## revive

- [mgechev/revive](https://github.com/mgechev/revive)

## gocritic

- [go-critic/go-critic](https://github.com/go-critic/go-critic)
- https://go-critic.com/overview.html
