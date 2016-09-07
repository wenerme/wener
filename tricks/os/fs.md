
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

## 常用操作
```bash
# 可查看速度
pv /home/user/bigfile.iso | md5sum
# 8.25 后可查看进度
dd if=/dev/urandom of=/dev/null status=progress
# urandom 会限制速度,可以使用文件来测试
truncat -s 10G test.data
dd if=test.data of=/dev/null status=progress
# 似乎会更快
pv < /dev/sda > /dev/sdb
# 使用 PV 监控速度
dd if=/dev/urandom | pv | dd of=/dev/null
# 简单一点
pv bigfile.iso | dd of=VirtualDisk.raw
# 在 DD 执行以后也可以查看进度
kill -USR1 $(pgrep ^dd)
watch -n5 'kill -USR1 $(pgrep ^dd)'
# 在 BSD/MAC 下需要 INFO
kill -INFO $(pgrep ^dd$)
# 同上简单一点
pkill -usr1 dd

# 测试随机写IOPS
fio -direct=1 -iodepth=128 -rw=randwrite -ioengine=libaio -bs=4k -size=10G -numjobs=1 -runtime=1000 -group_reporting -name=/path/testfile
# 测试随机读IOPS
fio -direct=1 -iodepth=128 -rw=randread -ioengine=libaio -bs=4k -size=10G -numjobs=1 -runtime=1000 -group_reporting -name=/path/testfile
# 测试写吞吐量
fio -direct=1 -iodepth=64 -rw=randwrite -ioengine=libaio -bs=64k -size=10G -numjobs=1 -runtime=1000 -group_reporting -name=/path/testfile
# 测试读吞吐量
fio -direct=1 -iodepth=64 -rw=randread -ioengine=libaio -bs=64k -size=10G -numjobs=1 -runtime=1000 -group_reporting -name=/path/testfile
```

## diskutil
```
Usage:  diskutil [quiet] <verb> <options>, where <verb> is as follows:

     list                  (List the partitions of a disk)
     info[rmation]         (Get information on a specific disk or partition)
     listFilesystems       (List file systems available for formatting)
     activity              (Continuous log of system-wide disk arbitration)

     u[n]mount             (Unmount a single volume)
     unmountDisk           (Unmount an entire disk (all volumes))
     eject                 (Eject a disk)
     mount                 (Mount a single volume)
     mountDisk             (Mount an entire disk (all mountable volumes))

     enableJournal         (Enable HFS+ journaling on a mounted HFS+ volume)
     disableJournal        (Disable HFS+ journaling on a mounted HFS+ volume)
     moveJournal           (Move the HFS+ journal onto another volume)
     enableOwnership       (Treat as exact User/Group IDs for a mounted volume)
     disableOwnership      (Ignore on-disk User/Group IDs for a mounted volume)

     rename[Volume]        (Rename a volume)

     verifyVolume          (Verify the file system data structures of a volume)
     repairVolume          (Repair the file system data structures of a volume)

     verifyDisk            (Verify the components of a partition map of a disk)
     repairDisk            (Repair the components of a partition map of a disk)

     eraseDisk             (Erase an existing disk, removing all volumes)
     eraseVolume           (Erase an existing volume)
     reformat              (Erase an existing volume with same name and type)
     eraseOptical          (Erase optical media (CD/RW, DVD/RW, etc.))
     zeroDisk              (Erase a disk, writing zeros to the media)
     randomDisk            (Erase a disk, writing random data to the media)
     secureErase           (Securely erase a disk or freespace on a volume)

     partitionDisk         ((re)Partition a disk, removing all volumes)
     resizeVolume          (Resize a volume, increasing or decreasing its size)
     splitPartition        (Split an existing partition into two or more)
     mergePartitions       (Combine two or more existing partitions into one)

     appleRAID <verb>      (Perform additional verbs related to AppleRAID)
     coreStorage <verb>    (Perform additional verbs related to CoreStorage)

diskutil <verb> with no options will provide help on that verb

```

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

## NFS
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

## Tools
当操作物理设备时,会涉及到很多常用的工具

dd
fdisk
gdisk


## FAQ
### disk vs rdisk on BSD
`man hdiutil`

> /dev/rdisk nodes are character-special devices, but are "raw" in the BSD sense and force block-aligned I/O. They are closer to the physical disk than the buffer cache. /dev/disk nodes, on the other hand, are buffered block-special devices and are used primarily by the kernel's filesystem code.

即 rdisk 几乎是直接访问物理设备,disk 还会经过系统缓存.在能使用 rdisk 时不使用 disk.

http://superuser.com/questions/631592

### MBR vs GPT

VS|MBR | GPT
----|----|----
分区数| 4 | N/A



## 参考

* [List of cryptographic file systems](https://en.wikipedia.org/wiki/List_of_cryptographic_file_systems)
* [Comparison of file system](https://en.wikipedia.org/wiki/Comparison_of_file_systems)
