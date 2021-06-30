---
title: Go Build
---

# Go Build

- [go-os-arch.md](https://gist.github.com/asukakenji/f15ba7e588ac42795f421b48b8aede63)

```bash
# 所有交叉编译列表
go tool dist list
# 包含 cgo 支持情况
go tool dist list -json
```

| buildmode | desc                                 |
| --------- | ------------------------------------ |
| archive   | build non-main, `.a`                 |
| c-archive | main+imports, cgo `//export`         |
| c-shared  | main+imports, cgo `//export`         |
| default   | main+non-main, exec， `.a`           |
| shared    | non-main, for -linkshared            |
| exe       | main+imports,exec, 忽略非 main 包    |
| pie       | main+imports, exec, pie              |
| plugin    | main+imports, plugin, 忽略非 main 包 |

| ldflags                             | desc                     |
| ----------------------------------- | ------------------------ |
| -w                                  | disable DWARF generation |
| -s                                  | disable symbol table     |
| -X 'wener.me/gou/build.Version=123' | add definition           |

| env        | default | desc        |
| ---------- | ------- | ----------- |
| GOMAXPROCS |         | Max Thread  |
| GOGC       | 100     | off 关闭 GC |

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
-X 'wener.me/tools/build.Version=`git describe --tags --abbrev=0`'
-X 'wener.me/tools/build.CommitID=`git rev-parse --short HEAD`'
-X 'wener.me/tools/build.CommitTime=`git log -1 --format=%cd --date=iso8601`'
-X 'wener.me/tools/build.BuildTime=`date --iso-8601=seconds`'
"
go build -o bin/cli -ldflags "$DEF_FLAGS" ./cmd/cli
```

## 限定 Build Tag

```go
//+build tag

package main
```

```bash
go build -tags tag
```

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
