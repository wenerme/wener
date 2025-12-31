---
title: Docker Advanced
tags:
  - DevOps
  - Docker
  - Advanced
---

# Docker Advanced

## Macvlan

- [docs/ipam.md](https://github.com/docker/libnetwork/blob/master/docs/ipam.md)
- [docs/remote.md](https://github.com/docker/libnetwork/blob/master/docs/remote.md)
- [gist:3d2b891d41e0fa8d688c](https://gist.github.com/nerdalert/3d2b891d41e0fa8d688c)

```bash
# 会从 10.99.0.1 开始分发 ip
docker network create -d macvlan \
  --subnet=10.90.0.0/16 \
  --gateway=10.90.1.1 \
  -o parent=br0 mynet

docker network create -d macvlan \
  --gateway=10.90.1.1 \
  -o parent=br0 mynet

docker network create -d macvlan \
  --subnet=10.90.0.0/16 \
  --gateway=10.90.1.1 \
  --ipam-driver=nil \
  -o parent=br0 mynet
```

```bash
docker run --rm -it --net mynet wener/base
```

## Plugins

- `/run/docker/plugins`
- [containernetworking/plugins](https://github.com/containernetworking/plugins)
