# ArangoDB

## Tips
* [AQL vs SQL](https://www.arangodb.com/why-arangodb/sql-aql-comparison/)
* [Shell cheatsheet](https://www.arangodb.com/wp-content/uploads/2016/05/shell-reference-card.pdf)
* Admin
  * arangoimp
    * 数据导入
    * 支持: JSON, CSV, TSV
    * 导入 CSV 或 TSV 时如果有头,使用 `--skip-lines=1` 跳过
  * arangodump
    * 数据转储
  * arangorestore
    * 恢复转储的数据
* [Configuration](https://docs.arangodb.com/3.1/Manual/Administration/Configuration/)
* 默认端口 8529, 支持 HTTP 和 TCP 协议
* 默认账号为 root, 无密码
* Key规范
  * [DocumentKeys](https://docs.arangodb.com/3.1/Manual/DataModeling/NamingConventions/DocumentKeys.html)
  * `[_-:.@()+,=;$!*'%0-9a-zA-Z]{1,254}`
  * UTF8 不能作为 key, 可以先 SHA 后作为 KEY

```bash

docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  -e ARANGO_RANDOM_ROOT_PASSWORD=1 \
  -v $PWD/arangodb/data:/var/lib/arangodb3 -v $PWD/arangodb/apps:/var/lib/arangodb3-apps \
  -p 8529:8529 \
  --name arangodb arangodb --tcp.reuse-address=true --http.hide-product-header=true --query.cache-mode=on

# 远程连接
# 如果是 https 则用 ssl://mydomain.com
arangosh --server.endpoint http+tcp://192.168.1.1:8529 \
  --server.username $USERNAME --server.password $PASSWORD  --server.database Nodes


```

```js
// https://docs.arangodb.com/3.1/Manual/Administration/ManagingUsers.html
// 用户管理
var users = require("@arangodb/users");
// users.save(user, passwd, active, extra)
users.save("admin@testapp", "mypassword");
users.grantDatabase("admin@testapp", "testdb");

// 导出查询结果
require('fs').write('/var/lib/arangodb3/export.json',JSON.stringify(aql`FOR n IN Nodes return n`))
// 导出拼接后的数据
require('fs').write('/var/lib/arangodb3/export.txt',db._query(`return CONCAT_SEPARATOR("\n",FOR n IN Nodes FILTER n.name != null COLLECT col = n.name return col)`).toArray()[0])
```

```
// 将边的数量更新到节点上
FOR doc IN documents
  LET inEdgesCount = LENGTH(FOR v IN 1..1 INBOUND doc GRAPH 'edgeGraph' RETURN 1)
  LET outEdgesCount = LENGTH(FOR v IN 1..1 OUTBOUND doc GRAPH 'edgeGraph' RETURN 1)
  UPDATE doc WITH
     {inEdgesCount: inEdgesCount, outEdgesCount: outEdgesCount} In Documents
```

## ChangeLog

### 3.2

* arangoimp
  * 支持 key 转换
  * 支持 jsonl 格式
  * 可指定类型 auto 通过文件扩展名检测类型
