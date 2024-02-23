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
brew install gradle      # for macOS

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

## env

| env              | default   | for      |
| ---------------- | --------- | -------- |
| GRADLE_HOME      |           | 安装目录 |
| GRADLE_USER_HOME | ~/.gradle | 用户目录 |

- Windows
  - GRADLE_USER_HOME=`C:\Users\<USERNAME>\.gradle`

```txt title=GRADLE_USER_HOME
├── caches
│   ├── 4.8
│   ├── 4.9
│   ├── ⋮
│   ├── jars-3
│   └── modules-2
├── daemon
│   ├── ⋮
│   ├── 4.8
│   └── 4.9
├── init.d
│   └── my-setup.gradle
├── jdks
│   ├── ⋮
│   └── jdk-14.0.2+12
├── wrapper
│   └── dists
│       ├── ⋮
│       ├── gradle-4.8-bin
│       ├── gradle-4.9-all
│       └── gradle-4.9-bin
└── gradle.properties
```

- https://docs.gradle.org/current/userguide/directory_layout.html

## gradle.properties

- https://docs.gradle.org/current/userguide/build_environment.html

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

## cache

```bash
gradle --build-cache compileJava
gradle --build-cache compileJava -Dorg.gradle.caching.debug=true

ls ~/.gradle/caches/build-cache-1/

gradle clean
```

```properties title=gradle.properties
org.gradle.caching=true
```

**远程缓存**

```groovy
buildCache {
    remote(HttpBuildCache) {
        url = 'https://example.com:8123/cache/'
        credentials {
            username = 'build-cache-user-name'
            password = 'build-cache-password'
        }
    }
}
```

- https://docs.gradle.org/current/userguide/build_cache.html
