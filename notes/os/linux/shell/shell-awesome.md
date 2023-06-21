---
title: Shell Awesome
tags:
  - Awesome
---

# Shell Awesome

- bash - Bourne shell
- ash - Almquist shell - 1989 NetBSD
- Dash - bin 还是叫 ash - Debian Almquist shell - 1997 Debian Linux
  - Debian,Ubuntu /bin/sh
  - BusyBox, AlpineLinux, TinyCoreLinux, OpenWrt, Tomato, DD-WRT
  - https://git.kernel.org/pub/scm/utils/dash/dash.git
  - macOS `brew install dash`
  - 可用于测试 shell 兼容性
- zsh
- Terminal UI
  - kitty
  - hyper
  - Tabby
  - iTerm2
  - [withfig/autocomplete](https://github.com/withfig/autocomplete)
  - for bash, zsh, fish
- [Comparison of command shells](https://en.wikipedia.org/wiki/Comparison_of_command_shells)
- Online
  - https://replit.com/languages/bash
  - https://www.onlinegdb.com/online_bash_shell

---

- [ibraheemdev/modern-Unix](https://github.com/ibraheemdev/modern-Unix)
- [explainshell](https://explainshell.com/)
- [shellinabox/shellinabox](https://github.com/shellinabox/shellinabox)
- awk
  - Awk: The Power and Promise of a 40-Year-Old Language [HN](https://news.ycombinator.com/item?id=28441887)
  - [benhoyt/prig](https://github.com/benhoyt/prig)
    - Prig is for Processing Records In Go. Like AWK
- temporary privilege escalation tool
  - [sudo](https://github.com/sudo-project/sudo)
  - doas
    - OpenBSD 5.8 - 2015-10
    - AlpineLinux 3.15 - 2021-11
  - runas
- [bats-core/bats-core](https://github.com/bats-core/bats-core)
  - Bash Automated Testing System

## Shell

- [warpdotdev/Warp](https://github.com/warpdotdev/Warp)
  - Rust based GPU-accelerated termina
  - 闭源
- [janmojzis/tinyssh](https://github.com/janmojzis/tinyssh)

## SSH

- openssh
- bear
- mosh
- [moul/quicssh](https://github.com/moul/quicssh)
  - SSH over QUIC

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

- nano
- vim
- [zyedidia/micro](https://github.com/zyedidia/micro)
- joe

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
