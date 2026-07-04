---
title: IRC
---

# IRC

- IRC - Internet Relay Chat
  - 老牌实时通讯协议
  - Text based, line based
  - `[@tags] [:prefix] COMMAND [params...] [:trailing]\r\n`
- irc:// -> 6667
- ircs:// -> 6697
- [rfc1459](https://datatracker.ietf.org/doc/html/rfc1459.html)
  - Internet Relay Chat Protocol 1993
- 参考
  - [IRC Networks - Top 100](https://netsplit.de/networks/top100.php)
  - wikipedia [Internet Relay Chat](https://en.wikipedia.org/wiki/Internet_Relay_Chat)
  - Twitch [Chatbots & IRC Guide](https://dev.twitch.tv/docs/irc/guide)
- Client
  - [thelounge/thelounge](https://github.com/thelounge/thelounge)
    - MIT, JS+Vue
    - Web
- Server
  - [ergochat/ergo](https://github.com/ergochat/ergo)
    - MIT, Go
    - [HN](https://news.ycombinator.com/item?id=31832115)
- 6697, 7000, 7070
- IRC network
  - OFTC irc://irc.oftc.net
  - chat.freenode.net
  - irc.libera.chat
- [IRC commands](https://en.wikipedia.org/wiki/List_of_Internet_Relay_Chat_commands)
- 服务组件
  - irc server / ircd
  - bouncer - 常驻代理/多端/history/session
  - history / playback
  - web client / gateway
  - bot - 自动化/通知/桥接
  - client
  - services
    - NickServ - 昵称/账号注册与认证
    - ChanServ - 频道注册、权限、op 管理
    - MemoServ - 离线留言，较老派
    - OperServ - 网络管理员操作
    - HostServ - vhost/cloak 管理
    - BouncerServ

```
Libera.Chat          = IRC network
irc.libera.chat      = server hostname / connection endpoint / connection url
#weechat             = channel
wener                = nick
```

```bash
docker run --rm -it \
  --publish 9000:9000 \
  --volume $PWD/thelounge:/var/opt/thelounge \
  --name thelounge thelounge/thelounge:latest
```

| abbr. | stand for                                | cn             |
| ----- | ---------------------------------------- | -------------- |
| SASL  | Simple Authentication and Security Layer | 认证机制抽象层 |

- SASL
  - 应用协议不需要自己发明登录流程，只要接入 SASL，就可以支持多种认证机制。

```
/msg NickServ REGISTER <password> <email>
/msg NickServ IDENTIFY <password>
/msg NickServ SET PASSWORD <new-password>

/msg ChanServ REGISTER #mychan
/msg ChanServ FLAGS #mychan wener +o
/msg ChanServ OP #mychan wener
```

## Networks

## IRCv3

- IRCv3
  - SASL
  - server-time
  - message-tags
  - batch
  - chathistory
  - echo-message

## Websocket

- https://ircv3.net/specs/extensions/websocket
- https://github.com/kiwiirc/webircgateway
- soju 支持配置
  - `listen ws://127.0.0.1:8080`

## oftc

```
/msg NickServ IDENTIFY $password [$nick]


/connect irc.libera.chat 6667 YourNick:YourPassword

/nick YourNick
/msg NickServ REGISTER YourPassword youremail@example.com
/msg NickServ IDENTIFY YourNick YourPassword

/msg NickServ HELP SET PASSWORD
```

- +sntR
