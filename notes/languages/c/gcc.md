---
title: gcc
---

# gcc

| gcc version | kernel version |
| ----------- | -------------- |
| 6+          | 3.2.0          |
| 4+          | 2.6.31         |

```bash
LD_LIBRARY_PATH=. ./strace

gcc -print-file-name=crt1.o
```

## 交叉编译

- [crosstool-ng/crosstool-ng](https://github.com/crosstool-ng/crosstool-ng)
  - cross-toolchain generator
- https://releases.linaro.org/components/toolchain/binaries/
- [dockcross/dockcross](https://github.com/dockcross/dockcross)
- https://android.googlesource.com/platform/prebuilts/gcc/

