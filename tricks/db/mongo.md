# MongoDB

## Tips
* [管理工具列表](https://docs.mongodb.com/ecosystem/tools/administration-interfaces/)
* [mongoclient](https://github.com/rsercano/mongoclient) 基于 Web 的管理工具
* Reference
  * [mongo-shell](https://docs.mongodb.com/manual/reference/mongo-shell/)
  * [Connection String](https://docs.mongodb.com/manual/reference/connection-string/)
    * `mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]`

```js
```

```bash
# https://docs.mongodb.com/manual/reference/program/mongodump/
# 导出一个库
mongodump -v --db test  --host myhost --port 27017 --out mg-`date +%Y%m%d`
# 导入一个库
mongorestore -v --db test  --host myhost --port 27017 mg-`date +%Y%m%d`/db
```
