# Proxy

## Tips

* [TORRENT PROXY: SOCKS VS. HTTP](https://www.best-bittorrent-vpn.com/socks-vs-http-proxy-for-torrents.html)

### iOS
* https://github.com/chrisballinger/ProxyKit
  * SOCKS proxy server and socket client built upon GCDAsyncSocket.

## Shadowsocks
* https://github.com/haxpor/Potatso
* https://github.com/shadowsocks

## IKEv2

* https://hub.docker.com/r/gaomd/ikev2-vpn-server/

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
* [elazarl/goproxy](https://github.com/elazarl/goproxy)
  * An HTTP proxy library for Go
* 因为部分的工具只能使用 HTTP 代理
  * 例如 wget



## SOCKS
* [armon/go-socks5](https://github.com/armon/go-socks5)
  * SOCKS5 server in Golang
* [SOCKS](https://zh.wikipedia.org/wiki/SOCKS)
* [ss5](http://ss5.sourceforge.net/)
* [delegate](http://www.delegate.org/)
  * Fork [rickyzhang82/delegate](https://github.com/rickyzhang82/delegate)
* [srelay](http://socks-relay.sourceforge.net/)


## Dante
* [dante](http://www.inet.no/dante/)
  * consists of a SOCKS server and a SOCKS client
* [document](http://www.inet.no/dante/doc/1.4.x/index.html)
* https://pkgs.alpinelinux.org/package/edge/testing/x86_64/dante
* https://lvii.gitbooks.io/outman/content/dante.html

```bash
# macOS
brew install dante --with-miniupnpc

# 服务端
apk add --no-cache -X http://mirrors.aliyun.com/alpine/edge/testing dante{,-server}

nano /etc/sockd.conf  
# 校验配置文件
sockd -V -f test.conf

```

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

* sockd

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

## tinyproxy
a light-weight HTTP/HTTPS proxy daemon for POSIX operating systems
https://pkgs.alpinelinux.org/package/edge/main/x86_64/tinyproxy

https://tinyproxy.github.io/

* [tinyproxy.conf](https://github.com/tinyproxy/tinyproxy/blob/master/etc/tinyproxy.conf.in)


## privoxy
* https://pkgs.alpinelinux.org/package/edge/main/x86_64/privoxy


```bash
apk add privoxy
# 配置文件检测
privoxy --config-test privoxy.conf
# 在前台运行
privoxy --no-daemon privoxy.conf
```

__privoxy.conf__
```conf
# 极简配置, 将 socks 转为 http
listen-address  0.0.0.0:7777
forward-socks5t /             127.0.0.1:8888 .
```
