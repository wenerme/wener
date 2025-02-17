---
title: Tinc 配置
tags:
  - Configuration
---

# Tinc 配置

## 配置文件

- /etc/tinc/NETNAME/
  - tinc.conf
  - conf.d/
    - `*.conf` - 额外配置文件
  - hosts/ - 主机配置
  - tinc-up
  - tinc-down
  - invitations/
  - invitation-data - 接受邀请包含的内容
- macOS tinc /opt/homebrew/etc/tinc/NETNAME/

**脚本**

- /etc/tinc/NETNAME/ - 网络配置
  - tinc-up - 启动后配置网络的脚本
  - tinc-down
  - hosts/
    - HOSTS-up - HOST 的守护进程启动后的脚本
    - HOSTS-down
  - host-up - 当某 HOST 可访问
  - host-down - 当某 HOST 不可访问
  - subnet-up - 当 subnet 可访问
  - subnet-down
  - invitation-created - 邀请创建
  - invitation-accepted - 邀请接受

**环境变量**

| env             | desc                         |
| --------------- | ---------------------------- |
| NETNAME         |
| NAME            | this tinc daemon.            |
| DEVICE          | virtual network device       |
| INTERFACE       | virtual network interface    |
| NODE            | host-up/down, subnet-up/down |
| REMOTEADDRESS   | host-up/down - 对方地址      |
| REMOTEPORT      | host-up/down - 对方端口      |
| SUBNET          | subnet-up/down               |
| WEIGHT          | subnet-up/down               |
| INVITATION_FILE |
| INVITATION_URL  |

## tinc.conf

