---
title: dnsmasq
---

# dnsmasq

- [dnsmasq](http://www.thekelleys.org.uk/dnsmasq/docs/dnsmasq-man.html)
  - 轻量级的 DNS, TFTP, PXE, router advertisement 和 DHCP 服务
  - 支持 DNSSEC
  - 可以作为小型的 DNS AS/授权服务器 - 直接提供域名记录
  - DNS forwarder
- Archlinux [dnsmasq](https://wiki.archlinux.org/index.php/dnsmasq)/[简体中文](<https://wiki.archlinux.org/index.php/Dnsmasq_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)>)
- Debian HowTo [dnsmasq](https://wiki.debian.org/HowTo/dnsmasq)
- musl dns
  - [docker-alpine](https://github.com/gliderlabs/docker-alpine/blob/master/docs/caveats.md#dns)
    - dns domain 搜索不生效
    - 并发 dns 服务有问题
  - [DNS resolution happenning only after timeout](http://www.openwall.com/lists/musl/2017/09/28/1)
  - [Functional differences from glibc](https://wiki.musl-libc.org/functional-differences-from-glibc.html)
- address=/.domain.tld/192.168.0.1 -> address=/domain.tld/192.168.0.1
- [reload](https://serverfault.com/a/934681) - 清除缓存重载部分配置文件
  - SIGHUP
  - /etc/hosts
  - /etc/ethers
  - --dhcp-hostsfile
  - --dhcp-hostsdir
  - --dhcp-optsfile
  - --dhcp-optsdir
  - --dhcp-optsdir
  - --addn-hosts
  - --hostsdir
- ports
  - 53 - DNS
  - 67 - DHCP

```bash
# 速度测试
time ping -c 1 baidu.com
time ping -4 -c 1 baidu.com
# 如果不方便 ping 也可以 wget
time wget --spider -q baidu.com

# 查看当前使用的 dns
cat /etc/resolv.conf
# 安装
apk add dnsmasq

# 配置
# 如果不需要其他服务访问, 可以使用 127.0.0.1, docker 中也会无法访问
# echo 'listen-address=127.0.0.1' >> /etc/dnsmasq.conf
echo 'resolv-file=/etc/resolv.dnsmasq.conf' >> /etc/dnsmasq.d/local.conf
# 添加 dns
echo 'nameserver 223.5.5.5' >> /etc/resolv.dnsmasq.conf
echo 'nameserver 114.114.114.114' >> /etc/resolv.dnsmasq.conf
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

# macOS 安装 - 可以使用 dnsmasq 来替代 hosts
brew install dnsmasq
# 配置文件 /usr/local/etc/dnsmasq.
cat << CONF > /usr/local/etc/dnsmasq.conf
# 上游
server=114.114.114.114
server=223.5.5.5
server=223.6.6.6

# 缓存数量
cache-size=655360
# 10m 缓存时间
min-cache-ttl=600

# 自定义解析 - 替代 /etc/hosts
# 所有 *.localhost 都会被解析到该地址
address=/localhost/127.0.0.1
# 其他测试服务地址
address=/cluster.internal/192.168.1.2
address=/cluster.lan/192.168.1.3
CONF
# 验证能启动
sudo dnsmasq -d -C /usr/local/etc/dnsmasq.conf
# 没问题后使用 brew 启动
brew service start dnsmasq

sudo dnsmasq -d -C /etc/dnsmasq.conf
echo 'echo "$interface" "$*"' > udhcpc.sh
chmod +x udhcpc.sh
sudo udhcpc -i eth0 -s $PWD/udhcpc.sh

ss -ln | grep '53|67'
sudo tcpdump -i eth0 -vvv -s 1500 '((port 67 or port 68) and (udp[8:1] = 0x1))'
```
