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
  * 

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


### tinyproxy
* [tinyproxy](https://tinyproxy.github.io/)
* [tinyproxy.conf](https://github.com/tinyproxy/tinyproxy/blob/master/etc/tinyproxy.conf.in)
* 轻量级的 HTTP/HTTPS 代理

```bash
# macOS 安装
brew info tinyproxy

# AlpineLinux
apk add tinyproxy
```


### privoxy
* 提供 HTTP 代理
* 支持将二级代理
  * 例如将 SOCKS 代理转为 HTTP 代理
* [privoxy](https://www.privoxy.org/)


```bash
# macOS
brew install privoxy

# AlpineLinux
apk add privoxy
# 配置文件检测
privoxy --config-test privoxy.conf
# 在前台运行
privoxy --no-daemon privoxy.conf

# 通过 ip 限制访问
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  -p 127.0.0.1:7777:7777 \
  --name privoxy wener/privoxy
```

__privoxy.conf__
```conf
# 极简配置, 将 socks 转为 http
listen-address  0.0.0.0:7777
# 不转发会直接通过本地访问 - 取决于部署在本地还是服务器
forward-socks5t /             127.0.0.1:8888 .
```


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

### Dante
* 提供 SOCKS 服务和客户端
* [dante](http://www.inet.no/dante/)
  * consists of a SOCKS server and a SOCKS client
* [document](http://www.inet.no/dante/doc/1.4.x/index.html)
* https://pkgs.alpinelinux.org/package/edge/testing/x86_64/dante
* https://lvii.gitbooks.io/outman/content/dante.html

```bash
# macOS 安装
brew install dante --with-miniupnpc

# 服务端安装
apk add --no-cache -X http://mirrors.aliyun.com/alpine/edge/testing dante{,-server}

nano /etc/sockd.conf  
# 校验配置文件
sockd -V -f test.conf

# Docker 启动
# 通过 ip 限制访问
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  -p 127.0.0.1:8888:8888 \
  --name dante wener/dante
```

__sockd.conf__

```conf
logoutput: stderr
# 监听地址
internal: 0.0.0.0 port = 8888
# 出口网卡或地址
external: eth0
clientmethod: none
socksmethod: none
user.privileged: root
user.unprivileged: nobody
client pass {
        from: 0.0.0.0/0 to: 0.0.0.0/0
        log: error
}
client block {
        from: 0.0.0.0/0 to: 127.0.0.0/8
        log: error
}
socks pass {
        from: 0.0.0.0/0 to: 0.0.0.0/0
        command: bind connect udpassociate
}
socks pass {
        from: 0.0.0.0/0 to: 0.0.0.0/0
        command: bindreply udpreply
        log: error
}
socks block {
        from: 0.0.0.0/0 to: 127.0.0.0/8
        command: bind connect udpassociate
        log: connect error
}
```

#### sockd

```
Dante v1.4.2.  Copyright (c) 1997 - 2014, Inferno Nettverk A/S, Norway.
usage: sockd [-DLNVdfhnv]
   -D             : run in daemon mode
   -L             : shows the license for this program
   -N <number>    : fork of <number> servers [1]
   -V             : verify configuration and exit
   -d <number>    : set degree of debugging
   -f <filename>  : use <filename> as configuration file [/etc/sockd.conf]
   -h             : print this information
   -n             : disable TCP keep-alive
   -p <filename>  : write pid to <filename> [/var/run/sockd.pid]
   -v             : print version info
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

### Tinc vs ZeroTier vs Wireguard
* 共同点
    * P2P 协议
* Tinc 完全中心化，无控制器，网络连接性会更好，tinc 1.1pre 使用非常简单
    * 开源的 Android 和 iOS 应用，但未维护了
    * 支持 UDP
* ZeroTier 有中心控制器，能够进行验证授权，使用简单，有管理接口和页面
    * 闭源 Android 和 iOS 应用，可在应用商店安装
    * 更好的 QoS 控制
    * 基于 TCP
