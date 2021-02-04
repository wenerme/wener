# GFW

* 参考
  * [如何检测网站是否被屏蔽](https://blog.bgme.me/posts/how-to-detect-if-a-website-is-blocked-by-gfw/)
  * https://zh.greatfire.org/analyzer
* ESNI 会被直接阻断 - 不区分域名
* curl http 重复尝试会导致 IP 被间歇性阻断

```bash
# DNS 污染
# 不存在的 dns 解析也返回了结果
dig google.com txt @example.com | grep 'ANSWER SECTION' -A1

# HTTP 阻断 - 需要指向境外 ip
# 解析了 HTTP 头，不关心实际连接地址
curl -v --connect-to ::example.com: http://google.com

# HTTPS SNI 阻断
# SNI 包含了域名信息，不关心实际连接地址
curl -v --connect-to ::example.com: https://www.wikipedia.org

# HTTP 被阻断但实际 IP 可以访问
# 可以通过本地反向代理
curl -i $(dig github.com a +short | head -1)
ping -c 1 -t 1 $(dig github.com a +short | head -1)

# IP Block
ping 64.233.189.100
mtr 64.233.189.100 --report
```

## dns
* DNS 污染如果开启 dnssec 则相对容易检测到，但检测到 bogus 解析后 dnsmasq 无法选择其他的 resolver 解析。
* dnscrypt 能够确保获取到正确的解析，但似乎国内域名 cdn 解析会非常慢。
* 通过 dnsmasq-china-list 可改善国内 cdn 解析的问题
* 参考
  * [felixonmars/dnsmasq-china-list](https://github.com/felixonmars/dnsmasq-china-list)
  * dnscrypt
  * dnssec

## http
* 可通过本地 ca 反向代理
