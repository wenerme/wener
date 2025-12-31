---
title: Plex
tags:
  - Ops
  - Service
  - Multimedia
  - Plex
---

# Plex

- [What network ports do I need to allow through my firewall?](https://support.plex.tv/articles/201543147-what-network-ports-do-i-need-to-allow-through-my-firewall/)

Ports:

- TCP: 32400 (for access to the Plex Media Server) [required]
- UDP: 1900 (for access to the Plex DLNA Server)
- TCP: 3005 (for controlling Plex Home Theater via Plex Companion)
- UDP: 5353 (for older Bonjour/Avahi network discovery)
- TCP: 8324 (for controlling Plex for Roku via Plex Companion)
- UDP: 32410, 32412, 32413, 32414 (for current GDM network discovery)
- TCP: 32469 (for access to the Plex DLNA Server)
