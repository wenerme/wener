---
title: Shell FAQ
tags:
  - FAQ
---

# Shell FAQ

## skip first n line

```bash
tail -n +1
```

## sort in place

```bash
# -o 可以，不要 > file
sort -o file{,}
```

## tree utf8 chartset

```bash
# -N Print non-printable characters
tree -N
```

## tree exclude

```bash
tree -I 'containerd|docker'
tree -I 'node_modules|cache|test_*'

tree -L 3 -I 'node_modules*|cache*'
```

## shebang

**for bash**

```bash
#!/usr/bin/env bash
```

**posix shell**

```bash
#!/bin/sh
```

## 获取一个 Tab 字符

```bash
echo -ne \\t | pbcopy
```

## 找到最大的文件

```bash
find . -printf '%s %p\n' | sort -nr | head
find . -maxdepth 1 -printf '%s %p\n' | sort -nr | head
du -a . | sort -nr | head
```

## 文件时间信息

```bash
touch file
stat file
TZ=UTC stat -c '%y %n' file
date -r file +%s
# [[CC]YY]MMDDhhmm[.ss]
touch -a -m -t 203801181205.09 file
touch -d "2012-10-19 12:12:12.000000000 +0530" file
```

**crtime - birt time**

```bash
inode=$(stat -c %i test)
# stat 信息
debugfs -R "stat ${inode}" /dev/sdb1
# 危险操作
umount /dev/sdb1
debugfs -w -R "set_inode_field ${inode} crtime 200001010101.11" /dev/sdb1
```

- [herzbube/birthtime_touch](https://github.com/herzbube/birthtime_touch)

## pwd vs cwd

```bash
type -a pwd
```

| -           | -                          |
| ----------- | -------------------------- |
| builtin pwd | echo $PWD                  |
| /bin/pwd    | pwd -P                     |
| getcwd      | readlink -f /proc/self/cwd |

## doas vs sudo

- doas
  - 95% of the features of sudo with a fraction of the codebase
  - ~1000 LOC
- sudo
  - ~18K LOC
  - 依赖很多 - eventlog, iolog, logsrv, protobuf-c, zlib
  - logsrvd
  - 功能多一些 - 不一定会用得到

## string include/match

```bash
[[ 'abcd' = *'bc'* ]] && echo yes
[[ 'abcd' =~ 'bc' ]] && echo yes
str=abcd [ -z "${str##*bc*}" ] && echo yes
```

## trim space

```bash
echo "   lol  " | xargs
# 不会 trim 换行
echo -e "   lol\r\n  " | xargs | hexdump -C
# 移除所有空白
echo -e 'a b c\r' | tr -d '[:space:]'
# trim left - sed 不能替换 \r\n
echo -e ' \r\nabc\r\n ' | sed -e 's/^[[:space:]]*//'
# trim right
echo -e ' abc ' | sed -e 's/[[:space:]]*$//'
```

## Terminal vs Console vs Shell

- console = physical terminal
  - 物理实体
- terminal = tty = teletype = text input/output environment
  - 链路协议接口
- shell = command line interpreter
  - 上层抽象行为概念
  - 逻辑协议

## 基于时间搜索

```bash
# 修改时间在某个时间点之前的目录
find . -maxdepth 1 -type d -not -newermt 2022-01-01 -ls
# 递归删除
find . -maxdepth 1 -type d -not -newermt 2022-01-01 -exec rm -r {} ';'
```

## 修复一般文件和目录 mod

```bash
find . -type d -exec chmod 0755 {} \;
find . -type f -exec chmod 0644 {} \;

# 修复 某个 owner
find . -type d -user harry -exec chown daisy {} \;
```

## shell vs python

- shell - 必知必会
  - 让简单的事情 非常简单，让复杂的事情 非常复杂
  - 复杂过后可维护性差
  - 核心优势在于 compose/组合/联结 各种工具
  - 环境可预期
  - 但 **工具** 不一定完全兼容
    - posix/gnu/busybox/coreutils/findutils/util-linux
- python - 补充扩展
  - 难度适中，可维护
  - 目前大多 linux 环境都有安装 python
  - python 也是 shell 一部分

---

- https://stackoverflow.com/q/796319/1870054

## zsh vs bash

| vs.               | zsh                   | bash                        |
| ----------------- | --------------------- | --------------------------- |
| interactive shell | .zshrc                | .inputrc,.bashrc            |
| login shell       | .zprofile             | .profile,.bash_profile      |
| key binding       | bindkey -> zle        | .inputrc `bind` -> readline |
| prompt PS1 escape | PS1 - `%` 转义        | PS1 - `\`` 转义             |
| promot command    | precmd + preexec hook | PROMPT_COMMAND              |
| array index       | start from **1**      | start from **0**            |

- zsh
  - 多用于用户环境
    - 交互更好
    - 功能更多
- bash
  - 多用于服务端环境
    - 默认
    - 稳定

---

- https://apple.stackexchange.com/a/361957/103557

## tee stderr

```bash
echo message | tee -a /dev/fd/2 > /dev/null
```

## Sort Large File

```bash
split -l 1000000 in.txt chunk
for X in chunk*; do sort < $X > sorted-$X; done
sort -m sorted-chunk* > out.txt

# 清理
rm chunk* sorted-chunk*
```

- `-m` 只合并不做整体排序
- `--parallel=$(nproc)` 并行
- https://man7.org/linux/man-pages/man1/sort.1.html

## arch

```bash
architecture=""
case $(uname -m) in
  i386 | i686) architecture="386" ;;
  x86_64) architecture="amd64" ;;
  # apk --print-arch
  arm) dpkg --print-architecture | grep -q "arm64" && architecture="arm64" || architecture="arm" ;;
esac
```
