# Golang Linter

* [securego/gosec](https://github.com/securego/gosec)
* [dominikh/go-tools](https://github.com/dominikh/go-tools)

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
* https://github.com/golangci/golangci-lint/blob/master/.golangci.yml
