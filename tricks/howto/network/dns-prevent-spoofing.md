---
id: dns-prevent-spoofing
title: 如何避免 DNS 污染且能正常访问国内域名？
---

## 场景
* 需要访问的网站域名被错误解析
* 域名被解析到随机的 IP 导致即便网络能通信也无法进行访问
* 如果直接使用 DNS 转发到 8.8.8.8 会导致国内启用了 GEO 解析的域名被解析到海外
  * 例如 alicdn.com - 如果所有解析都走 8.8.8.8 打开 淘宝 会非常慢

<!--
@startdot
digraph G {
node[shape=box,style=filled,color=transparent,fillcolor="#BBDEFB"]

root[label=<根服务器>]
as[label=<权威服务器>]
rec[label=<本地递归服务器>]
dnsmasq[label=<本地缓存服务器>,fillcolor="#FFCDD2"]
home[label=<局域网/PC/手机>,fillcolor="#FFF9C4"]
external[label=<外网DNS<br/>例如 8.8.8.8<br/>通过外网访问<br/>无污染>,fillcolor="#C8E6C9"]

{rank=same; rec dnsmasq}

root,as -> rec
rec -> dnsmasq[label=<1. 尝试解析<br/>启用 DNSSEC>]
external -> dnsmasq[label=<2. 解析未能解析域名>]
dnsmasq -> home

label="DNS 排污"
}
@enddot
-->

