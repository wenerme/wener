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
cat <<CONF > /etc/tinc/$NETNAME/tinc.conf
Name = $NODE
Mode = switch
# ConnectTo = $NETANAME
CONF

# 生成 key
tincd -n $NETNAME -K


# tinc-up
cat <<SH > /etc/tinc/$NETNAME/tinc-up
ifconfig $INTERFACE 10.10.1.1 netmask 255.0.0.0
SH

# 随机 port
cat <<CONF > /etc/tinc/$NETNAME/hosts/$NODE
Port = 0
CONF

# 添加其他节点
cat <<CONF > /etc/tinc/$NETNAME/hosts/$NETNAME
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
