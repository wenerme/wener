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

:::caution

- Linux 下使用的 用户空间 wg 实现 - 性能弱于 wg
  - Kernel implementation of tstun [#3264](https://github.com/tailscale/tailscale/issues/3264)
  - Linux kernel Wireguard data plane [#426](https://github.com/tailscale/tailscale/issues/426)
- macOS GUI, iOS, Android 不支持修改 control server
  - 只有命令行才可以修改 control server

:::

```bash
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

## Notes

- 记录的 JSON 状态
  - /var/lib/tailscale/tailscaled.state
- DNS
  - 修改 /etc/resolv.conf
  - 备份之前配置 /etc/resolv.pre-tailscale-backup.conf
- DERP - Encrypted TCP relays

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
