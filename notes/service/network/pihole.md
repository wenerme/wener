# Pi Hole
* 是什么？
  * 基于 DNS 的 AD Block
* [pi-hole/pi-hole](https://github.com/pi-hole/pi-hole/)

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
    #   https://github.com/pi-hole/docker-pi-hole#note-on-capabilities
    cap_add:
      - NET_ADMIN
    restart: unless-stopped
YAML
docker-compose up --detach
```
