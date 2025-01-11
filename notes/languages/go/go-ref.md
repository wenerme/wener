---
tags:
  - Reference
---

# Go Ref

## embed

- go:embed
- `images/*` 会包含 `images/.abc` 而 `images` 不会包含 `._` 开头的文件
- `all:` - `all:images`
  - 修改过滤行为
- https://pkg.go.dev/embed

```go
import _ "embed"

//go:embed hello.txt
var s string
//go:embed hello.txt
var b []byte
//go:embed hello.txt
var f embed.FS

// 多个文件
//go:embed image/* template/*
//go:embed html/index.html
var content embed.FS

//go:embed image template html/index.html
var content embed.FS
```
