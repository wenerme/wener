---
title: DNSCrypt
---

# DNSCrypt

- 是什么？
  - DNS 客户端和 Resolver 之间的通信协议
  - 支持加密，认证，匿名
- [dnscrypt.info](https://dnscrypt.info/)
  - [在线服务列表](https://dnscrypt.info/public-servers)
    - [dnscrypt/dnscrypt-resolvers](https://github.com/dnscrypt/dnscrypt-resolvers)

# dnscrypt-proxy

```bash
apk add dnscrypt-proxy
dnscrypt-proxy -config /etc/dnscrypt-proxy/dnscrypt-proxy.toml

# docker
docker run -d --restart always \
  -p 5353:53 \
  --name dnscrypt wener/dnscrypt

# docker network create svc
# docker run -d --restart always \
#   -p 5353:53 \
#   --net svc --ip 172.18.0.153 \
#   --name dnscrypt wener/dnscrypt
```

## 配置

- 默认配置 [example-dnscrypt-proxy.toml](https://github.com/DNSCrypt/dnscrypt-proxy/blob/master/dnscrypt-proxy/example-dnscrypt-proxy.toml)
