---
title: dnsmasq
---

# dnsmasq

## Tips
* [dnsmasq](http://www.thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html)
  * 轻量级的 DNS, TFTP, PXE, router advertisement 和 DHCP 服务
  * 支持 DNSSEC
  * 可以作为小型的 DNS AS/授权服务器 - 直接提供域名记录
* Archlinux [dnsmasq](https://wiki.archlinux.org/index.php/dnsmasq)/[简体中文](https://wiki.archlinux.org/index.php/Dnsmasq_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
* Debian HowTo [dnsmasq](https://wiki.debian.org/HowTo/dnsmasq)
* musl dns
  * [docker-alpine](https://github.com/gliderlabs/docker-alpine/blob/master/docs/caveats.md#dns)
    * dns domain 搜索不生效
    * 并发 dns 服务有问题
  * [DNS resolution happenning only after timeout](http://www.openwall.com/lists/musl/2017/09/28/1)
  * [Functional differences from glibc](https://wiki.musl-libc.org/functional-differences-from-glibc.html)
* address=/.domain.tld/192.168.0.1 -> address=/domain.tld/192.168.0.1
* [reload](https://serverfault.com/a/934681) - 清除缓存重载部分配置文件
  * SIGHUP
  * /etc/hosts
  * /etc/ethers
  * --dhcp-hostsfile
  * --dhcp-hostsdir
  * --dhcp-optsfile
  * --dhcp-optsdir
  * --dhcp-optsdir
  * --addn-hosts
  * --hostsdir

```bash
# 速度测试
time ping -c 1 baidu.com
time ping -4 -c 1 baidu.com
# 如果不方便 ping 也可以 wget
time wget --spider -q baidu.com

# 查看当前使用的 dns
cat /etc/resolv.conf
# 安装
apk add dnsmasq


# 配置
# 如果不需要其他服务访问, 可以使用 127.0.0.1, docker 中也会无法访问
# echo 'listen-address=127.0.0.1' >> /etc/dnsmasq.conf
echo 'resolv-file=/etc/resolv.dnsmasq.conf' >> /etc/dnsmasq.d/local.conf
# 添加 dns
echo 'nameserver 223.5.5.5' >>  /etc/resolv.dnsmasq.conf
echo 'nameserver 114.114.114.114' >>  /etc/resolv.dnsmasq.conf
# 这里配置 127.0.0.1, docker 不会使用, 建议配置 172.17.0.1 或者实际静态 ip
echo 'nameserver 127.0.0.1' > /etc/resolv.conf
# 如果有 Docker 建议配置 172.17.0.1
# echo 'nameserver 172.17.0.1' > /etc/resolv.conf

# 测试配置
dnsmasq --test

# 启动
rc-service dnsmasq start
rc-update add dnsmasq

# 日志调试
# 还可以开启 log-dhcp
echo 'log-queries' > /etc/dnsmasq.d/log.conf
# 服务重启
rc-service dnsmasq restart
# 查看消息
tail -f /var/log/message

# macOS 安装 - 可以使用 dnsmasq 来替代 hosts
brew install dnsmasq
# 配置文件 /usr/local/etc/dnsmasq.
cat <<CONF > /usr/local/etc/dnsmasq.conf
# 上游
server=114.114.114.114
server=223.5.5.5
server=223.6.6.6

# 缓存数量
cache-size=655360
# 10m 缓存时间
min-cache-ttl=600

# 自定义解析 - 替代 /etc/hosts
# 所有 *.localhost 都会被解析到该地址
address=/localhost/127.0.0.1
# 其他测试服务地址
address=/cluster.internal/192.168.1.2
address=/cluster.lan/192.168.1.3
CONF
# 验证能启动
sudo dnsmasq -d -C /usr/local/etc/dnsmasq.conf
# 没问题后使用 brew 启动
brew service start dnsmasq
```

## 配置
* [dnsmasq.conf.example](http://thekelleys.org.uk/gitweb/?p=dnsmasq.git;a=blob_plain;f=dnsmasq.conf.example;hb=HEAD)
* [dnsmasq-man](http://www.thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html)
* 配置的内容也是命令行接受的参数

```bash
# 默认配置
# conf-dir=/etc/dnsmasq.d/,*.conf
egrep '^[^#]' /etc/dnsmasq.conf
```

### 常用配置
```ini
# --no-daemon 前台运行
# 配置目录
conf-dir=/etc/dnsmasq.d/,*.conf
# 只允许本地查询 - 当作为本地 dns 缓存的时候可以开启
local-service

# 转发 consul 主域名 - 比如 abc.consul
# dig consul.service.consul @127.0.0.1
server=/consul/127.0.0.1#8600

# 上游 DNS 服务器
server=223.5.5.5
server=114.114.114.114
# 缓存大小 - 默认只有 150
cache-size=65536

# 可选配置 - 运行的账户信息
user=dnsmasq
group=dnsmasq

# 私网自定义逆查询 RFC 1918, 5735, 6598:
#rev-server=0.0.0.0/8,127.0.0.1#8600
#rev-server=10.0.0.0/8,127.0.0.1#8600
#rev-server=100.64.0.0/10,127.0.0.1#8600
#rev-server=127.0.0.1/8,127.0.0.1#8600
#rev-server=169.254.0.0/16,127.0.0.1#8600
#rev-server=172.16.0.0/12,127.0.0.1#8600
#rev-server=192.168.0.0/16,127.0.0.1#8600
#rev-server=224.0.0.0/4,127.0.0.1#8600
#rev-server=240.0.0.0/4,127.0.0.1#8600
```

### 基础配置
```ini
conf-file=<file>
conf-dir=<directory>[,<file-extension>......],
# 只允许 server 和 rev-server 配置
servers-file=<file>

# SIGUSR2 从新打开日志文件 - 日志滚动
log-facility=<facility>/<log file>/-
# 异步日志 - 队列行数
log-async[=<lines>]

# 默认 /var/run/dnsmasq.pid
pid-file=<path>
# setuid setgid
user=<username>
group=<groupname>
```

### 系统相关
```ini
# 记录 conntrack 标示 - 主要用于防火墙或统计
conntrack
```
### DNSSEC
* 需要安装 __dnsmasq-dnssec__ 而不是 dnsmasq

```ini
# 启动 dnssec - 编译时需要 HAVE_DNSSEC
dnssec
# trust-anchors 配置
conf-file=/usr/share/dnsmasq/trust-anchors.conf
# 手动指定 DS 记录，用于 DNSSEC 验证
# https://data.iana.org/root-anchors/root-anchors.xml
# trust-anchor=[<class>],<domain>,<key-tag>,<algorithm>,<digest-type>,<digest>
# 是否尝试对未签名的进行检查
dnssec-check-unsigned[=no]
dnssec-no-timecheck
dnssec-timestamp=<path>
proxy-dnssec
dnssec-debug
```

### DNS

```ini
# 不转发不包含 . 或域名部分的名字
domain-needed

# 当对私有地址进行反向查询时，如果有记录则返回 no such domain 而不继续转发
bogus-priv
bogus-nxdomain=<ipaddr>
ignore-address=<ipaddr>

# 不读 /etc/hosts
no-hosts
# 添加 hosts 文件 - 支持指向目录 - 支持多次
addn-hosts=FILE/PATH
# hosts 目录 - 会检测文件变动
hostdir=PATH
# 在 /etc/hosts 添加简单域名记录 - 不会添加 CNAME/PTR/TXT 这样的
expand-hosts

# 当从 /etc/hosts 或配置返回时默认 ttl 为 0 - 该配置会修改 ttl
local-ttl=<time>
# 类似于 local-ttl - 但只影响 DHCP
dhcp-ttl=<time>
neg-ttl=<time>
# 返回给客户端的最大 TTL
max-ttl=<time>

max-cache-ttl=<time>
# 设置最小缓存时间 - 单位 秒
# 默认有最大 1h 清除缓存
min-cache-ttl=600
# 从 权威服务器/AS 返回的 TTL
auth-ttl=<time>

# 默认缓存 150 个名字
# 设置为 0 则禁用缓存
cache-size=<cachesize>
# 不缓存否定结果(返回域名不存在)
no-negcache
# 并发查询的 dns 记录
# 默认 150
dns-forward-max=<queries>

# 前台运行
keep-in-foreground
# debug 模式
# 不 fork 到后台、不写 pid、不设置 uid、日志到 stderr、接收请求不创建新进程
# SIGUSR1 生成缓存
no-daemon
# 记录处理的查询
# log-queries=extra 记录额外信息
log-queries

# DNS 端口 - 设置为 0 则禁用 DNS
port=<port>
edns-packet-max=<size>
# DNS 出端口
query-port=<query_port>
min-port=<port>
max-port=<port>

# 监听端口
# * 为指定所有
interface=<interface name>
# 排查端口
except-interface=<interface name>

# 启用 DNS 授权服务模式
auth-server=<domain>,[<interface>|<ip-address>...]
# 针对指定域名作为 AS 服务器
# 如果指定了子网，那么 A、AAAA 必须要在子网
auth-zone=<domain>[,<subnet>[/<prefix length>][,<subnet>[/<prefix length>].....][,exclude:<subnet>[/<prefix length>]].....]
# 作为 AS 的 SOA 记录
auth-soa=<serial>[,<hostmaster>[,<refresh>[,<retry>[,<expiry>]]]]
# 二级服务器
auth-sec-servers=<domain>[,<domain>[,<domain>...]]
auth-peer=<ip-address>[,<ip-address>[,<ip-address>...]]

# 只接收本地子网请求
local-service

# 不在这些端口提供 DHCP
no-dhcp-interface=<interface name>
# 监听地址
listen-address=<ipaddr>

# 绑定到网卡 - 例如 指定了 interface，则只监听 interface - 需要平台支持，linux 可以
bind-interfaces
# 介于 bind-interfaces 和 默认 之间，会绑定到新出现的地址
# 仅 Linux，非 Linux 回退到 bind-interfaces 模式
bind-dynamic

# 从 /etc/hosts 返回结果
# 当有多条记录匹配时，优先选择相同子网的地址返回 - 只支持 IPv4
localise-queries

# 修改上游返回地址
# 替换 old-ip 为 new-ip
alias=[<old-ip>]|[<start-ip>-<end-ip>],<new-ip>[,<mask>]

filterwin2k

# 上游域名服务器配置
resolv-file=<file>
# 不读取 /etc/resolv.conf
no-resolv
# 不检测 resolv.conf 变化
no-poll
# 当 resolv.conf 变化重载时清除缓存
clear-on-reload
# 按序查询 /etc/resolv.conf 的服务器
strict-order
# 查询所有上游，相应最先返回的 - 默认只查询一个
all-servers
# 通过额外的 txt 记录来检测
dns-loop-detect
# 阻止上游返回私网地址
stop-dns-rebind
# 允许 127.0.0.0/8
rebind-localhost-ok
# 允许 rebind 的域名
rebind-domain-ok=[<domain>]|[[/<domain>/[<domain>/]

# 指定上游名字
# 也同时会读 /etc/resolv.conf - no-resolv 控制
# 可多次配置 - 优先选择匹配更具体的
# 转发指定域名到指定服务器
# server=/internal.thekelleys.org.uk/192.168.1.1
# `#‘ 表示发送到标准服务器
# @ 控制如何请求服务器 - 网路端口或地址
server=[/[<domain>]/[domain/]][<ipaddr>[#<port>][@<source-ip>|<interface>[#<port>]]

# 从 /etc/hosts 或 DHCP 返回
local
# 与 server 配置类似，指定反向查询的服务
rev-server=<ip-address>/<prefix-len>,<ipaddr>[#<port>][@<source-ip>|<interface>[#<port>]]

# 针对域名返回地址
# 如果不指定地址，则返回 no-such-domain
# 如果地址为 `#' 则返回 NULL 地址 0.0.0.0
address=/<domain>[/<domain>...]/[<ipaddr>]

ipset=/<domain>[/<domain>...]/<ipset>[,<ipset>...]
# 指定域名返回 MX 记录
mx-host=<mx name>[[,<hostname>],<preference>]
# 默认 MX 记录域名
mx-target=<hostname>
# 本地机器(hosts 或 dhcp)的 MX 返回当前机器
selfmx
# 本地机器的 MX 返回 mx-target
localmx
# 指定返回的 SRV 记录
# 默认返回 domain
srv-host=<_service>.<_prot>.[<domain>],[<target>[,<port>[,<priority>[,<weight>]]]]
# 添加 A、AAAA、PTR 记录
host-record=<name>[,<name>....],[<IPv4-address>],[<IPv6-address>][,<TTL>]
txt-record=<name>[[,<text>],<text>]
ptr-record=<name>[,<target>]
# RFC3403 NAPTR 记录
naptr-record=<name>,<order>,<preference>,<flags>,<service>,<regexp>[,<replacement>]
# RFC6844 CAA 记录
caa-record=<name>,<flags>,<tag>,<value>
cname=<cname>,[<cname>,]<target>[,<TTL>]
dns-rr=<name>,<RR-number>,[<hex data>]
# 关联 dns 和网路端口
interface-name=<name>,<interface>[/4|/6]
# 针对范围内ip窗 A/AAAA 和 PTR 记录
#
# synth-domain=thekelleys.org.uk,192.168.0.50,192.168.0.70,internal-*
# internal-0.thekelleys.org.uk 返回 192.168.0.50
#
# synth-domain=thekelleys.org.uk,192.168.0.0/24,internal-(no *)
# internal-192-168-0-56.thekelleys.org.uk 返回 192.168.0.56
synth-domain=<domain>,<address range>[,<prefix>[*]]

# 转储的 pcap 文件 - 用于 debug 网络
dumpfile=<path/to/file>
dumpmask=<mask>

# dns 查询添加查询者的 mac 地址
add-mac[=base64|text]
# 查询添加标识符
add-cpe-id=<string>
# 子网地址转发上游
add-subnet[[=[<IPv4 address>/]<IPv4 prefix length>][,[<IPv6 address>/]<IPv6 prefix length>]]

# 默认名字 uk.org.thekelleys.dnsmasq
enable-dbus[=<service-name>]
enable-ubus
```

### dhcp

```ini
# 启用 DHCP 服务
# 租约时间格式可以是 45m、1h、infinite
# 默认租约是 1h - 最小租约是 2m
# 该配置可针对不同的地址指定多次
# 两种配置格式
# dhcp-range=[tag:<tag>[,tag:<tag>],][set:<tag>,]<start-addr>[,<end-addr>|<mode>][,<netmask>[,<broadcast>]][,<lease time>]
# dhcp-range=[tag:<tag>[,tag:<tag>],][set:<tag>,]<start-IPv6addr>[,<end-IPv6addr>|constructor:<interface>][,<mode>][,<prefix-len>][,<lease time>]

# 192.168.0.50 - 192.168.0.150 12h 租约
dhcp-range=192.168.0.50,192.168.0.150,12h
# 指定 NETMASK
dhcp-range=192.168.0.50,192.168.0.150,255.255.255.0,12h
# 设置标签
dhcp-range=set:red,192.168.0.50,192.168.0.150
# 有指定标签才会启用
dhcp-range=tag:green,192.168.0.50,192.168.0.150,12h
# 指定静态子网 - 不用份地址分发
dhcp-range=192.168.0.0,static

# 单个主机配置
# dhcp-host=[<hwaddr>][,id:<client_id>|*][,set:<tag>][,<ipaddr>][,<hostname>][,<lease_time>][,ignore]
# mac 绑定地址
dhcp-host=11:22:33:44:55:66,192.168.0.60
# 设置名字
dhcp-host=11:22:33:44:55:66,fred
# mac 地址绑定 ip、名字、租期
dhcp-host=11:22:33:44:55:66,fred,192.168.0.60,45m
# 绑定其中一个 mac 地址信息 - 适用于笔记本使用网卡和无线
dhcp-host=11:22:33:44:55:66,12:34:56:78:90:12,192.168.0.60
# 将 client 名字绑定到 ip
dhcp-host=bert,192.168.0.70,infinite
# id 作为 client 绑定 ip
dhcp-host=id:01:02:02:04,192.168.0.60
# 针对 /etc/hotes 中的 judge 主机启用 dhcp
dhcp-host=judge
# 针对 mac 禁用 dhcp
dhcp-host=11:22:33:44:55:66,ignore
dhcp-host=11:22:33:44:55:66,id:*
# 设置额外标签属性
dhcp-host=11:22:33:44:55:66,set:red
# mac 批量匹配设置属性
dhcp-host=11:22:33:*:*:*,set:red

# 指定 dhcp 主机配置文件
# SIGHUP 从新读取
dhcp-hostsfile=<path>
dhcp-hostsdir=<path>

# dhcp 选项
# dhcp-option=[tag:<tag>,[tag:<tag>,]][encap:<opt>,][vi-encap:<enterprise>,][vendor:[<vendor-class>],][<opt>|option:<opt-name>|option6:<opt>|option6:<opt-name>],[<value>[,<value>]]
# dhcp 配置信息
dhcp-optsfile=<path>
dhcp-optsdir=<path>

# 强制设置的属性
dhcp-option-force=[tag:<tag>,[tag:<tag>,]][encap:<opt>,][vi-encap:<enterprise>,][vendor:[<vendor-class>],]<opt>,[<value>[,<value>]]

# 将自定义的类别映射为标签
dhcp-vendorclass=set:<tag>,[enterprise:<IANA-enterprise number>,]<vendor-class>
# 将 user-class 映射为标签
dhcp-userclass=set:<tag>,<user-class>
# 为 mac 地址设置标签
dhcp-mac=set:<tag>,<MAC address>
# 映射 RFC3046 relay agent 为标签
dhcp-circuitid=set:<tag>,<circuit-id>, --dhcp-remoteid=set:<tag>,<remote-id>
dhcp-subscrid=set:<tag>,<subscriber-id>
dhcp-match=set:<tag>,<option number>|option:<option name>|vi-encap:<enterprise>[,<value>]
dhcp-name-match=set:<tag>,<name>[*]
tag-if=set:<tag>[,set:<tag>[,tag:<tag>[,tag:<tag>]]]
dhcp-ignore=tag:<tag>[,tag:<tag>]
dhcp-ignore-names[=tag:<tag>[,tag:<tag>]]
dhcp-generate-names=tag:<tag>[,tag:<tag>]
dhcp-broadcast[=tag:<tag>[,tag:<tag>]]
dhcp-boot=[tag:<tag>,]<filename>,[<servername>[,<server address>|<tftp_servername>]]
dhcp-sequential-ip

# 针对地址进行中继
dhcp-relay=<local address>,<server address>[,<interface]
# IPv4 中继 dhcp 的地址
dhcp-proxy[=<ip addr>]......
dhcp-reply-delay=[tag:<tag>,]<integer>

# 最大租期
dhcp-lease-max=<number>

# IPv4 其他端口
dhcp-alternate-port[=<server port>[,<client port>]]


# 如果网络中只有这一个 DHCP
dhcp-authoritative

# DHCPv4 RFC 4039 快速提交选项
dhcp-rapid-commit

# DHCPv4 不复用 DHCP 的文件名和服务名字段
dhcp-no-override

# 读取 /etc/ethers 作为 DHCP 主机信息
# 格式为 MAC地址 + 主机名/IP
read-ethers

# DHCPv6
# 启用 router advertisements
enable-ra
ra-param=<interface>,[mtu:<integer>|<interface>|off,][high,|low,]<ra-interval>[,<router lifetime>]

# IPv4 BOOTP 动态地址
bootp-dynamic[=<network-id>[,<network-id>]]
# 不 ping 分发的地址
no-ping
# 添加额外日志
log-dhcp
# 减少日志
quiet-dhcp
quiet-dhcp6
quiet-ra

# 记录租期的文件
dhcp-leasefile=<path>
# IPv6
dhcp-duid=<enterprise-id>,<uid>
# 创建 DHCP 租约，销毁 DHCP 租约，TFTP 文件传输完成时的回调
dhcp-script=<path>
# 同上 - 不过是 lua 脚本
dhcp-luascript=<path>
dhcp-scriptuser
# 启用 arp 和 arp-old 回调
script-arp
# 不使用租约文件，通过外部调用返回
leasefile-ro

bridge-interface=<interface>,<alias>[,<alias>]

# dhcp 返回的 dns 域
domain=<domain>[,<address range>[,local]]
dhcp-fqdn
dhcp-client-update

```

### TFTP
```ini
# 启用 TFTP
enable-tftp[=<interface>[,<interface>]]
tftp-root=<directory>[,<interface>]
tftp-no-fail
tftp-unique-root[=ip|mac]
tftp-secure
tftp-lowercase
tftp-max=<connections>
tftp-mtu=<mtu size>
tftp-no-blocksize
tftp-port-range=<start>,<end>
```

### PXE
```ini
# 配置 PXE 服务
pxe-service=[tag:<tag>,]<CSA>,<menu text>[,<basename>|<bootservicetype>][,<server address>|<server_name>]
# 设置提示信息
pxe-prompt=[tag:<tag>,]<prompt>[,<timeout>]
```

# FAQ

## dnsmasq: setting capabilities failed: Operation not permitted
* Docker 里遇到
* 用 root 启动

```bash
dnsmasq --user=root
```

## dnsmasq: failed to bind DHCP server socket: Address in use

* 67 端口被占用
* 使用 bind-interfaces

## libvirtd dnsmasq

```bash
/usr/sbin/dnsmasq --conf-file=/var/lib/libvirt/dnsmasq/default.conf --leasefile-ro --dhcp-script=/usr/lib/libvirt/libvirt_leaseshelper
```

```
##WARNING:  THIS IS AN AUTO-GENERATED FILE. CHANGES TO IT ARE LIKELY TO BE
##OVERWRITTEN AND LOST.  Changes to this configuration should be made using:
##    virsh net-edit default
## or other application using the libvirt API.
##
## dnsmasq conf file created by libvirt
strict-order
pid-file=/var/run/libvirt/network/default.pid
except-interface=lo
bind-dynamic
interface=virbr0
dhcp-range=192.168.122.2,192.168.122.254,255.255.255.0
dhcp-no-override
dhcp-authoritative
dhcp-lease-max=253
dhcp-hostsfile=/var/lib/libvirt/dnsmasq/default.hostsfile
addn-hosts=/var/lib/libvirt/dnsmasq/default.addnhosts
```

## dnsmasq as

```ini
auth-server=localhost
auth-zone=localhost,127.0.0.0/24
# 会解析所有的 cluster.internal 结尾域名
# x.cluster.internal
# x.x.cluster.internal
address=/cluster.internal/192.168.1.1
```

## 所有域名 CNAME 为其他域名

```ini
# 所有 example.com 都会 CNAME 为 wener.me
cname=*.example.com,wener.me,180
auth-server=example.com
auth-zone=example.com
```
