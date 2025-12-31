---
title: Linux TTY & PTY
tags:
  - Linux
  - TTY
  - Terminal
---

# Linux TTY & PTY {#tty-pty}

- [What is the difference between getty and agetty?](https://unix.stackexchange.com/questions/255385/what-is-the-difference-between-getty-and-agetty)
- [Getty - ArchWiki](https://wiki.archlinux.org/index.php/Getty)
- [TTY/PTY 原理解析](https://www.kawabangga.com/posts/4515)
- [The TTY subsystem in Linux (YouTube)](https://www.youtube.com/watch?v=S81GyMKH7zw)
- [The TTY demystified](http://www.linusakesson.net/programming/tty/)
- [Linux Terminals, TTY, PTY and Shell](https://dev.to/napicella/linux-terminals-tty-pty-and-shell-192e)
- [Reverse Shell Cheat Sheet](http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet)
- [ttys(4) - Linux man page](https://man7.org/linux/man-pages/man4/ttys.4.html)

## 常用命令 (Common Commands) {#common-commands}

```bash
# 查看当前 tty
tty
```

```bash
# 查看 stty 设置
stty -a
stty --file $(tty) -a

# 设置为 raw 模式
stty raw
```
