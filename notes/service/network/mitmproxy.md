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

## eMudhra 受损 CA

- **mitmproxy 12.3.0**（2026-10-22，eMudhra Edition）直接支持使用受损 eMudhra 中间 CA 签发代理叶证书，不需要自己下载或拼接密钥/证书 PEM
- 事件与信任库处置见 [2026-10 eMudhra 中间 CA 私钥失陷](../../security/incident/2026-10-17-emudhra-ca-compromise.md)
- 关联编号与产品范围见 [CVE-2026-111943](../../security/cve/cve-2026-111943.md)；Go CNA 记录针对 `crypto/x509`，下游另有同号引用，不将该编号当作全部证书事件的统一标识
- 默认仍使用本地 mitmproxy CA；以下两个选项默认均为 `false`，需要显式开启

| 选项 | 行为 | 适用条件 |
| --- | --- | --- |
| `--emudhra` | 用上游内置的受损中间 CA 材料签发叶证书，优先提供 emSign 证书链 | 客户端仍信任该路径，且未被其吊销、CT 或 pinning 策略阻止 |
| `--emudhra-old` | 同样启用受损 CA，优先提供 Sectigo `AAA Certificate Services` 交叉签名路径 | 只信任旧 AAA 根路径的客户端，尤其是只考虑所发第一条链的旧 OpenSSL 客户端 |

- `--emudhra-old` **可单独使用**，不必同时传 `--emudhra`；配置文件中的选项名为 `emudhra`、`emudhra_old`
- 发布说明称代理会发送两条候选链，但部分 OpenSSL 客户端只处理第一条；旧模式调整的是链顺序，不是关闭证书校验
- 客户端连接到代理、代理连接到真实上游是两个独立的 TLS 校验方向

```text
客户端 ← 代理签发的叶证书 ← mitmproxy → 校验真实上游证书 → 服务器
         --emudhra / --emudhra-old      certifi / 上游信任配置
```

仅在自有或明确授权的客户端环境中使用，以下命令不会自动配置客户端代理或改变路由：

```bash
# 12.3.0+：使用 eMudhra 链，代理只监听本机
mitmproxy --emudhra --listen-host 127.0.0.1 --listen-port 8080

# 旧信任库：优先使用 AAA 交叉签名链
mitmproxy --emudhra-old --listen-host 127.0.0.1 --listen-port 8080

# mitmweb 使用同一 TLS 选项；Web UI 也只监听本机
mitmweb --emudhra --listen-host 127.0.0.1 --listen-port 8080 \
  --web-host 127.0.0.1 --web-port 8081 --no-web-open-browser
```

:::caution 信任范围

这些中间 CA 已被吊销。该功能只对仍接受相应链的客户端有效；已更新的浏览器/信任库、强制 CT、证书 pinning 或其他校验策略都可能拒绝它。它不提供流量劫持能力，也不能绕过已生效的信任移除；正常调试仍可使用自己的本地 CA。

:::

- **上游校验防护：** 12.3.0 同时更新 certifi，预编译发行包移除了受影响根的信任；项目依赖要求 `certifi>=2026.10.19`
  - 源码安装、旧虚拟环境、冻结依赖和自定义上游 CA 配置仍需核对实际证书库，不能只看 mitmproxy 的版本号
  - 出现上游证书错误时应修复上游链或信任配置，不要用 `ssl_insecure=true` / `-k` 代替事件修复
- 此处按发布说明和固定源码核对，未启动代理或验证实际客户端

### 参考

- [Mitmproxy 12.3: eMudhra Edition](https://www.mitmproxy.org/posts/releases/mitmproxy-12.3/)
- [12.3.0 固定 CHANGELOG](https://github.com/mitmproxy/mitmproxy/blob/ac4f4cf7eab63effeb4b53b6bc09b5143aa42ae4/CHANGELOG.md)
- [固定 TLS 选项与证书链选择](https://github.com/mitmproxy/mitmproxy/blob/ac4f4cf7eab63effeb4b53b6bc09b5143aa42ae4/mitmproxy/addons/tlsconfig.py)
- [固定 CLI 参数注册](https://github.com/mitmproxy/mitmproxy/blob/ac4f4cf7eab63effeb4b53b6bc09b5143aa42ae4/mitmproxy/tools/cmdline.py)
