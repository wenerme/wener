---
title: juicefs
---

# juicefs

- [juicedata/juicefs](https://github.com/juicedata/juicefs)
  - Apache-2.0, Go
  - 元数据 和 数据 分离
  - distributed **POSIX** fs
  - metadata - Redis, Postgres, MySQL, SQLite3, badger, TiKV
  - data - s3, minio, webdav, redis, file, sqlite3, mysql, postgres, sftp
    - [Supported Object Storage](https://juicefs.com/docs/community/how_to_setup_object_storage/#supported-object-storage)
  - 接口支持 S3, HDFS, CSI
  - 64MiB Chunk -> Slice -> 4 MiB Block
  - 4MiB cache granularity
  - 支持压缩 - lz4, zstd
  - 支持加密
  - 支持回收站
  - 对带宽要求高
    - 带宽不足，可以把缓存设大，再开启异步写入模式 --writeback
- 参考
  - https://juicefs.com/zh-cn/blog/engineering/distributed-filesystem-comparison
  - https://juicefs.com/zh-cn/blog/solutions/clickhouse-disaggregated-storage-and-compute-practice
  - [vs SeaweedFS](https://juicefs.com/zh-cn/blog/engineering/similarities-and-differences-between-seaweedfs-and-juicefs-structures)

:::caution 不提供实际存储

- 将对象存储暴露为 FS 存储协议
- 维护 FS 元数据
- 本身不存储数据

:::

:::info 限制

| limit          | for                        |
| -------------- | -------------------------- |
| 目录深度       | 不限                       |
| 文件名长度     | 255                        |
| soft link 长度 | 4096 bytes                 |
| hard link      | 2^31                       |
| 目录文件数     | 2^31                       |
| volume 文件数  | unlimited                  |
| 单文件大小     | 2^(26+31) = 2^57 = 128 TiB |
| 总文件大小     | 4EiB                       |

:::

```bash
brew install juicefs # macOS

# 手动安装 Linux, Darwin
VER=$(curl -s https://api.github.com/repos/juicedata/juicefs/releases/latest | grep 'tag_name' | cut -d '"' -f 4 | tr -d 'v')
curl -L -o juicefs.tar.gz "https://github.com/juicedata/juicefs/releases/download/v${VER}/juicefs-${VER}-$(uname -s | tr '[:upper:]' '[:lower:]')-amd64.tar.gz"
tar zxvf juicefs.tar.gz juicefs
./juicefs version
sudo mv juicefs /usr/local/bin/

# META-URL MOUNTPOINT
# --storage file --bucket $HOME/.juicefs/local 为默认值
juicefs format \
  --storage file --bucket $HOME/.juicefs/local \
  sqlite3://jfs.db jfs

ls $HOME/.juicefs/local/jfs/
sqlite3 jfs.db "select * from jfs_setting"

# macOS 需要安装 macFUSE
brew install macfuse

# 100GB 缓存到 $HOME/.juicefs/cache
# 1h 元数据备份
# http://localhost:9567/metrics
juicefs mount \
  --cache-dir $HOME/.juicefs/cache --cache-size 102400 \
  --backup-meta 1h \
  -o allow_other -o allow_root \
  sqlite3://jfs.db $PWD/mnt

cd mnt
juicefs bench .

touch test.txt
touch $(cat /dev/urandom | tr -dc '0' | head -c 255) # 成功
touch $(cat /dev/urandom | tr -dc '0' | head -c 256) # 失败

cd -

juicefs info mnt/test.txt            # 文件信息
juicefs info mnt                     # 目录信息
juicefs config sqlite3://jfs.db      # 配置信息
juicefs status sqlite3://jfs.db      # session 状态
juicefs gc sqlite3://jfs.db          # 数据扫描
juicefs gc sqlite3://jfs.db --delete # 数据清理
juicefs fsck sqlite3://jfs.db        # 数据校验
juicefs profile mnt                  # 操作监控
juicefs stats mnt                    # io 统计

juicefs gateway sqlite3://jfs.db 0.0.0.0:9090 # S3 网关

# 元数据备份
# --subdir 只备份指定目录
juicefs dump sqlite3://jfs.db meta.dump.json
# 元数据恢复 - 确保没有写入
juicefs load redis://127.0.0.1:6379/1 meta.dump.json

# 数据清空
UUID=$(juicefs status sqlite3://jfs.db | jq .Setting.UUID -r)
# 所有 session 断开后才可以操作
juicefs destroy sqlite3://jfs.db $UUID
du -sh $HOME/.juicefs/local/jfs/
```

- ~/.juicefs/local/jfs/
  - juicefs_uuid
  - chunks/
  - testing/
  - meta/
    - dump-2023-03-16-174211.json.gz
- /mnt/
  - .accesslog
  - .config
  - .stats - 统计
  - .trash/
    - YYYY-mm-dd-hh/
      - `{父目录 inode}-{文件 inode}-{原始文件名}` - 查询 inode `juicefs info -i 3`
  - meta/ - 元数据备份
- backup-meta
  - ⚠️ 超过 100 万 则不在每 1h 自动备份，需要手动配置更大间隔
  - Redis 100 万 1 分钟 1GB 内存
  - 清理规则
    - 保留 2 天完整
    - < 2 周, 每天保留 1 份
    - < 2 月, 每周保留 1 份
    - > 2 月, 每月保留 1 份
- file
  - $HOME/.juicefs/local
  - /var/jfs
  - C:/jfs/local
- fuse 选项
  - writeback_cache
    - Linux 3.15+ https://www.kernel.org/doc/Documentation/filesystems/fuse-io.txt
    - 利于小数据(e.g. 100b)频繁读写
  - user_id=100,group_id=100
  - debug
  - allow_other
  - allow_root
- [pjd/pjdfstest](https://github.com/pjd/pjdfstest)
  - POSIX test suite
- [linux-test-project/ltp](https://github.com/linux-test-project/ltp)

## Docker

```bash
docker plugin install juicedata/juicefs --alias juicefs

docker volume create -d juicefs \
  -o name=VOLUME_NAME \
  -o metaurl=META_URL \
  -o storage=STORAGE_TYPE \
  -o bucket=BUCKET_NAME \
  -o access-key=ACCESS_KEY \
  -o secret-key=SECRET_KEY \
  jfsvolume

# 已有 volume
docker volume create -d juicefs \
  -o name=VOLUME_NAME \
  -o metaurl=META_URL \
  jfsvolume

docker run -it -v jfsvolume:/opt wener/base ls /opt

docker volume rm jfsvolume

# disable,upgrade,enable,rm
docker plugin disable juicefs
```

- https://hub.docker.com/r/juicedata/mount
- https://github.com/juicedata/juicefs/blob/main/hack/builder/Dockerfile

## SQL

- storage
  - jfs_blob
- metadata
  - jfs_chunk
  - jfs_chunk_ref
  - jfs_counter
  - jfs_delfile
  - jfs_delslices
  - jfs_detached_node
  - jfs_dir_quota
  - jfs_dir_stats
  - jfs_edge
  - jfs_flock
  - jfs_node
  - jfs_plock
  - jfs_session2
  - jfs_setting
  - jfs_sustained
  - jfs_symlink
  - jfs_xattr
