---
title: limit
---

# LIMIT

- /etc/security/limits.conf - 全局配置
- /etc/security/limits.d/ - 通常用于配置单个进程

:::tip

- open files 默认 1024/4096 - 对于服务端应用来说太小了

:::

```bash
# 其他进程的 limits
cat /proc/1/limits

# 修改其他线程
prlimit --pid $(pidof prometheus) --nofile=65535:65535
```

| type                 | unit      | flag | value     | flavor |
| -------------------- | --------- | ---- | --------- | ------ |
| core file size       | blocks    | -c   | 0         |
| data seg size        | kbytes    | -d   | unlimited |
| file size            | blocks    | -f   | unlimited |
| pending signals      |           | -i   | 63510     | linux  |
| max locked memory    | kbytes    | -l   | 64        |
| max memory size      | kbytes    | -m   | unlimited |
| open files           |           | -n   | 1024      |
| pipe size            | 512 bytes | -p   | 8         |
| POSIX message queues | bytes     | -q   | 819200    | linux  |
| real-time priority   |           | -r   | 0         | linux  |
| stack size           | kbytes    | -s   | 8192      |
| cpu time             | seconds   | -t   | unlimited |
| max user processes   |           | -u   | 63510     |        |
| virtual memory       | kbytes    | -v   | unlimited |
| file locks           |           | -x   | unlimited | linux  |

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
