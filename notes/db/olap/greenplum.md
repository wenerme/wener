---
title: Greenplum
---

# Greenplum

- GPDB
- [HAWQ](http://hawq.incubator.apache.org/) 是 Hadoop 生态圈里的 GP
- [架构](https://github.com/greenplum-db/gpdb/wiki/Greenplum-Architecture)
- https://github.com/greenplum-db/gpdb-postgres-merge
- [Choosing the Table Storage Model](https://gpdb.docs.pivotal.io/6-6/admin_guide/ddl/ddl-storage.html)

```bash
apt update
apt install ca-certificates

cp sources.list /etc/apt/sources.list
apt install $PWD/greenplum-db-6.0.0-beta.7-ubuntu18.04-amd64.deb -f -y
apt install python -y

export GPHOME=/usr/local/greenplum-db
export PATH=$GPHOME/bin/:$PATH

source $GPHOME/greenplum_path.sh
MASTER_DATA_DIRECTORY=$PWD/data gpstart
```

## 版本

- 6.0
  - PostgreSQL 9.3
- 5.0 - 2017
  - PostgreSQL 8.2
