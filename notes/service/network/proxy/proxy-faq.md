---
tags:
  - FAQ
---

# Proxy FAQ

## tunnel vs overlay

- tunnel
  - 单端口 - 端口按需映射
  - 单 IP/固定 IP - TCP IP 层 - L4
- overlay
  - 网络 - CIDR
  - mac 层 - L2

## fake-ip

- DNS 服务器为域名分配假的 IP，在请求时就行映射
  - 客户端请求 A google.com
  - 服务端返回 192.168.2.1
  - 代理服务收到请求 192.168.2.1
    - 代理请求 google.com
- 代理服务作为网关角色
- https://www.rfc-editor.org/rfc/rfc3089
- https://blog.skk.moe/post/what-happend-to-dns-in-proxy/

## proxy env

- `[scheme]_proxy`
  - http_proxy
  - https_proxy
  - ftp_proxy
- all_proxy, ALL_PROXY

---

- https://everything.curl.dev/usingcurl/proxies
