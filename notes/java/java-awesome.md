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
curl -s "https://get.sdkman.io?rcupdate=false" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk list java
sdk install java 8.0.312-tem

# 自定义
export SDKMAN_DIR="/usr/local/sdkman" && curl -s "https://get.sdkman.io?rcupdate=false" | bash
source $SDKMAN_DIR/bin/sdkman-init.sh
```

- SDKMAN_DIR=~/.sdkman
  - /candidates/java/17.0.6-tem
  - /tmp
    - java-17.0.6-tem.bin - 可手动下载
    - visualvm-2.0.2.bin
    - `sdk visualvm 2.0.2`
- 无 musl https://github.com/sdkman/sdkman-cli/issues/1133

## Languages

- kotlin
- graalvm
- [javacc](../languages/parser/javacc.md)
- [antlr](../languages/parser/antlr4.md)

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

## 整合

- jhipster
- [jeecgboot/jeecg-boot](https://github.com/jeecgboot/jeecg-boot)
- [elunez/eladmin](https://github.com/elunez/eladmin)

## Database

- ORM
  - Hibernet
  - JPA
- MyBatis
- [jooq](https://github.com/jOOQ/jOOQ)
- querydsl

## IoC

- [guice](./lib/guice.md)
- dapper

## Library

- Core
  - apache commons
  - [dromara/hutool](https://github.com/dromara/hutool)
  - [oblac/jodd](https://github.com/oblac/jodd)
    - ⚠️ 不活跃
- Lambda
  - [jool](https://github.com/jOOQ/jOOL)
- Reflection
  - [joor](https://github.com/jOOQ/jOOR)
    - Fluent Reflection
- DTO/Convert
  - [mapstruct/mapstruct](https://github.com/mapstruct/mapstruct)
    - 对象互转 - 基于反射
- Doc/Meta
  - [springdoc](./lib/springdoc.md)
    - OpenAPI 3
    - JSR-303
    - SpringBoot v1,v2,v3
    - 支持 GraalVM
  - [springfox/springfox](https://github.com/springfox/springfox)
    - ⚠️ 停止维护，不支持 SpringBoot 3.0
    - 使用注解
- HTML/Dom
  - [joox](https://github.com/jOOQ/jOOX)
- [javers](https://github.com/javers/javers)
  - object auditing and diff framework for Java
  - @Audited
  - @javax.persistence.OrderColumn
  - @CollectionId
  - AuditJoinTable
  - AuditMappedBy

## Tool Chain

- [maven](./build/maven/README.md)
- [gradle](./build/gradle/README.md)
- [jib](./build/jib.md)

## Learn

- [Snailclimb/JavaGuide](https://github.com/Snailclimb/JavaGuide)

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

## Template

- Apache FreeMarker
- Apache Velocity
- Thymeleaf
- Apache Tiles
  - Web APP
- Mustache.java
- Groovy
- jsp
- [antlr/stringtemplate4](https://github.com/antlr/stringtemplate4)

## QA

- Checkstyle, PMD, JDepend
- Platform
  - Hudson
  - Jenkins
    - SonarQube Scanner
      - https://docs.sonarqube.org/latest/analyzing-source-code/scanners/jenkins-extension-sonarqube/
  - SonarQube
  - Squale
  - XRadar
- https://maven.apache.org/code-quality-management.html
