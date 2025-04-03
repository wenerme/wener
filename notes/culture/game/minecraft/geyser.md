---
tags:
  - Plugin
  - Server
---

# Geyser

- [GeyserMC/Geyser](https://github.com/GeyserMC/Geyser)
  - MIT, Java
- BedRock 使用 Floodgate 做 Auth
  - 登陆的用户有 `.` 前缀
  - 认证 API
    - `https://playerdb.co/api/player/minecraft/USERNAME`
    - https://wiki.vg/Mojang_API#Username_to_UUID
- https://geysermc.org/wiki/geyser/commands/

:::caution

- 不支持资源包 [GeyserMC/Geyser#210](https://github.com/GeyserMC/Geyser/issues/210)
- 放置盔甲架 和 蛋糕有问题 [GeyserMC/Geyser#5008](https://github.com/GeyserMC/Geyser/issues/5008)
- 限制 https://geysermc.org/wiki/geyser/current-limitations/
- Proxy Protocol 只能全量开启
  - https://github.com/GeyserMC/Geyser/blob/512c68a88392e8f2354d790a1d30f6b00f4f5d34/core/src/main/java/org/geysermc/geyser/network/netty/GeyserServer.java#L170-L173
  - https://github.com/GeyserMC/Geyser/blob/512c68a88392e8f2354d790a1d30f6b00f4f5d34/core/src/main/java/org/geysermc/geyser/network/netty/GeyserServer.java#L245-L271

:::

# FAQ

## Bedrock block break delay when flying

允许飞行的时候，破快方块有延迟/速度慢。

- https://github.com/GeyserMC/Geyser/issues/3084

## has disconnected from the Java server because of Bedrock client timed out


- -DGeyser.RakRateLimitingDisabled=true
  - Rate Limiting
