---
title: Init Awesome
tags:
  - Awesome
---

# Init Awesome

## supervisor

:::info

- 系统级 supervisor
  - 一般有 init 能力
  - 除了进程可能还会维护其他资源 - 例如: socket
- 进程级 supervisor
  - 只关心进程死活

:::

- supervisor ~= process manager/monitor
- [supervisor](https://github.com/Supervisor/supervisor)
  - size: 4161536
  - Python
  - https://pkgs.alpinelinux.org/package/edge/main/x86_64/supervisor
- [runit](http://smarden.org/runit/)
  - https://pkgs.alpinelinux.org/package/edge/community/x86_64/runit
  - size: 258048
- systemd
  - Python
- initd
- upstart
- tini
  - https://github.com/krallin/tini
  - size: 40960
  - docker 1.13 后内建
  - 主要用于处理僵尸集成和信号量处理
- dump-init
  - https://pkgs.alpinelinux.org/package/edge/community/x86_64/dumb-init
- openrc
  - C+Shell
- Gentoo [Comparison of init systems](https://wiki.gentoo.org/wiki/Comparison_of_init_systems)
- [OpenRC to systemd Cheatsheet](https://wiki.gentoo.org/wiki/OpenRC_to_systemd_Cheatsheet)

## Pure Init

- tinit
- dump-init
- [troglobit/finit](https://github.com/troglobit/finit)

## docker

- tinit - 如果使用单个进程
- 如果要允许多个服务，选择 s6 或 runit
- docker 内置 tini - `--init`
- [Yelp/dumb-init](https://github.com/Yelp/dumb-init)
- [krallin/tini](https://github.com/krallin/tini)
- [Choosing init for multi-process containers](https://ahmet.im/blog/minimal-init-process-for-containers/)

```bash
apk add dumb-init
/usr/bin/dumb-init --

apk add tini
/sbin/tini --
```

**最简单的 多进程 init**

```bash title="entrypoint.sh"
#!/usr/bin/env bash
set -e

program1 &
program2 &
wait -n
```

```dockerfile
ENTRYPOINT ["/bin/tini", "--", "entrypoint.sh"]
```
