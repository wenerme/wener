---
title: Build Asterisk
---

# Build Asterisk

- debian 能安装 16
  - 没有 codec_ilbc, app_meetme
    - ilbc -> opus
    - meetme -> ConfBridge
- alpine 能安装 18 - 最新  lts 版 - 但有些场景可能 crash
  - 可以考虑基于 frolvlad/alpine-glibc 从新构建
  - 没有 codec_opus_open_source
- 如果需要 certificated asterisk 版本只能自己构建
- 参考
  - aports [main/asterisk/APKBUILD](https://github.com/alpinelinux/aports/blob/master/main/asterisk/APKBUILD)
  - [andrius/asterisk](https://github.com/andrius/asterisk)
    - debian, centos 构建个个版本 asterisk
- debian
  - 共享资源位于 /usr/share/asterisk

```bash
# 构建 doc xml
# 可用于生成代码或文档
# core 做了 html escape, full 没有 - 两个区别不大
make doc/core-en_US.xml
make doc/full-en_US.xml

# 模块支持状态
grep -rP '^\t<support_level>' $(find . -name '*.c') | sed -re 's#</?support_level>##g' | sort
```

# FAQ

## Asterisk Crash

- Dial 时 WebSocket 发送 DTMF
  - Debian 16.16 crash
- Echo 应用按任意键
- Asterisk crashes during call transfer [ASTERISK-29168](https://issues.asterisk.org/jira/browse/ASTERISK-29168)
  - pbx_realtime diaplans
