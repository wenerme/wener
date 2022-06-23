---
title: tailscale
---

# tailscale

- [tailscale/tailscale](https://github.com/tailscale/tailscale)
  - BSD-3, Go
  - taildrop
    - 类似 Airdrop 能力
- 可使用 [headscale](./headscale.md) 提供控制服务
- 参考
  - [WireGuard vs. Tailscale](https://tailscale.com/kb/1086/tailscale-vs-wireguard)
  - [Tailscale CLI](https://tailscale.com/kb/1080/cli)
  - [价格](https://tailscale.com/pricing/#comparison)
    - Free - 1 User, 1 Admin, 1 ACL, 20 Devices, 1 Subnet routers
    - Team - 60$/User/Year - 5/Devices/User, 5 Subnet routers, 2 Admin, 5 Users in ACL
  - [k8s](https://github.com/tailscale/tailscale/tree/main/docs/k8s)
  - [tailscale-ssh](https://tailscale.com/blog/tailscale-ssh/)
- DNS 100.100.100.100

:::caution

- 一次只能加入一个网络
  - log into multiple tailscale accounts [#713](https://github.com/tailscale/tailscale/issues/713)
  - support connecting to multiple networks [#183](https://github.com/tailscale/tailscale/issues/183)
- Linux 下使用的 用户空间 wg 实现 - 性能弱于 wg
  - Kernel implementation of tstun [#3264](https://github.com/tailscale/tailscale/issues/3264)
  - Linux kernel Wireguard data plane [#426](https://github.com/tailscale/tailscale/issues/426)
- macOS GUI, iOS, Android 不支持修改 control server
  - 只有命令行才可以修改 control server
- IP 一旦分配不可修改 - IP 只能自动分配 - [How Tailscale assigns IP addresses](https://tailscale.com/kb/1033/ip-and-dns-addresses/)
  - 移除节点 - 重新加入
  - 清除 tailscale 状态
  - 固定 100.64.0.0/10 - CGNAT - RFC6598
- Custom records in MagicDNS [#1543](https://github.com/tailscale/tailscale/issues/1543)
- Open source server [#498](https://github.com/tailscale/tailscale/issues/498)
- Tailscale in browser [#3157](https://github.com/tailscale/tailscale/issues/3157)

:::

```bash
# macOS
brew install tailscale
# Golang
go install tailscale.com/cmd/tailscale{,d}@latest

# --accept-dns - 默认开启
# --accept-routes - 默认关闭
# --advertise-exit-node
# --advertise-routes=<ip>
# --advertise-tags=<tags>
# --authkey=<key>
# --exit-node=<ip>
# --force-reauth
# --host-routes
# --hostname=<name>
# --operator=<user>
# --operator=<user>
# --qr
# --reset
# --shields-up
tailscale up --login-server http://192.168.1.2:8080

tailscale down

tailscale ip
# 下次 up 需要重新授权
tailscale logout
# 网络状况
tailscale netcheck

tailscale ping host
tailscale status
tailscale web
```

## tailscaled

```bash
go install tailscale.com/cmd/tailscale{,d}@latest
# macOS
sudo tailscaled install-system-daemon
```

| flag                                    | default                       | for                                                                |
| --------------------------------------- | ----------------------------- | ------------------------------------------------------------------ |
| -bird-socket string                     |                               | path of the bird unix socket                                       |
| -debug `[ip]:port`                      |                               | listen debug server                                                |
| -outbound-http-proxy-listen `[ip]:port` |                               | outbound HTTP proxy                                                |
| -cleanup                                |                               | clean up system state and exit                                     |
| -port value                             | 0                             | UDP port for WireGuard and peer-to-peer traffic - 0 auto           |
| -socket string                          | /var/run/tailscaled.socket    | path of the service unix socket                                    |
| -socks5-server `[ip]:port`              |                               | SOCK5 server                                                       |
| -state string                           | `<statedir>/tailscaled.state` | state file                                                         |
| -statedir string                        |                               | path of config state, TLS certs, temporary incoming Taildrop files |
| -tun string                             | utun                          | userspace-networking 用户空间                                      |
| -verbose int                            | 0                             |

- -state - $HOME/.local/share/tailscale/tailscaled.state
  - `kube:<secret-name>`
  - `arn:aws:ssm:...` - AWS SSM
  - `mem:`
- -debug
  - /debug/metrics
- -port 41641

## debug

| debug             | for                                     |
| ----------------- | --------------------------------------- |
| derp-map          | DERP 列表                               |
| daemon-goroutines | goroutines                              |
| metrics           | metrics                                 |
| env               | cmd/tailscale environment               |
| hostinfo          | hostinfo                                |
| local-creds       | print how to access Tailscale local API |
| restun            | force a magicsock restun                |
| rebind            | force a magicsock rebind                |
| prefs             | print prefs                             |
| watch-ipn         | subscribe to IPN message bus            |

```bash
tailscale version

tailscale netcheck
tailscale status
tailscale derp-map
```

## Notes

- 记录的 JSON 状态
  - /var/lib/tailscale/tailscaled.state
    - `_daemon`
    - `_machinekey`
- DNS
  - 修改 /etc/resolv.conf
  - 备份之前配置 /etc/resolv.pre-tailscale-backup.conf
- DERP - Encrypted TCP relays

```bash
sudo jq -r ._daemon /var/lib/tailscale/tailscaled.state | base64 -d | jq
```

```json title="tailscaled.state"
{
  "ControlURL": "",
  "RouteAll": false,
  "AllowSingleHosts": true,
  "ExitNodeID": "",
  "ExitNodeIP": "",
  "ExitNodeAllowLANAccess": false,
  "CorpDNS": false,
  "WantRunning": true,
  "LoggedOut": false,
  "ShieldsUp": false,
  "AdvertiseTags": ["tag:linux"],
  "Hostname": "",
  "NotepadURLs": false,
  "AdvertiseRoutes": ["192.168.1.0/22"],
  "NoSNAT": false,
  "NetfilterMode": 2,
  "Config": {
    "PrivateMachineKey": "privkey:",
    "PrivateNodeKey": "privkey:",
    "OldPrivateNodeKey": "privkey:",
    "Provider": "",
    "LoginName": "truth"
  }
}
```

**AdvertiseRoutes**

```
-A POSTROUTING -j ts-postrouting
-A INPUT -j ts-input
-A FORWARD -j ts-forward

-A ts-postrouting -m mark --mark 0x40000 -j MASQUERADE

-A ts-forward -i tailscale0 -j MARK --set-xmark 0x40000/0xffffffff
-A ts-forward -m mark --mark 0x40000 -j ACCEPT
# 不 forward 内部
-A ts-forward -s 100.64.0.0/10 -o tailscale0 -j DROP
-A ts-forward -o tailscale0 -j ACCEPT
# 当前节点
-A ts-input -s 100.64.0.8/32 -i lo -j ACCEPT
-A ts-input -s 100.115.92.0/23 ! -i tailscale0 -j RETURN
-A ts-input -s 100.64.0.0/10 ! -i tailscale0 -j DROP
```

## derp

- zouyq/derper
- 80, 443, 3478
  - HTTPS + STUN
- 与 tailscaled 一同部署可达到限制访问的目的 - Auth
- [Custom DERP Servers](https://tailscale.com/kb/1118/custom-derp-servers/)

```bash
# 默认 DERP
curl -s https://controlplane.tailscale.com/derpmap/default | jq

# 安装
go install tailscale.com/cmd/derper@main
# macOS 交叉编译
# GOOS=linux go build -trimpath -o bin/derper ./cmd/derper
# GOOS=linux go build -trimpath -o bin/tailscale ./cmd/tailscale
# GOOS=linux go build -trimpath -o bin/tailscaled ./cmd/tailscaled

# 启动
derper --hostname=your-hostname.com
# 启动 - 通过本地 tailscaled 验证客户端
sudo derper --hostname=your-hostname.com --verify-clients
# behind proxy
# 需要修改代码: 启用 tls 关闭 debug
# -a 如果指定地址会同时用于 http 和 stun-port
sudo derper --hostname derper.example.com --verify-clients -a :28443 -http-port 28080
```

| flag                        | default                             | for                                                                                                   |
| --------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------- |
| -a `[ip]:port`              | :443                                | HTTPS listen address                                                                                  |
| -accept-connection-burst    | 9223372036854775807                 | burst limit for accepting new connection                                                              |
| -accept-connection-limit    | +Inf                                | rate limit for accepting new connection                                                               |
| -bootstrap-dns-names string |                                     | optional comma-separated list of hostnames to make available at /bootstrap-dns                        |
| -c string                   |                                     | 配置目录                                                                                              |
| -certdir string             | $HOME/.cache/tailscale/derper-certs | letsencrypt 证书目录                                                                                  |
| -certmode string            | letsencrypt                         | manual, letsencrypt                                                                                   |
| -dev                        |                                     | 开发模式                                                                                              |
| -hostname string            | derp.tailscale.com                  | LetsEncrypt host name                                                                                 |
| -http-port int              | 80                                  | -1 禁用                                                                                               |
| -logcollection string       |                                     | logtail collection to log to                                                                          |
| -mesh-psk-file string       |                                     | mesh pre-shared key file - hex string                                                                 |
| -mesh-with string           |                                     | optional comma-separated list of hostnames to mesh with; the server's own hostname can be in the list |
| -stun                       | true                                | 运行 STUN server                                                                                      |
| -stun-port int              | 3478                                |                                                                                                       |
| -verify-clients             | false                               | 通过本地 tailscaled 验证客户端                                                                        |

:::caution verify-clients

- tailscale sttaus 里的节点才能使用 derp - 否则会验证失败
- 可以考虑 derp 节点能看到所有其他节点
  - `{ Action: accept, Users: [ tag:derp ], Ports: [ "*:*" ] }`
- hostname 为访问 derp 的 域名 而不是 login-server 域名
- port 为 443 才会启用 tls - `tsweb.IsProd443(*addr) || *certMode == "manual"`

:::

## Taildrop

```bash
# 发送
# tailscale file cp <files> <name-or-ip>:
# 接收
tailscale file get .
```

## NAT

- https://tailscale.com/blog/how-nat-traversal-works/
  - [HN](https://news.ycombinator.com/item?id=24241105)

# Glossary

- Exit Node
  - 路由所有流量 - 类似传统 VPN 方式 - 0.0.0.0/0
  - `tailscale up --advertise-exit-node` 允许节点作为 Exit Node
  - 会添加 tag - 通过 `is:exit-node` 过滤
  - `tailscale up --exit-node=<exit-node-ip>` 客户端选择 Exit Node
- MagicDNS
  - 可以使用 hostname 访问设备
  - 还会添加 search domain 通过 网址域名访问
  - 可通过 `--accept-dns=false` 关闭
- Subnet Route
  - 作为网关桥接不同网络
  - --advertise-routes
  - ACL 控制 `{ "action": "accept", "users": ["*"], "ports": ["172.20.10.0/24:*",] }`

```bash
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p /etc/sysctl.conf
```

- IPN - Identified Private Network
- 用户空间网络
  - 使用 socks5 或 http 代理 访问网络
  - `tailscaled --tun=userspace-networking --socks5-server=localhost:1055`
  - 主要用于 serverless、容器、权限不足、不支持 tun 设备 等场景
  - [Userspace networking mode](https://tailscale.com/kb/1112/userspace-networking/)

# FAQ

## derphttp.Client.Recv connect to region 999: tls: first record does not look like a TLS handshake

检查 derper 是否启用 TLS 是否申请证书。

derper 只有在端口为 443 时才会申请 letsencrypt 证书。

## not connected to home DERP region 999

自定义的 DERP 确保能被访问，HTTP、HTTPS、STUN

## tsweb.AllowDebugAccess

默认允许访问 debug 的逻辑

```go
if tsaddr.IsTailscaleIP(ip) || ip.IsLoopback() || ipStr == envknob.String("TS_ALLOW_DEBUG_IP") {
  return true
}
```

如果使用了反向代理(例如: derper) 会导致检测失败。
