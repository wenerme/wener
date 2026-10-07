---
title: DNS over HTTPS (DoH)
tags:
  - DNS
  - HTTPS
  - Protocol
---

# DNS over HTTPS (DoH)

- [Cloudflare: DNS over HTTPS](https://developers.cloudflare.com/1.1.1.1/dns-over-https)
  - [Using JSON](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/dns-json/)
- [Google Public DNS: DoH JSON API](https://developers.google.com/speed/public-dns/docs/doh/json)
- [Wikipedia: DNS over HTTPS](https://en.wikipedia.org/wiki/DNS_over_HTTPS)

- JSON
  - 只支持 GET，查询编码在 URL；Cloudflare 需要 `Accept: application/dns-json`
  - 没有 RFC，Cloudflare 沿用 Google 的 schema，各家行为可能不同；严格场景用 wire format
  - 参数：`name`（必填）、`type`（默认 `A`）、`do`（DNSSEC）、`cd`（关闭校验）
- wire format - RFC 8484，`application/dns-message`
  - GET：`?dns=<base64url DNS 报文>`
  - POST：body 为二进制报文，必须设置 `Content-Type: application/dns-message`，否则返回 415

## Status Codes

- 400 DNS query not specified or too small.
- 413 DNS query is larger than maximum allowed DNS message size.
- 415 Unsupported content type.
- 504 Resolver timeout while waiting for the query response.

## Examples

```bash
# Cloudflare JSON
curl -H 'accept: application/dns-json' 'https://cloudflare-dns.com/dns-query?name=example.com&type=AAAA'
curl -H 'accept: application/dns-json' 'https://1.1.1.1/dns-query?name=example.com&type=A&do=1'

# Google JSON
curl 'https://dns.google/resolve?name=example.com&type=AAAA'
# ct=application/x-javascript 显式请求 JSON；ct=application/dns-message 则返回二进制 DNS 报文
curl 'https://dns.google/resolve?name=example.com&type=A&ct=application/x-javascript'
```

```json
{
  "Status": 0,
  "TC": false,
  "RD": true,
  "RA": true,
  "AD": true,
  "CD": false,
  "Question": [{ "name": "example.com.", "type": 28 }],
  "Answer": [{ "name": "example.com.", "type": 28, "TTL": 1726, "data": "2606:2800:220:1:248:1893:25c8:1946" }]
}
```

- `Status` 是 DNS RCODE：0 NOERROR，2 SERVFAIL，3 NXDOMAIN
- `type` 为数字：1 A，5 CNAME，28 AAAA
