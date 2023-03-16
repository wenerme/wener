---
tags:
  - FAQ
---

# Platform FAQ

## 链接超时 {#idle-connections}

- 云平台会主动切断 idle 的链接，这个和局域网的链接不同
- 应用需要主动 ping/keepalive 保持链接，否则从链接池里拿出来链接可能已经 timeout
- 操作系统层面可以配置 tcp keepalive 进行保活
- 大多链接池都支持
  - IdleTimeout
    - 建议小于 10 分钟
    - idle 时长，如果配置的比 平台/系统 层 idle 短，也能避免取到无效链接的问题
  - TestOnBorrow - 有一定性能影响
  - TestOnReturn
  - TestWhileIdle - 影响小，但会浪费一定链接数量
    - 需要慎重考虑配置的 idle 数量
- 链接池
  - apache commons-pool [GenericObjectPool](https://commons.apache.org/proper/commons-pool/apidocs/org/apache/commons/pool2/impl/GenericObjectPool.html)
    - 支持 IdleTime, TestWhileIdle, TestOnCreate, TestOnBorrow, TestOnReturn
  - HikariCP [HikariConfig](https://javadoc.io/doc/com.zaxxer/HikariCP/latest/com/zaxxer/hikari/HikariConfig.html)
    - IdleTimeout, KeepaliveTime
    - KeepaliveTime 检测 idle 的周期

**系统 TCP KeepAlive**

- tcp_keepalive_time
  - 上次数据包发送后，多久开始发送 keepalive
  - 开始发送 keepalive 后，该值不在重要
  - TCP_KEEPIDLE
- tcp_keepalive_intvl
  - 发送 keepalive 的间隔
  - TCP_KEEPINTVL
- tcp_keepalive_probes
  - 多少次 unack 后认为链接已经断开，通知应用层
  - TCP_KEEPCNT

```bash
# Linux
# 默认 7200，75，9
# 2小时, 75s, 9次
sysctl net.ipv4.tcp_keepalive_time net.ipv4.tcp_keepalive_intvl net.ipv4.tcp_keepalive_probes

# 1分钟, 1分钟, 5次
sysctl -w \
  net.ipv4.tcp_keepalive_time=60 \
  net.ipv4.tcp_keepalive_intvl=60 \
  net.ipv4.tcp_keepalive_probes=5

cat <<EOF | sudo tee /etc/sysctl.d/99-tcp_keepalive.conf
net.ipv4.tcp_keepalive_time = 60
net.ipv4.tcp_keepalive_intvl = 60
net.ipv4.tcp_keepalive_probes = 5
EOF
sudo sysctl -p /etc/sysctl.d/99-tcp_keepalive.conf

# macOS
sysctl net.inet.tcp.always_keepalive net.inet.tcp.keepidle net.inet.tcp.keepinit net.inet.tcp.keepintvl
```

- GCP 是 10 分钟
  - https://cloud.google.com/compute/docs/troubleshooting/general-tips?hl=zh-cn#idle-connections
- AWS ELB 默认是 1 分钟
  - 可修改为 1 - 4000
  - [Configure the idle connection timeout for your Classic Load Balancer](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/config-idle-timeout.html)
- AWS API Gateway 默认 10 分钟
  - [Amazon API Gateway quotas and important notes](https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html)
- https://tldp.org/HOWTO/html_single/TCP-Keepalive-HOWTO/
