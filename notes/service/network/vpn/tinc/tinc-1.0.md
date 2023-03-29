---
title: tinc 1.0
---

# tinc 1.0

- 只有 tincd

```bash
NETNAME=netname
NODE=NodeA
mkdir -p /etc/tinc/$NETNAME/hosts
# tinc.conf
cat << CONF > /etc/tinc/$NETNAME/tinc.conf
Name = $NODE
Mode = switch
# ConnectTo = $NETANAME
CONF

# 生成 key
tincd -n $NETNAME -K

# tinc-up
cat << SH > /etc/tinc/$NETNAME/tinc-up
ifconfig $INTERFACE 10.10.1.1 netmask 255.0.0.0
SH

# 随机 port
cat << CONF > /etc/tinc/$NETNAME/hosts/$NODE
Port = 0
CONF

# 添加其他节点
cat << CONF > /etc/tinc/$NETNAME/hosts/$NETNAME
# Subnet = 10.10.0.0/24
Address = 4.5.6.7

-----BEGIN RSA PUBLIC KEY-----
...
-----END RSA PUBLIC KEY-----
CONF

tincd -n $NETNAME -Dd 5
```

```
  -c, --config=DIR               Read configuration options from DIR.
  -D, --no-detach                Don't fork and detach.
  -d, --debug[=LEVEL]            Increase debug level or set it to LEVEL.
  -k, --kill[=SIGNAL]            Attempt to kill a running tincd and exit.
  -n, --net=NETNAME              Connect to net NETNAME.
  -K, --generate-keys[=BITS]     Generate public/private RSA keypair.
  -L, --mlock                    Lock tinc into main memory.
      --logfile[=FILENAME]       Write log entries to a logfile.
      --pidfile=FILENAME         Write PID to FILENAME.
  -o, --option=[HOST.]KEY=VALUE  Set global/host configuration value.
  -R, --chroot                   chroot to NET dir at startup.
  -U, --user=USER                setuid to given USER at startup.
      --help                     Display this help and exit.
      --version                  Output version information and exit.
```

## init

- [tinc.conf.5](https://www.tinc-vpn.org/documentation/tinc.conf.5)

```bash
export NETWORK=kubenet
NODENAME=$(hostname | tr - _)

modprobe tun

mkdir -p /etc/tinc/$NETWORK/hosts
cd /etc/tinc/$NETWORK

tincd -n $NETWORK -K 4096
cat << CONF > tinc.conf
Name=$NODENAME
Mode=switch
Device = /dev/net/tun
AddressFamily = ipv4
CONF

cat << 'SHELL' > tinc-up
ip link set $INTERFACE up
ip addr add 10.10.1.1 dev $INTERFACE
ip route add 10.10.1.0/24 dev $INTERFACE
SHELL
cat << 'SHELL' > tinc-down
ip link set $INTERFACE down
SHELL
chmod -v +x tinc-up tinc-down

cp rsa_key.pub hosts/$NODENAME.rsa_key.pub
cat << CONF > hosts/$NODENAME
PublicKeyFile=$NODENAME.rsa_key.pub
CONF

# 前台启动 - debug
tincd -n $NETWORK -Dd 5

# 服务启动
echo "NETWORK: $NETWORK" >> /etc/conf.d/tinc.networks
service tincd start
```
