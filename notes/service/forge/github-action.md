---
title: Github Action
---

# Github Action

:::caution

- 不支持允许错误 [#399](https://github.com/actions/toolkit/issues/399)

:::

:::info

- golangci-lint-action CI 耗时非常长 [#297](https://github.com/golangci/golangci-lint-action/issues/297)

:::

# FAQ

## compile: version does not match go tool version

```yaml
- name: Run CI
  run: |
    export PATH=${GOROOT}/bin:$PATH
    go version
```

- https://github.com/actions/setup-go/issues/107#issuecomment-854071850
