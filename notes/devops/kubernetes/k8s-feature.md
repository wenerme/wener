---
title: MountPropagation
---

# K8S Feature

## MountPropagation

- 挂载传播
- None - private - 默认
- HostToContainer - rslave
  - 主机挂在更新容器挂在
- Bidirectional - rshared
  - 容器挂在传回主机
  - 特权容器
- Alpha v1.9, Beta v1.10

```yaml
deployment:
  containers:
    - image: alpine
      name: alpine
      volumeMounts:
        - mount: /data
          mountPropagation: None
```

- 一般需要配置 root mount shared
- `/proc/<pid>/mounts`
- `/proc/<pid>/mountstats`
- [mount_namespaces.7](https://man7.org/linux/man-pages/man7/mount_namespaces.7.html)
- [sharedsubtree](https://www.kernel.org/doc/Documentation/filesystems/sharedsubtree.txt)

```bash
# Host 对等操作
# --mark-slave
# --mark-private
# --make-unbindable
# --make-rshared
mount --make-shared /

# Docker 对等操作
docker run -d -it -v /tmp/mnt:/tmp/mnt:rshared ubuntu
```
