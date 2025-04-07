---
tags:
  - Version
---

# MUSL 版本

- 1.2.5 - February 29, 2024
  - 增加 loongarch64, riscv32
- 1.2.4 - May 1, 2023
  - 支持 TCP dns 查询 - 能够处理更大的 DNS 响应
  - dynamic linker 支持 RELR
- 1.2.1 - August 4, 2020
  - 启用 mallocng 替代之前的 dlmalloc-like allocator
    - 避免内存碎片
    - detection of overflows, double-free, use-after-free
- 1.2.0 - February 20, 2020
  - time_t 32-bit -> 64-bit - 解决 2038 问题
- 1.1.24 - October 13, 2019 - **EOF**
- 1.1.20 - September 4, 2018
  - 支持 replace/interpose malloc
  - 增加 m68k port
- https://musl.libc.org/releases.html
