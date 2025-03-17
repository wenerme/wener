---
title: Minecraft
---

# Minecraft

- Minecraft：Java
  - 支持 Windows、Mac、Linux
  - 传统
  - Fabric、Forge 提供 Mods 支持
- Minecraft：Bedrock
  - Windows, Xbox, PS4, Switch, iOS, Android
  - **不支持** macOS, Linux
  - GeyserMC 允许 Bedrock 玩家连接 Java 服务器
  - 不支持 Mods
  - 支持 Add-ons - 仅限官方内容
- 产品
  - 标准版
    - ¥89.00
  - 豪华版
    - ¥119.00
  - iOS https://apps.apple.com/us/app/minecraft-play-with-friends/id479516143
    - $6.99

| abbr. | stand for               |
| ----- | ----------------------- |
| MC    | Minecraft               |
| RCON  | Remote Console Protocol |

- rcon
  - 25575
- gamespy query protocol
  - udp/25565
  - 服务器通常会监听同一主端口或一个单独的查询端口来提供服务器信息

| port      | for                 |
| --------- | ------------------- |
| 25565     | Java Server Port    |
| 25575     | RCON                |
| 19132/udp | Bedrock Server Port |

## Awesome

- Hypixel
- https://gitlab.bixilon.de/bixilon/minosoft
  - [bixilon/minosoft](https://github.com/bixilon/minosoft)
    - GPLv3, Kotlin
- [bs-community/awesome-minecraft](https://github.com/bs-community/awesome-minecraft)
- Server
  - https://minecraftservers.org/
  - https://docker-minecraft-server.readthedocs.io/en/latest/
  - [itzg/docker-minecraft-server](https://github.com/itzg/docker-minecraft-server)
  - [itzg/docker-minecraft-bedrock-server](https://github.com/itzg/docker-minecraft-bedrock-server)
  - [GeyserMC/Geyser](https://github.com/GeyserMC/Geyser)
    - MIT, Java
    - Java 版本服务器兼容 Bedrock
    - bridge/proxy allowing you to connect to Minecraft: Java Edition servers with Minecraft: Bedrock Edition.
- Client
  - https://github.com/minecraft-linux/mcpelauncher-manifest
- Plugins - 服务端
- Mods - 客户端
  - [AllTheMods/ATM-10](https://github.com/AllTheMods/ATM-10)
- Community
  - https://minecraft.wiki/

## Download

- https://www.minecraft.net/en-us/download

## Server

- https://www.minecraft.net/en-us/download/server
- https://findmcserver.com/
- https://aka.ms/verifiedservers
  - -> findmcserver.com
- https://aternos.org/

```yaml
services:
  mc:
    image: itzg/minecraft-server
    environment:
      EULA: 'true'
      TYPE: 'PAPER'
      PLUGINS: |
        https://download.geysermc.org/v2/projects/geyser/versions/latest/builds/latest/downloads/spigot
        https://download.geysermc.org/v2/projects/floodgate/versions/latest/builds/latest/downloads/spigot
    ports:
      - '25565:25565'
      - '19132:19132/udp'
    volumes:
      - ./data:/data
```

**休闲**

```yaml
PVP: false
```

```yaml
DIFFICULTY:

# 生成的随机种子
SEED:
# normal - hills, valleys, water
# flat
# largebiomes - large biomes
# amplified - large mountains
LEVEL_TYPE:
# JSON
GENERATOR_SETTINGS:
# 游戏模式
MODE: survival

# 资源包
RESOURCE_PACK:
RESOURCE_PACK_SHA1:
# 要求玩家使用资源包
RESOURCE_PACK_ENFORCE:

# Level / World Save Name
LEVEL:

ONLINE_MODE:
ICON: http://host/icon.png
CUSTOM_SERVER_PROPERTIES: |
  key=value

# modrinth
# ==============================
MODRINTH_PROJECTS:
# none, required, optional
MODRINTH_DOWNLOAD_DEPENDENCIES: none
# release, beta, alpha
MODRINTH_ALLOWED_VERSION_TYPE: release
```

- snoop.minecraft.net
  - telementry
- https://minecraft.wiki/w/Server.properties
- MODE - https://minecraft.wiki/w/Game_mode
  - survival - 生存模式 - 默认
  - creative - 创造模式
  - adventure - 冒险模式
  - spectator - 旁观者模式
- https://docker-minecraft-server.readthedocs.io/en/latest/configuration/server-properties/
- OVERRIDE_SERVER_PROPERTIES
- SKIP_SERVER_PROPERTIES
- server.properties
- `%VAR%`, `%env:VAR%`
- `%date:FMT%`

```yaml
MOTD: Running %MODPACK_NAME% version %env:MODPACK_VERSION%
LEVEL: world-%date:yyyy-MM-dd%
```

**其他**

```bash
java -Xmx1024M -Xms1024M -jar minecraft_server.1.21.3.jar nogui

docker run --rm -it \
  -p 19132:19132/udp \
  -e EULA=TRUE \
  -v $PWD:/data \
  --name mcbedrock itzg/minecraft-bedrock-server
```

```bash
#
iptables -t nat -A PREROUTING -p tcp --dport 25565 -j DNAT --to-destination 10.10.10.1:25565
iptables -t nat -A POSTROUTING -p tcp -d 10.10.10.1 --dport 25565 -j MASQUERADE

iptables -t nat -A PREROUTING -p tcp --dport 25575 -j DNAT --to-destination 10.10.10.1:25575
iptables -t nat -A POSTROUTING -p tcp -d 10.10.10.1 --dport 25575 -j MASQUERADE

iptables -t nat -A PREROUTING -p udp --dport 19132 -j DNAT --to-destination 10.10.10.1:19132
iptables -t nat -A POSTROUTING -p udp -d 10.10.10.1--dport 19132 -j MASQUERADE

SERVER_IP=10.10.10.1
# 转发 Java 版默认端口 25565 (TCP)
socat TCP-LISTEN:25565,reuseaddr,fork TCP:${SERVER_IP}:25565
# 转发 RCON 端口 25575 (TCP)
socat TCP-LISTEN:25575,reuseaddr,fork TCP:${SERVER_IP}:25575
# 转发 Bedrock 版端口 19132 (UDP)
socat UDP-RECVFROM:19132,reuseaddr,fork UDP-SENDTO:${SERVER_IP}:19132
```

## Server Type

[paper]: https://papermc.io/

- Bukkit
  - 最早的开源 Minecraft 插件服务器端
  - 提供了一套标准的插件 API，允许开发者编写插件来扩展游戏内容
  - 特点:
    - 曾经是最流行的插件平台，但后来因为版权原因停止了更新
    - 目前被 Spigot 和 Paper 等继承与替代
    - 原始 Bukkit 已停止更新，但其 API 被广泛继承
- [Spigot](https://www.spigotmc.org/)
  - Bukkit 的一个分支，针对性能进行了一些优化
  - 支持 Bukkit API，可以运行所有的 Bukkit 插件
  - 特点:
    - 更高效、更优化，尤其适合多人服务器，能承载更多玩家在线
    - 插件生态庞大，拥有活跃的开发社区
    - 目前最流行的插件服务器端之一
- [Paper]
  - Spigot 的一个分支，进一步优化了性能和稳定性
  - 提供了更多的配置选项和 API 扩展
  - 支持插件 EssentialsX、WorldEdit
- Fabric
  - 轻量、性能高
  - API 简洁易用，启动快速
  - 模组开发便利，生态活跃，更新迅速
  - 适用场景：注重高性能、轻量级模组的服务器
- Forge
  - 最经典、流行度最高的模组加载平台之一
  - 模组生态成熟，数量极多（特别是工业、科技类模组）
  - 性能相对较重，适合重度模组玩家
  - 与 Fabric 不兼容
  - 适合需要丰富模组选择的服务器
- Quilt
  - 从 Fabric 分支出的模组加载平台，注重社区驱动和模块化
  - 部分兼容 Fabric 模组，同时也进行了一些功能扩展
  - 生态正在发展中，目前支持的模组相对较少但在增长
  - 适合希望尝试 Fabric 模组且注重社区、开源化的服务器管理员
- NeoForge
  - 从 Forge 分离出来的新兴模组加载器
  - 目标是提高 Forge 架构的性能和现代化程度
  - 部分兼容 Forge 模组，但生态尚在发展中
  - 社区活跃度目前较低于 Forge 和 Fabric
  - 适合追求新技术或更现代开发体验的玩家和服务器管理员

---

- Plugins
  - 在服务端
  - 适合轻量扩展、多人在线
  - Bukkit / Spigot / Paper
- Mods
  - 在客户端
  - 适合深度修改游戏内容和机制
  - Fabric / Forge
- Hybrids - Plugins + Mods
  - Mohist / Magma
  - 稳定性和兼容性 差些

## Mods

- [Modrinth](https://modrinth.com/)
- https://www.curseforge.com/minecraft/
- https://packwiz.infra.link/
- https://www.spigotmc.org/resources/
- [FabricMC/fabric-loader](https://github.com/FabricMC/fabric-loader)
- Loader
  - Fabric
  - Forge
  - NeoForge
  - Quilt
- 分类
  - Mods
    - Fabric
    - Forge
  - Plugins
    - Paper
  - Datapack

```
https://www.curseforge.com/minecraft/mc-mods/jei
```

# FAQ

- Bukkit
- Spigot
- Paper
- Server
- 骷髅陷阱（Skeleton Horse Trap）事件
  - 雷雨天
  - 骨头马
