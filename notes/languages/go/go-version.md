---
title: Go Version
---

# Go Version

## 1.13

- go build -trimpath - 移除构建绝对路径, 用于支持可复现构建
- `go build -o bin/ ./cmd/...` - 目录构建多个输出
- GOPROXY, GOPRIVATE
- sql.NullTime
- errors.Unwrap, errors.Is, errors.As
