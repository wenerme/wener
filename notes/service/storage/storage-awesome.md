---
title: Storage Awesome
tags:
  - Awesome
---

# Storage Awesome

- 考虑因素
  - 怎么用
    - 选择网络接口协议
    - 块 vs 文件 vs 对象
    - 需要什么样的功能 - 快照、备份、加密
    - SDS
  - 有什么
    - 网络带宽、延时
    - 存储设备情况、NVME、SATA、SAS
  - 面对什么样的威胁
    - 磁盘损坏
    - 网络异常

:::tip

90% 的情况下都不需要分布式存储，单机使用 ZFS 可以把存储能力叠到很高。

基于单机存储也可以实现 SDS - 软件定义存储。

:::

## 网络接口协议

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

- [drakkan/sftpgo](https://github.com/drakkan/sftpgo)
  - AGPL-3.0, Go
  - SFTP server with optional HTTP, FTP/S and WebDAV support - S3, Google Cloud Storage, Azure Blob
- [mickael-kerjean/filestash](https://github.com/mickael-kerjean/filestash)
  - AGPL-3.0, Go
  - web client for SFTP, S3, FTP, WebDAV, Git, Minio, LDAP, CalDAV, CardDAV, Mysql

## 分布式存储服务

- [minio](./minio.md) - S3
- ceph - S3, POSIX, RAOD
- [gluster](./gluster.md) - POSIX
- luster
- hdfs - 大数据, 计算->存储
- openio-sds

**国人开发/维护**

- [seaweedfs](./seaweedfs.md) - 快存储，小文件优化
  - Apache-2.0, Go
  - 开发活跃，作者活跃
- [juicefs](./juicefs.md)
  - Apache-2.0, Go
  - AGPL-3.0 -> Apache-2.0
  - metadata - Redis, TiKV, PG, MySQL
  - data - S3, OSS, Ceph, MinIO
- [cubefs](https://github.com/cubefs/cubefs)
  - Apache-2.0, Go,C++
  - chubaofs -> cubeFS
  - 🚧 开发不活跃
  - CNCF 项目
  - 提供 S3 接口
  - POSIX
  - 多租户
- [happyfish100/fastdfs](https://github.com/happyfish100/fastdfs)
  - GPL-3.0, C
  - 🚧 开发不活跃
- [haiwen/seafile](https://github.com/haiwen/seafile)
  - GPL, C
  - 🚧 开发不活跃

---

- 参考
  - [distributed_fs_evaluation](https://www.reddit.com/r/homelab/comments/q9weh4/distributed_fs_evaluation/)
  - [Comparison of distributed file systems](https://en.wikipedia.org/wiki/Comparison_of_distributed_file_systems)

## 协议库

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

## Tools

- [restic/restic](https://github.com/restic/restic)
  - Fast, secure, efficient backup program
  - 仓库 本地,SFTP, REST, S3, Minio, Wasabi, OSS, Swift
  - 支持 rclone
  - 支持加密
  - 支持快照

## Sync

- rsync
- unison https://www.cis.upenn.edu/~bcpierce/unison/
- DeltaCopy http://www.aboutmyip.com/AboutMyXApp/DeltaCopy.jsp
