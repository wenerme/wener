---
title: sshuttle
---

# sshuttle
## Tips
* 注意
  * 不支持 UDP
  * 不能 PING
  * 类似于端口转发

```bash
# linux 下 tproxy 支持 udp
# https://sshuttle.readthedocs.io/en/stable/tproxy.html

ip route add local default dev lo table 100
ip rule add fwmark 1 lookup 100
ip -6 route add local default dev lo table 100
ip -6 rule add fwmark 1 lookup 100

sshuttle  --method=tproxy
```


## FAQ

### OSError: [Errno 88] Not a socket
* 最新版 sshuttle 已经支持 3.8
* Python 3.8
* [#381](https://github.com/sshuttle/sshuttle/issues/381) Fails to connect to endpoints with Python 3.8
* 指定为 py2 可解决 `--python /usr/bin/python2`
