---
title: therapi-runtime-javadoc
---

# therapi-runtime-javadoc

- [dnault/therapi-runtime-javadoc](https://github.com/dnault/therapi-runtime-javadoc)
  - 提取 javadoc 在运行时可用
  - 通过 Annotation Processors 实现
  - 支持 io.swagger.v3.oas.annotations
  - bundled
    - minimal-json
    - JavaPoet

```xml title="pom.xml"
<!-- Annotation processor -->
<dependency>
    <groupId>com.github.therapi</groupId>
    <artifactId>therapi-runtime-javadoc-scribe</artifactId>
    <version>0.13.0</version>
    <scope>provided</scope>
</dependency>

<!-- Runtime library -->
<dependency>
    <groupId>com.github.therapi</groupId>
    <artifactId>therapi-runtime-javadoc</artifactId>
    <version>0.13.0</version>
</dependency>
```
