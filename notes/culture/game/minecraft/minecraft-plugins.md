---
tags:
  - Plugin
  - Awesome
---

# Plugins

- 必备
  - geyser
  - floodgate
- 推荐
  - Chunky
  - vane
  - TabTPS
  - GSit
  - ViaVersion
  - ViaBackwards
  - ViaRewind
- Survival/RPG
  - LevelledMobs
  - AuraSkills
  - MythicMobs
  - https://github.com/CitizensDev/Citizens2
  - ToolStats
- Creative
  - WorldEdit
  - WorldEditSUI
  - FastAsyncWorldEdit / FAWE
    - fork WorldEdit
- Misc
  - AdvancedPortals
  - https://github.com/cabaletta/baritone
    - Pathfinding
  - [dmulloy2/ProtocolLib](https://github.com/dmulloy2/ProtocolLib)
    - GPLv2, Java
    - Provides read and write access to the Minecraft protocol with Bukkit
  - [Ste3et/FurnitureLib](https://github.com/Ste3et/FurnitureLib)
- Map
  - BlueMap
  - [webbukkit/dynmap](https://github.com/webbukkit/dynmap)
    - 二维地图
  - Overviewer
- AI/LLM
  - https://github.com/yro7/LLM-craft
- 参考
  - https://bstats.org/
  - http://mcstats.org

**Chunky**

- https://hangar.papermc.io/pop4959/Chunky
- https://mineplugin.org/Chunky

```
chunky radius 1000
chunky start

chunky progress
```

**TabTPS**

```
tabtps toggle tab
tabtps toggle actionbar
tabtps toggle bossbar

tickinfo
mspt

memory
mem
ram

ping
ping [username]
pingall

tabtps reload
```

**Vane**

- https://oddlama.github.io/vane/
- https://github.com/oddlama/vane

## simple-voice-chat

- [henkelmax/simple-voice-chat](https://github.com/henkelmax/simple-voice-chat)
- UDP/24454
- https://modrepo.de/minecraft/voicechat/wiki/server_setup_self_hosted
- plugins/voicechat/voicechat-server.properties
- config/voicechat/voicechat-client.properties
- plugins/voicechat/voicechat-proxy.properties

```properties
port=24454
```

- https://modrepo.de/minecraft/voicechat/wiki/server_config

## axiom

- https://github.com/Moulberry/AxiomPaperPlugin

## MythicMobs

- https://hangar.papermc.io/Lumine/MythicMobs
- https://git.mythiccraft.io/mythiccraft/MythicMobs

## Citizens

- https://github.com/CitizensDev/Citizens2
  - https://ci.citizensnpcs.co/job/citizens2/
- https://www.spigotmc.org/resources/citizens.13811/
- https://wiki.citizensnpcs.co/Commands
- 角色
  - https://github.com/mcmonkeyprojects/Sentinel
    - 哨兵

## Denizen

- https://github.com/DenizenScript/Denizen
  - Citizens2 脚本

```shell
/ex narrate "hi <player.name>"
```

```yaml
example_task:
  type: task
  script:
    - narrate "This is a basic task script!"
```

## Sentinel

- 自定义 Citizens 的插件
- https://mineplugin.org/Sentinel

## CoreProtect

- [PlayPro/CoreProtect](https://github.com/PlayPro/CoreProtect)

```bash
mvn clean package
```

```shell
# 回滚 半径 20 到 1分钟 前
/co rollback r:20 t:1m

# 预览
/co rollback r:20 t:1m #preview
# 确认
/co apply

# 撤销回滚
# 也支持控制范围 r:10 t:2m
/co restore
```

- https://gist.github.com/iamnotpayingforyourpatreon/20371ddfb318c49dda48fc537032d923

## terra

- [PolyhedralDev/Terra](https://github.com/PolyhedralDev/Terra)
  - MIT, Java
  - 世界生成器
- Packs https://terra.polydev.org/config/index.html
  - [PolyhedralDev/TerraOverworldConfig](https://github.com/PolyhedralDev/TerraOverworldConfig)
    - 内置 overworld
  - [Rearth/Origen](https://github.com/Rearth/Origen)
- https://terra.polydev.org/config/community-packs.html

```shell
# 显示 Packs
/packs
# 重载配置
/packs reload
```

## Multiverse

- 环境类型 normal, nether, THE_END
- https://github.com/Multiverse/Multiverse-Core/wiki/Command-Reference

```shell
# /mv list, /mvl, /mvlist
/mv list

# /mv info [WORLD]

# /mv create {NAME} {ENV} [-s SEED] [-g GENERATOR[:ID]] [-t TYPE] [-a true|false]
# TYPE: FLAT, LARGEBIOMES, AMPLIFIED, NORMAL, NETHER, END
# /mv create <新世界名称> <环境类型> -g Terra:<PACK_ID>

# 导入
# mv import, mvimport, mvim
# /mv import {NAME} {ENV} [GENERATOR[:ID]]
# /mv import <文件夹名称> <环境类型> [-g 生成器名称]

# /mv tp [PLAYER] {WORLD}
# /mv modify set gamemode <模式> [世界名称]

/mv reload

# 设置当前世界的出生点
/mv set spawn

# 当前世界坐标
/mv coord

# 显示不同世界的玩家
# /mv who [WORLD|-a]

# 传送到出生点
# /mv spawn [PLAYER]

# 卸载世界
# /mv unload {WORLD}
# Unload 且从配置删除
# /mv remove {WORLD}
# Remove 且删除目录
# /mv delete {WORLD}

# 确认操作
/mv confirm

# /mv purge [WORLD|all] {all|animals|monsters|MOBNAME}

# 克隆一个世界
# /mv clone world {WORLD}

# 重新生成世界
# /mv regen {WORLD} [-s [SEED]]

# /mv modify set {PROPERTY} {VALUE} [WORLD]
```

## MCA Selector

- [Querz/mcaselector](https://github.com/Querz/mcaselector)
  - MIT, Java
  - 裁剪 world 的离线工具

```bash
# 需要 JavaFX
sdk install java 21.0.6.fx-librca

java -jar mcaselector-2.5.1.jar
```

## BuildPaste

```shell
/gamerule maxCommandChainLength 3000000

# /buildpaste <allowall|disallowall>
# /paste <argument1> <argument2>
# ID dontplaceair
/paste
/construct
/preview # Forge 1.20 and 1.21, and NeoForge 1.21
/undopaste
/buildplacer # Build Placer
/upload
/selector
/pos1
/pos2
/removepos
/connectaccounts
/disconnectaccount
/bindbuild
/buildhistory
/sharebuild
```

## LevelledMobs

```shell
/lm
/levelledmobs
```

- [ArcanePlugins/LevelledMobs](https://github.com/ArcanePlugins/LevelledMobs)
- https://arcaneplugins.gitbook.io/levelledmobs-the-ultimate-mob-levelling-solution

## FastAsyncWorldEdit

- FAWE

```bash
//wand

//pos1
//pos2
//desel
//size

# //sphere <方块> <半径> 球形
# //hsphere <方块> <半径> 空心球形
# //line <方块>
# //stack <数量> [方向]
# 楼梯结构
//stack 10 up north

# air
//set stone
//replace grass stone
//undo

//cut
//copy
//paste

//walls cobblestone

//expand 10 up
//contract < 数量 > [方向]

# 批量种植树
# //forestgen <类型> [密度]

//tool selwand

//outline glass

//overlay grass_block
//flora 5
//replace stone stone,mossy_cobblestone,cobblestone
```

## WorldEdit

| 命令        | 描述                 |
| ----------- | -------------------- |
| `//wand`    | 使用木斧进行区域选择 |
| `//set`     | 大规模方块放置       |
| `//replace` | 大规模方块替换       |
| `//copy`    | 复制选区             |
| `//paste`   | 粘贴选区             |
| `//rotate`  | 旋转选区             |
| `//flip`    | 翻转选区             |
| `//hsphere` | 生成球体             |
| `//hcyl`    | 生成圆柱             |
| `//brush`   | 地形笔刷             |
| `//undo`    | 撤销操作             |
| `//redo`    | 重做操作             |

```shell
# Run CraftScript
# /cs <filename> <args>
# Run last CraftScript
# /.s <args>
```

- 保存和加载建筑蓝图 (.schem 格式)。
- CraftScript
  - 基于 JavaScript Rihno 的脚本
  - https://worldedit.enginehub.org/en/latest/usage/other/craftscripts/

---

- https://minecraft-worldedit.fandom.com/wiki/Worldedit_Commands
- https://hangar.papermc.io/kennytv/WorldEditSUI
- https://minecraft-worldedit.fandom.com/wiki/Worldedit_Commands
- https://mineplugin.org/WorldEdit/%E5%91%BD%E4%BB%A4%E5%88%97%E8%A1%A8
- https://www.bilibili.com/opus/756121072770744344

## GSit

- https://hangar.papermc.io/Gecolay/GSit

| command                            | for                              |
| ---------------------------------- | -------------------------------- |
| `/sit`, `/gsit`                    | 坐在方块上                       |
| `/lay`, `/glay`                    | 躺在方块上                       |
| `/bellyflop`, `/gbellyflop`        | 趴在方块上                       |
| `/spin`, `/gspin`                  | 在方块上旋转                     |
| `/crawl`, `/gcrawl`                | 在地上爬行                       |
| `/sit toggle`, `/sit playertoggle` | 切换右键点击方块或玩家坐下的功能 |
| `/gsitreload`, `/gsitrl`           | 重载插件                         |

## EssentialsX

> /fly 可能导致 geyser 用户破坏方块产生延迟

| command                             | for                   |
| ----------------------------------- | --------------------- |
| **玩家**                            |                       |
| `/home`                             | 传送到家              |
| `/sethome`                          | 设置家                |
| `/spawn`                            | 传送到出生点          |
| `/tpa <玩家名称>`                   | 发送传送请求          |
| `/tpaccept`                         | 接受传送请求          |
| `/tpdeny`                           | 拒绝传送请求          |
| `/setwarp <传送点名称>`             | 设置传送点            |
| `/warp <传送点名称>`                | 传送到传送点          |
| `/list`                             | 查看在线玩家列表      |
| `/msg <玩家名称> <消息>`            | 发送私聊消息          |
| `/r <消息>`                         | 回复私聊消息          |
| `/mail send <玩家名称> <消息>`      | 发送邮件              |
| `/balance`                          | 查看余额              |
| `/pay <玩家名称> <金额>`            | 支付金钱              |
| `/afk`                              | 设置为挂机状态        |
| `/back`                             | 返回上次死亡/传送位置 |
| `/rules`                            | 查看服务器规则        |
| `/helpop <消息>`                    | 向管理员求助          |
| **管理员**                          |                       |
| `/gamemode <模式> <玩家名称>`       | 更改游戏模式          |
| `/give <玩家名称> <物品> <数量>`    | 给予物品              |
| `/tp <玩家名称> <目标/坐标>`        | 传送玩家              |
| `/kick <玩家名称> <原因>`           | 踢出玩家              |
| `/ban <玩家名称> <原因>`            | 封禁玩家              |
| `/tempban <玩家名称> <时间> <原因>` | 临时封禁玩家          |
| `/unban <玩家名称>`                 | 解封玩家              |
| `/mute <玩家名称> <时间>`           | 禁言玩家              |
| `/unmute <玩家名称>`                | 解除禁言              |
| `/warp <传送点名称>`                | 管理传送点            |
| `/setspawn`                         | 设置出生点            |
| `/time <时间>`                      | 设置时间              |
| `/weather <天气>`                   | 设置天气              |
| `/broadcast <消息>`                 | 发送广播消息          |
| `/essentials reload`                | 重载配置文件          |

- [EssentialsX/Essentials](https://github.com/EssentialsX/Essentials)
- https://essinfo.xeya.me/commands.html

## flycraft

```shell
# /flycraftreload
# /fly [player]
# /flyspeed <1-10>
```

- https://modrinth.com/plugin/flycraft

## LuckPerms
