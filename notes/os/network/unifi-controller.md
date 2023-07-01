---
title: unifi-controller
---

# unifi-controller

- Java, mongo
- [UniFi Network - Required Ports Reference](https://help.ubnt.com/hc/en-us/articles/218506997-UniFi-Ports-Used)

```bash
# ssh ubnt ubnt
mca-cli
set-inform http://xxx:8080/inform
# 发现
sudo nmap -sU -p 10001 --script ubiquiti-discovery.nse 192.169.1.0/24
```

```
PORT      STATE SERVICE
10001/udp open  ubiquiti-discovery
| ubiquiti-discovery:
|   protocol: v1
|   uptime_seconds: 8175390
|   uptime: 94 days 14:56:30
|   hostname: ubnt
|   product: ER-X
|   firmware: EdgeRouter.ER-e50.v2.0.8-hotfix.1.5278088.200305.1641
|   version: v2.0.8
|   interface_to_ip:
|     18:00:00:00:00:00:
|       192.168.1.2
|     18:00:00:00:00:00:
|       192.168.66.1
|   mac_addresses:
|     18:00:00:00:00:00
|_    18:00:00:00:00:00
MAC Address: 18:00:00:00:00:00 (Ubiquiti Networks)
Service Info: OS: Linux
```

## Docker

```bash
docker run -d --init \
  --restart=unless-stopped \
  -p 8080:8080 -p 8443:8443 -p 3478:3478/udp \
  -e TZ=Asia/Shanghai \
  -v $PWD/unifi:/unifi \
  --user unifi \
  --name unifi \
  jacobalberty/unifi
```

- [jacobalberty/unifi-docker](https://github.com/jacobalberty/unifi-docker)
- https://github.com/jacobalberty/unifi-docker#environment-variables

## LinuxServer unifi-controller

- [linuxserver/docker-unifi-controller](https://github.com/linuxserver/docker-unifi-controller)

| port      |
| --------- | -------------------------------------------- |
| 1900/udp  | controller discoverable on L2 network option |
| 3478/udp  | Unifi STUN                                   |
| 5514/udp  | Remote syslog port                           |
| 6789      | mobile throughput test                       |
| 8080      | device communication                         |
| 8443      | web admin+API                                |
| 8843      | Unifi guest portal HTTPS redirect port       |
| 8880      | Unifi guest portal HTTP redirect port        |
| 10001/udp | AP discovery                                 |

| env         |
| ----------- | ------- |
| PUID        | UserID  |
| PGID        | GroupID |
| MEM_LIMIT   | Java    |
| MEM_STARTUP | Java    |

```bash
docker run -it --rm \
  -e PUID=1000 -e PGID=1000 \
  -e MEM_LIMIT=1024M \
  -p 3478:3478/udp \
  -p 10001:10001/udp \
  -p 8080:8080 \
  -p 8081:8081 \
  -p 8443:8443 \
  -p 8843:8843 \
  -p 8880:8880 \
  -p 6789:6789 \
  -v $PWD/data/unifi:/config \
  --name=unifi-controller linuxserver/unifi-controller

# 条件允许 可以 host 网络
docker run -it --rm \
  -e PUID=1000 -e PGID=1000 \
  -e MEM_LIMIT=1024M \
  --network host \
  -v $PWD/data/unifi:/config \
  --name=unifi-controller registry.cn-hongkong.aliyuncs.com/cmi/linuxserver_unifi-controller:7.1.66
--name=unifi-controller linuxserver/unifi-controller
```

```yaml
version: '2.1'
services:
  unifi-controller:
    #image: lscr.io/linuxserver/unifi-controller:latest
    image: linuxserver/unifi-controller:7.1.66
    container_name: unifi-controller
    environment:
      - PUID=1000
      - PGID=1000
      - MEM_LIMIT=1024 #optional
      - MEM_STARTUP=1024 #optional
    volumes:
      - <path to data>:/config
    ports:
      - 8443:8443
      - 3478:3478/udp
      - 10001:10001/udp
      - 8080:8080
      - 1900:1900/udp #optional
      - 8843:8843 #optional
      - 8880:8880 #optional
      - 6789:6789 #optional
      - 5514:5514/udp #optional
    restart: unless-stopped
```

# Version

- [7.1.66](https://community.ui.com/releases/UniFi-Network-Application-7-1-66/cf1208d2-3898-418c-b841-699e7b773fd4)

## reset

```bash
syswrapper.sh restore-default
```

- push reset 10s
