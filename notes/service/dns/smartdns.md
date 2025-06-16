---
title: SmartDNS
---

# SmartDNS

```bash
mkdir -p smartdns/conf
nano smartdns/smartdns.conf
docker run --rm -it \
  -v $PWD/smartdns/conf:/etc/smartdns \
  -v $PWD/smartdns/data:/data \
  -p 5353:5353/udp \
  -p 5353:5353 \
  -p 5354:5354 \
  --name smartdns pymumu/smartdns:latest

dig wener.me @127.0.0.1 -p 5353 +tcp

# https://adrules.top/smart-dns.conf
# https://raw.githubusercontent.com/neodevpro/neodevhost/master/lite_smartdns.conf

# 引入配置 conf-file /etc/smartdns/anti-ad-smartdns.conf
curl -L https://anti-ad.net/anti-ad-for-smartdns.conf -o smartdns/conf/anti-ad-smartdns.conf

# https://github.com/521xueweihan/GitHub520
curl -L https://raw.githubusercontent.com/521xueweihan/GitHub520/refs/heads/main/hosts -o smartdns/conf/github520.hosts.txt

# reload
# kill -HUP 1
docker kill -s HUP smartdns

# 获取 SPKI
echo | openssl s_client -connect '1.0.0.1:853' 2> /dev/null | openssl x509 -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64
```

```conf
bind 0.0.0.0:20853
bind-tcp 0.0.0.0:20853

log-level notice
log-file /data/smartdns.log

server-h3 223.5.5.5
server-tls 223.5.5.5 -bootstrap-dns
server-tls 223.6.6.6
server-tls dot.pub
server-https doh.pub

server-tls 8.8.8.8 -group global -e
server-quic 1.1.1.1 -group global -e

server 223.5.5.5 -e -group fallback
server 114.114.114.114 -e -group fallback -bootstrap-dns

cache-size 32768
cache-persist yes
cache-file /data/smartdns.cache
```

```conf
cache-size 32768
cache-persist yes
cache-file /cache/smartdns.cache
prefetch-domain yes

serve-expired yes
serve-expired-ttl 259200
serve-expired-reply-ttl 3
serve-expired-prefetch-time 21600

domain-rules /example.com/ -no-cache
# 定时保存
cache-checkpoint-time 86400


# 分流
.home -> 192.168.1.1 # .home 结尾的域名发送到 192.168.1.1 解析
.office -> 10.0.0.1  # .office 结尾的域名发送到 10.0.0.1 解析

# 上游服务器规则，.home结尾的域名全部使用home组的服务器查询
nameserver /home/home
# 上游服务器规则，.office结尾的域名全部使用office组查询。
nameserver /office/office

# 可以关闭 HTTPS 查询，解决 iOS 系统解析缓慢问题
force-qtype-SOA 65
```

- server
  - server, server-tcp, server-tls, server-https, server-quic, server-h3
  - `-g|-group`, `-e|-exclude-default-group`, `-b|-bootstrap-dns`, `-interface`
  - `-proxy PROXY_NAME`
  - -tcp-keepalive
  - tls
    - -host-ip, -tls-host-verify, -host-name, -spki-pin, `-k|-no-check-certificate`
  - http
    - `-http-host`
- server 默认读取 /etc/resolv.conf

**域名规则**

```
domain-set -name ad -file /etc/smartdns/ad-list.conf
address /domain-set:ad/#
domain-rules /domain-set:ad/ -a #
nameserver /domain-set:ad/server
```

**上游服务器**

```conf
server-https https://223.5.5.5/dns-query # 阿里云DOH（国内最快）223.5.5.5
server-https https://doh.pub/dns-query # 腾讯DOH（低延迟）1.12.12.21
server-https https://doh.360.cn # 360DOH（备用）36.99.170.86
server 180.76.76.76 #百度DNS
server 180.184.1.1 #字节跳动
server 180.184.2.2 #字节跳动
server 202.100.96.68 # 宁夏电信IPv4 DNS（银川）
server 218.203.123.116 # 宁夏移动IPv4 DNS（银川）
server 218.203.123.132 # 宁夏移动IPv4 DNS（银川）
server-tls tls://dot.pub #腾讯公共TLS 1.12.12.21
server-tls tls://dns.alidns.com #阿里公共TLS 223.6.6.6
server-tls tls://dot.360.cn #360 DOT 36.99.170.86

server-https https://dns64.dns.google/dns-query
server-https https://208.67.222.222/dns-query
server-https https://101.101.101.101/dns-query
server-tls tls://1.0.0.1
server-tls tls://1.1.1.1
server-https https://doh.applied-privacy.net/query
server-https https://1.0.0.1/dns-query
server-https https://149.112.112.112/dns-query
server-https https://208.67.220.220/dns-query
server-quic quic://dns.adguard-dns.com
server-tls tls://dns.adguard-dns.com

# force-AAAA-SOA yes # 如果有 IPv6 推荐
```
