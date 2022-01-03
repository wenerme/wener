---
title: Gluster
---

# glusterfs

- [heketi/heketi](https://github.com/heketi/heketi)
  - RESTful based volume management framework for GlusterFS

:::caution 注意

- [#268](https://github.com/gluster/glusterfs/issues/268) - 不兼容 alpine musl

:::

# Gluster vs Ceph

- Ceph
  - 基于对象
  - 支持非结构化数据
  - 底层 RADOS 对象数据系统
  - cephfs 基于对象存储实现 fs 访问层
  - bluestore 可直接操作块设备不在依赖 fs
- Gluster
  - 级联文件系统结构
  - 使用简单，架构层级少
  - 对使用的 FS 有要求和依赖
  - glusterfs 层之上提供了 swift 作为对象存储
  - 适合顺序访问，不适合数据库类对锁要求的访问
