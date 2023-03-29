---
title: Zerotier Controller
---

# zerotier-controller

- 实现 https://github.com/zerotier/ZeroTierOne/tree/master/controller
- 默认端口 UDP/9993
- 账号存储 PostgreSQL

## ztncui

- [key-networks/ztncui](https://github.com/key-networks/ztncui)
  - controller 前端
- [key-networks/ztncui-containerized](https://github.com/key-networks/ztncui-containerized)
  - Docker

```bash
docker run --rm -it -v $PWD/ztc:/host --entrypoint sh keynetworks/ztncui -c 'cp -r /opt/key-networks/ztncui/etc /host/ztncui'
docker run --rm -it -v $PWD/ztc:/host --entrypoint sh keynetworks/ztncui -c 'cp -r /var/lib/zerotier-one /host/data'

sudo chown 998:998 -R ztc/

# http://localhost:3000
# https://localhost:3443
# admin:password
docker run -d --restart=always \
  -p 3000:3000 -p 3443:3443 \
  --cap-add=NET_ADMIN \
  -e HTTP_ALL_INTERFACES=yes \
  -v $PWD/ztc/ztncui:/opt/key-networks/ztncui/etc/ \
  -v $PWD/ztc/data:/var/lib/zerotier-one/ \
  --name ztncui keynetworks/ztncui
```
