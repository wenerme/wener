---
id: lmdb
title: LMDB
---

# LMDB - Lighting Memory-Maped Database

## Tips
* Key/value 存储
* 内存映射
* 使用全局递增 ID 标示版本
* 映射页管理和重复利用 - 使用 ID 跟踪页使用
* Write-On-Copy
* B+Tree
  * 页变长 - 分隔或合并
  * 页不一定有唯一的父节点和兄弟节点
  * 删除一个记录时主动更新其他相应指针,其他指针立即可用
    * BDB 会设置一个 tombstone,其他指正不需要任何操作,但需要定期回收空间
    * SQLite3 会让所有指向的指针时效,其他指针必须在下次使用前跳转到旧的位置
* 单写多读 - 序列化操作
* 无锁
* 无缓存管理 - 交由 OS 层管理
* ACID
  * 事务使用唯一 ID 进行标示
  * 先写 Data Page 再写 Meta Page
  * Meta Page 与 CPU 页对齐
* MVCC
  * 只保留两个版本
  * 正在读的页会继续保持
  * 避免较长的读会话
  * 追踪读 ID 的数组与数据映射分离
  * 与 CPU 页对齐
  * 可能读到脏数据
