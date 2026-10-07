---
title: sing-box 配置
tags:
  - Configuration
---

# sing-box 配置

:::info 版本

- 示例版本：1.14.x
- 配置校验：1.14.2，`sing-box check`
- 文档包含 1.15.0-alpha 内容；字段查看 `Since sing-box x.y`
- [migration](https://sing-box.sagernet.org/migration/)
- [deprecated](https://sing-box.sagernet.org/deprecated/)
- [changelog](https://sing-box.sagernet.org/changelog/)

:::

- `sing-box://import-remote-profile?url=urlEncodedURL#urlEncodedName`
  - 图形客户端导入 Remote Profile 的 URL Scheme
  - Remote Profile 默认 60 分钟自动更新，支持 HTTP Basic 认证
  - https://sing-box.sagernet.org/clients/general/

```bash
# 使用 .env + yaml 来配置
# 顶层 x-* 字段放 YAML anchor，explode 展开后删除
export $(grep -v '^#' .env.sb.local | xargs) \
  && envsubst < sb.envsubst.yaml | yq -P -o json 'explode(.) | del( ."x-*"  )' > sing-box.secret.json
# 值包含空格时改用: set -a; . ./.env.sb.local; set +a

sing-box check -c sing-box.secret.json
sing-box format -w -c config.json -D config_directory
sing-box merge output.json -c config.json -D config_directory
sing-box schema # 1.14+, 生成匹配当前二进制 build tags 的 JSON Schema
```

```json
{
  "$schema": "https://sing-box.sagernet.org/schema.json",
  "log": {},
  "dns": {},
  "ntp": {},
  "certificate": {},
  "certificate_providers": [],
  "http_clients": [],
  "network_namespaces": [],
  "endpoints": [],
  "inbounds": [],
  "outbounds": [],
  "route": {},
  "services": [],
  "experimental": {}
}
```

- `$schema`、`http_clients`、`certificate_providers`、`network_namespaces` 为 1.14 新增
- 未知字段直接报错：`json: unknown field "xxx"`
- 1.14.2 实测 `check` 接受 `//` 注释和尾逗号

## 规则路由匹配逻辑

```txt
(domain || domain_suffix || domain_keyword || domain_regex || ip_cidr || ip_is_private) &&
(port || port_range) &&
(source_ip_cidr || source_ip_is_private) &&
(source_port || source_port_range) &&
其他条件
```

- 官方文档仍列出 `geosite` / `geoip` / `source_geoip`，但它们已在 1.12 移除
- rule_set
  - 仅含一条 default rule 且无 `invert` 时，字段合并进外层规则按上式匹配
  - 其他情况作为「其他条件」匹配：其中任一规则匹配即命中（1.14 修正语义）
  - 多个 rule_set 之间总是 OR
  - `rule_set_ip_cidr_match_source` 让 rule_set 中的 `ip_cidr` 匹配源 IP
- `action` 省略时默认 `route`，`outbound` 简写仍有效
  - final：`route`、`bypass`（1.13+）、`reject`、`hijack-dns`
  - non-final：`route-options`、`sniff`、`resolve`，执行后继续匹配后续规则
- mixed -> socks4, socks4a, socks5, http
- [chika0801/sing-box-examples](https://github.com/chika0801/sing-box-examples)
  - 配置示例，注意对应版本

## tun

- auto_route
  - 将 tun 作为默认路由 或 配置 route_address
  - 需配合 `route.auto_detect_interface` / `route.default_interface` / `outbound.bind_interface` 防回环
- interface_name
- iproute2_table_index 默认 2022，iproute2_rule_index 默认 9000
- route_exclude_address_set / route_address_set
  - 开 `auto_redirect` 时写入 nftables
  - 不开时（1.11+）等价于加到 `route_exclude_address` / `route_address`；Android 图形客户端不可用

```json
{
  "type": "tun",
  "tag": "tun-in",
  "interface_name": "tun0",
  "address": ["172.16.0.1/30"],
  "mtu": 1400,
  "auto_route": true,
  "auto_redirect": false,
  "iproute2_table_index": 2022,
  "iproute2_rule_index": 9000,
  "strict_route": true,
  "stack": "gvisor",
  "route_exclude_address": ["223.5.5.5/32", "1.1.1.1/32", "10.0.0.0/8"],
  "route_exclude_address_set": ["geoip-cn"]
}
```

- 原 `gso`、`sniff`、`sniff_override_destination` 已移除，sniff 改为 route rule `{"action": "sniff"}`
- `route_exclude_address_set` 引用的 `geoip-cn` 需在 `route.rule_set` 中定义

```bash
ip ru
```

```
9000:	from all to 172.16.0.0/30 lookup 2022
9001:	from all lookup 2022 suppress_prefixlength 0
9002:	not from all dport 53 lookup main suppress_prefixlength 0
9002:	from all iif tun0 goto 9010
9003:	not from all iif lo lookup 2022
9003:	from 0.0.0.0 iif lo lookup 2022
9003:	from 172.16.0.0/30 iif lo lookup 2022
9010:	from all nop
```

- IPv4、未开 `auto_redirect` 时 sing-tun 生成的规则；IPv6、`strict_route`、`exclude_*`、`auto_redirect` 会改变规则
- 9000：去往 tun 网段的查 2022
- 9001：查 2022，但拒绝前缀长度 ≤ 0 的结果，即忽略 2022 中的默认路由
- 9002：非 53 端口先查 main，同样忽略默认路由，保留局域网等具体路由；53 端口跳过此规则，DNS 进入 tun
- 9002：来自 tun0 的流量跳到 9010（nop），回到系统默认规则
- 9003：非本机 lo 入口（如转发的 LAN 流量）、本机未绑定源地址、源为 tun 网段的流量查 2022
- `suppress_prefixlength NUMBER`：拒绝前缀长度 ≤ NUMBER 的路由决策，见 ip-rule(8)

```bash
ip ro show tab 2022
```

## Schema

- `"$schema": "https://sing-box.sagernet.org/schema.json"` 或 `sing-box schema` 生成（1.14+）
- https://github.com/GUI-for-Cores/GUI.for.SingBox/blob/main/frontend/src/types/profile.d.ts

## 最小客户端骨架

- 1.14+
- TUN / mixed 入站
- rule_set 分流
- geosite-cn → local；其余 DNS → remote，经 proxy DoH

```jsonc
{
  "$schema": "https://sing-box.sagernet.org/schema.json",
  "log": { "level": "info" },
  "dns": {
    "servers": [
      // 新格式：type + server；默认直连，走代理需显式 detour
      { "tag": "remote", "type": "https", "server": "1.1.1.1", "detour": "proxy" },
      { "tag": "local", "type": "https", "server": "223.5.5.5" }
    ],
    "rules": [{ "rule_set": "geosite-cn", "action": "route", "server": "local" }],
    "final": "remote"
  },
  // 1.14+: remote rule-set 通过代理下载
  "http_clients": [{ "tag": "via-proxy", "detour": "proxy" }],
  "inbounds": [
    {
      "type": "tun",
      "tag": "tun-in",
      "address": ["172.19.0.1/30", "fdfe:dcba:9876::1/126"],
      "auto_route": true,
      // "auto_redirect": true, // Linux 推荐
      "strict_route": true
    },
    // socks4/4a/5 + http；users 为空不鉴权，只监听本地
    { "type": "mixed", "tag": "mixed-in", "listen": "127.0.0.1", "listen_port": 7890 }
  ],
  "outbounds": [
    // 替换为实际代理 / selector
    { "type": "socks", "tag": "proxy", "server": "127.0.0.1", "server_port": 1080 },
    { "type": "direct", "tag": "direct" }
  ],
  "route": {
    "rules": [
      { "action": "sniff" },
      { "protocol": "dns", "action": "hijack-dns" },
      { "ip_is_private": true, "action": "route", "outbound": "direct" },
      { "rule_set": ["geosite-cn", "geoip-cn"], "action": "route", "outbound": "direct" }
    ],
    "rule_set": [
      {
        "type": "remote",
        "tag": "geosite-cn",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/SagerNet/sing-geosite/rule-set/geosite-cn.srs"
      },
      {
        "type": "remote",
        "tag": "geoip-cn",
        "format": "binary",
        "url": "https://raw.githubusercontent.com/SagerNet/sing-geoip/rule-set/geoip-cn.srs"
      }
    ],
    "final": "proxy",
    "auto_detect_interface": true, // 防止 tun 回环，Linux/Windows/macOS
    "default_domain_resolver": "local", // 1.12+，解析出站服务器域名
    "default_http_client": "via-proxy" // 1.14+
  },
  "experimental": {
    "cache_file": { "enabled": true } // 缓存 remote rule-set
  }
}
```

- 版本要求
  - rule action（`sniff`、`hijack-dns`）1.11+
  - 新 DNS server 格式、`default_domain_resolver` 1.12+；1.14 起旧格式启动报错
  - `http_clients` / `default_http_client` 1.14+；1.12–1.13 删掉这两项，在 rule_set 中写 `"download_detour": "proxy"`
- tun
  - `stack` 未设置时，有 gVisor build tag 默认 `mixed`，否则 `system`；1.15 起弃用 `stack`，改用 sing-tun 自带栈
  - 1.14 `dns_mode` 默认 `hijack`：设置系统接口 DNS（Linux 为 systemd-resolved）并做平台级 53 端口劫持
  - 未设 `dns_address` 时取 `address` 的下一个 IP（如 `172.19.0.2`）作为 DNS，并自动 hijack-dns
  - `auto_redirect` 基于 nftables，Linux 推荐；与 `route.default_mark`、`routing_mark` 冲突
- DNS
  - 新 DNS server 默认等同空 direct 出站；旧格式默认走 default outbound，迁移时注意补 `detour`
  - `strict_route` + `hijack-dns` - 系统 DNS 进入 sing-box DNS 模块

:::caution

- `sing-box check` 只校验配置，不验证运行时 DNS 泄漏
- TUN 需要 root / 管理员权限
- Linux
  - 发往本机接口地址的 DNS 不被劫持，如 `127.0.0.53`、宿主 LAN IP
  - 接口 DNS 设置依赖 systemd-resolved
- 应用自带 DoH / DoT 不经 53 端口劫持
- Windows `strict_route` 可阻止多宿主 DNS 泄漏

:::

- 1.14 用 geoip-cn 回落国内 DNS：先 `evaluate` 远端，结果 IP 属于 CN 时改用 local
  - 旧写法 DNS rule 直接引用 `geoip-cn`（不带 `match_response`）1.14 弃用，1.16 移除
  - 这样 CN IP 的域名仍会再查询一次 local

```json
{
  "dns": {
    "rules": [
      { "rule_set": "geosite-cn", "server": "local" },
      { "action": "evaluate", "server": "remote" },
      { "match_response": true, "rule_set": "geoip-cn", "action": "route", "server": "local" }
    ],
    "final": "remote"
  }
}
```

## 弃用/移除速查

| 旧写法                                                   | 新写法                                               | 状态                                |
| -------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------- |
| inbound `sniff` / `sniff_override_destination` / `sniff_timeout` / `domain_strategy` | route rule `action: sniff` / `resolve` | 1.11 弃用，1.13 移除                |
| `block` / `dns` 特殊出站                                 | `action: reject` / `hijack-dns`                      | 1.11 弃用，1.13 移除                |
| route rule 无 `action`，只写 `outbound`                     | 仍有效，等价 `action: route` + `outbound`              | 未弃用，1.11 起可显式写 `action`          |
| direct `override_address` / `override_port`              | `action: route-options`                              | 1.11 弃用，1.13 移除                |
| wireguard outbound                                       | `endpoints` wireguard                                | 1.11 弃用，1.13 移除                |
| tun `gso`                                                | 删除                                                 | 1.11 弃用，报错称 1.12 移除（deprecated 页写 1.13） |
| tun `inet4_address` / `inet6_address` / `inet{4,6}_route{,_exclude}_address` | `address` / `route_address` / `route_exclude_address` | 1.10 弃用，1.12 移除 |
| `geoip` / `geosite`、规则中的 `geoip` / `geosite` / `source_geoip` | `rule_set` + srs                           | 1.8 弃用，1.12 移除                 |
| DNS server `"address": "tls://1.1.1.1"`、`address_resolver` | `"type": "tls", "server": "1.1.1.1"`、`domain_resolver` | 1.12 弃用，1.14 移除 |
| DNS server `"address": "rcode://refused"`                | DNS rule `action: predefined`, `rcode`               | 同上                                |
| DNS rule `outbound`                                      | dial `domain_resolver` / `route.default_domain_resolver` | 1.12 弃用                       |
| rule_set `download_detour`                               | `http_client` / `http_clients`                       | 1.14 弃用，1.16 移除                |
| 未配置 `http_clients`（隐式走默认出站下载）               | 显式 `http_clients` + `route.default_http_client`    | 1.14 弃用，1.16 移除                |
| DNS rule `ip_cidr` / `ip_is_private` / 纯 IP rule_set（无 `match_response`） | `evaluate` + `match_response`    | 1.14 弃用，1.16 移除                |
| DNS rule action `strategy`、`rule_set_ip_cidr_accept_empty` | -                                                 | 1.14 弃用，1.16 移除                |
| `dns.independent_cache`                                  | 删除（缓存总按 transport 区分）                       | 1.14 弃用，1.16 移除                |
| `cache_file.store_rdrc`                                  | `store_dns`                                          | 1.14 弃用，1.16 移除                |
| tun `stack`                                              | 删除                                                 | 1.15 弃用，1.17 移除                |

常见启动报错

```
legacy inbound fields are deprecated in sing-box 1.11.0 and removed in sing-box 1.13.0
legacy DNS server formats are deprecated in sing-box 1.12.0 and removed in sing-box 1.14.0
geosite database is deprecated in sing-box 1.8.0 and removed in sing-box 1.12.0
GSO option in tun is deprecated in sing-box 1.11.0 and removed in sing-box 1.12.0
legacy tun address fields are deprecated in sing-box 1.10.0 and removed in sing-box 1.12.0
```
