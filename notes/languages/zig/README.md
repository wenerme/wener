---
id: zig
title: Zig
---

# Zig

- [ziglang](http://ziglang.org/)
- [zig-lang/zig](https://github.com/zig-lang/zig)
- Why
  - 与 C 交互非常好, 可直接导入 C 头文件使用
  - 可与 C 的编译后对接进行混合编译
  - stdlib 设计上不依赖 libc - wasm 更小
  - 内置 libc - 方便跨平台
  - 内置 clang - zig cc
  - 动态编译路径
- 参考
  - https://andrewkelley.me/
  - [Assorted thoughts on zig](https://scattered-thoughts.net/writing/assorted-thoughts-on-zig-and-rust/)
  - [Why Zig When There is Already C++, D, and Rust?](https://ziglang.org/learn/why_zig_rust_d_cpp/)

**hello.zig**

```zig
const io = @import("std").io;

pub fn main() -> %void {
    %%io.stdout.printf("Hello, world!\n");
}
```

```bash
zig build_exe hello.zig
```
