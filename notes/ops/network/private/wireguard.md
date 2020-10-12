---
id: wireguard
title: WireGuard
---

# WireGuard

## Tips
* [性能对比](https://www.wireguard.com/performance)
* [WireGuard Mesh Configurator](https://github.com/k4yt3x/wireguard-mesh-configurator)
  * mesh 配置工具 - 批量生成配置
  * 不会自动发现 - 需要额外配置
* [wg-dynamic](https://github.com/WireGuard/wg-dynamic)
  * Wireguard Dynamic IP Configuration Tool
  * 未完成 - 无维护
* [gsliepen/tinc#178](https://github.com/gsliepen/tinc/issues/179) - tinc: Wireguard backend
* 常见端口 51820
* [限制](https://www.wireguard.com/known-limitations/)
  * 不会对包做混淆
  * 通道使用 UDP - TCP over UDP
  * 使用 ChaCha20Poly1305 加密，目前基本不支持硬件加速
  * Roaming Mischief - 漫游场景不太友好
  * Identity Hiding Forward Secrecy
  * Post-Quantum Secrecy - 加密方式不是后量子时代安全的
  * Denial of Service
* 参考
  * [WireGuard VPN: What You Need to Know](https://restoreprivacy.com/wireguard)

```bash
# 内核模块
apk add wireguard-$(uname -r | sed -r 's/.*?-(.*)$/\1/')
# 用户空间工具
apk add wireguard-tools

# 配置 A 端
# ==========
# 生成密钥和公钥
wg genkey | tee wg0.pri | wg pubkey > wg0.pub
# 配置网卡
ip link add wg0 type wireguard
ip addr add 10.0.0.1/24 dev wg0
wg set wg0 listen-port 51820 private-key wg0.pri
ip link set wg0 up

# 配置 B 端
# ==========
# 生成密钥和公钥
wg genkey | tee wg0.pri | wg pubkey > wg0.pub
# 配置网卡
ip link add wg0 type wireguard
ip addr add 10.0.0.2/24 dev wg0
wg set wg0 listen-port 51820 private-key wg0.pri
ip link set wg0 up

# A -> B
# ==========
# 在 B 执行 - 将输出结果在 A 执行
# 如果 B 没有 A 能直接访问的地址 - 则忽略 endpoint
echo wg set wg0 peer $(cat wg0.pub) persistent-keepalive 25 allowed-ips 10.0.0.2/32 endpoint <主机B地址>:51820

# B -> A
# ==========
# 在 A 执行 - 将输出结果在 B 执行
# 如果 A 没有 B 能直接访问的地址 - 则忽略 endpoint
echo wg set wg0 peer $(cat wg0.pub) persistent-keepalive 25 allowed-ips 10.0.0.1/32 endpoint <主机A地址>:51820

# 在 B 能访问 A
ping 10.0.0.1
```

## FAQ
### 桥接或DHCP
* wg 只支持 L3 - TCP/IP
  * DHCP 需要 L2 层 MAC
* 桥接的网路可以考虑通过路由实现 - [例如](https://lists.zx2c4.com/pipermail/wireguard/2018-January/002341.html)
* 如果需要桥接可以考虑 tinc 的 switch 模式或者 [l2tp](https://remote-lab.net/linux-l2tp-ethernet-pseudowires)
