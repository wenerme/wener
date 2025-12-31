---
title: Tinc DHCP
tags:
  - Service
  - Network
  - VPN
  - Tinc
---

# Tinc DHCP

ip li set dev $INTERFACE up
udhcpc -b -p /var/run/udhcpc.$INTERFACE.pid -i $INTERFACE -x hostname:$INTERFACE

ifconfig $INTERFACE 10.90.1.10 netmask 255.255.0.0
iptables -I FORWARD -i $INTERFACE -j ACCEPT
iptables -t nat -A POSTROUTING -d 10.90.0.0/16 -o $INTERFACE -j MASQUERADE
