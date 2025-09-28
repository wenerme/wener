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

## revive

- [mgechev/revive](https://github.com/mgechev/revive)

## gocritic

- [go-critic/go-critic](https://github.com/go-critic/go-critic)
- https://go-critic.com/overview.html
