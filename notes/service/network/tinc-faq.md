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
* libssl - [tinc: breaks after upgrading libssl1.1 to v1.1.1b-1](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=923438)
* pre+`ExperimentalProtocol=no` 会出现
  * 因此要嘛启用 1.1 协议，要嘛使用 1.0 版本 tinc

```
Error while decrypting: error:060A7094:digital envelope routines:EVP_EncryptUpdate:invalid operation
Error while decrypting metadata from node_1 (1.2.3.4 port 39080)
```

## Handshake phase not finished yet
* 尝试 `ExperimentalProtocol = no`
* 参考
  * [#203](https://github.com/gsliepen/tinc/issues/203) - too many "Invalid packet seqno" in logs

__关联错误信息__

```
Handshake phase not finished yet from master_1 (192.168.1.2 port 655)
No key from master_1 after 10 seconds, restarting SPTPS
Got REQ_KEY from master_1 while we already started a SPTPS session!
Invalid packet seqno: 0 != 1 from master_1 (192.168.1.2 port 655)
Failed to decrypt and verify packet from master_1 (192.168.1.2 port 655)
```

## Tinc 1.0 init
* [tinc.conf.5](https://www.tinc-vpn.org/documentation/tinc.conf.5)

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
