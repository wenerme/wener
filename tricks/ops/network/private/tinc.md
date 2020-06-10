---
id: tinc
title: Tinc
---

# tinc

## Tips

* Tiny VPN
  * 支持路由模式
    * IP 协议交换
    * 不支持广播
  * 支持交换模式
    * Ethernet 协议
    * 支持广播
  * 协议加密
  * NAT 穿透
  * 支持 UDP
  * 支持网段
  * 支持转发
  * 运行在用户空间
  * [多台支持](https://www.tinc-vpn.org/platforms/)
    * iOS/Android
    * macOS/utun
    * Windows/Cygwin/tap64/i386/x86_64
    * Windows/MinGW/tap64/i386/x86_64
    * Linux
    * DragonFlyBSD
    * FreeBSD
    * OpenBSD
    * NetBSD
    * Solaris/sparc32
  * 非常小
    * 二进制 150k, 内存占用 2m 左右
* 类似
  * [meshbird/meshbird](https://github.com/meshbird/meshbird)
  * FreeS/WAN
  * IPSeC
  * Wireguard
* Arch [Tinc](https://wiki.archlinux.org/index.php/Tinc)
* 1.1 后的协议和之前版本的有兼容问题
  * 想要兼容, 需要在所有 pre 版本的配置里添加
    * `ExperimentalProtocol = no`
  * 目前 ubuntu 想用新版只能自己编译
    * https://nwgat.ninja/quick-easy-tinc-1-1-2/
* [SPTPS](https://www.tinc-vpn.org/documentation-1.1/Simple-Peer_002dto_002dPeer-Security.html)
  * Simple Peer-to-Peer Security
  * based on TLS 1.2, but has been simplified: there is no support for exchanging public keys, and there is no cipher suite negotiation. Instead, SPTPS always uses a very strong cipher suite: peers authenticate each other using 521 bits ECC keys, Diffie-Hellman using ephemeral 521 bits ECC keys is used to provide perfect forward secrecy (PFS), AES-256-CTR is used for encryption, and HMAC-SHA-256 for message authentication.
* 655/tcp 655/udp
* macOS
  * https://www.tinc-vpn.org/pipermail/tinc/2016-January/004336.html
  * http://tuntaposx.sourceforge.net/
* https://www.tinc-vpn.org/documentation/tinc.conf.5
* https://www.tinc-vpn.org/documentation-1.1/How-connections-work.html
* 如果有 NAT 问题, 可以在另外一台上不直接连接外部节点, 先连接内部, 连接上后, 网络都能互通
* 工作模式 - Mode
  * router
    * 默认
    * 基于子网信息构建路由表
    * 支持基于 ip 的单播通讯
    * tun 设备
      * mac tun 只支持点对点 - 例如 ifconfig tun0 inet 10.2.1.1 10.2.1.2 up
      * 其他需要手动添加路由 route add -net 10.2 -interface tun0
  * switch
    * 基于 mac 信息构建路由表
    * 支持基于 ethernet的单播,广播通讯
    * tap 设备
  * hub
    * 不维护路由表, 只做转发
* 支持的设备类型 - DeviceType
  * dummy
    * 测试
    * 该节点只负责为其他节点转发包
  * raw_socket
    * 绑定到现有 interface 的 socket.
    * 所有包从该 interface 读. 从本地节点收到的包会写到 raw socket.
    * 在 linux 下, os 不会处理目的为本地节点的包
  * multicast
    * 多播 udp socket, 绑定到地址和端口, 空格分割, ttl 参数可选
    * 包从广播 socket 读写
    * 可用于连接 UML, QEMU, KVM, 所有实例监听相同的广播地址.
    * 不要连接多个 tinc 到相同的多播地址, 对导致循环路由
    * 错误的配置可能会导致加密的 vpn 包发到外网
  * fd
    * 使用文件描述符
  * uml
    * 默认未编译
    * unix socket
    * 如果未指定 Device, 则为 /var/run/NETNAME.umlsocket
    * 会等待太湖连接该 socket
  * vde
    * 默认未编译
    * 使用 libvdeplug 连接 vde 交换机, 使用 unix socket 或 /var/run/vde.ctl
  * tun
  * tunnohead
    * 没有地址头
  * tunifhead
    * 有地址头
    * 支持 ipv4 和 ipv6
  * utun
    * macOS
    * 支持 ipv4 和 ipv6
  * tap
    * 包带 Ethernet 头
* 参考
  * [How Do I Reach Local Subnet Behind Tinc VPN](https://serverfault.com/q/640020/190601)
  * [Tinc 配置笔记](https://www.jianshu.com/p/e030dabafd61)
  * [使用 Tinc 建立 VPN 连接并配置 NAT 网关](https://groverchou.com/blog/2017/07/23/使用-Tinc-建立-VPN-连接并配置-NAT-网关/)
  * [How to set up OpenVPN to let the VPN clients to access all the servers inside the server LAN?](https://serverfault.com/q/418354/190601)
  * [How to use two gateways with the same IP address?](https://unix.stackexchange.com/q/91123/47774)
  * [用RouterOS/QEMU在Tinc TAP VPN内部实现DHCP](https://blog.swineson.me/use-routeros-qemu-as-tinc-tap-vpn-dhcp-server/)
  * https://www.tinc-vpn.org/faq/
  * [Large scale tinc tests](https://www.tinc-vpn.org/pipermail/tinc-devel/2015-September/000790.html)
  * https://www.tinc-vpn.org/packages/
  * https://github.com/gsliepen/tinc
  * https://git.alpinelinux.org/cgit/aports/tree/community/tinc-pre/APKBUILD

```bash
# 推荐使用 tinc-pre 1.1 版本
# 配置更方便使用更简单
apk add tinc-pre

modprobe tun
echo tun >> /etc/modules
# echo tun >> /etc/modules-load.d/tinc.conf

# 基础配置
tinc init first
tinc set Interface tun0
tinc set AddressFamily ipv4
# 第一个节点可考虑不设置链接节点
tinc set ConnectTo other
# 变量设置可以指定 host
tinc set sec.Subnet=10.0.0.2/32


# 在配置单个网络时, 设置个别名会比较方便, 使用不同目录或 pid 也可以这样操作
alias tinc='tinc -n main'
# 操作指定网络名时, 可使用环境变量
export NETNAME=main
tinc dump nodes
# 如果执行的命令比较多, 也可以加入交互模式操作
tinc -c .

ADDRESS=10.0.0.1
NETMASK=255.255.255.0
cat > tinc-up <<SH
#!/bin/sh
ifconfig \$INTERFACE $ADDRESS netmask $NETMASK
SH
cat > tinc-down <<SH
#!/bin/sh
ifconfig \$INTERFACE down
SH
chmod +x tinc-*

tincd -Dd4

# 导入别处 export 的配置
tinc import

# 生成邀请码
# 最简便的配置方式
tinc invite 节点名
# 加入
# 会在远程添加主机信息
# 会使用相同的 netname
# tinc-up 和 tinc-down 需要自己配置
tinc join 邀请码

tinc -n main invite thd

# 配置要启动的网络
# NETWORK: main
# 会使用 /etc/tinc/main 配置
nano /etc/conf.d/tinc.networks
rc-service tincd start
# 自启动
rc-update add tincd
# 启动后可以查看日志, 1-5
tinc -n main log 5

# Docker
# ======
# 先在 docker 中进行配置和测试
NETNAME=name
docker run --rm -it -e NETNAME=$NETNAME --cap-add=NET_ADMIN --device=/dev/net/tun -v $PWD/tinc:/etc/tinc wener/tinc sh
# 导入配置
docker run --rm -it -e NETNAME=$NETNAME -v $PWD/tinc:/etc/tinc wener/tinc tinc import
# 启动
docker run -d --restart always \
  --net host --cap-add=NET_ADMIN --device=/dev/net/tun \
  -e NETNAME=$NETNAME -v $PWD/tinc:/etc/tinc \
  --name tinc-$NETNAME wener/tinc

```

```bash
# macOS
# http://tuntaposx.sourceforge.net/
# 新版没有了 devel 参数
# https://github.com/Homebrew/homebrew-core/tree/master/Formula/tinc.rb
curl https://raw.githubusercontent.com/wenerme/homebrew-core/tinc-pre/Formula/tinc-pre.rb > /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core/Formula/tinc-pre.rb
brew install tinc-pre

# utun
# ===============
# 在 mac 下, tinc 支持 utun, 可能需要 root 权限
tinc set DeviceType utun

# 确保路径存在, 否则 pid 会存在当前目录
mkdir -p /usr/local/Cellar/tinc/1.1pre17/var/run/

# tun/tap
# ===============
# tuntap 10.13 会安装失败
brew cask install tuntap
# /Library/Extensions/tap.kext
# /Library/Extensions/tun.kext
# /Library/StartupItems/tap
# /Library/StartupItems/tun

# 手动加载
sudo kextload /Library/Extensions/tun.kext
# 失败日志
sudo dmesg
# tun: could not register PF_INET protocol family: 17
# Kext net.sf.tuntaposx.tun start failed (result 0x5).
# Kext net.sf.tuntaposx.tun failed to load (0xdc008017).
# Failed to load kext net.sf.tuntaposx.tun (error 0xdc008017).

# 查看现有的
kextstat | grep tun
# 写在
sudo kextunload -b 名字

# https://tunnelblick.net
# 包含了新的 kext

# 查看具体出错信息
sudo kextutil /Volumes/Tunnelblick/Tunnelblick.app/Contents/Resources/tun-signed.kext

sudo kextutil /Library/Extensions/tun.kext
# Memory allocation failure.
# Untrusted kexts are not allowed

```


__tinc-up__
```bash
#!/bin/sh
brctl addif br0 $INTERFACE
ifconfig $INTERFACE 0.0.0.0 promisc up

# 该节点作为路由
# iptables -I FORWARD -i $INTERFACE -j ACCEPT
# iptables -t nat -A POSTROUTING -d 10.88.0.0/16 -o $INTERFACE -j MASQUERADE
```

__tinc-fw__
```bash
#!/bin/sh
iptables -I INPUT -p udp --dport 20656 -j ACCEPT
iptables -I INPUT -p tcp --dport 20656 -j ACCEPT
iptables -I INPUT -i tinc -j ACCEPT
iptables -I FORWARD -i tinc -j ACCEPT
```

## 完整的网络配置

```bash
# 主节点
export NETNAME=mynet
export NODE=mynet

tinc init $NETNAME
cd /etc/tinc/$NETNAME

# 配置启动脚本
ADDRESS=10.66.1.1
NETMASK=255.255.0.0
cat > tinc-up <<SH
#!/bin/sh
ifconfig \$INTERFACE $ADDRESS netmask $NETMASK
SH
cat > tinc-down <<SH
#!/bin/sh
ifconfig \$INTERFACE down
SH
chmod +x tinc-*

# 配置主节点地址
# 用于其它节点请求的地址, 如果有外网地址
tinc set $NODE.Address=$(curl ipv4.icanhazip.com)
# 如果不想使用默认端口
tinc set $NODE.Port=12345
# 私有子网
tinc set $NODE.Subnet=$ADDRESS/32
# 启动
tinc start

# 邀请其它节点
tinc invite home

# home 节点
# =============
export NETNAME=mynet
export NODE=home
tinc join <INVITE>

cd /etc/tinc/$NETNAME

# 配置启动脚本
ADDRESS=10.66.1.2
NETMASK=255.255.0.0
cat > tinc-up <<SH
#!/bin/sh
ifconfig \$INTERFACE $ADDRESS netmask $NETMASK
SH
cat > tinc-down <<SH
#!/bin/sh
ifconfig \$INTERFACE down
SH
chmod +x tinc-*

# 如果不想使用默认端口
tinc set $NODE.Port=45678
# 私有子网
tinc set $NODE.Subnet=$ADDRESS/32

# svr 节点
# =============
# 如果不能安装 tinc-1.1+ 则可以使用 docker
export NETNAME=mynet
export NODE=home
docker run --rm -it -e NODE=$NODE -e NETNAME=$NETNAME --cap-add=NET_ADMIN --device=/dev/net/tun -v /data/tinc/$NETNAME/$NODE:/etc/tinc wener/tinc sh

tinc join <INVITE>

cd /etc/tinc/$NETNAME
# 配置启动脚本
ADDRESS=10.66.1.3
NETMASK=255.255.0.0
cat > tinc-up <<SH
#!/bin/sh
ifconfig \$INTERFACE $ADDRESS netmask $NETMASK
SH
cat > tinc-down <<SH
#!/bin/sh
ifconfig \$INTERFACE down
SH
chmod +x tinc-*

# 如果不想使用默认端口
tinc set $NODE.Port=45678
# 私有子网
tinc set $NODE.Subnet=$ADDRESS/32
# 退出配置容器
exit
# 运行服务
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  --cap-add=NET_ADMIN --device=/dev/net/tun \
  -e NETNAME=$NETNAME \
  -v /data/tinc/$NETNAME/$NODE:/etc/tinc \
  --name tinc-$NETNAME-$NODE wener/tinc
```

## 新手教程

### 基于容器组件网络

## Turning
* [tinc.conf.5](https://www.tinc-vpn.org/documentation-1.1/tinc.conf.5)


```ini
# The symmetric cipher algorithm used to encrypt UDP packets. 默认 blowfish
# 检测 CPU 是否支持 aes
# grep aes /proc/cpuinfo --color auto
# SHA1 HMAC 
# 对启用了 ExperimentalProtocol 不生效
Cipher = aes-128-cbc

# 启用后, 会尝试使用 SPTPS 协议, key 交换会使用 Ephemeral ECDH, 会使用 Ed25519 作为授权, 而不是 RSA, 因此需要先生成 Ed25519
ExperimentalProtocol = yes

# 影响监听和外部 sockets 包, any 会根据操作系统进行创建 ipv4 和 ipv6
# ipv4 | ipv6 | any
AddressFamily = any

# 如果启用, 会自动尝试与其他节点建立 meta 链接, 而不需要设置 ConnectTo
# 该模式下不能使用 0 端口(系统指定的)
# 试验阶段
# yes | no
AutoConnect = no

# 设置广播包发到其他节点的方式, 所有节点需要使用相同的方式, 否则可能会产生路由循环
# no 不发送广播包 
# mst 使用 Minimum Spanning Tree, 保证发往每个节点
# direct 只发送给直接访问的节点, 从其他节点接收到的不转发. 如果设置了 IndirectData, 广播包也会发送给有 meta 链接的节点
# 试验阶段
# no | mst | direct
Broadcast = mst

# 转发策略
# 实验阶段
# off 不转发
# internal 内部转发
# kernel 包发往 TUN/TAP 设备, 交由内核转发, 性能更低, 但能使用内核的路由功能
Forwarding = internal

# 尝试发现本机网络中的节点
# 允许与本地节点地址建立直接连接
# 目前, 本地发现机制是通过在 UDP 发现阶段发送本地地址的方式
LocalDiscovery = yes

# 启用后之后使用 /etc/tinc/NETNAME/hosts/ 下的配置信息, 而不会通过连接到别的节点发现新的子网
# experimental
StrictSubnets = no

# 启用后不会转发其他节点间的信息, 只会允许 /etc/tinc/NETNAME/hosts/ 下的节点进行连接, 隐性指定 StrictSubnets
# experimental
TunnelServer = no

# UDP 包的摘要算法, 可使用 LibreSSL 或 OpenSSL 支持的算法, 指定 none 可关闭包验证.
# 对使用 ExperimentalProtocol 的节点不生效
Digest = sha1
```

## FAQ

### traps: tincd[3995] general protection fault ip:7f6ad09944eb sp:7ffda3da5ea8 error:0 in ld-musl-x86_64.so.1[7f6ad098b000+46000]
TBD

### 相同 key 或相同 名字？
* tinc 允许相同 key - 但不建议，存在安全隐患
* tinc 不允许相同 name
  * name 在节点里是唯一标识的
* https://www.tinc-vpn.org/pipermail/tinc/2015-May/004137.html

### Peer  tries to roll back protocol version to 17.0

使用 1.0 协议

```
ExperimentalProtocol = no
```

### Could not open /dev/net/tun: No such file or directory

加载 tun 内核模块

```bash
modprobe tun
echo tun >> /etc/modules
```

### route

* https://wiki.archlinux.org/index.php/Network_bridge

```bash
sysctl net.ipv4.ip_forward
sysctl -w net.ipv4.ip_forward=1
# 1. 允许包转发, 会将 eth0 子网的转发到 mynet, 需要在网关节点添加 eth0 的子网才能做到互通
# iptables -L --line-number -nv
iptables -I FORWARD -i mynet -j ACCEPT
iptables -I FORWARD -i eth0 -j ACCEPT

# 2. NAT 使得 eth0 子网能访问私网
# 如果做了桥接, 这里需要换成桥接网卡
# iptables -t nat -L --line-number -nv
iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -o mynet -j MASQUERADE
# 如果有多个私网, 也可以考虑限制目标网段
# iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -d 10.10.0.0/16 -o mynet -j MASQUERADE

# 创建用于 docker 使用的网络
# 假设当前节点的子网是 10.10.1.0/24 当前节点的地址是 10.10.1.0
docker network create \
  --driver=bridge \
  --subnet=10.10.0.0/16 \
  --ip-range=10.10.1.0/24 \
  --gateway=10.10.1.0 \
  --aux-address="my-host=10.10.1.1" \
  -o com.docker.network.bridge.name=brmynet \
  brmynet
# 允许桥接网卡转发
iptables -I FORWARD -i brmynet -j ACCEPT
# 将 tinc 作为该桥接的 slave
ip li set master brmynet dev mynet
# 或者在 tinc-up 中设置
cat > tinc-up <<SH
#!/bin/sh
ip li set master br$INTERFACE dev $INTERFACE
ip li set dev $INTERFACE up
SH

# 调试
tcpdump -nni mynet icmp
```

How can I set my linux box as a router to forward ip packets?
https://askubuntu.com/q/227369/267103

Linux IP Masquerade HOWTO
http://tldp.org/HOWTO/IP-Masquerade-HOWTO/

iptables -I FORWARD -i brwenet -j ACCEPT
