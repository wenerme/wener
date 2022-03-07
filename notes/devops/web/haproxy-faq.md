---
tags:
  - FAQ
---

# HAProxy FAQ

## req_ssl_sni vs ssl_fc_sni

- req_ssl_sni
  - 用于 ssl paththrough 时
  - 会比 hdr(host) 快一点点
    - http://marc.info/?l=haproxy&m=144490809910124&w=2
- ssl_fc_sni
  - 用于 ssl offload 时

```bash
use_backend s1 if { ssl_fc_sni my.domain.org }
use_backend s2 if { hdr(host) -i my2.domain.org }
```

## TLS handshake, Client hello 后无响应

在 AlpineLinux 3.14 上，Host 内运行 HAProxy，使用 SNI Passthrough 出现该问题，修改为在容器内运行后问题解决。
在容器内使用完全相同的 HAProxy 版本也没有问题，一次断定是 Host 环境的问题。

**可能的原因**

- 系统依赖升级后未重启
