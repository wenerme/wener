---
id: docker-storage
title: Docker 存储
---

# Storage

## Tips
* [Docker storage drivers](https://docs.docker.com/storage/storagedriver/select-storage-driver/)

* `/var/lib/docker/` - 默认存储目录
  * `<存储驱动>` - 存储原数据
* 更换存储驱动会导致所有的本地的容器无法访问. 可以考虑 `docker save` 然后 push 到仓库, 这样避免后面再次创建


存储驱动 | 支持的后端文件系统
------------------|----------
overlay, overlay2 |	ext4, xfs
aufs              |	ext4, xfs
devicemapper      | direct-lvm
btrfs	            | btrfs
zfs	              | zfs


* aufs, overlay, overlay2
  * 文件级别操作, 能够对内存更加有效的利用, 但在较高的工作压力下, 可能会导致文件增长特别大
* devicemapper, btrfs, zfs
  * 块级别操作, 对于写为主的工作环境会表现的更好
* 对于很多小文件写入或有很多层的文件系统, overlay 可能比 overlay2 表现的更好
* btrfs 和 zfs 需要较多的内存
* 对于 PaaS 这样高强度的工作环境, zfs 会是比较好的选择
* 如果对稳定性要求更高, 可选择 aufs, overlay, devicemapper


## devicemapper
https://docs.docker.com/storage/storagedriver/device-mapper-driver/

__/etc/docker/daemon.json__

```json
{
  "storage-driver": "devicemapper"
}
```


## cleanup
* [Docker - How to cleanup (unused) resources](https://gist.github.com/bastman/5b57ddb3c11942094f8d0a97d461b430)

```
docker volume prune -f
docker system prune -a -f
```

