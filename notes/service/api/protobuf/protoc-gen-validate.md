---
title: protoc-gen-validate
---

# protoc-gen-validate

- [envoyproxy/protoc-gen-validate](https://github.com/envoyproxy/protoc-gen-validate)
  - 提供校验能力
  - 支持 go,java,cc

```bash
go install github.com/envoyproxy/protoc-gen-validate@latest

# 下载
go get -d github.com/envoyproxy/protoc-gen-validate

protoc \
  -I . \
  -I ${GOPATH}/src \
  -I ${GOPATH}/src/github.com/envoyproxy/protoc-gen-validate \
  --go_out=":../generated" \
  --validate_out="lang=go:../generated" \
  example.proto
```
