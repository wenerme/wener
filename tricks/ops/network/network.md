# Network

## 转发

```bash
# 将改机作为对外访问的路由
# 通过 SNAT 将 172.16.1.0 网段的请求通过改机抓发
# 172.16.1.11 为本机地址
iptables -t nat -I POSTROUTING -s 172.16.1.0/24 -j SNAT --to-source 172.16.1.11
# 允许路由转发
sed -i 's/net.ipv4.ip_forward = 0/net.ipv4.ip_forward = 1/g' /etc/sysctl.conf;sysctl -p
```

## Wifi

### Tips

```bash
# 启用网卡
ifconfig wlan0 up
# 扫描热点
iwlist scan
# 生成配置
wpa_passphrase ssid-name passphrase > wpa.conf

# 可以使用 -B 参数在后台运行
wpa_supplicant -Dwext -ieth1 -c/root/wpa.conf
dhclient -r
dhclient wlan0

# 速度检测
# 服务端
nc -v -v -l -n -p 8000 | pv > /dev/null
# 客户端
time yes | pv |nc -v -v -n 192.168.1.1 8000 >/dev/null

# UDP
# Listen
netcat -ul 2115
# 端口检测
netcat -zv -u 127.0.0.1  2115
ls /usr/local/opt/nmap/bin
# ncat  ndiff  nmap  nping  uninstall_ndiff

# https://nmap.org/ncat/guide/ncat-usage.html
man ncat

# 端口转发
ncat -l localhost 8080 --sh-exec "ncat wener.me 80"
```
