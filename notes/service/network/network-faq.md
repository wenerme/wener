---
title: Network FAQ
tags:
  - FAQ
---

# Network FAQ

## 反电信网络诈骗

curl 一个地址的时候，返回 302 到 183.192.65.101。

目前无解，只能代理。

- 183.192.65.101
- 上海市反电信网络诈骗中心

## TURN vs STUN

- STUN
  - 实现 NAT 穿透、端口映射
  - 实现信令能力
  - 资源占用低，服务器流量很小
  - 通常有公共的 stun 服务 - 无需授权
- TURN
  - 中继，无法 NAT 穿透时
  - 实现中继代理请求
  - 资源占用高，服务器流量大
  - 不存在公共的 turn 服务 - 通常需要授权

## 简单的端口排查

```bash
# nc - busybox
# ==========
# UDP
nc -u -l -p 12345 -e cat
echo test | nc -u -w 2 127.0.0.1 12345
# TCP
nc -l -p 12345 -e cat
echo test | nc -w 2 127.0.0.1 12345

# ncat - nmap
# ==========
ncat -ulk -e /bin/cat 12345

# socat
# ==========
socat -u udp-l:12345,fork exec:/bin/cat
echo "test" | socat -u - udp:127.0.0.1:12345

socat -u tcp-l:12345,fork exec:/bin/cat
echo "test" | socat -u - tcp:127.0.0.1:12345
```

## 保留来源IP

- PROXY
- mmproxy
  - remote PROXY -> mmproxy PROXY -> localhost
  - [cloudflare/mmproxy](https://github.com/cloudflare/mmproxy)
  - https://blog.cloudflare.com/mmproxy-creative-way-of-preserving-client-ips-in-spectrum/
- [TPROXY](./tproxy.md)
  - linux 内核模块
  - HAProxy 支持 https://gist.github.com/mhofman/a01df56480b3791d526b77dbebef43a2#haproxy-transparent-support
    - `server app1-tls 192.0.2.10:3001 source * usesrc client weight 0`
    - usesrc
  - https://docs.kernel.org/networking/tproxy.html

## 保留网络

- [RFC 5737](https://datatracker.ietf.org/doc/html/rfc5737): “IPv4 Address Blocks Reserved for Documentation”
  - TEST-NET
  - 192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24
- RFC 3849 IPv6 Address Prefix Reserved for Documentation
  - 2001:DB8::/32
- 域名
  - .test
  - .example
  - .invalid
  - .localhost
  - .internal

## latency

```bash
ping 1.1.1.1

time ssh svr-1 exit

time nc -zv 192.168.1.1 22

hping3 -S -p 22 192.168.1.1

sshp user@your-server

# MTR 支持 TCP 模式
# 'traceroute' and 'ping' in a single tool
mtr -P 22 --tcp your-server
```

- iperf3
- https://github.com/Samsar4/Ethical-Hacking-Labs/blob/master/2-Scanning-Networks/1-hping3.md
