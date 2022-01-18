---
title: C FAQ
tags:
  - FAQ
---

## 错误处理

- errno, perror, strerror

```c
#include <errno.h>
extern int errno ;

exit(EXIT_FAILURE);
exit(EXIT_SUCCESS);
```

## fseek(fp,0,SEEK_END) EINVAL Invalid argument

## stackdump

```bash
gdb test.exe.stackdump
```

## gdb error while loading shared libraries

```
set environment LD_LIBRARY_PATH /path/to/debug
```

## ModuleNotFoundError: No module named 'libstdcxx'

msys gdb

## SIGABRT

- malloc 申请失败可能触发 abort
- free 失败可能触发 abort
