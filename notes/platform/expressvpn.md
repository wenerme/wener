---
title: expressvpn
---

# expressvpn

- 国内能连上
- 支持的协议少

## Docker

- [polkaned/expressvpn](https://github.com/polkaned/dockerfiles/tree/master/expressvpn)
- [Misioslav/expressvpn](https://github.com/Misioslav/expressvpn)

```bash
cat <<EOF > .env
CODE=
SERVER=smart
EOF

docker run --rm -it --cap-add NET_ADMIN --devices /dev/net/tun --privileged \
  -p 80:80 \
  --name expressvpn Misioslav/expressvpn
```

- PROTOCOL
  - **lightway_udp**
  - lightway_tcp
  - tcp
  - udp
  - auto
- CIPHER
  - **chacha20**
  - aes
  - auto
- NETWORK_LOCK=on
- WHITELIST_DNS
- DDNS
- IP
- BEAERER
  - ipinfo.io AccessToken
- HEALTHCHECK
-  healthchecks.io ID
