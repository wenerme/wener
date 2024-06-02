---
title: incron
---

# incron

- [ar-/incron](https://github.com/ar-/incron)
  - C++
  - event based background program processing daemon
- inotify
- /etc/incron.conf
- /etc/init
- /usr/bin/incrontab
- /usr/sbin/incrond
- /etc/incron.d/
  - system tables

```bash
apk add incron

# /var/spool/incron/root
EDITOR=nano incrontab -l -u root

service incrond start
rc-update add incrond default
```

```
/etc/haproxy/haproxy.cfg IN_CLOSE_WRITE,IN_MOVED_TO service haproxy reload --ifstarted
```

- MASK - inotify

| MASK             | for                                                             |
| ---------------- | --------------------------------------------------------------- |
| IN_ACCESS        | 访问文件 (read)                                                 |
| IN_ATTRIB        | 元数据变化 (permissions, timestamps, extended attributes, etc.) |
| IN_CLOSE_WRITE   |
| IN_CLOSE_NOWRITE |
| IN_CREATE        |
| IN_DELETE        |
| IN_DELETE_SELF   |
| IN_MODIFY        |
| IN_MOVE_SELF     |
| IN_MOVED_FROM    |
| IN_MOVED_TO      |
| IN_OPEN          |
| ---              |
| IN_ALL_EVENTS    | 所有事件                                                        |
| IN_MOVE          |
| IN_CLOSE         |
| **symbol**       |
| IN_DONT_FOLLOW   |
| IN_ONESHOT       |
| IN_ONLYDIR       |
