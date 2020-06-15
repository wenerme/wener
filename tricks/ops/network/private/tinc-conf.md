---
id: tinc-conf
title: Tinc 配置
---

# Tinc 配置

## 配置项
* [tinc.conf.5](https://www.tinc-vpn.org/documentation-1.1/tinc.conf.5)

```ini
# The symmetric cipher algorithm used to encrypt UDP packets. 默认 blowfish
# 检测 CPU 是否支持 aes
# grep aes /proc/cpuinfo --color auto
# SHA1 HMAC 
# 对启用了 ExperimentalProtocol 不生效
Cipher = aes-128-cbc

# 启用后, 会尝试使用 SPTPS 协议, key 交换会使用 Ephemeral ECDH, 会使用 Ed25519 作为授权, 而不是 RSA, 因此需要先生成 Ed25519
ExperimentalProtocol = yes

# 影响监听和外部 sockets 包, any 会根据操作系统进行创建 ipv4 和 ipv6
# ipv4 | ipv6 | any
AddressFamily = any

# 如果启用, 会自动尝试与其他节点建立 meta 链接, 而不需要设置 ConnectTo
# 不能链接 Port=0 的节点 - 系统随机端口
# 试验阶段
# yes | no
AutoConnect = yes

# 设置广播包发到其他节点的方式, 所有节点需要使用相同的方式, 否则可能会产生路由循环
# no 不发送广播包 
# mst 使用 Minimum Spanning Tree, 保证发往每个节点
# direct 只发送给直接访问的节点, 从其他节点接收到的不转发. 如果设置了 IndirectData, 广播包也会发送给有 meta 链接的节点
# 试验阶段
# no | mst | direct
Broadcast = mst

# 转发策略
# 实验阶段
# off 不转发
# internal 内部转发
# kernel 包发往 TUN/TAP 设备, 交由内核转发, 性能更低, 但能使用内核的路由功能
Forwarding = internal

# 尝试发现本机网络中的节点
# 允许与本地节点地址建立直接连接
# 目前, 本地发现机制是通过在 UDP 发现阶段发送本地地址的方式
LocalDiscovery = yes

# 只允许 /etc/tinc/NETNAME/hosts/ 下的 Subnet 信息
# 例如 A -> B -> C - C 不会学习到 A 的子网信息
# 实验阶段
StrictSubnets = no

# 不会转发其他节点间的信息， /etc/tinc/NETNAME/hosts/ , 隐性指定 StrictSubnets
# 实验阶段
TunnelServer = no

# UDP 包的摘要算法, 可使用 LibreSSL 或 OpenSSL 支持的算法, 指定 none 可关闭包验证.
# 对使用 ExperimentalProtocol 的节点不生效
Digest = sha1

# 节点初始路径 MTU - Path MTU
# 1514
PMTU = 1514
# 自动发现 MTU
PMTUDiscovery = yes
# 发送发现 MTU 消息的间隔
MTUInfoInterval = 5
```
