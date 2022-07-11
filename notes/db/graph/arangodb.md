---
title: ArangoDB
---

# ArangoDB

- [arangodb/arangodb](https://github.com/arangodb/arangodb)
  - Apache-2.0, C++, JS
  - Graph+Document+KV
  - 后端存储 rocksdb
  - 内置 V8
- [AQL vs SQL](https://www.arangodb.com/why-arangodb/sql-aql-comparison/)
- [Shell cheatsheet](https://www.arangodb.com/wp-content/uploads/2016/05/shell-reference-card.pdf)
- Admin
  - arangoimp
    - 数据导入
    - 支持: JSON, CSV, TSV
    - 导入 CSV 或 TSV 时如果有头,使用 `--skip-lines=1` 跳过
  - arangodump
    - 数据转储
  - arangorestore
    - 恢复转储的数据
- [Configuration](https://docs.arangodb.com/3.1/Manual/Administration/Configuration/)
- 默认端口 8529, 支持 HTTP 和 TCP 协议
- 默认账号为 root, 无密码
- Key 规范
  - [DocumentKeys](https://docs.arangodb.com/3.1/Manual/DataModeling/NamingConventions/DocumentKeys.html)
  - `[_-:.@()+,=;$!*'%0-9a-zA-Z]{1,254}`
  - UTF8 不能作为 key, 可以先 SHA 后作为 KEY
- 如果升级了版本，第一次启动添加 --database.auto-upgrade
- 默认端口 8529
- 参考
  - [arangodb/go-driver](https://github.com/arangodb/go-driver)
  - [Meet Kaseware: FBI-grade case management for the larger investigative community](https://www.arangodb.com/solutions/case-studies/fbi-grade-case-mgmt-investigative-community/)

```bash
# https://hub.docker.com/_/arangodb
docker run --rm -it -v /etc/localtime:/etc/localtime:ro \
  -e ARANGO_ROOT_PASSWORD=password \
  -v $PWD/arangodb/data:/var/lib/arangodb3 -v $PWD/arangodb/apps:/var/lib/arangodb3-apps \
  -p 8529:8529 \
  --name arangodb arangodb --tcp.reuse-address=true --http.hide-product-header=true --query.cache-mode=on

# 远程连接
# 如果是 https 则用 ssl://mydomain.com
arangosh --server.endpoint http+tcp://192.168.1.1:8529 \
  --server.username $USERNAME --server.password $PASSWORD  --server.database Nodes

# Linux client
curl -O https://download.arangodb.com/arangodb39/Community/Linux/arangodb3-client-linux-3.9.2.tar.gz
tar zxvf arangodb3-client-linux-3.9.2.tar.gz
```

| env                                        |
| ------------------------------------------ | --- | --- |
| ARANGO_ROOT_PASSWORD                       |
| ARANGO_NO_AUTH                             |     | 1   |
| ARANGO_RANDOM_ROOT_PASSWORD                |     | 1   |
| ARANGODB_OVERRIDE_DETECTED_TOTAL_MEMORY    |     | 4G  |
| ARANGODB_OVERRIDE_DETECTED_NUMBER_OF_CORES |
| ARANGOSH_ARGS                              |

- [Configuration](https://www.arangodb.com/docs/stable/administration-configuration.html)

> **Note** 可能遇到的问题
>
> - graph visualizer
>   - pick multiple labels [#14456](https://github.com/arangodb/arangodb/issues/14456)
>   - Support of multiple attributes for displaying labels [#7772](https://github.com/arangodb/arangodb/issues/7772)


> **Note** 系统限制
>
> - AQL
>   - 字符串拼接使用 CONCAT，不能 `+`
>   - 三元运算 `a ? b : c` 会导致 b c 都计算 - 不能短路
>   - 一次图查询最多涉及 256 个 Collection
>   - 最多 1000 注册器 - 变量、查询变量、内部查询变量、中间结果
>   - 初始查询最多 4000 节点
>   - 一次查询最多 2048 collections/shards

```js
// https://docs.arangodb.com/3.1/Manual/Administration/ManagingUsers.html
// 用户管理
var users = require('@arangodb/users');
// users.save(user, passwd, active, extra)
users.save('admin@testapp', 'mypassword');
users.grantDatabase('admin@testapp', 'testdb');

// 导出查询结果
require('fs').write('/var/lib/arangodb3/export.json', JSON.stringify(aql`FOR n IN Nodes return n`));
// 导出拼接后的数据
require('fs').write(
  '/var/lib/arangodb3/export.txt',
  db
    ._query(`return CONCAT_SEPARATOR("\n",FOR n IN Nodes FILTER n.name != null COLLECT col = n.name return col)`)
    .toArray()[0],
);
```

```
// 将边的数量更新到节点上
FOR doc IN documents
  LET inEdgesCount = LENGTH(FOR v IN 1..1 INBOUND doc GRAPH 'edgeGraph' RETURN 1)
  LET outEdgesCount = LENGTH(FOR v IN 1..1 OUTBOUND doc GRAPH 'edgeGraph' RETURN 1)
  UPDATE doc WITH
     {inEdgesCount: inEdgesCount, outEdgesCount: outEdgesCount} In Documents
```

## Model

- `_key`
  - 254bytes
  - `^[-a-zA-Z0-9_:.@()+,=;$!*'%]{,254}$`
- Collection
  - Document
  - Edge - `_from`,`_to`
- Graph
  - fromCollections
  - toCollections
  - Vertex - graph 一部分但未用于 edge 定义
  - OUTBOUND: \_from → \_to, INBOUND: \_from ← \_to, ANY: \_from ↔ \_to
  - Algorithms
    - Traversal
    - Shortest Path
    - k Shortest Paths
    - k Paths
    - Distributed Iterative Graph Processing (Pregel)

## AQL


**插入**

```aql
INSERT {name: "John Doe", gender: "m"} INTO users;

FOR user IN [
  {name: "John Doe",gender: "m"},
  {name: "Jane Smith",gender: "f"}
  ]
  INSERT user INTO users;

FOR user IN users FILTER user.active = = 1 INSERT user INTO backup;

FOR i IN 1..1000 INSERT {name: CONCAT("test", i), gender: (i % 2 = = 0 ? "f": "m")} INTO users
```

**更新**

```aql
UPDATE { _key: "1" }
  WITH { name: "John Smith" }
  IN users;

FOR user IN users
  UPDATE user
    WITH { numberOfLogins: 0 } IN users;

FOR user IN users
  FILTER user.active == 1
    UPDATE user
      WITH {
        numberOfLogins: LENGTH(
          FOR login IN logins
            FILTER login.user == user._key
            COLLECT WITH COUNT INTO numLogins
            RETURN numLogins
        )
      } IN users;

LET date = DATE_NOW()
  FOR user IN users
    FILTER user.isImportantUser == null
    LET numberOfLogins = (
      FOR login IN logins
        FILTER login.user == user._key
        COLLECT WITH COUNT INTO numLogins
        RETURN numLogins
      )
    FILTER numberOfLogins > 50
    UPDATE user
      WITH {
        isImportantUser: 1,
        dateBecameImportant: date
      }
      IN users;

-- 移除属性
FOR user IN users
  UPDATE user WITH { numberOfLogins: null }
    IN users
  OPTIONS { keepNull: false };

-- 移除部分属性
FOR user IN users
  FILTER user.isImportantUser == 1 AND
         user.active == 0
    UPDATE user
      WITH {
        isImportantUser: null,
        dateBecameImportant: null
      }
      IN users
    OPTIONS { keepNull: false }
```

- https://www.arangodb.com/community-server/sql-aql-comparison/

## FTS

- https://www.arangodb.com/docs/stable/programs-arangod-options.html

```
RETURN TOKENS("今天的天气真的很好", "text_zh")
```

## 工具

```bash
brew install arangodb
```

- arangodump
- arangorestore
- arangobackup
- arangoimport
- arangoexport
- arangobench
- arangovpack
  - 用于转换 VelocyPack 的工具
  - 开发调试 ArangoDB 时使用
  - json,json-hex,vpack,vpack-hex
- arangoinspect

### arangoimport

- file 支持压缩 - gz,bz2

| opt                    | demo val                            | Note                           |
| ---------------------- | ----------------------------------- | ------------------------------ |
| type                   | auto,tsv,csv,json,jsonl             | auto 基于文件名检测            |
| file                   | -                                   | `-` stdin                      |
| define                 | key=val                             | 替换配置中的 `@key@`           |
| headers-file           | header.csv                          |
| on-duplicate           | **error**, ignore, replace, update  |
| overwrite              | false                               | 替换 collection - 删除之前数据 |
| collection             |
| create-collection      | false                               |
| create-collection-type | **document**, edge                  |
| create-database        | false                               |
| skip-lines             | 0                                   |
| skip-validation        | false                               |
| separator              |                                     | 用于 tsv,csv                   |
| quote                  | `"`                                 |
| backslash-escape       | false                               |
| batch-size             | 8388608                             | 单位 byte - 默认 8MB           |
| auto-rate-limit        | false                               |
| ignore-missing         | false                               |
| **preprocess**         |
| translate              | `id=_key`                           |
| remove-attribute       | attr                                |
| datatype               | `key=string\|number\|null\|boolean` |
| merge-attributes       | `fullName=[firstName]:[lastName]`   |
| **edge**               |
| from-collection-prefix |
| to-collection-prefix   |

```bash
arangoimport --file "data.csv" --type csv --collection "users"
```

```json title="edge"
{"_from": "users/1234", "_to": "users/4321", "desc": "1234 is connected to 4321"}
```

- https://www.arangodb.com/docs/stable/programs-arangoimport-options.html

### arangosh

## Foxx

## Schema Validation

- 忽略 `_key`, `_id`, `_rev`, `_from`, `_to`
- JSON Schema
- level - 默认 strict
  - moderate - 影响新的和修改的，不影响旧的
  - strict - 要求所有验证通过
  - new - 新的
  - none - 不验证
- message - 错误信息
  - 目前无法告知哪里的问题 - https://www.arangodb.com/docs/stable/release-notes-known-issues39.html#schema-validation
- 辅助函数
  - SCHEMA_GET()
  - SCHEMA_VALIDATE()

```js
var schema = {
  rule: {
    properties: {nums: {type: 'array', items: {type: 'number', maximum: 6}}},
    additionalProperties: {type: 'string'},
    required: ['nums'],
  },
  level: 'moderate',
  message:
    "The document does not contain an array of numbers in attribute 'nums', or one of the numbers is bigger than 6.",
};

/* Create a new collection with schema */
db._create('schemaCollection', {schema: schema});

/* Update the schema of an existing collection */
db.schemaCollection.properties({schema: schema});
```

# FAQ

## failed to locate javascript.startup-directory directory

- macOS /usr/local/opt/arangodb/share/arangodb3/

```bash
arangosh --javascript.startup-directory /usr/local/opt/arangodb/share/arangodb3/js
```
