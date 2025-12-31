---
title: golangci-lint
tags:
  - Lint
---

# golangci-lint

## Installation

```bash
VER=1.50.1
# Official
# curl -LO https://github.com/golangci/golangci-lint/releases/download/v$VER/golangci-lint-$VER-darwin-amd64.tar.gz
# Mirror
curl -LO https://echo.wener.cc/https://github.com/golangci/golangci-lint/releases/download/v$VER/golangci-lint-$VER-darwin-amd64.tar.gz
tar zxvf golangci-lint-$VER-darwin-amd64.tar.gz
mv golangci-lint-$VER-darwin-amd64/golangci-lint ~/go/bin/
```

## Usage

**Ignore rules inside code:**

```go
//nolint
//nolint:golint,unused
//nolint:golint,unused // Explanation
```

## References

- [Configuration Guide](https://golangci-lint.run/usage/configuration/)
- [Linters Reference](https://golangci-lint.run/usage/linters)
- [GitHub Action](https://github.com/golangci/golangci-lint-action)
- [Example .golangci.yml](https://github.com/golangci/golangci-lint/blob/master/.golangci.yml)
