---
title: Alpine local backup
---

# Alpine local backup

- lbu - [Alpine local backup](https://wiki.alpinelinux.org/wiki/Alpine_local_backup)
- apkvol.tar.gz

:::tip

- diskless 安装必备 - commit 修改到外部 media
- 默认只关心 /etc 下内容，不包含 `/etc/init.d`
  - 相当于把所有 /etc 下的内容进行备份或恢复
- `apk fix` 会安装所需包

:::

:::caution

- 不要恢复到不同 boot 的系统
  - 例如不要将 extlinux 的配置恢复到 grub 系统
  - 如果需要，注意备份或恢复的时候排除相关文件
- 注意添加自定义的 initd 脚本 - symlink 默认会复制
- 系统恢复注意 修改 rootfs UUID 后再重启
  - `/etc/update-extlinux.conf`
    - 修改或删除 root
    - 默认 `blkid -o export /dev/root`
  - `/etc/fstab`
    - 修改 UUID
  - 重新 mkinitfs 或 修改 `/boot/extlinux.conf`
  - 错误可能导致 rootfs 只读
    - `sudo mount -o remount,rw /dev/vda2 /`

:::

| abbr.     | command     | desc                                                                    |
| --------- | ----------- | ----------------------------------------------------------------------- |
| ci        | commit      |
| pkg       | package     |
| st        | status      | 对比上次 commit                                                         |
| ls        | list        | 变化列表 - 类似 `lbu status -a`, 与 `lbu package -v /dev/null` 输出相同 |
|           | diff        |
| inc,add   | include     | 修改 `/etc/apk/protected_paths.d/lbu.list`                              |
| ex,delete | exclude     |
| lb        | list-backup |
|           | revert      | **不会修改系统** - 修改当前活跃的 apkvol，下次启动时加载                |

```bash
# 默认推荐配置
sudo mkdir /root/config-backups/
sudo lbu pkg /root/config-backups/

lbu st -a # 当前系统修改

mkdir backups      # 准备备份目录
lbu pkg -v backups # 备份
ls backups         # 生成 <hostname>.apkovl.tar.gz

# 备份到本地
mkdir /root/lbu-backups
sed -ri "s@^(#\s*)?LBU_BACKUPDIR=.*@LBU_BACKUPDIR=/root/lbu-backups@" /etc/lbu/lbu.conf
lbu ci               # commit
ls /root/lbu-backups # <hostname>.apkovl.tar.gz
lbu st               # 已经没有变化

lbu ci
ls /root/lbu-backups # 旧的变成 <hostname>.<YYYYMMDDHHmmSS>.apkovl.tar.gz
lbu lb               # 会显示 <hostname>.<YYYYMMDDHHmmSS>.apkovl.tar.gz

# 判断是否有修改
[ $(lbu st | wc -c) = 0 ] && echo No change || lbu ci -v

# 远程备份
ssh root@server "lbu package -" > server.apkovl.tar.gz
ssh admin@server "sudo lbu package -" > server.apkovl.tar.gz
# 恢复
cat server.aplovl.tar.gz | ssh admin@server 'sudo tar -C / --numeric-owner -zxvf - > /tmp/ovlfiles'

# diff
tar df os.apkvol.tar.gz -C / # 汇报修改
```

## lbu.conf

- /etc/lbu/lbu.conf
- /etc/lbu/pre-package.d
- /etc/lbu/post-package.d
- /etc/apk/protected_paths.d/lbu.list
  - `+var/lib/tailscale` - inlcude - 增加备份文件
  - `-etc/ssh/sshd_host*` - exclude - 排除备份文件

```conf title="lbu.conf"
# -e
DEFAULT_CIPHER=aes-256-cbc

# 开启加密
# ENCRYPTION=$DEFAULT_CIPHER

# 存储的外部媒体设备
# 也可以设置为 floppy
# LBU_MEDIA=usb

# 存储到本地目录而不是外部 媒体
# LBU_BACKUPDIR=/root/config-backups

# 最多存储多少备份
# BACKUP_LIMIT=3
```

**推荐**

```pre /etc/apk/protected_paths.d/lbu.list
home/admin/.ssh
root/.ssh
```

**MISC**

```pre /etc/apk/protected_paths.d/lbu.list
+var/lib/tailscale/
-etc/ssh/ssh_host*
# /etc/init.d/tincd.netname
```

## rootfs.apkvol

```bash
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

## restore from apkvol

```bash
tar -C / --numeric-owner -zxvf os.apkvol.tar.gz > /tmp/ovlfiles

apk fix                   # /etc/apk/world
hostname -F /etc/hostname # /etc/hostname
service modules restart   # /etc/modules-load.d
service sysctl restart    # /etc/sysctl.d
service sshd reload       # /etc/ssh/sshd_config

grep etc/tinc/ /tmp/ovlfiles > /dev/null && service tincd restart
grep etc/sockd.conf /tmp/ovlfiles > /dev/null && service sockd restart

# service xyz start       # start needed services
```

## exclude boot

```
-etc/default/grub
-etc/fstab
-etc/mkinitfs/mkinitfs.conf
```

- 不同的 boot 需要不同的包
  - grub-efi
  - extlinux
