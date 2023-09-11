---
title: yq
---

# yq

- [mikefarah/yq](https://github.com/mikefarah/yq)
  - MIT, Golang
  - 类似 jq 但支持更多格式和功能
  - 支持 YAML, JSON, XML, CSV, TOML, Properties
  - 支持 inplace 修改 - jq 不可以，有时候非常麻烦
- https://mikefarah.gitbook.io/yq/

```bash
brew install yq

# npm package.json
yq -r '[.name,.version] | join("@")' package.json
```
