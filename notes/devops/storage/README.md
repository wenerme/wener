---
title: Storage
---

# Storage
## Tips
* [restic/restic](https://github.com/restic/restic)
  * [restic](https://restic.github.io/)
  * Fast, secure, efficient backup program
* [Rclone](https://rclone.org/)
  * [ncw/rclone](https://github.com/ncw/rclone)
  * Rclone is a command line program to sync files and directories to and from
* [Mountain Duck](https://mountainduck.io/)
  * mount server and cloud storage as a local disk
  * [comparison](https://mountainduck.io/comparison/)
* [Cyberduck](https://cyberduck.io/)
  * [iterate-ch/cyberduck](https://github.com/iterate-ch/cyberduck)
  * Cyberduck is a libre FTP, SFTP, WebDAV, Amazon S3, OpenStack Swift, Backblaze B2, Microsoft Azure & OneDrive, Google Drive and Dropbox browser for Mac and Windows.
* [Cryptomator](https://cryptomator.org/)
  * [cryptomator/cryptomator](https://github.com/cryptomator/cryptomator)
  * Free client-side encryption for your cloud files. Open source software: No backdoors, no registration.
  * Transparent encryption
  * Files get encrypted individually
  * [cryptomator/cryptofs](https://github.com/cryptomator/cryptofs)
    * Java Filesystem Provider with integrated encryption
* Java
  * [lookfirst/sardine](https://github.com/lookfirst/sardine)
    * an easy to use webdav client for java
  * [dCache/nfs4j](https://github.com/dCache/nfs4j)
    * Pure Java NFSv3 and NFSv4.1 implementation
  * [ssh, scp and sftp for java](https://github.com/hierynomus/sshj)
* Golang
  * [spf13/afero](https://github.com/spf13/afero)
* S3
  * [s3fs-fuse/s3fs-fuse](https://github.com/s3fs-fuse/s3fs-fuse)
    * 限制
      * 随机写或 append 会重写整个文件
      * list 整个目录的性能较差, 取决于网络延迟
      * 最终一致性可能会导致读取过期数据
      * 重命名不是原子性的
      * 多个端挂载不会进行协调
      * 不支持硬连接
  * [kahing/goofys](https://github.com/kahing/goofys)
    * Goofys is a high-performance, POSIX-ish Amazon S3 file system written in Go
* B2 Cloud Storage
  * [Pricing](https://www.backblaze.com/b2/cloud-storage-pricing.html)
  * 非常便宜的云存储
  * 存储 0.005$/GB/Month
  * 下载 0.02$/GB
* FS
  * [kahing/catfs](https://github.com/kahing/catfs)
    * Catfs is a caching filesystem written in Rust
* [Optimize Storage Efficiency](https://www.snia.org/sites/default/files/SDC/2016/presentations/erasure_coding/DrorGoldenberg_Optimize_Storage_Efficiency-v2.pdf)
* 不能使用的文件名
  * Windows `\/:*?"<>|`
  * Linux, macOS `null` 或 `/`


```bash
brew install s3fs

brew install goofys

export AWS_ACCESS_KEY_ID=${ID}
export AWS_SECRET_ACCESS_KEY=${KEY}
# goofys <bucket> <mountpoint>
# goofys <bucket:prefix> <mountpoint>
```

```bash
find dir/ -name "offender1" -mtime -1 -print0 | du --files0-from=- -hc | tail -n1
```

## Transfer

```bash
# 两个服务器之间传输大量小文件时非常快
# 觉得 gzip 慢可以使用 pigz
tar c some/dir/ | gzip - | ssh host2 tar xz -C /other/dir/
# 全量同步后再进行增量同步
rsync -azv some/dir/ user@host:/other/dir/

```

## Disk
* [Disk cloning](https://en.wikipedia.org/wiki/Disk_cloning)

```bash
#
lsblk --output NAME,SIZE,VENDOR,FSTYPE,LABEL,UUID,MODE

# 克隆单个磁盘
dd if=/dev/sda1 of=/dev/sdb1 bs=64K conv=noerror,sync status=progress
# 克隆整个磁盘
dd if=/dev/sdX of=/dev/sdY bs=64K conv=noerror,sync status=progress

# 备份
# 备份整个系统
rsync -aAXv --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found"} / /path/to/backup/folder
# 使用 --info=progress2 显示总体的进度, 而不是每个文件
rsync -aAX --info=progress2 --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found"} / /path/to/backup/folder

# 备份启动分区
# https://wiki.archlinux.org/index.php/disk_cloning
dd if=/dev/sda1 of=/mnt/dst/bios-boot bs=64K conv=noerror,sync status=progress

# 备份分区
sfdisk -d /dev/sda > part_table
# 恢复分区
sfdisk /dev/sda < part_table
# wipefs 也可以
```
