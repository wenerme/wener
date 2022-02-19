---
title: Apache NiFi
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
  - [minifi](https://github.com/apache/nifi/tree/main/minifi)
    - Java
    - 功能按需打包 - NAR
- [apache/nifi-fds](https://github.com/apache/nifi-fds) - Flow Design System
  - 前端组件
  - Angular
- 参考
  - [User Guide](https://nifi.apache.org/docs/nifi-docs/html/user-guide.html)
  - [Administration Guide](https://nifi.apache.org/docs/nifi-docs/html/administration-guide.html)
  - [NiFi In Depth](https://nifi.apache.org/docs/nifi-docs/html/nifi-in-depth.html)
  - [Simple Change Data Capture (CDC) with SQL Selects via Apache NiFi (FLaNK)](https://dev.to/tspannhw/simple-change-data-capture-cdc-with-sql-selects-via-apache-nifi-flank-19m4)

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

- /
  - logs/
  - conf/
    - flow.xml.gz
    - bootstrap.conf
      - 提供 JVM 相关参数
    - nifi.properties
    - login-identity-providers.xml
    - authorizers.xml
    - state-management.xml
    - stateless.properties
    - zookeeper.properties
      - 内置 Zookeeper 的配置
  - content_repository/
  - database_repository/ - H2
    - nifi-flow-audit.mv.db
    - nifi-identity-providers.mv.db
  - flowfile_repository/
  - provenance_repository/ - 内置 Lucene
  - state/
  - extensions/ - 空目录 -
  - work/
    - nar/
      - extensions/
        - `*.nar-unpacked`/
      - framework/
        - nifi-framework-nar-1.15.2.nar-unpacked/
    - jetty/
      - `*.war`

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

## Registry

```bash
# 本地启动
# http://localhost:18080/nifi-registry/
./bin/nifi-registry.sh start
```

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
