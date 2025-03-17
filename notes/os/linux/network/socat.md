---
title: socat
---

# socat

- [man page](http://www.dest-unreach.org/socat/doc/socat.html)
- [EXAMPLES](https://github.com/craSH/socat/blob/master/EXAMPLES)

:::caution

- 一次只能一个端口

:::

```bash
# 转发本地的 8080 到 百度
# -d 用于打开日志
socat -v -d TCP-LISTEN:8080,fork,reuseaddr TCP:baidu.com:80

# 测试
curl -H 'Host: baidu.com' 127.0.0.1:8080

# 转发本地 1053 到阿里公网 dns
socat TCP-LISTEN:1053,fork,reuseaddr TCP:223.5.5.5:53
socat UDP-RECVFROM:1053,fork,reuseaddr UDP:223.5.5.5:53

# 测试
dig -p 1053 baidu.com @127.0.0.1

# 转发本地到谷歌 DNS
socat TCP-LISTEN:53,fork,reuseaddr TCP:8.8.8.8:53
socat UDP-RECVFROM:53,fork,reuseaddr UDP:8.8.8.8:53

# 常用命令
# 避免后面 SUDO 要求密码
sudo ls
sudo `which socat` TCP-LISTEN:53,fork,reuseaddr TCP:8.8.8.8:53 > socat.tcp.53.log &
sudo `which socat` UDP-RECVFROM:53,fork,reuseaddr UDP:8.8.8.8:53 > socat.udp.53.log &

# 但 "防火墙" 会检测出来,一会儿转发的 DNS 就不能用了

# 监听 UDP, 将内容输出到 stdio
socat -u udp4-recv:8123 -
# 客户端发送
echo "test" | socat - udp4-sendto:127.0.0.1:8123

# 连接后启动程序
socat -u udp-l:8123,fork exec:/bin/cat
# tcp
socat -u tcp-l:80,fork exec:/bin/cat

# 输出到文件
socat -u TCP-LISTEN:12456,keepalive,reuseaddr,rcvbuf=131071 STDOUT

# server
socat exec:'bash -li',pty,stderr,setsid  tcp-listen:8999,reuseaddr
# cli
socat tcp-connect:127.0.0.1:8999 file:`tty`,raw,echo=0

# over socks
# socks 10.10.1.1:1080
socat TCP-LISTEN:8080 SOCKS:10.10.1.1:216.58.200.238:80,socksport=1080
curl localhost:8080

# dns udp
socat -v UDP-LISTEN:15353,fork,reuseaddr SOCKS:10.10.1.1:8.8.8.8:53,socksport=1080

# 配合 SSH 使用
# ProxyCommand socat - socks:127.0.0.1:%h:%p,socksport=3333

# 可以指定本地地址
SOCAT_SOCKADDR=x.y.z.t socat TCP-LISTEN:80,reuseaddr,fork,su=nobody TCP:a.b.c.d:80
```

|   opt | desc                          |
| ----: | ----------------------------- |
|    -d | fatal                         |
|   -dd | notice                        |
|  -ddd | info                          |
| -dddd | debug                         |
|    -D | log file descriptors          |
|    -u | 双向模式 - 第一个读，第二个写 |
|    -U | 双向模式 - 第一个写，第二个读 |
|    -4 | IPv4                          |
|    -6 | IPv6                          |

| address type     | short |
| ----------- | ----- |
| tcp-connect | tcp   |
| tcp-listen  | tcp-l |
