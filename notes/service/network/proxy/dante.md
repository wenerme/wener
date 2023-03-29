---
title: Dante
---

# Dante

- [dante](http://www.inet.no/dante/)
  - consists of a SOCKS server and a SOCKS client
  - [文档](https://www.inet.no/dante/doc/1.4.x/index.html)
- sockd - 服务端
- socks - 客户端
- socksify - 基于 LD_PRELOAD 的代理
- https://lvii.gitbooks.io/outman/content/dante.html
- [sockd.conf.5](https://www.inet.no/dante/doc/1.4.x/sockd.conf.5.html)

:::tip

- 如果配置了 ipsec，则 external 需要配置 ipsec 的 left 地址 - 否则不会经过 ipsec

::

```bash
# macOS 安装
brew install dante

# 服务端安装
apk add dante{,-server}

# 校验配置文件
sockd -V -f /etc/sockd.conf

# Docker 启动
# 通过 ip 限制访问
docker run -d --restart always -v /etc/localtime:/etc/localtime:ro \
  -p 127.0.0.1:8888:8888 \
  --name dante wener/dante
```

**sockd.conf**

- 规则条件 clientcompatibility, clientmethod, command, from, group, socksmethod, protocol, proxyprotocol, to, user
- 规则动作 bandwidth, libwrap, log, session, redirect, timeout.connect, timeout.negotiate, timeout.io, timeout.tcp_fin_wait, udp.portrange

```conf
# 日志输出
logoutput: stdout
# 监听地址
# 可以是地址或 interface
internal: 0.0.0.0 port = 8888
# 出口网卡或地址 - macOS 使用 en0
external: eth0
# 客户端授权方式 - 支持 pam.address pam.any none rfc931
clientmethod: none
# 服务端选择的授权方式
socksmethod: none
user.privileged: root
user.unprivileged: nobody
# 客户端规则 - 基于客户端信息进行的规则校验
# --------
# 接收访问
client pass {
  from: 0.0.0.0/0 to: 0.0.0.0/0
  log: error
}
# 禁止访问 127/8
client block {
  from: 0.0.0.0/0 to: 127.0.0.0/8
  log: error
}
# socks 规则 - 基于 socks 协议层信息进行的规则校验
# --------
socks pass {
  from: 0.0.0.0/0 to: 0.0.0.0/0
  # 应用规则的指令 bind, bindreply, connect, udpassociate, udpreply
  command: bind connect udpassociate
}
socks pass {
  from: 0.0.0.0/0 to: 0.0.0.0/0
  command: bindreply udpreply
  log: error
}
socks block {
  from: 0.0.0.0/0 to: 127.0.0.0/8
  command: bind connect udpassociate
  log: connect error
}
```

## 基础配置

```pre title="sockd.conf"
logoutput: stderr
internal: 0.0.0.0 port = 8888
# External address or interface
external: eth0
clientmethod: none
socksmethod: none
user.privileged: root
user.unprivileged: nobody
client pass {
        from: 0.0.0.0/0 to: 0.0.0.0/0
        log: error
}
client block {
        from: 0.0.0.0/0 to: 127.0.0.0/8
        log: error
}
socks pass {
        from: 0.0.0.0/0 to: 0.0.0.0/0
        command: bind connect udpassociate
}
socks pass {
        from: 0.0.0.0/0 to: 0.0.0.0/0
        command: bindreply udpreply
        log: error
}
socks block {
        from: 0.0.0.0/0 to: 127.0.0.0/8
        command: bind connect udpassociate
        log: connect error
}
```
