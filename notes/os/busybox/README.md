---
title: Busybox
---

# Busybox

- 类似
  - [landley/toybox](https://github.com/landley/toybox)
    - BSD, C
  - [u-root/u-root](https://github.com/u-root/u-root)
    - BSD, Go
- [busybox](https://busybox.net/downloads/BusyBox.html)
- [live bbox](https://www.busybox.net/live_bbox/live_bbox.html)

```bash
# https://busybox.net/downloads/binaries/1.31.0-defconfig-multiarch-musl/
curl -o busybox https://busybox.net/downloads/binaries/1.31.0-defconfig-multiarch-musl/busybox-x86_64
chmod +x busybox
```

## 包管理

- ipkg - Itsy Package Management System - 2006-5-30
  - `.ipk`
- opkg - OPKG Package Manager
  - 支持 root fs 管理，而不只是安装到特定目录 - 例如 `/opt`
  - `.opk`
- 早期使用 ipkg, 之后被 opkg 替代
- 类似 apt/dpkg

## applets

- [utmp.5](https://man7.org/linux/man-pages/man5/utmp.5.html) - https://en.wikipedia.org/wiki/Utmp
  - keep track of all logins and logouts
  - 被依赖 who, last
  - AlpineLinux 目前没开启 bb 的这个组件，目前仓库有 skarnet 的 [utmps](https://skarnet.org/software/utmps/)
    - coretutil link 的是 skarnet 的 utmp
    - https://gitlab.alpinelinux.org/alpine/aports/-/issues/3282#note_15597
    - musl 不支持 utmp
      - https://wiki.musl-libc.org/faq.html
- wtmp
  - historical utmp
- btmp
  - records failed login attempts

```
/var/run/utmp
/var/log/wtmp
/var/log/btmp
```
