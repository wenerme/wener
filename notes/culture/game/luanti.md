---
title: Luanti
---

# Luanti

- [luanti-org/luanti](https://github.com/luanti-org/luanti)
  - LGPLv2.1, C++, Lua
  - minetest -> Luanti
  - 由于 (L)GPL License 原因，没有 iOS/iPad 版本
    - https://github.com/minetest/minetest/issues/12176
- 参考
  - [MultiCraft/MultiCraft](https://github.com/MultiCraft/MultiCraft)
    - 基于 Minetest

---

- user/minetest.conf

```bash
mkdir data conf
chown -R 30000 data conf
# https://github.com/minetest/minetest/blob/master/doc/docker_server.md
# https://github.com/minetest/minetest/pkgs/container/minetest
docker run -d \
  -p 30000:30000/udp \
  -v $PWD/minetest/data:/var/lib/minetest \
  -v $PWD/minetest/conf:/etc/minetest \
  --name minetest ghcr.io/minetest/minetest
```

- https://github.com/minetest/minetest/blob/master/minetest.conf.example
- https://wiki.minetest.net/minetest.conf

## Games

```bash
minetestserver --gameid list
```

- STATIC_SHAREDIR="/usr/local/share/minetest"
- https://content.minetest.net/
- https://wiki.minetest.net/Games
