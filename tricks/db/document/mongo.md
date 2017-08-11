# MongoDB

## Tips
* [管理工具列表](https://docs.mongodb.com/ecosystem/tools/administration-interfaces/)
* [mongoclient](https://github.com/rsercano/mongoclient) 基于 Web 的管理工具
* Reference
  * [mongo-shell](https://docs.mongodb.com/manual/reference/mongo-shell/)
  * [Connection String](https://docs.mongodb.com/manual/reference/connection-string/)
    * `mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]`
* 建模
  * [6 Rules of Thumb for MongoDB Schema Design](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1)
  * [Data Model](https://docs.mongodb.com/manual/data-modeling/)
    * [Data Model Examples and Patterns](https://docs.mongodb.com/manual/applications/data-models/)
    * [DBRef](https://docs.mongodb.com/manual/reference/database-references/)
* FAQ
  * Java 目前无法通过 SSH 转发链接 ReplicaSet

```js

```

```bash
# https://docs.mongodb.com/manual/reference/program/mongodump/
# 导出一个库
mongodump -v --db test  --host myhost --port 27017 --out mg-`date +%Y%m%d`
# 导入一个库
mongorestore -v --db test  --host myhost --port 27017 mg-`date +%Y%m%d`/db
```

## FAQ


### 启动

__mongod.conf__
```yaml
# https://docs.mongodb.com/manual/reference/configuration-options/
systemLog:
  destination: file
  path: mongo.log
  logAppend: true
storage:
  dbPath: . # 数据存储于当前目录
net:
  bindIp: 127.0.0.1
```
```bash
mongod --config ./mongo.conf --fork
```
