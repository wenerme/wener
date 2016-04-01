
## 基准测试
```bash
# /dev/zero 最快,但可能会被压缩
time cat /dev/zero | head -c $((1024*1024*500)) > /dev/null
real	0m0.439s
user	0m0.026s
sys	0m0.747s

# /dev/urandom 性能较慢
time cat /dev/urandom | head -c $((1024*1024*500)) > /dev/null
real	1m25.427s
user	0m0.097s
sys	1m25.713s

# openssl 随机数相对更快
time openssl rand $((1024*1024*500)) | head -c $((1024*1024*500)) > /dev/null
real	0m9.721s
user	0m9.024s
sys	0m1.284s

# 监控 IO 状况
iostat -mx -d sda 1

dd bs=16M count=64 if=test of=test1 conv=fdatasync

```

* [dd benchmark](https://romanrm.net/dd-benchmark)

## 我的移动存储设备

### 32G
> 32G U 盘可用空间大约为 30G

分区|大小|文件系统|用途|备注
----|----|----|----
\#1|15G| ExtFAT|主数据| ExtFAT 支持相对比较广泛
\#2|10G| HFS+ | OS X 系统安装盘<br>OS X 数据交换|因为工作平台主要为 Mac, 考虑可能会用于安装操作系统的情况
\#3|5G| 支持加密的文件系统|用于存放隐私加密数据|保存小秘密

```bash
# 创建分区
sgdisk -og /dev/sdb

mkfs.exfat /dev/sdb1
exfatlabel /dev/sdb1 MainData
fsck.exfat /dev/sdb1
dumpexfat /dev/sdb1

mkfs.hfsplus -v OSX /dev/sdb2
fsck.hfsplus /dev/sdb2

```

* 疑问
  * OS X 对 ext 的支持
  * Ubuntu 添加 mkfs ExtFAT
  * Ubuntu ZFS 支持
  * ZFS 怎么加密
  * Windows 对 ZFS 的支持
  * Cygwin 对 ZFS 的支持

## Linux
```bash
# L - label, f - fast don't zero, C - compress, I - not indexing, U - generate UUID, v - verbose
mkfs.ntfs /dev/sdb1 -fCIUvL NTFS
# 添加 exfat 支持
apt-get install exfat-utils exfat-fuse
# HFS +
apt-get install hfsprogs
mount -t hfsplus -o force,rw /dev/sdXY /media/mntpoint

# ZFS
apt-get install zfs-fuse

# 转换为 GPT
parted -s /dev/sdb 'mklabel gpt'
# 编辑 GPT 分区
gdisk /dev/sdb
# 脚本操作 http://www.rodsbooks.com/gdisk/sgdisk-walkthrough.html
# -p 查看分区 -o 清除分区表 -g 转换 MBR 为 GPT -n 删除分区 -n 添加分区 -c 更改分区名
# -t 分区类型 -v 校验 -Z 清除分区数据,当需要从新分区的时候使用
sgdisk -og /dev/sdb
# 创建一个 5G 分片, 数学运算时为了扇区对齐
# 具体的大小还需要考虑逻辑扇区大小,下面 *2 是考虑逻辑扇区大小为 512
sgdisk /dev/sdb -n 1:$(sgdisk -F /dev/sdb|tail -1):$((1024*1024*5*2-1 + $(sgdisk -F /dev/sdb|tail -1)))
# 交互界面操作
cgdisk

# 创建 5个 5G 分区
sgdisk -og /dev/sdb
for i in $(seq 1 5) ; do sgdisk /dev/sdb -n $i:$(sgdisk -F /dev/sdb|tail -1):$((1024*1024*5*2-1 + $(sgdisk -F /dev/sdb|tail -1))); done
# 最后一个分区包含剩余空间
sgdisk /dev/sdb -n 6:$(sgdisk -F /dev/sdb|tail -1):$(sgdisk -E /dev/sdb|tail -1)
# 为所有分区设置名字
for i in $(seq 1 6) ; do sgdisk /dev/sdb -c $i:"part-$i"; done
```

## OS X
```bash
# 相当于 fdisk -l
diskutil list
# umount 经常无法直接操作
diskutil unmount /Volumes/<挂载名>
diskutil unmountdisk /dev/disk2
# 格式化磁盘
diskutil eraseDisk HFS+ newdisk disk2
# 磁盘分区
diskutil partitionDisk disk4 1 GPT HFS+ newdisk R

# 添加 ext 类磁盘操作工具
brew install e2fsprogs
ls `brew --prefix e2fsprogs`/sbin
```

## Tips

* 在 Mac 下可通过虚拟机来格式化磁盘
* 使用 [rufus](https://rufus.akeo.ie/) 制作 Windows 启动盘
* CHS - 柱面-磁头-扇区 - Cylinder-head-sector
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

## NTF
* 允许本地访问远程文件
* 使用 C/S 结构在 \*nix 之间分析文件
* 两个机器之间不需要允许相同的操作系统
* 可使用 NSF 指定中心存储解决方案
* 用户不需要关系文件的物理位置
* 不需要手动刷新来显示文件
* 新版本的 NFS 也支持 ACL
* 可用过防火墙和 Kerberos 来保证安全
* 默认 2049 端口
* 使用 Kerberos 可使用密码进行验证

```bash
# 共享该目录
sudo mkdir -p /share
# 赋予当前用户共享目录权限
sudo chown $USER /share
# OS X
echo '/share -network 192.168.0.0 -mask 255.255.0.0' | sudo tee /etc/exports
# Linux
# echo '/nfsshare 192.168.0.101(rw,sync,no_root_squash)' | sudo tee /etc/exports

sudo nfsd enable
sudo nfsd start
sudo nfsd status
sudo nfsd checkexport

# 如果修改了 exports 文件
sudo nfsd update
showmount -e

mount -t nfs 192.168.0.100:/share /mnt/nfsshare
umount 192.168.0.100:/share

# 关闭 nfs
sudo nfsd stop
sudo nfsd disable
```

* showmount
  * `-e` 显示本地共享
  * `-e <server-ip or hostname>` 显示远程共享
  * `-d` 例举所有子目录
* exportfs
  * `-v` 例举共享的文件和选项
  * `-a` 导出所有 `/etc/exports` 中的共享配置
  * `-u` 取消共享 `/etc/exports` 中的配置
  * `-r` 在修改 `/etc/exports` 后刷新服务共享列表

## Samba

* [Samba3 by Example](https://www.samba.org/samba/docs/Samba3-ByExample.pdf)
* [Samba3 How to](https://www.samba.org/samba/docs/Samba3-HOWTO.pdf)

### Tips
* 添加的用户名必须要先存在于系统中,即需要先 `useradd`
* 禁用打印机服务
```ini
load printers = no
printing = bsd
printcap name = /dev/null
```
* 允许访客登陆
  * `guest ok = yes`
  * `smbclient  //127.0.0.1/public -U guest`
* smb.conf
  * [Using samba ch06](https://www.samba.org/samba/docs/using_samba/ch06.html)
  * [man smb.conf](https://www.samba.org/samba/docs/man/manpages/smb.conf.5.html)
* 默认端口
  * TCP: 139, 445
  * UDP: 137, 138
### Quick start

```bash
# Debian: apt-get install samba samba-client

mkdir -p ~/temp/share && cd $_
mkdir public
# 新建用户, 密码不需要和系统密码相同
sudo smbpasswd -L -a wener
cat <<CONF > smbd.ini
[global]
log file = $PWD/smbd.log
idmap config * : backend = tdb

[public]
comment = Public share
path = $PWD/public
valid users = wener
read only = No
CONF
# 检测配置正确
testparm smbd.ini

# 启动服务
sudo smbd -s smbd.ini

# 例举所有共享
smbclient  -L //127.0.0.1/public -U wener
# 连接
smbclient  //127.0.0.1/public -U wener
# Linux: smb://<HOST_IP_OR_NAME>/<folder_name>/
# Windows: \\<HOST_IP_OR_NAME>\<folder_name>\

# 挂载 smb, 修改密码为之前输入的密码
mount -t smbfs //wener:wener@localhost/public ~/mnt/smb/
mount –t smbfs //localhost/public ~/mnt/smb/ –o username=wener
```


## FTP

* [pure-ftpd](http://www.pureftpd.org/project/pure-ftpd)/[WIKI](https://en.wikipedia.org/wiki/Pure-FTPd)
  * Pure-FTPd 非常简单的 FTP 服务, 只需要 `pure-ftpd &` 即可.
* [vsftpd](https://security.appspot.com/vsftpd.html)/[WIKI](https://en.wikipedia.org/wiki/Vsftpd)
  * 相对较为安全并且迅速稳定.
* [ProFTPD](http://www.proftpd.org/)/[WIKI](https://en.wikipedia.org/wiki/ProFTPD)
  * 有较多的特性

### OS X
```bash
# 自带的 FTP 文件共享
sudo -s launchctl load -w /System/Library/LaunchDaemons/ftp.plist
ftp localhost
sftp localhost
# 关闭 FTP 服务
sudo -s launchctl unload -w /System/Library/LaunchDaemons/ftp.plist
```

### Pure-FTPd
```bash
# Create a group for Pure-FTPD.
# OS X http://serverfault.com/questions/20702
groupadd ftpgroup
# Add a user to the group (revoke the home directory and deny acces to shell login).
useradd -g ftpgroup -d /dev/null -s /etc ftpuser


# Create a directory for your ftp-files (you can also specify a specific user e.g.: /root/ftphome/bob).
mkdir /root/ftphome

# Create a ftp-user, in our example "bob" (again you can set "-d /root/ftphome/bob/" if you wish).
pure-pw useradd bob -u ftpuser -g ftpgroup -d /root/ftphome/


# Update the ftp database after adding our new user.
pure-pw mkdb

# This is optional, you can list the users in the database, and enumerate spesific users...
pure-pw list
pure-pw show bob

# We set symbolic links for some files.
ln -s /etc/pure-ftpd/pureftpd.passwd /etc/pureftpd.passwd
ln -s /etc/pure-ftpd/pureftpd.pdb /etc/pureftpd.pdb
ln -s /etc/pure-ftpd/conf/PureDB /etc/pure-ftpd/auth/PureDB

# The specified ftp directory (and all it's sub-direcotries) needs to be owned by "ftpuser".
chown -R ftpuser:ftpgroup /root/ftphome
# Finally we restart Pure-FTPD. You should now be able to log in with your created user account.
pure-ftpd restart
```




## Share
* [ProjectSend](https://github.com/ignacionelson/ProjectSend)
  * Star < 100
* [SparkleShare](https://github.com/hbons/SparkleShare)
  * C#
  * Star 3k
* [Syncany](https://github.com/syncany/syncany)
  * Java
  * Star 1k
* [seafile](https://github.com/haiwen/seafile)
  * C++
  * Star 3k
* [ownCloud](https://github.com/owncloud/core)
  * PHP
  * Star 4k
## Syncany

```bash
brew install https://get.syncany.org/homebrew/syncany.rb
# http://syncany.readthedocs.org/en/latest/commands.html
sy init
sy status
sy down
sy up
```

## 参考

* [List of cryptographic file systems](https://en.wikipedia.org/wiki/List_of_cryptographic_file_systems)
* [Comparison of file system](https://en.wikipedia.org/wiki/Comparison_of_file_systems)
