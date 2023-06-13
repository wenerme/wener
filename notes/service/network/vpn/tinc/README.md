---
title: Tinc
---

# tinc

- [gsliepen/tinc](https://github.com/gsliepen/tinc) 是什么？
  - GPLv2+, C
  - 2 层、3 层 NAT 穿透直连组网的 Mesh VPN
  - 加密、认证、压缩
  - 自动全 Mesh 路由
  - NAT 穿透
  - bridge ethernet segments
  - 支持 IPv6
  - 实现简洁 - ~40k loc
- 什么时候可用
  - 基础设施组网 - 管理
    - Tinc 连接性好
  - 业务应用集群
    - Layer 2 方便应用
  - 需要 2 层协议
    - mdns, upnp
- 什么时候不用
  - 数据中心 - 考虑 wireguard
    - 数据量过大，Tinc 不适合 - 单线程
  - 移动设备接入 - 考虑 nebula
    - 目前没有移动客户端，适用于服务端场景
    - 不能做细粒度控制
  - 多租户 - 考虑 n2n
    - 全 mesh，无法控制节点授权
- Tiny VPN
  - 支持路由模式
    - IP 协议交换
    - 不支持广播
  - 支持交换模式
    - Ethernet 协议
    - 支持广播
  - 协议加密
  - NAT 穿透
  - 支持 UDP
  - 支持网段
  - 支持转发
  - 运行在用户空间
  - [多台支持](https://www.tinc-vpn.org/platforms/)
    - iOS/Android
    - macOS/utun
    - Windows/Cygwin/tap64/i386/x86_64
    - Windows/MinGW/tap64/i386/x86_64
    - Linux
    - DragonFlyBSD
    - FreeBSD
    - OpenBSD
    - NetBSD
    - Solaris/sparc32
  - 非常小
    - 二进制 150k, 内存占用 2m 左右
- 类似
  - [meshbird/meshbird](https://github.com/meshbird/meshbird)
  - FreeS/WAN
  - IPSeC
  - Wireguard
- Arch [Tinc](https://wiki.archlinux.org/index.php/Tinc)
- 1.1 后的协议和之前版本的有兼容问题
  - 想要兼容, 需要在所有 pre 版本的配置里添加
    - `ExperimentalProtocol = no`
  - 目前 ubuntu 想用新版只能自己编译
    - https://nwgat.ninja/quick-easy-tinc-1-1-2/
- [SPTPS](https://www.tinc-vpn.org/documentation-1.1/Simple-Peer_002dto_002dPeer-Security.html)
  - Simple Peer-to-Peer Security
  - based on TLS 1.2, but has been simplified: there is no support for exchanging public keys, and there is no cipher suite negotiation. Instead, SPTPS always uses a very strong cipher suite: peers authenticate each other using 521 bits ECC keys, Diffie-Hellman using ephemeral 521 bits ECC keys is used to provide perfect forward secrecy (PFS), AES-256-CTR is used for encryption, and HMAC-SHA-256 for message authentication.
- 常用端口 655/tcp 655/udp
- macOS
  - https://www.tinc-vpn.org/pipermail/tinc/2016-January/004336.html
  - http://tuntaposx.sourceforge.net/
- 如果有 NAT 问题, 可以在另外一台上不直接连接外部节点, 先连接内部, 连接上后, 网络都能互通
- 参考
  - [How Do I Reach Local Subnet Behind Tinc VPN](https://serverfault.com/q/640020/190601)
  - [Tinc 配置笔记](https://www.jianshu.com/p/e030dabafd61)
  - [使用 Tinc 建立 VPN 连接并配置 NAT 网关](https://groverchou.com/blog/2017/07/23/使用-Tinc-建立-VPN-连接并配置-NAT-网关/)
  - [How to set up OpenVPN to let the VPN clients to access all the servers inside the server LAN?](https://serverfault.com/q/418354/190601)
  - [How to use two gateways with the same IP address?](https://unix.stackexchange.com/q/91123/47774)
  - [用 RouterOS/QEMU 在 Tinc TAP VPN 内部实现 DHCP](https://blog.swineson.me/use-routeros-qemu-as-tinc-tap-vpn-dhcp-server/)
  - https://www.tinc-vpn.org/faq/
  - [Large scale tinc tests](https://www.tinc-vpn.org/pipermail/tinc-devel/2015-September/000790.html)
  - https://www.tinc-vpn.org/packages/
  - https://github.com/gsliepen/tinc
  - https://git.alpinelinux.org/cgit/aports/tree/community/tinc-pre/APKBUILD
  - [freifunk/icvpn](https://github.com/freifunk/icvpn) - InterCity-VPN
  - https://www.tinc-vpn.org/documentation/tinc.conf.5
  - https://www.tinc-vpn.org/documentation-1.1/How-connections-work.html

:::tip

- macOS
  - 目前已经不支持 tuntap
    - 默认使用 utun=tun
    - 不支持 tap - 不能使用 Switch 模式
  - brew 没有 tinc-pre，需要自己添加

:::

```bash
# 推荐使用 tinc-pre 1.1 版本
# 配置更方便使用更简单
apk add tinc-pre

sudo modprobe tun
# echo tun >> /etc/modules
echo tun | sudo tee /etc/modules-load.d/tinc.conf

# 基础配置
# NETNAME 配置生成在 /etc/tinc/first/
NETNAME=first tinc init first
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
cat > tinc-up << SH
#!/bin/sh
ifconfig \$INTERFACE $ADDRESS netmask $NETMASK
SH
cat > tinc-down << SH
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
# curl https://raw.githubusercontent.com/wenerme/homebrew-core/tinc-pre/Formula/tinc-pre.rb > /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core/Formula/tinc-pre.rb
cat << RB > /usr/local/Homebrew/Library/Taps/homebrew/homebrew-core/Formula/tinc-pre.rb
class TincPre < Formula
  desc "Virtual Private Network (VPN) tool"
  homepage "https://www.tinc-vpn.org/"
  url "https://www.tinc-vpn.org/packages/tinc-1.1pre18.tar.gz"
  sha256 "2757ddc62cf64b411f569db2fa85c25ec846c0db110023f6befb33691f078986"

  depends_on "lzo"
  depends_on "openssl"

  def install
    system "./configure", "--prefix=#{prefix}", "--sysconfdir=#{etc}",
                          "--with-openssl=#{Formula["openssl"].opt_prefix}"
    system "make", "install"
  end

  test do
    assert_match version.to_s, shell_output("#{sbin}/tincd --version")
  end
end
RB
# fetch 会显示 sha256 - 可能需要代理
brew fetch --build-from-source tinc-pre
brew install --build-from-source tinc-pre

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

**tinc-up**

```bash
#!/bin/sh
brctl addif br0 $INTERFACE
ifconfig $INTERFACE 0.0.0.0 promisc up

# 该节点作为路由
# iptables -I FORWARD -i $INTERFACE -j ACCEPT
# iptables -t nat -A POSTROUTING -d 10.88.0.0/16 -o $INTERFACE -j MASQUERADE
```

**tinc-fw**

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

## FAQ

### traps: tincd[3995] general protection fault ip:7f6ad09944eb sp:7ffda3da5ea8 error:0 in ld-musl-x86_64.so.1[7f6ad098b000+46000]

tinc pre 运行不稳定，务必配置 openrc 自动重启

### Failed to verify SIG record from infra

签名验证失败，尝试重新 invite

### Got REQ_KEY from node while we already started a SPTPS session!

- [#203](https://github.com/gsliepen/tinc/issues/203)

### 相同 key 或相同 名字？

- tinc 允许相同 key - 但不建议，存在安全隐患
- tinc 不允许相同 name
  - name 在节点里是唯一标识的
- https://www.tinc-vpn.org/pipermail/tinc/2015-May/004137.html

### Peer tries to roll back protocol version to 17.0

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

- https://wiki.archlinux.org/index.php/Network_bridge

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
iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -o eth0 -j MASQUERADE
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
cat > tinc-up << SH
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

## tinc 1.0 升级 1.1

```bash
tinc -n NETNAME generate-ed25519-keys
```

## tinc.netname

```bash
sudo modprobe tun
echo tun | sudo tee /etc/modules-load.d/tinc.conf

sudo nano /etc/init.d/tinc.netname
sudo chmod +x /etc/init.d/tinc.netname

sudo ln -sf /etc/init.d/tinc.netname /etc/init.d/tinc.$NETNAME
sudo service tinc.$NETNAME start
sudo rc-update add tinc.$NETNAME
```

```sh
#!/sbin/openrc-run
supervisor=supervise-daemon

name="TincVPN Daemon"
description="tinc is a Virtual Private Network (VPN) daemon that uses tunnelling and encryption to create a secure private network between hosts on the Internet."
description_reload="Reload configuration without exiting"

# tinc.netname -> netname
NETNAME=${RC_SVCNAME##*.}
: ${TINC_DEBUG:=0}

command=/usr/sbin/tincd
command_args="-n $NETNAME -d $TINC_DEBUG $TINC_OPTS"
command_args_foreground="-D"

TINC_LOGFILE="${TINC_LOGFILE:-/var/log/${RC_SVCNAME}.log}"
TINC_ERRFILE="${TINC_ERRFILE:-${TINC_LOGFILE}}"
TINC_OUTFILE="${TINC_OUTFILE:-${TINC_LOGFILE}}"
supervise_daemon_args="--stderr \"${TINC_ERRFILE}\" --stdout \"${TINC_OUTFILE}\""

extra_started_commands="reload"
retry="${TINC_RETRY:-TERM/60/KILL/10}"

depend() {
  use logger dns
  need net
}

checkconfig() {
  # warn this if not found
  if [ ! -f "/etc/tinc/$NETNAME/tinc.conf" ]; then
    eerror "No VPN network configured"
    return 1
  fi
  return 0
}

reload() {
  ebegin "Reloading configuration"
  $supervisor $RC_SVCNAME --signal HUP
  eend $?
}
```
