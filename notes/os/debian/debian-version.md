---
title: Debian 版本
tags:
  - Version
---

# Debian 版本

- 两年 一版本, Security 更新 三年, Long-term 五年
- [Debian version history](https://en.wikipedia.org/wiki/Debian_version_history)
- [DebianReleases](https://wiki.debian.org/DebianReleases)
- [发布管理](https://release.debian.org/)
- [release-critical](https://bugs.debian.org/release-critical/) - 影响发布的主要 Bug
- [发行说明](https://www.debian.org/releases/testing/releasenotes)

| Version | Codename | Release    | EoL        | Security   | Extended   | Kernel |
| :------ | :------- | :--------- | :--------- | :--------- | :--------- | :----- |
| 13      | Trixie   | 2025-08-09 | 2028-08-09 | 2030-06-30 | 2035-06-30 | 6.12   |
| 12      | Bookworm | 2023-06-10 | 2026-06    | 2028-06-30 | 2033-06-30 | 6.1    |
| 11      | Bullseye | 2021-08-14 | 2024-08    | 2026-08-31 | 2031-06-30 | 5.10   |
| 10      | Buster   | 2019-07-06 | 2022-09-10 | 2024-06-30 | 2029-06-30 | 4.19   |
| 9       | Stretch  | 2017-06-17 | 2020-07-18 | 2022-06-30 | 2027-06-30 | 4.9    |
| 8       | Jessie   | 2015-04-25 | 2018-06-17 | 2020-06-30 | 2025-06-30 | 3.16   |
| 7       | Wheezy   | 2013-05-04 | 2016-04-25 | 2018-05-31 | 2020-06-30 | 3.2    |
| 6       | Squeeze  | 2011-02-06 | 2014-05-31 | 2016-02-29 |            | 2.6.32 |
| 5       | Lenny    | 2009-02-14 | 2012-02-06 |            |            | 2.6.26 |

## Debian 13 Trixie

- Linux 6.12
- 64 bit RISC-V
- ~~mipsel~~
- ~~i386~~
  - 支持在 x86_64 上运行 32 位程序
  - 要求 SSE2 CPU 指令

## Debian 11 Bullseye

- Linux 5.10
- cgroupv2
- exFAT - exfatprogs
- fai-quickstart - 自动安装 - Fully Automatic Installation
  - [fai-project](https://fai-project.org/)
- Bullseye [安装手册](https://www.debian.org/releases/bullseye/installmanual)

## Debian 10 Buster

- 4.19
