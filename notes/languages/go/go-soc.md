---
title: Go SoC
---

# Go SoC (System on Chip) / Bare Metal

## Tamago

- [f-secure-foundry/tamago](https://github.com/f-secure-foundry/tamago)
  - **定位**: ARM SoC (CPU 而非 MCU)，如 USB Armory。
  - **实现**: Fork 自标准 Go，添加了对特定硬件的裸机支持 (Bare Metal)。
  - **特点**: 无需操作系统，Go Runtime 即 OS。

## TinyGo

- [tinygo.org](https://tinygo.org/)
  - **定位**: 微控制器 (MCU) 和 WebAssembly (WASM)。
  - **实现**: 基于 LLVM 的全新 Go 编译器实现。
  - **特点**: 极小的二进制体积，低内存占用。

## gokrazy

- [gokrazy](https://github.com/gokrazy/gokrazy)
  - **定位**: 纯 Go 打造的 Appliance 平台。
  - **实现**: Linux Kernel + 只运行 Go Userland。
  - **特点**: 实际上是一个迷你 Linux 发行版，而非裸机直接运行 Go。

## 笔记

- **Tamago vs TinyGo**
  - Tamago 跑在性能较强的 SoC 上，支持标准 Go 特性。
  - TinyGo 跑在资源受限的 MCU 上 (Arduino, ESP32)，部分标准库不支持。
- **相关技术**
  - FreeRTOS, RTT (Real Time Transfer)

## 参考

- [Hacker News 讨论](https://news.ycombinator.com/item?id=24576266)
- [FAQ: Tamago vs TinyGo](<https://github.com/f-secure-foundry/tamago/wiki/Frequently-Asked-Questions-(FAQ)#how-does-tamago-differ-from-tinygo>)
- [Why Go instead of Rust?](https://tinygo.org/faq/why-go-instead-of-rust/)
