---
title: Tools
---

# Go Tools

- offcial [golang.org/x/tools/cmd](https://pkg.go.dev/golang.org/x/tools/cmd)
  - bundle, callgraph, digraph, godex, godoc, guru, ssadump
  - eg, gomvpkg, gorename

```bash
# 增强版 go fmt
go install mvdan.cc/gofumpt@latest
# 排序 imports
go install golang.org/x/tools/cmd/goimports@latest

# stringer
# 为 enum/const 生成 String 方法
go install golang.org/x/tools/cmd/stringer@latest

# gomodifytags
# 为 struct 生成 json, yaml tag
go install github.com/fatih/gomodifytags@latest
gomodifytags -file dto.go -struct Server -add-tags json -add-options json=omitempty -transform camelcase --skip-unexported

# gowrap
# 为 interface 生成 实现 - 修饰模式
go install github.com/hexdigest/gowrap/cmd/gowrap@latest
```
