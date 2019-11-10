
# NFS
## Tips
* [nfs](http://linux-nfs.org/)
  * ArchLinux [NFS](https://wiki.archlinux.org/index.php/NFS)
* 参考
  * [NFS性能调优](https://www.cyberciti.biz/faq/linux-unix-tuning-nfs-server-client-performance/)


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

配置文件 | 说明 | 内容示例
----|----|----
/etc/exports      | 对外暴露的文件 | `/usr/local 192.168.0.1(ro) 192.168.0.2(ro)`<br/>`/home 192.168.0.0/255.255.255.0(rw)`
/etc/hosts.allow  | 允许访问的主机 | `portmap:ALL`
/etc/hosts.deny   | 禁止访问的主机 | `lockd: 192.168.0.1 , 192.168.0.2`
/var/lib/nfs/etab | 导出的主表
/var/lib/nfs/rmtab | 访问服务端的客户端
