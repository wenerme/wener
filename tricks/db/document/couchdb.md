---
id: couchdb
title: CouchDB
---

# CouchDB

## Tips
* [CouchDB](https://github.com/apache/couchdb)
  * [vs Couchbase](https://www.couchbase.com/couchbase-vs-couchdb)
* 默认端口: 5984
* 集群使用 4369 EPMD 发现其它节点，使用 9100 通信
* `/_utils` futon 管理界面
* 关于 CouchDB 的评论
  * https://news.ycombinator.com/item?id=17115649
* __什么时候用 CouchDB__
  * 当你需要解决多端离在线数据同步时 - 其它功能可能都很差，但这一个功能是最好的
  * 当没有后端开发接口，希望直接存取数据时 - BaaS
  * 类似的数据库
    * RealmDB
    * RethinkDB
* 注意
  * 不支持单文档读权限控制
  * 不支持默认读取的过滤
  * 同步是 数据库 纬度
  * 数据库 成本很低，可以为每个用户创建一个数据库，实现权限和同步
  * 默认没有 members 和 admins，所有文档都可以读写
  * design doc 能够被直接读取,`/db/_design_docs` 能够被直接访问
  * `/db/_all_docs` 能够被直接访问
  * 相关关闭相关接口只能通过反向代理实现
  * 没办法全量修改,写客户端进行操作
  * couch_httpd_auth/public_fields 控制用户的那些字段可见
* 索引也叫设计文档/design document
  * 一般包含 JS 代码
* 数据库通过 安全对象/security object 定义安全属性
  * JSON 对象 `{admins:[{names:[],roles:[]}],members:[]}`
* 两种角色
  * admins - 索引修改、安全对象修改
  * members - 文档 CRUD

```bash
# Docker 启动
# 官方镜像有 2.0 https://github.com/apache/couchdb-docker
# COUCHDB_USER COUCHDB_PASSWORD
# EXPOSE 4369 5984 9100
docker run -p 5984:5984 -v $(pwd):/opt/couchdb/data --name couchdb couchdb

db=http://127.0.0.1:5984
# 创建 DB
curl -X PUT $db/test
# 直接修改
curl $db/test/hello | jq '.name="abc"' | curl -X POST $db/test -d @-
```

## 安全

```bash
# 创建用户
curl -X POST $db/_users/org.couchdb.user:wener -d '{"name":"wener","password":"wener","roles":["admin"], "type":"user"}'
# 用户信息
curl $db/_users/org.couchdb.user:wener

# 直接 PUT 会创建数据库
curl -X PUT $db/test
# 获取安全对象
curl $db/test/_security
# 添加访问限制 - 允许 admin 角色和 user 角色
curl -X PUT $db/test/_security -d '{"members":{"roles":["user"]},"admins":{"roles":["admin"]}}'
# 用刚才创建的账户进行访问
curl -u wener:wener $db/test/_security 
```

## 设计文档

```js
{
  // 一般为 JS - Query Server 定义处理
  language: "javascript",
  // 过滤函数定义
  filters:"",
  // 试图默认选项
  options:{},
  // 列表函数定义
  lists: "",
  // 重写规则
  // array | string
  rewrites: [],
  // Show 函数
  shows: {},
  // 更新函数
  updates:{},
  // 验证文档更新函数
  // function(newDoc, oldDoc, userCtx, secObj)
  validate_doc_update: "",
  // 视图函数
  views: {}
}
```

```ts
// https://docs.couchdb.org/en/stable/json-structure.html#request-object
interface Request {
  body;
  cookie;
  form;
  headers;
  id;
  info;
  method;
  path;
  peer;
  query;
  request_path;
  raw_path;
  secObj;
  userCtx;
  uuid;
}

// 映射函数
type MapFunction = (doc) => void

type ReduceFunction = (keys, values, rereduce?:boolean) => array

// 显示函数
// 返回 string 直接显示或者返回响应对象
// 返回 JSON: {json:{name:doc['name']}}
// 返回 自定义头: {headers:{'Content-Type':'image/png'}, base64:''} - 内容可以使用 base64 编码
type ShowFunction = (doc,req) => object|string

// 更新函数
// 返回更新对象和返回给客户端的对象
type UpdateFunction = (doc,req) => [any|null,any]

// 列表函数
// 调用 start send 部分发送
type ListFunction = (head,req) => string

// 处理对象和请求对象 - 返回是否过滤
// GET /db/_changes?filter=mailbox/new_mail
type FilterFunction = (doc,req)=>boolean

// 视图过滤
// GET /db/_changes?filter=_view&view=dname/viewname
type ViewFilterFunction = (doc,req)=>boolean

// 验证函数
// 新文档,旧文档,用户上下文,安全对象
// throw({forbidden:''}) 或 throw({unauthorized:''})
// 如果为删除 newDoc 包含 _deleted 字段
type ValidateFunction = (newDoc, oldDoc, userCtx, secObj) => void
```

## _users
### _design/_auth
* validate_doc_update
  * 校验 `_users` 更新

```js
function(newDoc, oldDoc, userCtx, secObj) {
  if (newDoc._deleted === true) {
      // allow deletes by admins and matching users
      // without checking the other fields
      if ((userCtx.roles.indexOf('_admin') !== -1) ||
          (userCtx.name == oldDoc.name)) {
          return;
      } else {
          throw({forbidden: 'Only admins may delete other user docs.'});
      }
  }

  if (newDoc.type !== 'user') {
      throw({forbidden : 'doc.type must be user'});
  } // we only allow user docs for now

  if (!newDoc.name) {
      throw({forbidden: 'doc.name is required'});
  }

  if (!newDoc.roles) {
      throw({forbidden: 'doc.roles must exist'});
  }

  if (!isArray(newDoc.roles)) {
      throw({forbidden: 'doc.roles must be an array'});
  }

  for (var idx = 0; idx < newDoc.roles.length; idx++) {
      if (typeof newDoc.roles[idx] !== 'string') {
          throw({forbidden: 'doc.roles can only contain strings'});
      }
  }

  if (newDoc._id !== ('org.couchdb.user:' + newDoc.name)) {
      throw({
          forbidden: 'Doc ID must be of the form org.couchdb.user:name'
      });
  }

  if (oldDoc) { // validate all updates
      if (oldDoc.name !== newDoc.name) {
          throw({forbidden: 'Usernames can not be changed.'});
      }
  }

  if (newDoc.password_sha && !newDoc.salt) {
      throw({
          forbidden: 'Users with password_sha must have a salt.' +
              'See /_utils/script/couch.js for example code.'
      });
  }

  var available_schemes = ["simple", "pbkdf2", "bcrypt"];
  if (newDoc.password_scheme
          && available_schemes.indexOf(newDoc.password_scheme) == -1) {
      throw({
          forbidden: 'Password scheme `' + newDoc.password_scheme
              + '` not supported.'
      });
  }

  if (newDoc.password_scheme === "pbkdf2") {
      if (typeof(newDoc.iterations) !== "number") {
          throw({forbidden: "iterations must be a number."});
      }
      if (typeof(newDoc.derived_key) !== "string") {
          throw({forbidden: "derived_key must be a string."});
      }
  }

  var is_server_or_database_admin = function(userCtx, secObj) {
      // see if the user is a server admin
      if(userCtx.roles.indexOf('_admin') !== -1) {
          return true; // a server admin
      }

      // see if the user a database admin specified by name
      if(secObj && secObj.admins && secObj.admins.names) {
          if(secObj.admins.names.indexOf(userCtx.name) !== -1) {
              return true; // database admin
          }
      }

      // see if the user a database admin specified by role
      if(secObj && secObj.admins && secObj.admins.roles) {
          var db_roles = secObj.admins.roles;
          for(var idx = 0; idx < userCtx.roles.length; idx++) {
              var user_role = userCtx.roles[idx];
              if(db_roles.indexOf(user_role) !== -1) {
                  return true; // role matches!
              }
          }
      }

      return false; // default to no admin
  }

  if (!is_server_or_database_admin(userCtx, secObj)) {
      if (oldDoc) { // validate non-admin updates
          if (userCtx.name !== newDoc.name) {
              throw({
                  forbidden: 'You may only update your own user document.'
              });
          }
          // validate role updates
          var oldRoles = (oldDoc.roles || []).sort();
          var newRoles = newDoc.roles.sort();

          if (oldRoles.length !== newRoles.length) {
              throw({forbidden: 'Only _admin may edit roles'});
          }

          for (var i = 0; i < oldRoles.length; i++) {
              if (oldRoles[i] !== newRoles[i]) {
                  throw({forbidden: 'Only _admin may edit roles'});
              }
          }
      } else if (newDoc.roles.length > 0) {
          throw({forbidden: 'Only _admin may set roles'});
      }
  }

  // no system roles in users db
  for (var i = 0; i < newDoc.roles.length; i++) {
      if (newDoc.roles[i][0] === '_') {
          throw({
              forbidden:
              'No system roles (starting with underscore) in users db.'
          });
      }
  }

  // no system names as names
  if (newDoc.name[0] === '_') {
      throw({forbidden: 'Username may not start with underscore.'});
  }

  var badUserNameChars = [':'];

  for (var i = 0; i < badUserNameChars.length; i++) {
      if (newDoc.name.indexOf(badUserNameChars[i]) >= 0) {
          throw({forbidden: 'Character `' + badUserNameChars[i] +
                  '` is not allowed in usernames.'});
      }
  }
}
```

## FAQ

### Referer header required
该用 PUT 用成了 POST