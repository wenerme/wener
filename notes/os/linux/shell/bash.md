---
title: Bash
---

# Bash

- 配置
  - .inputrc
  - .bashrc - 交互 shell
  - .profile, .bash_profile - 登陆 shell
- 参考
  - [Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html)
  - https://www.man7.org/linux/man-pages/man1/bash.1.html
  - http://mywiki.wooledge.org/BashPitfalls
  - https://tiswww.case.edu/php/chet/bash/NEWS

```bash
# empty shell
env -i bash

# empty env
env -i HOME="$HOME" bash -c 'env'

# login shell
time env -i HOME="$HOME" LOG4BASH_LOG_LEVE=DEBUG /usr/local/bin/bash -l -c 'env'
```

| flag       | for            |
| ---------- | -------------- |
| -c COMMAND | command string |
| -i         | interactive    |
| -l         | login shell    |
| -r         | restricted     |
| -s         | stdin          |

```bash
# 传递 flag 给 stdin 脚本
curl http://sh | bash -s -- -flag
```

## 语法

- `[` = test
- `[[` - shell 内置语法 - 速度更快一点点
  - 支持 `&&`, `||` 语法
- `{}` - 展开
  - `${var}`
  - `${var:=default}`
  - `${var/find/replace}`
  - `${var%remove}`
  - `{000..2}` - 序列展开
  - `{000..2..2}` - 带 step 参数
  - `echo x{,A,B,C}` - 组合展开
  - `{ echo 1; echo 2; }` - 命令序列
- `(())` - 算术操作
- `()` - subshell, array

```bash
# for 循环
# ===========
# bash 语法
for ((i = 0; i < 3; i++)); do echo $i; done
# bash 展开序列
for i in {0..2}; do echo $i; done
# 使用 seq 生成序列 - ash 支持
for i in $(seq 0 2); do echo $i; done
for i in $(seq 0 $((3 - 1))); do echo $i; done
```

## set

```bash
# 推荐
set -Eeuo pipefail
```

