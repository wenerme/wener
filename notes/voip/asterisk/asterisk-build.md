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

:::caution

- opus 编码模块不是开源的 - 默认安装是用官方下载 - 会 phonehome 到 stats.asterisk.org
  - debian 的 opus 基于 [traud/asterisk-opus](https://github.com/traud/asterisk-opus)
  - 主要包含 codec_opus 和 format_ogg_opus
  - debian 源码 [pkg-voip-team/asterisk-opus](https://salsa.debian.org/pkg-voip-team/asterisk-opus)

:::

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
  - 18 alpinelinux crash
- Asterisk crashes during call transfer [ASTERISK-29168](https://issues.asterisk.org/jira/browse/ASTERISK-29168)
  - pbx_realtime diaplans

## There are no local system nameservers configured, resorting to system resolution

musl 不支持

- 导致 pjsip 无法使用 DNS SRV 而使用 A 和 AAAA 解析
- 参考
  - [res/res_pjsip/config_system.c#L266-L270](https://github.com/asterisk/asterisk/blob/b4347c486150653ec7ce1d129e8f9017c69344da/res/res_pjsip/config_system.c#L266-L270)
    - 跑出异常的地方
  - [configure.ac#L1415-L1471](https://github.com/asterisk/asterisk/blob/b4347c486150653ec7ce1d129e8f9017c69344da/configure.ac#L1415-L1471)
    - 依赖的系统函数
  - musl 未实现 res_ninit
  - 可以尝试该 patch [0002-resolve-musl-does-not-implement-res_ninit.patch](https://github.com/openembedded/openembedded-core/blob/master/meta/recipes-connectivity/connman/connman/0002-resolve-musl-does-not-implement-res_ninit.patch)

## AlpineLinux musl 问题

- segfault
  - agi dump html
- pjsip 无法获取 nameserver
