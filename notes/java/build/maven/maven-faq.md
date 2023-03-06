---
tags:
  - FAQ
---

# Maven FAQ

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
