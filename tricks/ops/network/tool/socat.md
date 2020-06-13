---
id: socat
title: socat
---

# socat

* [man page](http://www.dest-unreach.org/socat/doc/socat.html)
* [EXAMPLES](https://github.com/craSH/socat/blob/master/EXAMPLES)

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
```
