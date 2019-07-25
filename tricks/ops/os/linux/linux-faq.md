# FAQ


## halt vs poweroff vs shutdown
* halt
  * 终止所有进程并关闭 CPU
* poweroff
  * 与 halt 相似,但也会关闭 PC 自身.会发送 ACPI 命令到主板, PSU 然后切断电源
* shutdown -t now
  * 与 poweroff 相似,但会执行关机脚本
  * 最优雅的关机方式
  * 会先 `kill -15 `然后 `kill -9`
  * 现代的 `halt` 和 `reboot` 一般也会调用 shutdown


## 'RTLD_NEXT' undeclared
* gcc 添加 `-D_GNU_SOURCE`
* 因为不是标准的 POSIX 定义

## mmap: Operation not permitted
* 可能是由于内核开启了 `CONFIG_STRICT_DEVMEM` 导致, 出于安全考虑, 在用户空间不允进行超过 1MB 的物理内存操作
* http://blog.sina.com.cn/s/blog_6f5b220601012xbc.html
* 有可能是因为 mmap 包含了 `PROT_EXEC`, 在 PaX 下会失败

```bash
sysctl dev.mem.restricted
# /proc/sys/dev/mem/restricted

# https://stackoverflow.com/a/36507784/1870054
# 该操作会禁用很多 PaX 特性
# https://en.wikibooks.org/wiki/Grsecurity/Appendix/Grsecurity_and_PaX_Configuration_Options#Support_soft_mode
sysctl -w kernel.pax.softmode=1
```

## 查看内核配置
* 常见配置路径
  * `/boot/config`
  * `/boot/config-$(uname -r)`
  * `/proc/config.gz`
    * 需要加载模块

```bash
cat /proc/config.gz | gunzip > running.config
zcat /proc/config.gz > running.config

grep CONFIG_IKCONFIG running.config
```

## 没有 /proc/config.gz

```bash
modprobe configs
```

## 释放磁盘空间

rm 不一定会释放空间, 可以 cp /dev/null xx
lsof | grep deleted


https://stackoverflow.com/questions/332629/rm-not-freeing-diskspace
https://unix.stackexchange.com/questions/34140/tell-fs-to-free-space-from-deleted-files-now

https://serverfault.com/questions/232525/df-in-linux-not-showing-correct-free-space-after-file-removal/232526

ls -l /proc/*/fd/ | grep deleted
lsof +L1 

df -ah
du -sh

df -i


dumpe2fs /dev/sda1 | grep -i reserved


Most Linux filesystems reserve 5% space for use only the root user.

You can see this with e.g

dumpe2fs /dev/sda1 | grep -i reserved
You can change the reserved amount using :

tune2fs -m 0 /dev/sda1

Tracking down where disk space has gone on Linux?
https://unix.stackexchange.com/questions/125429/tracking-down-where-disk-space-has-gone-on-linux

https://github.com/moby/moby/issues/32420

https://unix.stackexchange.com/questions/125429/tracking-down-where-disk-space-has-gone-on-linux
