---
title: FS
---

# FS

**逻辑/内存**

| fs         | mount point              | notes                        |
| ---------- | ------------------------ | ---------------------------- |
| proc       | /proc                    |
| sysfs      | /sys                     |
| devfs      | /dev                     | linux 4.16+ 废弃             |
| devtmpfs   | /dev                     | udev                         |
| cgroup     | /sys/fs/cgroup           |
| cgroup2    | /sys/fs/cgroup/unified   |
| cpuset     | /sys/fs/cgroup/cpuset    |
| debugfs    | /sys/kernel/debug        |
| bdev       |
| tracefs    |
| securityfs | /sys/kernel/security/    | LSM - Linux Security Modules |
| sockfs     |                          | TCP/UDP sockets              |
| bpf        |
| hugetlbfs  |
| devpts     | /dev/pts                 | Pseudo terminals             |
| mqueue     |
| binder     | /dev/binderfs            | Android binder IPC           |
| pstore     | /sys/fs/pstore           |
| bindfs     |
| [fuse]     |
| fusectl    | /sys/fs/fuse/connections |
| autofs     |                          | 按需挂载和卸载               |
| specfs     | /dev/streams             | 不需要挂载                   |
| tmpfs      | /tmp,/run                |
| ramfs      |
| pipefs     | pipe:                    | 当 shell 使用 pipe 时        |
| loopfs     | `/dev/loop*`             |
| [rootfs]   | /                        |

- /dev/ptsmx - terminal mulitplexer

**逻辑**

| fs        | notes                                                       |
| --------- | ----------------------------------------------------------- |
| overlayfs |
| unionfs   |
| aufs      | v1 AnotherUnionFS, v2 Advanced multi-layered Unification fs |

**物理/硬盘**

| fs        | notes                                             |
| --------- | ------------------------------------------------- |
| ext3      |
| [ext4]    |
| zfs       |
| [ntfs]    |
| [exfat]   |
| xfs       |
| erofs     | Enhanced Read-Only File System¶                   |
| squashfs  | live-distro - 替代 cramfs                         |
| omfs      | Optimized MPEG Filesystem                         |
| initramfs | INITial RAM FileSystem                            |
| initrd    | Initial Ramdisk                                   |
| cramfs    | Compressed RAM/ROM FileSystem - 嵌入式替代 initrd |

**网络**

| fs      | notes    |
| ------- | -------- |
| [nfs]   |
| [smb]   |
| cifs    |
| pvfs2   | OrangeFS |
| juicefs |
| davfs2  | WebDAV   |
| ftpfs   |
| sshfs   |

[ext4]: ./ext4.md
[ntfs]: ./ntfs.md
[exfat]: ./exfat.md
[nfs]: ./nfs.md
[smb]: ./smb.md
[fuse]: ./fuse.md
[rootfs]: ./rootfs.md

```sh
cat /proc/filesystems # 支持的 fs
ls /proc/fs/          #  fs 模块
cat /proc/mounts      # 挂载情况

# https://www.kernel.org/doc/html/latest/filesystems/debugfs.html
mount -t debugfs none /sys/kernel/debug

# https://docs.kernel.org/admin-guide/binderfs.html
mkdir /dev/binderfs
mount -t binder binder /dev/binderfs

mount -t specfs none /dev/streams
```

- [List of file systems](https://en.wikipedia.org/wiki/List_of_file_systems)
- https://www.deepanseeralan.com/tech/some-notes-on-filesystems
- [vgough/encfs](https://github.com/vgough/encfs)

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
