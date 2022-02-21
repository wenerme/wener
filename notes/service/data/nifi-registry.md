---
title: NiFi Registry
---

# NiFi Registry

- [nifi-registry](https://github.com/apache/nifi/tree/main/nifi-registry)
  - 为 NiFi 流程提供 仓库 和 版本控制 能力

```bash
# 安装
curl -O https://mirror.sjtu.edu.cn/apache/nifi/1.15.3/nifi-registry-1.15.3-bin.zip
unzi nifi-registry-1.15.3-bin.zip
cd nifi-registry-1.15.3

# 本地启动
# http://localhost:18080/nifi-registry/
./bin/nifi-registry.sh start

# Docker
# https://hub.docker.com/r/apache/nifi-registry/
# https://github.com/apache/nifi/blob/main/nifi-registry/nifi-registry-docker-maven/dockermaven/sh/start.sh
# http://127.0.0.1:18080/nifi-registry/
docker run --rm -it \
  -p 18080:18080 \
  --name nifi-registry apache/nifi-registry:1.15.3

# Docker 保留状态,使用 HTTP
docker run --rm -it \
  -p 18080:18080 \
  -v $PWD/nifi-registry-1.15.3:/opt/nifi-registry/nifi-registry-current \
  --name nifi-registry apache/nifi-registry:1.15.3
```

| prop                              | default             | env                              |
| --------------------------------- | ------------------- | -------------------------------- |
| nifi.registry.web.http.port       | 18080               | NIFI_REGISTRY_WEB_HTTP_PORT      |
| nifi.registry.web.http.host       | $HOSTNAME           | NIFI_REGISTRY_WEB_HTTP_HOST      |
| nifi.registry.web.https.port      | 18443               | NIFI_REGISTRY_WEB_HTTPS_PORT     |
| nifi.registry.web.https.host      | $HOSTNAME           | NIFI_REGISTRY_WEB_HTTPS_HOST     |
|                                   |                     | NIFI_REGISTRY_FLOW_PROVIDER      |
|                                   |                     | NIFI_REGISTRY_FLOW_STORAGE_DIR   |
| nifi.registry.db.url              | ⤵︎                  | NIFI_REGISTRY_DB_URL             |
| nifi.registry.db.driver.class     | org.h2.Driver       | NIFI_REGISTRY_DB_CLASS           |
| nifi.registry.db.driver.directory |                     | NIFI_REGISTRY_DB_DIR             |
| nifi.registry.db.username         | nifireg             | NIFI_REGISTRY_DB_USER            |
| nifi.registry.db.password         | nifireg             | NIFI_REGISTRY_DB_PASS            |
| nifi.registry.db.maxConnections   | 5                   | NIFI_REGISTRY_DB_MAX_CONNS       |
| nifi.registry.db.sql.debug        | false               | NIFI_REGISTRY_DB_DEBUG_SQL       |
|                                   |                     | NIFI_REGISTRY_BUNDLE_PROVIDER    |
|                                   | ./extension_bundles | NIFI_REGISTRY_BUNDLE_STORAGE_DIR |

- NIFI_REGISTRY_DB_URL
  - jdbc:h2:./database/nifi-registry-primary;AUTOCOMMIT=OFF;DB_CLOSE_ON_EXIT=FALSE;LOCK_MODE=3;LOCK_TIMEOUT=25000;WRITE_DELAY=0;AUTO_SERVER=FALSE
- NIFI_REGISTRY_FLOW_PROVIDER
  - conf/providers.xml
  - file
  - git
    - NIFI_REGISTRY_GIT_REMOTE
    - NIFI_REGISTRY_GIT_USER
    - NIFI_REGISTRY_GIT_PASSWORD
- NIFI_REGISTRY_BUNDLE_PROVIDER
  - file
  - s3
    - NIFI_REGISTRY_S3_REGION
    - NIFI_REGISTRY_S3_BUCKET_NAME
    - NIFI_REGISTRY_S3_KEY_PREFIX
    - NIFI_REGISTRY_S3_CREDENTIALS_PROVIDER - $DEFAULT_CHAIN
    - NIFI_REGISTRY_S3_ACCESS_KEY
    - NIFI_REGISTRY_S3_SECRET_ACCESS_KEY
    - NIFI_REGISTRY_S3_ENDPOINT_URL
