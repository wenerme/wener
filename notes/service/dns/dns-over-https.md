---
title: DNS over HTTPS
---

# DoH

- [rfc8484](https://datatracker.ietf.org/doc/html/rfc8484)
- Server
  - https://dns.cloudflare.com/dns-query 被墙
  - https://dns.alidns.com/dns-query 不支持 application/dns+json
  - https://adh.avpclub.gq/dns-query
  - https://dns.futa.gg/dns-query
  - https://1.1.1.1/dns-query
  - https://1.0.0.1/dns-query
  - dns.cloudflare.com
  - dns.google.com
  - 9.9.9.9
- Client
  - macOS 11 Big Sur+
    - https://apple.nextdns.io
  - [dnscrypt-proxy](./dnscrypt.md) - 代理 - DoH -> DNS
  - Chrome
    - chrome://settings/security -> Use Secure DNS
  - Browser https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/encrypted-dns-browsers/
- 参考
  - https://dns.google
  - https://github.com/curl/curl/wiki/DNS-over-HTTPS
  - wikipedia [DNS-over-HTTPS](https://en.wikipedia.org/wiki/DNS_over_HTTPS)
  - https://developers.google.com/speed/public-dns/docs/doh

```bash
# curl 使用 DoT 解析
curl --doh-url https://dns.cloudflare.com/dns-query https://wener.me
# 直接解析
curl -s -H 'accept: application/dns-json' 'https://dns.cloudflare.com/dns-query?name=wener.me&type=A' | jq
curl -s -H 'accept: application/dns+json' 'https://dns.google.com/resolve?name=wener.me&type=A' | jq
# 不支持
curl -s -H 'accept: application/dns-json' 'https://dns.alidns.com/dns-query?name=wener.me&type=A'
```

```bash
cloudflared proxy-dns --port 5553

dig +short @127.0.0.1 -p5553 cloudflare.com AAAA

dnscrypt-proxy -resolve cloudflare-dns.com
```

```yaml title="/etc/cloudflared/config.yaml"
```

## Wireformat

- 最大 65535 bytes
- base64url encode
- binary 同 DNS over UDP - rfc1035
- ?dns
  - application/dns-message
  - 格式 https://datatracker.ietf.org/doc/html/rfc1035
- https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-wireformat/
