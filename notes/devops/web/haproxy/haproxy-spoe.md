---
title: SPOE
---

# HAProxy SPOE

- 参考
  - https://github.com/haproxy/haproxy/blob/master/doc/SPOE.txt
  - https://www.haproxy.com/blog/extending-haproxy-with-the-stream-processing-offload-engine

| term | for                                |
| ---- | ---------------------------------- |
| SPOE | Stream Processing Offload Engine   |
| SPOA | Stream Processing Offload Agent    |
| SPOP | Stream Processing Offload Protocol |

```
frontend myproxy
  # 调用 SPOE
  # filter spoe [engine <name>] config <spoe-config-file>
  filter spoe engine ip-reputation config iprep.conf
  # 通过 SPOE 变量做判断
  tcp-request content reject if { var(sess.iprep.ip_score) -m int lt 20 }

# 定义 SPOE 后端
backend agents
    mode tcp
    balance roundrobin
    timeout connect 5s  # greater than hello timeout
    timeout server  3m  # greater than idle timeout
    option spop-check
    server agent2 192.168.1.11:12345 check
```

**spoe-config-file**

```
[ip-reputation]
spoe-agent iprep-agent
    messages check-client-ip
    # 变量前缀
    option var-prefix iprep
    timeout hello 2s
    timeout idle  2m
    timeout processing 10ms
    # 指向后端
    use-backend agents
    log global

spoe-message check-client-ip
    args ip=src
    event on-client-session if ! { src -f /etc/haproxy/whitelist.lst }
```

- [SpiderLabs/ModSecurity](https://github.com/SpiderLabs/ModSecurity)
- [corazawaf/coraza](https://github.com/corazawaf/coraza)
  - 兼容 ModSecurity
