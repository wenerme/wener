---
title: Storage Awesome
tags:
  - Awesome
---

# Storage Awesome

**考虑因素**

- 怎么用
  - 确定使用方
    - 用户 - 例如: S3
    - 操作系统 - 例如: GFS, DRBD, NFS
    - SaaS 服务 - 有 软件定义存储 的能力 - 租户、隔离、BYOD
  - 选择网络接口协议
  - 块 vs 文件 vs 对象
  - 需要什么样的功能 - 快照、备份、加密
  - SDS
  - 特殊场景 - 小文件、批处理、机器学习、锁、实时性
- 有什么
  - 网络带宽、网络延时
  - 存储设备情况 - NVME、SATA、SAS
  - SAN 环境？
- 面对什么样的威胁
  - 磁盘损坏
  - 网络异常

:::tip

90% 的情况下都不需要分布式存储，单机使用 ZFS 可以把存储能力叠到很高。

基于单机存储也可以实现 SDS - 软件定义存储。

:::
- Durability
  - [earendil-works/absurd](https://github.com/earendil-works/absurd)
    - 关于 durability 的实验项目。

## 网络接口协议 {#protocols}

- 对象存储协议 - KV, 不需要文件语义
  - s3
  - swift
- 文件服务 - 通用, 有文件语意, 不需要 POSIX
  - webdav - 唯一 Web 环境可用的协议, 支持面广, 简单
  - ftp,sftp,ftps
- 本地文件共享 - 对速度和使用环境有要求, 通常是 POSIX 兼容
  - nfs
  - smb,cifs
  - afp
- 分布式文件 - 数据处理, 代码靠近数据
  - hdfs
- 块设备协议
  - iscsi
  - nvme-tcp
  - sata
  - ide
- 操作系统接口
  - fuse
  - sshfs
  - rdb
  - SPDK, NVMe-oF
  - virtio-fs

---

- [文件系统](../../os/linux/fs/README.md)

## Awesome

- Distributed File Systems/Software Defined Storage
  - [ceph](./ceph/README.md)
    - LGPLv2.1
    - by RedHat
    - S3 - 对象存储
    - POSIX - 文件存储
    - RBD - 块存储
    - RAOD - 底层
    - 对网络带宽和磁盘带宽要求高
  - [glusterfs](./gluster.md) - POSIX
  - lustre
    - GPLv2, LGPL, C
    - 利用很多 ZFS 特性
    - [lustre/lustre-release](https://github.com/lustre/lustre-release)
  - [ThinkParQ/beegfs](https://github.com/ThinkParQ/beegfs)
  - hdfs - 大数据, 计算->存储
  - openio-sds
  - longhorn
- [S3](./s3/README.md)
  - [minio](./minio/README.md) - S3
    - AGPLv3, Go
    - 支持作为 S3 代理
  - [garage](./s3/garage.md)
    - Rust
  - [versity/versitygw](https://github.com/versity/versitygw)
    - Apache-2.0, Go
    - S3 Gateway
    - Local -> S3, S3 -> S3
- S3 to FS/FUSE
  - [Barre/ZeroFS](https://github.com/Barre/ZeroFS)
    - AGPLv3. Rust
    - 9P/NFS/NBD on top of S3
  - [s3fs-fuse](https://github.com/s3fs-fuse/s3fs-fuse)
    - GPLv2, C++
    - inotify 不会检测到外部修改
    - 不支持原子 rename
  - [archiecobbs/s3backer](https://github.com/archiecobbs/s3backer)
    - GPLv2, C
    - FUSE/NBD single file backing store via Amazon S3
  - rclone mount
  - [kahing/goofys](https://github.com/kahing/goofys)
    - Apache-2.0, Go
    - 性能更好，更少的 POSIX 兼容
    - 不怎么维护
  - [s3ql/s3ql](https://github.com/s3ql/s3ql)
    - GPLv3, Python
    - 自有存储格式
- Object Storage/对象存储
  - Swift
  - [linkedin/ambry](https://github.com/linkedin/ambry)
    - Apache-2.0, Java
    - Distributed object store
  - [apache/ozone](https://github.com/apache/ozone)
    - Apache-2.0, Java
    - for Apache Hadoop
- 文件存储/File Storage
  - [9001/copyparty](https://github.com/9001/copyparty)
    - MIT, Python, JS
    - Portable file server with accelerated resumable uploads, dedup, WebDAV, FTP, TFTP, zeroconf, media indexer, thumbnails++
  - [juicefs](./juicefs/README.md)
  - [moosefs](https://github.com/moosefs/moosefs)
    - GPLv2, C
  - [Alluxio/alluxio](https://github.com/Alluxio/alluxio)
    - Apache 2.0, Java
    - Tachyon
    - UFS
  - nfs
    - NFSv3, NFSv4
    - [nfs-ganesha/nfs-ganesha](https://github.com/nfs-ganesha/nfs-ganesha)
      - NFSv3,v4,v4.1
      - user mode
  - smb
  - cifs
  - afp
    - netatalk
  - ~~[lizardfs](https://github.com/lizardfs/lizardfs)~~
- 块存储/Block Storage
  - GFS2
    - Global File System 2
    - Symmetric Shared-Disk
    - 分布式锁管理器 (DLM) 来协调节点间的访问 - Pacemaker、 Corosync
- Drive/Cloud Storage/云盘
  - [nextcloud](./nextcloud/README.md)
    - AGPLv3, PHP
    - file sync and share platform
  - [cloudreve/Cloudreve](https://github.com/cloudreve/Cloudreve)
    - GPLv3, Go
    - file management and sharing system, supports multiple storage providers
  - [nimbusdotstorage/Nimbus](https://github.com/nimbusdotstorage/Nimbus)
    - Apache-2.0, TS
    - open source alternative to Google Drive, One Drive, iCloud, etc.

**国人开发/维护**

- [seaweedfs](./seaweedfs.md) - 快存储，小文件优化
  - Apache-2.0, Go
  - 对象存储+filter 提供文件存储
  - S3 基于 filter 纬度
  - 开发活跃，作者活跃
- [juicefs](./juicefs/README.md)
  - Apache-2.0, Go
  - AGPL-3.0 -> Apache-2.0
  - 代理层
  - metadata - Redis, TiKV, PG, MySQL
  - data - S3, OSS, Ceph, MinIO
  - 使用 S3 提供数据，但不会用 S3 结构，而是自己的逻辑结构，因此文件无法对应
- [opencurve/curve](https://github.com/opencurve/curve)
  - Apache-2.0, C++
  - 块存储
  - by 网易
- [cubefs](https://github.com/cubefs/cubefs)
  - Apache-2.0, Go,C++
  - by 京东, OPPO
  - chubaofs -> cubeFS
  - CNCF 项目
  - 提供 S3 接口
  - POSIX
  - 多租户
- [happyfish100/fastdfs](https://github.com/happyfish100/fastdfs)
  - GPL-3.0, C
- [haiwen/seafile](https://github.com/haiwen/seafile)
  - GPL, C
  - 🚧 开发不活跃

---

- 参考
  - [distributed_fs_evaluation](https://www.reddit.com/r/homelab/comments/q9weh4/distributed_fs_evaluation/)
  - [Comparison of distributed file systems](https://en.wikipedia.org/wiki/Comparison_of_distributed_file_systems)

## 协议库 {#library}

- [drakkan/sftpgo](https://github.com/drakkan/sftpgo)
  - AGPL-3.0, Go
  - SFTP server with optional HTTP, FTP/S and WebDAV support - S3, Google Cloud Storage, Azure Blob
- [wthorp/GoSMB](https://github.com/wthorp/GoSMB)
  - SMB server written in Go
- [hirochachacha/go-smb2](https://github.com/hirochachacha/go-smb2)
  - SMB2/3 client
- [smallfz/libnfs-go](https://github.com/smallfz/libnfs-go)
  - NFSv4 server
- [vmware/go-nfs-client](https://github.com/vmware/go-nfs-client)
  - NFS client
- [Cyberax/go-nfs-client](https://github.com/Cyberax/go-nfs-client)
  - NFSv4 client
- [willscott/go-nfs](https://github.com/willscott/go-nfs)
  - NFSv3 server

## Fuse

- [dokan-dev/dokany](https://github.com/dokan-dev/dokany)
  - Windows
- [deadbeefsociety/sshfs](https://github.com/deadbeefsociety/sshfs)
- [sagemathinc/websocketfs](https://github.com/sagemathinc/websocketfs)
  - like sshfs, but over a WebSocket

## Sync/Transfer/Backup

- [restic/restic](./backup/restic.md)
  - Fast, secure, efficient backup program
  - 仓库 本地,SFTP, REST, S3, Minio, Wasabi, OSS, Swift
  - 支持 rclone
  - 支持加密
  - 支持快照
- [rsync](./backup/rsync.md)
- [rclone](./rclone/README.md)
- [zsync](./backup/zsync.md)
- [AppImageCommunity/zsync2](https://github.com/AppImageCommunity/zsync2)
- sanoid
- unison https://www.cis.upenn.edu/~bcpierce/unison/
- DeltaCopy http://www.aboutmyip.com/AboutMyXApp/DeltaCopy.jsp

## Web Client

- [mickael-kerjean/filestash](https://github.com/mickael-kerjean/filestash)
  - AGPL-3.0, Go
  - web client for SFTP, S3, FTP, WebDAV, Git, Minio, LDAP, CalDAV, CardDAV, MySQL
- [filebrowser](./client/filebrowser.md)
  - Apache-2.0, Vue
  - Golang 后端
- [TimboKZ/Chonky](https://github.com/TimboKZ/Chonky)
  - MIT, React
  - 纯前端 UI 组件
- [OpusCapita/filemanager](https://github.com/OpusCapita/filemanager)
  - Apache-2.0, JS
- [prasathmani/tinyfilemanager](https://github.com/prasathmani/tinyfilemanager)
  - GPLv3, PHP
- [kalcaddle/KodExplorer](https://github.com/kalcaddle/KodExplorer)
  - PHP, JS
- [kalcaddle/kodbox](https://github.com/kalcaddle/kodbox)
