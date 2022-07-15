---
title: owntone
---

# owntone

- [owntone/owntone-server](https://github.com/owntone/owntone-server)
  - GPLv2, C+Vue
  - DAAP (iTunes), MPD (Music Player Daemon) and RSP (Roku) media server
  - forked-daapd
  - DAAP - Digital Audio Access Protocol
- 参考
  - [mikebrady/shairport-sync](https://github.com/mikebrady/shairport-sync)

```bash
# https://hub.docker.com/r/linuxserver/daapd
# -e FILE__PASSWORD=/run/secrets/mysecretpassword
# --net host 能暴露更多服务
# 3689 http, 3688 websocket
docker run --rm -it \
  -v $PWD/config:/config \
  -v $PWD/music:/music \
  -p 3689:3689 \
  -p 3688:3688 \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Asia/Shanghai \
  --name daapd linuxserver/daapd
```

## owntone.conf

```conf
```

- https://github.com/owntone/owntone-server/blob/master/owntone.conf.in
