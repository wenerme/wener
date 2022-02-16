---
id: dns
title: DNS
---

# DNS

## Tips
* [Comparison of DNS server software](https://en.wikipedia.org/wiki/Comparison_of_DNS_server_software)
* [DNS RFC](https://www.isc.org/community/rfcs/dns/)
* [rfc2136](https://tools.ietf.org/html/rfc2136) - Dynamic Updates in the Domain Name System (DNS UPDATE)
  * [Dynamic DNS:wiki](https://en.wikipedia.org/wiki/Dynamic_DNS)
  * caddy [tls.dns.rfc2136](https://caddyserver.com/docs/tls.dns.rfc2136)
* [intodns](https://intodns.com)
  * DNS 检测
* [DNS](https://zh.wikipedia.org/zh-cn/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%BB%9F)
* [List of DNS record types](https://en.wikipedia.org/wiki/List_of_DNS_record_types)
* 刷新 Google [Public DNS](https://developers.google.com/speed/public-dns/cache)
* SOA - Start of [a zone of] authority record
```
Primary nameserver: ns.wener.me
Hostmaster E-mail address: hostmaster.i.wener.me
Serial #: 1
Refresh: 10800
Retry: 3600
Expire: 604800   1 weeks
Default TTL: 3600
```
* TSIG - Transaction Signature
* KSK - Key Signing Key
  * 是一对公钥私钥.
  * 私钥用于生成 ZSK 的数字签名. 公钥存储于 DNS, 用于对 ZSK 进行认证
* ZSK - Zone Signing Key
  * 是一对公钥私钥.
  * 私钥用于生成数字签名, 即为每个 RRSET 生成 RSSIG(Resource Record Signature).公钥存储于 DNS 用于对 RRSIG 进行认证.
  * 每个 DNSSET 中签名的 zone 都由 RRSIG 保护
* AXFR - Authoritative Zone Transfer
  * [DNS zone transfer](https://en.wikipedia.org/wiki/DNS_zone_transfer)
  * PowerDNS [AXFR-FAQ](https://github.com/PowerDNS/pdns/wiki/AXFR-FAQ)
* References
  * [How DNSSEC works](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/)
  * http://tinydns.org/
  * https://github.com/miekg/dns
  * [Authoritative vs. Recursive DNS Servers: What’s The Difference?](http://social.dnsmadeeasy.com/blog/authoritative-vs-recursive-dns-servers-whats-the-difference/)
  * dnsimple [DNS FAQ](https://support.dnsimple.com/categories/dns/)
  * [Differences between the A, CNAME, ALIAS and URL records](https://support.dnsimple.com/articles/differences-between-a-cname-alias-url/)


## 服务
* https://www.knot-dns.cz/
  * C + Lua

* [tenta-browser/tenta-dns](https://github.com/tenta-browser/tenta-dns) Recursive and authoritative DNS server in go, including DNSSEC and DNS-over-TLS
  * [HN](https://news.ycombinator.com/item?id=15796943)
 
## coredns
* https://coredns.io/
* https://github.com/coredns/coredns
* CNCF 下的项目


```bash
coredns -conf Corefile -dns.port 1053

dig -p 1053 @localhost AAAA www.example.org +noall +answer

nslookup -type=A twitter.com 1.0.0.1
nslookup -type=A twitter.com 114.114.114.114
```

## dnsupdate
* [nsupdate.8](https://linux.die.net/man/8/nsupdate)

```bash
# 更新 NS 记录的函数
ns_update_record(){
  nsupdate -y $TSIG_NAME:$TSIG_SECRET <<!
  update delete $1 $3
  update add $1 $2 $3 $4
  send
  !
}
# ns_update_record test.wener.me 600 A 192.168.1.1
```

## dig

```bash
# 所有 IP
dig +short amazon.com
# 所有 NS
dig NS +short amazon.com
# 请求过程
dig amazone.com +trace
# 通过 IP 请求域名
dig +short -x 8.8.8.8
# 顶级域名的 NS
dig +short NS me.
# 指定请求的 ns
dig google.com @8.8.8.8
# 获取超时时间
dig google.com +noall +answer
# 判断是否所有 NS 都同步了域名, 主要通过 SOA 序号判断
dig google.com +nssearch
# 看域名在 DNS 上是否存在
dig SOA google.nl @ns1.dns.nl.
```

### FAQ

#### 公共 DSN
* https://public-dns.info/
* https://wiki.ipfire.org/dns/public-servers
* https://www.lifewire.com/free-and-public-dns-servers-2626062
* https://www.dnsperf.com

* 8.8.8.8
* 8.8.4.4
* 223.6.6.6
* 223.5.5.5
* 114.114.114.114
* 1.1.1.1 
  * https://blog.cloudflare.com/dns-resolver-1-1-1-1/
* 1.0.0.1


#### 将日志记录到文件

修改配置,调整 syslog 输出
```
# 使用 LOCAL0 作为日志输出
logging-facility=0
```

重定向 syslog 输出

```
# 修改 syslog.conf
local0	/var/log/pdns.log
```

#### DDNS
* https://wiki.archlinux.org/index.php/Dynamic_DNS

修改 pdns.conf 启用 dnsupdate
```
# 启用
dnsupdate=yes
# 默认是 0.0.0.0/0, 置空则禁止所有
allow-dnsupdate-from=
```

```bash
# 生成 TSIG
pu generate-tsig-key home-test hmac-md5
# 为该 ZONE 设置允许修改
pu set-meta i.wener.me ALLOW-DNSUPDATE-FROM 0.0.0.0/0
# 使用 nsupdate 更新记录
nsupdate <<!
server 127.0.0.1 5300
zone i.wener.me
update delete dev.i.wener.me. A
update add dev.i.wener.me. 3600 A 127.0.0.4
key home-wener jI8oJLnLIVOEc6QR7fCUylRnpiD3DL4yXgvBQoaAodM=
send
!

# 生成另外一个 tsig
pu generate-tsig-key home-test2 hmac-md5
# 修改为只允许指定的 tsig 修改
pu set-meta i.wener.me TSIG-ALLOW-DNSUPDATE home-test2
```

### 优化
* [Performance and Tuning](https://doc.powerdns.com/md/authoritative/performance/)
* 查询缓存
* 包缓存
* 监控统计
* 日志
* 后端缓存

```
# 以下的值均为默认值

# SO_REUSEPORT
reuseport=no
# 启动监听的线程数, 一般建议 3-4
receiver-threads=1
# 每个接收线程对应的后端线程数
distributor-threads=3
# 包缓存的时间, 将包缓存后不需要请求后端来从新组装一个完整的数据包
# 设置为 60 一般不会有问题
# 也可以将该值设置为几个小时, 需要清除缓存的时候通过 pdns_control purge 来清除
cache-ttl=20
# 缓存查询和结果的时间
query-cache-ttl=20
# 缓存查询但不缓存结果的时间
negquery-cache-ttl=60
```
