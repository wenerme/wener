# CouchDB

## Tips
* [CouchDB](https://github.com/apache/couchdb)
  * [vs Couchbase](https://www.couchbase.com/couchbase-vs-couchdb)
* 默认端口: 5984
* `/_utils` futon 管理界面
```bash
# Docker 启动
docker run -d -p 5984:5984 -v $(pwd):/usr/local/var/lib/couchdb --name couchdb couchdb

# 官方镜像有 2.0 https://github.com/apache/couchdb-docker
docker run -p 5984:5984 -v $(pwd):/opt/couchdb/data --name couchdb klaemo/couchdb
```
