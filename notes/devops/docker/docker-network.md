---
id: docker-network
title: Docker 网络
---

# Docker Network

* 注意
  * 创建的网络内部都会启动 DHCP 无法使用外部 DHCP
    * [Experimental Docker Libnetwork DHCP Driver](https://gist.github.com/nerdalert/3d2b891d41e0fa8d688c)
  * 使用外部 DHCP 需要实现 IPAM - 目前版本没有 DHCP 的 IPAM
  * 如果想要创建 interface 则需要 NET_ADMIN 然后映射设备 - 例如 /dev/net/tun
* 网络模式
  * host - 使用主机网络
  * macvlan - 使用主机的一张网卡做 macvlan
    * 不需要额外的 bridge
    * 但主机与容器无法使用该网卡互通
  * bridge - 桥接 - 默认模式
  * overlay - 一般用于跨主机网络
  * none - 不需要网络
* IPAM
  * 目前内建的 IPAM 驱动 [docker/libnetwork/ipams](https://github.com/docker/libnetwork/tree/master/ipams)
    * default - 默认按顺序获取 IP
    * null - 网络为 none 时使用
    * remote - 指定不存在的则会尝试作为 IPAM 插件进行初始化
* 参考
  * [Docker LibNetwork Plugins - Explorer’s Tale](https://pc.nanog.org/static/published/meetings/NANOG72/1552/20180219_Greenberg_Docker_Libnetwork_Drivers__v1.pdf)

```bash
# 不指定 subnet 则是从 172.17 继续往后增加
docker network create appnet -o 'com.docker.network.bridge.name=appnet'
# 添加 slave 网卡以便互通
# ip li set dev mynet master appnet

# 使用 eth1 作为上级 - 无法通过 eth1 互通 - 如果有 host 有两个网口则可以
# 可以与主机互通的容器网络，但会自行设置 ip 而不是使用 dhcp
docker network create -d macvlan --subnet=192.168.1.0/24 --gateway=192.168.1.1 -o parent=eth1 appnet

# 查看容器监听
pid=$(docker inspect -f '{{.State.Pid}}' container_name_or_id)
sudo nsenter -t $pid -n netstat
```
