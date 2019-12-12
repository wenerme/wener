---
id: tinc-multi-path-failover
title: 如何配置 TINC 实现多路容灾？
date: 2019-12-08
---

## 场景

<!--
@startdot
digraph G {
node[shape=box,style=filled,color=transparent]
graph [splines=ortho, nodesep=1]

subgraph cluster_a {
  host_a[label=<A主机<br/>公网 192.0.0.1>,fillcolor="#BBDEFB",color=transparent]
  host_b[label=<B主机<br/>公网 192.0.0.2>,fillcolor="#BBDEFB",color=transparent]

  {rank=same; host_a host_b}
  host_a -> host_b [style=invis]

  label="服务商 A"
}

subgraph cluster_b {
  host_c[label=<C主机<br/>公网 192.1.0.2>,fillcolor="#C8E6C9"]
  label="服务商 B"
}


subgraph cluster_c {
  home[label=<电脑/手机>,fillcolor="#FFF9C4"]
  relay[label=<中继节点<br/><font point-size="10">例如 家里路由/WiFi</font><br/>TINC 10.0.0.2/32>,fillcolor="#FFF9C4"]

  label="家庭网/局域网"
  labelloc=b
}

tincnet[label=<TINC接入点<br/>公网 192.0.0.3<br/>TINC地址 10.0.0.1/24>,fillcolor="#FFCDD2"]

host_a, host_b, host_c -> relay
relay -> home

}
@enddot
-->

