---
id: intro
title: 私有网络
---

# 私有网络

## Tips

- [TORRENT PROXY: SOCKS VS. HTTP](https://www.best-bittorrent-vpn.com/socks-vs-http-proxy-for-torrents.html)
- 常用的代理变量
  - https_proxy
  - http_proxy
  - all_proxy
- VPN
  - https://github.com/ntop
  - [SoftEtherVPN/SoftEtherVPN](https://github.com/SoftEtherVPN/SoftEtherVPN)
  - Configuration & ease of use: ZT > Tinc Connectivity: Tinc > ZT
  - [StreisandEffect/streisand](https://github.com/StreisandEffect/streisand)
    - 脚本部署 WireGuard, OpenConnect, OpenSSH, OpenVPN, Shadowsocks, sslh, Stunnel, Tor bridge
  - [trailofbits/algo](https://github.com/trailofbits/algo)
    - Ansible 脚本部署 VPN

### iOS

- https://github.com/chrisballinger/ProxyKit
  - SOCKS proxy server and socket client built upon GCDAsyncSocket.

## Shadowsocks

- https://github.com/haxpor/Potatso
- https://github.com/shadowsocks
- [Outline](https://www.getoutline.org)
  - Google 团队出品
  - 基于 Shadowsocks
  - 提供服务端和管理终端
  - 官方 iOS 和 Android 应用
  - [Jigsaw-Code/outline-ss-server](https://github.com/Jigsaw-Code/outline-ss-server)
    - 新版 Go 实现的服务端

## StrongSwan

### IKEv2

- 通过 strongSwan 提供 IKEv2
- DockerHub [ikev2-vpn-server](https://hub.docker.com/r/gaomd/ikev2-vpn-server)

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

- 通过 HTTP 的 Connect 方法实现代理
- 大多数软件都支持，使用最为广泛
- [elazarl/goproxy](https://github.com/elazarl/goproxy)
  - An HTTP proxy library for Go
- 因为部分的工具只能使用 HTTP 代理
  - 例如 wget

## SOCKS

- 性能比 HTTP 更高，但不是所有软件都支持
- [armon/go-socks5](https://github.com/armon/go-socks5)
  - SOCKS5 server in Golang
- [SOCKS](https://zh.wikipedia.org/wiki/SOCKS)
- [ss5](http://ss5.sourceforge.net/)
- [delegate](http://www.delegate.org/)
  - Fork [rickyzhang82/delegate](https://github.com/rickyzhang82/delegate)
- [srelay](http://socks-relay.sourceforge.net/)

```bash
# 最简单的 socks 代理方式
# 通过 ssh 提供 socks 代理
ssh -vgCD 8888 root@my-server

# 使用 socks 代理
https_proxy=socks://127.0.0.1:8888 curl https://google.com
```

## 应用代理

### proxychains-ng

- [rofl0r/proxychains-ng](https://github.com/rofl0r/proxychains-ng)
- 针对应用进行代理，通过 preload 来将运行时的网络请求进行动态代理。

```bash
# macOS
brew install proxychains-ng

# 网络请求会被代理
proxychains4 curl google.com
```
