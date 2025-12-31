---
title: Tinc Note
tags:
  - Service
  - Network
  - VPN
  - Tinc
---

# Tinc Note

- [How connections work](https://www.tinc-vpn.org/documentation-1.1/How-connections-work.html)

- Keep at least 3 working meta-connections alive at all times.
- You can view a tinc daemon without a ‘ConnectTo’ statement in tinc.conf and ‘AutoConnect = no’ as a server, and one which does have one or more ‘ConnectTo’ statements or ‘Autoconnect = yes’ (which is the default) as a client.
- Connections specified using ‘ConnectTo’ are so-called meta-connections.
- Tinc daemons exchange information about all other daemon they know about via these meta-connections.
- All nodes in the VPN will be able to talk to each other, as long as there is a path of meta-connections between them.
- Whenever possible, two nodes will communicate with each other directly.
