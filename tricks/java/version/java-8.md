---
id: java-8
title: Java 8
---

# Java 8

## Contents
* [JSR-000337 JavaTM SE 8 Release Contents](https://jcp.org/aboutJava/communityprocess/mrel/jsr337/index.html)

## Java EE 8
* [JSR-000366 JavaTM Platform, Enterprise Edition 8](https://jcp.org/aboutJava/communityprocess/edr/jsr366/index.html)

## CompletableFuture

* 类似于 JS 中的 Promise
* 相当于 Guava 中的 SettableFuture, ListenableFuture
* 和  ExecutorCompletionService 也有些类似
* 很好的支持 Lambda
* [Java 8: CompletableFuture in action](https://dzone.com/articles/java-8-completablefuture)
* 缺点
  * `CompletableFuture.allOf()` 返回 `CompletableFuture<Void>`
  * 将 Guava 中 `settable` 和 `listenable` future 的功能混合在了一起. `complete()` 方法可能错误的被用户端程序调用,导致程序异常.
  * API 数量过多.
    * 如果分离 `settable` 和 `listenable` 的功能会解决很多问题.

## vJUG24 Session on Optional
* [vJUG24 Session on Optional](https://stuartmarks.wordpress.com/2016/09/27/vjug24-session-on-optional/)
  * [PDF](https://stuartmarks.files.wordpress.com/2016/09/optionalmotherofallbikesheds3.pdf)
* Optional is intended to provide a limited mechanism for library method return types where there is a clear need to represent “no result,” and where using null for that is overwhelmingly likely to cause errors. 
* 基本规则
  1. 不要使用 `null` 作为 Optional 变量或返回值
  2. 除非你能保证 Optional 值存在否则不要使用 `Optional.get()`
  3. 尽量选择或实现其他的接口来避免进行 `Optional.isPresent()` 或 `Optional.get()` 操作
  4. 避免通过使用 Optional 来获取一个值. `Optional.ofNullable(x).orElse(y)` -> `x == null? y: x`
  5. 如果 Optional 的内容还是一个 Optional, 那这就太过于复杂了
* 避免事项
  * 不要用在字段
  * 不要用在方法参数
  * 不要用在集合
* 记住 Optional 是一个封装, 每个 Optional 是个额外的对象会占用 16 字节的资源, 会创建更多的待被 gc 的对象

## BUGS

### JDK-8064803
* [Story of a Java 8 Compiler Bug (JDK-8064803)](https://blog.dogan.io/2015/03/02/java-8-compiler-bug/)
