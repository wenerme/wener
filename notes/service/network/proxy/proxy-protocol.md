---
title: HAProxy Proxy Protocol
---

# HAProxy Proxy Protocol

- [proxy-protocol.txt](https://github.com/haproxy/haproxy/blob/master/doc/proxy-protocol.txt)
  - v1 - 明文 `PROXY TCP4 255.255.255.255 255.255.255.255 65535 65535\r\n\r\n`
  - v2 - 支持二进制，支持更多协议
- 使用场景
  - 想要知道原始 IP - 基于 IP 过滤
- 支持的服务
  - haproxy, nginx, varnish, stud, stunnel
  - postgres - [PROXY protocol support](https://www.postgresql.org/message-id/flat/CABUevEz9TLONY3VtOMkUUKpf%2BMb4XD79mXrtwUb-c9VwQ4ek-w%40mail.gmail.com#c9704d4e7ae56f3b58aa3ccf9b106bae)
    - 有 patch 还没合并
- 希望基于来源 IP 做策略的一般都会支持

```bash
# 测试
# 如果协议不匹配则会
# curl: (56) Recv failure: Connection reset by peer
curl --haproxy-protocol 127.0.0.1
```

## HAProxy

```haproxy title="frontend"
frontend http
  mode http
  bind 0.0.0.0:80 name v4
  bind :::80 name v6
  tcp-request connection expect-proxy layer4

frontend https
  mode http
  bind 127.0.0.1:443 name v4 crt /etc/haproxy/certs/frontend ssl alpn h2,http/1.1 accept-proxy
  bind :::443 name v6 crt /etc/haproxy/certs/frontend ssl v4v6 alpn h2,http/1.1 accept-proxy

frontend ssl
  mode tcp
  bind 0.0.0.0:443 name v4
  bind :::443 name v6 v4v6
  tcp-request connection expect-proxy layer4
```

```haproxy title="backend"
backend be
  server svr 192.168.1.2:443 check send-proxy
```

```bash
# CURL 测试 proxy protocol
curl --haproxy-protocol 192.168.1.2
```

## Nginx

```nginx
http {
  server {
    listen 80   proxy_protocol;
    listen 443  ssl proxy_protocol;

    #set_real_ip_from 192.168.1.0/24;
    #real_ip_header proxy_protocol;
  }
}

stream {
  server {
    listen 12345 proxy_protocol;
  }
}
```

- [Accepting the PROXY Protocol](https://docs.nginx.com/nginx/admin-guide/load-balancer/using-proxy-protocol/)
