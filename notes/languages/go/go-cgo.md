---
title: CGO
---

# CGO

- 避免 CGO
  - [notti/nocgo](https://github.com/notti/nocgo) - dlopen without cgo
    - dlopen, dlclose, dlerror, dlsym
    - ffi 汇编, 支持 386 和 amd64
  - [rainycape/dl](https://github.com/rainycape/dl) - dlopen / dlsym
- 参考
  - [golang/go#18296](https://github.com/golang/go/issues/18296) - runtime: dlopen/dlsym without CGo

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
- [mattn/go-sqlite3](https://github.com/mattn/go-sqlite3)
  - `-tags libsqlite3` 可 link libsqlite3.so
- No CGO
  - [iamacarpet/go-sqlite3-win64](https://github.com/iamacarpet/go-sqlite3-win64)
    - sqlite3.dll wrapper
  - [cvilsmeier/sqinn-go](https://github.com/cvilsmeier/sqinn-go)
    - 基于 sqlite 命令行进行 IO 操作
  - [alicebob/sqlittle](https://github.com/alicebob/sqlittle)
    - 直接读取文件 - 不支持 SQL
    - 只读
    - incompatible database version
      - 要求 journal mode
      - 不支持 WAL
      - schema format > 1
      - UTF8 encoding
