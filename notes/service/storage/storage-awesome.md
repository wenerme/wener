---
title: Storage Awesome
tags:
  - Awesome
---

# Storage Awesome

**接口协议**

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

## Protocol

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

## Distributed File System

- minio
- ceph
- gluster
- hdfs
- 参考
  - [distributed_fs_evaluation](https://www.reddit.com/r/homelab/comments/q9weh4/distributed_fs_evaluation/)

---

- [chrislusf/seaweedfs](https://github.com/chrislusf/seaweedfs)
  - Apache-2.0, Go
- [chubaofs/chubaofs](https://github.com/chubaofs/chubaofs)
  - Apache-2.0, Go
  - CNCF 项目
  - 提供 S3 接口
  - POSIX
  - 多租户
- [happyfish100/fastdfs](https://github.com/happyfish100/fastdfs)
  - GPL-3.0, C
- [juicedata/juicefs](https://github.com/juicedata/juicefs)
  - AGPL-3.0, Go
  - metadata - Redis, TiKV, PG, MySQL
  - data - S3, OSS, Ceph, MinIO
- [haiwen/seafile](https://github.com/haiwen/seafile)
  - GPL, C

## Tools

- [restic/restic](https://github.com/restic/restic)
  - Fast, secure, efficient backup program
  - 仓库 本地,SFTP, REST, S3, Minio, Wasabi, OSS, Swift
  - 支持 rclone
  - 支持加密
  - 支持快照
