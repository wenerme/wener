---
title: cubefs
tags:
  - CNCF
---

# cubefs

- [cubefs](https://github.com/cubefs/cubefs)
  - Apache-2.0, Go, C++
  - by 京东, OPPO, 贝壳
  - ChubaoFS -> CubeFS
  - CNCF 项目
  - 提供 S3 接口
  - POSIX
  - 多租户
  - 兼容 Hadoop FileSystem 接口协议
  - 多副本存储
  - 纠删码存储

## Notes

- Master Node
  - 资源管理节点
  - Raft 一致
  - RocksDB 持久化状态
- Object Node
  - 对象存储 - 对象网关
- Meta Node - 元数据存储
  - Meta Partition
  - Raft 一致
  - 每个分片为 Inode
  - inode BTree
  - dentry BTree
- Data Node - 数据存储
  - 分片/副本
  - 纠删码 - Blobstore
    - 依赖 kafka, consul
- Blok Node
