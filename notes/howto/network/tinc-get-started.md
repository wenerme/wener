---
id: tinc-get-started
title: 如何部署 TINC 网络？
date: 2019-12-08
---

## 场景

### 云上云下网络互通
* 本地直接访问云上环境，云上能直接访问本地机房资源

### 本地网络穿透到外网以提供服务
* 例如 阿里云上购买一个廉价的 ECS - 实际计算存储资源使用本地机房 - 通过网络穿透提供服务

<!--
@startdot
digraph G {
node[shape=box,style=filled,color=transparent]
graph [splines=ortho, nodesep=1]

client[label=<应用用户>,fillcolor="#BBDEFB"]

portal[label=<云服务器/ECS<br/><font point-size="12">有公网地址<br/>性能弱</font>>,fillcolor="#C8E6C9"]

local[label=<本地服务器<br/><font point-size="12">动态地址<br/>性能强</font>>,fillcolor="#FFF9C4"]

client -> portal -> local[label=<  80/443>]

label="TINC - 穿透网络提供服务"
}
@enddot
-->
![ServiceTunnel](https://www.plantuml.com/plantuml/svg/VP5FIyCm6CRl_HIXNZlgTCW6RHchgtZnehUnGxTchX2QaEJW7uIA23gGETX5h0TFJjX1Jy9q-cMMLB-5gSN9O0WzbF0ylz_x9bN6VSe3pBKWtAS-wO8jSAn5E80DrlK9j5lum63y446x4o840wED4QOsftx4Y4zXn9jQNcmmWi88CXjJtiK6o20C4hlOrBGs2bMoWVmMHBOb9iDqE5AVl7XnZ8oRG_MLMcspxjLqrI2AugFVncmoaCcLwDsBcv5PTtUj5ZKTguCZ3WWE8rvWuH6qzUAQxiZaKfoFq-b094_YBlv9olZXysmgtfujC-iuYrAtNDzmAvaKuVQVKoPZXPXh_r6AtaZ6fqjyawK-p_CgRacVNmieE21VD_jRc060ygfPAgqxAfmVwNlREoueWFJnuolkgpNJrqJshsVlj_cakdQYLM4KP4_w3G00)
## 站点对站点私有网络
* __Site to Site VPN / 多站点互通__
* 例如 公司有两个地址，希望两个地址的网络互通

<!--
@startdot
digraph G {
node[shape=box,style=filled,color=transparent]
graph [splines=ortho, nodesep=1, rankdir=LR]


site_a[label=<办公地点A<br/>192.168.1.0/24>,fillcolor="#BBDEFB"]
site_b[label=<办公地点B<br/>192.168.2.0/24>,fillcolor="#C8E6C9"]

site_a -> site_b[dir=both,label="    192.168.0.0/16    "]

label="TINC - 办公地点网络打通"
}
@enddot
-->
![SiteToSite](https://www.plantuml.com/plantuml/svg/RT31IiGm40RWUvuYr6kskorITc5JrjPL1F4WtagHn4GR34r9Sb144C63tiIRB3w11wyYFaujleK9hQ2mSnncllcPXR54MwOiOE9CawQ2k_0Ar8hnmbIauPYg2sJifUJuL4Z96JfHKcbiDQbDGpIlRGdwnS8qKjJSOALjfH3qYE4DZX1qm-TCQBn_M080ZB3yc1IIK2xnl7ruQUzUszLRT_k-DQTwd4QpE8oIQHY5at6ycI9_kByQR6JPzd8d2yeUeUkGx1yIhq7owJB9PmuPei1H2WVFfwJALgY70-ZgbveuAafynwyE0qTx1paSmRy1ki_7xcFrTV_qVVCSW6kmu3Lp7_u1)

### 傍路由
* 不管在哪里，只要联网就能管理网络
* 例如
  * IoT 场景 - 只要网络接入就能进行数据通信
  * 家庭网络 - 任何地方都能直接访问家里的 NAS

### 加密通信
* 所有的通道通信都是加密的
* 可以直接使用 HTTP 或者不安全的网络，且不用担心被外部攻击

## 简介
* 默认端口为 655
* Tinc 工作在用户空间 - 使用 tun/tap 设备
* Tinc 以 mesh 的形式进行工作
  * 尝试对每个节点都进行直接链接
  * 如果链接失败会通过节点进行中专
* Tinc 支持 Route 或 Switch 工作模式
  * 默认使用 Route
  * 分别工作在 3 层和 2 层
  * Switch 模式性能比 Route 性能差一点
* 单线程工作 - 性能受限于单核心 CPU 能力
  * 曾测试 1.8 GHz 1核 能做到 300M 的转发峰值
* Tinc 的通信默认都是 __加密__ 的
* CIA Hacking Tools Revealed 包含 TINC

## 部署
* 操作流程
  1. 初始化网络
  2. 配置主节点 - 设置访问 IP
  3. 邀请从节点
  4. 从节点加入
  5. 配置地址 - 设置 tinc 的地址

> ⚠️ 注意
>
> 由于 tinc-pre 1.17 在 AlpineLinux 3.10 上编译测试用例未通过，因此官方仓库没有。下面使用 [wenerme/repository](https://github.com/wenerme/repository) 仓库中的 tinc-pre 1.16 进行部署。


> 💡提示
>
> 如果需要配置为 Switch 模式，只需要在最开始节点的 tinc.conf 里添加 `Mode=Switch` 即可

### Docker 部署 Tinc

* mynet - 网络 10.0.0.0/24
  * mynet 主节点 10.0.0.1
  * node_1 从节点 10.0.0.2

> 通过 Docker 来快速体验 tinc 的能力熟悉相关操作

```bash
# 创建测试用的网络 - 测试完成即可删除 - 自定义的网络才能使用静态 IP
docker network create --subnet 172.18.0.0/24 tinc

# 启动主节点 - 使用固定 IP - 因为其它节点需要访问
# 因为需要创建网络所以需要 NET_ADMIN 权限
docker run --rm -it -v $PWD/mynet:/etc/tinc/mynet \
  --network tinc --ip 172.18.0.100 \
  --cap-add NET_ADMIN --device /dev/net/tun \
  --name mynet wener/tinc sh

# 初始化节点
tinc -n mynet init mynet

# 配置启动脚本设置 IP
cat <<'EOF' > /etc/tinc/mynet/tinc-up
#!/bin/sh
ifconfig $INTERFACE 10.0.0.1 netmask 255.255.255.0
EOF

# 配置该节点的信息
# Address 只有主要的中继节点才需要 - 用于生成邀请地址
# - 这里使用 docker 分配的 ip
# - 实际使用时使用外网 ip
# - 如果映射了 docker 的 655 655/udp 那么也可以配置为使用外网地址
cat <<EOF >> /etc/tinc/mynet/hosts/mynet
Port=655
Subnet=10.0.0.1/32
Address=172.18.0.100
EOF

# 前台启动该节点 - 方便观察日志
tinc -n mynet start -Dd 5
```

在主机上的另外一个会话生成邀请地址

```bash
docker exec -it mynet tinc -n mynet invite node_1
```

拿到邀请地址后启动另外一个节点进行链接

```bash
docker run --rm -it -v $PWD/node_1:/etc/tinc/mynet \
  --network tinc \
  --cap-add NET_ADMIN --device /dev/net/tun \
  --name node_1 wener/tinc sh

# 加入刚才的要求地址
tinc join <邀请地址>

# 配置地址
cat <<'EOF' > /etc/tinc/mynet/tinc-up
#!/bin/sh
ifconfig $INTERFACE 10.0.0.2 netmask 255.255.255.0
EOF

# Port 0 表示随机选择 - 不使用固定端口避免被检测
cat <<EOF >> /etc/tinc/mynet/hosts/node_1
Port=0
Subnet=10.0.0.2/32
EOF

# 配置完成后后台启动
tinc -n mynet start
# 查看 tinc 网卡 - 因为是 3 层 - 所以没有 mac 地址
ifconfig mynet
# mynet     Link encap:UNSPEC  HWaddr 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00
#           inet addr:10.0.0.2  P-t-P:10.0.0.2  Mask:255.255.255.0
#           UP POINTOPOINT RUNNING NOARP MULTICAST  MTU:1500  Metric:1
#           RX packets:2 errors:0 dropped:0 overruns:0 frame:0
#           TX packets:2 errors:0 dropped:0 overruns:0 carrier:0
#           collisions:0 txqueuelen:500
#           RX bytes:168 (168.0 B)  TX bytes:168 (168.0 B)

# 此时已经能访问另外一个节点
ping 10.0.0.1

# 退出关闭容器
exit
```

因为将配置映射到了本地，所以可以直接启动

```bash
docker run --rm -it -v $PWD/node_1:/etc/tinc/mynet \
  --network tinc \
  --cap-add NET_ADMIN --device /dev/net/tun \
  --name node_1 wener/tinc tinc -n mynet start -Dd 2
```

> 💡
> 在实际服务器上部署时修改 `/etc/conf.d/tinc.networks`, 添加 `NETWORK: mynet` 然后 `service tincd start` 即可

### AlpineLinux 部署 Tinc

* 生产或实际机器上可使用 alpine 自行配置
* 可以使用服务进行启动管控
* 直接将网卡暴露给系统 - 方便使用

#### 主节点配置

```bash
# 以下命令需要 root 用户操作
sudo su

# 添加仓库 <= 3.10
# (cd /etc/apk/keys; curl -LO https://repo.wener.me/alpine/wenermail@gmail.com-5dc8c7cd.rsa.pub )
# echo https://repo.wener.me/alpine/v3.10/community | tee -a /etc/apk/repositories
# 安装
apk add --no-cache tinc-pre

# 初始化
tinc -n mynet init mynet

# 配置启动脚本设置 IP
cat <<'EOF' > /etc/tinc/mynet/tinc-up
#!/bin/sh
ifconfig $INTERFACE 10.0.0.1 netmask 255.255.255.0
EOF

# 配置该节点的信息
# 💡这里配置的 Address 是外网地址
cat <<EOF >> /etc/tinc/mynet/hosts/mynet
Port=655
Subnet=10.0.0.1/32
Address=$(curl -s icanhazip.com)
EOF

# 加载模块
modprobe tun
echo tun  >> /etc/modules-load.d/tinc.conf

# 配置要启动的网络
echo 'NETWORK: mynet' >> /etc/conf.d/tinc.networks

# 启动服务
service start tincd
# 开机启动
rc-update add tincd
```

__配置完成后生成邀请链接__

```bash
# 保留好链接
tinc -n mynet invite node_1
```

#### 从节点配置

```bash
# 以下命令需要 root 用户操作
sudo su

# 添加仓库 <= 3.10
# (cd /etc/apk/keys; curl -LO https://repo.wener.me/alpine/wenermail@gmail.com-5dc8c7cd.rsa.pub )
# echo https://repo.wener.me/alpine/v3.10/community | tee -a /etc/apk/repositories
# 安装
apk add --no-cache tinc-pre

# 有区别第地方
# --------------------
# 加入网络
tinc join <邀请地址>

# 配置启动脚本设置 IP
cat <<'EOF' > /etc/tinc/mynet/tinc-up
#!/bin/sh
ifconfig $INTERFACE 10.0.0.2 netmask 255.255.255.0
EOF

# 配置该节点的信息
# 💡这里配置的 Address 是外网地址
cat <<EOF >> /etc/tinc/mynet/hosts/node_1
Port=0
Subnet=10.0.0.2/32
EOF
# --------------------

# 加载模块
modprobe tun
echo tun  >> /etc/modules-load.d/tinc.conf

# 配置要启动的网络
echo 'NETWORK: mynet' >> /etc/conf.d/tinc.networks

# 启动服务
service start tincd
# 开机启动
rc-update add tincd
```

### Ansible 部署 Tinc
* 使用规模化的自动化部署 - 例如节点数量 > 5

```bash
# 克隆 Ansible 任务仓库
git clone https://github.com/wenerme/alpine-admin
cd alpine-admin

cat <<EOF
all:
  hosts:
    node_0: {ansible_host: 192.168.0.1, tinc_address: 10.0.0.1}
    node_1: {ansible_host: 192.168.0.2, tinc_address: 10.0.0.2}
    node_2: {ansible_host: 192.168.0.3, tinc_address: 10.0.0.3}
  children:
    tinc-nodes:
      hosts:
        node_1:
        node_2:
  vars:
    tinc_netname: mynet
    tinc_master: node_0
    tinc_subnet: 10.0.0.0/24
EOF

# 初始化网络
ansible-playbook adhoc.yaml -e 'task=tinc-init' -l node_0
# 启动服务
ansible-playbook adhoc.yaml -e 'task=tinc-service' -l node_0

# 加入网络
ansible-playbook adhoc.yaml -e 'task=tinc-join' -l tinc-nodes
# 启动服务
ansible-playbook adhoc.yaml -e 'task=tinc-service' -l tinc-nodes
```
