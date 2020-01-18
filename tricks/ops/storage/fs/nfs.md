---
id: nfs
title: NFS
---

# NFS
## Tips
* 允许本地访问远程文件
* 使用 C/S 结构在 \*nix 之间分享文件
* 两个机器之间不需要允许相同的操作系统
* 可使用 NSF 指定中心存储解决方案
* 用户不需要关系文件的物理位置
* 不需要手动刷新来显示文件
* 新版本的 NFS 也支持 ACL
* 可用过防火墙和 Kerberos 来保证安全
* 默认 2049 端口
* 使用 Kerberos 可使用密码进行验证
* showmount
  * `-e` 显示本地共享
  * `-e <server-ip or hostname>` 显示远程共享
  * `-d` 例举所有子目录
* exportfs
  * `-v` 例举共享的文件和选项
  * `-a` 导出所有 `/etc/exports` 中的共享配置
  * `-u` 取消共享 `/etc/exports` 中的配置
  * `-r` 在修改 `/etc/exports` 后刷新服务共享列表
* AlpineLinux [Setting up a nfs-server](https://wiki.alpinelinux.org/wiki/Setting_up_a_nfs-server)
* [/etc/exports](https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/5/html/Deployment_Guide/s1-nfs-server-config-exports.html)
* http://kodi.wiki/view/NFS
* ArchLinux [NFS](https://wiki.archlinux.org/index.php/NFS)/[简体中文](https://wiki.archlinux.org/index.php/NFS_(简体中文))
* NFS 本身没有授权访问机制, 基本只能限制 IP, 和 Kerberos 配合是可以的
* https://help.ubuntu.com/community/NFSv4Howto
* cifs 相比 NFS 有授权
* [SMB vs NFS authentication](https://serverfault.com/q/597254/190601)
* NFS 如果感觉有问题，可以尝试使用 v3 版本 `-o v3`

```bash
# 安装
apk add nfs-utils
# 开机前启动服务
rc-update add nfs
rc-update add nfsmount
# 立即启动服务
rc-service nfs start
rc-service nfsmount start

# 共享该目录
sudo mkdir -p /share
# 赋予当前用户共享目录权限
sudo chown $USER /share


# Linux
# ========
echo '/nfsshare 192.168.0.101(rw,sync,no_root_squash)' | sudo tee /etc/exports



# 如果想让客户端非 root 访问服务端 root 信息, 则可以
# all_squash,anonuid=0,anongid=0
# 使所有用户都作为匿名用户,而匿名用户则默认为 root
# 也可以指定为特定的用户,例如 id asterisk

# macOS
# ==========
echo '/share -network 192.168.0.0 -mask 255.255.0.0' | sudo tee /etc/exports
nfsd enable
nfsd start
nfsd status
nfsd checkexport

# 如果修改了 exports 文件
nfsd update
showmount -e
# 查看共享目录
showmount -e 192.168.34.120

mount -t nfs 192.168.0.100:/share /mnt/nfsshare
umount 192.168.0.100:/share

# 关闭 nfs
nfsd stop
nfsd disable

# 如果 mac 下 mount 出现 Operation not permitted, 则添加 -o resvport
mount -t nfs -o resvport 192.168.1.1:/ ~/mnt/alpine/
```

mount.nfs: access denied by server while mounting
-o v3

https://www.ibm.com/support/knowledgecenter/zh/ST5Q4U_1.5.0/com.ibm.storwize.v7000.unified.150.doc/adm_MacOSX_limitations.html


nfsstat -m

nfs://vers=4,10.0.10.26/srv

## nfs-utils
* /proc/fs/nfsd
* /proc/fs/nfs
* /etc/exports
  * 共享目录定义
* /usr/sbin/exportfs
  * 管理共享的目录 - `/var/lib/nfs/etab`
  * `-a` 导出所有 - 将 `/etc/exports` 同步到 `/var/lib/nfs/etab` - 更新内核的导出表
  * `-u` 移除一个导出 `-au` 移除所有导出
  * `-f` 移除所有
* /sbin/rpc.statd
  * 从其它主机监听重启通知
  * 当本地系统重启，管理被通知的主机列表
* /usr/sbin/sm-notify
  * 发送重启通知到 NFS 端
* /sbin/mount.nfs
* /sbin/umount.nfs
* /sbin/umount.nfs4
* /sbin/mount.nfs4
* /usr/sbin/showmount
  * 查看挂载信息

/sbin/nfsdcld
/sbin/nfsdcltrack	nfs-utils	edge	main	x86_64

/usr/sbin/showmount	nfs-utils	edge	main	x86_64
/usr/sbin/rpc.nfsd	nfs-utils	edge	main	x86_64
/usr/sbin/nfsidmap	nfs-utils	edge	main	x86_64
/usr/sbin/start-statd	nfs-utils	edge	main	x86_64
/usr/sbin/mountstats	nfs-utils	edge	main	x86_64
/usr/sbin/rpc.svcgssd	nfs-utils	edge	main	x86_64
/usr/sbin/blkmapd	nfs-utils	edge	main	x86_64
/usr/sbin/nfsiostat	nfs-utils	edge	main	x86_64
/usr/sbin/rpc.idmapd	nfs-utils	edge	main	x86_64
/usr/sbin/rpc.gssd	nfs-utils	edge	main	x86_64
/usr/sbin/nfsstat	nfs-utils	edge	main	x86_64
/usr/sbin/rpc.mountd	nfs-utils	edge	main	x86_64
nfs-utils	edge	main	x86_64
/usr/sbin/rpcdebug	nfs-utils	edge	main	x86_64

/usr/sbin/nfsconf	nfs-utils	edge	main	x86_64
/var/lib/nfs/rmtab	nfs-utils	edge	main	x86_64
/var/lib/nfs/etab	nfs-utils	edge	main	x86_64
/var/lib/nfs/state



## CacheFS


How can I cache NFS shares on a local disk?
https://askubuntu.com/a/4578/267103


FS-Cache & CacheFS: Caching for Network File Systems
http://www.linux-mag.com/id/7378/

https://en.wikipedia.org/wiki/CacheFS
https://pkgs.alpinelinux.org/package/v3.7/community/x86_64/cachefilesd


CacheFiles /var/fscache
CacheFS block 级别

FS-Cache 接口

netfs nfs,afs,isofs

/proc/fs/fscache/stats

/proc/fs/fscache/histogram

https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree/Documentation/filesystems/caching/netfs-api.txt

https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree/Documentation/filesystems/caching/fscache.txt

## Ports

```
program vers proto   port
 100000    2   tcp    111  portmapper,rpcbind
 100000    2   udp    111  portmapper
 100005    1   udp    950  mountd
 100005    3   udp    950  mountd
 100005    1   tcp    884  mountd
 100005    3   tcp    884  mountd
 100003    2   udp   2049  nfs
 100003    3   udp   2049  nfs
 100003    2   tcp   2049  nfs
 100003    3   tcp   2049  nfs
 100024    1   udp    644  status
 100024    1   tcp    918  status
 100021    0   udp    630  nlockmgr
 100021    1   udp    630  nlockmgr
 100021    3   udp    630  nlockmgr
 100021    4   udp    630  nlockmgr
 100021    0   tcp    917  nlockmgr
 100021    1   tcp    917  nlockmgr
 100021    3   tcp    917  nlockmgr
 100021    4   tcp    917  nlockmgr
```
