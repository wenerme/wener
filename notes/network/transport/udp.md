# UDP

## FAQ

### 使用 iptable 进行转发
* [Need iptables port forwarding for BIDIRECTIONAL UDP](https://serverfault.com/questions/828769)

```bash
# NAT 到目标地址
iptables -t nat -A PREROUTING -p udp -i eth0 -d 192.168.1.2 --dport 1003 -j DNAT --to-destination 192.168.1.2:1004
# 如果目标为本地可以使用 REDIRECT
iptables -t nat -A PREROUTING -p udp -i eth0 -d 192.168.1.2 --dport 1003 -j REDIRECT --to-ports 1004
# 允许本地目标端口接收请求
iptables -A FORWARD -p udp -i eth0  -d 192.168.1.2 --dport 1004 -m state --state NEW,ESTABLISHED,RELATED -j ACCEPT
```
