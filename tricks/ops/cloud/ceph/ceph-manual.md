# Ceph Manual

## Tips

## Glossory
* Ceph Cluster
  * 基础配置
    * fsid
* PG
* OSD
* MDS
* MON
* RDB
* CRUSH
* Pool
  * 存储对象的逻辑分区
  * 由 PG 组成
  * CRUSH 将 PG 映射为 OSD
  * 存储对象时 CRUSH 将对象映射为 PG
  * 客户端与 OSD 不直接耦合, 允许 OSD 动态平衡

