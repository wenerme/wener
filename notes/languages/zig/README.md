---
title: Zig
---

# Zig

- [ziglang](http://ziglang.org/)
- [zig-lang/zig](https://github.com/zig-lang/zig)
  - MIT, Zig
- Why
  - 与 C 交互非常好, 可直接导入 C 头文件使用
  - 可与 C 的编译后对接进行混合编译
  - stdlib 设计上不依赖 libc - wasm 更小
  - 内置 libc - 支持交叉编译
    - ARCH: aarch64,aarch64_6e,armeb,arm,i386,mips64el,mips64,mipsel,mips,powerpc64le,powerpc64,powerpc,riscv64,s390x,sparc,sparcv9,x86_64
    - {ARCH}-{linux,windows}-{musl,gnu}{,eabi,eabihf,abi64,abin32}
    - wasm32-freestanding-musl
    - 40+
    - linux 3.16+, macOS 10.13+, Windows 8.1+
  - 内置 clang - zig cc
  - 动态编译路径
- 参考
  - [ZigEmbeddedGroup/microzig](https://github.com/ZigEmbeddedGroup/microzig)
    - zig for microcontrollers
  - https://andrewkelley.me/
  - [Assorted thoughts on zig](https://scattered-thoughts.net/writing/assorted-thoughts-on-zig-and-rust/)
  - [Why Zig When There is Already C++, D, and Rust?](https://ziglang.org/learn/why_zig_rust_d_cpp/)

:::tip

- ARM < v7 很多不支持
  - atomic,sync [#4959](https://github.com/ziglang/zig/issues/4959)
- self-hosted compiler [#89](https://github.com/ziglang/zig/issues/89)

:::

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

## C Interop

- --verbose-cc 查看 cc 命令

```c title="hello.c"
#include <stdio.h>

int main(int argc, char **argv) {
    printf("Hello world\n");
    return 0;
}
```

```bash
# 直接编译 C
zig build-exe hello.c
ldd hello
file hello
# 静态链接
# x86_64-macos
# x86_64-macos-musl 失败
zig build-exe hello.c --library c -target x86_64-macos-gnu
# macOS 下交叉编译 - 静态链接 ~11k
zig build-exe hello.c --library c -target x86_64-linux-musl
file hello
```

- 交叉编译第一次会慢 - 预编译一些内容

# FAQ

## warning: lld uses blx instruction, no object with architecture supporting feature detected

## undefined symbol: `__sync_fetch_and_add_1`

- atomic operations and `__eabi_read_tp` for ARM older than v7
  - [#10756](https://github.com/ziglang/zig/pull/10756)

## warning: cannot find entry symbol \_start; not setting start address
