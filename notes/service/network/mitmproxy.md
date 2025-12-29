---
title: MitmProxy
---

# mitmproxy

- [mitmproxy/mitmproxy](https://github.com/mitmproxy/mitmproxy)
  - MIT, Python
- 证书安装访问 http://mitm.it/
- [Doc](http://docs.mitmproxy.org/en/stable/)
- [工作模式](https://docs.mitmproxy.org/stable/concepts-modes/)
  - Regular Proxy
    - 作为 HTTP 代理服务器
    - 客户端安装证书 - 访问 mitm.it 安装证书
  - Transparent - 透明代理
    - 客户端无法配置 HTTP 代理的场景
    - 通过路由等手段直接将流量转发到 mitmproxy
      - 配置默认网关
      - 配置下一跳地址
  - Reverse Proxy - 反向代理
    - 服务端配置，代理服务端流量
  - Uptream Proxy - 上游代理
    - 作为二级代理使用
    - 可配置下一级代理地址
  - SOCKS Proxy
    - 基于 SOCKS5 的代理协议 - 默认 HTTP 协议
- 服务
  - mitmproxy - TUI
  - mitmweb - WebUI
  - mitmdump - 写入文件
- frozenpandaman/splatnet2statink - [mitmproxy instructions](https://github.com/frozenpandaman/splatnet2statink/wiki/mitmproxy-instructions)

```bash
brew install mitmproxy # macOS brew

mitmweb --mode regular --no-web-open-browser --web-port 8080 --listen-port 8888

mitmweb --mode upstream:http://127.0.0.1:7890 --no-web-open-browser --web-port 8080 --listen-port 8888

openssl genrsa -out cert.key 2048
openssl req -new -x509 -key cert.key -out cert.crt
cat cert.key cert.crt > cert.pem

# 默认 ~/.mitmproxy/mitmproxy-ca.pem
mitmweb --certs squid-ca-cert.pem --mode regular --no-web-open-browser --web-port 8080 --listen-port 8888

# UI http://0.0.0.0:8081/
# HTTP Proxy http://0.0.0.0:8080/
docker run --rm -it -v $HOME/.mitmproxy:/home/mitmproxy/.mitmproxy \
  -p 8080:8080 \
  -p 8081:8081 \
  --name mitmproxy mitmproxy/mitmproxy mitmweb --web-host 0.0.0.0

curl -x 0.0.0.0:8080 wener.me
curl -x 0.0.0.0:8080 icanhazip.com
```

- mode
  - regular
  - transparent
  - wireguard
  - `reverse:https://example.com@443`

## 透明代理

- [HowTo Transparent](https://docs.mitmproxy.org/stable/howto-transparent/)

```bash
# 启用转发
sysctl -w net.ipv4.ip_forward=1
# 禁用 ICMP 转发
sysctl -w net.ipv4.conf.all.send_redirects=0

iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 8080

# IPv6
sysctl -w net.ipv6.conf.all.forwarding=1
ip6tables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
ip6tables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 8080
```

**启动**

```bash
mitmproxy --mode transparent --showhost
```

## 添加证书

- 走代理访问 http://mitm.it/ 能看到证书

```bash
curl --proxy 127.0.0.1:8080 --cacert ~/.mitmproxy/mitmproxy-ca-cert.pem https://wener.me

# macOS 全局添加
sudo security add-trusted-cert -d -p ssl -p basic -k /Library/Keychains/System.keychain ~/.mitmproxy/mitmproxy-ca-cert.pem
# macOS 全局删除
sudo security delete-certificate -c "mitmproxy" /Library/Keychains/System.keychain

# NodeJS
NODE_EXTRA_CA_CERTS=~/.mitmproxy/mitmproxy-ca-cert.pem
# 或
NODE_TLS_REJECT_UNAUTHORIZED=0
```

- https://docs.mitmproxy.org/stable/concepts-certificates/
