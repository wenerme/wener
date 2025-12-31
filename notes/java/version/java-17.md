---
title: Java 17
---

# Java 17

- LTS (Long Term Support)
- Released: 2021-09-14
- [JDK 17 Project](https://openjdk.java.net/projects/jdk/17/)

## Features

### Language

- [JEP 409](https://openjdk.java.net/jeps/409): Sealed Classes
  - 限制哪些其他类或接口可以扩展或实现它们。
- [JEP 406](https://openjdk.java.net/jeps/406): Pattern Matching for switch (Preview)
- [JEP 306](https://openjdk.java.net/jeps/306): Restore Always-Strict Floating-Point Semantics
  - 始终严格的浮点语义，`strictfp` 关键字不再需要。

### Library

- [JEP 356](https://openjdk.java.net/jeps/356): Enhanced Pseudo-Random Number Generators
  - 提供新的 PRNG 接口和实现。
- [JEP 415](https://openjdk.java.net/jeps/415): Context-Specific Deserialization Filters
- [JEP 414](https://openjdk.java.net/jeps/414): Vector API (Second Incubator)
- [JEP 412](https://openjdk.java.net/jeps/412): Foreign Function & Memory API (Incubator)

### Platform & Tools

- [JEP 403](https://openjdk.java.net/jeps/403): Strongly Encapsulate JDK Internals
  - 强封装 JDK 内部 API，除了 `sun.misc.Unsafe`。
- [JEP 382](https://openjdk.java.net/jeps/382): New macOS Rendering Pipeline
  - 使用 Apple Metal API。
- [JEP 391](https://openjdk.java.net/jeps/391): macOS/AArch64 Port
  - 支持 Apple Silicon (M1/M2/etc)。

### Removals & Deprecations

- [JEP 411](https://openjdk.java.net/jeps/411): Deprecate the Security Manager for Removal
- [JEP 398](https://openjdk.java.net/jeps/398): Deprecate the Applet API for Removal
- [JEP 407](https://openjdk.java.net/jeps/407): Remove RMI Activation
- [JEP 410](https://openjdk.java.net/jeps/410): Remove the Experimental AOT and JIT Compiler

## References

- [Java 17 Release Notes](https://jdk.java.net/17/release-notes)
