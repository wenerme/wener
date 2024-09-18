---
tags:
  - Awesome
---

# Java Awesome

- 反编译/解密
  - [mstrobel/procyon](https://github.com/mstrobel/procyon)
  - [CFR](http://www.benf.org/other/cfr) another java decompiler
  - Fernflower https://github.com/JetBrains/intellij-community/tree/master/plugins/java-decompiler/engine
    - Apache-2.0
    - by IDEA
    - mirror [fesh0r/fernflower](https://github.com/fesh0r/fernflower)
  - [java-deobfuscator/deobfuscator](https://github.com/java-deobfuscator/deobfuscator)
    - Apache-2.0
  - JD-GUI https://github.com/java-decompiler/jd-gui
    - http://jd.benow.ca/
- 加密/混淆
  - [core-lib/xjar](https://github.com/core-lib/xjar)
    - Apache-2.0, Java
  - [roseboy/classfinal](https://github.com/roseboy/classfinal)
    - Apache-2.0, Java
    - Java Class Encryption Tool
    - 基于 -agentJava:xxx.jar
    - 原始的class文件并不会完全被加密，只是方法体被清空，保留方法参数、注解等信息，这是为了兼容spring，swagger等扫描注解的框架； 方法体被清空后，反编译者只能看到方法名和注解，看不到方法的具体内容；当class被classloader加载时，真正的方法体会被解密注入。
    - [gitee](https://gitee.com/roseboy/classfinal)
    - `java -javaagent:yourpaoject-encrypted.jar='-pwd 0000000' -jar yourpaoject-encrypted.jar`
    - 为了保证项目在运行时的安全，启动jvm时请加参数: -XX:+DisableAttachMechanism
    - https://github.com/roseboy/classfinal/blob/master/classfinal-core/src/main/java/net/roseboy/classfinal/JarDecryptor.java
    - 默认密码 org.springframework.config.Pass
    - 机器码 org.springframework.config.Code
    - 密码的 Hash org.springframework.config.PassHash
    - META-INF/.classes/
    - net.roseboy.classfinal.CoreAgent

```java
import net.roseboy.classfinal.JarDecryptor;
import net.roseboy.classfinal.util.EncryptUtils;
import net.roseboy.classfinal.util.StrUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class DecryptClassFinal {
    public static void main(String[] args) throws IOException {
        String src =System.getProperty("user.dir") +  "/tmp/META-INF/.classes";
        String dst = System.getProperty("user.dir") + "/src/main/class";


        File srcDir = new File(src);
        JarDecryptor.getInstance();
        String pass = Files.readString(Path.of(src+"/org.springframework.config.Pass"));
        char[] password =  EncryptUtils.md5(pass.toCharArray());

        System.out.printf("src:%s\n", src);
        System.out.printf("dst:%s\n", dst);
        System.out.printf("password:%s\n", pass);

        if (srcDir.isDirectory()) {
            for (File file : srcDir.listFiles()) {
                String fp = file.getName();
                if (fp.startsWith("org.springframework")) {
                    continue;
                }

                byte[] fileBytes = Files.readAllBytes(file.toPath());
                byte[] out = dec(password, fp, fileBytes);

                String[] split = fp.split("[.]");
                String fn = split[split.length-1];

                String p = dst+"/"+ fp.substring(0, fp.lastIndexOf('.')).replaceAll("[.]", "/");
                new File(p).mkdirs();
                String f = p+"/"+ fn +".class";

                System.out.println("Write to: "+f+" Len:"+out.length);
                Files.write(new File(f).toPath(), out);
            }
        }

    }

    public static byte[] dec(char[] password, String fileName, byte[] bytes){
        char[] pass;
        pass = StrUtils.merger(new char[][]{password, fileName.toCharArray()});
        return  EncryptUtils.de(bytes, pass, 1);
    }
}
```

```bash
java -cp ~/Applications/IntelliJ\ IDEA\ Ultimate.app/Contents/plugins/java-decompiler/lib/java-decompiler.jar \
  org.jetbrains.java.decompiler.main.decompiler.ConsoleDecompiler \
  -dgs=true \
  src/main/class/ src/main/java/
```

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
