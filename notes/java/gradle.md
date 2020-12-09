---
id: gradle
title: Gradle
---

# Gradle

## Tips

* [Userguide](https://docs.gradle.org/current/userguide/userguide.html)
* [Building Java 9 Modules](https://guides.gradle.org/building-java-9-modules/)
* [maven 2 gradle](https://sagioto.github.io/maven2gradle/)
  * 转换 dependency

```bash
# https://docs.gradle.org/current/userguide/build_init_plugin.html
# 生成基本配置
# --type pom,java-application,java-library,scala-library,groovy-library,basic
gradle init

# 刷新依赖
gradlew build --refresh-dependencies
# 代理
gradlew -Dhttp.proxyHost=127.0.0.1 -Dhttp.proxyPort=1234 -Dhttps.proxyHost=127.0.0.1 -Dhttps.proxyPort=1234 build
```

__gradle.properties__

```ini
# 代理配置
systemProp.http.proxyHost=127.0.0.1
systemProp.http.proxyPort=1234
systemProp.https.proxyHost=127.0.0.1
systemProp.https.proxyPort=1234

# 如果需要授权
# http.proxyUser=usernameProxy
# http.proxyPassword=yourPassoword
```

```groovy
// https://docs.gradle.org/current/userguide/declaring_repositories.html
mavenCentral()
maven {
    url "http://maven.aliyun.com/nexus/content/groups/public"
}
```
