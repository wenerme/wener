---
title: IRC
---

# IRC

- IRC - Internet Relay Chat
  - 老牌实时通讯协议
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
- Server
  - irc://irc.oftc.net
  - chat.freenode.net
- [IRC commands](https://en.wikipedia.org/wiki/List_of_Internet_Relay_Chat_commands)

```bash
docker run --rm -it \
  --publish 9000:9000 \
  --volume $PWD/thelounge:/var/opt/thelounge \
  --name thelounge thelounge/thelounge:latest
```

**oftc**


```
/msg NickServ IDENTIFY $password [$nick]


/connect irc.libera.chat 6667 YourNick:YourPassword

/nick YourNick
/msg NickServ REGISTER YourPassword youremail@example.com
/msg NickServ IDENTIFY YourNick YourPassword
```

- +sntR
