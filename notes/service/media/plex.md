---
title: Plex
tags:
  - Service
  - Media
  - Plex
---

# Plex

- [What network ports do I need to allow through my firewall?](https://support.plex.tv/articles/201543147-what-network-ports-do-i-need-to-allow-through-my-firewall/)
- [Claim Plex](https://www.plex.tv/claim/)

| Port  | Protocol | Service               | Note              |
| ----- | -------- | --------------------- | ----------------- |
| 32400 | TCP      | Plex Media Server     | **Required**      |
| 1900  | UDP      | Plex DLNA Server      |                   |
| 3005  | TCP      | Plex Companion        | Plex Home Theater |
| 5353  | UDP      | Bonjour/Avahi         | Network discovery |
| 8324  | TCP      | Plex Companion        | Roku              |
| 32410 | UDP      | GDM network discovery |                   |
| 32412 | UDP      | GDM network discovery |                   |
| 32413 | UDP      | GDM network discovery |                   |
| 32414 | UDP      | GDM network discovery |                   |
| 32469 | TCP      | Plex DLNA Server      |                   |

```bash
# https://hub.docker.com/r/plexinc/pms-docker/
# Claim Token: https://www.plex.tv/claim/

docker run \
  --rm -it \
  --name plex \
  --net=host \
  -e TZ="Asia/Shanghai" \
  -e PLEX_CLAIM="<claimToken>" \
  -e PLEX_UID=1000 \
  -e PLEX_GID=1000 \
  -h we-plex \
  -v /data/plex/config:/config \
  -v /data/plex/transcode:/transcode \
  -v /data/plex/data:/data \
  plexinc/pms-docker

# Or linuxserver/plex
# https://hub.docker.com/r/linuxserver/plex
docker run --rm -it \
  --net=host \
  -e PUID=1000 \
  -e PGID=1000 \
  -e VERSION=docker \
  -v /data/plex/config:/config \
  -v /data/plex/tv:/tv \
  -v /data/plex/movies:/movies \
  --name=plex linuxserver/plex
```
