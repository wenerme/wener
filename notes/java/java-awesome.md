---
title: Java
tags:
  - Awesome
---

# Java Awesome

## JDK

:::tip JDK 和 版本

- 用 [adoptium]
- 只用 LTS 版本

:::

- 发行版
  - [adoptium]
    - AdoptOpenJDK -> Adoptium
    - Eclipse 维护
  - Amazon Corretto
  - Alibaba Dragonwell
  - GraalVM
  - Eclipse Temurin - adoptium
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
- javacc
- antlr

## Learn

- [Snailclimb/JavaGuide](https://github.com/Snailclimb/JavaGuide)
- [elunez/eladmin](https://github.com/elunez/eladmin)

## GUI

- [JetBrains/compose-jb](https://github.com/JetBrains/compose-jb)
  - Compose for Desktop

## Misc

- [apple/GCGC](https://github.com/apple/GCGC)
  - GC 日志分析
