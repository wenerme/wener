---
title: DNS over HTTPS (DoH)
tags:
  - DNS
  - HTTPS
  - Protocol
---

# DNS over HTTPS (DoH)

- [Cloudflare: DNS over HTTPS](https://developers.cloudflare.com/1.1.1.1/dns-over-https)
- [Google Public DNS: DoH JSON API](https://developers.google.com/speed/public-dns/docs/doh/json)
- [Wikipedia: DNS over HTTPS](https://en.wikipedia.org/wiki/DNS_over_HTTPS)

If you use JSON format, set `application/dns-json` URL parameter, and if you use DNS wire format, use `application/dns-message` as either URL parameter of `ct` or a Content-Type header for POST requests.

## Status Codes

- 400 DNS query not specified or too small.
- 413 DNS query is larger than maximum allowed DNS message size.
- 415 Unsupported content type.
- 504 Resolver timeout while waiting for the query response.

## Examples

```bash
curl -H 'accept: application/dns-json' 'https://cloudflare-dns.com/dns-query?name=example.com&type=AAAA'

curl 'https://cloudflare-dns.com/dns-query?name=example.com&type=AAAA&application/dns-json'
```
