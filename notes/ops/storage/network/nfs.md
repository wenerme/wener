---
title: NFS
---

# NFS

## Tips

- [nfs](http://linux-nfs.org/)
  - ArchLinux [NFS](https://wiki.archlinux.org/index.php/NFS)
- 参考
  - [NFS 性能调优](https://www.cyberciti.biz/faq/linux-unix-tuning-nfs-server-client-performance/)
- 组件
  - rpc.nfsd
  - rpc.idmapd
  - rpc.mountd - NFS mount daemon
    - -p 32767
  - rpc.statd - NSM service daemon
    - A daemon that listens for reboot notifications from other hosts, and manages the list of hosts to be notified when the local system reboots
    - -p 32765 -o 32766
    - 锁服务
    - 挂载可使用 nolock 指定不启用锁
    - sm-notify - A helper program that notifies NFS peers after the local system reboots
  - rpc.gssd - gss-api generic security api to provide security for protocols using rpc
  - rpc.svcgssd
  - rpc.rquotad - remote quota server

:::caution

- 避免 NAT 使用 nfs - 部分服务可能有问题，例如 statd

:::

```bash
apk add nfs-utils
# 启动
service nfs start
# 开机启动
rc-update add nfs
# 导出所有定义的共享
# 将 /etc/exports 定义输出到 /var/lib/nfs/etab
exportfs -a
# 取消所有共享 - 清除 /var/lib/nfs/etab
exportfs -au

# 查看服务提供的共享
showmount -e localhost

# NFSv4 可以挂在根目录
mount server:/ /mountpoint/on/client
# 挂载单个目录
mount -t nfs -o vers=4 servername:/srv/nfs/music /mountpoint/on/client
# fstab
# servername:/music   /mountpoint/on/client   nfs   defaults,timeo=900,retrans=5,_netdev	0 0

```

| 配置文件           | 说明               | 内容示例                                                                               |
| ------------------ | ------------------ | -------------------------------------------------------------------------------------- |
| /etc/exports       | 对外暴露的文件     | `/usr/local 192.168.0.1(ro) 192.168.0.2(ro)`<br/>`/home 192.168.0.0/255.255.255.0(rw)` |
| /etc/hosts.allow   | 允许访问的主机     | `portmap:ALL`                                                                          |
| /etc/hosts.deny    | 禁止访问的主机     | `lockd: 192.168.0.1 , 192.168.0.2`                                                     |
| /var/lib/nfs/etab  | 导出的主表         |
| /var/lib/nfs/rmtab | 访问服务端的客户端 |

## exports
* https://linux.die.net/man/5/exports

# FAQ

## Neither 'subtree_check' or 'no_subtree_check' specified for export
* 不影响，只是警告默认为了 `no_subtree_check`，之前是 `subtree_check`

```
/data0    *(rw,no_root_squash,no_subtree_check)
```

## mount.nfs: rpc.statd is not running but is required for remote locking. mount.nfs: Either use '-o nolock' to keep locks local, or start statd

* 当客户端在 NAT 后时可能会有这个问题 - 因为端口从新映射后不会是保留端口
* exports 添加 `insecure` 选项即可
  * 默认开启了 secure，要求端口 小于 1024 IPPORT_RESERVED

```
mount.nfs: rpc.statd is not running but is required for remote locking.
mount.nfs: Either use '-o nolock' to keep locks local, or start statd.
mount.nfs: Operation not permitted
```
