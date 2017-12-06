# Proxy

## Tips

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

__socks2http.conf__
```conf
# 极简配置, 将 socks 转为 http
listen-address  0.0.0.0:7777
forward-socks5t /             127.0.0.1:8888 .
```

```bash
# 配置文件检测
privoxy --config-test socks2http.conf
# 在前台运行
privoxy --no-daemon socks2http.conf
```

## SOCKS
* [armon/go-socks5](https://github.com/armon/go-socks5)
  * SOCKS5 server in Golang
* https://zh.wikipedia.org/wiki/SOCKS
