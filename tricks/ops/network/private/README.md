---
id: intro
title: 私有网络
---

# 私有网络

## Tips
* [TORRENT PROXY: SOCKS VS. HTTP](https://www.best-bittorrent-vpn.com/socks-vs-http-proxy-for-torrents.html)
* 常用的代理变量
  * https_proxy
  * http_proxy
  * all_proxy
* VPN
  * https://github.com/ntop
  * https://github.com/SoftEtherVPN/SoftEtherVPN
  * Configuration & ease of use: ZT > Tinc Connectivity: Tinc > ZT
  * https://github.com/StreisandEffect/streisand
  * https://github.com/trailofbits/algo

### iOS
* https://github.com/chrisballinger/ProxyKit
  * SOCKS proxy server and socket client built upon GCDAsyncSocket.

## Shadowsocks
* https://github.com/haxpor/Potatso
* https://github.com/shadowsocks
* [Outline](https://www.getoutline.org)
  * Google 团队出品
  * 基于 Shadowsocks
  * 提供服务端和管理终端
  * 官方 iOS 和 Android 应用
  * [Jigsaw-Code/outline-ss-server](https://github.com/Jigsaw-Code/outline-ss-server)
    * 新版 Go 实现的服务端

## StrongSwan

### IKEv2
* 通过 strongSwan 提供 IKEv2
* DockerHub [ikev2-vpn-server](https://hub.docker.com/r/gaomd/ikev2-vpn-server)

```bash

docker run -d --restart always --privileged \
  -p 500:500/udp -p 4500:4500/udp \
  --name ikev2-vpn-server gaomd/ikev2-vpn-server:0.3.0


# 将 vpn1.example.com 修改为机器的 IP 地址
docker run -i -t --rm --volumes-from ikev2-vpn-server -e "HOST=vpn1.example.com" gaomd/ikev2-vpn-server:0.3.0 generate-mobileconfig > ikev2-vpn.mobileconfig


# 生成的秘钥位于 /etc/ipsec.secrets
# 如果还想二次使用, 可以拷贝出来
docker cp ikev2-vpn-server:/etc/ipsec.secrets .
# 如果已经有了 PKI
echo ": PSK \"$IKEV2_PKI\"" > ipsec.secrets
# 使用现有的 PKI 启动
docker run -d --restart always --privileged \
  -p 500:500/udp -p 4500:4500/udp -v $PWD/ipsec.secrets:/etc/ipsec.secrets  \
  --name ikev2-vpn-server gaomd/ikev2-vpn-server:0.3.0

```

## HTTP
* 通过 HTTP 的 Connect 方法实现代理
* 大多数软件都支持，使用最为广泛
* [elazarl/goproxy](https://github.com/elazarl/goproxy)
  * An HTTP proxy library for Go
* 因为部分的工具只能使用 HTTP 代理
  * 例如 wget

## SOCKS
* 性能比 HTTP 更高，但不是所有软件都支持
* [armon/go-socks5](https://github.com/armon/go-socks5)
  * SOCKS5 server in Golang
* [SOCKS](https://zh.wikipedia.org/wiki/SOCKS)
* [ss5](http://ss5.sourceforge.net/)
* [delegate](http://www.delegate.org/)
  * Fork [rickyzhang82/delegate](https://github.com/rickyzhang82/delegate)
* [srelay](http://socks-relay.sourceforge.net/)

```bash
# 最简单的 socks 代理方式
# 通过 ssh 提供 socks 代理
ssh -vgCD 8888 root@my-server

# 使用 socks 代理
https_proxy=socks://127.0.0.1:8888 curl https://google.com
```

## 应用代理

### proxychains-ng
* [rofl0r/proxychains-ng](https://github.com/rofl0r/proxychains-ng)
* 针对应用进行代理，通过 preload 来将运行时的网络请求进行动态代理。

```bash
# macOS
brew install proxychains-ng

# 网络请求会被代理
proxychains4 curl google.com
```

## FAQ

### SOCKS vs HTTP vs HTTPS
* HTTP
  * 支持最广泛的协议
  * 基于 HTTP 的 CONNECT 方法 - 7 层协议
  * wget 只支持 http
  * 一般支持 Basic 鉴权
  * 请求是明文感知更多细节
  * 支持复杂转发逻辑
    * 路径
    * 域名
    * 头
  * 可以配合缓存服务使用
    * 例如 squid
  * 可以做 TCP 通道
* SOCKS
  * 支持程度仅次于 HTTP
  * TCP 协议 - 5 层协议
  * 支持 UDP
  * 最容易的协议 - `ssh -d 1080`
  * 基于握手进行协商，一个地址一个端口进行映射
  * DNS 在远程进行解析
* HTTPS
  * 使用极少

### Tinc vs ZeroTier vs Wireguard vs IPSec vs SoftEther
* 共同点
  * P2P 协议
  * 支持加密
* Tinc 完全中心化，无控制器，网络连接性会更好，tinc 1.1pre 使用非常简单
  * 开源的 Android 和 iOS 应用，但未维护了
  * 支持 UDP
  * 支持 Switch 模式 - 2 层网络 - MAC 寻址
  * 默认 Router 模式 - TCP/IP 寻址
  * 单线程 - 性能有一定瓶颈 - 例如 1Gb 网卡可能只能跑满 300-600 Mb
  * 用户空间
  * 安装使用配置方便 - 1.1 版本
  * 实现简单 LOC ~ 3k
* ZeroTier 有中心控制器，能够进行验证授权，使用简单，有管理接口和页面
  * 闭源 Android 和 iOS 应用 - 可在应用商店安装
  * 对于 SelfHost 中心节点不友好 - 简单配置是基于使用 ZeroTier 的服务之上
  * QoS 控制
  * 基于 TCP
  * 支持文本配置路由
  * 网络连接性 < TINC、配置性 > TINC
* Wireguard
  * 目前没有比较好的 mesh 方案 - 需要所有节点配置
  * 节点不能自动发现
  * 需要节点之间直连 - 不能通过中继访问
  * 只支持 Layer 3 - 不能 DHCP 或桥接 - 使用 IP 寻址
  * 使用 UDP 通信
  * 替代 OpenVPN 和 IPsec
  * 实现简单 LOC ~ 4k
  * 开源可用的 Android 和 iOS 应用
  * 客户端支持广泛
  * 需要内核支持
* IPSec
  * 开源成熟的标准
  * 客户端使用相对没那么友好
  * 服务端初次配置相对复杂
  * 高性能 - 如果只在服务端使用需要很高的性能则优先选择 IPSec - 1Gb 网络基本能达到 900+Mb
  * Android 和 iOS 原生支持
* [SoftEther](https://en.wikipedia.org/wiki/SoftEther_VPN)
  * 支持多路负载
  * 权限控制

__性能对比__

iperf3\10s | Transfer | Bitrate
-----------|----------|---------
原始 | 1.10 GBytes | 943 Mbits/sec
TINC | 385 MBytes | 323 Mbits/sec
WireGuard | 1.05 GBytes | 898 Mbits/sec

> TINC 最弱 - 因为服务器单核较弱
> Intel(R) Xeon(R) CPU E5-2651 v2 @ 1.80GHz

### StrongSwan vs Openswan vs Libreswan vs Freeswan
* FreeS/WAN
* Libreswan 即 Openswan
  * 2003 fork freeswan 命名为 openswan
  * 2011 被强制要求更名 - 命名为 libreswan
  * 支持更多[硬件加密](https://libreswan.org/wiki/OCF_Hardware_crypto_acceleration) - 可能需要内核补丁
* StrongSwan
  * 相较 Libreswan 做了更多的提升和文档
  * 支持 EAP - 更易于集成
  * 支持[集群](https://wiki.strongswan.org/projects/strongswan/wiki/HighAvailability)
  * __不支持__ [OE](https://wiki.strongswan.org/issues/2160)

> *参考*
>
> 1. [Libreswan History](https://libreswan.org/wiki/History)
> 2. [strongswan vs openswan](https://serverfault.com/a/655752/190601)

### Site to Site/站点对站点 VPN
* 连接两个子网
* 连接地域上分离的两个网络
* 例如
  * 开发人员 -VPN-> Site to Site VPN --> 阿里云内网
