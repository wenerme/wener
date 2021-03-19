---
title: ngrep
---

# ngrep
* [ngrep usage](http://ngrep.sourceforge.net/usage.html)

```
ngrep -q -d eth1 -W byline host stackoverflow.com and port 80
       ^  ^       ^         ^
       |  |       |         |
       |  |       |         |
       |  |       |         v
       |  |       |         filter expression
       |  |       |
       |  |       +-->  -W  is set the dump format ("normal", "byline", "single", "none")
       |  |
       |  +---------->  -d  is use specified device instead of the pcap default
       |
       +------------->  -q  is be quiet ("don't print packet reception hash marks")
```

```bash
ngrep -d any port 25

# 过滤 syslog 端口里的 error 关键字
ngrep -d any 'error' port syslog

# FTP 里的账号密码
ngrep -wi -d any 'user|pass' port 21

ngrep -W byline port 80

# 查看本地 DNS 查询
ngrep -d lo -x port 53

# 输出 dump
ngrep -O /tmp/dns.dump -d any -T port domain
# 读取 dump
ngrep -w 'm'  -I /tmp/dns.dump
ngrep -tD ns3  -I /tmp/dns.dump
```
