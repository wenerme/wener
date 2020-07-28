# Alpine local backup

* apkvol
* lbu - [Alpine local backup](https://wiki.alpinelinux.org/wiki/Alpine_local_backup)
  * 默认只关心 /etc 下内容，不包含 `/etc/init.d`
  * 相当于把所有 /etc 下的内容进行备份或恢复
  * 安装所需包


```bash
# 制作 rootfs.apkvol
curl -LO https://mirrors.aliyun.com/alpine/v3.12/releases/x86_64/alpine-minirootfs-3.12.0-x86_64.tar.gz
mkdir -p rootfs
tar zxf alpine-minirootfs-3.12.0-x86_64.tar.gz -C rootfs

cp /etc/apk/repositories rootfs/etc/apk/
# 可选 - chroot 后可 apk add
# echo nameserver 114.114.114.114 > rootfs/etc/resolv.conf
apk --root rootfs add alpine-conf

# 获取到 rootfs.apkvol
chroot rootfs/ lbu pkg rootfs.apkvol.tar.gz
mv rootfs/rootfs.apkvol.tar.gz .
```
