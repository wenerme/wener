---
tags:
  - FUSE
---

# s3fs

:::caution

- use_cache 会缓存整个文件而不是访问到的部分
  - 和 自己维持缓存没区别
- s3fs 限制 - 有些限制来自 s3, 有些限制来自 fuse
  - 不能 append
  - stat 性能差
  - 由于大多存储是最终一致，可能会导致 stale read - 部分 provider 支持 read-after-write consistency
  - 不能原子 rename
  - 多个客户端不能保持一致
  - 没有 link
  - 没有 inotify 功能

:::

- [s3fs-fuse/s3fs-fuse](https://github.com/s3fs-fuse/s3fs-fuse)
  - GPLv2, C++
- 参考
  - https://github.com/s3fs-fuse/s3fs-fuse#limitations

```bash
# S3 -> FS
apk add s3fs-fuse

echo $ACCESS_KEY_ID:$SECRET_ACCESS_KEY > ${HOME}/.passwd-s3fs
chmod 600 ${HOME}/.passwd-s3fs
s3fs mybucket $PWD/mnt -o passwd_file=${HOME}/.passwd-s3fs

s3fs $PWD/buckets/assets -o passwd_file=.passwd-s3fs -o use_path_request_style -o url=http://127.0.0.1:3900 -o bucket=assets -o use_cache=$PWD/cache -o max_stat_cache_size=1000000 -o endpoint=cn-sh -o enable_content_md5 -o allow_other -d -f
```

```fstab
mybucket /path/to/mountpoint fuse.s3fs _netdev,allow_other 0 0

mybucket /path/to/mountpoint fuse.s3fs _netdev,allow_other,use_path_request_style,url=https://url.to.s3/ 0 0

public /data/public fuse.s3fs _netdev,allow_other,use_path_request_style,endpoint=garage,passwd_file=/etc/secrets/public.passwd-s3fs,retries=100,use_cache=/tmp/s3,bucket=public,url=http://127.0.0.1:3900 0 0
```
