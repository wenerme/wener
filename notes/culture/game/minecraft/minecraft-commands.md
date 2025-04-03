---
tags:
  - Reference
  - Command
---

# Commands

## Admin

| 命令 (Command)                    | 描述 (Description)                                                | 备注 (Notes)                                                                                                                                                                           |
| :-------------------------------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/plugins`                        | 查看所有已加载的插件                                              |                                                                                                                                                                                        |
| `/pl`                             | `/plugins` 的别名，查看所有已加载的插件                           | 别名 (Alias)                                                                                                                                                                           |
| `/reload`                         | **不安全地**重新加载服务器配置和插件                              | **强烈警告：** 不推荐在生产环境使用，尤其是在 PaperMC 服务器上。此命令可能导致内存泄漏、插件故障、数据损坏等问题。**建议优先使用重启服务器 (`/restart` 或通过面板/脚本) 来应用更改。** |
| `/reload confirm`                 | 确认执行 `/reload` 命令                                           | **强烈警告：** 同上，确认执行有风险的操作。                                                                                                                                            |
| `/stop`                           | 正常关闭服务器（会先保存世界）                                    |                                                                                                                                                                                        |
| `/restart`                        | 重启服务器                                                        | 这**不是**标准的内置命令，通常由服务器启动脚本或管理面板提供支持。                                                                                                                     |
| `/kick <玩家名> [原因]`           | 将指定玩家临时踢出服务器                                          | 可选填踢出原因，会显示给被踢玩家。                                                                                                                                                     |
| `/ban <玩家名> [原因]`            | 按玩家用户名封禁指定玩家，使其无法再次加入                        | 可选填封禁原因。                                                                                                                                                                       |
| `/ban-ip <IP地址\|玩家名> [原因]` | 按 IP 地址封禁。如果输入玩家名，则封禁该玩家当前使用的 IP 地址。  | 可选填封禁原因。                                                                                                                                                                       |
| `/banlist [ips\|players]`         | 显示封禁列表。可指定查看 IP 列表 (`ips`) 或玩家名列表 (`players`) | 默认为 `players`。                                                                                                                                                                     |
| `/pardon <玩家名>`                | 解除对指定玩家用户名的封禁                                        |                                                                                                                                                                                        |
| `/pardon-ip <IP地址>`             | 解除对指定 IP 地址的封禁                                          |                                                                                                                                                                                        |
| `/version [插件名]`               | 查看服务器核心版本信息。如果指定插件名，则查看该插件的版本信息。  |                                                                                                                                                                                        |
| `/op <玩家名>`                    | 授予指定玩家管理员 (Operator) 权限                                | 拥有 OP 权限的玩家几乎可以执行所有命令。                                                                                                                                               |
| `/deop <玩家名>`                  | 移除指定玩家的管理员权限                                          |                                                                                                                                                                                        |
| `/save-on`                        | 启用服务器世界的自动保存功能（默认开启）                          |                                                                                                                                                                                        |
| `/save-off`                       | 禁用服务器世界的自动保存功能                                      | **警告：** 禁用后，需要手动执行 `/save-all` 来保存世界，否则服务器意外关闭可能导致数据丢失。                                                                                           |
| `/save-all [flush]`               | 强制将当前服务器所有世界的数据保存到硬盘                          | `flush` 参数会确保所有数据被写入，可能会引起短暂的服务器卡顿。                                                                                                                         |
| `/whitelist on`                   | 启用服务器白名单。启用后，只有白名单上的玩家才能加入服务器。      |                                                                                                                                                                                        |
| `/whitelist off`                  | 禁用服务器白名单。                                                |                                                                                                                                                                                        |
| `/whitelist add <玩家名>`         | 将指定玩家添加到白名单                                            |                                                                                                                                                                                        |
| `/whitelist remove <玩家名>`      | 将指定玩家从白名单移除                                            |                                                                                                                                                                                        |
| `/whitelist list`                 | 显示白名单上的所有玩家                                            |                                                                                                                                                                                        |
| `/whitelist reload`               | 从服务器文件 (`whitelist.json`) 重新加载白名单列表                | 用于在手动修改文件后生效。                                                                                                                                                             |

- BedRock
  - whitelist -> allowlist
- https://minecraft.fandom.com/wiki/Commands/whitelist
- https://minecraft.fandom.com/wiki/Commands/locate

## 游戏规则 {#gamerule}

- `/gamerule <规则名称> [值]`

| Gamerule Name                | Default | Description                                                                                            | Type            |
| :--------------------------- | :------ | :----------------------------------------------------------------------------------------------------- | :-------------- |
| `announceAdvancements`       | `true`  | 是否在聊天框中公布玩家获得的进度。                                                                     | Boolean         |
| `commandBlockOutput`         | `true`  | 是否在聊天框中显示命令方块的输出文本。                                                                 | Boolean         |
| `disableElytraMovementCheck` | `false` | 是否禁用服务器对鞘翅飞行速度的检查（开启可能导致反作弊误判）。                                         | Boolean         |
| `disableRaids`               | `false` | 是否禁用袭击事件。                                                                                     | Boolean         |
| `doDaylightCycle`            | `true`  | 是否启用日夜交替和月相变化。设为`false`将锁定当前时间。                                                | Boolean         |
| `doEntityDrops`              | `true`  | 生物（非怪物）或实体（如盔甲架、矿车）被破坏时是否掉落物品。                                           | Boolean         |
| `doFireTick`                 | `true`  | 火是否会蔓延和自然熄灭。                                                                               | Boolean         |
| `doImmediateRespawn`         | `false` | 玩家死亡后是否立即重生，跳过死亡屏幕。                                                                 | Boolean         |
| `doInsomnia`                 | `true`  | 是否允许幻翼在长时间未睡觉的玩家周围生成。                                                             | Boolean         |
| `doLimitedCrafting`          | `false` | 玩家是否只能合成已解锁配方的物品（需要先获取配方）。                                                   | Boolean         |
| `doMobLoot`                  | `true`  | 怪物是否掉落物品（包括经验球）。                                                                       | Boolean         |
| `doMobSpawning`              | `true`  | 是否允许生物（被动和攻击性）自然生成。不影响刷怪笼。                                                   | Boolean         |
| `doPatrolSpawning`           | `true`  | 是否允许掠夺者巡逻队生成。                                                                             | Boolean         |
| `doTileDrops`                | `true`  | 方块被破坏时是否掉落物品（受精准采集影响）。                                                           | Boolean         |
| `doTraderSpawning`           | `true`  | 是否允许流浪商人生成。                                                                                 | Boolean         |
| `doVinesSpread`              | `true`  | 藤蔓是否会向邻近方块蔓延生长。 (1.16+)                                                                 | Boolean         |
| `doWardenSpawning`           | `true`  | 是否允许监守者（Warden）生成。 (1.19+)                                                                 | Boolean         |
| `doWeatherCycle`             | `true`  | 是否启用天气变化（晴天、下雨、雷暴）。                                                                 | Boolean         |
| `drowningDamage`             | `true`  | 玩家或生物在水中窒息时是否受到伤害。                                                                   | Boolean         |
| `fallDamage`                 | `true`  | 玩家或生物是否受到跌落伤害。                                                                           | Boolean         |
| `fireDamage`                 | `true`  | 玩家或生物是否受到火焰伤害（包括岩浆、火）。                                                           | Boolean         |
| `forgiveDeadPlayers`         | `true`  | 被玩家激怒的中立生物（如僵尸猪灵、狼）是否在该玩家死亡后停止敌对。                                     | Boolean         |
| `freezeDamage`               | `true`  | 玩家或生物在细雪中是否受到冰冻伤害。 (1.17+)                                                           | Boolean         |
| `keepInventory`              | `false` | 玩家死亡时是否保留物品栏、经验和盔甲。                                                                 | Boolean         |
| `logAdminCommands`           | `true`  | 是否在服务器日志和游戏日志中记录管理员执行的命令。                                                     | Boolean         |
| `maxCommandChainLength`      | `65536` | 连锁命令方块（Chain Command Blocks）一次可执行的最大数量。                                             | Integer         |
| `maxEntityCramming`          | `24`    | 单个方块空间内能存在的、可推动的实体的最大数量。超过此数量会开始窒息死亡。                             | Integer         |
| `mobGriefing`                | `true`  | 生物是否能改变游戏世界（如苦力怕爆炸破坏地形、末影人搬方块、村民耕种、羊吃草）。                       | Boolean         |
| `naturalRegeneration`        | `true`  | 玩家在饥饿值足够时是否会自动恢复生命值。                                                               | Boolean         |
| `playersSleepingPercentage`  | `100`   | 需要多少百分比的在线玩家同时睡觉才能跳过夜晚。 (1.17+)                                                 | Integer (0-100) |
| `randomTickSpeed`            | `3`     | 每个区块中每个游戏刻（tick）随机选择方块执行"随机刻"的次数。影响作物生长、草方块蔓延、树叶腐烂等速度。 | Integer (>=0)   |
| `reducedDebugInfo`           | `false` | 是否减少调试屏幕（F3）中显示的信息（隐藏坐标等敏感信息）。                                             | Boolean         |
| `sendCommandFeedback`        | `true`  | 执行命令时是否在聊天框中向执行者显示反馈信息。                                                         | Boolean         |
| `showDeathMessages`          | `true`  | 是否在聊天框中显示玩家或命名生物的死亡信息。                                                           | Boolean         |
| `spawnRadius`                | `10`    | 玩家首次加入游戏或死亡后（无床）重生点距离世界出生点的最大半径。                                       | Integer (>=0)   |
| `spectatorsGenerateChunks`   | `true`  | 旁观者模式（Spectator）的玩家是否能够加载新的区块。                                                    | Boolean         |
| `universalAnger`             | `false` | 被激怒的中立生物（如僵尸猪灵、蜜蜂）是否会敌视附近所有玩家，而不仅仅是激怒它们的玩家。                 | Boolean         |
