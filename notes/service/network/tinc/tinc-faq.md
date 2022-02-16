---
title: Tinc 常见问题
---

# Tinc FAQ

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
* 避免使用 `Port=0`, 即便不能对外暴露端口，稳定的端口会让 tinc 组网更稳定。
* 尽量对外暴露固定端口，nat 会更加通畅，更容易直连
* 配置 Address 让本地更容易发现
* 使用 iperf3 预热一下网络 - 看网络是否会变平稳

## ping -s 1389 可以, 1390 不可以
在 tinc 一段时间未使用后, `ping -s 1389` 可通, 但大的请求会卡顿。

ping -s 1389 实际发送 1397+20=1417

* [Use a smarter algorithm for choosing MTU discovery probe sizes](https://github.com/gsliepen/tinc/commit/24d28adf64934c8d726959e25dce8c10dbd10d1f)
  * 初始 mtu 发现 - 8 次 probe
  * 1339, 1417 ~1450
  * `minmtu + powf(interval, multiplier * cycle_position / (probes_per_cycle - 1))`
    * multiplier = 0.982
    * cycle_position = probes_per_cycle - (n->mtuprobes % probes_per_cycle) - 1
    * minmtu 最小 64
    * interval = maxmtu - minmtu

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
* 基于 TLS 1.2 进行精简
  * 没有 PKI - 交换公钥
  * 没有 cipher suite 协商
* 节点认证使用 521 bits ECC keys, Diffie-Hellman using ephemeral 521 bits ECC keys is used to provide perfect forward secrecy (PFS), AES-256-CTR is used for encryption, and HMAC-SHA-256 for message authentication.
* [Simple Peer-to-Peer Security](https://www.tinc-vpn.org/documentation-1.1/Simple-Peer_002dto_002dPeer-Security.html)

## Tinc 1.0 init

- [tinc.conf.5](https://www.tinc-vpn.org/documentation/tinc.conf.5)

```bash
export NETWORK=kubenet
NODENAME=$(hostname|tr - _)

modprobe tun

mkdir -p /etc/tinc/$NETWORK/hosts
cd /etc/tinc/$NETWORK

tincd -n $NETWORK -K 4096
cat <<CONF > tinc.conf
Name=$NODENAME
Mode=switch
Device = /dev/net/tun
AddressFamily = ipv4
CONF

cat <<'SHELL' > tinc-up
ip link set $INTERFACE up
ip addr add 10.10.1.1 dev $INTERFACE
ip route add 10.10.1.0/24 dev $INTERFACE
SHELL
cat <<'SHELL' > tinc-down
ip link set $INTERFACE down
SHELL
chmod -v +x tinc-up tinc-down

cp rsa_key.pub hosts/$NODENAME.rsa_key.pub
cat <<CONF > hosts/$NODENAME
PublicKeyFile=$NODENAME.rsa_key.pub
CONF

# 前台启动 - debug
tincd -n $NETWORK -Dd 5

# 服务启动
echo "NETWORK: $NETWORK" >> /etc/conf.d/tinc.networks
service tincd start
```
