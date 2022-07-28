---
title: MongoDB
---

# MongoDB

- [管理工具列表](https://docs.mongodb.com/ecosystem/tools/administration-interfaces/)
- [mongoclient](https://github.com/rsercano/mongoclient) 基于 Web 的管理工具
- Reference
  - [mongo-shell](https://docs.mongodb.com/manual/reference/mongo-shell/)
  - [Connection String](https://docs.mongodb.com/manual/reference/connection-string/)
    - `mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]`
      - authSource 使用不同的库做授权
- 建模
  - [6 Rules of Thumb for MongoDB Schema Design](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1)
  - [Data Model](https://docs.mongodb.com/manual/data-modeling/)
    - [Data Model Examples and Patterns](https://docs.mongodb.com/manual/applications/data-models/)
    - [DBRef](https://docs.mongodb.com/manual/reference/database-references/)
- [Glossary](https://docs.mongodb.com/manual/reference/glossary)
- FAQ
  - Java 目前无法通过 SSH 转发链接 ReplicaSet
  - DBRef 的 `$ref` 必须要在 `$id` 之前
  - SSH 转发 Mongo 可能会导致链接不会被释放

```bash
# 在前台启动
# 数据存储到 ~/data/mgo
# Ctrl-C 停止
docker run --rm -it -p 27017:27017 --name my-mongo -v ~/data/mgo:/data/db mongo
# 另外一个终端连接到服务端
mongo

# https://docs.mongodb.com/manual/reference/program/mongodump/
# 导出一个库
mongodump -v --db test  --host myhost --port 27017 --out mg-`date +%Y%m%d`
# 导入一个库
mongorestore -v --db test  --host myhost --port 27017 mg-`date +%Y%m%d`/db
# 使用 URI 参数
mongodump -v --uri mongodb://root:pass@host:27017/dbname?authSource=admin

# 导出 json
mongoexport --db db-name --collection collection-name --out exp.json

mongoexport -h localhost -d databse -c collection --csv \
--fields erpNum,orderId,time,status \
-q '{"time":{"$gt":1438275600000}, "status":{"$ne" :"Cancelled"}}' \
--out report.csv
```

## Operaters

- https://docs.mongodb.com/manual/reference/operator/
- FAQ
  - ObjectId 转字符串
    - 使用 `str` 属性, 不要使用 `toString`

```js
// 查看服务状态
db.serverStatus()
// 查看集合状态
db.list.stats()

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

db.collection.find().sort({age:-1}).limit(1) // for MAX
db.collection.find().sort({age:+1}).limit(1) // for MIN

// 查找重复的 id
db.list.aggregate([
	{
		$group: {
			_id: {cid: "$cid"},
			uniqueIds: {$addToSet: "$_id"},
			count: {$sum: 1}
		}
	},
	{
		$match: {
			count: {"$gt": 1}
		}
	},
	{
		$sort: {
			count: -1
		}
	}
]);
// 删除重复数据
// .forEach(v=>{v.uniqueIds.pop();db.list.remove({'_id':{'$in':v.uniqueIds}})})

// 查找不为空的对象
db.col.find({'score.user': { "$gt": {}}});
```

### 索引管理

```js
// 创建唯一索引
db.list.createIndex({ cid: -1 }, { name: 'cid_unique', unique: true });

// 获取索引
db.list.getIndexes();
```

### 角色权限管理

- https://docs.mongodb.com/manual/tutorial/enable-authentication/
- https://docs.mongodb.com/manual/tutorial/manage-users-and-roles/
- 启动时需要 `--auth` 来启用授权, 或在配置文件中加 `security.authorization` 配置
- 內建角色
  - 数据库用户: read,readWrite
  - 数据库管理员: dbAdmin, dbOwner, userAdmin
  - 集群管理: clusterAdmin, clusterManager, clusterMonitor, hostManager
  - 备份恢复: backup, restore
  - 所有数据库: readAnyDatabase, readWriteAnyDatabase, userAdminAnyDatabase, dbAdminAnyDatabase
  - 超级管理员角色: root
    - readWriteAnyDatabase, dbAdminAnyDatabase, userAdminAnyDatabase, clusterAdmin, restore, backup
- https://docs.mongodb.com/v3.0/reference/method/js-user-management/

```js
// use admin;
// 创建管理员
db.createUser({
  user: 'admin',
  pwd: 'abc123',
  roles: [{ role: 'userAdminAnyDatabase', db: 'admin' }],
});
db.changeUserPassword('admin', 'myPassword');
db.getUser('admin');
db.getUsers();

db.getRole('read', { showPrivileges: true });

// root 权限
db.grantRolesToRole('admin', ['root']);
// 指定到某个库
db.grantRolesToRole('admin', [{ role: 'readWrite', db: 'list' }]);
```

### 更新无法引用当前值

```js
// 修改文档结构, 不改变值
db.events
  .find()
  .snapshot()
  .forEach(function (e) {
    // update document, using its own properties
    e.coords = { lat: e.lat, lon: e.lon };

    // remove old properties
    delete e.lat;
    delete e.lon;

    // save the updated document
    db.events.save(e);
  });
```

### parameters

- https://docs.mongodb.com/v3.4/reference/parameters/

```js
db.adminCommand({ setParameter: 1, disableJavaScriptJIT: true });
```

## Versions

### 3.2

- https://docs.mongodb.com/manual/release-notes/3.2/
- js
  - V8 更改为 SpiderMonkey
  - arrow functions
  - destructuring assignment
  - for-of loops
  - generators

## FAQ

### 启动

```bash
mongod --config ./mongo.conf --fork
```

**mongod.conf**

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
