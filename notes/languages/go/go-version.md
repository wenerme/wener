---
title: Go Version
---

# Go Version

- [Go-Release-Cycle](https://github.com/golang/go/wiki/Go-Release-Cycle)
  - 一年两个版本 - 2 月，8 月

:::tip

- 1.18 (2022-2) 会包含部分 generic

:::

| ver  |        | macOS                   | Windows          |
| ---- | ------ | ----------------------- | ---------------- |
| 1.17 | 2021-8 | macOS 10.13 High Sierra |
| 1.16 | 2021-2 | -                       |
| 1.15 | 2020-8 | macOS 10.12 Sierra      |
| 1.14 | 2020-2 | -                       |
| 1.13 | 2019-8 | macOS 10.11 El Capitan  | Windows 7        |
| 1.12 | 2019-2 | -                       | -                |
| 1.11 | 2018-8 | macOS 10.10 Yosemite    | Windows 7/NT 4.0 |

## 1.17

- go.mod
  - 支持 lazy 模块
  - `go mod tidy -go=1.17` - 升级 go.mod
  - `go mod tidy -compat=1.17` - 降级兼容
  - 支持 `//Deprecated:` 废弃
- `&T[N]` 转 `*[N]T` - slice 转数组指针 - 长度不够则 `panic`
- `unsafe.Add(ptr, len)` - 指针运算
- `unsafe.Slice(ptr, len)` - 指针 `*T` 转 slice `[]T`
- `// +build` -> `//go:build`
- go run 支持版本 - `go run example.com/cmd@v1.0.0`
- `runtime/cgo.Handle` - cgo 和 go 互转
- arch
  - macOS 10.13 High Sierra
  - windows/arm64
  - openbsd/mips64 cgo
- [go1.17](https://tip.golang.org/doc/go1.17)

## 1.16

- 支持嵌入文件 `go:embed`
- 新增 io/fs 包
- 废弃大量 ioutil 方法，移到 io 和 os 包
- arch
  - macOS 10.12 Sierra
  - 支持 darwin/amd64
  - iOS 重命名为 ios/arm64 - 之前是 darwin/amd64
  - ios/amd64 - 用于 iOS 模拟器
  - 支持 netbsd/arm64
  - openbsd/mips64 - 不支持 cgo
  - linux/riscv64 支持 cgo, pie
  - 移除 GO386=387, 使用 GO386=softfloat 支持 non-SSE2
- GOVCS
- go list - `go list -exported -f {{.Export}}`
- windows `go build -buildmode=c-shared` 生产 Windows ASLR DLLs
  - 可通过 `--ldflags=-aslr=false` 关闭

## 1.15

- 较多优化
- 支持转 unsafe.Pointer 为 uintptr
- 废弃 X.509 CommonName - 临时方案 x509ignoreCN=0
- arch
  - 停止 darwin/386
  - 停止 darwin/arm
  - windows
    - ASLR -buildmode=pie
    - Ctrl-C 不再退出 DLL

## 1.14

- go module 稳定
- Permit embedding of interfaces with overlapping method sets
- 新增 hash/maphash - 将 bytes 和 string hash 为 int - 用于实现 hash table
- arch
  - 停止 nacl 支持

```go
// 允许重复方法
type ReadWriteCloser interface {
  io.ReadCloser
  io.WriteCloser
}
```

## 1.13

- 支持 0b,0B 表示二进制
- 支持 0o,0O 表示八进制
- 0x 支持浮点数 `0x1.0p-1021`
- 支持下划线分割数字 `1_000`
- shift count 不在要求是 unsigned
- go build -trimpath - 移除构建绝对路径, 用于支持可复现构建
- `go build -o bin/ ./cmd/...` - 目录构建多个输出
- GOPROXY, GOPRIVATE
- sql.NullTime
- errors.Unwrap, errors.Is, errors.As
- TLS 1.3

## 1.12

- arch
  - linux/ppc64 cgo
  - windows/arm

## 1.11

- arch
  - js/wasm
