---
id: distributed-storage
title: 分布式存储
---

# 分布式存储

## Tips
* 注意
  * 分布式存储的核心要求 Lan 通信足够快 - 最好 10Gb+
  * 最好单节点多磁盘 - 利用好节点资源
  * 支持的接口不同应用场景也不同
* 接口类型
  * 块设备
    * iscsi
    * rdb
  * 文件系统
    * fuse
    * nfs
    * smb
    * afp
    * webdav
    * hdfs
  * 对象存储
    * s3
* 场景
  * 共享
    * 终端好接入
    * 用户感知
    * 用户权限
  * API 访问
    * 应用好接入
  * 虚拟机
    * 块设备
    * 访问速度块
    * 副本
  * 加密
* 数据分布
  * 整块 - volume、block
  * 副本 - 多副本实现高可用
  * 快照
  * 分片 - 将数据进行切片分割存储
  * EC - 通过编码实现高可用
  * 区域 - 机架、数据中心、城市、国家
* 节点分布
  * 主节点/管理节点 + 存储节点
  * 网关节点 - 提供接口
* 参考
  * [Clustered file system](https://en.wikipedia.org/wiki/Clustered_file_system)

## 块设备

## 文件系统
* [cmusatyalab/coda](https://github.com/cmusatyalab/coda)
