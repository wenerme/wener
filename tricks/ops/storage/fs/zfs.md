# ZFS

## Tips
* [zfsonlinux](http://zfsonlinux.org/)
* [zfsonlinux/zfs](https://github.com/zfsonlinux/zfs)
* [open-zfs](http://open-zfs.org/)
* Archlinux [ZFS](https://wiki.archlinux.org/index.php/ZFS)
* Archlinux [ZFS/Virtual disks](https://wiki.archlinux.org/index.php/ZFS/Virtual_disks)
* [ZFS Administration](https://pthree.org/2012/04/17/install-zfs-on-debian-gnulinux/)
* [ZFS Tutorial - 2016](http://buildwithbsd.org/zfs/zfs_tutorial_part_1.html)
* [ZFS Resources](http://serverfault.com/questions/355708)
* [Oracle® Solaris Administration: ZFS File Systems - 2012](https://docs.oracle.com/cd/E23824_01/pdf/821-1448.pdf)[HTML](https://docs.oracle.com/cd/E23824_01/html/821-1448/)
* [Encryption](https://docs.oracle.com/cd/E23824_01/html/821-1448/gkkih.html)
* 数据完整性
  * 数据完整性是 ZFS 的主要特性
  * 256 位的校验和位于元数据中,与数据相隔离
* Copy on Write
* 数据快照
* Pooled Data Storage
  * ZFS 会将存储设备的可用空间作为一个资源池, zpool
  * 会用于优化性能和冗余
* RAIDZ
  * 类似于 RAID-5
  * RAIDZ1
  * RAIDZ2
* SSD 混合存储池
* 容量
  * ZFS 是 128 位的文件系统, 可存储 256 ZB
* 数据清洗
  * ZFS 可对存储池里的数据进行完整性校验,可修改其中的数据错误.
* 可使用 ZSF 指令来管理文件系统
* 数据去重
* 加密
* ARC - Adaptive Replacement Cache.
* [faq](https://github.com/zfsonlinux/zfs/wiki/faq)
  * 选择创建 pool 的名字
    * 开发,测试 /dev/hdX,/dev/sdX 
    * < 10 /dev/disk/by-id
    * > 10 /dev/disk/by-path
    * > 10 最好 /dev/disk/by-vdev
* [zpool.8](https://www.freebsd.org/cgi/man.cgi?query=zpool&sektion=8)
* [zfs.8](https://www.freebsd.org/cgi/man.cgi?query=zfs&sektion=8)
* [OpenZFS novel algorithms: snapshots, space allocation, RAID-Z - Matt Ahrens](https://www.slideshare.net/MatthewAhrens/openzfs-novel-algorithms-snapshots-space-allocation-raidz-matt-ahrens)

## NOTES
* zpool
  * 存储池
    * 一组虚拟设备的合集
* vdev - Virtual Device - 虚拟设备
  * disk
  * file
  * mirror
  * raidz
    * raidz 等同于 raidz1
    * raidz1
    * raidz2
    * raidz3
  * spare
  * log
  * cache
* vdev 状态
  * DEGRADED
  * FAULTED
  * OFFLINE
  * ONLINE
  * REMOVED
  * UNAVAIL

A raidz group with	N disks	of size	X with P parity	disks can hold
approximately (N-P)*X bytes and can withstand P device(s) failing
before data integrity is compromised. The minimum number of
devices in	a raidz	group is one more than the number of parity
disks. The	recommended number is between 3	and 9 to help increase
performance.

## 数据冗余

* Stripped
  * 无冗余
* RAIDZ1
  * 等同于 RAID 5
  * 最大的磁盘空间
  * 当磁盘读写块大于 128K 时性能较好
  * 应该使用 2<sup>n<sup>+1 个磁盘
* RAIDZ2
  * 等同于 RAID 6
  * 更好的容错
  * 比 RAIDZ1 更好的 MTTDL(mean time to data loss)
  * 应该使用 2<sup>n<sup>+2 个磁盘
* RAIDZ3
  * 应该使用 2<sup>n<sup>+3 个磁盘
* 镜像
  * 等同于 RAID 1
  * 使用更多的磁盘空间,但处理小数据的读写性能会较好.
  * 为了追求更好的性能可基于 RAIDZ 实现镜像,特别是针对交大的,不可缓存的随机读.

* 每个 vdev 的磁盘不应该超过 12 个.建议每个 vdev 为 3-9 个磁盘.
* 一个或多个磁盘组成 vdev
* vdev 创建后不能修改
* 一个或多个 vdev 组成 zpool
* 磁盘损坏不会导致数据丢失
* vdev 损坏导致 zpool 不可使用
* 添加到 zpool 后的 vdev 不能被删除
* ZIL(ZFS intent log) 损坏会导致数据丢失
* L1ARC 是存储于 RAM 的读缓存,不应该超过 7/8 总 RAM
* L2ARC 是存储于磁盘的读缓存
* ZIL he L2ARC 存储于 SSD 但不应该存储于同一个 SSD
* ZIL 主要用于同步写,大多数情况下不需要
* L2ARC 大多数情况下不会提升太多的性能
* 增加 RAM 是提升性能的最好方式


## 硬件
* [Hardware](http://open-zfs.org/wiki/Hardware)

## Tutor

### 准备工作
```bash
# 创建工作区间
mkdir -p ~/temp/zfs && cd $_
# 使用文件作为存储, 实际使用时将文件替换为设备即可
for i in {1..4};do dd bs=1M count=256 if=/dev/zero of=disk$i; done
dd bs=1M count=256 if=/dev/zero of=sparedisk
```

### zpool
```bash
# 创建单个磁盘的 Pool, 没有数据冗余
zpool create tank $PWD/disk1
zpool list
# 写入数据, OS X 的挂载点在 /Volumes/tank, Linux 为 /tank
dd bs=1M count=64 if=/dev/random of=/tank/foo
# 查看写入后的状态
zpool list tank
# 清除
zpool destroy

# 镜像 Pool
zpool create tank mirror $PWD/disk1 $PWD/disk2
zpool status tank
dd bs=1M count=64 if=/dev/random of=/tank/foo
# 使 disk1 数据损坏
dd bs=1M seek=10 count=1 conv=notrunc if=/dev/random of=disk1
zpool scrub tank
zpool status tank
# 只是数据损坏磁盘没有异常, 可使用 clear 修复
zpool clear tank
zpool status tank
# 使 disk1 磁盘损坏
echo > disk1
zpool scrub tank
# 显示有一个磁盘不可用但依然可以操作
zpool status tank
dd bs=1M count=64 if=/dev/random of=/tank/bar
# 替换损坏的磁盘
zpool replace tank $PWD/disk1 $PWD/sparedisk
zpool status
# 扩容,添加新的磁盘
zpool add tank mirror $PWD/disk3 $PWD/disk4
zpool list
dd bs=1M count=100 if=/dev/urandom of=/tank/bar
zpool iostat -v tank
zpool destroy tank
```

### zfs
```bash
zpool create tank mirror $PWD/disk1 $PWD/disk2
zfs list tank
# 创建新的文件系统
zfs create tank/joey
zfs create tank/monica
zfs create tank/ross
zfs list -r tank
df -h |grep tank
# 删除文件系统
zfs destroy tank/ross
zfs create tank/ross
# 修改挂载点
zfs set mountpoint=$PWD/monica tank/monica
# 卸载文件系统
zfs umount tank/joey
df -h |grep tank
# 从新挂载
zfs mount tank/joey
# 获取所有属性
# SOURCE: '-' 只读 default 默认值 local 本地修改的值 inherited 继承自父文件系统的值
zfs get all tank/joey
zfs get -Hp -o name,property,value used,available tank/joey

# 限制配额
zfs set quota=50m tank/joey
# 设置预留
zfs set reservation=25m tank/joey
zfs get -r quota tank
zfs get -r reservation tank

# 启用压缩
zfs set compression=lz4 tank/joey
zfs get -r compression tank
# 使用词典测试压缩
# 在 Ubuntu/Debian 下需要安装 wordlist,例如 apt-get install wamerican-large
cp /usr/share/dict/words /tank/ross/
cp /usr/share/dict/words /tank/joey/
zfs list -o name,used,compressratio,compression tank/{joey,ross}
```

## 管理运维

```bash
zpool status -x
# 进行数据清理操作
zpool scrub tank
# 查看 scrub 状态
zpool status
# io 统计, 间隔 5s
zpool iostat -v 5
```

## ZFS vs 硬件 RAID
* ZFS 有校验和,和可避免位翻转等问题,而 RAID 主要用于避免整个磁盘的损坏
* ZFS 只需要 HBAs (host bus adapter ) 而不需要 RAID 控制器
* 最多只需要 Z2, Z3 很少使用,并且可能会有问题,有其他的办法来避免可能的错误
* ZFS 并不是 RAID, 而是一个软件,一个文件系统
* ZFS 重建比 RAID 更快,例如 1TB 的云盘,实际数据只有 100MB, 那么 ZFS 只需要 100MB 的 IO, 而 RAID 需要 1TB 的 IO.
* scrub 是用来保证数据安全的,而不是保证磁盘健康的.不是自动的,需要定时调度.

* "PFA"s, as in Pre-Failure Alerts

* [ZFS vs RAID6](https://www.reddit.com/r/storage/comments/3jcg2r/zfs_vs_raid6/)

## 参考
* [ZFS RAIDZ stripe width, or: How I Learned to Stop Worrying and Love RAIDZ](http://blog.delphix.com/matt/2014/06/06/zfs-stripe-width/)
* [Getting the Most out of ZFS Pools](Getting the Most out of ZFS Pools)
* [A Closer Look at ZFS, Vdevs and Performance](http://constantin.glez.de/blog/2010/06/closer-look-zfs-vdevs-and-performance)
* [FreeBSD ZFS Tuning Guide](https://wiki.freebsd.org/ZFSTuningGuide)
* [ZFS Administration Guide](http://docs.oracle.com/cd/E19253-01/819-5461/index.html)
* [Becoming a ZFS Ninja (video)](https://blogs.oracle.com/video/entry/becoming_a_zfs_ninja)
* [Slideshow explaining VDev, zpool, ZIL and L2ARC and other newbie mistakes!](https://forums.freenas.org/index.php?threads/slideshow-explaining-vdev-zpool-zil-and-l2arc-for-noobs.7775/)
* [A Crash Course on ZFS](http://www.bsdnow.tv/tutorials/zfs)
* [ZFS: The Last Word in File Systems - Part 1 (video)](https://www.youtube.com/watch?v=uT2i2ryhCio)
* [ZFS Raidz Performance, Capacity and Integrity](https://calomel.org/zfs_raid_speed_capacity.html)
* [The 'Hidden' Cost of Using ZFS for Your Home NAS](http://louwrentius.com/the-hidden-cost-of-using-zfs-for-your-home-nas.html)
