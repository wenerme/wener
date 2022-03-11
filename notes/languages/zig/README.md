---
title: Zig
---

# Zig

- [ziglang](http://ziglang.org/)
- [zig-lang/zig](https://github.com/zig-lang/zig)
- Why
  - 与 C 交互非常好, 可直接导入 C 头文件使用
  - 可与 C 的编译后对接进行混合编译
  - stdlib 设计上不依赖 libc - wasm 更小
  - 内置 libc - 交叉编译
  - 内置 clang - zig cc
  - 动态编译路径
- 参考
  - https://andrewkelley.me/
  - [Assorted thoughts on zig](https://scattered-thoughts.net/writing/assorted-thoughts-on-zig-and-rust/)
  - [Why Zig When There is Already C++, D, and Rust?](https://ziglang.org/learn/why_zig_rust_d_cpp/)

```bash
docker run --rm -it -v $PWD:/host -w /host wener/zig
```

```zig title="hello.zig"
const std = @import("std");

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    try stdout.print("Hello, {s}!\n", .{"world"});
}
```

```zig title="hello.zig"
const print = @import("std").debug.print;

pub fn main() void {
    print("Hello, world!\n", .{});
}
```

```bash
zig build-exe hello.zig
# 交叉编译
zig targets # 所有 targets
zig build-exe -target arm-linux hello.zig

zig build-exe -target arm-linux-musleabi -mcpu arm1176jzf_s hello.zig
zig build-exe -target arm-linux-gnueabi -mcpu arm1176jzf_s hello.zig

# hello 约 4.4k
zig build-exe --strip -O ReleaseSmall hello.zig
```

- flags
  - -fsingle-threaded
  - -mcpu=arm926ej_s+soft_float
  - `-l[lib], --library [lib]` - 在需要时 link 系统库
  - `-L[d], --library-directory [d]` - 添加 库 目录

# FAQ

## warning: lld uses blx instruction, no object with architecture supporting feature detected

## undefined symbol: \_\_sync_fetch_and_add_1

- atomic operations and \_\_eabi_read_tp for ARM older than v7
  - [#10756](https://github.com/ziglang/zig/pull/10756)

## warning: cannot find entry symbol \_start; not setting start address
