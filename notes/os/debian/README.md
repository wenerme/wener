---
id: debian
title: Debian
---

# Debian

- [Debian 用户手册](https://www.debian.org/doc/user-manuals)
  - [Debian 参考手册](https://www.debian.org/doc/manuals/debian-reference/)
  - [Debian 管理员手册](https://www.debian.org/doc/manuals/debian-handbook)
- [Debian Popularity Contest](https://popcon.debian.org/)


## source

- https://wiki.debian.org/SourcesList
- /etc/apt/sources.list
- /etc/apt/sources.list.d/ - 新的格式,  deb822 style
  - /etc/apt/sources.list.d/debian.sources
- /etc/apt/mirrors/debian.list


```
Types: deb deb-src
URIs: mirror+file:///etc/apt/mirrors/debian.list
Suites: bookworm bookworm-updates bookworm-backports
Components: main

Types: deb deb-src
URIs: mirror+file:///etc/apt/mirrors/debian-security.list
Suites: bookworm-security
Components: main
```
