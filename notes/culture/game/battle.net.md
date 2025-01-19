---
title: 战网
---

# 战网

- Battle.net

```bash
# 排查 安装 失败问题
ls /Users/Shared/Battle.net/Setup/bna_2
# locale=zhCN region=TW
open -a ~/Downloads/Battle.net-Setup.app --args --locale=enUS --region=US --session=
open -a ~/Downloads/Battle.net-Setup.app --args --locale=zhCN --region=TW --session=

# 排查 登录 问题
# Battle.net.config
ls ~/Library/Application\ Support/Battle.net

# 判断所在区域
# -> https://tw.battle.net/login/
curl https://battle.net/login/ -sfI | grep Location

# clean
rm -rf /Users/Shared/Battle.net
```

- http://us.patch.battle.net:1119
- http://tw.patch.battle.net:1119
- http://www.iana.org/assignments/port-numbers
- 1119
  - bnetgame Battle.net Chat/Game Protocol
- 1120
  - bnetfile Battle.net File Transfer Protocol
- 3724
  - blizwow World of Warcraft
- **~/Library/Application Support/Battle.net/Battle.net.config**

```json
{
  "Client": {
    "Language": "zhCN",
    "LoginSettings": {
      "AllowedRegions": "CN;US;EU;KR;TW",
      "AllowedLocales": "zhCN;deDE;enGB;enUS;esMX;esES;frFR;itIT;plPL;ptBR;ruRU;koKR;zhTW"
    }
  },
  "Path": "/Applications/Battle.net.app/Contents",
  "Services": {
    "LastLoginRegion": "TW",
    "LastLoginAddress": "tw.actual.battle.net",
    "LastLoginTassadar": "account.battle.net"
  }
}
```

```
kr.actual.battle.net
tw.actual.battle.net
account.battle.net

bnetaccount.akamaized.net
telemetry-in.battle.net
```

| 服务                            | TCP 端口                                                                                     | UDP 端口                                                                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Blizzard Battle.net desktop app | 80, 443, 1119                                                                                | 80, 443, 1119                                                                                                                      |
| Blizzard Voice Chat             | 80, 443, 1119                                                                                | 3478-3479, 5060, 5062, 6250, 12000-64000                                                                                           |
| Blizzard Downloader             | 1119, 1120, 3724, 4000, 6112, 6113, 6114                                                     | 1119, 1120, 3724, 4000, 6112, 6113, 6114                                                                                           |
| Diablo                          | 6112-6119                                                                                    | 6112-6119                                                                                                                          |
| Diablo II                       | 6112, 4000                                                                                   | None                                                                                                                               |
| Diablo III                      | 80, 1119                                                                                     | 1119, 6120                                                                                                                         |
| Hearthstone                     | 1119, 3724                                                                                   | 1119, 3724                                                                                                                         |
| Heroes of the Storm             | 80, 443, 1119-1120, 3724, 6113                                                               | 80, 1119-1120, 3478-3479, 3724, 5060, 5062, 6113, 6250, 12000-64000                                                                |
| Overwatch                       | 1119, 3724, 6113, 80                                                                         | 3478-3479, 5060, 5062, 6250, 12000-64000                                                                                           |
| StarCraft                       | 6112                                                                                         | 6112                                                                                                                               |
| StarCraft II                    | 1119, 6113, 1120, 80, 3724                                                                   | 1119, 6113, 1120, 80, 3724                                                                                                         |
| Warcraft II Battle.net Edition  | 6112-6119                                                                                    | 6112-6119                                                                                                                          |
| Warcraft III                    | 6112 (Default), 6113-6119                                                                    | None                                                                                                                               |
| World of Warcraft               | 3724, 1119, 6012                                                                             | 3724, 1119, 6012                                                                                                                   |
| Call of Duty: Black Ops 4       | PC: 3074, 27014-27050<br/>PlayStation 4: 80, 443, 1935, 3478-3480<br/>XBox One: 53, 80, 3074 | PC: 3478, 4379-4380, 27000-27031, 27036<br/>PlayStation 4: 3478-3479<br/>XBox One: 53, 88, 500, 3074, 3075, 3544, 4500             |
| Call of Duty: Modern Warfare    | PC: 3074, 27014-27050<br/>PlayStation 4: 80, 443, 1935, 3478-3480<br/>XBox One: 53, 80, 3074 | PC: 3074, 3478, 4379-4380, 27000-27031, 27036<br/>PlayStation 4: 3074, 3478-3479<br/>XBox One: 53, 88, 500, 3074, 3075, 3544, 4500 |
