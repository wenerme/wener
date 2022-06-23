---
title: CGO
---

# CGO

CGO is not GO

- 避免 CGO
  - [hashicorp/go-plugin](https://github.com/hashicorp/go-plugin)
  - [notti/nocgo](https://github.com/notti/nocgo) - dlopen without cgo
    - dlopen, dlclose, dlerror, dlsym
    - ffi 汇编, 支持 386 和 amd64
  - [rainycape/dl](https://github.com/rainycape/dl) - dlopen / dlsym
  - [Isolating problematic Cgo code](https://jonwillia.ms/2022/03/09/isolating-problematic-cgo-code)
- 参考
  - [golang/go#18296](https://github.com/golang/go/issues/18296) - runtime: dlopen/dlsym without CGo
  - [类型转换](https://gist.github.com/zchee/b9c99695463d8902cd33)
- C -> CGO
  - [modernc.org/ccgo/v3](https://pkg.go.dev/modernc.org/ccgo/v3)
  - [modernc.org/libc](https://pkg.go.dev/modernc.org/libc)
  - 案例
    - [modernc.org/sqlite](https://pkg.go.dev/modernc.org/sqlite)
    - PCRE2 [go.arsenm.dev/pcre](https://pkg.go.dev/go.arsenm.dev/pcre)
    - uber/h3 [akhenakh/goh3](https://github.com/akhenakh/goh3)

:::caution

- 避免 Go 的名字和 C 里的名字冲突，否则无法直接使用 `C.<name>`
  - 例如 如果 Go 里有 MyStruct，则无法使用 C.MyStruct

:::

:::tip 避免使用 CGO

- CGO_ENABLED=0 禁用 CGO
- CGO 依赖系统
- 跨平台编译复杂
- 无 CGO 方便构建 -static binary
- 方案
  - 找替代库
  - 用到 cgo 的作为外部进程通过 io 交互 - 减少 cgo 范围
  - dlopen
  - exec
- 常用的 CGO 依赖
  - sqlite

:::

## 类型转换

- https://pkg.go.dev/cmd/cgo

**Go**

```go
type InteropFunctions interface {
	// CString malloc - 调用者 C.free
	CString(s string) *C.char
	// CBytes malloc - 调用者 C.free
	CBytes([]byte) unsafe.Pointer
	GoString(*C.char) string
	GoStringN(*C.char, C.int) string
	GoBytes(unsafe.Pointer, C.int) []byte
}
```

- C.malloc 不回直接调用 C 的 malloc
- C.malloc 确保不会返回 NULL - 如果申请失败则直接 crash

```go
func GetString(in *C.char, l C.int) *C.char {
	input := C.GoBytes(unsafe.Pointer(in), C.int(l))
  // 使用者需要 free 返回的指针
	return C.CString(string(input))
}
```

```go
// #include <stdio.h>
// #include <errno.h>
// #cgo CFLAGS: -DPNG_DEBUG=1
// #cgo amd64 386 CFLAGS: -DX86=1
// #cgo LDFLAGS: -lpng
// #include <png.h>
// #cgo pkg-config: png cairo
// #cgo LDFLAGS: -L${SRCDIR}/libs -lfoo
import "C"
```

```c title="C 注释中可用的特殊函数"
size_t _GoStringLen(_GoString_ s);
const char *_GoStringPtr(_GoString_ s);
```

- SRCDIR -> x.go 的位置

**C**

```c
typedef void *GoMap;
typedef void *GoChan;
typedef struct { void *t; void *v; } GoInterface;
typedef struct { void *data; GoInt len; GoInt cap; } GoSlice;

typedef struct { const char *p; ptrdiff_t n; } _GoString_;
typedef _GoString_ GoString;
```

- GODEBUG=cgocheck=1
  - 0 - 不检查
  - 2 - 更严格的检查
- [runtime/cgo](https://pkg.go.dev/runtime/cgo)
  - 安全传递 Go 内数据
  - interface{} -> cgo.Handle - uintptr - C.uintptr_t

```bash
go tool cgo
```

## dlopen

```bash
# 查看 so symbol
# 没有地址的 symbol 是动态的
nm -gDC /usr/lib/libsqlite3.so
objdump -TC libz.so
readelf -Ws libz.so
# 只看 symbol
readelf -Ws /usr/lib/libsqlite3.so | awk '{print $8}';
```

```go
// +build !cgo

package dlopen

// we have to use the 3 argument format here :( - 2 argument format is only allowed from inside cgo

//go:cgo_import_dynamic libc_dlopen_x dlopen "libdl.so.2"
//go:cgo_import_dynamic libc_dlclose_x dlclose "libdl.so.2"
//go:cgo_import_dynamic libc_dlsym_x dlsym "libdl.so.2"
//go:cgo_import_dynamic libc_dlerror_x dlerror "libdl.so.2"

// on amd64 we don't need the following line - on 386 we do...
// anyway - with those lines the output is better (but doesn't matter) - without it on amd64 we get multiple DT_NEEDED with "libc.so.6" etc

//go:cgo_import_dynamic _ _ "libdl.so.2"
```

## sqlite
- [cznic/sqlite](https://gitlab.com/cznic/sqlite)
  - CGo-free port of SQLite/SQLite3 v3.37.0
  - C to Go
  - [glebarez/go-sqlite](https://github.com/glebarez/go-sqlite)
    - driver
- [mattn/go-sqlite3](https://github.com/mattn/go-sqlite3)
  - `-tags libsqlite3` 可 link libsqlite3.so
- No CGO
  - [iamacarpet/go-sqlite3-win64](https://github.com/iamacarpet/go-sqlite3-win64)
    - sqlite3.dll wrapper
  - [cvilsmeier/sqinn-go](https://github.com/cvilsmeier/sqinn-go)
    - 基于 sqlite 命令行进行 IO 操作
  - [zombiezen/go-sqlite](https://github.com/zombiezen/go-sqlite)
    - 可执行 SQL
    - 不提供 database/sql driver
    - fork crawshaw/sqlite
  - [crawshaw/sqlite](https://github.com/crawshaw/sqlite)
    - low-level Go interface to SQLite 3
    - [Go and SQLite: when database/sql chafes](https://crawshaw.io/blog/go-and-sqlite
  - [alicebob/sqlittle](https://github.com/alicebob/sqlittle)
    - 直接读取文件 - 不支持 SQL
    - 只读
    - incompatible database version
      - 要求 journal mode
      - 不支持 WAL
      - schema format > 1
      - UTF8 encoding

# FAQ

## 查找用到了 cgo 的模块

```bash
go list -f "{{if .CgoFiles}}{{.ImportPath}}{{end}}" $(go list -f "{{.ImportPath}}{{range .Deps}} {{.}}{{end}}" ./... )
```

## zig cgo cross compile


```bash
# Go 1.18+
CGO_ENABLED=1 GOOS=linux GOARCH=amd64 CC="zig cc -target x86_64-linux" CXX="zig c++ -target x86_64-linux" go build --tags extended
```

- amd64 -> x86_64
- [Zig Makes Go Cross Compilation Just Work](https://dev.to/kristoff/zig-makes-go-cross-compilation-just-work-29ho)
