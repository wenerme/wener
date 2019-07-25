---
id: zig
title: Zig
---

## Tips
* [ziglang](http://ziglang.org/)
* [zig-lang/zig](https://github.com/zig-lang/zig)
* Why
  * 与 C 交互非常好, 可直接导入 C 头文件使用
  * 可与 C 的编译后对接进行混合编译


__hello.zig__
```zig
const io = @import("std").io;

pub fn main() -> %void {
    %%io.stdout.printf("Hello, world!\n");
}
```

```bash
zig build_exe hello.zig
```
