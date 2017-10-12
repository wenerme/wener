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
  * DBRef 的 `$ref` 必须要在 `$id` 之前
  * SSH 转发 Mongo 可能会导致链接不会被释放


```bash
# https://docs.mongodb.com/manual/reference/program/mongodump/
# 导出一个库
mongodump -v --db test  --host myhost --port 27017 --out mg-`date +%Y%m%d`
# 导入一个库
mongorestore -v --db test  --host myhost --port 27017 mg-`date +%Y%m%d`/db
```

## Operaters
* https://docs.mongodb.com/manual/reference/operator/
* FAQ
  * ObjectId 转字符串
    * 使用 `str` 属性, 不要使用 `toString`

```js
// 查看服务状态
db.serverStatus()

// 查询
db.users.find({});
// 要求某个字段为 null
db.users.find({name:null});
// 字段不为 null
db.users.find({name:{$ne:null});
// 字段存在
db.users.find({name:{$exists:true});
// 返回 id 和 name 字段
db.users.find({}, {name:1});
// 只返回 name 字段, 并做 explain
db.users.find({}, {_id:0, name:1}).explain()
// 要求类型为 string
// https://docs.mongodb.com/manual/reference/operator/query/type/#op._S_type
db.users.find({name:{$type:2});
// 返回一组字符串
db.users.find().snapshot().forEach((e) => {
    print(e._id.str)
});
// 日期查询
db.users.find({
    "birth" : {"$gte": new Date("2013-10-01T00:00:00.000Z")},
    "regDate" : {"$gte": ISODate("2013-10-01T00:00:00.000Z")}
});
// 完整的查询
db.books.find({publishDate:{$gt:ISODate('2017-09-14 10:49:47.132Z')}}).sort({publishDate:1}).limit(1)

// 部分更新单条
db.users.update({name:null},{$set:{name:"UNKNOWN"}});
// 部分更新多条
db.users.updateMany({name:null},{$set:{name:"UNKNOWN"}});
// 使用 DBRef
db.users.update({role:null},{$set:{role:{"$ref" : "roles","$id" : ObjectId("598041d5e90a5d1e23d4518e")}}});
// 在数组最后添加一个值
db.students.update({_id: 1},{ $set: { "grades.$" : 82 } });
// 修改数组中对象值
db.students.update({_id: 1},{ $set: { "grades.$.std" : 79 } });
```


### 更新无法引用当前值

```js
// 修改文档结构, 不改变值
db.events.find().snapshot().forEach(
  function (e) {
    // update document, using its own properties
    e.coords = { lat: e.lat, lon: e.lon };

    // remove old properties
    delete e.lat;
    delete e.lon;

    // save the updated document
    db.events.save(e);
  }
);
```


## Versions
### 3.2
* https://docs.mongodb.com/manual/release-notes/3.2/
* js
  * V8 更改为 SpiderMonkey
  * arrow functions
  * destructuring assignment
  * for-of loops
  * generators

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
