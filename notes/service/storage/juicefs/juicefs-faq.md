---
tags:
  - FAQ
---

# JuiceFS FAQ

## S3 Gateway

```bash
export MINIO_ROOT_USER=admin
export MINIO_ROOT_PASSWORD=12345678

juicefs gateway --cache-size 20480 redis://localhost:6379 localhost:9000
```

- https://github.com/juicedata/minio/tree/gateway
  - minio fork 分支，完整 minio 功能

## Webdav

```bash
export WEBDAV_USER=user
export WEBDAV_PASSWORD=mypassword

juicefs webdav sqlite3://jfs.db localhost:8080
```

## 启动挂载

```bash
cp $(which juicefs) /sbin/mount.juicefs
```

```fstab title="/etc/fstab"
redis://localhost:6379/1 /jfs juicefs  _netdev,max-uploads=50,writeback,cache-size=204800     0  0
```

## setpriority: permission denied

macOS non root

## Skipped objects bytes

- `.trash/`
- 可以禁用回收站然后 gc 清理

```bash
juicefs status sqlite3://jfs.db | jq .Setting.TrashDays

juicefs rmr .trash/
```

bench 1G 左右数据，完成后被删除

## object storage: parse url first path segment in URL cannot contain colon

虽然文档说

```bash
juicefs format \
    --storage postgres \
    --bucket "<host>:<port>/<db>[?parameters]"
```

但实际 bucket 包含 port 会异常

- https://github.com/juicedata/juicefs/issues/4725