![网络结构](https://www.plantuml.com/plantuml/svg/ZPDFJzH06CRl_HIJUYrsMuXnmxQ1Tgdnuid4msP3fktWJfoTQJg34Ga9sGX641CIlAqX7j2Bg1nKXEYdsTcktyBfFuYm9AP9_yxx_9xtwJiBNC1Kn4neCNwSmgG7xe5rZR8OTNWF9iW9sJE3YpM2d1LC28gDY16MEYA5b2SmHLHqjRAmmnE2AU8EIqMF6I0NuIXnhAwcyTMmN1IHLIvGkWmL1O0Uus8PTWWC4N5QYwFJy_7mh1McfYktFcM_ze7Lj6ytr66vHeulsVejpsil1Pu-pKib6jQYtisYzd-BAjLrzVp4uR2FvYlR5MZZeWymurRlL1P5P9W-nRmeBzteu-6Ut7altsw3HLtRc99BU9bBLBVWJs_1kjw2VtVfZj_KkzE0NW6yJemgOX_LlEpWs-J5lZb-jQke_mA286ZwSmKWHGIkrIMZq-Fi_EDaPv0DVXO-MokC2f0mJCKCny-HeriDtHtztfKV1a1-_lxdvUl9Zo_PmOdv20UuPURBtQBouVq7Fh0QvHyoP-qR35osgDJasR5AnPGdc_BmKDtfzLV28YVC-nQOHXI9scyE6Ryvabj7jU4hip5xuKKElyftcxKZoxJdhZhossqxTrHEWL7DG7MDygaeijAASpaaVQGfLmk8nchh_GK0)

* 现有 3 台服务器提供相同的服务，希望使用同一个 IP 进行访问
  * 即为 A B C 主机提供 VIP/虚拟 IP
* 需要支持 2层 转发 - 网桥、网关
  * 如果不需要 2层 或者不需要任意端口 也可以考虑 Nginx/HAProxy 等进行转发 - 对端口进行负载容灾
  * 使用 mac 寻址
* 一个节点异常后能够快速切换到其它节点
* __不__ 需要负载均衡 - 多路不会进行负载

## 原理

* Tinc 支持两种工作模式 - Route 和 Switch - 分别工作在 3 层和 2 层 - 默认使用 Route 3 层，需要配置为 Switch 模式工作在 2 层
* 使用 Switch 模式时每个节点会生成 mac 地址用于路由
* 访问 IP 时会通过 arp 将 IP 转换为 mac 地址
* 在多个节点上配置相同的 IP，即可以做到多路容灾

## 部署
> 💡提示
>
> TINC 的基础部署概念在这里不再赘述，请参考 [如何部署 TINC 网络](https://wener.me/notes/howto/network/tinc-get-started)。

### Docker 部署验证
* 操作流程
  1. 创建 Docker 网络 - 以使用静态 IP
    * 容器网络 - 172.18.3.0/24 
  1. 创建 5 个容器
      * node-1 网络主节点
        * mynet TINC 网络 - 10.1.1.1/24
        * 静态 IP - 172.18.3.100
      * node-2-4 服务节点
        * 服务提供统一的 VIP - 10.1.1.10
        * 每个节点直接访问 IP - 10.1.1.102-104
      * node-5 客户端节点
        * 节点 IP - 10.1.1.2
        * 通过 VIP 访问服务
  1. 初始化 Switch 模式的 Tinc 网络
  1. 从节点加入
  1. 验证访问
  1. 验证服务容灾能力


#### 环境初始化

> 💡提示
>
> 实际部署与 Docker 操作没有任何区别，只需要注意配置接入点的 Address


```bash
# 网络初始化
docker network create service --subnet 172.18.3.0/24

# 容器初始化 - 如果需要持久化 tinc 配置可以映射 /etc/tinc/mynet 目录
# node-1 节点使用静态 ip
docker run -d --network tinc --ip 172.18.0.100 --cap-add NET_ADMIN --device /dev/net/tun --name node-1 wener/tinc tail -f /dev/null
# node 2 3 4 5 节点初始化
seq 2 5 | xargs -I {} -n 1 docker run -d --network tinc --cap-add NET_ADMIN --device /dev/net/tun --name node-{} wener/tinc tail -f /dev/null
```

#### 网络初始化

```bash
# 在 node-1 配置 tinc 网络
cat <<'EOF' | docker exec -i node-1 sh
set -x
# 网络名为 mynet
tinc -n mynet init mynet
# 配置 Switch 模式
echo Mode=Switch >> /etc/tinc/mynet/tinc.conf

# 配置 TINC 地址
echo -e '#!/bin/sh\nifconfig $INTERFACE 10.1.1.1 netmask 255.255.255.0' > /etc/tinc/mynet/tinc-up

# 监听端口
echo Port=655 >> /etc/tinc/mynet/hosts/mynet
# 外部地址
echo Address=172.18.0.100 >> /etc/tinc/mynet/hosts/mynet
EOF

# 启动网络
docker exec node-1 tinc -n mynet start

# 节点加入 - node-1 邀请其它节点 - 生成 url 其它节点加入
for i in $(seq 2 5); 
do
  url=$(docker exec node-1 tinc -n mynet invite node_$i)
  docker exec node-$i tinc join $url
done

# 为 node 2 3 4 配置统一的 IP 10.1.1.10
seq 2 4 | xargs -I {} -n 1 docker exec node-{} sh -c "echo 'ifconfig \$INTERFACE 10.1.1.10 netmask 255.255.255.0' > /etc/tinc/mynet/tinc-up"

# 为 node 2 3 4 配置额外的管理 IP 10.1.1.102-104
seq 2 4 | xargs -I {} -n 1 docker exec node-{} sh -c "echo 'ip addr add 10.1.1.10{}/24 dev mynet' >> /etc/tinc/mynet/tinc-up"

# 为 node-5 配置 10.1.1.2
docker exec node-5 sh -c "echo 'ifconfig \$INTERFACE 10.1.1.2 netmask 255.255.255.0' > /etc/tinc/mynet/tinc-up"

# 启动所有节点
seq 2 5 | xargs -I {} -n 1 docker exec node-{} tinc -n mynet start

# 在主节点查看链接状态
# 所有节点都在
docker exec node-1 tinc -n mynet dump nodes
```

#### 高可用验证

```bash
# 一个会话一直 PING 服务 IP - 观察链接情况
# 注意是从 node-5 ping
docker exec -it node-5 ping 10.1.1.10

# 以下在 node-5 执行
docker exec node-5 sh

# 获取当前 10.1.1.10 对应的 mac
ip neigh show 10.1.1.10
# 获取 该 mac 对应的 tinc 节点
tinc -n mynet info $(ip neigh show 10.1.1.10 | egrep -o '..:\S+')
```

__在宿主机上停止当前节点__

```bash
# 将当前 10.1.1.10 的节点停止
node=$(docker exec node-5 sh -c "tinc -n mynet info \$(ip neigh show 10.1.1.10 | egrep -o '..:\S+') | grep -o node_. | grep -o '\d'")
docker stop node-$node
```

此时会观察到 10秒 左右的 PING 丢包，我看到的日志是这样的

```
64 bytes from 10.1.1.10: seq=411 ttl=64 time=0.617 ms
64 bytes from 10.1.1.10: seq=412 ttl=64 time=1.033 ms
64 bytes from 10.1.1.10: seq=420 ttl=64 time=4.084 ms
64 bytes from 10.1.1.10: seq=421 ttl=64 time=0.796 ms
```

然后再在 node-5 上确认当前新的节点

```bash
tinc -n mynet info $(ip neigh show 10.1.1.10 | egrep -o '..:\S+')
```

至此，完成验证。当然也可以继续停止当前节点然后观察，或者启动新的节点观察，总之 tinc 的行为符合预期，达到目的。


#### 销毁环境

```bash
# 停止容器
seq 1 5 | xargs -I {} -n 1 docker rm -f node-{}
# 删除网络
docker network rm service
```

### Ansible 部署

> 💡提示
> Ansible 执行基于 [wenerme/alpine-admin](https://github.com/wenerme/alpine-admin) 提供的任务


配置和仓库节点如下，按需更改 IP

__hosts.yaml__

```yaml
all:
  hosts:
    # 主节点
    mynet:
      ansible_host: 172.18.3.100
      tinc_address: 10.1.1.1
      tinc_conf:
      - {name: Mode, value: switch}
      tinc_host_conf:
      - {name: Port, value: 655}
      - {name: Address, value: 172.18.3.100}
    # 服务节点
    node-2: {ansible_host: 172.18.3.1, tinc_address: 10.1.1.10}
    node-3: {ansible_host: 172.18.3.2, tinc_address: 10.1.1.10}
    node-4: {ansible_host: 172.18.3.3, tinc_address: 10.1.1.10}
  children:
    tinc-nodes:
      hosts:
        node-[2:4]:
  vars:
    tinc_netname: mynet
    tinc_subnet: 10.1.1.0/24
    # 从节点使用随机端口避免检测
    tinc_host_conf:
      - {name: Port, value: 0}
```

使用 Ansible 部署

```bash
# 简化操作 - 使用 -i hosts.yaml 指定了仓库
adhoc(){ local task=$1; shift; ansible-playbook $PWD/adhoc.yaml -e task=$task -i hosts.yaml $*; }

# 为所有节点配置仓库 - https://github.com/wenerme/repository
# 因为目前官方仓库没有
adhoc wener-repo

# 安装 tinc
adhoc tinc-install

# 初始化网路
adhoc tinc-init -l mynet
# 启动服务
adhoc tinc-service -l mynet

# 加入 TINC 网络
adhoc tinc-join -l tinc-nodes
# 启动服务
adhoc tinc-service -l tinc-nodes

# 查看主机信息 - 包含 tinc 网络
adhoc tinc-service -l host-info
```

完成部署。使用 ansible 能够快速部署大规模的 tinc 网络。
