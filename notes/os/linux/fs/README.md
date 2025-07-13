---
title: FS
---

# FS

**逻辑/内存**

| fs         | mount point               | notes                                     |
| ---------- | ------------------------- | ----------------------------------------- |
| [rootfs]   | /                         |
| proc       | /proc                     |
| sysfs      | /sys                      |
| devfs      | /dev                      | linux 4.16+ 废弃                          |
| devtmpfs   | /dev                      | udev                                      |
| cgroup     | /sys/fs/cgroup            |
| cgroup2    | /sys/fs/cgroup/unified    |
| cpuset     | /sys/fs/cgroup/cpuset     |
| debugfs    | /sys/kernel/debug         |
| securityfs | /sys/kernel/security/     | LSM - Linux Security Modules              |
| tracefs    | /sys/kernel/debug/tracing |
| devpts     | /dev/pts                  | Pseudo terminals                          |
| binder     | /dev/binderfs             | Android binder IPC                        |
| pstore     | /sys/fs/pstore            | Persistent Storage for kernel logs        |
| mtd        | /dev/mtd\*                | Memory Technology Device                  |
| mtdblock   | /dev/mtdblock\*           | MTD block devices                         |
| mtdram     | /dev/mtdram\*             | MTD RAM devices                           |
| mtdoops    | /dev/mtdoops\*            | MTD Oops                                  |
| autofs     |                           | 按需挂载和卸载                            |
| fusectl    | /sys/fs/fuse/connections  | for fuse                                  |
| [bindfs]   |                           | mount --bind                              |
| specfs     | /dev/streams              | 不需要挂载                                |
| tmpfs      | /tmp,/run                 |
| ramfs      |
| pipefs     | pipe:                     | 当 shell 使用 pipe 时                     |
| loopfs     | `/dev/loop*`              |
| bpf        |
| sockfs     |                           | TCP/UDP sockets                           |
| hugetlbfs  |
| bdev       |
| mqueue     | /dev/mqueue               | POSIX Message Queues                      |
| fscache    |
| initramfs  | INITial RAM FileSystem    | 临时 roofs                                |
| initrd     | Initial Ramdisk           | 被 initramfs 替代                         |
| nsfs       | /run/netns/cni-UUID       | NameSpace File System 用于 Linux 命名空间 |

**物理/硬盘**

| fs       | stand for                   | notes                             |
| -------- | --------------------------- | --------------------------------- |
| zfs      | Zettabyte File System       | Solaris, FreeBSD, Linux           |
| xfs      | SGI's Journaled File System | Linux                             |
| bcachefs |
| exfat    | Extended FAT                | Windows, macOS, Linux             |
| APFS     | Apple File System           | macOS, iOS                        |
| [ntfs]   | Windows NT File System      | Windows, Linux 5.15+ RW, macOS RO |
| [btrfs]  | B-Tree File System          | Linux                             |
| [ext4]   |                             |                                   |
| fat32    |                             | Windows                           |
| ext3     |                             |                                   |
| bcache   |
| omfs     | Optimized MPEG Filesystem   |

**Flash/SSD**

- 磨损均衡/wear leveling 区分 Host-Level 和 Device-Level
- 新的 SSD 有自己的 FTL 能实现 wear leveling

| fs       | stand for                     | notes               |
| -------- | ----------------------------- | ------------------- |
| erofs    | Enhanced Read-Only FS         | Android ROM /system |
| f2fs     | Flash-Friendly File System    | Android /data       |
| [exfat]  |                               | 🌟 推荐             |
| sdcardfs |
| TFAT     |
| APFS     | Apple File System             | iOS, macOS          |
| YAFFS    | Yet Another Flash File System |

- APFS
  - 主要面向 iOS, macOS 等 Apple 自家设备, 因此功能特性会考虑自家的 Flash Controller
  - 不建议用于外部设备
- Android
  - ROM 现在大多使用 erofs
  - 5.0+ 支持 f2fs 作为 /data
  - 2.3+ 使用 ext4
  - 2.3 以前 mdt 使用 yaffs

| 特性       | EROFS                   | SquashFS         | CramFS |
| ---------- | ----------------------- | ---------------- | ------ |
| 压缩算法   | LZ4、LZMA               | GZIP、LZ4        | Zlib   |
| 压缩粒度   | 块级                    | 文件级           | 文件级 |
| 随机访问   | 支持，性能高            | 支持，但性能一般 | 不支持 |
| 元数据压缩 | 是                      | 是               | 否     |
| 小文件优化 | 是（Inode Inline 数据） | 一般             | 一般   |
| 挂载灵活性 | 高                      | 一般             | 低     |

**ROM**

> 主要用于嵌入式设备、固件、LiveCD

| fs       | stand for                     | notes               |
| -------- | ----------------------------- | ------------------- |
| [erofs]  | Enhanced Read-Only FS         | Android ROM /system |
| squashfs |                               | live-distro         |
| cramfs   | Compressed RAM/ROM FileSystem | 被 squashfs 替代    |

**逻辑**

| fs        | notes                                                       |
| --------- | ----------------------------------------------------------- |
| overlayfs | unionfs 的替代品                                            |
| unionfs   |
| aufs      | v1 AnotherUnionFS, v2 Advanced multi-layered Unification fs |
| [fuse]    | fs in userspace                                             |
| OrangeFS  |

**网络/NAS**

| fs      | stand for                      | notes   |
| ------- | ------------------------------ | ------- |
| [nfs]   | Network File System            | Unix    |
| [smb]   | Server Message Block           | Windows |
| cifs    | Common Internet File System    | ~= SMB  |
| pvfs2   | OrangeFS                       |
| juicefs |                                |         |
| davfs2  | WebDAV                         |
| ftpfs   | FTP                            |
| sshfs   | SFTP                           |
| gfs2    | Global File System by RedHat   |
| lustre  | Lustre File System             |
| cephfs  | Ceph File System               |
| gluster | GlusterFS                      |
| hdfs    | Hadoop Distributed File System |

- [Filesystem Hierarchy Standard](./fs-hierarchy.md)
- jffs - Journaling Flash File System
  - jffs2
  - ubifs
- fscache
  - cachefilesd
  - /proc/fs/fscache/caches
  - /proc/fs/fscache/volumes
  - /proc/fs/fscache/cookies
  - /sys/module/fscache/parameters/debug
  - 参考
    - https://www.kernel.org/doc/Documentation/filesystems/caching/fscache.txt
    - https://docs.kernel.org/filesystems/caching/fscache.html
- /dev/ptsmx - terminal mulitplexer
- max filename length
  - 255 bytes
    - ext4, zfs(2.3 现在支持 1024 char)

[ext4]: ./ext4.md
[ntfs]: ./ntfs.md
[exfat]: ./exfat.md
[nfs]: ./nfs.md
[smb]: ./smb.md
[fuse]: ./fuse.md
[rootfs]: ./rootfs.md
[bindfs]: ./bindfs.md

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
- Docker fileshare
  - FUSE
  - gRPC over Hypervisor sockets
