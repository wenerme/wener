---
title: Shell Awesome
tags:
  - Awesome
---

# Shell Awesome

- shell
  - bash - Bourne shell
  - ash - Almquist shell - 1989 NetBSD
  - Dash - bin 还是叫 ash - Debian Almquist shell - 1997 Debian Linux
    - Debian,Ubuntu /bin/sh
    - used by BusyBox, AlpineLinux, TinyCoreLinux, OpenWrt, Tomato, DD-WRT
    - https://git.kernel.org/pub/scm/utils/dash/dash.git
    - macOS `brew install dash`
    - 可用于测试 shell 兼容性
  - zsh
  - [Comparison of command shells](https://en.wikipedia.org/wiki/Comparison_of_command_shells)
- workspace/session/multiplexer
  - [tmux](./tmux/README.md)
  - [zellij-org/zellij](https://github.com/zellij-org/zellij)
  - [shell-pool/shpool](https://github.com/shell-pool/shpool)
- remote/ssh
  - openssh
  - bear
  - mosh
  - [moul/quicssh](https://github.com/moul/quicssh)
    - SSH over QUIC
  - [moul/assh](https://github.com/moul/assh)
    - ssh wrapper 添加一些额外功能
  - [lwch/natpass](https://github.com/lwch/natpass)
    - MIT, Golang
    - shell 管理, 远程桌面管理
- Terminal UI
  - kitty
  - hyper
  - Tabby
  - iTerm2
  - [withfig/autocomplete](https://github.com/withfig/autocomplete)
    - for bash, zsh, fish
- parser/formatter/interpreter
  - [mvdan/sh](https://github.com/mvdan/sh)
    - BSD-3, Golang
  - [elves/elvish](https://github.com/elves/elvish)
    - BSD-2, Golang
- Online
  - https://replit.com/languages/bash
  - https://www.onlinegdb.com/online_bash_shell
- info/系统信息/diagnostics/系统诊断/summary
  - fastfetch
  - pfetch-rs
  - ~~[dylanaraps/neofetch](https://github.com/dylanaraps/neofetch)~~
    - 不再维护, bash 3.2+
  - ~~[dylanaraps/pfetch](https://github.com/dylanaraps/pfetch)~~
  - screenfetch
  - inxi
  - hwinfo
  - ufetch
    - 代码非常少，可以作为参考
  - cpufetch
  - [TheTumultuousUnicornOfDarkness/CPU-X](https://github.com/TheTumultuousUnicornOfDarkness/CPU-X)
    - GUI
    - 类似于 CPU-Z for Windows
  - [o2sh/onefetch](https://github.com/o2sh/onefetch)
    - for git
- stats
  - sysstat
  - dstat
  - atop
  - htop
  - btop
  - iftop
  - nethogs
  - iotop
  - iostat
- privilege escalation/switch user/privilage execution/权限提升/用户切换
  - [sudo](https://github.com/sudo-project/sudo)
    - Superuser Do
    - /etc/sudoers
  - doas
    - /etc/doas.conf
    - OpenBSD 5.8 - 2015-10
    - AlpineLinux 3.15 - 2021-11
  - su - Switch User
  - sg - Switch Group
  - setuid
    - 执行该文件的用户将临时获得该文件所有者的权限。
  - pkexec
    - PolicyKit
  - runuser
  - sudoedit
  - ksu
    - Kerberos su
  - newgrp
  - runas - Windows
    - `runas /user:Administrator "command"`
- sandbox/isolation/rootfs 操作/环境隔离/虚拟化/namespaces
  - chroot
  - fakeroot
  - switch_root
  - pivot_root
  - proot
    - not root chroot
  - jail
  - nsenter
  - unshare
  - cgroups
  - [containers/bubblewrap](https://github.com/containers/bubblewrap)
    - Low-level unprivileged
    - used by Flatpak
  - [netblue30/firejail](https://github.com/netblue30/firejail)
    - Linux namespaces and seccomp-bpf sandbox

---

- [ibraheemdev/modern-Unix](https://github.com/ibraheemdev/modern-Unix)
- [explainshell](https://explainshell.com/)
- [shellinabox/shellinabox](https://github.com/shellinabox/shellinabox)
- awk
  - Awk: The Power and Promise of a 40-Year-Old Language [HN](https://news.ycombinator.com/item?id=28441887)
  - [benhoyt/prig](https://github.com/benhoyt/prig)
    - Prig is for Processing Records In Go. Like AWK
- [bats-core/bats-core](https://github.com/bats-core/bats-core)
  - Bash Automated Testing System
- lrzsz
  - https://ohse.de/uwe/software/lrzsz.html
  - x/y/zmodem
  - rz 上传
    - Receive by ZMODEM
  - `sz a.txt` 下载
    - Send by ZMODEM
  - tmux 不支持 [tmux#906](https://github.com/tmux/tmux/issues/906), [tmux#1439](https://github.com/tmux/tmux/issues/1439)
  - `brew install lrzsz`
  - https://iterm2.com/documentation-triggers.html
    - /usr/local/bin/ iterm2-send-zmodem.sh, iterm2-recv-zmodem.sh
    - https://raw.githubusercontent.com/RobberPhex/iterm2-zmodem/master/iterm2-recv-zmodem.sh
    - https://raw.githubusercontent.com/RobberPhex/iterm2-zmodem/master/iterm2-send-zmodem.sh
  - https://github.com/robberphex/iTerm2-zmodem
  - SecureCRT, Xshell 支持
  - putty 不支持
- [trzsz/trzsz](https://github.com/trzsz/trzsz)
  - MIT, Python
  - 类似 lrzsz
  - trz 上传, tsz 下载
  - 支持 tmux
  - 支持 iTerm2 https://trzsz.github.io/iterm2
  - trzsz-go, trzsz-ssh
  - [trzsz/trzsz.js](https://github.com/trzsz/trzsz.js)
    - https://github.com/jumpserver/jumpserver/issues/10679

## Shell

- [warpdotdev/Warp](https://github.com/warpdotdev/Warp)
  - Rust based GPU-accelerated termina
  - 闭源
- [janmojzis/tinyssh](https://github.com/janmojzis/tinyssh)

## Share

- [tmate-io/tmate](https://github.com/tmate-io/tmate)
  - web terminal
- [owenthereal/upterm](https://github.com/owenthereal/upterm)
- [elisescu/tty-share](https://github.com/elisescu/tty-share)
- Foundation
  - [tsl0922/ttyd](https://github.com/tsl0922/ttyd)
  - [butlerx/wetty](https://github.com/butlerx/wetty)
  - [yudai/gotty](https://github.com/yudai/gotty)

## Network

- curl
- httpie
- [rs/curlie](https://github.com/rs/curlie)
  - 接口更友好，实际调用 curl

## Utils

- [muesli/duf](https://github.com/muesli/duf)
  - a better df
- [wader/fq](https://github.com/wader/fq)
  - jq for binary formats
- [junegunn/fzf](https://github.com/junegunn/fzf)
  - fuzzy finder
- [BurntSushi/ripgrep](https://github.com/BurntSushi/ripgrep)

## Editor

- [nano](./nano.md)
  - Enhanced clone of the Pico text editor
- vim
- [zyedidia/micro](https://github.com/zyedidia/micro)
- joe

```bash
apk add nano  # Installed size 308 kB
apk add micro # Installed size 12.17 MB
```

## root

- [proot-me/proot](https://github.com/proot-me/proot)
  - user-space implementation of chroot, mount --bind, binfmt_misc

```bash
# bind
# -R 自动绑定
# -0 ROOT
# -q qemu-arm
# -q "qemu-arm -g 1234"
proot -b /tmp/alternate_opt:/opt -b /proc
```
