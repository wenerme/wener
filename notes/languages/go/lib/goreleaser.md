---
title: goreleaser
---

# goreleaser

- [goreleaser/goreleaser](https://github.com/goreleaser/goreleaser)
  - 无 cgo 时交叉编译
- CGO 问题 [goreleaser/goreleaser#708](https://github.com/goreleaser/goreleaser/issues/708)

:::tip

- monorepo 为 收费 功能

:::

```bash
# go install github.com/goreleaser/goreleaser@latest
brew install goreleaser

goreleaser init

goreleaser build
goreleaser release --snapshot --rm-dist

goreleaser check
goreleaser build --single-target

# 基于 git tag 做 github release
# export GITHUB_TOKEN="YOUR_GH_TOKEN"
# --skip-publish
goreleaser release
```
