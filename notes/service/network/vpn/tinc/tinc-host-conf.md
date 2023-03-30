---
title: Tinc Host 配置
tags:
  - Configuration
---

# tinc host conf

- 只包含公共连接信息
- 可发给其他人使用
- https://www.tinc-vpn.org/documentation-1.1/Host-configuration-variables.html

```ini
# 推荐设置地址信息
# 在外连到节点时会用到
# 可指定多个
# Address = address [port]

# clamp maximum segment size - tcp 包-> pmtu
ClampMSS=yes

# 加密 UDP 的堆成密钥加密方式
# 检测 CPU 是否支持 aes
# grep aes /proc/cpuinfo --color auto
# SHA1 HMAC
# 对启用了 ExperimentalProtocol 不生效
# 设置为 non 关闭加密，建议使用支持 cbc 的算法，例如 aes-128-cbc
Cipher = blowfish

# 1-9 zlib
# 10 fast lzo
# 11 best lzo
Compression=0

# UDP 包的摘要算法, 可使用 LibreSSL 或 OpenSSL 支持的算法, 指定 none 可关闭包验证.
# 对使用 ExperimentalProtocol 的节点不生效
Digest = sha1

# 如果设置为 yes 则必须先有直连的 meta 链接
IndirectData=no

# 计算 MAC 的长度
# 0-摘要算法输出长度
# 新算法无效
MACLength=4

# 节点初始路径 MTU - Path MTU
PMTU = 1514
# 自动发现到节点的 Path MTU
PMTUDiscovery = yes
# 发送发现 MTU 消息的间隔
MTUInfoInterval = 5

# 可设置为 0 - 随机
Port=655

# RSA 公钥
# 废弃
# PublicKey = key
# PublicKeyFile = filename

# 节点子网信息
# 支持指定多个
# Subnet = address[/prefixlength[#weight]]

# 废弃 - 现在会自动检测
TCPOnly=no

# 影响转发和广播优先级
# weight 越大优先级越低
# Weight=weight
```
