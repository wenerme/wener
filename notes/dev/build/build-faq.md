---
tags:
  - FAQ
---

# Build FAQ

## Buck vs Bazel

- Buck - Facebook
  - googler 加入 Facebook 后基于 blaze 构建的工具
  - 更加 opinionated
- Bazel - Google
  - 基于 blaze 构建的开源工具
  - 扩展性更强
  - 社区更大
  - 开发更活跃

---

- Uber Buck -> Bazel
- https://www.microsoft.com/en-us/research/uploads/prod/2018/03/build-systems-final.pdf

## Cross Compilation

https://github.com/dockcross/dockcross
https://bugs.alpinelinux.org/issues/5845
http://lists.alpinelinux.org/alpine-devel/5427.html

Alpine 目前没有交叉编译的工具


## Configure

生成configure过程中各文件之间的关系图
https://www.cnblogs.com/bugutian/p/5560548.html

```
autoscan -> configure.scan - 编辑 -> configure.ac
configure.ac - aclocal -> aclocal.m4
configure.ac ,aclocal.m4 - autoconf -> configure

configure.ac - autoheader -> config.h.in
Makefile.am - automake(--add-missing) -> Makefile.in

Makefile.in, config.h.in, configure - configure -> Makefile
```
