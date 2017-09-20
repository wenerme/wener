# FUSE

* Golang
  * [bazil/fuse](https://github.com/bazil/fuse)

## Tips

```bash
# 挂载 loop
losetup -P /dev/loop2 harddrive.img
```

## encfs

* https://github.com/vgough/encfs
* https://github.com/vgough/encfs/blob/master/encfs/encfs.pod

### Tips

```bash
# For single file
openssl des3 -salt -in unencrypted-data.file -out encrypted-data.file.des3
openssl des3 -d -salt -in encrypted-data.file.des3 -out unencrypted-data.file

# For a fs
# 第一次启动需要配置
encfs -v -f ~/.crypt ~/mnt/crypt

# 配合 zip fs 使用
touch empty
zip encfs.zip empty
archivemount encfs.zip ~/mnt/zip
# 操作写后
# 此时才会想数据写回 zip
umount ~/mnt/zip

# 配合单文件挂载
dd if=/dev/zero of=image.img iflag=fullblock bs=1M count=100 && sync

# 查看所有的 loop fs
losetup
# 挂载
sudo losetup loop1 image.img
# losetup -d /dev/loop1

# macOS
hdiutil attach -nomount image.img
diskutil list
# umount /dev/disk2
# hdiutil detach disk2

# 格式化分区
mkfs

# 或者 mac 下
# newfs_msdos disk3
# 或者
# diskutil eraseDisk JHFS+ VolumeName /dev/disk2
# mount -t msdos /dev/disk3 ~/mnt/file/

# 或者事先格式化 brew install hfsutils
# hformat -l File image.img
# mount -t hfs -o loop image.img /mnt/file



```

## zip
* [avfs](http://avf.sourceforge.net/)
* [fuse-zip](https://bitbucket.org/agalanin/fuse-zip/)
* [archivemount](http://www.cybernoia.de/software/archivemount/)


```bash
# 只读挂载
fuse-zip -r archivetest.zip ~/mnt/zip
archivemount -o readonly archivetest.zip  /mnt
```
