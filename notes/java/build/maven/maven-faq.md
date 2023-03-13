---
tags:
  - FAQ
---

# Maven FAQ

## 为什么要避免构建阶段动态替换

配置 maven 替换 `@build.version@`

**什么时候用？**

1. 与运行无关的信息
  - 版本号
  - git commit 信息
  - 模板信息 - 例如公司品牌名字


**为什么不要用于运行时**

1. 需要多次构建
  - 无法发布
  - 不能确 dev 的 jar 和 prod 的 jar 一样
1. 信息泄漏
  - 账号密码
1. 无法运维时配置

## optional vs provided

- optional 只影响包的传递性, 不影响包的 ClassPath
- provided 只在 compile 和 test 下存在, 并且不会传递
- 所以区别在于 optional 在 runtime 时生效, 而 provided 不生效

## Scope 的作用域

| scope    | compile | test | runtime | transitive |
| -------- | ------- | ---- | ------- | ---------- |
| compile  | Y       | Y    | Y       | Y          |
| test     | -       | Y    | -       | -          |
| provided | Y       | Y    | -       | -          |
| runtime  | -       | Y    | Y       | Y          |
| system   | Y       | Y    | -       | Y          |

## Current maven session contains banned repository urls, please double check your pom or settings.xml

## install file

```bash
mvn install:install-file -DgroupId=com.aspose.words -DartifactId=aspose-words -Dversion=19.5 -Dpackaging=jar -Dfile=aspose-words-19.5-jdk.jar
```

- https://releases.aspose.com/java/repo/com/aspose/aspose-words/19.5/

## deploy-file

```bash
mvn deploy:deploy-file -DgroupId=com.aspose \
  -DartifactId=aspose-cells \
  -Dversion=18.9 \
  -Dpackaging=jar \
  -Dfile=aspose-cells-18.9.jar \
  -DrepositoryId=demo-maven \
  -Durl=https://demo-maven.pkg.coding.net/repository/demo/demo-maven
```

## reproducible

```xml
<properties>
  <project.build.outputTimestamp>2023-01-01T00:00:00Z</project.build.outputTimestamp>
</properties>
```

```bash
mvn artifact:check-buildplan
```

- https://maven.apache.org/guides/mini/guide-reproducible-builds.html
- [spring-projects/spring-boot#21005](https://github.com/spring-projects/spring-boot/issues/21005)
  - Apply consistent timestamps to files added to a fat archive
