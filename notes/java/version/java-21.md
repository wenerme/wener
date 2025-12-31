---
title: Java 21
---

# Java 21

- LTS (Long Term Support)
- Released: 2023-09-19
- [JDK 21 Project](https://openjdk.java.net/projects/jdk/21/)

## Features

### Stable Features

- [JEP 444](https://openjdk.java.net/jeps/444): Virtual Threads
  - 轻量级线程（Project Loom），显著提高高并发应用的吞吐量。
- [JEP 431](https://openjdk.java.net/jeps/431): Sequenced Collections
  - 引入 `SequencedCollection`, `SequencedSet`, `SequencedMap`，提供统一的顺序访问。
- [JEP 440](https://openjdk.java.net/jeps/440): Record Patterns
  - 增强模式匹配，支持解构 Record 值。
- [JEP 441](https://openjdk.java.net/jeps/441): Pattern Matching for switch
  - `switch` 支持模式匹配。
- [JEP 439](https://openjdk.java.net/jeps/439): Generational ZGC
  - 分代 ZGC，提高垃圾回收性能。
- [JEP 452](https://openjdk.java.net/jeps/452): Key Encapsulation Mechanism API
  - 密钥封装机制 API。
- [JEP 451](https://openjdk.java.net/jeps/451): Prepare to Disallow the Dynamic Loading of Agents
  - 准备禁止动态加载 Agent。

### Preview & Incubator

- [JEP 430](https://openjdk.java.net/jeps/430): String Templates (Preview)
  - 字符串模板，支持内嵌表达式。
- [JEP 443](https://openjdk.java.net/jeps/443): Unnamed Patterns and Variables (Preview)
  - 使用 `_` 表示未命名模式或变量。
- [JEP 445](https://openjdk.java.net/jeps/445): Unnamed Classes and Instance Main Methods (Preview)
  - 简化入口类，方便初学者。
- [JEP 446](https://openjdk.java.net/jeps/446): Scoped Values (Preview)
  - 作用域值，线程局部变量的更优替代。
- [JEP 453](https://openjdk.java.net/jeps/453): Structured Concurrency (Preview)
  - 结构化并发 API。
- [JEP 442](https://openjdk.java.net/jeps/442): Foreign Function & Memory API (Third Preview)
- [JEP 448](https://openjdk.java.net/jeps/448): Vector API (Sixth Incubator)

## References

- [Java 21 Release Notes](https://jdk.java.net/21/release-notes)
