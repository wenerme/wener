---
id: ceph-ubuntu-16-install
title: Ubuntu 16.04 安装 Ceph
---

# Ubuntu 16.04 安装 Ceph

- [Configure Ceph Cluster on Ubuntu 16.04](https://www.server-world.info/en/note?os=Ubuntu_16.04&p=ceph)
- [Quick Ceph Deploy](http://docs.ceph.com/docs/master/start/quick-ceph-deploy/)

```bash
# 准备机器 node-1 node-2 node-3 node-4
# mon 节点  node-2, node-4
# admin 节点 node-1
# 每个节点上准备
#   vdb 20G   SSD  日志
#   vdc 500G  机械  数据

# 在 node-1 上安装
apt install ceph-deploy
# 在所有节点上执行或在主节点上执行 ceph-deploy pkg --install btrfs-tools node-{1,2,3,4}
apt install btrfs-tools

echo -e 'Defaults:ubuntu !requiretty\nubuntu ALL = (root) NOPASSWD:ALL' | tee /etc/sudoers.d/ceph
chmod 440 /etc/sudoers.d/ceph

# 创建目录用于存放配置
mkdir ceph
cd ceph

# 清理之前的旧数据和安装的旧版本
ceph-deploy purge node-{1,2,3,4}
# 将 node-2 和 node-4 作为初始的 mon 节点
ceph-deploy new node-{2,4}

# 注意
# 如果有多个网卡,一定要在当前目录下的 ceph.conf 中加入 public network = {ip-address}/{netmask} 配置

# 安装 ceph
ceph-deploy install node-{1,2,3,4}
# 部署 node-2 和 node-4 上的 mon
ceph-deploy mon create-initial
# 拷贝秘钥,使 node-1 可管理集群
ceph-deploy admin node-1
# 查看状态
ceph status

# 准备 osd
# 该操作会清除指定磁盘上的数据,并将磁盘从新格式化为 btrfs
ceph-deploy osd prepare --fs-type=btrfs --zap-disk node-1:vdc:vdb
ceph-deploy osd activate node-1:vdc:vdb
# 这两部操作等同于 ceph-deploy osd create --fs-type=btrfs --zap-disk node-1:vdc:vdb
ceph-deploy osd activate --fs-type=btrfs --zap-disk  node-{2,3,4}:vdc:vdb


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

# 如果重复安装,在 mon create-initial 时出现 KeyNotFound 可以尝试一下操作
rm -rf /var/{lib,run,log}/ceph/
# 即便指定了日志盘符,也只会使用 5G ,如果重复使用该日志盘,之前占用的空间并不会被释放,
#   因此 osd create 可能会失败,此时需要清除磁盘的分区.
```

```bash
# 移除 OSD
##########
ceph osd out $OSD_NUM
# 在 OSD 所在的节点上执行
ceph stop osd.$OSD_NUM

ceph osd crush remove osd.$OSD_NUM
ceph auth del osd.$OSD_NUM
ceph osd down $OSD_NUM
ceph osd rm $OSD_NUM
```

使用 Ceph 尽量避免 RAID, 因为并没有得到任何好处,除非是在有非常多的磁盘且内存资源不足时可使用 RAID 来减少 Ceph 对内存的使用,因为对于每个磁盘的监控 Ceph 大约会使用 2G 内存.
