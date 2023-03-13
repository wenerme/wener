---
title: Maven Wrapper
---

# Maven Wrapper

- MVNW_REPOURL
- MVNW_USERNAME
- MVNW_PASSWORD
- MVNW_VERBOSE
- https://maven.apache.org/wrapper/

```bash
# -Dmaven=3.5.4
MVNW_REPOURL=https://maven.aliyun.com/nexus/content/groups/public mvn wrapper:wrapper
MVNW_REPOURL=https://maven-central.storage.googleapis.com/maven2 mvn wrapper:wrapper

git add .mvn mvnw mvnw.cmd
```