- [tinc.conf.5](https://www.tinc-vpn.org/documentation-1.1/tinc.conf.5)
- 没有 ConnectTo 且 `AutoConnect=no` 可以认为是服务端 - metanode
- 有 ConnectTo 且 `AutoConnect=yes` 可以认为是客户端

```ini
# 节点名字 - 唯一、必须
# 可以指定为 $HOST - 如果环境变了不存在则 gethostname()
Name = name
# router | switch | hub
Mode = router

# 启动时连接到的节点 - meta 节点
# 可以指定多个
# 如果一个都不指定且也不指定 AutoConnect 则节点处于只接受链接的状态
ConnectTo = name

# 如果启用, 会自动尝试与其他节点建立 meta 链接, 而不需要设置 ConnectTo
# 不能链接 Port=0 的节点 - 系统随机端口
# 试验阶段
# yes | no
AutoConnect = yes


# 影响监听和外部 sockets 包, any 会根据操作系统进行创建 ipv4 和 ipv6
# ipv4 | ipv6 | any
AddressFamily = any

# 类似于 ListenAddress，但出去的流量也会使用
# 有多路出口时有用
# BindToAddress=address [port]

# 设置广播包发到其他节点的方式, 所有节点需要使用相同的方式, 否则可能会产生路由循环
# no 不发送广播包
# mst 使用 Minimum Spanning Tree, 保证发往每个节点
# direct 只发送给直接访问的节点, 从其他节点接收到的不转发. 如果设置了 IndirectData, 广播包也会发送给有 meta 链接的节点
# 试验阶段
# no | mst | direct
Broadcast = mst

# 定义广播地址
# 标准的广播地址已包含
# BroadcastSubnet = address[/prefixlength]

# 转发前减小 ipv4 包 ttl 和 ipv6 包的 Hop Limit
# switc 模式且需要 ipv6 则不要启用
# 实验阶段
DecrementTTL=no

# 默认自动创建
# Device=/dev/tap0
# dummy,raw_socket,multicast,fd,uml,vde,tun,tunnohead,tunifhead,utun,tap
# DeviceType=type

# 至少有一个节点时会调用 tinc-up，没有节点时调用 tinc-down
DeviceStandby=no

# 仅直连不转发 - 适用于 meta node
# 实验阶段
DirectOnly=no

# Ed25519 key - SPTPS 协议使用
# Ed25519PrivateKeyFile=/etc/tinc/NETNAME/ed25519_key.priv

# 启用后, 会尝试使用 SPTPS 协议, key 交换会使用 Ephemeral ECDH, 会使用 Ed25519 作为授权, 而不是 RSA, 因此需要先生成 Ed25519
# 如果先启用了且 join 了网络，再改成 no 时需要先准备好 rsa key
ExperimentalProtocol = yes

# 转发策略
# 实验阶段
# off 不转发
# internal 内部转发
# kernel 包发往 TUN/TAP 设备, 交由内核转发, 性能更低, 但能使用内核的路由功能
Forwarding = internal

# 包打上 fwmark - 配合 iptables 可进行过滤
# 试验阶段
FWMark=0

# 是否解析 hostname - dns 阻塞查询对性能有一点影响
Hostnames=no

# tun/tap IFF_ONE_QUEUE
# 实验阶段
IffOneQueue=no

# Interface=interface

# 邀请时效时间
# 秒
InvitationExpire=604800

# key 失效时间 - 秒
KeyExpire=3600

# 默认监听所有
# address 可以设置为 *
# port 默认为 hosts 下的 Port 选项或 655 - 设置为 0 则随机选择
# ListenAddress=address port

# 尝试发现本机网络中的节点
# 允许与本地节点地址建立直接连接
# 目前, 本地发现机制是通过在 UDP 发现阶段发送本地地址的方式
LocalDiscovery = yes

LogLevel=0

# mac 地址失效时间 - 秒
# switch 模式有效
MACExpire=600

# 最大爆发连接数 - 超过的 1/s 一个
MaxConnectionBurst=100

# 最大重连延时
MaxTimeout=900


# ping 间隔 - 发现 mtu 检测节点
PingInterval=60
# 超时后中断 meta 链接
PingTimeout=5

# UDP 继承 TCP 的 TOS 字段
# 实验阶段
PriorityInheritance=no

# RSA key - 旧的协议使用
# PrivateKey=key
# PrivateKeyFile=/etc/tinc/NETNAME/rsa_key.priv

# 进程优先级 - 可能影响 VPN 延时
# ProcessPriority = low | normal | high

# 出的连接经过代理
# socks4 address port [username]
# socks5 address port [username password]
# http address port
# exec command
#   环境变量 NAME, NODE, REMOTEADDRES, REMOTEPORT
# 实验阶段
# Proxy = socks4 | socks5 | http | exec

# byte
ReplayWindow=32

# 只允许 /etc/tinc/NETNAME/hosts/ 下的 Subnet 信息
# 例如 A -> B -> C - C 不会学习到 A 的子网信息
# 实验阶段
StrictSubnets = no

# 不会转发其他节点间的信息， /etc/tinc/NETNAME/hosts/ , 隐性指定 StrictSubnets
# 实验阶段
TunnelServer = no

UDPDiscovery=yes
UDPDiscoveryKeepaliveInterval=9
UDPDiscoveryInterval=2
UDPDiscoveryTimeout=30
UDPInfoInterval=5
UDPRcvBuf=1048576
UDPSndBuf=1048576

# 搜索 UPnP-IGD，管理维护 tinc 的端口映射
# udponly 只维护 udp 端口
# yes | udponly | no
UPnP=no
UPnPDiscoverWait=5
UPnPRefreshPeriod=60
```

### Mode

- 工作模式
- router
  - 默认
  - 基于子网信息构建路由表
  - 支持基于 ip 的单播通讯
  - tun 设备
    - mac tun 只支持点对点
      - 例如 `ifconfig tun0 inet 10.2.1.1 10.2.1.2 up`
      - 其他需要手动添加路由 `route add -net 10.2 -interface tun0`
- switch
  - 基于 mac 信息构建路由表
  - 支持基于 ethernet 的单播,广播通讯
  - tap 设备
- hub
  - 不维护路由表, 只做转发

### DeviceType

- tuntap 设备类型
- dummy
  - 测试
  - 该节点只负责为其他节点转发包
- raw_socket
  - 绑定到现有 interface 的 socket.
  - 所有包从该 interface 读. 从本地节点收到的包会写到 raw socket.
  - 在 linux 下, os 不会处理目的为本地节点的包
- multicast
  - 多播 udp socket, 绑定到地址和端口, 空格分割, ttl 参数可选
  - 包从广播 socket 读写
  - 可用于连接 UML, QEMU, KVM, 所有实例监听相同的广播地址.
  - 不要连接多个 tinc 到相同的多播地址, 对导致循环路由
  - 错误的配置可能会导致加密的 vpn 包发到外网
- fd
  - 使用文件描述符
- uml
  - 默认未编译
  - unix socket
  - 如果未指定 Device, 则为 /var/run/NETNAME.umlsocket
  - 会等待太湖连接该 socket
- vde
  - 默认未编译
  - 使用 libvdeplug 连接 vde 交换机, 使用 unix socket 或 /var/run/vde.ctl
- tun
- tunnohead
  - 没有地址头
- tunifhead
  - 有地址头
  - 支持 ipv4 和 ipv6
- utun
  - macOS
  - 支持 ipv4 和 ipv6
- tap
  - 支持 Switch
  - 包带 Ethernet 头
