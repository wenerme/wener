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

## 编译过程

```
          |
          |---->  Input is Source file(.c)
          |
          V
+=================+
|                 |
| C Preprocessor  |
|                 |
+=================+
          |
          | ---> Pure C file ( comd:cc -E <file.name> )
          |
          V
+=================+
|                 |
| Lexical Analyzer|
|                 |
+-----------------+
|                 |
| Syntax Analyzer |
|                 |
+-----------------+
|                 |
| Semantic Analyze|
|                 |
+-----------------+
|                 |
| Pre Optimization|
|                 |
+-----------------+
|                 |
| Code generation |
|                 |
+-----------------+
|                 |
| Post Optimize   |
|                 |
+=================+
          |
          |--->  Assembly code (comd: cc -S <file.name> )
          |
          V
+=================+
|                 |
|   Assembler     |
|                 |
+=================+
          |
          |--->  Object file (.obj) (comd: cc -c <file.name>)
          |
          V
+=================+
|     Linker      |
|      and        |
|     loader      |
+=================+
          |
          |--->  Executable (.Exe/a.out) (com:cc <file.name> )
          |
          V
Executable file(a.out)
```
