---
title: V Reference
---

# V Reference

## 内存管理

- -autofree - v0.3 默认开启 - 不开启可能会泄漏内存
- -manualfree, `[manualfree]`
- -prealloc

```vlang
struct MyType {}

[unsafe]
fn (data &MyType) free() {
	// 自定义 free 逻辑
}
```


## C 交互

| v       | c        |
| ------- | -------- |
| voidptr | `void*`  |
| &byte   | `byte*`  |
| &char   | `char*`  |
| &&char  | `char**` |

```vlang
// -I,-L,-l,-D
#flag -lsqlite3
#include "sqlite3.h"

// 环境区分
#flag linux -lsdl2

// 使用 pkgconfig 生成 flag - PKG_CONFIG_PATH
#pkgconfig r_core
#pkgconfig --cflags --libs r_core

struct C.sqlite3 {
}

struct C.sqlite3_stmt {
}

type FnSqlite3Callback = fn (voidptr, int, &&char, &&char) int
fn C.sqlite3_open(&char, &&C.sqlite3) int
fn C.sqlite3_close(&C.sqlite3) int


fn main(){
  // null 结尾字符串转 v string - 字符串可能需要 dup 使用 cstring_to_vstring(cstring)
  unsafe { &char(cstring).vstring() }
  // 已知长度转 string
  unsafe { &char(cstring).vstring_with_len(len) }
  // windows wide 转字符串 string_from_wide(&u16(cwidestring))
}
```

可直接包含 c 代码, 在 v.mod 添加

```c
#flag -I @VMODROOT/c
#flag @VMODROOT/c/implementation.o
#include "header.h"
```

> @VMODROOT 会被自动替换为最近的 parent module

### C 转 V

```bash
v translate test.c
# 生成 wrapper
v wrapper c_code/libsodium/src/libsodium
```

## 汇编

```v
a := 100
b := 20
mut c := 0
asm amd64 {
    mov eax, a
    add eax, b
    mov c, eax
    ; =r (c) as c // output
    ; r (a) as a // input
      r (b) as b
}
println('a: $a') // 100
println('b: $b') // 20
println('c: $c') // 120
```