![域名访问结构](https://www.plantuml.com/plantuml/svg/RP9DIm916CVlyoa6kvgIH2Yv4gvkjmWwHeUndL9QTsrc3uO8LeUeA4nxPqkbA8dIEXQPNwOPrs_Hh5k-4NiPdl_pstcU7pD7JKHCrJ21cbedA9E4yp07T4F5opI9CbXA65alDRSqBAsbD0shtbL3CuXa4gJJ329ODxrEu5Oz4z5eBAv4FIi04CCmbpMKm9eKvjLtRXsnWngxgaTM0ABzu6QNrRU7Cu9N-w7rpApNRg74MgNX5bMdQKGtHziwdsNsSZbe6vbAKUHOB22cIXff_CUnjmAhL3gj4_-YxEVxXzpw6AUKa3mjA9mrCT6HrYVlpmKMMrWA9uW_ylrro1vsOD3N-tgbRk7QRk-vRNQZtRrezChyeihVQhnI7hr73iPdv93ZB2UiRaWKfV4i52BWxwPvrwONKJWPSGB7adCSCp7bW-prncwUsOzt_BROkvCLcvtJEXJ3BiNbo62NV_203xeWjvxitPPx5efOyMXWtU4SYm2ub4Vy6VBZabZC0_9W3kkgU4q_)

## 原理
* 不要依赖上游 DNS - 例如 114.114.114.114
  * 使用 pdns_recursor 作为递归 DNS 服务器
  * 能避免大部分被污染的 DNS
* 校验 DNSSEC - 当校验失败后使用备选的 8.8.8.8
* 使用 dnsmasq 作为缓存和使用备选服务器解析
  * 提高性能和易用性
  * 例如 校验 google.com 失败后使用 8.8.8.8 解析
* 需要确保 8.8.8.8 能被直接访问（代理）或者映射端口
  * 通过 TINC 穿透访问
  * 通过 sshuttle 代理访问
  * 通过 SSH 端口转发访问
  * 总之不能通过国内访问 8.8.8.8 - 否则一样会被污染
* __缺陷__
  * 因为使用自行部署的递归 DNS 服务器，刚开始使用时会比较慢
    * 因为域名都是从根服务器开始解析
    * 在使用一段时间后就会逐渐恢复，感知不到差异

### 验证 DNS 污染

```bash
# dig 在 alpinelinux 中通过安装 bind-tools 获取
# 通过 docker 启动可获取 dig 和 nc 工具 - 如果本地已有可忽略
docker run --rm -it wener/dns sh

# 通过 114 解析 google 域名
dig google.com @114.114.114.114 +short
# 检测 IP 是否属于 Google
# 例如 我获取到的是 93.46.8.90
echo -e 'begin\n93.46.8.90\nend' | nc bgp.tools 43
```

__获取到的信息解释如下__

自治系统编号 | IP | 地址段 | CC | 注册 |  分配时间 | 运营商名字
----|----|----|----|----|----|----
12874   | 93.46.8.90       | 93.46.0.0/15        | IT | RIPE     | 2002-09-13 | Fastweb SpA

这不是 Google 的 IP，因此可判断 DNS 被污染

```bash
# 使用真实的 IP 进行查询
echo -e 'begin\n216.58.200.14\nend' | nc bgp.tools 43
```

返回的结果为

自治系统编号 | IP | 地址段 | CC | 注册 |  分配时间 | 运营商名字
----|----|----|----|----|----|----
15169   | 216.58.200.14    | 216.58.200.0/24     | US | ARIN     | 2000-03-30 | __Google LLC__

返回的是 Google LLC 的即可

> 💡 关于该 AS 更详细的信息可前往 https://bgp.tools/as/15169 查看

### DNS GEO 解析验证
* 如果不处理好 GEO 解析会导致原本访问很快的域名变得非常 __慢__
* 这里使用淘宝图片的 cdn 进行验证 `img.alicdn.com`

```bash
# 解析 IP 并查询所属城市
dig img.alicdn.com +short | grep '^[.0-9]*$' | xargs -I {} -n 1 -- sh -c 'echo {} - $(curl https://ipapi.co/{}/city/ -s)'
```

返回结果如下

```
101.226.26.254 - Shanghai
101.226.26.253 - Shanghai
```

因为我是从上海查询的，所以返回结果是正确的。对比国外进行解析的结果

```bash
# 8.8.8.8 可修改为其它的地址 - 只要不是通过国内进行访问
dig img.alicdn.com +short @8.8.8.8 | grep '^[.0-9]*$' | xargs -I {} -n 1 -- sh -c 'echo {} - $(curl https://ipapi.co/{}/city/ -s)'
```

通过 HK 访问的结果如下

```
47.246.16.254 - San Mateo
47.91.195.254 - Beijing
205.204.104.242 - San Mateo
```

验证该域名有基于 GEO 的解析，稍后将使用该结果进行正确性验证。

## 部署
* 部署流程
  1. 部署 pdns_recursor
      * 配置 dnssec
  2. 部署 dnsmasq
      * 配置解析顺序
      * [可选] 针对域名修改解析服务器
  3. 验证

> ⚠️注意 确保本地有方式能访问到不被污染的 DNS 服务 - 否则 google.com 这样的域名不能被解析

### Docker 完整镜像

> 💡提示
> 该镜像包含了下述配置，具体构建过程参见 [wenerme/dockerfiles/app/dns-rec](https://github.com/wenerme/dockerfiles/tree/master/app/dns-rec)

```bash
docker run --rm -it \
  --cap-add NET_ADMIN --device /dev/net \
  --name dns-rec -p 53:53/udp wener/app:dns-rec
```

### Docker 验证部署

* 按照实际部署的方式进行配置，但通过 docker 来进行验证

```bash
# 创建测试用的网络 - 测试完成即可删除 - 自定义的网络才能使用静态 IP
docker network create service --subnet 172.18.2.0/24

# pdns_recursor 配置
cat <<EOF > recursor.conf
# 前台启动
daemon=no
loglevel=3
local-address=0.0.0.0

max-total-msec=10000
network-timeout=3000
# 启用 dnssec 校验
dnssec=validate
dnssec-log-bogus=yes
EOF

# 启动 - 使用固定 IP 172.18.2.100
docker run --rm -it \
  --net service --ip 172.18.2.100 \
  -v $PWD/recursor.conf:/etc/pdns/recursor.conf \
  --name recursor wener/dns pdns_recursor

# dnsmasq 配置
cat <<EOF > dnsmasq.conf
# 前台执行
no-daemon
# 查询记录日志
log-queries
# 强制顺序解析
strict-order
resolv-file=/etc/resolv.dnsmasq.conf

# 可选
# 直接修改某个域名走不同的 DNS 解析
server=/wikipedia.org/8.8.8.8
EOF

cat <<EOF > resolv.dnsmasq.conf
# recursor 的地址
nameserver 172.18.2.100
# 能够不被污染解析的地址 - 只能使用 53 端口
nameserver 8.8.8.8
# recursor 相对更慢
options timeout:10
EOF

# 启动 dnsmasq 且映射了 53 端口到主机
docker run --rm -it \
  --net service -p 53:53/udp \
  -v $PWD/resolv.dnsmasq.conf:/etc/resolv.dnsmasq.conf \
  -v $PWD/dnsmasq.conf:/etc/dnsmasq.conf \
  --name dnsmasq wener/dns dnsmasq
```

服务部署完成，现在验证部署结果

```bash
# 使用另外一个会话测试效果
dig google.com @127.0.0.1
```

会观察到 recursor 输出日志

```
Answer to google.com|A for 172.18.2.2:22875 validates as Bogus
```

表示该域名的 dnssec 校验失败，不会返回给请求方。那么 dnsmasq 则会尝试下一个进行解析，日志如下

```
dnsmasq: query[A] google.com from 172.18.2.1
dnsmasq: forwarded google.com to 172.18.2.100
dnsmasq: forwarded google.com to 8.8.8.8
dnsmasq: reply google.com is 172.217.26.142
```

实际拿到的 IP 为 `172.217.26.142`，对其进行验证

```bash
echo -e 'begin\n172.217.26.142\nend' | nc bgp.tools 43
```

自治系统编号 | IP | 地址段 | CC | 注册 |  分配时间 | 运营商名字
----|----|----|----|----|----|----
15169   | 172.217.26.142   | 172.217.26.0/24     | US | ARIN     | 2000-03-30 | Google LLC

这样就拿到了正确的 IP。

接下来验证 GEO 解析的正确性

```bash
dig img.alicdn.com +short @127.0.0.1 | grep '^[.0-9]*$' | xargs -I {} -n 1 -- sh -c 'echo {} - $(curl https://ipapi.co/{}/city/ -s)'
```

返回结果与预期结果一致

```
101.226.26.254 - Shanghai
101.226.26.253 - Shanghai
```

__实验完成清除环境__

```bash
docker rm -f dnsmasq recursor
```

### AlpineLinux 部署

> ⚠️ 注意
> * 由于 dnsmasq 的 resolv.conf 只能使用默认端口，因此至少需要两个地址
> * 可以将 recursor 部署在 docker 或者 另外一个服务器 或者 绑定不同网卡
> * 以下使用绑定不同网卡的方式


> 💡提示
>
> 以下的部署逻辑也可以在 docker 中操作
> ```
> docker run --rm -it \
> --cap-add NET_ADMIN --device /dev/net \
> --name demo wener/base:openrc
> # 进入容器
> docker exec -it demo sh
> ```

1. 设置虚拟网卡 lo:0 - 地址为 127.0.0.2 用于 recursor
2. 启动 recursor - 监听 127.0.0.2
3. 配置 dnsmasq - 监听除 lo:0 之外的网卡
4. 启动 dnsmasq
5. 验证

```bash
# 添加虚拟网卡
cat <<EOF >> /etc/network/interfaces
auto lo:0
iface lo:0 inet static
  address 127.0.0.2
  netmask 255.0.0.0
EOF

# 启动网卡
ifup lo:0

# 安装依赖包
apk add dnsmasq pdns-recursor --no-cache

# 配置 recursor - ⚠️注意 修改了本地地址
cat <<EOF > /etc/pdns/recursor.conf
daemon=yes
loglevel=3
local-address=127.0.0.2

max-total-msec=10000
network-timeout=3000
# 启用 dnssec 校验
dnssec=validate
dnssec-log-bogus=yes
EOF

# 启动 recursor
service pdns-recursor start

# 配置 dnsmasq
cat <<EOF > /etc/dnsmasq.conf
# 绑定到知道
except-interface=lo:0
bind-interfaces

# 查询记录日志
log-queries
# 强制顺序解析
strict-order
all-servers
resolv-file=/etc/resolv.dnsmasq.conf

# 可选
# 直接修改某个域名走不同的 DNS 解析
server=/wikipedia.org/8.8.8.8
EOF

# 使用的 127.0.0.2 指向的 recursor
cat <<EOF > /etc/resolv.dnsmasq.conf
# recursor 的地址
nameserver 127.0.0.2
# 能够不被污染解析的地址 - 只能使用 53 端口
nameserver 8.8.8.8
# recursor 相对更慢
options timeout:10
EOF

# 启动 dnsmasq
service dnsmasq start
```

服务至此启动完成，可尝试在本地进行验证

```bash
# 获取 dig 工具
apk add bind-tools

# 验证
dig google.com @127.0.0.1
```

## 受污染域名

```
disqus.com
imgur.com
google.com
googlevideo.com
google-analytics.com
googletagmanager.com
reddit.com
```

更多受影响域名可参考 [googlehosts/hosts](https://github.com/googlehosts/hosts)，可摘选域名直接配置。
