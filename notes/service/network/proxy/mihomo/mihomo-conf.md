---
title: Mihomo 配置
tags:
  - Configuration
---

# Mihomo 配置

- [DNS](#dns)
- [客户端配置](#minimal) - TUN + sniffer + DNS 分流 + rule-providers
- [规则与规则集](#rules)
- [sniffer](#sniffer) - 嗅探
- [与 Clash 的差异](#clash)
- proxies - 出站代理
  - 内置
    - DIRECT
    - REJECT
    - REJECT-DROP - 静默丢弃
    - PASS - 跳过当前命中的规则，继续匹配后续规则；在 SUB-RULE 中命中会跳出子规则
    - PASS-RULE - 同 PASS，但在 SUB-RULE 中不跳出，继续匹配子规则后续项 - v1.19.27+
    - COMPATIBLE = DIRECT - 策略组筛选不出节点时出现
- proxy-groups - 代理组
  - 内置 GLOBAL
    - 所有代理组和代理节点
    - 可以覆盖定义
    - 自定义时建议写全所有策略组，面板按 GLOBAL 内顺序排序
  - `empty-fallback` - 组为空时的回退 proxy，默认 COMPATIBLE - v1.19.27+
- proxy-providers - 代理集合
- rule-providers - 规则集合
- 入站代理
  - mixed-port - HTTP+Socks
  - port - HTTP/HTTPS
  - socks-port - SOCKS4/4a/5
  - redir-port
    - Linux, Android, macOS
    - 仅 TCP
  - tproxy-port
    - Linux, Android
    - TCP+UDP
  - tun
  - listeners
- https://wiki.metacubex.one/config/general/

```yaml
log-level: warning
mixed-port: 7890
allow-lan: true
bind-address: "*"
# off, always, strict
find-process-mode: off
mode: rule
tcp-concurrent: true
unified-delay: true
ipv6: false
```

```bash
# 配置了 tun+sniffer 也可以这样
# 198.18.0.1 在 fake-ip-range 内但没有映射，parse-pure-ip 会从 Host 嗅探出域名
curl -H 'Host: example.com' 198.18.0.1
```

**域名匹配规则**

| sym | rule         | true                                           | false                         |
| --- | ------------ | ---------------------------------------------- | ----------------------------- |
| `*` | `*.wener.me` | `a.wener.me`                                   | `a.a.wener.me`<br/>`wener.me` |
| `+` | `+.wener.me` | `wener.me`<br/>`a.wener.me`<br/>`a.a.wener.me` | -                             |
| `.` | `.wener.me`  | `a.wener.me`<br/>`a.a.wener.me`                | `wener.me`                    |

- 用于 fake-ip-filter、nameserver-policy、sniffer、domain 规则集等
- 规则 `DOMAIN-WILDCARD` 不同：`*` 匹配零个或多个字符，`?` 匹配一个字符 - v1.19.12+
- 可以引入集合 `rule-set:xxx`、`geosite:xxx`，rule-set 的 behavior 需为 domain/classical
- 端口范围 `114-514/810-1919,65530`
- 参考
  - https://github.com/ewigl/mihomo
  - https://wiki.metacubex.one/handbook/syntax/

## DNS

- enhanced-mode
  - redir-host - 默认值，返回真实 IP，连接时按 IP 反查域名 (DNSMapping)
  - fake-ip - 返回 fake-ip-range 内的地址，连接时映射回域名
  - normal - 源码可解析，wiki 未列出
- default-nameserver
  - 用来解析 DNS 服务器自身的域名，必须是 IP
  - 可以是加密 DNS，如 tls://223.5.5.5:853
- nameserver-policy
  - 根据域名选择 DNS，优先于 nameserver/fallback
  - key 支持通配符、`geosite:cn,private`、`rule-set:a,b`
- nameserver - 默认的 DNS
- fallback
  - 通常为海外 DNS，和 nameserver 并发查询
  - 配合 fallback-filter: geoip-code: CN
  - `fallback-filter.geosite` 已废弃，改用 nameserver-policy
  - `fallback-lazy-query: true` - 先判断 nameserver 的结果，满足 filter 再查 fallback - v1.19.28+
- proxy-server-nameserver
  - 仅用于解析代理节点的域名，不填则遵循 nameserver-policy、nameserver、fallback
  - `proxy-server-nameserver-policy` - 同 nameserver-policy 格式，需 proxy-server-nameserver 非空 - v1.19.20+
- direct-nameserver
  - DIRECT 出站重新解析用，不填则遵循 nameserver-policy、nameserver、fallback
  - `direct-nameserver-follow-policy` - 默认 false，不遵循 nameserver-policy
  - v1.19.10 起也用于 UDP；Tun 入站仅 fake-ip 下生效
- respect-rules
  - DNS 连接本身遵守路由规则
  - 必须配置 proxy-server-nameserver，否则启动报错，避免鸡生蛋
  - 只作用于 nameserver/fallback/nameserver-policy；不作用于 proxy-server-nameserver/direct-nameserver/default-nameserver
  - 强烈不建议和 `prefer-h3` 一起用
- fake-ip-filter-mode - v1.18.8+
  - blacklist - 默认，匹配的不返回 fake-ip
  - whitelist - 只有匹配的返回 fake-ip
  - rule - v1.19.19+，fake-ip-filter 写成规则，`DOMAIN-SUFFIX,qq.com,real-ip`、`MATCH,fake-ip`
- `use-hosts`/`use-system-hosts` 默认 true
- `ipv6: false` 时 AAAA 返回空
- `enable: false` 时使用系统 DNS

**解析流程**

- 规则匹配到域名规则
  - 命中代理 - TCP 一般把域名交给代理远端解析；UDP 出站（如 Shadowsocks）可能在建立连接时用本机 resolver 解析
  - 命中直连 - 本地解析；配置了 direct-nameserver 则用它重新解析
- 匹配到 IP 规则时需要先解析域名
  - nameserver-policy 命中则用它
  - 否则用 nameserver，有 fallback 时并发查询再按 fallback-filter 选择结果
- https://wiki.metacubex.one/config/dns/diagram/

**fake-ip vs redir-host**

|                | fake-ip                                      | redir-host                                   |
| -------------- | -------------------------------------------- | -------------------------------------------- |
| 返回           | 198.18.0.1/16 内的地址                       | 真实 IP                                      |
| 本地解析       | 命中代理的 TCP 连接通常不解析；UDP 出站可能解析 | 每次都解析                                   |
| 速度           | 首包快，无需等上游 DNS                       | 需等待解析                                   |
| 兼容性         | 需要真实 IP 的应用要加 fake-ip-filter        | 好                                           |
| 退出后         | 系统缓存的 fake-ip 可能失效                  | 无影响                                       |
| 持久化         | `profile.store-fake-ip` 保存映射             | -                                            |

- fake-ip-filter 常加：局域网 `+.lan`、`+.local`，NTP、STUN、连通性检测域名
- fallback 中的 DoH 域名会自动加入 fake-ip 过滤

**nameserver-policy**

- [客户端配置](#minimal) - DNS 片段依赖同一份 rule-providers / rules
- 国内/私有域名 → 国内 DoH
- 其余域名 → 海外 DoH，`respect-rules` 按 rules 选出站
- 节点域名 → proxy-server-nameserver；DIRECT 重解析 → direct-nameserver
- 不用 rule-set 时可用 `geosite:cn,private`，依赖 geosite.dat
- policy 命中后不进入 nameserver / fallback
- policy 未命中的 A/AAAA/CNAME：非 lazy 模式下并发查询 nameserver / fallback
- 配置 policy 后可以不配 fallback

:::caution

- fallback-filter 选择查询结果，不隔离国内外 DNS 查询

:::

**旧写法 - fallback + fallback-filter**

```yaml
dns:
  enable: true
  enhanced-mode: redir-host
  default-nameserver:
    - 223.5.5.5
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  fallback:
    - https://1.1.1.1/dns-query
    - tls://8.8.4.4
  fallback-filter:
    geoip: true
    geoip-code: CN # 非 CN 的结果视为污染，采用 fallback
    ipcidr:
      - 240.0.0.0/4
    domain:
      - '+.google.com'
```

**防泄露要点与边界**

- tun `dns-hijack` 把 53 端口的 DNS 导入 DNS 模块
  - macOS/Windows 无法自动劫持发往局域网的 DNS
  - Android 开启「私人 DNS」后无法劫持
  - 应用内置的 DoH/DoT（443/853）不经过 53，不会进入 DNS 模块
- `strict-route`
  - Linux：连接路由到 tun，防止地址泄露，让 Android 上的 DNS 劫持生效；排除路由等例外条件待确认
  - Windows：加防火墙规则，阻止多宿主 DNS 解析导致的泄露
  - 可能影响 VirtualBox 等应用
- fake-ip 命中代理的 TCP 连接通常不在本地解析
- 仍可能本地解析
  - IP 类规则：GEOIP、IP-CIDR、ipcidr rule-set
  - UDP 出站建连，如 Shadowsocks UDP 使用本机 resolver
- 减少不必要的解析
  - 域名规则在 IP 规则前
  - 私有网段规则使用 `no-resolve`
- 本地解析时，查询发往哪个 DNS 取决于 nameserver-policy/nameserver
  - 不开 respect-rules 时 DNS 连接直连，海外 DoH 可能被阻断
  - 开 respect-rules 后 DNS 连接按 rules 选出站
- 节点域名由 proxy-server-nameserver 解析，DNS 连接直连
- 参考
  - https://wiki.metacubex.one/config/dns/
  - https://wiki.metacubex.one/config/inbound/tun/

**支持的协议**

```yaml
# DNS 服务器列表，如 nameserver
# ts://、et:// 依赖对应出站

# UDP - 53
- 223.5.5.5
- udp://223.5.5.5
# TCP - 53
- tcp://8.8.8.8
# DoT - DNS over TLS - 853
- tls://1.1.1.1
# Do DNS over HTTPS - 443
- https://doh.pub/dns-query
# DoQ - DNS over QUIC - 853, 784
- quic://dns.adguard.com:784
# 系统
- system://
- system
# DHCP
- dhcp://en0
- dhcp://system # 仅限 cmfa，使用系统 dns
# Tailscale 出站的 DNS 配置 - v1.19.25+
- ts://tailscale
# EasyTier 出站 overlay 网络的 A/PTR，建议放 nameserver-policy - v1.19.31+
- et://easytier

# 固定返回值 - 用于屏蔽域名
- rcode://success # No error
- rcode://format_error # Format error
- rcode://server_failure # Server failure
- rcode://name_error # Non-existent domain
- rcode://not_implemented # Not implemented
- rcode://refused # Query refused
```

- 参数 - `#` 附加，`&` 连接多个
  - `tls://dns.google#RULES` - 遵守路由规则，同 respect-rules
  - `tls://dns.google#proxy` - 指定代理，不存在时当作接口名
  - `tls://dns.alidns.com#eth0`
  - `https://dns.cloudflare.com/dns-query#h3=true`
    - 强制 HTTP/3
  - `skip-cert-verify=true` - 不验证证书
  - `name-cert-verify=` - 只改证书 DNSName 校验目标，不改 SNI - v1.19.29+
  - `ecs=1.1.1.1/24`
    - ECS 的 subnet，v1.19.11 起所有 DNS 客户端支持
  - `ecs-override=true`
    - ECS 强制覆盖 subnet
  - `disable-ipv4=true` / `disable-ipv6=true` - 丢弃 A/AAAA 回应
  - `disable-qtype-65=true` - 丢弃指定类型，65 为 HTTPS - v1.19.19+
  - `https://8.8.8.8/dns-query#proxy&ecs=1.1.1.1/24&ecs-override=true`
- 国内 DNS - DoT, DoH
  - 阿里云
    - 223.5.5.5
    - 223.6.6.6
    - dns.alidns.com
  - 腾讯云 DnsPod
    - 1.12.12.12
    - 120.53.53.53
    - https://doh.pub/dns-query
- 国外 DNS - DoT, DoH, DoQ
  - ⚠️ 目前海外服务都是被阻断或者污染的状态
  - Google
    - dns.google
    - 8.8.8.8
    - 8.8.4.4
  - Cloudflare
    - 1.1.1.1
    - 1.0.0.1
    - https://cloudflare-dns.com/dns-query
    - https://one.one.one.one/dns-query
- 参考
  - https://wiki.metacubex.one/config/dns/type/
  - https://www.andan.me/diary/1742.html

```bash
kdig -d @1.1.1.1 +tls-ca +tls-host=one.one.one.one example.com
kdig @dns.adguard.com wener.me +quic
kdig @dns.google example.com +quic
curl --http2 --header "accept: application/dns-json" "https://1.1.1.1/dns-query?name=cloudflare.com" --next --http2 --header "accept: application/dns-json" "https://1.1.1.1/dns-query?name=example.com"
```

## 客户端配置 {#minimal}

- TUN + mixed-port + sniffer + rule-providers
- 配置参考：v1.19.32 wiki / 源码
- 配置校验：v1.19.27，`mihomo -t`
- proxy-providers 替代 proxies 时，策略组用 `include-all` 引入
- sniffer 字段见 [sniffer](#sniffer)

```yaml
mixed-port: 7890
allow-lan: false
mode: rule
log-level: warning
ipv6: false
find-process-mode: strict
unified-delay: true
tcp-concurrent: true
external-controller: 127.0.0.1:9090
secret: ''

profile:
  store-selected: true
  store-fake-ip: true

tun:
  enable: true
  # system, gvisor, mixed, mips
  # mips >= v1.19.31，v1.19.32 起为默认；之前默认 gvisor
  # stack: mips
  auto-route: true
  auto-redirect: true # 仅 Linux，需要 auto-route
  auto-detect-interface: true
  strict-route: true
  dns-hijack:
    - any:53
    - tcp://any:53

sniffer:
  enable: true
  sniff:
    HTTP:
      ports: [80, 8080-8880]
      override-destination: true
    TLS:
      ports: [443, 8443]
    QUIC:
      ports: [443, 8443]

dns:
  enable: true
  ipv6: false
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
    - 'rule-set:private_domain'
    - '+.lan'
    - '+.local'
  respect-rules: true # >= v1.18.6，必须配置 proxy-server-nameserver
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  # 节点域名，直连解析
  proxy-server-nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  # DIRECT 出站重新解析
  direct-nameserver: # >= v1.18.10
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  # 国内/私有域名走国内 DNS
  nameserver-policy:
    'rule-set:private_domain,cn_domain':
      - https://dns.alidns.com/dns-query
      - https://doh.pub/dns-query
  # 其余走海外 DoH，respect-rules 下按 rules 走代理
  nameserver:
    - https://1.1.1.1/dns-query
    - https://8.8.8.8/dns-query

proxies:
  - name: ss1
    type: ss
    server: server.example.com
    port: 443
    cipher: aes-128-gcm
    password: 'password'
    udp: true

proxy-groups:
  - name: PROXY
    type: select
    proxies: [AUTO, DIRECT]
    include-all: true
  - name: AUTO
    type: url-test
    include-all: true
    url: https://www.gstatic.com/generate_204
    interval: 300
    tolerance: 50

# 非 mihomo 字段，仅作 YAML 锚点，解析时忽略
rule-anchor:
  domain: &domain { type: http, interval: 86400, behavior: domain, format: mrs }
  ip: &ip { type: http, interval: 86400, behavior: ipcidr, format: mrs }

rule-providers:
  private_domain:
    <<: *domain
    url: https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/private.mrs
  cn_domain:
    <<: *domain
    url: https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/cn.mrs
  proxy_domain:
    <<: *domain
    url: https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/geolocation-!cn.mrs
  private_ip:
    <<: *ip
    url: https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/private.mrs
  cn_ip:
    <<: *ip
    url: https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geoip/cn.mrs

rules:
  # 域名规则在前，IP 规则在后，减少不必要的本地解析
  - RULE-SET,private_domain,DIRECT
  - RULE-SET,proxy_domain,PROXY
  - RULE-SET,cn_domain,DIRECT
  - RULE-SET,private_ip,DIRECT,no-resolve
  - RULE-SET,cn_ip,DIRECT
  - MATCH,PROXY
```

- `external-controller` 监听非 127.0.0.1 时设置 `secret`
- `allow-lan: true` 时可用 `lan-allowed-ips`/`lan-disallowed-ips`、`authentication` 限制访问
- 参考
  - https://wiki.metacubex.one/config/
  - https://github.com/MetaCubeX/mihomo/blob/Meta/docs/config.yaml

## 规则与规则集 {#rules}

- GEOSITE/GEOIP
  - `GEOSITE,cn,DIRECT` 依赖 geosite.dat
  - `GEOIP,CN,DIRECT` 默认 `geodata-mode: false` 使用 mmdb，true 使用 geoip.dat
  - 默认从 MetaCubeX/meta-rules-dat releases 下载，`geox-url` 可改
  - `geo-auto-update: false` 默认不自动更新，`geo-update-interval` 单位小时
- rule-providers
  - type: http/file/inline - inline >= v1.19.1
  - behavior: domain/ipcidr/classical
  - format: yaml/text/mrs - mrs >= v1.18.7，仅支持 domain/ipcidr
  - `path` 限制在 HomeDir 内，其他位置需设置 `SAFE_PATHS`
  - `path-in-bundle` - 本地文件不存在时从 HomeDir 的 BundleMRS.7z 解压 - v1.19.27+
  - 非 inline 也可写 `payload`，作为下载/解析失败时的兜底 - v1.19.6+
- wiki 示例同时给了 GeoX 版（GEOSITE/GEOIP）和 mrs 版（RULE-SET），按需选择
  - mrs 按需下载单个集合，体积小，dns/fake-ip-filter/sniffer 都能用 `rule-set:` 引用
- `no-resolve` - IP 类规则不触发 DNS 解析；之前的规则已经解析过时，仍会匹配

```bash
# yaml/text -> mrs
mihomo convert-ruleset domain yaml cn.yaml cn.mrs
mihomo convert-ruleset ipcidr text cn.txt cn.mrs
```

- 参考
  - https://wiki.metacubex.one/config/rules/
  - https://wiki.metacubex.one/config/rule-providers/

## sniffer

```yaml
sniffer:
  enable: true
  force-dns-mapping: true # 默认 true
  parse-pure-ip: true # 默认 true
  override-destination: true # 默认 true
  sniff:
    HTTP:
      ports: [80, 8080-8880]
      override-destination: true
    TLS:
      ports: [443, 8443]
    QUIC:
      ports: [443, 8443]
  force-domain:
    - +.v2ex.com
  skip-domain:
    - 'Mijia Cloud'
    - '+.push.apple.com'
  skip-src-address:
    - 192.168.0.3/32
  skip-dst-address:
    - 192.168.0.3/32
```

| key                  | for                                                       |
| -------------------- | --------------------------------------------------------- |
| force-dns-mapping    | 对 redir-host 映射的流量强制嗅探                          |
| parse-pure-ip        | 对没有域名的流量强制嗅探                                  |
| override-destination | 用嗅探结果替换目标域名；sniff 下每个协议可单独覆盖        |
| sniff                | 协议仅 HTTP/TLS/QUIC，`ports` 为端口范围                  |
| force-domain         | 强制嗅探的域名                                            |
| skip-domain          | 嗅探出的 SNI/Host 命中时不替换                            |
| skip-src-address     | 跳过的来源 IP 段 - v1.18.8+                               |
| skip-dst-address     | 跳过的目标 IP 段 - v1.18.8+                               |

- 只有以下情况会嗅探
  - 没有域名且 parse-pure-ip
  - redir-host 映射得到的域名且 force-dns-mapping
  - 命中 force-domain
  - fake-ip 下已映射回域名的连接默认不嗅探，需要时用 force-domain
- 端口需在对应协议的 `ports` 内
- force-domain/skip-domain 支持 `rule-set:`、`geosite:` - v1.18.8+
- HTTP 支持 H2C，QUIC 支持 QUICv2 - v1.19.30+
- 同一目标多次嗅探失败后会暂时跳过，force-domain 除外
- 旧字段 `sniffing`、`port-whitelist` 已废弃，用 `sniff`
- 参考
  - https://wiki.metacubex.one/config/sniff/

## 与 Clash 的差异 {#clash}

- 基础结构兼容 Clash：port/socks-port/mixed-port、proxies、proxy-groups、rules
- wiki 中记录的 mihomo 扩展
  - 规则：GEOSITE、IP-ASN、DOMAIN-WILDCARD、DOMAIN-REGEX、AND/OR/NOT、SUB-RULE、PROCESS-NAME-REGEX 等
  - 规则集：mrs 格式、inline
  - DNS：nameserver-policy 支持 geosite/rule-set、proxy-server-nameserver、direct-nameserver、respect-rules、DoQ
  - sniffer、tun 的 mips 栈、auto-redirect
  - 策略组：include-all、exclude-filter、exclude-type（基础 `filter` 在 Clash v1.15.0 已有）
- 已移除/废弃的写法
  - `global-client-fingerprint` 已移除（v1.19.27），在 proxy 上设置 `client-fingerprint`
  - sniffer `sniffing`/`port-whitelist` 改用 `sniff`
  - tun `inet4-route-address` 等改用 `route-address`/`route-exclude-address`
  - 策略组 `interface-name`/`routing-mark` 改用节点上的字段
