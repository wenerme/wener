---
title: GFW
---

# GFW

- 参考
  - [如何检测网站是否被屏蔽](https://blog.bgme.me/posts/how-to-detect-if-a-website-is-blocked-by-gfw/)
  - https://zh.greatfire.org/analyzer
  - https://www.comparitech.com/privacy-security-tools/blockedinchina/
  - https://www.dotcom-tools.com/china-firewall-test
- ESNI 会被直接阻断 - 不区分域名
- curl http 重复尝试会导致 IP 被间歇性阻断

```bash
apk add bind-tools # for dig
apk add knot-utils # for kdig

# DNS 污染
# ==========================
# 不存在的 dns 解析也返回了结果
dig google.com txt @example.com | grep 'ANSWER SECTION' -A1
# 12.34.56.78 是不存在 DNS 服务的也会返回 IP 解析内容
dig google.com txt @12.34.56.78

# 没有被污染的域名出现 timeout
# 因为 example.com 会解析为多个 IP 因此会出现多个 timeout
dig baidu.com txt +time=1 +tries=0 @example.com
# 出现一个连接 timeout
dig baidu.com txt +time=1 +tries=0 @$(dig baidu.com a +short | head -1)

# HTTP 阻断
# ==========================
# 需要指向境外 ip
# 解析了 HTTP 头，不关心实际连接地址
curl -v --connect-to ::example.com: http://google.com

# HTTPS SNI 阻断
# ==========================
# SNI 包含了域名信息，不关心实际连接地址
curl -v --connect-to ::example.com: https://www.wikipedia.org

# HTTP 被阻断但实际 IP 可能可以访问
# 可以通过本地反向代理
curl -i $(dig github.com a +short | head -1)
ping -c 1 -t 1 $(dig github.com a +short | head -1)

# IP Block
# ==========================
ping 64.233.189.100
mtr 64.233.189.100 --report

# Port/Service Block
# ==========================
ping 1.1.1.1         # OK
curl 1.1.1.1         # OK
curl https://1.1.1.1 # OK
telnet 1.1.1.1 853   # Not OK

# 正常情况这个是 OK 的但是被阻断, DoT 使用 853 端口
kdig @1.1.1.1 +tls-ca wener.me
```

- mtr
  - https://www.bitwizard.nl/mtr/
  - Full screen ncurses traceroute tool

## dns

- DNS 污染如果开启 dnssec 则相对容易检测到，但检测到 bogus 解析后 dnsmasq 无法选择其他的 resolver 解析。
- dnscrypt 能够确保获取到正确的解析，但似乎国内域名 cdn 解析会非常慢。
- 通过 dnsmasq-china-list 可改善国内 cdn 解析的问题
- 参考
  - [felixonmars/dnsmasq-china-list](https://github.com/felixonmars/dnsmasq-china-list)
  - dnscrypt
  - dnssec

## http

- 可通过本地 ca 反向代理
