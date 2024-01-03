---
title: sshuttle
---

# sshuttle

- [sshuttle/sshuttle](https://github.com/sshuttle/sshuttle)
  - LGPL-2.1, Python
  - VPN over SSH
  - 支持 Linux, macOS
- 类似于按需端口转发

:::caution

- 不支持 UDP
- 不能 PING

:::

```bash
sshuttle -r 192.168.66.0/24 host

# 不校验主机 - 用于主机可能是一个临时容器的场景
sshuttle -e '-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null' -r 192.168.66.0/24 host
```

```bash title="tproxy"
# linux 下 tproxy 支持 udp
# https://sshuttle.readthedocs.io/en/stable/tproxy.html

ip route add local default dev lo table 100
ip rule add fwmark 1 lookup 100
ip -6 route add local default dev lo table 100
ip -6 rule add fwmark 1 lookup 100

sshuttle --method=tproxy
```

# FAQ

## Windows

- https://sshuttle.readthedocs.io/en/stable/windows.html
- https://github.com/sshuttle/sshuttle/issues/794

## OSError: [Errno 88] Not a socket

- 最新版 sshuttle 已经支持 3.8
- Python 3.8
- [#381](https://github.com/sshuttle/sshuttle/issues/381) Fails to connect to endpoints with Python 3.8
- 指定为 py2 可解决 `--python /usr/bin/python2`

## cleanup pfctl anchor

```bash
sudo pfctl -sr | grep -o -E 'sshuttle[^"]+' | xargs -i sudo pfctl -a {} -F  all
```
