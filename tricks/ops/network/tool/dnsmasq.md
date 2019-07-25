---
id: dnsmasq
title: dnsmasq
---


# dnsmasq

## Tips

* Archlinux
  * [dnsmasq](https://wiki.archlinux.org/index.php/dnsmasq)
    * [简体中文](https://wiki.archlinux.org/index.php/Dnsmasq_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
* Debian HowTo [dnsmasq](https://wiki.debian.org/HowTo/dnsmasq)
* musl dns
  * https://github.com/gliderlabs/docker-alpine/blob/master/docs/caveats.md#dns
  * http://www.openwall.com/lists/musl/2017/09/28/1
  * https://wiki.musl-libc.org/functional-differences-from-glibc.html
* address=/.domain.tld/192.168.0.1 -> address=/domain.tld/192.168.0.1

```bash
# 速度测试
time ping -c 1 baidu.com
time ping -4 -c 1 baidu.com
# 查看当前使用的 dns
cat /etc/resolv.conf
# 安装
apk add dnsmasq


# 配置
# 如果不需要其他服务访问, 可以使用 127.0.0.1, docker 中也会无法访问
# echo 'listen-address=127.0.0.1' >> /etc/dnsmasq.conf
echo 'resolv-file=/etc/resolv.dnsmasq.conf' >> /etc/dnsmasq.d/local.conf
# 添加 dns
echo 'nameserver 223.5.5.5' >>  /etc/resolv.dnsmasq.conf
echo 'nameserver 114.114.114.114' >>  /etc/resolv.dnsmasq.conf
# 这里配置 127.0.0.1, docker 不会使用, 建议配置 172.17.0.1 或者实际静态 ip
echo 'nameserver 127.0.0.1' > /etc/resolv.conf
# 如果有 Docker 建议配置 172.17.0.1
# echo 'nameserver 172.17.0.1' > /etc/resolv.conf

# 测试配置
dnsmasq --test

# 启动
rc-service dnsmasq start
rc-update add dnsmasq

# 日志调试
# 还可以开启 log-dhcp
echo 'log-queries' > /etc/dnsmasq.d/log.conf
# 服务重启
rc-service dnsmasq restart
# 查看消息
tail -f /var/log/message
```
