
## ZFS
* 数据完整性
  * 数据完整性是 ZFS 的主要特性
  * 256 位的校验和位于元数据中,与数据相隔离
* Copy on Write
* 数据快照
* Pooled Data Storage
  * ZFS 会将存储设备的可用空间作为一个资源池, zpool
  * 会用于优化性能和冗余
* RAIDZ 和 RAIDZ2
* SSD 混合存储池
* 容量
  * ZFS 是 128 位的文件系统, 可存储 256 ZB
* 数据清洗
  * ZFS 可对存储池里的数据进行完整性校验,可修改其中的数据错误.
* 可使用 ZSF 指令来管理文件系统
* 数据去重
* 加密
* ARC - Adaptive Replacement Cache.
* [ZFS Administration](https://pthree.org/2012/04/17/install-zfs-on-debian-gnulinux/)
* [ZFS Tutorial - 2016](http://buildwithbsd.org/zfs/zfs_tutorial_part_1.html)
* [ZFS Resources](http://serverfault.com/questions/355708)
* [Oracle® Solaris Administration: ZFS File Systems - 2012](https://docs.oracle.com/cd/E23824_01/pdf/821-1448.pdf)[HTML](https://docs.oracle.com/cd/E23824_01/html/821-1448/)
* [Encryption](https://docs.oracle.com/cd/E23824_01/html/821-1448/gkkih.html)

### Tutor

#### 准备工作
```bash
# 创建工作区间
mkdir -p ~/temp/zfs && cd $_
# 使用文件作为存储, 实际使用时将文件替换为设备即可
for i in {1..4};do dd bs=1M count=256 if=/dev/zero of=disk$i; done
dd bs=1M count=256 if=/dev/zero of=sparedisk
```

#### zpool
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

#### zfs
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
