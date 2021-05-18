---
title: OpenVox Asterisk
---

# OpenVox Asterisk

```bash
# 发起呼叫
channel originate SIP/6003 extension 10086@sip-6003
```

| conf         | val                       |
| ------------ | ------------------------- |
| astetcdir    | /etc/asterisk             |
| astmoddir    | /usr/lib/asterisk/modules |
| astvarlibdir | /usr/lib/asterisk         |
| astagidir    | /usr/lib/asterisk/agi-bin |
| astspooldir  | /tmp/media/spool/asterisk |
| astrundir    | /var/run                  |
| astlogdir    | /tmp/log/asterisk         |
| astdatadir   | /etc/asterisk             |

:::tip 💡

- spool 为 /tmp/media/spool/asterisk
- 录音存储在 /tmp/media/spool/asterisk/monitor
- tmpfs 根据内存不一样大小不一样 - 小的可能只有 30MB 左右 free 内存

:::
