---
tags:
  - Server
---

# MineCraft Server

- https://www.minecraft.net/en-us/download/server
- https://findmcserver.com/
- https://aka.ms/verifiedservers
  - -> findmcserver.com
- https://aternos.org/
- https://all-themods.com/mod-list/
- plugin loader - paper/spigot
- mod loader - fabric/forge
- sharder
- 插件
  - Geyser-Spigot
    - A bridge/proxy allowing you to connect to Minecraft: Java Edition servers with Minecraft: Bedrock Edition.
  - floodgate
    - GeyserMC / Floodgate
    - Hybrid mode plugin to allow for connections from Geyser to join online mode servers.
- Paper 服务器 - 推荐
  - 没有 Mod - 稳定，可以一直持续使用最新版
  - 原版
    - 生存类(原版生存/空岛/钻石大陆等)
    - 建筑类(可使用插件如 WorldEdit 和 VoxelSniper 提供快速建造工具)
    - PVP 和竞技类
    - 模拟经营类(因为可以用 Vault 这样的经济插件)
    - RPG 和冒险
    - 红石/生电
    - 小游戏类
- 教育版支持 WebSocket
  - https://minecraft.fandom.com/wiki/Commands/wsserver
  - floodgate 协议是 WS 的
  - geyser 不支持 WS 协议, 只支持 UDP
- 环境
  - sessionHost=https://sessionserver.mojang.com
  - servicesHost=https://api.minecraftservices.com
  - name=PROD

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
      # https://hangarcdn.papermc.io/plugins/ViaVersion/ViaVersion/versions/5.2.1/PAPER/ViaVersion-5.2.1.jar
    ports:
      - '25565:25565'
      - '19132:19132/udp'
    volumes:
      - ./data:/data
```

```yaml
services:
  mc-bedrock:
    image: itzg/minecraft-bedrock-server
    environment:
      # https://minecraft.wiki/w/Server.properties#Bedrock_Edition
      SERVER_NAME: Wener MC Bedrock
      EULA: 'true'
      VERSION: LATEST
      TZ: Asia/Shanghai
      SERVER_PORT: 19133
    ports:
      - '19133:19133/udp'
    volumes:
      - ./data:/data
```

```bash
# https://minecraft.fandom.com/wiki/Game_rule
send-command gamerule showCoordinates true # 显示玩家坐标
send-command gamerule showDaysPlayed true # 显示游玩天数
send-command gamerule playersSleepingPercentage 10 # 10% 玩家睡觉就可以过夜
send-command gamerule keepInventory true # 死亡不掉落物品
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

- MODRINTH_PROJECTS
  - https://docker-minecraft-server.readthedocs.io/en/latest/mods-and-plugins/modrinth/
    - https://modrinth.com/plugin/vane
    - https://github.com/itzg/docker-minecraft-server/issues/1973
  - https://modrinth.com/plugins?v=1.21.4&g=categories:paper
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

gost -L tcp://:25565/${SERVER_IP}:25565 -L udp://:19132/${SERVER_IP}:19132 -L tcp://:19132/${SERVER_IP}:19132
```

- https://docker-minecraft-server.readthedocs.io/en/latest/data-directory/

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
- [cuberite](https://github.com/cuberite/cuberite)
  - Apache-2.0, C++

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

## Command

```shell
# 定位 堡垒遗迹
/locate structure bastion_remnant

# 清除所有效果
/effect clear @s

# 设置为创造模式 - 可飞、无限资源
/gamemode creative [玩家名字]

# 给予玩家物品
# command_block
/give @p diamond 64

# 白天
/time set day
/gamerule doDaylightCycle false

# 恢复
/gamerule doDaylightCycle true
```


## Proxy

- [itzg/docker-mc-proxy](https://github.com/itzg/docker-mc-proxy)

# 优化 {#optimization}

- https://github.com/YouHaveTrouble/minecraft-optimization

# FAQ

- Bukkit
- Spigot
- Paper
- Server
- 骷髅陷阱（Skeleton Horse Trap）事件
  - 雷雨天
  - 骨头马

## 支持版本 {#supported-version}

**影响因素**

- BedRock
  - Geyser - 通常直接重启获取最新版能解决
    - https://geysermc.org/wiki/geyser/supported-versions/
- Java
  - PaperMC 支持版本
    - https://docs.papermc.io/velocity/server-compatibility
  - ViaVersion - 未发布的新版本
  - ViaBackwards - 1.9,1.10-1.20
  - ViaRewind - 1.7, 1.8

```bash
/viaver list
```

- https://github.com/ViaVersion/ViaVersion

## You need to accept the resource pack to play on this server.

```
Player has disconnected from the Java server because of You need to accept the resource pack to play on this server.
It is needed for localization and textures. In case you declined accidentally,
you can change this by editing this server's entry in your server list.
The player Player rejected the resource pack. This will cause client-side issues with formatted text for them.
```

**caused bu vane**

```
Serving official vane resource pack
Distributing resource pack from 'https://oddlama.github.io/vane/resourcepacks/v1.17.3.zip' with sha1 322bfc64252bbea04d3911c9d5629c704d08a9a0
```

- https://github.com/oddlama/vane/issues/238
- https://rtm516.github.io/ConvertJavaTextureToBedrock/

## Misc

```
尝试以 Java 版玩家身份登录！Floodgate 设置正确吗？
```
