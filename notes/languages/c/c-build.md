---
title: C Build
---

# C Build

```bash
gcc main.c -static


echo 'int main(){}' > test.c
gcc -o test test.c
file test

CC=arm-linux-gnueabi-gcc
echo 'int main(){}' > test.c
# ELF 32-bit LSB executable, ARM, EABI5 version 1 (SYSV), statically linked, for GNU/Linux 3.2.0, BuildID[sha1]=a839e1b10daec5d9c348eef8854bb271f8097d34, not stripped
# 注意 GNU/Linux 3.2.0
$CC -o test test.c
file test
```
