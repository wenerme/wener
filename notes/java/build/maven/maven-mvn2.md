---
title: mvnw
---

# mvn2


```
https://repo.maven.apache.org/maven2/org/codehaus/plexus/plexus-utils/2.0.1/plexus-utils-2.0.1.jar
```

- https://jitpack.io/com/github/NanoHttpd/nanohttpd/Release-2.1.0/build.log
- https://jitpack.io/com/github/CarGuo/GSYVideoPlayer/v8.3.5-release-jitpack/build.log
  - https://jitpack.io/com/github/CarGuo/GSYVideoPlayer/v8.3.5-release-jitpack/GSYVideoPlayer-v8.3.5-release-jitpack.pom
  - jitpack 可能 jar 消失
    - https://github.com/jitpack/jitpack.io/issues/5982

```
/.m2/repository/（本地仓库根目录）
├── groupId（通常与组织的包名相对应，路径由`.`转换为`/`）
│   └── artifactId（项目或模块的名称）
│       └── version（版本号）
│           ├── artifactId-version.jar（主JAR文件）
│           ├── artifactId-version.pom（项目对象模型文件）
│           ├── artifactId-version-sources.jar（源代码包）
│           └── artifactId-version-javadoc.jar（Javadoc文档）
```

```
[仓库URL]/[groupId 替换 '.' 为 '/']/[artifactId]/[version]/[artifactId]-[version](-[classifier]).[type]
```
