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
    - port
  - [webbukkit/dynmap](https://github.com/webbukkit/dynmap)
    - 二维地图
  - Overviewer
- AI/LLM
  - https://github.com/yro7/LLM-craft
- 参考
  - https://bstats.org/
  - http://mcstats.org
  - https://modifiedcommand.github.io/ConvertJavaTextureToBedrock/

## Chunky

- https://hangar.papermc.io/pop4959/Chunky
- https://mineplugin.org/Chunky

```
chunky radius 1000
chunky start

chunky progress
```

## TabTPS

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

## Vane

- 依赖下载自定义资源包
  - https://github.com/oddlama/vane/issues/288
- 不支持 BedRock
  - https://github.com/oddlama/vane/issues/238
- https://oddlama.github.io/vane/
- https://github.com/oddlama/vane

## simple-voice-chat

> 不支持 bedrock, 依赖客户端 mod

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
- 参考脚本
  - https://github.com/mcmonkeyprojects/DenizenSampleScripts
  - https://github.com/SXRWahrheit/Denizen-Scripts
  - https://forum.denizenscript.com/threads/tiny-sample-scripts-to-start-with.354/
  - https://meta.denizenscript.com/Docs/Languages

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
- https://docs.coreprotect.net/commands/

| 参数         | 示例      | 描述                                 |
| ------------ | --------- | ------------------------------------ |
| `u:`,`user:` | `u:wener` | 指定用户名过滤                       |
| `t:`,`time:` | `t:1h`    | 指定时间段（如1h=1小时, 2d=2天）     |
| `r:`         | `r:20`    | 指定半径范围（方块数）               |
| `a:`         | `a:block` | 指定动作类型（如block,chat,command） |
| `i:`         | `i:stone` | 指定物品或方块类型                   |
| `e:`         | `e:wener` | 排除特定条件                         |

- user
  - #fire, #tnt, #creeper, #explosion
- time
  - `t:2w,5d,7h,2m,10s`
  - `t:5d2h`
  - `t:1h-2h`
  - `t:2.50h`
- radius
  - #global - 整个服务器
  - #world_the_end
  - #worldedit, #we - WorldEdit 选择的内容
- `#<hashtag>`
  - `#preview` - 预览 rollback/restore
  - `#count` - 返回 lookup 的 block 数量
  - `#verbose`, `#silent` - 控制 rollback/restore 消息显示

| action         | for                                                                                       | alias                                                                                                                                            |
| :------------- | :---------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `a:block`      | 查询方块的放置与破坏记录。= `a:+block` + `a:-block`                                       | `block`, `blocks`, `block-change`, `change`, `changes`                                                                                           |
| `a:+block`     | 查询方块的放置记录。                                                                      | `+block`, `+blocks`, `block+`, `placed`, `place`, `block-place`                                                                                  |
| `a:-block`     | 查询方块的破坏记录。                                                                      | `-block`, `-blocks`, `block-`, `broke`, `break`, `remove`, `destroy`, `block-break`, `block-remove`                                              |
| `a:click`      | 查询玩家的交互行为记录。(例如：按钮、拉杆、门、非容器方块的右键点击等)                    | `click`, `clicks`, `interact`, `interaction`, `player-interact`, `player-interaction`, `player-click`                                            |
| `a:kill`       | 查询生物/动物/实体被杀死的记录。                                                          | `kill`, `kills`, `death`, `deaths`, `entity-death`, `entity-deaths`, `entity-kill`, `entity-kills`                                               |
| `a:container`  | 查询容器中物品的存入与取出记录。= `a:+container` + `a:-container`                         | `container`, `container-change`, `containers`, `chest`, `transaction`, `transactions`                                                            |
| `a:+container` | 查询物品存入容器的记录。                                                                  | `+container`, `container+`, `container-add`, `add-container`                                                                                     |
| `a:-container` | 查询从容器中取出物品的记录。                                                              | `-container`, `container-`, `remove-container`                                                                                                   |
| `a:chat`       | 查询聊天框中发送的消息记录。                                                              | `chat`, `chats`                                                                                                                                  |
| `a:command`    | 查询玩家使用命令的记录。                                                                  | `command`, `commands`                                                                                                                            |
| `a:session`    | 查询玩家的登录与登出记录。= `a:+session` + `a:-session`                                   | `session`, `sessions`, `connection`, `connections`                                                                                               |
| `a:+session`   | 查询玩家的登录记录。                                                                      | `+session`, `+sessions`, `session+`, `logins`, `login`, `+connection`, `connection+`                                                             |
| `a:-session`   | 查询玩家的登出记录。                                                                      | `-session`, `sessions-`, `session-`, `logout`, `logouts`, `-connection`, `connection-`                                                           |
| `a:sign`       | 查询在告示牌上书写信息的记录。                                                            | `sign`, `signs`                                                                                                                                  |
| `a:username`   | 查询玩家更改用户名的记录。                                                                | `username`, `usernames`, `user`, `users`, `name`, `names`, `uuid`, `uuids`, `username-change`, `username-changes`, `name-change`, `name-changes` |
| `a:inventory`  | 复合查询：查询与玩家背包交互相关的容器操作和物品拾取/丢弃记录。= `a:container` + `a:item` | `inv`, `inventory`, `inventories`                                                                                                                |
| `a:+inventory` | 复合查询：查询物品进入玩家背包的记录。= `a:-container` (取出) + `a:+item` (拾取)          | `+inv`, `inv+`, `+inventory`, `inventory+`, `+inventories` (源码逻辑对应内部类型 4 和 11 以及标志 0，即 Container 取出 和 Item 拾取)             |
| `a:-inventory` | 复合查询：查询物品离开玩家背包的记录。= `a:+container` (存入) + `a:-item` (丢弃)          | `-inv`, `inv-`, `-inventory`, `inventory-`, `-inventories` (源码逻辑对应内部类型 4 和 11 以及标志 1，即 Container 存入 和 Item 丢弃)             |
| `a:item`       | 查询玩家丢弃、投掷、拾取、存入或取出掉落物形态物品的记录。= `a:+item` + `a:-item`         | `item`, `items`                                                                                                                                  |
| `a:+item`      | 查询玩家拾取或（通过容器等机制）获得掉落物形态物品的记录。                                | `+item`, `item+`, `+items`, `items+`, `pickup`, `pickups`, `withdraw`, `withdraws`, `withdrew`                                                   |
| `a:-item`      | 查询玩家丢弃、投掷或（通过容器等机制）存入掉落物形态物品的记录。                          | `-item`, `item-`, `-items`, `items-`, `drop`, `drops`, `deposit`, `deposits`, `deposited`                                                        |

- https://github.com/PlayPro/CoreProtect/blob/master/src/main/java/net/coreprotect/command/parser/ActionParser.java

```bash
mvn clean package
```

```shell
# 回滚 半径 20 到 1分钟 前
/co rollback r:20 t:1m

# 预览
/co rollback r:20 t:1m #preview

# 撤销回滚
# 也支持控制范围 r:10 t:2m
/co restore

# 类似于 lookup r:5
/co near
# 撤销上一个 rollback/restore
/co undo

# 清理 2周 前的数据
/co purge t:2w

# 达到恢复死亡物品掉落目的
/co lookup user:wenerme action:-inventory radius:5 time:15m
```

### 数据库

- https://github.com/PlayPro/CoreProtect/blob/master/src/main/java/net/coreprotect/database/Database.java
- https://github.com/PlayPro/CoreProtect/tree/master/src/main/java/net/coreprotect/patch/script

```bash
sqlite3 plugins/CoreProtect/database.db
```

| table              | for                                                          |
| :----------------- | :----------------------------------------------------------- |
| `co_art_map`       | 映射内部 ID 到画或物品展示框的类型。                         |
| `co_block`         | 存储方块放置和破坏的记录。                                   |
| `co_blockdata_map` | 映射内部 ID 到方块的附加数据（如告示牌文本、容器内容等）。   |
| `co_chat`          | 存储玩家聊天信息的记录。                                     |
| `co_command`       | 存储玩家执行命令的记录。                                     |
| `co_container`     | 存储容器（箱子、熔炉等）中物品存取的记录。                   |
| `co_database_lock` | 用于数据库操作的锁定机制，防止冲突。                         |
| `co_entity`        | 存储实体（生物、动物）被杀死的记录。                         |
| `co_entity_map`    | 映射内部 ID 到实体类型（如 `minecraft:zombie`）。            |
| `co_item`          | 存储物品被丢弃或拾取的记录。                                 |
| `co_material_map`  | 映射内部 ID 到方块/物品的材质名称（如 `minecraft:stone`）。  |
| `co_session`       | 存储玩家登录和登出时间的记录。                               |
| `co_sign`          | 存储写入告示牌的文本记录（可能与 `co_blockdata_map` 关联）。 |
| `co_skull`         | 存储玩家头颅（Skull）相关的数据，如所有者信息。              |
| `co_user`          | 存储用户信息，主要是玩家 UUID 到内部用户 ID 的映射。         |
| `co_username_log`  | 存储玩家曾用名和改名时间的记录。                             |
| `co_version`       | 存储 CoreProtect 数据库结构的版本信息。                      |
| `co_world`         | 映射内部 ID 到世界名称。                                     |

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
# /gamerule commandMoidificationBlockLimit 1000000

# /buildpaste <allowall|disallowall>
# /paste <argument1> <argument2>
# ID dontplaceair
/paste

/paste dontplaceair

/pastepaper

# 使用背包的物品来构建，可以在非作弊状态使用
# /undopaste 不会恢复物品
/construct <buildId>
/preview # Forge 1.20 and 1.21, and NeoForge 1.21
/undopaste
# Build Placer wand
/buildplacer

/connectaccounts <e-mail>
/disconnectaccount

/upload <name>
# 获取 Position Selector 物品 - 用于选择上传的范围
/selector
/pos1
/pos2
/removepos # 移除 pos1 和 pos2
/bindbuild # 把当前选中范围绑定到 Build Placer
/buildhistory
/sharebuild <build-ID>
```

- https://buildpaste.net/

```
Command execution stopped due to limit (executed 65536 commands)
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

# plugins/WorldEdit/schematics
# //schematic, /schematic, //schem, /schem
//schematic
```

- schema
  - 可以通过 https://paste.enginehub.org/ 分享
    - `//schem share [name] [destination] [format]`
- 保存和加载建筑蓝图 (.schem 格式)。
- CraftScript
  - 基于 JavaScript Rihno 的脚本
  - https://worldedit.enginehub.org/en/latest/usage/other/craftscripts/

---

- https://worldedit.enginehub.org/
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

## nexo

Nexo is a Minecraft plugin that allows you to create highly customizable custom items, blocks, armor & furniture.
It also handles Resourcepack generation, uploading and dispatching to players.

- Paper & Folia
- https://docs.nexomc.com/

## Nova

server-side modding framework for Paper

- 不支持 geyser/bedrock
  - https://github.com/xenondevs/Nova/issues/21
- https://github.com/xenondevs/Nova
