---
title: DFS
---

# DFS
* 是什么？
  * Distributed File System
  * 微软开发的分布式文件系统
  * alternative name space, load balancing, automatic failover
* junction 定位元信息，然后访问实际 server 获取数据
  * 类似联邦
* DFS-R - Distributed File System Replication
  * 实现 DFS 中的副本机制
* 底层有使用 SMB 协议
* 可独立（单机）使用或在域中部署使用

## Samba
* [Distributed File System](https://wiki.samba.org/index.php/Distributed_File_System_(DFS))
* 不支持 DFS-R

```properties
path = /export/dfsroot
msdfs root = yes
host msdfs = yes
vfs object = dfs_samba4
```
