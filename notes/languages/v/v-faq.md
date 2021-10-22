---
title: Vlang FAQ
tags:
  - FAQ
---

# Vlang FAQ

## Vlang 与 Golang 的相似点

- `:=`, `=`
- struct, interface, 函数处理方式, type alias
- go, chan, select
- `_test.v` 为测试, `test_` 为测试函数
- `v fmt`
- c inter op
- `$embed_file` -> `//go:embed`
- `.${backend}.v` 根据情况选择编译
- 比 Go 更好的地方
  - error/optional 的处理
  - 语句可以作为值
  - 支持字符串插值
- 不同点
  - `&Type` 表示引用而不是 `*Type`
  - 内存基于 reference count 释放 - 大部分传值为自动释放
    - 因此 v 使用 `mut Type` 而不是使用 `*Type` - 更好由编译器控制是否是指针
  - 无全局变量 - 默认 pure function
  - 默认不可变 - 需要 mut 修饰
  - int 固定为 i32
  - interface 调用可能不会调用到实际 struct 实现方法
  - shared 对象等同于封装了 mutex 的夸线程共享对象
  - 内建 ORM - 支持 LINQ
  - unsafe 关键字操作内存不安全内容
  - union 类型
  - sizeof, `__offsetof`
  - 条件编译 `$if` 类似 go build tag 等同于 c 的 preprocessor
  - 函数支持 attribute - 类似 java 的 annotation
  - 通过生成来支持范型
  - 支持编译时反射
  - 支持简单的操作符重载
    - `+, -, *, /, %, <, >, ==, !=, <=, >=`
  - 支持 asm 关键字内联汇编
