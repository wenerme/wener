
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

__缺点__

* `CompletableFuture.allOf()` 返回 `CompletableFuture<Void>`
* 将 Guava 中 `settable` 和 `listenable` future 的功能混合在了一起. `complete()` 方法可能错误的被用户端程序调用,导致程序异常.
* API 数量过多.
  * 如果分离 `settable` 和 `listenable` 的功能会解决很多问题.


__参考__

* [Java 8: CompletableFuture in action](https://dzone.com/articles/java-8-completablefuture)

## BUGS

### JDK-8064803
* [Story of a Java 8 Compiler Bug (JDK-8064803)](https://blog.dogan.io/2015/03/02/java-8-compiler-bug/)
