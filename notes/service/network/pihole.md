---
title: Pi Hole
---

# Pi Hole

- 是什么？
  - 基于 DNS 的 AD/Tracker Block
- [pi-hole/pi-hole](https://github.com/pi-hole/pi-hole/)
- 端口

```bash
cat <<YAML > docker-compose.yaml
version: "3"

# More info at https://github.com/pi-hole/docker-pi-hole/ and https://docs.pi-hole.net/
services:
  pihole:
    container_name: pihole
    image: pihole/pihole:latest
    ports:
      - "53:53/tcp"
      - "53:53/udp"
      - "67:67/udp"
      - "80:80/tcp"
      - "443:443/tcp"
    environment:
      TZ: 'America/Chicago'
      WEBPASSWORD: 'password' # 不设置则为随机
    # Volumes store your data between container upgrades
    volumes:
      - './pihole/etc:/etc/pihole/'
      - './pihole/dnsmasq.d:/etc/dnsmasq.d/'
    # Recommended but not required (DHCP needs NET_ADMIN)
    # https://github.com/pi-hole/docker-pi-hole#note-on-capabilities
    cap_add:
      - NET_ADMIN
    restart: unless-stopped
YAML
docker-compose up --detach

# docker 直接启动
# registry.cn-hongkong.aliyuncs.com/cmi
docker run -d --restart always\
  -e TZ=Asia/Shanghai \
  -e WEBPASSWORD=password \
  -v $PWD/pihole/etc:/etc/pihole \
  -v $PWD/pihole/dnsmasq.d:/etc/dnsmasq.d \
  -p 53:53 -p 53:53/udp -p 67:67/udp -p 80:80 -p 443:443 \
  --name pihole pihole/pihole:latest
```

## internal

- dnsmasq
- lighttpd
- php
- AdminLTE
- sqlite3
- pihole-FTL
  - 自定义 dnsmasq = 核心 dns+dhcp+api 服务
  - https://github.com/pi-hole/FTL
  - `telnet 127.0.0.1 471`

# FAQ

## 避免解析 local

**/etc/dnsmasq.d/02-pihole.conf**

```ini
local=/lan/
local=/local/
local=/internal/
```
