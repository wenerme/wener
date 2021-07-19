---
title: NMap
---

# nmap

## Tips

- https://nmap.org/nsedoc/scripts/smb-protocols.html
- https://hackertarget.com/nmap-cheatsheet-a-quick-reference-guide/

```bash
apk add nmap nmap-scripts

# UDP 端口扫描
# 需要 ICMP, 所以要 sudo
# 可能会不准 https://en.wikipedia.org/wiki/Port_scanner#UDP_scanning
sudo nmap -sU -p port target

# 枚举 smb 共享
nmap --script smb-enum-shares.nse -p445

# 协议探测
nmap -p445 --script smb-protocols 192.168.0.0/24
nmap -p139 --script smb-protocols

# UDP
# Listen
netcat -ul 2115
# 端口检测
netcat -zv -u 127.0.0.1  2115
ls /usr/local/opt/nmap/bin
# ncat  ndiff  nmap  nping  uninstall_ndiff

# 监听 UDP
ncat -vvvkul 0.0.0.0 18009 --exec 'echo found'
# 测试端口开发
nmap -sU -p 18009 127.0.0.1
# 测试数据发送
echo check | ncat -vu 192.168.8.110 18009

# https://nmap.org/ncat/guide/ncat-usage.html
man ncat


# 端口转发
# 可使用变量
# NCAT_REMOTE_ADDR, NCAT_REMOTE_PORT
# NCAT_LOCAL_ADDR, NCAT_LOCAL_PORT
# NCAT_PROTO
ncat -l localhost 8080 --sh-exec "ncat wener.me 80"
```

## scripts

- [Service and Application Version Detection](https://nmap.org/book/vscan.html)

```bash
# 自动扫描
nmap -v -sV -p 30543 127.0.0.1

# 基于 port 信息匹配协议
nmap -v --script brute -sV -p 5432 <ip>
# + skip version detection - force script run
nmap -v --script +pgsql-brute -p 5432 <ip>
```
