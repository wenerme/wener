---
title: Tinc 常见问题
tags:
  - FAQ
---

# Tinc FAQ

## Could not create a tun/tap interface from /dev/net/tun: Resource busy

## MTU 1518

`tincd -n <netname> -kUSR2`, and it will send a list of nodes to the syslog. The MTU should be in it.

There is no MTU limitation for a node talking to itself. So tinc just
lists the maximum it itself supports, which is 1518.

https://github.com/opnsense/core/issues/2057
https://www.tinc-vpn.org/pipermail/tinc/2015-May/004142.html

## Peer had unknown identity

```
Peer 1.2.3.4 port 53291 had unknown identity (node_1)
Error while processing ID from node_1 (1.2.3.4 port 53291)
```

## Error while decrypting routines:EVP_EncryptUpdate:invalid operation

- libssl - [tinc: breaks after upgrading libssl1.1 to v1.1.1b-1](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=923438)
- pre+`ExperimentalProtocol=no` 会出现
  - 因此要嘛启用 1.1 协议，要嘛使用 1.0 版本 tinc
- [fix: use EVP_DecryptUpdate while decrypting](https://github.com/gsliepen/tinc/commit/2b0aeec02d64bb4724da9ff1dbc19b7d35d7c904)
  - 1.18

```
Error while decrypting: error:060A7094:digital envelope routines:EVP_EncryptUpdate:invalid operation
Error while decrypting metadata from node_1 (1.2.3.4 port 39080)
```

## Handshake phase not finished yet

- 尝试 `ExperimentalProtocol = no`
- 参考
  - [#203](https://github.com/gsliepen/tinc/issues/203) - too many "Invalid packet seqno" in logs

**关联错误信息**

```
Handshake phase not finished yet from master_1 (192.168.1.2 port 655)
No key from master_1 after 10 seconds, restarting SPTPS
Got REQ_KEY from master_1 while we already started a SPTPS session!
Invalid packet seqno: 0 != 1 from master_1 (192.168.1.2 port 655)
Failed to decrypt and verify packet from master_1 (192.168.1.2 port 655)
```

## 网络卡顿，大包丢失

- 避免使用 `Port=0`, 即便不能对外暴露端口，稳定的端口会让 tinc 组网更稳定。
- 尽量对外暴露固定端口，nat 会更加通畅，更容易直连
- 配置 Address 让本地更容易发现
- 使用 iperf3 预热一下网络 - 看网络是否会变平稳

## ping -s 1389 可以, 1390 不可以

在 tinc 一段时间未使用后, `ping -s 1389` 可通, 但大的请求会卡顿。

ping -s 1389 实际发送 1397+20=1417

- [Use a smarter algorithm for choosing MTU discovery probe sizes](https://github.com/gsliepen/tinc/commit/24d28adf64934c8d726959e25dce8c10dbd10d1f)
  - 初始 mtu 发现 - 8 次 probe
  - 1339, 1417 ~1450
  - `minmtu + powf(interval, multiplier * cycle_position / (probes_per_cycle - 1))`
    - multiplier = 0.982
    - cycle_position = probes_per_cycle - (n->mtuprobes % probes_per_cycle) - 1
    - minmtu 最小 64
    - interval = maxmtu - minmtu

## PMTU - Path MTU

- 自己到自己 9018
- 如果网络 MTU 是 1500, 那么 tinc 检测的 PMTU 为 1451
  - https://www.tinc-vpn.org/pipermail/tinc/2014-February/003614.html
- tinc 发送不同的包大小检测 mtu - ping
- 没有 udp 则使用 tcp 转发 - mtu 则以默认为主 - 此时 mtu 无意义

**服务配置**

```ini
PingInterval=60
PingTimeout=5
```

**主机配置**

```ini
# 节点初始路径 MTU - Path MTU
PMTU = 1514
# 自动发现到节点的 Path MTU
PMTUDiscovery = yes
# 发送发现 MTU 消息的间隔
MTUInfoInterval = 5
```

## Simple Peer-to-Peer Security - sptps

- 基于 TLS 1.2 进行精简
  - 没有 PKI - 交换公钥
  - 没有 cipher suite 协商
- 节点认证使用 521 bits ECC keys, Diffie-Hellman using ephemeral 521 bits ECC keys is used to provide perfect forward secrecy (PFS), AES-256-CTR is used for encryption, and HMAC-SHA-256 for message authentication.
- [Simple Peer-to-Peer Security](https://www.tinc-vpn.org/documentation-1.1/Simple-Peer_002dto_002dPeer-Security.html)

## tinc 1.0 vs tinc 1.1

- 1.0
  - 稳定
  - rsa
- 1.1
  - 新的实验协议
  - tinc 命令
  - use of a GCM cipher suite to reduce the cost of HMAC
  - 使用 ECDSA 性能可能下降一半
  - 可通过 sptps_speed 测试协议吞吐性能
  - Ed25519 认证
  - ChaCha20-Poly1305 加密通讯
  - 支持 AES-GCM-256
  - 支持 IPv6
  - LAN 节点发现
  - Multiple routing modes

```bash
# 1.1
cd src
make sptps_speed
./sptps_speed
```

**Intel Pentium G4560 (4) @ 3.500G**

```
Generating keys for 10 seconds:          22600.52 op/s
Ed25519 sign for 10 seconds:             22027.18 op/s
Ed25519 verify for 10 seconds:            8444.55 op/s
ECDH for 10 seconds:                      6231.71 op/s
SPTPS/TCP authenticate for 10 seconds:    2923.57 op/s
SPTPS/TCP transmit for 10 seconds:           2.14 Gbit/s
SPTPS/UDP authenticate for 10 seconds:    2973.93 op/s
SPTPS/UDP transmit for 10 seconds:           2.17 Gbit/s
```

## macOS Router tinc-up

- DeviceType = utun

```sh
ifconfig $INTERFACE 10.66.1.2 10.66.1.1 up
route add -net 10.66.1 -interface $INTERFACE
```

## tun Destination address required

- tun 是 p2p 协议

```bash
ifconfig tun0 inet 10.0.0.1 10.0.0.2 up # A
ifconfig tun0 inet 10.0.0.2 10.0.0.1 up # B
```
