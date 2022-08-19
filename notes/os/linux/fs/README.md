---
title: FS
---

# FS

| fs         | mount point            | notes                        |
| ---------- | ---------------------- | ---------------------------- |
| **逻辑**   |
| proc       | /proc                  |
| sysfs      | /sys                   |
| cgroup     | /sys/fs/cgroup         |
| cgroup2    | /sys/fs/cgroup/unified |
| cpuset     | /sys/fs/cgroup/cpuset  |
| debugfs    | /sys/kernel/debug      |
| bdev       |
| devtmpfs   |
| tracefs    |
| securityfs | /sys/kernel/security/  | LSM - Linux Security Modules |
| sockfs     |                        | TCP/UDP sockets              |
| bpf        |
| hugetlbfs  |
| devpts     |
| mqueue     |
| binder     | /dev/binderfs          | Android binder IPC           |
| pstore     |
| **内存**   |
| tmpfs      |
| ramfs      |
| pipefs     | pipe:                  | 当 shell 使用 pipe 时        |
| loopfs     | `/dev/loop*`           |
| **物理**   |
| ext3       |
| [ext4]     |
| zfs        |
| [ntfs]     |
| [exfat]    |
| xfs        |
| **网络**   |
| [nfs]      |
| [smb]      |
| cifs       |

[ext4]: ./ext4.md
[ntfs]: ./ntfs.md
[exfat]: ./exfat.md
[nfs]: ./nfs.md

```sh
cat /proc/filesystems # 支持的 fs
ls /proc/fs/          #  fs 模块
cat /proc/mounts      # 挂载情况

# https://www.kernel.org/doc/html/latest/filesystems/debugfs.html
mount -t debugfs none /sys/kernel/debug

# https://docs.kernel.org/admin-guide/binderfs.html
mkdir /dev/binderfs
mount -t binder binder /dev/binderfs
```

## bind

- 系统 将一个 **目录** 挂载 到一个挂载点
  - 一般是 挂载 设备
- 类似 symlink - 但不依赖应用 lookup
- 类似 hardlink - 但不依赖 fs
- 参考
  - FUSE 实现 https://bindfs.org/
  - FreeBSD nullfs `mount -t nullfs /a /b`

```bash
mount --bind /a /b          # 也可以使用 -o bind
mount --rbind /c /b         # 重新 bind
mount -o remount,ro,bind /b # 重新设置为 只读
mount --move /b /d          # 移动挂载点
```
