# LLVM

## Tips
* doxygen [Doc](http://llvm.org/doxygen/)
* 其他语言
  * Emscripten: An LLVM to JavaScript Compiler

```bash
# brew 安装位置 /usr/local/opt/llvm

# header -> ir
clang -cc1 SDL.h -emit-llvm -femit-all-decls -o SDL.h.ll
# 查看 cc1 的帮助
clang -cc1 --help
# 编译为汇编
llc SDL.h.ll
# bc 反汇编为 ir
llvm-dis SDL.h.bc
```
