---
title: ARM Build
---

# ARM Build

- alpine 包含 gcc-arm-none-eabi - 适用于 arm 裸机
- debian [gcc-arm-linux-gnueabi](https://packages.debian.org/unstable/gcc-arm-linux-gnueabi)
  - 最早版本 6
- EABI - Embedded ABI
  - family of ABIs and one of the "subABIs" is GNU EABI
- EABI4
  - arm v5t linux 2.4.17
  - gcc 3 - 很难找
  - `-mabi=aapcs-linux -mfloat-abi=soft -meabi=4`
  - arm-unknown-linux-gnueabi
- EABI5 - 现在默认 - hf
  - armv6-alpine-linux-muslgnueabihf
- [ArmEabiPort](https://wiki.debian.org/ArmEabiPort)
- https://android.googlesource.com/platform/prebuilts/gcc/linux-x86/arm/arm-eabi-4.8/
- gcc
  - [ARM-Options](https://gcc.gnu.org/onlinedocs/gcc/ARM-Options.html)
- -mabi=aapcs-linux -marm -mthumb-interwork


```bash
# EABI version
gcc -dumpmachine
readelf -h libsqlite3.so | grep Flags

echo 'int main(){}' > test.c
gcc -o test test.c
# 默认
file test

# 查看是否 VFP
readelf -A test | grep VFP

gcc -print-multi-lib

# 预设架构
gcc -Q --help=target
```

**-mabi**

[ABI Variables](http://kanj.github.io/elfs/book/armMusl/cross-tools/abi.html)

| Kernel               | ABI         | CLFS_ABI=Value | Note                           |
| -------------------- | ----------- | -------------- | ------------------------------ |
| CONFIG_AEABI         | aapcs-linux | aapcs-linux    | EABI. Linux 32 bit (int) enums |
| -                    | apcs-gnu    | apcs-gnu       | OABI                           |
| CONFIG_THUMB2_KERNEL | atpcs       | atpcs          | Thumb ABI                      |
| -                    | aapcs       | aapcs          | EABI w/ variable size enums    |
| CONFIG_IWMMXT        | iwmmxt      | iwmmxt         | Intel XScale MMX               |

## sorry, unimplemented: -mfloat-abi=hard and VFP

- -mfloat-abi=soft

```bash
gcc -march=?
```

## Source object /tmp/out.o has EABI version 0, but target test has EABI version 5

混合了 OABI 和 EABI

## cannot find libgcc_s.so.1

- -mabi=aapcs-linux

```bash
apk add libgcc
```
