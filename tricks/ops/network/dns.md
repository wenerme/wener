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

https://github.com/tenta-browser/tenta-dns
https://news.ycombinator.com/item?id=15796943
Recursive and authoritative DNS server in go, including DNSSEC and DNS-over-TLS 

## coredns
* https://coredns.io/
* https://github.com/coredns/coredns
* CNCF 下的项目


```bash
coredns -conf Corefile -dns.port 1053

dig -p 1053 @localhost AAAA www.example.org +noall +answer
```

## PowerDNS
* [PowerAdmin](http://www.poweradmin.org/) 网页管理工具
* Auth server [settings](https://doc.powerdns.com/md/authoritative/settings/)
* [PowerDNS/pdns](https://github.com/PowerDNS/pdns)
* 特性
  * 多种后端
  * 多种复制方式
  * 修改不需要重启
  * 定制缓存
  * Supermaster
    * 当为一个节点设置了 Supermaster 后,在主节点上创建 zone,所有子节点会自动创建相应的 zone, 并发起一个 AXFR 请求
    * bind 中需要手动为所有子节点添加 zone
* RELEASE
  * 4.1.0
    * 添加 metadata 接口
    * 移除 auth 服务中的递归
* NOTES
  * 当找到一条匹配的后不会再尝试使用通配符查找
    * 例如 *.example.org A 192.168.1.1, test.example.org TXT Test, 当查询 ANY test.example.org 只会返回 TXT

```bash
# SQLite3
# https://doc.powerdns.com/md/authoritative/backend-generic-sqlite/
# 将 Schema 保存到 schema.sqlite3
sqlite3 powerdns.sqlite .read schema.sqlite3
# 在前台启动, 之所以修改 端口和 socket-dir 是因为可能会没有权限
pdns_server --daemon=no --launch=gsqlite3 --local-port=5300 --socket-dir=`pwd`/socket
# 将配置文件写入到 pdns.conf
# launch=gsqlite3
# local-port=5300
# socket-dir=./socket
# gsqlite3-database=powerdns.sqlite
# 使用配置文件启动
pdns_server --daemon=yes --config-dir=.

# pdns_control 用于操作实例
# 简化 pdns_control 操作
alias pc="pdns_control --config-dir=`pwd`"
# 退出服务
pc quite
# 获取当前的配置
pc current-config

# pdnsutil 用于操作后端数据, 即便没有启动 server 也可以
# 简化 pdnsutil 操作
alias pu="pdnsutil --config-dir=`pwd`"
# 添加用于测试的记录
pu add-record i.wener.me @ A 127.0.0.1
pu add-record i.wener.me dev A 127.0.0.1

# 测试添加的记录
dig @127.0.0.1 -p 5300 dev.i.wener.me

# 常用操作
# 创建
pdnsutil create-zone mydomain.com
# 检测现有的问题
pdnsutil check-zone mydomain.com
# add-record ZONE NAME TYPE [ttl] content

```

### 后端
* 后端模块
  * sql
    * sqlite
    * oracle
    * mysql
    * pgsql
    * odbc
    * opendb
  * bind
  * tinydns
  * remote
  * pipe
  * lua
  * ldap
* 后端方法分类
  * minimal
    * list
      * 用于支持 AXFR
    * lookup
    * get
    * getSOA
  * master
    * getUpdatedMasters
    * setNotifed
  * slave
    * getDomainInfo
    * isMaster
    * getUnfreshSlaveInfos
    * setFresh
    * startTransaction
    * commitTransaction
    * abortTransaction
    * feedRecord
  * supermaster
    * superMasterBackend
    * createSlaveDomain
  * dnssec
  * 其他
* 主要接口
  * `BackendFactory`
    * `DNSBackend` 的工厂类
  * `DNSBackend`
    * 后端接口
  * `XXXLoader`
    * 静态初始化类
    * 用于注册工厂方法
    * `BackendMakers().report(new XXXFactory)`
* 需要实现 `pdns/dnsbackend.hh` 中的 DNSBackend
* [Backend writers' guide](https://doc.powerdns.com/md/appendix/backend-writers-guide/)
* AXFR


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
