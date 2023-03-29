---
title: limits
---

# LIMIT

- **linux-pam** 提供
  - /etc/pam.d/su
  - `session required pam_limits.so`
- /etc/security/limits.conf - 全局配置
- /etc/security/limits.d/ - 通常用于配置单个进程
- 参考
  - [limits.conf.5](https://www.man7.org/linux/man-pages/man5/limits.conf.5.html)

:::tip

- limits 针对每个进程生效 - 进程可修改 soft 值，但小于 hard 值
- open files 默认 1024/4096 - 对于服务端应用来说太小了

:::

```bash
# 查看其他进程的 limits
cat /proc/1/limits

# 修改已运行进程
# util-linux-2.21
prlimit --pid $(pidof prometheus) --nofile=65535:65535

cat /proc/sys/fs/file-max # 最大 fd 19778411
cat /proc/sys/fs/nr_open  # 1048576 - 1024*1024 - nofile hard limit 最大值
cat /proc/sys/fs/file-nr  # 已分配 0 最大

# 19778411
sysctl fs.file-max
# sysctl -w fs.file-max=19778411
```

| conf/item    | type                        | unit         | flag | value     | flavor         |
| ------------ | --------------------------- | ------------ | ---- | --------- | -------------- |
|              | real-time non-blocking time | microseconds | -R   | unlimited |
| core         | core file size              | blocks       | -c   | 0         |
| data         | data seg size               | kbytes       | -d   | unlimited |
| nice         | scheduling priority         |              | -e   | 0         |
| fsize        | file size                   | blocks       | -f   | unlimited |
| sigpending   | pending signals             |              | -i   | 63510     | linux          |
| memlock      | max locked memory           | kbytes       | -l   | 64        |
|              | max memory size             | kbytes       | -m   | unlimited |
| nofile       | open files                  |              | -n   | 1024      |
|              | pipe size                   | 512 bytes    | -p   | 8         |
| msgqueue     | POSIX message queues        | bytes        | -q   | 819200    | linux          |
| rtprio       | real-time priority          |              | -r   | 0         | linux          |
| stack        | stack size                  | kbytes       | -s   | 8192      |
|              | cpu time                    | seconds      | -t   | unlimited |
| nproc        | max user processes          |              | -u   | 63510     |                |
|              | virtual memory              | kbytes       | -v   | unlimited |
| locks        | file locks                  |              | -x   | unlimited | linux          |
| maxlogins    | logins for user             |
| maxsyslogins | all logins on system        |
| priority     |
| rss          |                             |              |      |           | linux < 2.4.30 |
| as           | address space limit         | kbytes       |

**/proc/1/limits**

```
Limit                     Soft Limit           Hard Limit           Units
Max cpu time              unlimited            unlimited            seconds
Max file size             unlimited            unlimited            bytes
Max data size             unlimited            unlimited            bytes
Max stack size            8388608              unlimited            bytes
Max core file size        0                    unlimited            bytes
Max resident set          unlimited            unlimited            bytes
Max processes             30464                30464                processes
Max open files            1024                 4096                 files
Max locked memory         65536                65536                bytes
Max address space         unlimited            unlimited            bytes
Max file locks            unlimited            unlimited            locks
Max pending signals       30464                30464                signals
Max msgqueue size         819200               819200               bytes
Max nice priority         0                    0
Max realtime priority     0                    0
Max realtime timeout      unlimited            unlimited            us
```

## limits.conf

```
<domain><type><item><value>
```

```pre title="limits.conf"
*               soft    core            0
*               hard    nofile          512
@student        hard    nproc           20
@faculty        soft    nproc           20
@faculty        hard    nproc           50
ftp             hard    nproc           0
@student        -       maxlogins       4
:123            hard    cpu             5000
@500:           soft    cpu             10000
600:700         hard    locks           10
```

- domain
  - username
  - @group
  - `*` - 默认
  - `%` - maxlogins
  - `<min_uid>:<max_uid>`
  - `@<min_gid>:<max_gid>`
  - `%:<gid>`
- type
  - hard
  - soft
  - `-` - soft+hard
- value
  - -1, unlimited, infinity - 无限制

## 建议

```txt title="/etc/security/limits.d/default.conf"
* hard nofile 65536
* soft nofile 4096
```

```txt title="kubernetes-nobody.conf"
nobody soft nofile 40960
```

## 统计

```bash
# nproc
ps h -Led -o user | sort | uniq -c | sort -n
```

## SSH limits 不生效

**sshd_config**

```
UsePrivilegeSeparation no
```

或

```
UsePAM yes
```

## open files

- 1073741816
- 1048576
