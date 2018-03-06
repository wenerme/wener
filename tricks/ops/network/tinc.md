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
* 类似
  * https://github.com/meshbird/meshbird
* https://wiki.archlinux.org/index.php/Tinc
* 支持 iOS/Android
* 1.1 后的协议和之前版本的有兼容问题
  * 想要兼容, 需要在所有 pre 版本的配置里添加
    * `ExperimentalProtocol = no`
  * 目前 ubuntu 想用新版只能自己编译
    * https://nwgat.ninja/quick-easy-tinc-1-1-2/
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
  * switch
    * 基于 mac 信息构建路由表
    * 支持基于 Ethernet 的单播,广播通讯
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
* Demo
  * [How Do I Reach Local Subnet Behind Tinc VPN](https://serverfault.com/q/640020/190601)
  * [Tinc 配置笔记](https://www.jianshu.com/p/e030dabafd61)
  * [使用 Tinc 建立 VPN 连接并配置 NAT 网关](https://groverchou.com/blog/2017/07/23/使用-Tinc-建立-VPN-连接并配置-NAT-网关/)
  * [How to set up OpenVPN to let the VPN clients to access all the servers inside the server LAN?](https://serverfault.com/q/418354/190601)
  * [How to use two gateways with the same IP address?](https://unix.stackexchange.com/q/91123/47774)
  * [用RouterOS/QEMU在Tinc TAP VPN内部实现DHCP](https://blog.swineson.me/use-routeros-qemu-as-tinc-tap-vpn-dhcp-server/)
* WHY
  * https://www.tinc-vpn.org/faq/
  * 运行在用户空间

https://www.tinc-vpn.org/packages/
https://github.com/gsliepen/tinc
https://git.alpinelinux.org/cgit/aports/tree/community/tinc-pre/APKBUILD

```bash
# 稳定版
apk add tinc
# PreRelease 版 1.1
apk add tinc-pre

modprobe tun
echo tun >> /etc/modules
# echo tun >> /etc/modules-load.d/netdev.conf

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
brew install tinc --devel

# utun
# ===============
# 在 mac 下, tinc 支持 utun, 可能需要 root 权限
tinc set DeviceType utun

# 确保路径存在, 否则 pid 会存在当前目录
mkdir -p /usr/local/Cellar/tinc/1.1pre15/var/run/

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
```

__tinc-fw__
```bash
#!/bin/sh
iptables -I INPUT -p udp --dport 20656 -j ACCEPT
iptables -I INPUT -p tcp --dport 20656 -j ACCEPT
iptables -I INPUT -i tinc -j ACCEPT
iptables -I FORWARD -i tinc -j ACCEPT
```
