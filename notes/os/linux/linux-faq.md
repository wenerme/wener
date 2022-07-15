---
title: Linux FAQ
tags:
  - FAQ
---

# Linux FAQ

## kernel-ml vs kernel-lt

RHEL 内核 flavor

- kernel-ml - mainline
  - Linux 主线版本 - 更新，更新更快更多
- kernel-lt - long term
  - Linux 长期支持版本 - 更稳定，更新更少

## context switch

```bash
cat /proc/3736/status|grep ctxt

apk add sysstat
pidstat -w -l -p 3736
```

- https://man7.org/linux/man-pages/man1/pidstat.1.html

## hostname

```bash
# 主机名
hostname
hostname -s
cat /etc/hostname
sysctl -n kernel.hostname
cat /proc/sys/kernel/hostname

# 域名
# --fqdn/--long
hostname -f
sysctl -n kernel.domainname
cat /proc/sys/kernel/domainname

# 修改
hostname "wener-s1"
domainname "phy.wener.me"
# 相同
echo wener-s1 > /proc/sys/kernel/hostname
echo phy.wener.me > /proc/sys/kernel/domainname

# /etc/hosts
# 127.0.0.1 wener-s1.phy.wener.me wener-s1
# /etc/resolv.conf
# search phy.wener.me
```

- NIS 系统 - 不需要与 DNS 有关系，但也可以有关系
- FQDN 是辅助维护大批量的网络设备，一般需要配合内部 DNS 解析
- https://man7.org/linux/man-pages/man1/hostname.1.html
- https://www.kernel.org/doc/Documentation/sysctl/kernel.txt

## 重新扫描分区

```bash
partprobe
mdev -s

# 强制内核读取分区
hdparm -z /dev/sda

# 手动创建
mknod /dev/hdc1 b 22 1
# 验证可读
cat /dev/hdc1 > /dev/null

# 直接读取分区 - 挂载为 loop
losetup /dev/loop0 /dev/hdc -o $((63 * 512))
mount /dev/loop0 /mnt/hdc1
# 查看
fdisk -l -u /dev/hdc
```

## The NVM Checksum Is Not Valid

```
e1000e: Intel(R) PRO/1000 Network Driver - 3.2.6-k
e1000e: Copyright(c) 1999 - 2015 Intel Corporation.
e1000e 0000:00:1f.6: Interrupt Throttling Rate (ints/sec) set to dynamic conservative mode
e1000e 0000:00:1f.6: The NVM Checksum Is Not Valid
e1000e: probe of 0000:00:1f.6 failed with error -5
```

## PCIe Bus Error: severity=Corrected, type=Physical Layer, id=00e5(Receiver ID)

启动参数添加 `pcie_aspm=off`

## halt vs poweroff vs shutdown

- halt
  - 终止所有进程并关闭 CPU
- poweroff
  - 与 halt 相似,但也会关闭 PC 自身.会发送 ACPI 命令到主板, PSU 然后切断电源
- shutdown -t now
  - 与 poweroff 相似,但会执行关机脚本
  - 最优雅的关机方式
  - 会先 `kill -15 `然后 `kill -9`
  - 现代的 `halt` 和 `reboot` 一般也会调用 shutdown

## 'RTLD_NEXT' undeclared

- gcc 添加 `-D_GNU_SOURCE`
- 因为不是标准的 POSIX 定义

## mmap: Operation not permitted

- 可能是由于内核开启了 `CONFIG_STRICT_DEVMEM` 导致, 出于安全考虑, 在用户空间不允进行超过 1MB 的物理内存操作
- http://blog.sina.com.cn/s/blog_6f5b220601012xbc.html
- 有可能是因为 mmap 包含了 `PROT_EXEC`, 在 PaX 下会失败

```bash
sysctl dev.mem.restricted
# /proc/sys/dev/mem/restricted

# https://stackoverflow.com/a/36507784/1870054
# 该操作会禁用很多 PaX 特性
# https://en.wikibooks.org/wiki/Grsecurity/Appendix/Grsecurity_and_PaX_Configuration_Options#Support_soft_mode
sysctl -w kernel.pax.softmode=1
```

## 查看内核配置

- 常见配置路径
  - `/boot/config`
  - `/boot/config-$(uname -r)`
  - `/proc/config.gz`
    - 需要加载模块

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

### limit

- soft limits <= hard limit

```bash
ulimit -a  # 所有
ulimit -Hn # hard
ulimit -Sn # soft

# sysctl -w fs.file-max=
cat /proc/sys/fs/file-max
```

## usb tethering

```
Authentication Suites (2) : PSK unknown (6)
```

# TBD

https://stackoverflow.com/questions/332629/rm-not-freeing-diskspace
https://unix.stackexchange.com/questions/34140/tell-fs-to-free-space-from-deleted-files-now

https://serverfault.com/questions/232525/df-in-linux-not-showing-correct-free-space-after-file-removal/232526

ls -l /proc/\*/fd/ | grep deleted
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
