---
title: Go Build
---

# Go Build

- [Go package guidelines](https://wiki.archlinux.org/title/Go_package_guidelines)
- 常用 `-trimpath -ldflags '-s -w -extldflags "-static"'`
- 参考
  - [GoArm](https://github.com/golang/go/wiki/GoArm)
  - [go-os-arch.md](https://gist.github.com/asukakenji/f15ba7e588ac42795f421b48b8aede63)
  - [PortingPolicy](https://github.com/golang/go/wiki/PortingPolicy)
  - [Installing Go from source](https://go.dev/doc/install/source)

:::caution

- c-shared
  - musl 环境不支持构建 c-shared [golang/go#13492](https://github.com/golang/go/issues/13492)
    runtime: c-shared builds fail with musllibc
  - windows 下构建 c-shared 需要使用 TDM-GCC
  - 无法 dlclose, offload c-shared [#11100](https://github.com/golang/go/issues/11100)
    - 涉及到 VM

:::

| env        | note        | macOS                                |
| ---------- | ----------- | ------------------------------------ |
| GOENV      |             | ~/Library/Application Support/go/env |
| GOCACHE    |             | ~/Library/Caches/go-build            |
| GOMODCACHE |             | ~/go/pkg/mod                         |
| GOTOOLDIR  |             |
| GOMOD      | go.mod 位置 |
| GOWORK     |

```bash
# 所有交叉编译列表
go tool dist list
# 包含 cgo 支持情况
go tool dist list -json

# 移除 mod 缓存
go clean -modcache
```

| buildmode  | desc                                           |
| ---------- | ---------------------------------------------- |
| archive    | build non-main, `.a`                           |
| c-archive  | main+imports, cgo `//export`                   |
| c-shared   | main+imports, cgo `//export`                   |
| default    | main+non-main, exec， `.a`                     |
| exe        | main+imports,exec, 忽略非 main 包              |
| pie        | main+imports, exec, pie                        |
| plugin     | main+imports, plugin, 忽略非 main 包           |
| ~~shared~~ | non-main, for -linkshared - module 出来后 异常 |

| ldflags                             | desc                     |
| ----------------------------------- | ------------------------ |
| -w                                  | disable DWARF generation |
| -s                                  | disable symbol table     |
| -X 'wener.me/gou/build.Version=123' | add definition           |
| -linkmode=external                  |
| -extldflags "$LDFLAGS"              |

| gcflags | desc                  |
| ------- | --------------------- |
| -N      | Disable optimizations |
| -l      | Disable inlining      |

| flags                 | desc                             |
| --------------------- | -------------------------------- |
| -modcacherw           | 新的 mod 缓存 rw - 可以 `rm -rf` |
| -trimpath             | 移除环境相关路径，reproduceable  |
| -ldflags "$GOLDFLAGS" |
| -mod=readonly         | 不动 go.mod                      |
| -buildmode=pie        |

```bash
# https://pkg.go.dev/cmd/compile
go tool compile -help
```

| env        | default | desc        |
| ---------- | ------- | ----------- |
| GOMAXPROCS |         | Max Thread  |
| GOGC       | 100     | off 关闭 GC |
| GOOS       |
| GOARCH     |

## 自定义常量

```go
package main

var Version = "dev"
var CommitTime = ""
var CommitID = ""
var BuildTime = ""
```

```bash
DEF_FLAGS="
-X 'wener.me/tools/build.Version=$(git describe --tags --abbrev=0)'
-X 'wener.me/tools/build.CommitID=$(git rev-parse --short HEAD)'
-X 'wener.me/tools/build.CommitTime=$(git log -1 --format=%cd --date=iso8601)'
-X 'wener.me/tools/build.BuildTime=$(date --iso-8601=seconds)'
"
go build -o bin/cli -ldflags "$DEF_FLAGS" ./cmd/cli
```

## 限定 Build Tag

- 内置 Tag
  - 版本 - 例如 go1.18
  - cgo
  - gc, gccgo
  - GOOS
  - GOARCH

```go
//go:build tag
//+build tag1,tag2

// 复杂限定
//go:build (linux && 386) || (darwin && !cgo)

package main
```

```bash
go build -tags "tag1 tag2"
```

- https://pkg.go.dev/cmd/go#hdr-Build_constraints

## 交叉编译

- [GoArm](https://github.com/golang/go/wiki/GoArm)
- [GOOS and GOARCH](https://gist.github.com/asukakenji/f15ba7e588ac42795f421b48b8aede63)

```bash
CC_FOR_TARGET=/path/to/arm-unknown-linux-gnueabi-gcc CXX_FOR_TARGET=/path/to/arm-unknown-linux-gnueabi-g++ RANLIB_FOR_TARGET=/path/to/arm-unknown-linux-gnueabi-ranlib

CC=i586-mingw32-gcc GOOS=windows GOARCH=386 CGO_ENABLED=1 go build -v -o myprogram.exe -ldflags="-extld=$CC"
CC=x86_64-pc-linux-gcc GOOS=linux GOARCH=amd64 CGO_ENABLED=1 go build -v -o myprogram -ldflags="-extld=$CC"
CC=arm-linux-gnueabihf-gcc GOOS=linux GOARCH=arm GOARM=6 CGO_ENABLED=1 go build -v -o myprogram -ldflags="-extld=$CC"
```

## 构建缓存

```bash
# macOS $HOME/Library/Caches/go-build
# linux $HOME/.cache/go-build
go env GOCACHE

# CI 的时候可修改 GOPATH 更好利用缓存
export GOPATH="$PWD/.cache"
export PATH="$PWD/.cache/bin:$PATH"
export GO111MODULE=on
export GOPROXY=https://goproxy.io

# 清除缓存
go clean -cache
```

## musl static

```bash
-linkmode external -extldflags "-static"
```

## docker builder

- [prometheus/golang-builder](https://github.com/prometheus/golang-builder)
  - arm
    - arm-linux-gnueabi
    - arm64-apple-darwin20.2
    - arm64e-apple-darwin20.2

```bash
docker pull quay.io/prometheus/golang-builder:arm
docker run --rm -it --entrypoint bash \
  --name go-builder quay.io/prometheus/golang-builder:arm
```

# Ports

- [MinimumRequirements](https://github.com/golang/go/wiki/MinimumRequirements)

## GOAMD64

> go 1.18 新增 GOAMD64 环境变量

- v1 - 默认
- v2 - CMPXCHG16B, LAHF, SAHF, POPCNT, SSE3, SSE4.1, SSE4.2, SSSE3
  - 2009: Nehalem, Jaguar, Intel Atom Silvermont, QEMU
  - amdv2
- v3 - AVX, AVX2, BMI1, BMI2, F16C, FMA, LZCNT, MOVBE, OSXSAVE
  - 2015 - Haswell, Excavator
  - amdv3
- v4 - AVX512F, AVX512BW, AVX512CD, AVX512DQ, AVX512VL
  - 2017: Skylake-X, Skylake-SP
  - 2022: Zen 4
  - amdv4
- 参考
  - [GOAMD64](https://go.dev/wiki/MinimumRequirements#amd64)
  - [Microarchitecture levels](https://en.wikipedia.org/wiki/X86-64#Microarchitecture_levels)

```bash
# AMDv3
# avx 可能有，但可能没 avx2
grep -oE 'avx2|bmi1|bmi2|f16|fma' /proc/cpuinfo  | sort -u
# AMDv4
grep -oE 'avx512' /proc/cpuinfo  | sort -u
```

## GOARM

- ARM 浮点数逻辑

> 默认基于构建环境自动监测，监测失败则使用 6

- GOARM=5: use software floating point; when CPU doesn't have VFP co-processor
- GOARM=6: use VFPv1 only; default if cross compiling; usually ARM11 or better cores (VFPv2 or better is also supported)
- GOARM=7: use VFPv3; usually Cortex-A cores

# FAQ

## unrecognized command-line option '-marm'

```bash
CC=arm-linux-gnueabi-gcc
```

## arm-none-eabi-gcc: error: unrecognized command-line option '-pthread'

需要 arm-linux-eabi

```bash
# musl 不包含 pthread 可创建空包满足
# 空包
# ar -rc /usr/lib/libpthread.a
# 交叉编译环境
arm-none-eabi-ar -rc /usr/arm-none-eabi/lib/libpthread.a
```

- gcc-arm-none-eabi
  - Cortex-M0/M0+/M3/M4, Cortex-R4/R5/R7, Cortex-A
  - 不支持线程

## loadinternal: cannot find runtime/cgo

```bash
CGO_ENABLED=1
```

## FATAL: kernel too old

注意 gcc 版本

```bash
CC=arm-linux-gnueabi-gcc
echo 'int main(){}' > test.c
# ELF 32-bit LSB executable, ARM, EABI5 version 1 (SYSV), statically linked, for GNU/Linux 3.2.0, BuildID[sha1]=a839e1b10daec5d9c348eef8854bb271f8097d34, not stripped
# 注意 GNU/Linux 3.2.0
$CC -o test test.c
file test
```

- [prometheus/node_exporter#914](https://github.com/prometheus/node_exporter/issues/914)
- debian [gcc-arm-linux-gnueabi](https://packages.debian.org/unstable/gcc-arm-linux-gnueabi)

## implicit declaration of function '\_beginthread'; did you mean 'OpenThread'

换 C 编译器, 尝试用 [TDM-GCC](https://github.com/jmeubank/tdm-gcc)

```bash
export PATH=/c/TDM-GCC-64/bin:$PATH
LC_ALL=c gcc -v
```

- https://github.com/golang/go/wiki/InstallFromSource
- https://github.com/golang/go/issues/12029

## c-shared 内存泄漏

使用 c-shared 的方式很难能保证最后 valgrind 不显示有溢出

- https://github.com/golang/go/issues/30490
