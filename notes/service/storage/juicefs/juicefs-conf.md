---
tags:
  - Configuration
---

# JuiceFS Configuration

- 参考
  - https://github.com/juicedata/juicefs/blob/main/pkg/sync/config.go
    - 环境变量列表
  - https://juicefs.com/docs/community/reference/how_to_set_up_object_storage
  - https://juicefs.com/docs/community/databases_for_metadata

## Metadata Engine

- REDIS_PASSWORD
- META_PASSWORD
- redis
  - maxmemory-policy noeviction

```
redis[s]://[<username>:<password>@]<host>[:<port>]/<db>
unix://[<username>:<password>@]<socket-file-path>?db=<db>

postgres://[username][:<password>]@<host>[:5432]/<database-name>[?parameters]
postgres://[username][:<password>]@/<database-name>?host=<socket-directories-path>[&parameters]

mysql://<username>[:<password>]@(<host>:3306)/<database-name>
mysql://<username>[:<password>]@unix(<socket-file-path>)/<database-name>

sqlite3://my-jfs.db?cache=shared&_busy_timeout=5000

badger://$HOME/badger-data myjfs

tikv://<pd_addr>[,<pd_addr>...]/<prefix>

etcd://[user:password@]<addr>[,<addr>...]/<prefix>

fdb://[config file address]?prefix=<prefix>
```

## Object Storage

|    storage | service                     |
| ---------: | :-------------------------- |
|       `s3` | Amazon S3                   |
|       `gs` | Google Cloud Storage        |
|     `wasb` | Azure Blob Storage          |
|       `b2` | Backblaze B2                |
|   `ibmcos` | IBM Cloud Object Storage    |
|       `s3` | Oracle Cloud Object Storage |
|      `scw` | Scaleway Object Storage     |
|    `space` | DigitalOcean Spaces         |
|   `wasabi` | Wasabi                      |
|       `s3` | Storj DCS                   |
|       `s3` | Vultr Object Storage        |
|       `s3` | Cloudflare R2               |
|      `oss` | Alibaba Cloud OSS           |
|      `cos` | Tencent Cloud COS           |
|      `obs` | Huawei Cloud OBS            |
|      `bos` | Baidu Object Storage        |
|      `tos` | Volcano Engine TOS          |
|      `ks3` | Kingsoft Cloud KS3          |
| `qingstor` | QingStor                    |
|    `qiniu` | Qiniu                       |
|      `scs` | Sina Cloud Storage          |
|      `oos` | CTYun OOS                   |
|      `eos` | ECloud Object Storage       |
|       `s3` | JD Cloud OSS                |
|    `ufile` | UCloud US3                  |
|     `ceph` | Ceph RADOS                  |
|       `s3` | Ceph RGW                    |
|  `gluster` | Gluster                     |
|    `swift` | Swift                       |
|    `minio` | MinIO                       |
|   `webdav` | WebDAV                      |
|     `hdfs` | HDFS                        |
|       `s3` | Apache Ozone                |
|    `redis` | Redis                       |
|     `tikv` | TiKV                        |
|     `etcd` | etcd                        |
|  `sqlite3` | SQLite                      |
|    `mysql` | MySQL                       |
| `postgres` | PostgreSQL                  |
|     `file` | Local disk                  |
|     `sftp` | SFTP/SSH                    |
