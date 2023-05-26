---
title: Go Version
tags:
  - Version
---

# Go Version

- [Go-Release-Cycle](https://github.com/golang/go/wiki/Go-Release-Cycle)
  - 一年两个版本 - 2 月，8 月
- bugfix backports 一个版本
- security backports 两个版本
- 参考
  - [golang/proposal](https://github.com/golang/proposal)
    - [golang/go/projects/1](https://github.com/golang/go/projects/1)
  - https://gotipplay.golang.org/
  - [Release History](https://golang.org/doc/devel/release)
  - https://dev.golang.org/release

| ver                | date   | macOS                   | Windows          |
| ------------------ | ------ | ----------------------- | ---------------- |
| [Go 1.21](#go-121) |        | -                       | -                |
| [Go 1.20](#go-120) |        | -                       | -                |
| [Go 1.19](#go-119) | 2022-8 | -                       | -                |
| [Go 1.18](#go-118) | 2022-3 | -                       | 64-bit ARM       |
| [Go 1.17](#go-117) | 2021-8 | macOS 10.13 High Sierra |
| [Go 1.16](#go-116) | 2021-2 | -                       |
| [Go 1.15](#go-115) | 2020-8 | macOS 10.12 Sierra      |
| [Go 1.14](#go-114) | 2020-2 | -                       |
| [Go 1.13](#go-113) | 2019-8 | macOS 10.11 El Capitan  | Windows 7        |
| [Go 1.12](#go-112) | 2019-2 | -                       | -                |
| [Go 1.11](#go-111) | 2018-8 | macOS 10.10 Yosemite    | Windows 7/NT 4.0 |
| [Go 1.10](#go-110) | 2018-2 | OS X 10.8, 10.9         | Windows XP/Vista |

:::tip Roadmap

- 1.18 (2022-2) 会包含部分 generic
- 1.18 fuzz - https://go.dev/blog/fuzz-beta

:::

## Go 1.21

- GOOS=wasip1

## Go 1.20

## Go 1.19

- `fmt.FormatString(State)` - [#51668](https://github.com/golang/go/issues/51668)
- `fmt.Append`,`fmt.Appendf`,`fmt.Appendln`
- `flag.TextVar` - 使用 `encoding.TextUnmarshaler` 解析 - 例如: `big.Int`, `net.IP`, `time.Time`
- `strings.CutPrefix`, `strings.CutSuffix` - [#42537](https://github.com/golang/go/issues/42537)
  - 移除前缀后缀
- `url.JoinPath`
- `time.Duration.Abs()`
- `http.MaxByteError`
- `atomic.Pointer[T]` - 第一个在 std 库中使用 generic 的方法
- `runtime/debug.SetMemoryLimit` - `GOMEMLIMIT` - 更好避免 OOM
- `sort.Find` -
  - `sort.Sort` - pattern defeating quicksort https://arxiv.org/pdf/2106.05123.pdf
- 支持 龙芯 - linux/loong64

## Go 1.18

- [generic](./go-generic.md)
  - 支持类型参数
  - stdlib 这个版本不变
  - constraints -> golang.org/x/exp/constraints
    - 暂时还有异议，不添加到 std
  - golang.org/x/exp/slices
  - golang.org/x/exp/maps
  - 限制 - 可能 Go 1.19 移除
    - 不支持方法或函数内定义 范型
    - 不支持 real, imag, complex
    - 不支持 struct field
    - type alias 不允许 范型
  - 限制
    - 不允许内嵌 类型参数、指针 到 类型参数 作为匿名字段
      - `func Forbit[M any, PT interface {*M}]()`
      - https://stackoverflow.com/questions/71440697
    - union element with more than one term may not contain an interface type with a non-empty method set
  - [why use bracket](https://go.googlesource.com/proposal/+/refs/heads/master/design/43651-type-parameters.md#why-not-use)
- 新增 workspace 工作模式 - [Proposal: Multi-Module Workspaces in cmd/go](https://go.googlesource.com/proposal/+/master/design/45713-workspace.md)
  - 新增 go.work 配置文件 - -workfile
    - go.work.sum
  - 新增 GOWORK 环境变量
- 新增 fuzzing 测试 - https://go.dev/doc/fuzz/
- 新包
  - debug/buildinfo - 内置 VCS 版本信息 -
    - 新增 GOVCS 环境变量
    - 减少使用 -X 场景
    - 构建重现
    - Settings
      - vsc.modified=true - dirty
      - vsc.time
      - vsc.revision=SHA256
      - vsc=git
      - **不会包含 Tag 信息**
        - 因为 tag 可修改
        - tag 可指向多个 - 不可复现
  - net/netip
- 包变化
  - runtime/debug.BuildInfo 增加 GoVersion, Settings
  - testing.F - fuzzing
- Ports
  - 新增 [GOAMD64](./go-build.md#GOAMD64) 环境变量 - 默认 v1
- 参考
  - https://tip.golang.org/doc/go1.18
  - GoLand Generics support - 2022.1 [GO-9515](https://youtrack.jetbrains.com/issue/GO-9515)
  - GoLand Support Go workspaces - 2022.1 [GO-12167](https://youtrack.jetbrains.com/issue/GO-12167)

| env                                           | mean         |
| --------------------------------------------- | ------------ |
| `GOVCS=github.com:git,evil.com:off,\*:gi\|hg` | 部分允许 VCS |
| `GOVCS=*:all`                                 | 所有允许 VCS |
| `GOVCS=*:off`                                 | 关闭 VCS     |

```bash
go work init ./mod ./tools
go work sync
```

```go.work title="go.work"
go 1.17

use (
    ./mod // golang.org/x/mod
    ./tools // golang.org/x/tools
)

replace golang.org/x/net => example.com/fork/net v1.4.5
```

## Go 1.17

- go.mod
  - 支持 lazy 模块
  - 支持 `//Deprecated:` 废弃
- `&T[N]` 转 `*[N]T` - slice 转数组指针 - 长度不够则 `panic`
- `unsafe.Add(ptr, len)` - 指针运算
- `unsafe.Slice(ptr, len)` - 指针 `*T` 转 slice `[]T`
- `// +build` -> `//go:build`
- go run 支持版本 - `go run example.com/cmd@v1.0.0`
- `runtime/cgo.Handle` - cgo 和 go 互转
- 如果 go 版本不同 vendor/modules.txt 会记录版本
- arch
  - macOS 10.13 High Sierra
  - windows/arm64
  - openbsd/mips64 cgo
- [go1.17](https://golang.org/doc/go1.17)
- time
  - 新增 time.UnixMills - 比较好用 - 等同 JS 和 Java 里的 时间戳

```bash
# 升级 go.mod
go mod tidy -go=1.17
# 降级兼容
go mod tidy -compat=1.17
```

## Go 1.16

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
- 包
  - os
    - os.DirEntry -> fs.DirEntry
    - os.DirFS -> fs.FS
    - 增加辅助目录扫描的方法

## Go 1.15

- 较多优化
- 支持转 unsafe.Pointer 为 uintptr
- 废弃 X.509 CommonName - 临时方案 x509ignoreCN=0
- arch
  - 停止 darwin/386
  - 停止 darwin/arm
  - windows
    - ASLR -buildmode=pie
    - Ctrl-C 不再退出 DLL

## Go 1.14

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

## Go 1.13

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

## Go 1.12

- arch
  - linux/ppc64 cgo
  - windows/arm

## Go 1.11

- arch
  - js/wasm

## Go 1.7

- context - https://golang.org/pkg/context
