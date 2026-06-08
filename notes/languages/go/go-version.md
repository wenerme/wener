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

| ver                | date   | EOL        | macOS                   | Windows                                |
| ------------------ | ------ | ---------- | ----------------------- | -------------------------------------- |
| [Go 1.26](#go-126) | 2026-2 | 2027-02 | macOS 12+               | 移除 32-bit windows/arm                |
| [Go 1.25](#go-125) | 2025-8 | 2026-08 | macOS 12+               | 最后包含 32-bit windows/arm            |
| [Go 1.24](#go-124) | 2025-2 | 2026-02-10   | macOS 11+               | 32-bit windows/arm 标记 broken         |
| [Go 1.23](#go-123) | 2024-8 | 2025-08-12   | macOS 11+               |                                        |
| [Go 1.22](#go-122) | 2024-2 | 2025-02-11   |                         |                                        |
| [Go 1.21](#go-121) | 2023-8 | 2024-08-13   | macOS 10.15+            | Windows 10+, Server 2016+              |
| [Go 1.20](#go-120) | 2023-2 | 2024-02-06   | macOS 10.13, 10.14      | Windows 7, 8, Server 2008, Server 2012 |
| [Go 1.19](#go-119) | 2022-8 | 2023-08-08   | -                       | -                                      |
| [Go 1.18](#go-118) | 2022-3 | 2023-02-01   | -                       | 64-bit ARM                             |
| [Go 1.17](#go-117) | 2021-8 | 2022-08-02   | macOS 10.13 High Sierra |                                        |
| [Go 1.16](#go-116) | 2021-2 | 2022-03-15   | -                       |                                        |
| [Go 1.15](#go-115) | 2020-8 | 2021-08-16   | macOS 10.12 Sierra      |                                        |
| [Go 1.14](#go-114) | 2020-2 | 2021-02-16   | -                       |                                        |
| [Go 1.13](#go-113) | 2019-8 | 2020-08-11   | macOS 10.11 El Capitan  | Windows 7                              |
| [Go 1.12](#go-112) | 2019-2 | 2020-02-25   | -                       | -                                      |
| [Go 1.11](#go-111) | 2018-8 | 2019-09-03   | macOS 10.10 Yosemite    | Windows 7/NT 4.0                       |
| [Go 1.10](#go-110) | 2018-2 | 2019-02-25   | OS X 10.8, 10.9         | Windows XP/Vista                       |

- EOL 按官方 Release Policy 推算：每个大版本支持到后面两个大版本发布；未来版本 EOL 使用预计月份。

:::tip Roadmap

- 1.18 (2022-2) 会包含部分 generic
- 1.18 fuzz - https://go.dev/blog/fuzz-beta

:::

## Go 1.26

- 语言
  - `new(expr)`：`new` 可以直接接表达式并返回其地址，适合 optional pointer 字段初始化。
  - 泛型类型参数列表允许自引用约束，例如 `type Adder[A Adder[A]] interface{ ... }`。
- 工具链
  - `go fix` 重做为 modernizers，基于 `go vet`/analysis 框架，面向自动迁移到新语言和标准库惯用法。
  - `go mod init` 默认生成低一个 minor 的 `go` 版本，鼓励新模块兼容当前仍支持的 Go 版本。
  - 删除 `cmd/doc` 与 `go tool doc`，使用 `go doc`。
  - `pprof -http` 默认打开 flame graph 视图。
- Runtime/性能
  - Green Tea GC 默认启用；Go 1.25 中为实验特性，目标是降低大量小对象场景的标记/扫描开销。
  - cgo call 基线开销约降低 30%。
  - 64-bit 平台 heap base address randomization，提升 cgo 相关内存利用漏洞的攻击难度。
  - 实验性 goroutine leak profile：`GOEXPERIMENT=goroutineleakprofile`，可通过 GC 可达性发现一类永久阻塞 goroutine。
- 标准库
  - 新增 `crypto/hpke`，实现 RFC 9180 HPKE，包含后量子 hybrid KEM 支持。
  - 实验性 `simd/archsimd`：`GOEXPERIMENT=simd`，amd64 架构专用 SIMD API。
  - 实验性 `runtime/secret`：`GOEXPERIMENT=runtimesecret`，辅助清除处理 secret 时产生的临时值。
  - `errors.AsType[T]`：类型安全、泛型版 `errors.As`。
  - `image/jpeg` 编解码器替换为更快、更准确实现；依赖 bit-for-bit 输出的测试可能需要更新。
  - `io.ReadAll` 降低中间分配，通常更快。
  - `log/slog.NewMultiHandler`。
  - `net/http/httputil.ReverseProxy.Director` 废弃，推荐 `Rewrite`，避免 hop-by-hop header 安全问题。
  - `testing.T/B/F.ArtifactDir` 配合 `go test -artifacts` 保存测试产物。
- 安全/加密
  - 新增抽象 KEM 接口 `crypto.Encapsulator`/`crypto.Decapsulator`。
  - `crypto/*` 多处不再尊重传入的自定义随机源，改用安全随机；测试用 `testing/cryptotest.SetGlobalRandom`。
  - TLS 默认启用更多后量子 hybrid key exchange；可用 GODEBUG 或 `CurvePreferences` 关闭。
- 平台
  - Go 1.26 最后支持 macOS 12 Monterey；Go 1.27 将要求 macOS 13+。
  - 移除 32-bit `windows/arm`。
  - `linux/riscv64` 支持 race detector。
- 升级关注
  - `go fix` 自动现代化应先看 diff。
  - 依赖旧 `go tool doc`、旧 JPEG bitstream、旧 crypto 自定义随机源、ReverseProxy `Director` 的代码需要检查。
  - 新 GC 默认启用，低延迟/GC-heavy 服务建议压测。
- 参考
  - https://go.dev/doc/go1.26
  - https://go.dev/blog/go1.26

## Go 1.25

- 语言
  - 没有影响程序的新语法；spec 中移除 core types 概念，改为专门文字描述。
- 工具链
  - `go build -asan` 默认在退出时做 C allocation leak detection；可用 `ASAN_OPTIONS=detect_leaks=0` 关闭。
  - 发行包减少预构建 tool binary，非核心工具按需由 `go tool` 构建运行。
  - `go.mod` 新增 `ignore` directive：让 `go` 命令在匹配 `all`、`./...` 时忽略目录。
  - `go doc -http` 启动文档服务器。
  - `go version -m -json` 输出二进制内嵌 `runtime/debug.BuildInfo` 的 JSON。
  - 新增 `work` package pattern，匹配工作模块/工作区模块内所有包。
  - 更新 `go` line 时不再自动加当前 toolchain line。
  - `go vet` 新增 `waitgroup`、`hostport` analyzer。
- Runtime/性能
  - container-aware `GOMAXPROCS`：Linux 下默认考虑 cgroup CPU limit，并可周期更新；手动设置 `GOMAXPROCS` 后关闭。
  - 实验性 Green Tea GC：`GOEXPERIMENT=greenteagc`，目标降低 GC-heavy 程序 10–40% GC 开销。
  - `runtime/trace.FlightRecorder`：用内存环形缓冲捕获最近一段 trace，适合罕见事件。
  - 未处理 panic 的 recovered/repanicked 输出更简洁。
  - Linux runtime 给 anonymous VMA 加用途名，方便内存分析。
- 编译器/链接器
  - 修复 Go 1.21 引入的 nil pointer check 延迟 bug；错误检查前使用可能为 nil 的返回值会重新正确 panic。
  - 默认 DWARF 5，降低 debug info 体积和链接时间；`GOEXPERIMENT=nodwarf5` 可回退。
  - slice backing store 更多场景栈分配，可能暴露错误 `unsafe.Pointer` 用法。
- 标准库
  - `testing/synctest` 正式可用，用虚拟时间测试并发代码；Go 1.24 实验 API 将在 1.26 移除。
  - 实验性 `encoding/json/v2` 和 `encoding/json/jsontext`：`GOEXPERIMENT=jsonv2`。
  - `sync.WaitGroup.Go` 简化启动并计数 goroutine。
  - `net/http.CrossOriginProtection`：基于 Fetch metadata 的 CSRF 防护。
  - `os.Root`、`DirFS`、`CopyFS`、`testing/fstest.MapFS` 支持 symlink/`io/fs.ReadLinkFS` 更完整。
  - `reflect.TypeAssert[T]` 减少 `Value.Interface().(T)` 分配。
  - `hash.Cloner`、`hash.XOF`，标准 Hash 多数实现 Clone。
  - `testing.T/B/F.Attr` 和 `Output`。
  - `log/slog.GroupAttrs`、`Record.Source`。
- 安全/加密
  - TLS 1.2 禁用 SHA-1 signature algorithms，`GODEBUG=tlssha1=1` 可临时回退。
  - FIPS 模式下 ECDSA/Ed25519 signing 性能改善。
  - RSA key generation 更快。
- 平台
  - macOS 12 Monterey+。
  - 最后包含 broken 32-bit `windows/arm`，Go 1.26 移除。
  - `linux/loong64` 支持 race detector；`linux/riscv64` 支持 `plugin`。
- 升级关注
  - 容器里 CPU limit 会影响默认 `GOMAXPROCS`，Kubernetes 服务需要重新看并发/吞吐指标。
  - `-asan` 可能因 C leak 新增失败。
  - `sync.WaitGroup.Go` 可替换常见 `Add` + `go` + `Done` 模板，配合 vet 的 `waitgroup` 检查。
  - `json/v2` 仍是实验，不要无评估直接生产切换。
- 参考
  - https://go.dev/doc/go1.25
  - https://go.dev/blog/go1.25

## Go 1.24

- 语言
  - 完整支持泛型 type alias：`type Set[T comparable] = map[T]bool`。
  - 可用 `GOEXPERIMENT=noaliastypeparams` 临时关闭；Go 1.25 起移除关闭开关。
- 工具链
  - `go.mod` 支持 `tool` directive，用于追踪可执行工具依赖，替代 `tools.go` 空导入惯例。
  - `go get -tool` 添加工具依赖；`go tool` 可运行模块声明的工具。
  - `go get tool`、`go install tool` 可批量升级/安装当前模块工具。
  - `go build`、`go install` 支持 `-json` 结构化输出；`go test -json` 也包含 build output/failure。
  - 新增 `GOAUTH`，用于私有模块获取认证。
  - `go build` 会基于 VCS tag/commit 设置 main module version，dirty tree 加 `+dirty`；`-buildvcs=false` 关闭。
  - `GOCACHEPROG` 从实验转正，可外接构建/测试缓存程序。
  - `go vet` 新增 `tests` analyzer，并加强 `printf`、`buildtag`、`copylock` 检查。
- Runtime/性能
  - 默认 map 实现切到 Swiss Tables，runtime 小对象分配、内部 mutex 等优化，整体 CPU overhead 平均下降。
  - 可用 `GOEXPERIMENT=noswissmap`、`nospinbitmutex` 回退相关实验实现。
- 标准库
  - `os.Root` / `os.OpenRoot`：限制在某目录内做文件系统操作，防 symlink/path traversal 逃逸。
  - `testing.B.Loop()`：替代 `for i := 0; i < b.N; i++`，避免 benchmark body 被优化掉，也减少 setup/cleanup 误用。
  - `runtime.AddCleanup`：比 `SetFinalizer` 更安全灵活的新 cleanup 机制。
  - 新增 `weak` 包，提供 weak pointer；适合 cache、canonicalization map 等底层场景。
  - 新增 `crypto/mlkem`，实现 ML-KEM/Kyber 后量子 KEM。
  - 新增 `crypto/hkdf`、`crypto/pbkdf2`、`crypto/sha3`，从 `x/crypto` 进入标准库。
  - FIPS 140-3 机制：`GOFIPS140`、`GODEBUG=fips140=...`。
  - 实验性 `testing/synctest`：`GOEXPERIMENT=synctest`，虚拟时间测试并发。
  - `encoding/json` 增加 `omitzero` tag，解决 `time.Time` 等零值与 `omitempty` 语义不一致问题。
  - `encoding.TextAppender` / `BinaryAppender`，降低 marshal 分配。
  - `bytes`、`strings` 增加 iterator 版本：`Lines`、`SplitSeq`、`FieldsSeq` 等。
  - `net/http` 增加 `Server.Protocols`、`Transport.Protocols`、HTTP/2 配置与 h2c prior knowledge 支持。
  - `testing.T.Context`、`B.Context`、`T.Chdir`、`B.Chdir`。
  - `sync.Map` 实现优化。
- 安全/加密
  - `crypto/rand.Read` 保证不返回 error；底层失败时程序不可恢复崩溃。
  - RSA 小于 1024 bit 的 key 默认拒绝；`GODEBUG=rsa1024min=0` 临时回退。
  - `crypto/tls` server 支持 ECH；默认启用 X25519MLKEM768；移除旧 `X25519Kyber768Draft00`。
  - `crypto/x509` 移除 `x509sha1`，不再验证 SHA-1 证书签名。
- 平台
  - Linux kernel 要求 3.2+。
  - Go 1.24 是最后支持 macOS 11 Big Sur 的版本；Go 1.25 要求 macOS 12+。
  - WASM 支持 `//go:wasmexport`，wasip1 可 `-buildmode=c-shared` 构建 reactor/library。
  - 32-bit `windows/arm` 标记 broken。
- 升级关注
  - `tool` directive 可以规范化项目工具依赖，建议替代 `tools.go`。
  - `omitzero` 可用于 JSON API 中所有 `time.Time`/业务零值字段。
  - TLS 后量子默认 key exchange 可能遇到旧服务器/中间设备兼容问题，可临时 `GODEBUG=tlsmlkem=0`。
  - `math/rand.Seed` 顶层调用默认不再生效，需迁移到显式 `rand.New`。
- 参考
  - https://go.dev/doc/go1.24
  - https://go.dev/blog/go1.24

## Go 1.23

- 语言
  - `for range` 支持 iterator function：
    - `func(func() bool)`
    - `func(func(K) bool)`
    - `func(func(K, V) bool)`
  - 泛型 type alias 预览：`GOEXPERIMENT=aliastypeparams`，仅包内支持，跨包暂不支持。
- 工具链
  - Go telemetry：默认 local，仅本地记录；`go telemetry on` 才会上报匿名统计。
  - `go env -changed` 只输出与默认值不同的环境。
  - `go mod tidy -diff` 输出需要的 tidy diff，不修改文件，适合 CI 检查。
  - `go list -m -json` 增加 `Sum`、`GoModSum`。
  - `go.mod` / `go.work` 新增 `godebug` directive。
  - `go vet` 新增 `stdversion` analyzer，检测当前 `go` 版本下过新的符号引用。
  - PGO 构建开销大幅降低；amd64/386 利用 PGO 做 hot block alignment。
- Runtime/链接器
  - 未处理 panic/fatal error 输出缩进调整，便于与 goroutine stack 区分。
  - 局部变量栈槽可在不相交生命周期内复用，降低 stack 使用。
  - 链接器限制新增 `//go:linkname` 指向标准库 internal symbol；可用 `-checklinkname=0` 调试回退。
- 标准库
  - Timer/Ticker 重大语义修正：未 stop 的 timer/ticker 可被 GC；timer channel 改为同步无缓冲，`Stop`/`Reset` 后不再收到旧值。仅 `go 1.23+` 模块默认启用；`GODEBUG=asynctimerchan=1` 回退。
  - 新增 `unique` 包：对 comparable 值做 canonicalization/interning，返回可快速比较的 `Handle[T]`。
  - 新增 `iter` 包；`slices`、`maps` 增加 iterator 辅助：`All`、`Values`、`Collect`、`Sorted`、`Chunk` 等。
  - 新增 `structs.HostLayout`，标记与 host platform 布局兼容的结构体。
  - `encoding/binary.Encode`、`Decode`、`Append`。
  - `go/ast.Preorder`、`go/types` alias/generic alias 支持增强。
  - `net.KeepAliveConfig`、`TCPConn.SetKeepAliveConfig`。
  - `net/http` 增加 cookie parsing、`Request.Pattern`、`NewRequestWithContext` 等；`ServeContent`/`ServeFile` 错误响应会移除内容相关 header。
  - `os.CopyFS`；Linux pidfd 支持；Windows symlink/reparse point 行为修正。
  - `filepath.Localize`。
  - `reflect.Value.Seq` / `Seq2`、`Type.CanSeq` / `CanSeq2`。
  - `runtime/debug.SetCrashOutput`。
  - `sync.Map.Clear`。
  - `sync/atomic` 增加 `And` / `Or`。
  - Windows timer resolution 改善到约 0.5ms。
- 安全/加密
  - TLS client 支持 ECH draft。
  - 默认移除 3DES cipher suites，可用 `GODEBUG=tls3des=1` 回退。
  - 默认启用实验性 X25519Kyber768Draft00，可用 `GODEBUG=tlskyber=0` 回退。
  - `x509sha1` 将在 Go 1.24 移除。
- 平台
  - macOS 11 Big Sur+。
  - Go 1.23 是最后支持 Linux kernel 2.6.32+ 的版本；Go 1.24 要求 3.2+。
  - 新增 `GOARM64`、`GORISCV64`。
  - OpenBSD/riscv64 实验支持。
- 升级关注
  - Timer/Ticker 语义变化是 1.23 最容易影响行为的点，尤其是依赖 `len(timer.C)` 或旧 `Reset`/`Stop` 模式的代码。
  - `stdversion` 能补强多 Go 版本库的 CI。
  - `iter`/`slices`/`maps` 开始形成新集合遍历风格，但公共 API 暴露 iterator 前要考虑使用方最低 Go 版本。
- 参考
  - https://go.dev/doc/go1.23
  - https://go.dev/blog/go1.23

## Go 1.22

- 参考
  - https://tip.golang.org/doc/go1.22

## Go 1.21

- GOOS=wasip1, GOARCH=wasm
  - `go:wasmimport` 支持 import wasm 的函数
- 增加内置函数 min, max, clear
- GOEXPERIMENT=loopvar
  - for loop 的变量作用范围从 loop 变为 iteration - 也就是说每次循环的变量不会变了
  - `go build -gcflags=all=-d=loopvar=2 cmd/go` 检测受影响的地方
  - https://tip.golang.org/wiki/LoopvarExperiment
- panic recover 不再会返回 nil
  - nil 会转为 `*runtime.PanicNilError`
  - `GODEBUG=panicnil=1` 恢复以前的行为
- 新增 `log/slog` 结构化日志
- 新增 `testing/slogtest`
- 新增 `slices`, `maps`, `cmp`
- https://go.dev/doc/toolchain
  - GOTOOLCHAIN
- 参考
  - https://tip.golang.org/doc/go1.21

## Go 1.20

- slice -> array pointer - `[4]byte(x)` -> `*(*[4]byte)(x)`
- 参考
  - https://tip.golang.org/doc/go1.20

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
- `//go:build` 支持 unix -> aix, android, darwin, dragonfly, freebsd, hurd, illumos, ios, linux, netbsd, openbsd, solaris
- 参考
  - https://tip.golang.org/doc/go1.19

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
