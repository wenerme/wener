---
tags:
  - Admin
---

# MC Server Admin

```bash
nmap -p 25565 -sV server
nmap -sU -p U:19132 server

# https://github.com/sjhilt/Nmap-NSEs/blob/master/minecraft-info.nse
nmap -p 25565 --script minecraft-info server
```

- gamemode
  - s - survival
  - c - creative
  - a - adventure
  - spectator
- difficulty


## server.properties

```ini
# 难度
# peaceful, easy, normal, hard
difficulty=easy

# 服务端发送给客户端的最大视距 - 单位是 chunk
# min=3, max=32
view-distance=10
```

- difficulty - 难度
  - 0 peaceful - 和平模式 - 没有敌对生物生成，玩家不会受到伤害或饥饿影响。
  - 1 easy - 简单模式 - 敌对生物造成的伤害较低，饥饿效果较轻。
  - 2 normal - 普通模式 - 这是默认的游戏难度，敌对生物和饥饿效果都处于中等水平。
  - 3 hard - 困难模式 - 敌对生物造成的伤害较高，饥饿效果更严重。
