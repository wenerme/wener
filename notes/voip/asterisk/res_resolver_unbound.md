---
title: res_resolver_unbound
---

# res_resolver_unbound

- 实现 ast_dns_resolver

## resolver_unbound.conf

```conf
[general]
; 默认 system
;hosts = /etc/hosts
; 默认 system
;resolv = /etc/resolv.conf
; 可指定多次，第一个为主要
;nameserver = 127.0.0.1
;debug = 99
; DNSSEC trusted anchors key
;ta_file = /etc/asterisk/dnssec_keys
```
