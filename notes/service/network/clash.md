---
title: clash
---

# clash

- [Dreamacro/clash](https://github.com/Dreamacro/clash)
  - GPLv3, Golang
  - rule-based tunnel
- 参考
  - [juewuy/ShellClash](https://github.com/juewuy/ShellClash)
  - https://clash.gitbook.io/doc/
  - [vernesong/OpenClash](https://github.com/vernesong/OpenClash)
  - https://github.com/Loyalsoldier
    - [Loyalsoldier/geoip](https://github.com/Loyalsoldier/geoip)
  - [eycorsican/leaf](https://github.com/eycorsican/leaf)
  - [eycorsican/go-tun2socks](https://github.com/eycorsican/go-tun2socks)
  - [EAimTY/tuic](https://github.com/EAimTY/tuic)
  - [HyNetwork/hysteria](https://github.com/HyNetwork/hysteria)
- Premium - 闭源
  - [发布历史](https://github.com/Dreamacro/clash/releases/tag/premium)
  - [Premium-Core-Features](https://github.com/Dreamacro/clash/wiki/Premium-Core-Features)
  - tun,script,tracing
  - rule-providers
    - type: http,file - 指向 yaml
    - yaml 包含 `{payload:[]}`
  - ebpf - redirect-to-tun
  - auto-redir - 配合 tun 替代 redir-port

```bash
# golang
go install github.com/Dreamacro/clash@latest

# Docker
# https://hub.docker.com/r/dreamacro/clash
# https://github.com/Dreamacro/clash/blob/master/Dockerfile
docker run --rm -it --name clash dreamacro/clash
```

## Awesome

- [Dreamacro/clash](https://github.com/Dreamacro/clash)
- Client
  - [vernesong/OpenClash](https://github.com/vernesong/OpenClash)
    - OpenWRT Client
  - [Fndroid/clash_for_windows_pkg](https://github.com/Fndroid/clash_for_windows_pkg)
  - [ClashDotNetframework](https://github.com/ClashDotNetframework/ClashDotNetframework)
    - DotNet, Windows
  - [yichengchen/clashX](https://github.com/yichengchen/clashX)
    - macOS
    - [WhoJave/clashX](https://github.com/WhoJave/clashX/tree/master)
  - [Kr328/ClashForAndroid](https://github.com/Kr328/ClashForAndroid)
  - [WhoJave/ClashA](https://github.com/WhoJave/ClashA)
  - [ccg2018/ClashA](https://github.com/ccg2018/ClashA)
  - iOS
    - https://apps.apple.com/app/choc/id1582542227
      - 收费，不一定可用
  - [SpongeNobody/Clashy](https://github.com/SpongeNobody/Clashy)
- [链接转换](https://sites.google.com/view/honven/%E9%A6%96%E9%A1%B5/%E6%9C%BA%E5%9C%BA%E9%93%BE%E6%8E%A5%E8%BD%AC%E6%8D%A2)
- [Dreamacro/clash-tracing](https://github.com/Dreamacro/clash-tracing)
- Dashboard
  - [haishanh/yacd](https://github.com/haishanh/yacd)
    - MIT, Typescript
    - http://yacd.haishan.me/
  - [Dreamacro/clash-dashboard](https://github.com/Dreamacro/clash-dashboard)
    - MIT, Typescript
    - https://clash.razord.top/
    - Docker 内置

```bash
# Dreamacro/clash-dashboard
curl -LO https://github.com/Dreamacro/clash-dashboard/archive/gh-pages.zip
unzip gh-pages.zip

# haishanh/yacd
curl -LO https://github.com/haishanh/yacd/archive/gh-pages.zip
mv yacd-gh-pages/ ~/.config/clash
```

```yaml
external-controller: 0.0.0.0:9090
secret: external-controller-secret
# 默认目录 ～/.config/clash
# http://{{external-controller}}/ui
# yacd-gh-pages
external-ui: clash-dashboard-gh-pages
```

## notes

- 会下载 MMDB

```bash
curl -o ~/.config/clash/Country.mmdb https://cdn.jsdelivr.net/gh/Dreamacro/maxmind-geoip@release/Country.mmdb
```

## API

```bash
# reload 重载配置
curl -X PUT 127.0.0.1:9090/configs --json "{}"
# 配置 Secret 后
curl -X PUT -H "Authorization: Bearer secret" 127.0.0.1:9090/configs --json "{}"
```

- https://github.com/Dreamacro/clash/wiki/external-controller-API-reference

## conf

- config.yaml
- mode
  - rule - 基于规则路由
  - global - 全局路由到单个出口
  - direct - 不路由直接访问
- proxies - 上游代理
  - type
    - ss
    - ssr - ShadowsocksR
    - vmess
    - socks5
    - http
    - snell
    - trojan
- proxy-groups - 代理分组 - LB 策略
  - type
    - select - 手动选择
    - url-test - 使用 url 测速
      - url http://www.gstatic.com/generate_204
      - interval 300
    - relay - 串联所有代理
    - fallback - 基于 URL 检测进行回滚
    - load-balance - 基于 eTLD+1 进行负载
- proxy-providers - 指向 yaml 配置 - 包含 `proxies: []`
  - type http,file
- rules
  - DOMAIN
  - DOMAIN-SUFFIX
  - DOMAIN-KEYWORD
  - GEOIP
  - IP-CIDR
  - IP-CIDR6
  - SRC-IP-CIDR
  - SRC-PORT
  - DST-PORT
  - PROCESS-NAME
  - MATCH - 默认匹配
  - 添加 no-resolve 可避免 resolve 域名 去匹配 cidr
  - 特殊策略 DIRECT, REJECT

```yaml
# HTTP(S) 代理端口
port: 7890
# SOCKS5 代理端口
socks-port: 7891

# Linux, macOS 转发透明代理端口 (Redirect TCP and TProxy UDP)
# redir-port: 7892

# Linux TProxy 透明代理端口 (TProxy TCP and TProxy UDP)
# tproxy-port: 7893

# HTTP(S), SOCKS4(A)/SOCKS5 多协议端口
# mixed-port: 7890

# SOCKS5/HTTP(S) 代理认证
# authentication:
#  - "user1:pass1"
#  - "user2:pass2"

# 允许 Lan 连接到本地端口
allow-lan: false
# allow-lan=true 时的监听绑定地址
bind-address: '*'

# 路由模式
# rule - 基于规则的包转发
# global - 全局单出口
# direct - 直接访问
mode: rule

# 日志级别
# info / warning / error / debug / silent
log-level: info

ipv6: false

# 外部 REST API 接口 监听地址
external-controller: 127.0.0.1:9090
# UI 目录
# 访问地址 http://{{external-controller}}/ui
external-ui: folder
# REST 的 密钥
# Authorization: Bearer ${secret}
# secret: ""

# Outbound interface name
interface-name: en0

# Linux fwmark
routing-mark: 6666

# Static hosts for DNS server and connection establishment (like /etc/hosts)
#
# Wildcard hostnames are supported (e.g. *.clash.dev, *.foo.*.example.com)
# Non-wildcard domain names have a higher priority than wildcard domain names
# e.g. foo.example.com > *.example.com > .example.com
# P.S. +.foo.com equals to .foo.com and foo.com
hosts:
  # '*.clash.dev': 127.0.0.1
  # '.dev': 127.0.0.1
  # 'alpha.clash.dev': '::1'

profile:
  # Store the `select` results in $HOME/.config/clash/.cache
  # set false If you don't want this behavior
  # when two different configurations have groups with the same name, the selected values are shared
  store-selected: false

  # persistence fakeip
  store-fake-ip: true

dns:
  enable: false
  listen: 0.0.0.0:53
  # ipv6: false # when the false, response to AAAA questions will be empty

  # These nameservers are used to resolve the DNS nameserver hostnames below.
  # Specify IP addresses only
  default-nameserver:
    - 114.114.114.114
    - 8.8.8.8
  enhanced-mode: redir-host # or fake-ip
  fake-ip-range: 198.18.0.1/16 # Fake IP addresses pool CIDR
  # use-hosts: true # lookup hosts and return IP record

  # Hostnames in this list will not be resolved with fake IPs
  # i.e. questions to these domain names will always be answered with their
  # real IP addresses
  # fake-ip-filter:
  #   - '*.lan'
  #   - localhost.ptlogin2.qq.com

  # Supports UDP, TCP, DoT, DoH. You can specify the port to connect to.
  # All DNS questions are sent directly to the nameserver, without proxies
  # involved. Clash answers the DNS question with the first result gathered.
  nameserver:
    - 114.114.114.114 # default value
    - 8.8.8.8 # default value
    - tls://dns.rubyfish.cn:853 # DNS over TLS
    - https://1.1.1.1/dns-query # DNS over HTTPS
    - dhcp://en0 # dns from dhcp

  # When `fallback` is present, the DNS server will send concurrent requests
  # to the servers in this section along with servers in `nameservers`.
  # The answers from fallback servers are used when the GEOIP country
  # is not `CN`.
  # fallback:
  #   - tcp://1.1.1.1

  # If IP addresses resolved with servers in `nameservers` are in the specified
  # subnets below, they are considered invalid and results from `fallback`
  # servers are used instead.
  #
  # IP address resolved with servers in `nameserver` is used when
  # `fallback-filter.geoip` is true and when GEOIP of the IP address is `CN`.
  #
  # If `fallback-filter.geoip` is false, results from `nameserver` nameservers
  # are always used if not match `fallback-filter.ipcidr`.
  #
  # This is a countermeasure against DNS pollution attacks.
  # fallback-filter:
  #   geoip: true
  #   geoip-code: CN
  #   ipcidr:
  #     - 240.0.0.0/4
  #   domain:
  #     - '+.google.com'
  #     - '+.facebook.com'
  #     - '+.youtube.com'

  # Lookup domains via specific nameservers
  # nameserver-policy:
  #   'www.baidu.com': '114.114.114.114'
  #   '+.internal.crop.com': '10.0.0.1'

# 代理设置
proxies:
  # Shadowsocks
  # The supported ciphers (encryption methods):
  #   aes-128-gcm aes-192-gcm aes-256-gcm
  #   aes-128-cfb aes-192-cfb aes-256-cfb
  #   aes-128-ctr aes-192-ctr aes-256-ctr
  #   rc4-md5 chacha20-ietf xchacha20
  #   chacha20-ietf-poly1305 xchacha20-ietf-poly1305
  - name: 'ss1'
    type: ss
    server: server
    port: 443
    cipher: chacha20-ietf-poly1305
    password: 'password'
    # udp: true
    # 插件配置
    plugin: obfs # obfs, v2ray-plugin
    plugin-opts:
      # obfs - tls,http
      # v2ray-plugin - websocket - 暂不支持 QUIC
      mode: tls
      # host: bing.com

      # v2ray-plugin 配置
      # tls: true # wss
      # skip-cert-verify: true
      # host: bing.com
      # path: "/"
      # mux: true
      # headers:
      #   custom: value

  # vmess
  # cipher - auto/aes-128-gcm/chacha20-poly1305/none
  - name: 'vmess'
    type: vmess
    server: server
    port: 443
    uuid: uuid
    alterId: 32
    cipher: auto
    # udp: true
    # tls: true
    # skip-cert-verify: true
    # servername: example.com # priority over wss host
    # network: ws
    # ws-opts:
    #   path: /path
    #   headers:
    #     Host: v2ray.com
    #   max-early-data: 2048
    #   early-data-header-name: Sec-WebSocket-Protocol

  - name: 'vmess-h2'
    type: vmess
    server: server
    port: 443
    uuid: uuid
    alterId: 32
    cipher: auto
    network: h2
    tls: true
    h2-opts:
      host:
        - http.example.com
        - http-alt.example.com
      path: /

  - name: 'vmess-http'
    type: vmess
    server: server
    port: 443
    uuid: uuid
    alterId: 32
    cipher: auto
    # udp: true
    # network: http
    # http-opts:
    #   # method: "GET"
    #   # path:
    #   #   - '/'
    #   #   - '/video'
    #   # headers:
    #   #   Connection:
    #   #     - keep-alive

  - name: vmess-grpc
    server: server
    port: 443
    type: vmess
    uuid: uuid
    alterId: 32
    cipher: auto
    network: grpc
    tls: true
    servername: example.com
    # skip-cert-verify: true
    grpc-opts:
      grpc-service-name: 'example'

  # socks5
  - name: 'socks'
    type: socks5
    server: server
    port: 443
    # username: username
    # password: password
    # tls: true
    # skip-cert-verify: true
    # udp: true

  # http
  - name: 'http'
    type: http
    server: server
    port: 443
    # username: username
    # password: password
    # tls: true # https
    # skip-cert-verify: true
    # sni: custom.com

  # Snell
  # Beware that there's currently no UDP support yet
  - name: 'snell'
    type: snell
    server: server
    port: 44046
    psk: yourpsk
    # version: 2
    # obfs-opts:
    # mode: http # or tls
    # host: bing.com

  # Trojan
  - name: 'trojan'
    type: trojan
    server: server
    port: 443
    password: yourpsk
    # udp: true
    # sni: example.com # aka server name
    # alpn:
    #   - h2
    #   - http/1.1
    # skip-cert-verify: true

  - name: trojan-grpc
    server: server
    port: 443
    type: trojan
    password: 'example'
    network: grpc
    sni: example.com
    # skip-cert-verify: true
    udp: true
    grpc-opts:
      grpc-service-name: 'example'

  - name: trojan-ws
    server: server
    port: 443
    type: trojan
    password: 'example'
    network: ws
    sni: example.com
    # skip-cert-verify: true
    udp: true
    # ws-opts:
    # path: /path
    # headers:
    #   Host: example.com

  # ShadowsocksR
  # The supported ciphers (encryption methods): all stream ciphers in ss
  # The supported obfses:
  #   plain http_simple http_post
  #   random_head tls1.2_ticket_auth tls1.2_ticket_fastauth
  # The supported supported protocols:
  #   origin auth_sha1_v4 auth_aes128_md5
  #   auth_aes128_sha1 auth_chain_a auth_chain_b
  - name: 'ssr'
    type: ssr
    server: server
    port: 443
    cipher: chacha20-ietf
    password: 'password'
    obfs: tls1.2_ticket_auth
    protocol: auth_sha1_v4
    # obfs-param: domain.tld
    # protocol-param: "#"
    # udp: true

# 代理分组 - LB 策略
proxy-groups:
  # 中继 - 会经过给定的所有代理
  # 不支持 UDP
  # clash <-> http <-> vmess <-> ss1 <-> ss2 <-> Internet
  - name: 'relay'
    type: relay
    proxies:
      - http
      - vmess
      - ss1
      - ss2

  # 基于请求 URL 的速度来选择
  - name: 'auto'
    type: url-test
    proxies:
      - ss1
      - ss2
    # tolerance: 150
    # lazy: true
    url: 'http://www.gstatic.com/generate_204'
    interval: 300

  # 基于优先级选择一个可用的代理
  # 类似一个 url-test 自动分组
  - name: 'fallback-auto'
    type: fallback
    proxies:
      - ss1
      - ss2
    url: 'http://www.gstatic.com/generate_204'
    interval: 300

  # 基于 eTLD+1 进行负载
  - name: 'load-balance'
    type: load-balance
    proxies:
      - ss1
      - ss2
    url: 'http://www.gstatic.com/generate_204'
    interval: 300
    # strategy: consistent-hashing # round-robin

  # 选择 proxy 或 proxy group
  # 可通过 RESTful API 来切换
  - name: Proxy
    type: select
    # disable-udp: true
    proxies:
      - auto
      - DIRECT # 可以指定 直接
    # DIRECT 配置
    interface-name: en1
    routing-mark: 6667
    #
    use:
      - provider1

proxy-providers:
  provider1:
    type: http
    url: 'url'
    interval: 3600
    path: ./provider1.yaml
    health-check:
      enable: true
      interval: 600
      # lazy: true
      url: http://www.gstatic.com/generate_204
  test:
    type: file
    path: /test.yaml
    health-check:
      enable: true
      interval: 36000
      url: http://www.gstatic.com/generate_204

rules:
  - IP-CIDR,127.0.0.0/8,DIRECT
  - IP-CIDR,127.0.0.0/8,DIRECT
  - DOMAIN-SUFFIX,google.com,auto
  - DOMAIN,google.com,auto
  - DOMAIN-KEYWORD,google,auto
  - DOMAIN-SUFFIX,ad.com,REJECT
  - SRC-IP-CIDR,192.168.1.201/32,DIRECT
  # optional param "no-resolve" for IP rules (GEOIP, IP-CIDR, IP-CIDR6)
  - GEOIP,CN,DIRECT
  - DST-PORT,80,DIRECT
  - SRC-PORT,7777,DIRECT
  - RULE-SET,apple,REJECT # Premium only
  - MATCH,auto
```

## Rule

```yaml
# 已知 IP 段
- IP-CIDR,127.0.0.0/8,REJECT
- IP-CIDR,0.0.0.0/8,REJECT
- GEOIP,LAN,DIRECT

# 国内常见
- DOMAIN-SUFFIX,taobao.com,DIRECT
- DOMAIN-SUFFIX,qq.com,DIRECT
- DOMAIN-SUFFIX,jdapi.com,DIRECT

# 国外常见
- DOMAIN-SUFFIX,google.com,auto

- GEOIP,CN,DIRECT

#- RULE-SET,China,DIRECT

- MATCH,auto
```

| type           | desc                         |
| -------------- | ---------------------------- |
| DOMAIN-SUFFIX  | 域名后缀                     |
| DOMAIN         | 域名匹配                     |
| DOMAIN-KEYWORD | 域名关键字匹配               |
| IP-CIDR        | IP 段匹配                    |
| SRC-IP-CIDR    | 源 IP 段匹配                 |
| GEOIP          | GEOIP 数据库（国家代码）匹配 |
| DST-PORT       | 目标端口匹配                 |
| SRC-PORT       | 源端口匹配                   |
| PROCESS-NAME   | 源进程名匹配                 |
| RULE-SET       | Rule Provider 规则匹配       |
| MATCH          | 全匹配                       |

- RULE-SET
  - https://github.com/Loyalsoldier/clash-rules
- https://github.com/DivineEngine/Profiles/tree/master

## TProxy

```bash
sysctl -w net.ipv4.ip_forward=1

# 新的路由表
ip rule add fwmark 666 lookup 666
ip route add local 0.0.0.0/0 dev lo table 666

# clash
# ==================
# clash 链负责处理转发流量
iptables -t mangle -N clash

# DIRECT Private
iptables -t mangle -A clash -d 0.0.0.0/8 -j RETURN
iptables -t mangle -A clash -d 127.0.0.0/8 -j RETURN
iptables -t mangle -A clash -d 10.0.0.0/8 -j RETURN
iptables -t mangle -A clash -d 172.16.0.0/12 -j RETURN
iptables -t mangle -A clash -d 192.168.0.0/16 -j RETURN
iptables -t mangle -A clash -d 169.254.0.0/16 -j RETURN
iptables -t mangle -A clash -d 224.0.0.0/4 -j RETURN
iptables -t mangle -A clash -d 240.0.0.0/4 -j RETURN

# Proxy
iptables -t mangle -A clash -p tcp -j TPROXY --on-port 7893 --tproxy-mark 666
iptables -t mangle -A clash -p udp -j TPROXY --on-port 7893 --tproxy-mark 666

# 转发所有 DNS 查询到 1053 端口
# 此操作会导致所有 DNS 请求全部返回虚假 IP(fake ip 198.18.0.1/16)
iptables -t nat -I PREROUTING -p udp --dport 53 -j REDIRECT --to 1053

# 如果想要 dig 等命令可用, 可以只处理 DNS SERVER 设置为当前内网的 DNS 请求
#iptables -t nat -I PREROUTING -p udp --dport 53 -d 192.168.0.0/16 -j REDIRECT --to 1053

# 最后让所有流量通过 clash 链进行处理
iptables -t mangle -A PREROUTING -j clash

# clash_local
# ==================
# clash_local 链负责处理网关本身发出的流量
iptables -t mangle -N clash_local
# nerdctl 容器流量重新路由
#iptables -t mangle -A clash_local -i nerdctl2 -p udp -j MARK --set-mark 666
#iptables -t mangle -A clash_local -i nerdctl2 -p tcp -j MARK --set-mark 666

# 跳过内网流量
iptables -t mangle -A clash_local -d 0.0.0.0/8 -j RETURN
iptables -t mangle -A clash_local -d 127.0.0.0/8 -j RETURN
iptables -t mangle -A clash_local -d 10.0.0.0/8 -j RETURN
iptables -t mangle -A clash_local -d 172.16.0.0/12 -j RETURN
iptables -t mangle -A clash_local -d 192.168.0.0/16 -j RETURN
iptables -t mangle -A clash_local -d 169.254.0.0/16 -j RETURN

iptables -t mangle -A clash_local -d 224.0.0.0/4 -j RETURN
iptables -t mangle -A clash_local -d 240.0.0.0/4 -j RETURN

# 为本机发出的流量打 mark
iptables -t mangle -A clash_local -p tcp -j MARK --set-mark 666
iptables -t mangle -A clash_local -p udp -j MARK --set-mark 666

# 跳过 clash 程序本身发出的流量, 防止死循环(clash 程序需要使用 "clash" 用户启动)
iptables -t mangle -A OUTPUT -p tcp -m owner --uid-owner clash -j RETURN
iptables -t mangle -A OUTPUT -p udp -m owner --uid-owner clash -j RETURN

# 让本机发出的流量跳转到 clash_local
# clash_local 链会为本机流量打 mark, 打过 mark 的流量会重新回到 PREROUTING 上
iptables -t mangle -A OUTPUT -j clash_local

# 修复 ICMP(ping)
# 这并不能保证 ping 结果有效(clash 等不支持转发 ICMP), 只是让它有返回结果而已
# --to-destination 设置为一个可达的地址即可
sysctl -w net.ipv4.conf.all.route_localnet=1
iptables -t nat -A PREROUTING -p icmp -d 198.18.0.0/16 -j DNAT --to-destination 127.0.0.1
```

- 参考配置
  - https://gist.github.com/phlinhng/38a141862de775b10c613f7f2c6ade99
  - https://github.com/springzfx/cgproxy/blob/aaa628a76b2911018fc93b2e3276c177e85e0861/readme.md#known-issues
    - docker 不可以 tproxy

## openrc

```bash
#!/sbin/openrc-run
supervisor=supervise-daemon

name="Clash"
description="A rule-based tunnel in Go."
description_reload="Reload configuration without exiting"

command=/usr/local/bin/clash
command_args="-d /var/lib/clash/ -f /etc/clash/config.yaml"

CLASH_LOGFILE="${CLASH_LOGFILE:-/var/log/${RC_SVCNAME}.log}"
output_log=${CLASH_LOGFILE}
error_log=${CLASH_LOGFILE}

depend() {
  use logger dns
  need net
}

checkconfig() {
  if [ ! -f "/etc/clash/config.yaml" ] ; then
    eerror "No clash config.yaml"
    return 1
  fi
  return 0
}

reload() {
  ebegin "Reloading configuration"
  curl -X PUT -H "Authorization: Bearer $AUTH_TOKEN" -sf 127.0.0.1:9090/configs --json "{}"
  eend $?
}
```

# FAQ

## Start TProxy server error: operation not permitted

```bash
sudo setcap cap_net_bind_service,cap_net_admin+ep $(which clash)
```
