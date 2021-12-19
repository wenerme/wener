---
title: Shell FAQ
tags:
  - FAQ
---

# Shell FAQ

## tree utf8 chartset

```bash
# -N Print non-printable characters
tree -N
```

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

## 批量重命名

```bash
# 正则
find . -type f | perl -pe 'print $_; s/input/output/' | xargs -d "\n" -n2 mv

# 去掉单引号 - escape 比较复杂
find . -type f | grep "[']" | perl -pe "print \$_; s/'//g" | xargs -d "\n" -n2 mv

# 电视剧第N集 -> 电视剧 N
# echo - dry run
find . -type f | perl -pe 'print $_; s/第(\d+)集/ \1/' | xargs -d "\n" -n2 echo mv
# 电视剧.01.mp4 -> 电视剧.EP01.mp4
find . -type f | perl -pe 'print $_; s/[.](\d+)[.]/.EP\1./' | xargs -d "\n" -n2 echo mv
```

## 修复一般文件和目录 mod

```bash
find . -type d -exec chmod 0755 {} \;
find . -type f -exec chmod 0644 {} \;

# 修复 某个 owner
find . -type d -user harry -exec chown daisy {} \;
```
