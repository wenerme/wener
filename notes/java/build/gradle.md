---
title: Gradle
---

# Gradle

- [Userguide](https://docs.gradle.org/current/userguide/userguide.html)
- [Building Java 9 Modules](https://guides.gradle.org/building-java-9-modules/)
- [maven 2 gradle](https://sagioto.github.io/maven2gradle/)
  - 转换 dependency
- https://gradle.org/releases/

```bash
sdk install gradle 8.0.1 # for SDKMAN
brew install gradle # for macOS

# wrapper 升级
./gradlew wrapper --gradle-version=8.0.1 --distribution-type=bin

# https://docs.gradle.org/current/userguide/build_init_plugin.html
# 生成基本配置
# --type pom,java-application,java-library,scala-library,groovy-library,basic
gradle init

# 刷新依赖
./gradlew build --refresh-dependencies
# 代理
./gradlew -Dhttp.proxyHost=127.0.0.1 -Dhttp.proxyPort=1234 -Dhttps.proxyHost=127.0.0.1 -Dhttps.proxyPort=1234 build
```

**gradle.properties**

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

```groovy
// build.gradle or settings.gradle
repositories {
  maven {
    url "http://repo1.mycompany.com/maven2"
  }
  maven {
    url "http://repo2.mycompany.com/maven2"
  }
}
```

## gradle.properties

```ini
org.gradle.daemon=true
```

- GRADLE_OPTS
  - `-Dorg.gradle.daemon=false`

## daemon

```bash
./gradlew -d --no-daemon
```

- https://docs.gradle.org/8.0.1/userguide/gradle_daemon.html

# FAQ


## killall

```bash
pkill -9 -f GradleDaemon
kill -9 $(pgrep -f GradleDaemon)
```


## Waiting to acquire shared lock on daemon addresses registry

- ~/.gradle/daemon/6.8/registry.bin.lock

```
[org.gradle.execution.plan.DefaultExecutionPlan] No node could be selected, nodes ready: false
[org.gradle.cache.internal.DefaultFileLockManager] Waiting to acquire shared lock on daemon addresses registry.
[org.gradle.cache.internal.DefaultFileLockManager] Lock acquired on daemon addresses registry.
[org.gradle.cache.internal.DefaultFileLockManager] Releasing lock on daemon addresses registry.
```

```bash
find .gradle/ -name '*.lock'

rm -rf .gradle
rm -rf ~/.gradle/caches
rm -rf ~/.gradle/daemon
```

- lombok val
- https://github.com/gradle/gradle/issues/14531
