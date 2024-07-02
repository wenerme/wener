---
title: Linux Awesome
tags:
  - Awesome
---

# Linux Awesome

- WebAdmin/WebUI
  - [IceWhaleTech/CasaOS](https://github.com/IceWhaleTech/CasaOS)
    - Apache-2.0, Go
    - Personal Cloud system
  - [azukaar/Cosmos-Server](https://github.com/azukaar/Cosmos-Server)
    - Apache-2.0, Go
    - Selfhosted Home Server
  - [cockpit-project/cockpit](https://github.com/cockpit-project/cockpit)
    - LGPL-2.1
    - by Red Hat
    - 需要 systemd 系
    - 不支持 AlpineLinux [#17709](https://github.com/cockpit-project/cockpit/discussions/17709)
  - AlpineLinux
    - ACF
    - https://wiki.alpinelinux.org/wiki/Webmin
  - [zhaojh329/oui](https://github.com/zhaojh329/oui)
    - for OpenWrt
- selfhost
  - https://github.com/awesome-selfhosted/awesome-selfhosted?#self-hosting-solutions
- https://www.appimagehub.com/


## Components

- audio
  - pipewire
  - PulseAudio
  - JACK
  - ALSA
  - alsa

## Dev

- https://www.openwall.com/

## Command

- [tldr-pages/tldr](https://github.com/tldr-pages/tldr)
  - Collaborative cheatsheets for console commands

## Performance

- [Linux Performance](http://www.brendangregg.com/linuxperf.html)


## Firmware

- [fwupd](https://fwupd.org/)
  Linux Vendor Firmware Service

## Learn

- [The Linux Kernel Module Programming Guide](https://sysprog21.github.io/lkmpg/)
  - [HN](https://news.ycombinator.com/item?id=28283030)

## Tools

- [aristocratos/btop](https://github.com/aristocratos/btop)
- [intoli/exodus](https://github.com/intoli/exodus)
  - relocation of Linux binaries–and all of their dependencies–without containers

## Network

- nethogs

## Sandbox/Namespace {#namespaces}

- ptrace
  - Mares,Kolstad
  - 开销大、无法同时监控多线程的程序
- secommp
  - TxBox
  - 如果想定制化开发，需要对OS内核进行批量的修改
- [cgrouop](./sys/cgroup.md)
- [ioi/isolate](./sys/isolate.md)
  - GPLv2, C
  - 执行不安全程序
- [google/nsjail](https://github.com/google/nsjail)
  - Apache-2.0, C++
  - light-weight process isolation tool
- [containers/bubblewrap](https://github.com/containers/bubblewrap)
  - GPLv2, C
  - Low-level unprivileged sandboxing tool used by Flatpak

## 有趣

- [sbu-fsl/kernel-ml](https://github.com/sbu-fsl/kernel-ml)
  - Brings ML to Linux kernel
- [Move a running process into a tmux session](https://xai.sh/2020/10/16/Move-running-process-into-tmux-session.html)
- [marcan/takeover.sh](https://github.com/marcan/takeover.sh)
