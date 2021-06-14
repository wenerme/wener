---
title: Patch
---

# Patch

- [7 Patch Command Examples to Apply Diff Patch Files in Linux](https://www.thegeekstuff.com/2014/12/patch-command-examples)

```bash
# -p,-u,--patch 生成 patch
diff -u hello.c hello_new.c > hello.patch

# patch -p[num] < patchfile
# patch [options] originalfile patchfile

# 默认读取 stdin, 使用 patch 里指定的文件
patch -u -b hello.c -i hello.patch -o hello_new.c
```
