---
title: Rust
---

# Rust

- [Awesome](./rust-awesome.md)
- [Rust:wiki](<https://en.wikipedia.org/wiki/Rust_(programming_language)>)
- [The Rust Programming Language](https://doc.rust-lang.org/book/)
- [rust-lang/rust](https://github.com/rust-lang/rust)
  - A safe, concurrent, practical language.
- [rust-lang/cargo](https://github.com/rust-lang/cargo)
  - The Rust package manager
- 内存管理
  - 不使用类似 Go,Java 这样的自动垃圾收集, 而是 [RAII](https://en.wikipedia.org/wiki/Resource_acquisition_is_initialization)
  - 引入 borrow checker 的概念, 避免 dangling pointers
- FFI
  - [Foreign Function Interface](https://doc.rust-lang.org/book/first-edition/ffi.html)
- 参考
  - [Why Discord is switching from Go to Rust](https://blog.discord.com/a190bbca2b1f)
- [Environment Variables](https://doc.rust-lang.org/cargo/reference/environment-variables.html)
- Features
  - 零成本抽象(Zero-cost Abstraction)
  - 所有权(Ownership)与借用(Borrowing)
  - 生命周期(Lifetimes)
  - 类型推导(Type Inference)
  - 枚举(Enum)
  - 模式匹配(Pattern Matching)
  - 错误处理(Error Handling)
