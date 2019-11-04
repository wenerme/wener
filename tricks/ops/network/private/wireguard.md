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