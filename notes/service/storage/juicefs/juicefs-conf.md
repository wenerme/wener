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

## Flags

:::caution

- macOS 需要 macFUSE - 安装会有点麻烦

:::

| flag               | env        | for |
| ------------------ | ---------- | --- |
| --access-key value | ACCESS_KEY |
| --secret-key value | SECRET_KEY |

| flag                             | for                          |
| -------------------------------- | ---------------------------- |
| **FUSE**                         |
| --enable-xattr                   |
| --enable-ioctl                   |
| --root-squash UID:GID            |
| --prefix-internal                | .jfs                         |
| -o allow_other                   |
| **Metadata**                     |
| --subdir=PATH                    | 挂载子目录                   |
| --backup-meta=3600               |
| --backup-skip-trash              |
| --heartbeat=12                   |
| --read-only                      |
| --no-bgjob                       |
| --atime-mode=noatime             | noatime,relatime,strictatime |
| --skip-dir-nlink=20              |
| **Metadata cache**               |
| --attr-cache=1                   |
| --entry-cache=1                  |
| --dir-entry-cache=1              |
| --open-cache=0                   |
| --open-cache-limit=10000         |
| **Data storage**                 |
| --storage=file                   |
| --storage-class VALUE            |
| --bucket=VALUE                   |
| --get-timeout=60                 |
| --put-timeout=60                 |
| --io-retries=10                  |
| --max-uploads=20                 |
| --max-deletes=10                 |
| --upload-limit=0                 | BW in MiB/s                  |
| --download-limit=0               | BW in MiB/s                  |
| **Data cache**                   |
| --buffer-size=300                | read/write in MiB            |
| --writeback                      | 异步上传                     |
| --prefetch=1                     | 预读                         |
| --upload-delay=0                 | 在上传前本地删除了则不上传   |
| --cache-dir=$HOME/.juicefs/cache |
| --cache-mode=0600                |
| --cache-size=102400              | MiB                          |
| --free-space-ratio=0.1           |
| --cache-partial-only             |
| --verify-cache-checksum VALUE    | none,full,shrink,extend      |
| --cache-eviction=2-random        |
| --cache-scan-interval=3600       |
| **Metrics**                      |
| --metrics=127.0.0.1:9567         |
| --custom-labels key:val          |
| --consul=127.0.0.1:8500          |
| --no-usage-report                |
| **gateway**                      |
| --no-banner                      |
| --multi-buckets                  | 将顶级目录作为 bucket        |
| --keep-etag                      |
| --umask=022                      |
| --domain value                   | virtual-host-style           |
| **webdav**                       |
| --cert-file                      |
| --key-file                       |
| --gzip                           |
| --disallowList                   | 禁止目录                     |
| --log PATH                       |
| --access-log=path                |
| --background, -d                 |

- https://juicefs.com/docs/community/command_reference/
- `juicefs gateway $META_URL ADDRESS`
  - MINIO_ROOT_USER
  - MINIO_ROOT_PASSWORD
  - 基于 minio gateway

```bash
# fuse
juicefs mount -o allow_other,writeback_cache sqlite3://myjfs.db ~/jfs --no-usage-report

export WEBDAV_USER=root
export WEBDAV_PASSWORD=1234
juicefs webda --gzip $JUICEFS_META_URL localhost:9007 --no-usage-report
```

## Metadata

- Redis
  - 300b 一个文件
- META_PASSWORD
  - 数据库密码

```bash
juicefs format \
  --storage sqlite3 \
  --bucket data.db \
  sqlite3://meta.db jfs

# 不支持 fsck, gc
# 不能多进程挂载
juicefs format \
  --storage sqlite3 \
  --bucket data.db \
  badger://$PWD/meta jfs
```

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

## Storage

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
