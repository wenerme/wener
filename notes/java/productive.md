---
title: 生产力
---

# 增加 Java 生产力的相关工具和库

- http://www.jsonschema2pojo.org/
- [javaparser/javaparser](https://github.com/javaparser/javaparser)
  - [javaparser.org](http://javaparser.org)
  - Java 9 Parser and Abstract Syntax Tree for Java

## APT

- [JSR 269](https://jcp.org/en/jsr/detail?id=269): Pluggable Annotation Processing API
- Java 8 [javax.annotation.processing](https://docs.oracle.com/javase/8/docs/api/index.html?javax/annotation/processing/package-summary.html)
- Java 9 [javax.annotation.processing](https://docs.oracle.com/javase/9/docs/api/index.html?javax/annotation/processing/package-summary.html)
- http://www.jianshu.com/p/d294bf008bec
- [JEP 119](http://openjdk.java.net/jeps/119): javax.lang.model Implementation Backed by Core Reflection
- javax.annotation.processing.Processor
- javax.annotation.processing.AbstractProcessor
- javax.annotation.processing
- javax.lang.model
- javax.annotation.processing.SupportedAnnotationTypes
  - 支持的注解类型
- javax.annotation.processing.SupportedSourceVersion
  - 支持的源码版本
- javax.annotation.processing.SupportedOptions
  - 可以使用的参数, 可以在编译时传入
- javac
  - `-Akey[=value]`
    - 自定义参数传递
  - `-proc:{none|only}`
    - 不启用或只进行注解处理
  - `-processorpath path`
  - `-s dir`
    - 生成源码目录
  - `-processor class1[,class2,class3…]`
    - 指定注解处理器

```java
@SupportedAnnotationTypes("org.mapstruct.Mapper")
@SupportedOptions({
    "ABC"
})
public class MyProcessor extends AbstractProcessor {

}
```
