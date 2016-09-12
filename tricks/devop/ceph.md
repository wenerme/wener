# Ceph

* [Ceph 文档](http://docs.ceph.com/docs/master/)

## 安装

### Ubuntu 16.04
```bash
# 准备好以下机器 dlp node1 node2 node3, 配置好 ssh 无密码登陆
# 将在 admin 机器上进行部署, 将使用 node1,node2,node3 组成一个集群

# 包准备
apt-get -y install openssh-server python-ceph
echo -e 'Defaults:ubuntu !requiretty\nubuntu ALL = (root) NOPASSWD:ALL' | tee /etc/sudoers.d/ceph
chmod 440 /etc/sudoers.d/ceph
# 部署
apt-get -y install ceph-deploy ceph-common ceph-mds
mkdir ceph
cd ceph

ceph-deploy new node01
nano ceph.conf
# 在结尾添加 osd pool default size = 2
# 在所有节点上安装 ceph
ceph-deploy install dlp node01 node02 node03
# 配置监控和 key
ceph-deploy mon create-initial

# 分别在 node1 上创建 /storage01 node2 上创建 /storage02 node3 上创建 /storage03
# 并且将权限给 ceph
# chown ceph:ceph /storage0*

# 准备 OSD
ceph-deploy osd prepare node01:/storage01 node02:/storage02 node03:/storage03
# 激活 OSD
ceph-deploy osd activate node01:/storage01 node02:/storage02 node03:/storage03
# 传输配置文件
ceph-deploy admin dlp node01 node02 node03
# 查看状态,正常的会输出 HEALTH_OK


# 如果想要重新配置可使用以下操作
# 去除所有包
ceph-deploy purge dlp node01 node02 node03
# 去除所有配置
ceph-deploy purgedata dlp node01 node02 node03
ceph-deploy forgetkeys
```

* [Configure Ceph Cluster on Ubuntu 16.04](https://www.server-world.info/en/note?os=Ubuntu_16.04&p=ceph)
* [Quick Ceph Deploy](http://docs.ceph.com/docs/master/start/quick-ceph-deploy/)

## FS 比较

* XFS
  * 慢
  * 基于日志
  * 足够稳定,适合生产,使用最为广泛
* Btrfs
  * 最快
  * CopyOnWrite
  * 支持写快照
  * 支持 XATTRs 和 inline data
  * 支持热 fsck
  * Ceph 可同时写日志和对象数据
  * 正在趋于稳点和生产
* Ext4
  * 适合生产
  * 基于日志
  * 文件名有长度限制

使用 Ceph 尽量避免 RAID, 因为并没有得到任何好处,除非是在有非常多的磁盘且内存资源不足时可使用 RAID 来减少 Ceph 对内存的使用,因为对于每个磁盘的监控 Ceph 大约会使用 2G 内存.

## Tips

* 默认日志路径为 `/var/lib/ceph/osd/$cluster-$id/journal`, 可将该文件挂在到其它磁盘以增加性能
* Ceph 使用副本或 EC 来保护数据
* CephFS 默认端口为 6789

__所有的命令__

```
ceph                   ceph-create-keys       ceph-detect-init       ceph-fuse              ceph-post-file
ceph-authtool          ceph-crush-location    ceph-disk              ceph-mds               ceph-rbdnamer
ceph-bluefs-tool       ceph-debugpack         cephfs-data-scan       ceph-mon               ceph-rest-api
ceph-clsinfo           ceph-dencoder          cephfs-journal-tool    ceph-objectstore-tool  ceph-run
ceph-conf              ceph-deploy            cephfs-table-tool      ceph-osd               ceph-syn
```

```bash
# 查看磁盘类型
file -sL /dev/vda1
df -T

# XFS 测试
apt-get install xfsprogs
# 使用文件创建 xfs
truncate -s 2G data.vol
# 也可挂载为设备
# losetup /dev/loop5 data.vol

# 格式化 n 创建分区 p 主分区 w 写入
fdisk data.vol
# 格式化为 xfs
mkfs.xfs -f data.vol
# 挂载
mkdir /storage
mount -t xfs data.vol /storage
# 查看文件系统
df -Th /storage


rados mkpool data # 创建 Pool
echo Test-data > testfile.txt
rados put tf.txt testfile.txt -p data # 放入文件
rados -p data ls # 查看对象
ceph osd map data tf.txt # 找到存储的对象映射

rados df # 查看使用量

rados lspools # 查看所有的 rados pool
rados -p metadata ls # 查看某个 pool 中的对象

# 获取 pg pgp 数量
ceph osd pool get data pgp_num
ceph osd pool get data pg_num
# 查看副本数量
ceph osd dump | grep size


# 挂载 RBD
# 尽量使用 3.5+ 内核版本
uname -r
modprobe rbd

rbd create rbd-1
rbd info rbd-1
rbd map rbd/rbd-1
# 查看映射的设备
rbd showmapped

# 映射可能会出现由于 krbd 不支持 ceph rbd 特性的错误
# 查看 Ceph 打开的特性
ceph --show-config|grep rbd|grep features
# layering      | 1
# striping      | 2
# exclusive-lock| 3
# object-map    | 8
# fast-diff     | 16
# deep-flatten  | 32

# 关闭相关特性
rbd feature disable rbd/rbd-1 deep-flatten
rbd feature disable rbd/rbd-1 fast-diff
rbd feature disable rbd/rbd-1 object-map
rbd feature disable rbd/rbd-1 exclusive-lock

# 可以在配置中添加 rbd_default_features = 3 以修改创建出的 rbd 特性
# 到 4.6 为止,依然只支持 1+2

# CephFS
ceph-deploy mds create ceph-node1

ceph osd pool create fs_data 128 128
ceph osd pool create fs_metadata 128 128

ceph fs new cephfs fs_data fs_metadata
ceph fs ls
ceph mds stat

mkdir -p /mnt/cfs
# 查看 secret 值
cat ceph.client.admin.keyring
mount -t ceph 地址:6789:/ /mnt/cfs -o name=admin,secret=上面的secret值
# 也可以将 secret 放在文件中
# mount -t ceph 地址:6789:/ /mnt/cfs -o name=admin,secretfile=文件路径

```

__最佳实践__

* 每个 OSD 预留 2G 内存,每个 OSD 一个磁盘,冗余 NIC
* 如果有 SSD, 可将 SSD 作为日志磁盘, 使用机械盘作为存储磁盘, 如果 SSD 较少,可多个 OSD 共用一个 SSD(一个 SSD 损坏影响多个 OSD)
* 使用 SSD 前最好事先测试出顺序和随机读写的性能
* MON 位于单独服务器, 不需要太多的 RAM 和磁盘,冗余 NIC
* 如果单个主机上 OSD 较多(例如 >20),建议增大系统线程数 `kernel.pid_max = 4194303`
* 参考 [推荐硬件](http://docs.ceph.com/docs/master/start/hardware-recommendations/)
* 参考 [推荐操作系统](http://docs.ceph.com/docs/master/start/os-recommendations/)

## 术语

* OSD
  * Object Storage Device
  * 对象存储设备,为 Ceph 中最底层的存储设备,一般为硬盘
* RADOS
  * Reliable Autonomic Distributed Object Store
  * 可靠的分布式对象原子存储
* librados
  * 用于操作 RADOS 的库,支持 PHP, Ruby, Java, Python, C, 和 C++ 语言
  * 为 RBD, RGW 和 CephFS 的实现提供了基础
* MDS
  * Ceph Metadata Server
  * 跟踪 CephFS 的文件层级结构和元数据
* CephFS
  * Ceph File System
  * 基于 MDS 实现的 POSIX 兼容的文件系统
* RBD
  * RADOS Block Device - Ceph Block Device
  * 提供基于块的存储,类似于磁盘块,可直接被挂载或格式化
  * Linux 2.6.39 后集成了 RBD 驱动 Kernel RBD (KRBD)
* librbd
  * 操作 RBD 的库,基于 librados
* RGW
  * RADOS Gateway - Ceph Object Gateway
  * 基于 librados, 通过 REST 暴露接口,实现与 S3(Simple Storage Service),Swift 等兼容的接口
* CRUSH
  * Controlled Replication Under Scalable Hashing
  * 底层对象的 Hash 算法,是 Ceph 的核心,通过取得集群的映射可以在客户端执行,避免 SPOF, 去中心化
* MON
  * Ceph Monitor
  * Ceph 监控进程,监控集群健康状态,通过一个映射反映集群状态,其中映射包含了 OSD, MON, PG, 和 CRUSH 的映射
* PG
  * Placement Group
  * Ceph 中对象副本的逻辑分组
  * PG 数 = (OSD 总数 * 100) / 最大副本数 -  结果归约到最近的 2 的平方数
  * 每个 Pool 的 PG 数 = (OSD 总数 * 100) / 最大副本数 / Pool 数量 -  结果归约到最近的 2 的平方数
  * 即便如果计算的数量为 100 则选择 128, 如果结果为 1000 则用 1024


## 内部原理

## 技术比较

### vs HDFS
* HDFS
  * Name Node 会造成单点,且是整个系统中的瓶颈
* Ceph
  * 集群为 AA 模式, 无单点
  * CRUSH 使得对象存储不会存在中心服务,架构中无瓶颈

## FAQ
### HEALTH_ERR 64 pgs are stuck inactive for more than 300 seconds; 64 pgs stuck inactive
这个是有可能由很多问题引起的,可分别查看其它服务上的日志来判断 `cat /var/log/ceph/ceph*`

### ERROR: osd init failed: (36) File name too long
文件名太长,可能是由于文件系统类型导致的 `df -T`,一般建议使用 XFS 或 Btrfs, 但大多数情况下是 ext4, 文件名不能超过 1024b.
