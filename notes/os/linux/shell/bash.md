---
title: Bash
---

# Bash

- 配置
  - .inputrc
  - .bashrc - 交互 shell
  - .profile, .bash_profile - 登陆 shell
- http://mywiki.wooledge.org/BashPitfalls

```bash
# empty shell
env -i /usr/local/bin/bash

# empty env
env -i HOME="$HOME" /usr/local/bin/bash -c 'env'

# login shell
time env -i HOME="$HOME" LOG4BASH_LOG_LEVE=DEBUG /usr/local/bin/bash -l -c 'env'
```

set -o allexport

```bash
# glob 大小写不敏感
shopt -s nocaseglob

# 追加到历史而不是重写
shopt -s histappend

# 使用 cd 时自动校正书写
shopt -s cdspell

# Bash 4
# ==========
# `**/qux` will enter `./foo/bar/baz/qux`
shopt -s autocd
# Recursive globbing, e.g. `echo **/*.txt`
shopt -s globstar

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

### Find max file

```bash
find . -printf '%s %p\n' | sort -nr | head
find . -maxdepth 1 -printf '%s %p\n' | sort -nr | head
du -a . | sort -nr | head
```

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
remot="*:8080" # "*" for all interfaces (default is loopback)

ssh -R ${remote}:${local} sshtalk.in

# To forward localhost:1234 -> private-host:443, through public-host you can do
local="localhost:1234" # or just "1234" default is localhost
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
for dest in $(<destfile.txt); do
  scp ourfile.txt ${dest}:remote/path/
done

# 在不用 scp 的情况下 拷贝到多台
cat file.txt | tee >(ssh user@ip1.com "cat > file.txt") \
                   >(ssh user@ip2.com "cat > file.txt")

tar cz file1 file2 file3 | tee >(ssh user@ip1.com "tar xz") \
                               >( ... )
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
env $(cat .env | xargs) rails
```
