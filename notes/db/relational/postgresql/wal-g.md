---
title: WAL-G
---

# WAL-G

- 是什么？
  - PostgreSQL 备份、恢复工具
  - WAL-E 后继 - Golang 重写 Python - 性能 x4
  - 支持 PostgreSQL, MySQL/MariaDB, Mongo
  - 支持 S3, GCS, Azure, Swift, 本地, SSH 存储
- [wal-g/wal-g](https://github.com/wal-g/wal-g)
  - Apache 2.0, lzo 部分 GPL 3.0+
  - [PostgreSQL](https://github.com/wal-g/wal-g/blob/master/PostgreSQL.md)
- WAL-E 不支持关闭 S3 SSE - SelfHost 常见不便于使用
- 参考
  - [camptocamp/wal-g-prometheus-exporter](https://github.com/camptocamp/wal-g-prometheus-exporter)
    - 监控指标

| env                     | desc                                                                                   |
| ----------------------- | -------------------------------------------------------------------------------------- |
| WALG_S3_PREFIX          | s3://bucket/path/to/folder                                                             |
| AWS_ACCESS_KEY_ID       |
| AWS_SECRET_ACCESS_KEY   | AWS_SESSION_TOKEN,`~/.aws/credentials`,AWS_PROFILE                                     |
| AWS_REGION              | us-west-2                                                                              |
| AWS_ENDPOINT            | http://s3-like-service:9000                                                            |
| AWS_S3_FORCE_PATH_STYLE | false<br/>`http://BUCKET.s3.amazonaws.com/KEY` -> `http://s3.amazonaws.com/BUCKET/KEY` |
| WALG_FILE_PREFIX        | `/tmp/wal-g-test-data`                                                                 |
| WALG_SSH_PREFIX         | `ssh://localhost/walg-folder`                                                          |
| SSH_PORT                |
| SSH_USERNAME            |
| SSH_PASSWORD            |
| TOTAL_BG_UPLOADED_LIMIT | 32                                                                                     |
| WALG_S3_STORAGE_CLASS   | STANDARD                                                                               |
| WALG_S3_SSE             | false                                                                                  |
| WALG_S3_SSE_KMS_ID      |
| WALG_COMPRESSION_METHOD | lz4,lzma,brotli                                                                        |
| S3_USE_LIST_OBJECTS_V1  | false                                                                                  |

```yaml
# Minio
AWS_ACCESS_KEY_ID: '<minio-key>'
AWS_SECRET_ACCESS_KEY: '<minio-secret>'
WALG_S3_PREFIX: 's3://my-minio-bucket/sub-dir'
AWS_ENDPOINT: 'http://minio:9000'
AWS_S3_FORCE_PATH_STYLE: 'true'
AWS_REGION: us-east-1
WALG_S3_CA_CERT_FILE: '/path/to/custom/ca/file'
```

```bash
docker pull bitnami/wal-g
```

```bash
wal-g backup-list
```

| name                          | last_modified        | wal_segment_backup_start | start_time                      | finish_time                     | hostname  | data_dir                          | pg_version | start_lsn | finish_lsn | is_permanent |
| ----------------------------- | -------------------- | ------------------------ | ------------------------------- | ------------------------------- | --------- | --------------------------------- | ---------- | --------- | ---------- | ------------ |
| base_000000020000000000000005 | 2021-03-09T08:07:49Z | 000000020000000000000005 | Tuesday, 09-Mar-21 08:07:43 UTC | Tuesday, 09-Mar-21 08:07:49 UTC | acid-demo | /home/postgres/pgdata/pgroot/data | 130002     | 83886120  | 83927800   | false        |
| base_000000030000000000000008 | 2021-03-09T08:14:48Z | 000000030000000000000008 | Tuesday, 09-Mar-21 08:14:42 UTC | Tuesday, 09-Mar-21 08:14:48 UTC | acid-demo | /home/postgres/pgdata/pgroot/data | 130002     | 134217768 | 134250592  | false        |

__目录结构__

* /
  * basebackup_005/
    * base_000000020000000000000005_backup_stop_sentinel.json
    * base_000000020000000000000005/
      * metadata.json
      * tar_partitions/
        * pg_control.tar.lz4
        * part_001.tar.lz4
  * wal_005/
    * 00000002.history.lz4
    * 000000020000000000000005.lz4
    * 000000020000000000000007.partial.lz4
    * 000000020000000000000005.00000028.backup.lz4

## 操作
* wal-e [Primary Commands](https://github.com/wal-e/wal-e#id1)

```bash
# Push base backup
wal-g backup-push /data
# Push WAL 片段
wal-g wal-push /data
```


__postgresql.conf__

```ini
wal_level = archive # hot_standby and logical in 9.x is also acceptable
archive_mode = on
archive_command = 'envdir /etc/wal-e.d/env wal-e wal-push %p'
archive_timeout = 60
```

```bash
wal-g backup-fetch /data LATEST
wal-g backup-fetch /data base_LONGWALNUMBER_POSITION_NUMBER
```

__recovery.conf__

```ini
# https://www.postgresql.org/docs/11/recovery-config.html
restore_command = 'envdir /etc/wal-e.d/env wal-e wal-fetch %f %p'
standby_mode = on
```

```bash
# 提升 standby
# https://www.postgresql.org/docs/current/app-pg-ctl.html
pg_ctl promote
```
