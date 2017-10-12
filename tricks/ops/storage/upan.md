
## U Pan

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