- [Reference](./shell-ref.md#options)
- trap ERR 可处理 -e 退出
- [set](https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html)

## shopt

- Bash 扩展选项

```
shopt [-pqsu] [-o] [optname …]
```

```bash
shopt -s extglob # 开启
shopt -u extglob # 关闭
shopt -q extglob # 使用 exit code 表示是否开启
shopt extglob    # 当前状态
shopt            # 全部状态
shopt -o nolog   # 限定内置 set 支持选项而非扩展选项

# 所有 on 的选项
shopt | grep "on$" | grep -o '^\S\+'
# 推荐
shopt -s autocd cdspell extglob globstar

# 默认开启选项
shopt -s checkwinsize cmdhist expand_aliases extquote force_fignore hostcomplete interactive_comments progcomp promptvars sourcepath
```

- globstar - `**` 会匹配当前而不只是子目录
  ```bash
  # 会匹配 Makefile
  ls **/Makefile
  ```
- extglob - 扩展 glob 语法
  - `[?*+@!](pattern-list)`
    - `!` 排除
    - `@` 匹配 1 个
  - [Pattern Matching](https://www.gnu.org/software/bash/manual/html_node/Pattern-Matching.html)
  ```bash
  # 复制 scripts 下的 Makefile 到所有其他 Makefile
  ls !(scripts)/**/Makefile | xargs -n 1 cp scripts/stub/Makefile
  ```
- nocaseglob - glob 大小写不敏感
- histappend - 追加到历史文件而不是重写
- cdspell - 使用 cd 时自动校正书写
  ```bash
  cd ignorad # 会 cd 到存在的 ignored 目录 - a -> e
  ```
- autocd - 输入目录自动切换到目录
- failglob - glob 匹配不到文件时出错而非 直接输出相同字符

## 环境变量 {#env}

| env           | default | description |
| ------------- | ------- | ----------- |
| EPOCHSECONDS  |
| EPOCHREALTIME |
| BASH_ARGV0    |

```bash
echo $EPOCHSECONDS
```

## .inputrc

C-x C-r is bound to re-read-init-file.

https://www.gnu.org/software/bash/manual/html_node/Readline-Init-File.html

https://www.gnu.org/software/bash/manual/bashref.html#Miscellaneous-Commands

```bash
# Make Tab autocomplete regardless of filename case
set completion-ignore-case on

# List all matches in case multiple possible completions are possible
set show-all-if-ambiguous on

# Immediately add a trailing slash when autocompleting symlinks to directories
set mark-symlinked-directories on

# Use the text that has already been typed as the prefix for searching through
# commands (i.e. more intelligent Up/Down behavior)
"\eOA": history-search-backward
"\e[A": history-search-backward
"\eOB": history-search-forward
"\e[B": history-search-forward
```

## FAQ

### Prefix/Suffix

```bash
# 去除前缀和后缀
x="/foo/fizzbuzz.bar"
y=${x%.bar}
echo ${y##*/}
#> fizzbuzz

# 去除后缀
x="/foo/fizzbuzz.bar.quux"
y=${x%.*}
echo $y
#> /foo/fizzbuzz.bar
y=${x%%.*}
echo $y
#> /foo/fizzbuzz

# 去除前缀
x=/foo/bar/bim/baz/file.gif
y=${path##*/}
echo $y
#> file.gif
```

## 替换

```bash
a=abc/da
# zbc/da
echo ${a/a/z}
# // 是所有
# zbc/dz
echo ${a//a/z}
# 转意
# abczda
echo ${a//\//z}
```

## Parallels

```bash
# do it once
seq 1 | parallel -n0 "curl -H 'Content-Type: application/json' http://httpbin.org/post -X POST -d '{\"url\":\"http://google.com/\"}'"

# do it twice
seq 2 | parallel -n0 "curl -H 'Content-Type: application/json' http://httpbin.org/post -X POST -d '{\"url\":\"http://google.com/\"}'"

# do it 4 times, but at 2 a time
seq 4 | parallel -n0 -j2 "curl -H 'Content-Type: application/json' http://httpbin.org/post -X POST -d '{\"url\":\"http://google.com/\"}'"

# you can also put all your commands into a file
echo "ls\nls" > somefile
cat somefile | parallel

# finally, just straight command line parameters
parallel echo ::: a b c

# by default, it runs as many jobs in parallel as there are cores in your computer

# if you try and set more jobs than there are cores, they will be concurrent, but
# they will only ever be parallel up to your core count

# for httpie use the --ignore-stdin flag, or else it gets mixed up
seq 1 | parallel -n0 "http --ignore-stdin POST http://httpbin.org/post url=http://google.com/"
```

## Base N

```
# Encode base62
BASE62=($(echo {0..9} {a..z} {A..Z}))
for i in $(bc <<< "obase=62; 9207903953"); do
    echo -n ${BASE62[$(( 10#$i ))]}
done && echo
# Decode base62
base62_decode() { echo $((62#$1)) }
```

## SSH

```bash
# download: remote -> local
# local_file 可以为目录用 -r 递归
scp user@remote_host:remote_file local_file
# upload: local -> remote
scp local_file user@remote_host:remote_file

# To Forward sshtalk.in:8080 -> Cort.local:4567, you can do
local="Cort.local:4567" # or "localhost:4567"
remot="*:8080"          # "*" for all interfaces (default is loopback)

ssh -R ${remote}:${local} sshtalk.in

# To forward localhost:1234 -> private-host:443, through public-host you can do
local="localhost:1234"   # or just "1234" default is localhost
remot="private-host:443" # "*" for all interfaces (default is loopback)

ssh -L ${local}:${remote} public-host

# 须在在Server端允许转发
# 在 /etc/ssh/sshd_config 中添加
# GatewayPorts yes
# 然后重启
sudo service sshd restart
```

```bash
# scp to 多台
for dest in $(< destfile.txt); do
  scp ourfile.txt ${dest}:remote/path/
done

# 在不用 scp 的情况下 拷贝到多台
cat file.txt | tee \
  >(ssh user@ip1.com "cat > file.txt") \
  >(ssh user@ip2.com "cat > file.txt")

tar cz file1 file2 file3 | tee \
  >(ssh user@ip1.com "tar xz") \
  >(...)
```

## xargs

- [xargs example](http://www.thegeekstuff.com/2013/12/xargs-examples/)

## case

```bash
case $space in
  [1-6]*)
    Message="All is quiet."
    ;;
  [7-8]*)
    Message="Start thinking about cleaning out some stuff.  There's a partition that is $space % full."
    ;;
  9[1-8])
    Message="Better hurry with that new disk...  One partition is $space % full."
    ;;
  99)
    Message="I'm drowning here!  There's a partition at $space %!"
    ;;
  *)
    Message="I seem to be running with an nonexistent amount of disk space..."
    ;;
esac
```

## 使用变量名字访问变量

- [Shell Parameter Expansion](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)

```bash
a=PATH
echo ${!a}
```

## dotenv

```bash
env $(cat .env | xargs) sh -c 'echo $MY_ENV'
```

## heredoc

```bash
cat << EOF
PWD=$PWD
EOF
# 转义
cat << "EOF"
PWD=$PWD
EOF
# 移除缩进 - 需要 tab
cat <<- EOF
	PWD=$PWD
	EOF
```

## sub shell

- https://tldp.org/LDP/abs/html/subshells.html

```bash
(echo 1)

# 会输出 1 2 3 4
bash << SH &
echo 1
echo 2 && (echo 3; exit 1;)
echo 4
SH
```

## tcp redir

```bash
echo <> /dev/tcp/wener.me/80
# 0 - 连通
echo $?

echo <> /dev/tcp/localhost/80
# 1
echo $?
```

## git branch

```bash
curl -Lo ~/.git-prompt.sh https://github.com/git/git/raw/master/contrib/completion/git-prompt.sh
source ~/.git-prompt.sh

__git_ps1 '%s'

export PS1='\[\e[32m\]\u@\h \[\e[01;33m\]\w $(__git_ps1 " (%s)") \[\e[34m\][\t] \[\e[0m\]\n$ '
```

- https://github.com/git/git/blob/master/contrib/completion/git-prompt.sh
