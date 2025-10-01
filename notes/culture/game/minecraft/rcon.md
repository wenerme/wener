---
title: rcon-cli
---

# RCON

- RCON - Remote Console 远程控制
- 更换地图、踢人、封禁玩家等

```bash
docker exec -it mcs rcon-cli

rcon-cli

rcon-cli -H 127.0.0.1 -p 25575 -P "SuperSecret123" stop
```

```bash
stop # 停止服务器
```

```ini title="server.properties"
enable-rcon=true
rcon.port=25575       #
rcon.password=your_strong_password #
```

- https://eff.fandom.com/wiki/RCON_Commands
- [itzg/rcon-cli](https://github.com/itzg/rcon-cli)
- [gorcon/rcon-cli](https://github.com/gorcon/rcon-cli)
- https://developer.valvesoftware.com/wiki/Source_RCON_Protocol
- Source Dedicated Server (SRCDS)
  - https://developer.valvesoftware.com/wiki/Source_Dedicated_Server

## 📌 1. 服务器管理命令

- `/help [n]` - 显示帮助菜单（n 为页码）
- `/version` - 获取服务器版本信息，包括插件
- `/reload` - 重新加载服务器配置和插件
- `/restart` - 重启服务器
- `/stop` - 关闭服务器
- `/save-all` - 立即保存世界数据
- `/save-off` - 禁用自动保存
- `/save-on` - 启用自动保存
- `/seed` - 显示世界种子
- `/setworldspawn` - 设置世界出生点
- `/setidletimeout <时间>` - 设置玩家闲置超时踢出时间
- `/plugins` - 显示当前运行的插件（适用于 Spigot/Paper 服务器）

## 👥 2. 玩家管理命令

- `/list` - 显示在线玩家列表
- `/kick <玩家名>` - 踢出玩家
- `/ban <玩家名>` - 封禁玩家
- `/ban-ip <IP>` - 封禁 IP
- `/banlist` - 查看封禁列表
- `/pardon <玩家名>` - 解除玩家封禁
- `/pardon-ip <IP>` - 解除 IP 封禁
- `/whitelist add <玩家名>` - 添加玩家到白名单
- `/whitelist remove <玩家名>` - 从白名单移除玩家
- `/whitelist list` - 显示白名单玩家列表
- `/whitelist on/off` - 开启/关闭白名单
- `/op <玩家名>` - 给予玩家管理员权限
- `/deop <玩家名>` - 取消玩家管理员权限
- `/msg <玩家名> <消息>` - 私聊消息
- `/teammsg <消息>` - 发送团队消息
- `/tell <玩家名> <消息>` - 发送私信
- `/tellraw <玩家名> <JSON消息>` - 发送 JSON 格式的聊天消息

## 🎮 3. 游戏规则 & 玩法设置

- `/gamerule <规则> <值>` - 设置游戏规则（如 `doDaylightCycle false` 锁定白天）
- `/difficulty <peaceful/easy/normal/hard>` - 设置难度
- `/gamemode <模式> [玩家名]` - 更改游戏模式
  - `survival` - 生存模式
  - `creative` - 创造模式
  - `adventure` - 冒险模式
  - `spectator` - 旁观模式
- `/defaultgamemode <模式>` - 设置默认游戏模式
- `/effect <玩家名> <效果> <秒数>` - 给予玩家状态效果
- `/enchant <玩家名> <附魔ID> [等级]` - 附魔玩家手中的物品
- `/ride <玩家名>` - 让玩家骑乘最近的生物
- `/spectate <玩家名>` - 旁观模式观看某个玩家
- `/trigger <目标>` - 触发计分板目标

---

## ⏳ 4. 时间 & 天气控制

- `/time set <day/night/noon/midnight>` - 设置时间
- `/time add <ticks>` - 增加时间（1 秒 = 20 ticks）
- `/weather <clear/rain/thunder>` - 控制天气
- `/forceload add <x> <z>` - 强制加载特定区块
- `/forceload remove <x> <z>` - 取消加载区块

## 🏗️ 5. 世界 & 方块管理

- `/fill <x1> <y1> <z1> <x2> <y2> <z2> <方块ID>` - 填充区域方块
- `/fillbiome <x1> <y1> <z1> <x2> <y2> <z2> <生物群系>` - 改变区域生物群系
- `/clone <x1> <y1> <z1> <x2> <y2> <z2> <目标x> <目标y> <目标z>` - 复制区域
- `/setblock <x> <y> <z> <方块ID>` - 在指定坐标放置方块
- `/spreadplayers <x> <z> <半径> <距离> <true/false> <玩家>` - 随机传送玩家
- `/worldborder <set/add> <大小>` - 设置世界边界大小

## 🚀 6. 传送 & 位置管理

- `/teleport <目标> <x> <y> <z>` - 传送玩家
- `/tp <目标> <x> <y> <z>` - 传送玩家（简写）
- `/tp <玩家1> <玩家2>` - 传送一个玩家到另一个玩家
- `/locate <结构名>` - 寻找最近的特定结构（如 `locate village`）
- `/spawnpoint [玩家] [x] [y] [z]` - 设置玩家重生点
- `/transfer <目标服务器IP>` - 传送到另一个服务器（适用于跨服）

---

## ⚔️ 7. 战斗 & 物品管理

- `/give <玩家名> <物品ID> [数量]` - 给予玩家物品
- `/item replace entity <玩家名> slot.armor.head with <物品>` - 给玩家装备头盔
- `/loot give <玩家名> loot <战利品表>` - 给予战利品
- `/damage <玩家名> <数值>` - 造成玩家伤害
- `/kill [玩家名]` - 杀死某个玩家或生物
- `/summon <实体ID> [x] [y] [z]` - 生成生物
- `/execute <条件> run <命令>` - 在特定条件下执行命令

---

## 📊 8. 计分板 & 统计

- `/scoreboard objectives add <名称> <类型>` - 创建新的计分项
- `/scoreboard players set <玩家> <计分项> <分数>` - 设置玩家分数
- `/scoreboard players add <玩家> <计分项> <分数>` - 增加玩家分数
- `/scoreboard teams add <队伍名称>` - 创建新队伍
- `/scoreboard teams join <队伍名称> <玩家>` - 让玩家加入队伍
- `/scoreboard teams remove <队伍名称>` - 删除队伍

---

## 🎵 9. 声音 & 视觉效果

- `/playsound <声音ID> <玩家> <x> <y> <z>` - 播放声音
- `/particle <粒子ID> <x> <y> <z> <dx> <dy> <dz>` - 生成粒子效果
- `/title <玩家> title <消息>` - 在屏幕上显示标题
- `/title <玩家> subtitle <消息>` - 在屏幕下方显示副标题
- `/title <玩家> actionbar <消息>` - 在屏幕底部显示短消息

---

## 🔧 10. 服务器性能 & 调试

- `/tick <选项>` - 控制游戏 Tick 速率
- `/timings <选项>` - 服务器性能分析
- `/perf` - 查看服务器性能
- `/mspt` - 查看服务器 tick 时间
- `/tps` - 查看服务器当前 TPS（Tick Per Second）

## 🌍 11. Bukkit & Spigot 相关指令（仅适用于 Bukkit/Paper 服务器）

- `/bukkit:help` - 显示 Bukkit 帮助
- `/bukkit:reload` - 重新加载 Bukkit 服务器
- `/spigot:restart` - 重启 Spigot 服务器
- `/geyser` - Geyser 跨版本支持相关命令
- `/floodgate` - Floodgate 相关命令（支持基岩版玩家）

---

- **管理服务器**：`/reload`、`/restart`、`/stop`
- **玩家管理**：`/kick`、`/ban`、`/op`
- **传送**：`/tp`、`/spawnpoint`
- **世界编辑**：`/fill`、`/setblock`
- **游戏规则**：`/gamerule`
- **计分板**：`/scoreboard`
- **声音 & 视觉**：`/title`、`/playsound`
