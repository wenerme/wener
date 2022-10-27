---
title: Java
tags:
  - Awesome
---

# Java Awesome

## JDK

:::tip 如何选择 JDK 和 版本？

- 用 [Adoptium]
- 只用 LTS 版本

:::

- 发行版
  - [Adoptium]
    - AdoptOpenJDK -> Adoptium
    - Eclipse 维护
    - Eclipse Temurin - name of the OpenJDK distribution from Adoptium
  - Amazon Corretto
  - Alibaba Dragonwell
  - GraalVM
  - Java.net
  - Zulu
  - Liberica
  - Liberica NIK
  - Microsoft
  - Oracle
  - Mandrel
  - SapMachine
  - Semeru
  - Trava
- JVM 实现
  - Hotpot
  - OpenJ9
  - GraalVM
  - [SubstrateVM](https://github.com/oracle/graal/tree/master/substratevm)
    - GraalVM Native
- [whichjdk](https://whichjdk.com/)
  - https://www.pentalog.com/blog/it-development-technology/java-versions-distributions-platforms
- Version Manager
  - https://sdkman.io/
    - [sdkman/sdkman-cli](https://github.com/sdkman/sdkman-cli)
      - shell
  - [jenv/jenv](https://github.com/jenv/jenv)
    - shell
  - [shyiko/jabba](https://github.com/shyiko/jabba)
    - golang

[adoptium]: https://adoptium.net/

```bash
curl -s https://get.sdkman.io | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk list java
sdk install java 8.0.312-tem
```

## 效率

- lombok

## Frameworks

- spring
- microprofile
- quakus
- [OpenLiberty/open-liberty](https://github.com/OpenLiberty/open-liberty)
  - IBM
- [oracle/helidon](https://github.com/oracle/helidon)
  - microservices
- micronaut
- vertx
- Sprint Cloud Vendor
  - Sprint Cloud Alibaba
  - Sprint Cloud GCP
  - Sprint Cloud Netflix
  - Sprint Cloud AWS
  - Sprint Cloud Azure
  - Sprint Cloud Huawei
- 国产
  - [nutzam/nutz](https://github.com/nutzam/nutz)

## 平台

- jhipster
- [jeecgboot/jeecg-boot](https://github.com/jeecgboot/jeecg-boot)

## ORM

- Hibernet

## IoC

- guice
- dapper

## Tools

- jodd
- jool
- joor

## DTO

- [mapstruct/mapstruct](https://github.com/mapstruct/mapstruct)
  - 对象互转 - 基于反射

## Tool Chain

- maven
- gradle
- jid

## Languages

- kotlin
- graalvm
- [javacc](../languages/parser/javacc.md)
- [antlr](../languages/parser/antlr4.md)

## Learn

- [Snailclimb/JavaGuide](https://github.com/Snailclimb/JavaGuide)
- [elunez/eladmin](https://github.com/elunez/eladmin)

## GUI

- [JetBrains/compose-jb](https://github.com/JetBrains/compose-jb)
  - Compose for Desktop

## Misc

- [apple/GCGC](https://github.com/apple/GCGC)
  - GC 日志分析

## Spec

- loom
  - https://github.com/ebarlas/project-loom-comparison

## Debugging

- [runsidekick/sidekick](https://github.com/runsidekick/sidekick)
  - AGPL-3.0, Java
  - Like chrome dev tools but for your backend
