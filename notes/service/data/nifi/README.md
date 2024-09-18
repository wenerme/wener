---
title: Apache NiFi
tags:
  - Apache
---

# Apache NiFi

- [apache/nifi](https://github.com/apache/nifi)
  - Cloudera Dataflow Pipeline
- nifi-stateless
- nifi-registry
  - NiFi Process Group 版本管理 - Flow 仓库
- minifi
  - 轻量级的 NiFi - 支持部分功能
  - 适用于 Edge 部署
  - [apache/nifi-minifi-cpp](https://github.com/apache/nifi-minifi-cpp)
    - C++
    - 适用于 Ingest 和最终输出
    - [processors](https://github.com/apache/nifi-minifi-cpp/blob/main/PROCESSORS.md)
  - [minifi](https://github.com/apache/nifi/tree/main/minifi)
    - Java
    - minifi-bin.zip 271M vs nifi-bin.zip 1.5G
    - 功能按需打包 - NAR
    - [minifi/minifi-docker](https://github.com/apache/nifi/tree/main/minifi/minifi-docker)
      - apache/nifi-minifi
- [apache/nifi-fds](https://github.com/apache/nifi-fds) - Flow Design System
  - Angular, 前端组件
- 参考
  - [User Guide](https://nifi.apache.org/docs/nifi-docs/html/user-guide.html)
  - [Administration Guide](https://nifi.apache.org/docs/nifi-docs/html/administration-guide.html)
  - [NiFi In Depth](https://nifi.apache.org/docs/nifi-docs/html/nifi-in-depth.html)
  - [Simple Change Data Capture (CDC) with SQL Selects via Apache NiFi (FLaNK)](https://dev.to/tspannhw/simple-change-data-capture-cdc-with-sql-selects-via-apache-nifi-flank-19m4)
  - [REST API](https://nifi.apache.org/docs/nifi-docs/rest-api/index.html)

:::caution

- 一个 NiFi 实例只有一个 flow
  - 通过 Process Group 管理多组逻辑
- 默认 bootstrap.conf 为 -Xmx512m
  - 正常使用多半不够

:::

:::tip

- 处理过程尽量使用 Avro
  - 面向行
  - 包含 schema 信息
  - 比 JSON 支持更多类型 - 例如: DB 插入的 Date 列的时候，JSON 可能失败。

:::

```bash
# Docker 启动
# ===========
# https://hub.docker.com/r/apache/nifi
# NIFI_HOME /opt/nifi/nifi-current
# NIFI_TOOLKIT_HOME /opt/nifi/nifi-toolkit-current
# -v $PWD/data:/opt/nifi/nifi-current
# 密码至少 12 位
# 脚本里列举了支持的变量
# https://github.com/apache/nifi/blob/main/nifi-docker/dockerhub/sh/start.sh
docker run --rm -it \
  -p 8443:8443 \
  -e SINGLE_USER_CREDENTIALS_USERNAME=admin \
  -e SINGLE_USER_CREDENTIALS_PASSWORD=000000000000 \
  --name nifi apache/nifi

# 启动后
docker exec -it nifi bash
./bin/nifi.sh status

# 本地 启动
# ===========
./bin/nifi.sh set-single-user-credentials admin 000000000000
./bin/nifi.sh start   # 启动
./bin/nifi.sh status  # 查看状态
# 日志
tail -F logs/nifi-app.log
```

```bash title="推荐生产使用方式"
# 状态留在 Host
curl -O https://mirror.sjtu.edu.cn/apache/nifi/1.15.3/nifi-1.15.3-bin.zip
unzip nifi-1.15.3-bin.zip
cat > .nifi-env <<CONF
CONF
# 准备 volume - 因为 dockerfile 定义了 volume - 不覆盖容器内会无法访问到外部
mkdir -p nifi-1.15.3/{logs,conf,database_repository,flowfile_repository,content_repository,provenance_repository,state}
chown 1000 nifi-1.15.3/{logs,conf,database_repository,flowfile_repository,content_repository,provenance_repository,state}

# https://github.com/apache/nifi/blob/main/nifi-docker/dockerhub/Dockerfile#L77-L83
# Docker 内启动 - 环境隔离，简化配置
docker run --rm -it \
  -p 8443:8443 \
  -v $PWD/nifi-1.15.3:/opt/nifi/nifi-current \
  -v $PWD/nifi-1.15.3/logs:/opt/nifi/nifi-current/logs \
  -v $PWD/nifi-1.15.3/conf:/opt/nifi/nifi-current/conf \
  -v $PWD/nifi-1.15.3/state:/opt/nifi/nifi-current/state \
  -v $PWD/nifi-1.15.3/database_repository:/opt/nifi/nifi-current/database_repository \
  -v $PWD/nifi-1.15.3/flowfile_repository:/opt/nifi/nifi-current/flowfile_repository \
  -v $PWD/nifi-1.15.3/content_repository:/opt/nifi/nifi-current/content_repository \
  -v $PWD/nifi-1.15.3/provenance_repository:/opt/nifi/nifi-current/provenance_repository \
  -e SINGLE_USER_CREDENTIALS_USERNAME=admin \
  -e SINGLE_USER_CREDENTIALS_PASSWORD=000000000000 \
  --name nifi apache/nifi:1.15.3
```

| property                                            | default                             | env                                        |
| --------------------------------------------------- | ----------------------------------- | ------------------------------------------ |
| nifi.web.https.host                                 | $HOSTNAME                           | NIFI_WEB_HTTPS_HOST                        |
| nifi.web.https.port                                 | 8443                                | NIFI_WEB_HTTPS_PORT                        |
| nifi.web.proxy.host                                 |                                     | NIFI_WEB_PROXY_HOST                        |
| nifi.web.proxy.context.path                         |                                     | NIFI_WEB_PROXY_CONTEXT_PATH                |
| nifi.web.http.host                                  |                                     | NIFI_WEB_HTTP_HOST                         |
| nifi.web.http.port                                  |                                     | NIFI_WEB_HTTP_PORT                         |
| nifi.remote.input.host                              | $HOSTNAME                           | NIFI_REMOTE_INPUT_HOST                     |
| nifi.remote.input.secure                            | true                                |                                            |
| nifi.remote.input.socket.port                       | 10000                               | NIFI_REMOTE_INPUT_SOCKET_PORT              |
| nifi.variable.registry.properties                   |                                     | NIFI_VARIABLE_REGISTRY_PROPERTIES          |
| nifi.cluster.flow.election.max.candidates           |                                     | NIFI_ELECTION_MAX_CANDIDATES               |
| nifi.cluster.flow.election.max.wait.time            | 5 mins                              | NIFI_ELECTION_MAX_WAIT                     |
| nifi.cluster.is.node                                | false                               | NIFI_CLUSTER_IS_NODE                       |
| nifi.cluster.node.address                           | $HOSTNAME                           | NIFI_CLUSTER_ADDRESS                       |
| nifi.cluster.node.protocol.max.threads              | 50                                  | NIFI_CLUSTER_NODE_PROTOCOL_MAX_THREADS     |
| nifi.cluster.node.protocol.port                     |                                     | NIFI_CLUSTER_NODE_PROTOCOL_PORT            |
| nifi.cluster.protocol.is.secure                     | true                                | $NIFI_CLUSTER_IS_NODE                      |
| nifi.zookeeper.connect.string                       |                                     | NIFI_ZK_CONNECT_STRING                     |
| nifi.zookeeper.root.node                            | /nifi                               | NIFI_ZK_ROOT_NODE                          |
| nifi.analytics.predict.enabled                      | false                               | NIFI_ANALYTICS_PREDICT_ENABLED             |
| nifi.analytics.predict.interval                     | 3 mins                              | NIFI_ANALYTICS_PREDICT_INTERVAL            |
| nifi.analytics.query.interval                       | 5 mins                              | NIFI_ANALYTICS_QUERY_INTERVAL              |
| nifi.analytics.connection.model.implementation      | ⤵︎                                  | NIFI_ANALYTICS_MODEL_IMPLEMENTATION        |
| nifi.analytics.connection.model.score.name          | rSquared                            | NIFI_ANALYTICS_MODEL_SCORE_NAME            |
| nifi.analytics.connection.model.score.threshold     | .90                                 | NIFI_ANALYTICS_MODEL_SCORE_THRESHOLD       |
| nifi.sensitive.props.key                            |                                     | NIFI_SENSITIVE_PROPS_KEY                   |
| nifi.security.keystore                              |                                     | KEYSTORE_PATH                              |
| nifi.security.keystoreType                          |                                     | KEYSTORE_TYPE                              |
| nifi.security.keystorePasswd                        |                                     | KEYSTORE_PASSWORD                          |
| nifi.security.keyPasswd                             | $KEYSTORE_PASSWORD                  | KEY_PASSWORD                               |
| nifi.security.truststore                            |                                     | TRUSTSTORE_PATH                            |
| nifi.security.truststoreType                        |                                     | TRUSTSTORE_TYPE                            |
| nifi.security.truststorePasswd                      |                                     | TRUSTSTORE_PASSWORD                        |
| nifi.security.user.authorizer                       | managed-authorizer                  | NIFI_SECURITY_USER_AUTHORIZER              |
| nifi.security.user.login.identity.provider          |                                     | NIFI_SECURITY_USER_LOGIN_IDENTITY_PROVIDER |
| nifi.security.autoreload.enabled                    | false                               |
| nifi.security.autoreload.interval                   | 10 secs                             |
|                                                     |                                     | NODE_IDENTITY                              |
|                                                     |                                     | INITIAL_ADMIN_IDENTITY                     |
|                                                     |                                     | SINGLE_USER_CREDENTIALS_USERNAME           |
|                                                     |                                     | SINGLE_USER_CREDENTIALS_PASSWORD           |
|                                                     |                                     | AUTH                                       |
| nifi.ui.banner.text                                 |
| nifi.ui.autorefresh.interval                        | 30 sec                              |
| nifi.flow.configuration.file                        | ./conf/flow.xml.gz                  |
| nifi.authorizer.configuration.file                  | ./conf/authorizers.xml              |
| nifi.database.directory                             | ./database_repository               |
| nifi.documentation.working.directory                | ./work/docs/components              |
| nifi.login.identity.provider.configuration.file     | ./conf/login-identity-providers.xml |
| nifi.nar.library.autoload.directory                 | ./extensions                        |
| nifi.nar.library.directory                          | ./lib                               |
| nifi.nar.working.directory                          | ./work/nar/                         |
| nifi.templates.directory                            | ./conf/templates                    |
| nifi.state.management.embedded.zookeeper.properties | ./conf/zookeeper.properties         |
| nifi.flowfile.repository.directory                  | ./flowfile_repository               |
| nifi.content.repository.directory.default           | ./content_repository                |
| nifi.provenance.repository.directory.default        | ./provenance_repository             |
| nifi.status.repository.questdb.persist.location     | ./status_repository                 |
| nifi.web.jetty.working.directory                    | ./work/jetty                        |

- 设置了 NIFI_WEB_HTTP_PORT 则会取消 https
- nifi.analytics.connection.model.implementation
  - 默认 org.apache.nifi.controller.status.analytics.models.OrdinaryLeastSquares
- AUTH - tls,ldap
- NIFI_SECURITY_USER_LOGIN_IDENTITY_PROVIDER - ldap-provider
- nifi.variable.registry.properties
  - 提供变量的文件
- nifi.sensitive.props.key
  - 用于加密敏感信息的 Key
  - 迁移时确保 Key 相同
  - ./nifi-toolkit/bin/encrypt-config.sh 可离线修改或恢复
  - `./bin/nifi.sh set-sensitive-properties-key <sensitivePropertiesKey>`
    - 可启动后修改
    - 至少 12 位

```bash
# 修改密码
./nifi-toolkit/bin/encrypt-config.sh \
  -f nifi-old/conf/flow.xml.gz -g nifi-new/conf/flow.xml.gz \
  -n nifi-old/conf/nifi.properties -o nifi-new/conf/nifi.properties \
  -x \
  -s new_password
```

**JVM 配置**

| env                | bootstrap.conf | default |
| ------------------ | -------------- | ------- |
| NIFI_JVM_HEAP_INIT | java.arg.2     | 512m    |
| NIFI_JVM_HEAP_MAX  | java.arg.3     | 512m    |
| NIFI_JVM_DEBUGGER  | java.arg.debug |

**端口**

| props                               | port  | note                 |
| ----------------------------------- | ----- | -------------------- |
| nifi.web.https.port                 | 8443  |
| nifi.remote.input.socket.port       | 10443 |
| nifi.cluster.node.protocol.port     | 11443 |
| nifi.cluster.node.load.balance.port | 6342  |
| clientPort                          | 2181  | zookeeper.properties |

- conf/flow.xml.gz
- conf/bootstrap.conf
  - 提供 JVM 相关参数
- conf/nifi.properties
  - 核心 NiFi 配置
- conf/login-identity-providers.xml
  - 登陆认证设置
  - single-user-provider
  - ldap-provider
  - kerberos-provider
- conf/authorizers.xml
  - 提供认证信息
  - file-user-group-provider
    - conf/users.xml
  - ldap-user-group-provider
  - shell-user-group-provider
  - azure-graph-user-group-provider
  - composite-user-group-provider
  - composite-configurable-user-group-provider
  - file-access-policy-provider
  - managed-authorizer - org.apache.nifi.authorization.StandardManagedAuthorizer
  - file-provider - 被 managed-authorizer 替代
  - single-user-authorizer - org.apache.nifi.authorization.single.user.SingleUserAuthorizer
- conf/state-management.xml
  - local-provider
    - ./state/local
  - zk-provider
  - redis-provider - org.apache.nifi.redis.state.RedisStateProvider
- conf/stateless.properties
- conf/zookeeper.properties
  - 内置 Zookeeper 的配置
- content_repository/
- database_repository/ - H2
  - nifi-flow-audit.mv.db
  - nifi-identity-providers.mv.db
- flowfile_repository/
- provenance_repository/ - 内置 Lucene
- state/
- extensions/
  - 会被 nar 自动加载的扩展目录
- work/
  - nar/
    - extensions/
      - `*.nar-unpacked`/
    - framework/
      - nifi-framework-nar-1.15.2.nar-unpacked/
  - jetty/
    - `*.war`
- logs/

```bash
curl -O https://jdbc.postgresql.org/download/postgresql-42.3.3.jar
docker exec -it nifi mkdir -p /opt/nifi/lib
docker cp postgresql-42.3.3.jar nifi:/opt/nifi/lib
```

## Notes

- 集群使用 zookeeper 管理状态
- 支持使用内置的 zookeeper
- 弃用 Variable ，使用 Parameter
- record-oriented
  - 在 record 之前，内部结构都以 avro 为主
  - 引入 record 抽离 reader, writer

## Glossary

- NAR - NiFi Archive
  - 提供 Java ClassLoader isolation

## Driver

- postgresql
  - org.postgresql.Driver
  - https://jdbc.postgresql.org/download.html
  - https://jdbc.postgresql.org/download/postgresql-42.3.3.jar

## Processor

- PutFile
  - 写入到目录，文件名为 UUID，每次产生一个文件
- PutS3, PutFTP, PutSSH
- PutRecord
  - Put 到 RecordSinkServices
- PutDatabaseRecord
- QueryDatabaseTableRecord
  - 增量查询
- MergeRecord
  - 合并部分 Record
  - 例如 用于小批量插入
- ValidateRecord
  - 基于 schema 检查
- 转换
  - ConvertRecord
    - Avro, JSON, CSV 等
  - JoltTransformRecord
    - JOLT - JsOn Language for Transform
    - [bazaarvoice/jolt](https://github.com/bazaarvoice/jolt)
      - Apache-2.0, Java
    - https://jolt-demo.appspot.com/
  - QueryRecord
    - 使用内置 Calcite SQL 引擎处理 Flow 文件
    - `SELECT * FROM FLOWFILE`
  - LookupRecord
    - 查询外部 - 例如 Redis
  - UpdateRecord
- 聚合
  - PartitionRecord
    - 分组
  - SplitRecord
    - 分组变单行

## FlowFile

- FlowFile
  - org.apache.nifi.flowfile.attributes.CoreAttributes
    - filename
    - uuid
    - path
    - absolute.path
    - priority
    - mime.type
      - application/avro-binary
    - alternate.identifier
  - Standard FlowFile Attributes
    - fileSize
    - entryDate
    - lineageStartDate
- 常见属性
  - tablename
  - querydbtable.row.count
  - `maxvalue.<column>`

---

- 参考
  - [Developer Guide](https://nifi.apache.org/docs/nifi-docs/html/developer-guide.html)
  - [Expression Language Guide](https://nifi.apache.org/docs/nifi-docs/html/expression-language-guide.html)

## EL

- `${filename:equals(${uuid})}`
  - ${属性:函数(参数)}
- 属性级联关系
  - FlowFile
  - Process Group Variable
  - File Registry
  - NiFi JVM Properties
  - System Environment
- 函数
  - Bool
    - isNull, notNull, isEmpty, equals, equalsIgnoreCase, gt, ge, lt, le, and, or, not
    - ifElse
      - `${literal(true):ifElse('a','b')}`
  - String
    - toUpper, toLower, trim, substring, substringBefore, substringBeforeLast, substringAfter, substringAfterLast
    - getDelimitedField, append, prepend, replace, replaceFirst, replaceAll, padLeft, padRight
    - replaceNull, replaceEmpty, length, evaluateELString, repeat
    - startsWith, endsWith, contains, in, find, matches, indexOf, lastIndexOf
    - jsonPath, jsonPathDelete, jsonPathAdd, jsonPathSet, jsonPathPut
  - Codec
    - {escape,unescape}{Json,Xml,Csv,Html3,Html4}
    - urlEncode, urlDecode, base64Encode, base64Decode
    - UUID3, UUID5
    - hash
      - hex
  - Math
    - plus, minus, multiply, divide, mod, toRadix, fromRadix, random, math
  - Date - format, toDate, now
  - Typing - toString, toNumber, toDecimal
  - ip, hostname, UUID, nextInt, literal
  - getStateValue, thread
  - anyAttribute, allAttributes, anyMatchingAttribute, allMatchingAttributes, anyDelineatedValue, allDelineatedValues
  - join, count

## JOLT

```json
[
  {
    "operation": "default",
    "spec": {}
  }
]
```

- operation
  - shift
  - default
  - remove
  - sort
  - java
  - cardinality

```json
[
  // 移除数组里每个元素的 id,raw 字段
  {
    "operation": "remove",
    "spec": {
      "*": {
        "id": "",
        "raw": ""
      }
    }
  }
]
```

- [Jolt quick reference for Nifi Jolt Processors ](https://community.cloudera.com/t5/Community-Articles/Jolt-quick-reference-for-Nifi-Jolt-Processors/ta-p/244350)

## Kubernetes

- https://github.com/cetic/helm-nifi


## Upgrade

- [Migration Guidance](https://cwiki.apache.org/confluence/display/NIFI/Migration+Guidance)
- [Upgrading NiFi](https://nifi.apache.org/docs/nifi-docs/html/administration-guide.html#upgrading_nifi)

# FAQ

## Illegal initial character: ?column?

ExecuteSQL 添加 alias

```sql
-- 有问题
select 1;
-- 可以
select 1 as val;
```

## Record does not have a value for the UpdateKey column

配置的 update key 没有数据，检查数据内容。

## 多值参数

- 使用逗号分隔，使用时重新拼接

```pre title="owner_ids 不可以包含空格"
owner_id in ('${#{owner_ids}:replaceAll(',', "','")}')
```

```pre title="owner_ids 可以包含空格"
owner_id in ('${allDelineatedValues("${#{owner_ids}}", ","):trim():join("','")}')
```

## 增量写入到文件

```js
var flowFile = session.get();
var File = Java.type('java.io.RandomAccessFile');
if (flowFile != null) {
  var filename = flowFile.getAttribute('filename');
  /// 写入文件
  var filePath = '/tmp/nifi/test.log';
  flowFile = session.putAttribute(flowFile, 'filePath', filePath);
  var file = new File(filePath, 'rws');
  file.seek(file.length());
  // 写入内容
  file.write(filename.getBytes());
  file.write('\n'.getBytes());
  file.close();
  // Finish by transferring the FlowFile to an output relationship
  session.transfer(flowFile, REL_SUCCESS);
}
```

## h2 java.lang.IllegalStateException: The file is locked

检查是否已经启动过 NiFi 了

## FileSystemRepository Unable to write to container default due to archive file size constraints; waiting for archive cleanup

```properties
nifi.content.repository.implementation=org.apache.nifi.controller.repository.FileSystemRepository
nifi.content.claim.max.appendable.size=1 MB
nifi.content.repository.directory.default=./content_repository
nifi.content.repository.archive.max.retention.period=7 days
# 限定了最大可用空间
nifi.content.repository.archive.max.usage.percentage=50%
nifi.content.repository.archive.enabled=true
nifi.content.repository.always.sync=false
nifi.content.viewer.url=../nifi-content-viewer/
```
