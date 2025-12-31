---
title: AFP (Apple Filing Protocol)
tags:
  - Network
  - Protocol
  - Apple
  - AFP
  - Netatalk
---

# AFP (Apple Filing Protocol)

- [Netatalk](http://netatalk.sourceforge.net/) - Open source AFP implementation
- [Alpine Linux Package: netatalk](https://pkgs.alpinelinux.org/package/v3.7/community/x86_64/netatalk)
- [afpfs-ng](https://github.com/simonvetter/afpfs-ng) - AFP client for Linux

## Configuration (Netatalk)

- [afp.conf(5)](http://netatalk.sourceforge.net/3.0/htmldocs/afp.conf.5.html)

**Configure permissions carefully for shared directories.**

```ini title="afp.conf"
[Global]
mimic model = TimeCapsule6,106
log level = default:warn
log file = /var/log/afpd.log
#hosts allow = 192.168.1.0/16

[Homes]
basedir regex = /home

[TimeMachine]
path = /data/backup/timemachine
valid users = tmuser
time machine = yes
# Limit size to 2TB
# vol size limit = 2000

[share]
path = /share
valid users = wener
```

## Network

- Ports:
  - TCP 548 (AFP)
  - UDP 5353 (mDNS/Avahi)

### Avahi / Bonjour / Zeroconf

- A multicast/unicast DNS-SD framework.
- Required for auto-discovery on macOS.

```bash
avahi-daemon --help
```

### iptables

```bash
# mDNS
iptables -I INPUT -p udp --dport mdns -d 224.0.0.251 -j ACCEPT
iptables -I OUTPUT -p udp --dport mdns -d 224.0.0.251 -j ACCEPT

# AFP (TCP 548)
iptables -I INPUT -p tcp --dport afpovertcp -j ACCEPT

# SLP (Service Location Protocol)
iptables -I INPUT -p tcp --dport slp -j ACCEPT
iptables -I OUTPUT -p tcp --dport slp -j ACCEPT
iptables -I INPUT -p udp --dport slp -j ACCEPT
iptables -I OUTPUT -p udp --dport slp -j ACCEPT

# AppleTalk (Legacy)
iptables -I INPUT -p tcp -m multiport --dport at-rtmp,at-nbp,at-echo,at-zis -j ACCEPT
iptables -I OUTPUT -p tcp -m multiport --dport at-rtmp,at-nbp,at-echo,at-zis -j ACCEPT
```
