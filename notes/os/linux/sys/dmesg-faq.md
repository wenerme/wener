---
title: Linux Kernel 日志常见问题
tags:
  - FAQ
---

# Linux Kernel 日志常见问题

## 修改 dmesg 大小

- 内核参数 `log_buf_len=n[KMG]`
- 默认 2^CONFIG_LOG_BUF_SHIFT
  - CONFIG_LOG_CPU_MAX_BUF_SHIFT
- [admin-guide/kernel-parameters.txt](https://www.kernel.org/doc/Documentation/admin-guide/kernel-parameters.txt)
- https://elinux.org/Debugging_by_printing

```bash
# CONFIG_LOG_BUF_SHIFT=14 -> 16K
cat /boot/config-lts | grep LOG_BUF_SHIFT
```

## TCP: too many orphaned sockets

一般内存满了导致

```bash
# x x pages
# pages*4k 实际内存使用
cat /proc/sys/net/ipv4/tcp_mem
cat /proc/sys/net/ipv4/tcp_max_orphans
```

```
/proc/sys/net/ipv4/tcp_max_orphans

Maximal number of TCP sockets not attached to any user file handle,
held by system. If this number is exceeded orphaned connections are
reset immediately and warning is printed. This limit exists only to
prevent simple DoS attacks, you _must_ not rely on this or lower the
limit artificially, but rather increase it (probably, after increasing
installed memory), if network conditions require more than default value,
and tune network services to linger and kill such states more aggressively.

Let me remind you again: each orphan eats up to  64K of unswappable memory.
```

- http://lartc.org/howto/index.html

# EXT4-fs error (device sde2): comm containerd: bad entry in directory: inode out of bounds

```
EXT4-fs error (device sde2): htree_dirblock_to_tree:1106: inode #399580: block 1582282: comm containerd: bad entry in directory: inode out of bounds - offset=140, inode=4593891, rec_len=20, size=4096 fake=0
```

```
traps: tmux: server[5422] general protection fault ip:7f3fbcbb80be sp:7fff1eeff140 error:0 in ld-musl-x86_64.so.1[7f3fbcba6000+4c000]
traps: apk[21618] trap stack segment ip:7f862d16cd85 sp:7ffdf388efb0 error:0 in libapk.so.2.14.0[7f862d16b000+1a000]
```

## HP HPSA Driver

## EDAC MC0: 1 UE UE overwrote CE on any memory

- MC0 为 #0 内存条
- CE - Correctable Errors
- UE - Uncorrectable Errors
- EDAC - Error Detection and Correction - 内存错误检测和矫正
- csrowX - Chip-Select Row
- chX - Channel table

内存异常信息

```pre ansiup
[0;33mEDAC MC0[0;1m: 1 UE ie31200 UE on mc#0csrow#0channel#1 (csrow:0 channel:1 page:0x0 offset:0x0 grain:8)[0m
[0;33mEDAC MC0[0;1m: 1 UE UE overwrote CE on any memory ( page:0x0 offset:0x0 grain:8)
```

- /sys/devices/system/edac
  - mc/ - memory controller system
  - pci/

```bash
lsmod | grep edac
```

```
ie31200_edac           16384  0
```

**关闭 Log 异常信息**

```bash
echo 0 > /sys/module/edac_core/parameters/edac_mc_log_ce
```

```bash
# pci_parity_count
echo "1" > /sys/devices/system/edac/pci/check_pci_parity
```

- kernel [edac.txt](https://mjmwired.net/kernel/Documentation/edac.txt)
- [driver-api/edac](https://www.kernel.org/doc/html/latest/driver-api/edac.html)
- [EDAC Wiki](https://buttersideup.com/mediawiki/index.php/Main_Page)
- [grondo/edac-utils](https://github.com/grondo/edac-utils)

## Invalid ELF header magic

```
Invalid ELF header magic: != \x7fELF
```

## 磁盘损坏

```
sd 0:0:8:0: [sdh] tag#383 UNKNOWN(0x2003) Result: hostbyte=0x00 driverbyte=0x08 cmd_age=0s
sd 0:0:8:0: [sdh] tag#383 Sense Key : 0x4 [current]
sd 0:0:8:0: [sdh] tag#383 ASC=0x15 ASCQ=0x1
sd 0:0:8:0: [sdh] tag#383 CDB: opcode=0x2a 2a 00 3b aa 6b c0 00 00 a8 00
blk_update_request: I/O error, dev sdh, sector 1001024448 op 0x1:(WRITE) flags 0x700 phys_seg 17 prio class 0
zio pool=data vdev=/dev/disk/by-id/scsi-35000c5008953f263-part1 error=5 type=2 offset=512523468800 size=86016 flags=40080c80
hpsa 0000:03:00.0: scsi 0:0:8:0: resetting physical  Direct-Access     SEAGATE  ST600MP0005      PHYS DRV SSDSmartPathCap- En- Exp=1
```

## Write Protect is on

- USB Flash Driver 已损坏，进入写保护模式
- 如果是正常的磁盘，可以尝试关闭 `hdparm -r0 /dev/sdc`

```pre ansiup
[0;33musb 2-3[0m: new SuperSpeed Gen 1 USB device number 11 using xhci_hcd
[0;33musb 2-3[0m: New USB device found, idVendor=0781, idProduct=5583, bcdDevice= 1.00
[0;33musb 2-3[0m: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[0;33musb 2-3[0m: Product: Ultra Fit
[0;33musb 2-3[0m: Manufacturer: SanDisk
[0;33musb 2-3[0m: SerialNumber: 4C530001180206120545
[0;33musb-storage 2-3:1.0[0m: USB Mass Storage device detected
[0;33mscsi host7[0m: usb-storage 2-3:1.0
[0;33mscsi 7:0:0:0[0m: Direct-Access     SanDisk  Ultra Fit        1.00 PQ: 0 ANSI: 6
[0;33msd 7:0:0:0[0m: [sdc] 60063744 512-byte logical blocks: (30.8 GB/28.6 GiB)
[0;33msd 7:0:0:0[0m: [sdc] Write Protect is on
[0;33msd 7:0:0:0[0m: [sdc] Mode Sense: 43 00 80 00
[0;33msd 7:0:0:0[0m: [sdc] Write cache: disabled, read cache: enabled, doesn't support DPO or FUA
[0;33m sdc[0m: sdc1 sdc2 sdc3
[0;33msd 7:0:0:0[0m: [sdc] Attached SCSI removable disk
```

## Write cache: disabled, read cache: enabled, doesn't support DPO or FUA

- DPO - Disable Page Out
  - caching hint that indicates the data referenced by the command is not likely to be accessed again and therefore is not a good candidate to keep or maintain within cache.
- FUA - Force Unit Access
  - caching hint that indicates the data should be referenced directly from the media of the device. That is cache should be bypassed for this command.
- 参考
  - [What do "doesn't support DPO or FUA" and other disk cache messages mean ?](https://access.redhat.com/solutions/1527943)

## rcu_sched detected stalls on CPUs/tasks

```pre ansiup
[0;33mrcu[0;31m: INFO: rcu_sched detected stalls on CPUs/tasks:[0m
[0;33mrcu[0;31m: 	1-....: (1 GPs behind) idle=ad1/1/0x4000000000000000 softirq=22550431/22550433 fqs=2[0m
[0;1m	(detected by 3, t=18024 jiffies, g=33604573, q=182)[0m
[0mSending NMI from CPU 3 to CPUs 1:
[0;1mNMI backtrace for cpu 1[0m
[0;33mCPU[0;1m: 1 PID: 2394 Comm: z_wr_iss Tainted: P        W  O      5.15.16-0-lts #1-Alpine[0m
[0;33mHardware name[0;1m: To Be Filled By O.E.M. To Be Filled By O.E.M./E3C232D2I, BIOS P2.20 07/20/2017[0m
[0;33mRIP[0;1m: 0010:raidz_copy_abd_cb+0x20/0x90 [zfs][0m
[0;33mCode[0;1m: 39 f0 72 c3 31 c0 c3 0f 1f 00 0f 1f 44 00 00 48 89 d1 48 c1 e9 05 74 75 48 83 ee 80 48 83 ef 80 31 c0 48 8d 56 80 c5 fd 6f 02 <c5> fd 6f 4a 20 c5 fd 6f 52 40 c5 fd 6f 5a 60 48 8d 57 80 c5 fd 7f[0m
[0;33mRSP[0;1m: 0000:ffffb4168094fab8 EFLAGS: 00000083[0m
[0;33mRAX[0;1m: 0000000000002368 RBX: 0000000000056000 RCX: 0000000000002b00[0m
[0;33mRDX[0;1m: ffffb416de69dd00 RSI: ffffb416de69dd80 RDI: ffffb416b0a93d80[0m
[0;33mRBP[0;1m: ffffb4168094fb28 R08: 0000000000056000 R09: ffffffffc1b646d0[0m
[0;33mR10[0;1m: 0000000000000002 R11: 0000000000056000 R12: ffffb4168094faf8[0m
[0;33mR13[0;1m: 0000000000056000 R14: ffff953bf2c8fb60 R15: 0000000000000000[0m
[0;33mFS[0;1m:  0000000000000000(0000) GS:ffff95410fc80000(0000) knlGS:0000000000000000[0m
[0;33mCS[0;1m:  0010 DS: 0000 ES: 0000 CR0: 0000000080050033[0m
[0;33mCR2[0;1m: 000000c002aff000 CR3: 0000000301026001 CR4: 00000000003706e0[0m
[0;33mDR0[0;1m: 0000000000000000 DR1: 0000000000000000 DR2: 0000000000000000[0m
[0;33mDR3[0;1m: 0000000000000000 DR6: 00000000fffe0ff0 DR7: 0000000000000400[0m
[0;1mCall Trace:[0m
[0;1m <TASK>[0m
[0;1m abd_iterate_func2+0x1ec/0x340 [zfs][0m
[0;1m ? raidz_zero_abd_cb+0x60/0x60 [zfs][0m
[0;1m avx2_gen_p+0x40/0x90 [zfs][0m
[0;1m vdev_raidz_math_generate+0x4b/0x70 [zfs][0m
[0;1m vdev_raidz_generate_parity_row+0x30/0x440 [zfs][0m
[0;1m ? vdev_raidz_map_alloc+0x2f4/0x390 [zfs][0m
[0;1m vdev_raidz_io_start+0x1fb/0x320 [zfs][0m
[0;1m zio_vdev_io_start+0x109/0x350 [zfs][0m
[0;1m zio_nowait+0xc5/0x1b0 [zfs][0m
[0;1m vdev_mirror_io_start+0xa2/0x250 [zfs][0m
[0;1m zio_vdev_io_start+0x2d3/0x350 [zfs][0m
[0;1m zio_execute+0x83/0x120 [zfs][0m
[0;1m taskq_thread+0x2d0/0x500 [spl][0m
[0;1m ? wake_up_q+0x90/0x90[0m
[0;1m ? zio_gang_tree_free+0x60/0x60 [zfs][0m
[0;1m ? taskq_thread_spawn+0x50/0x50 [spl][0m
[0;1m kthread+0x127/0x150[0m
[0;1m ? set_kthread_struct+0x40/0x40[0m
[0;1m ret_from_fork+0x22/0x30[0m
[0;1m </TASK>[0m
[0;33mrcu[0;31m: rcu_sched kthread timer wakeup didn't happen for 2506 jiffies! g33604573 f0x0 RCU_GP_WAIT_FQS(5) ->state=0x402[0m
[0;33mrcu[0;31m: 	Possible timer handling issue on cpu=2 timer-softirq=4398823[0m
[0;33mrcu[0;31m: rcu_sched kthread starved for 2508 jiffies! g33604573 f0x0 RCU_GP_WAIT_FQS(5) ->state=0x402 ->cpu=2[0m
[0;33mrcu[0;31m: 	Unless rcu_sched kthread gets sufficient CPU time, OOM is now expected behavior.[0m
[0;33mrcu[0;31m: RCU grace-period kthread stack dump:[0m
[0;33mtask:rcu_sched       state:I stack[0m:    0 pid:   14 ppid:     2 flags:0x00004000
[0mCall Trace:
[0m <TASK>
[0m __schedule+0x31f/0x14e0
[0m ? lock_timer_base+0x61/0x80
[0m ? __mod_timer+0x170/0x3e0
[0m schedule+0x44/0xa0
[0m schedule_timeout+0x95/0x140
[0m ? __bpf_trace_tick_stop+0x10/0x10
[0m rcu_gp_fqs_loop+0x100/0x320
[0m rcu_gp_kthread+0xab/0x140
[0m ? rcu_gp_init+0x4a0/0x4a0
[0m kthread+0x127/0x150
[0m ? set_kthread_struct+0x40/0x40
[0m ret_from_fork+0x22/0x30
[0m </TASK>
```

## ACPI Error: No handler for Region POWR

> 添加 acpi_ipmi 后异常停止

```bash
# 尝试添加 module
modprobe ipmi_si
modprobe acpi_ipmi
```

```
ACPI Error: No handler for Region [POWR] (00000000a03df149) [IPMI] (20190816/evregion-127)
ACPI Error: Region IPMI (ID=7) has no handler (20190816/exfldio-261)
ACPI Error: Aborting method _SB.PMI0._PMM due to previous error (AE_NOT_EXIST) (20190816/psparse-529)
ACPI Error: AE_NOT_EXIST, Evaluating _PMM (20190816/power_meter-325)
```

## L1TF CPU bug present and SMT on, data leak possible

- 只是警告，CPU 有 Hyper-Threading/SMT 特性
- 可以在 BIOS 关闭 SMT - 但不建议
- Linux 默认开启了 mitigations=on - 可以考虑关闭以提高性能
  - 前提是运行的 **可信** 的 VM

```
L1TF CPU bug present and SMT on, data leak possible. See CVE-2018-3646 and https://www.kernel.org/doc/html/latest/admin-guide/hw-vuln/l1tf.html for details.
```

## ext4 filesystem being mounted at /boot supports timestamps until 2038 (0x7fffffff)

- 提高 ext4 inode size 以克服 2038y 问题
- inode size 128 -> inode size 256
  - 初始化分区时 `mkfs.ext4 -I 256 /dev/sda1`

```bash
dev=$(findmnt /boot -no SOURCE)
tune2fs -l $dev | grep "Inode size:"
# Inode size:           128
```

## device reported invalid CHS sector

```
ata1.00: failed command: WRITE FPDMA QUEUED
ata1.00: cmd 61/f8:f8:d0:01:72/05:00:18:00:00/40 tag 31 ncq dma 782336 out
         res 40/00:00:00:00:00/00:00:00:00:00/00 Emask 0x4 (timeout)
ata1.00: status: { DRDY }
ata1: hard resetting link
ata1: SATA link up 6.0 Gbps (SStatus 133 SControl 300)
ata1.00: configured for UDMA/133
ata1.00: device reported invalid CHS sector 0
ata1.00: device reported invalid CHS sector 0
ata1.00: device reported invalid CHS sector 0
ata1.00: device reported invalid CHS sector 0
ata1.00: device reported invalid CHS sector 0
ata1.00: device reported invalid CHS sector 0
ata1.00: device reported invalid CHS sector 0
ata1.00: device reported invalid CHS sector 0
ata1.00: device reported invalid CHS sector 0
ata1.00: device reported invalid CHS sector 0
sd 0:0:0:0: [sda] tag#18 UNKNOWN(0x2003) Result: hostbyte=0x00 driverbyte=0x06 cmd_age=94s
sd 0:0:0:0: [sda] tag#18 CDB: opcode=0x2a 2a 00 18 6e 11 a8 00 05 c8 00
blk_update_request: I/O error, dev sda, sector 409866664 op 0x1:(WRITE) flags 0x0 phys_seg 94 prio class 0
```

磁盘异常并伴随 fs 错误。

```bash
smartctl -a /dev/sda
```

## FS-Cache: Duplicate cookie detected

- NFS 引起
- 影响不大
- 参考
  - https://bugzilla.kernel.org/show_bug.cgi?id=200145
  - https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=ec0328e46d6e5d0f17372eb90ab8e333c2ac7ca9
  - https://access.redhat.com/solutions/4644911
  - RH KB4644911

## ACPI Error: SMBus/IPMI/GenericSerialBus write requires Buffer of length

- 可能和 ACPI 电源监控有关
- 如果是 HP 服务器可能是由于 HP ACPI 不符合标准导致
  - https://partner-bugzilla.redhat.com/show_bug.cgi?id=616449#c3

```
ACPI Error: SMBus/IPMI/GenericSerialBus write requires Buffer of length 66, found length 32 (20180810/exfield-393)
ACPI Error: Method parse/execution failed _SB.PMI0._PMM, AE_AML_BUFFER_LIMIT (20180810/psparse-516)
ACPI Error: AE_AML_BUFFER_LIMIT, Evaluating _PMM (20180810/power_meter-338)
```

```bash
# 如果使用了 lm_sensors
# 此时的电源显示应该为 0
sensors
```

配置关闭电源监控

**/etc/sensors3.conf**

```
chip "power_meter-acpi-0"
  ignore power1
```

```bash
# 尝试关闭电源监控
echo "blacklist acpi_power_meter" >> /etc/modprobe.d/hwmon.conf
```

## ext4 filesystem being remounted at /newroot/run/redis supports timestamps until 2038 (0x7fffffff)

- 警告 ext4 时间支持问题

## FW version command failed -5

```
mei 0000:00:16.0-56213584-9a29-4916-badf-0fb7ed682aeb: Could not read FW version
mei 0000:00:16.0-56213584-9a29-4916-badf-0fb7ed682aeb: FW version command failed -5
```

## EDAC DEBUG: ie31200_check: MC0

- 内存问题，尝试更换内存。
- 如果是双通道，但是只有一根内存条，尝试补齐

## pstore: crypto_comp_decompress failed, ret = -22!

```
pstore: crypto_comp_decompress failed, ret = -22!
pstore: decompression failed: -22
```

- [fs/pstore/platform.c#L280](https://github.com/torvalds/linux/blob/bf929479893052b1c7bfe23a4e7a903643076350/fs/pstore/platform.c#L280)
- 与该目录相关 `/sys/fs/pstore/`
- 与升级内核有关
- 参考 [pstore: crypto_comp_decompress failed](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=902966)

```bash
# root 执行 - sudo 不会展开
rm /sys/fs/pstore/dmesg*
```

## pcieport 0000:00:1c.7: AER: Corrected error received: 0000:00:1c.7

- 内核参数 - 建议依次尝试
  - `pci=nomsi` - 关闭部分中断 - MSI=Message Signaled Interrupts - PCI_MSI 编译内核参数
  - `pci=noaer` - 关闭报错 - AER=Advanced Error Reporting - PCIEAER 编译内核参数
  - `pcie_aspm=off` - 关闭 PCIe 省电管理 - 可能会更耗电 - ASPM=Active State Power Management
- 参考
  - [PCIe Bus Error: severity=Corrected, type=Physical Layer, id=00e5(Receiver ID)](https://askubuntu.com/questions/863150)
    - 可能是由于 PCI 的额电源管理将链路设置为低电模式触发的异常
  - [PCIe Bus Error: severity=Corrected, type=Physical Layer, (Receiver ID)](https://bbs.archlinux.org/viewtopic.php?id=242182)
    - 可能是带宽问题
    - Corrected 消息不影响，链路层自动矫正。Uncorrected 有问题

**定位问题**

```
[519708.849337] pcieport 0000:00:1c.7: AER: Corrected error received: 0000:00:1c.7
[519708.849346] pcieport 0000:00:1c.7: AER: PCIe Bus Error: severity=Corrected, type=Physical Layer, (Receiver ID)
[519708.849349] pcieport 0000:00:1c.7: AER:   device [8086:a297] error status/mask=00000001/00002000
[519708.849352] pcieport 0000:00:1c.7: AER:    [ 0] RxErr
```

```bash
lspci -vs 0000:00:1c.7
```

```
00:1c.7 PCI bridge: Intel Corporation 200 Series PCH PCI Express Root Port #8 (rev f0) (prog-if 00 [Normal decode])
	Flags: bus master, fast devsel, latency 0, IRQ 124
	Bus: primary=00, secondary=03, subordinate=03, sec-latency=0
	I/O behind bridge: [disabled]
	Memory behind bridge: df100000-df1fffff [size=1M]
	Prefetchable memory behind bridge: [disabled]
	Capabilities: <access denied>
	Kernel driver in use: pcieport
```

### perf: interrupt took too long

- Linux [perf](https://perf.wiki.kernel.org/index.php/Main_Page) 日志
- 对系统没有影响，可以理解为在自动调整处理频率

```
[109932.035738] perf: interrupt took too long (2511 > 2500), lowering kernel.perf_event_max_sample_rate to 79500
[110540.025443] perf: interrupt took too long (3146 > 3138), lowering kernel.perf_event_max_sample_rate to 63300
[111374.568374] perf: interrupt took too long (3935 > 3932), lowering kernel.perf_event_max_sample_rate to 50700
[112979.009891] perf: interrupt took too long (4927 > 4918), lowering kernel.perf_event_max_sample_rate to 40500
[121152.410414] perf: interrupt took too long (6159 > 6158), lowering kernel.perf_event_max_sample_rate to 32400
```

## ata1.00: exception Emask 0x0 SAct 0x80800000 SErr 0x0 action 0x6

硬盘异常

```
ata1.00: exception Emask 0x0 SAct 0x1e020 SErr 0x0 action 0x6
ata1.00: irq_stat 0x40000008
ata1.00: failed command: READ FPDMA QUEUED
ata1.00: cmd 60/88:28:78:2d:07/00:00:3f:00:00/40 tag 5 ncq dma 69632 in
         res 41/84:88:c0:2d:07/00:00:3f:00:00/00 Emask 0x410 (ATA bus error) <F>
ata1.00: status: { DRDY ERR }
ata1.00: error: { ICRC ABRT }
ata1: hard resetting link
ata1: SATA link up 1.5 Gbps (SStatus 113 SControl 310)
ata1.00: configured for UDMA/33
sd 0:0:0:0: [sda] tag#5 UNKNOWN(0x2003) Result: hostbyte=0x00 driverbyte=0x08
sd 0:0:0:0: [sda] tag#5 Sense Key : 0xb [current]
sd 0:0:0:0: [sda] tag#5 ASC=0x47 ASCQ=0x0
sd 0:0:0:0: [sda] tag#5 CDB: opcode=0x28 28 00 3f 07 2d 78 00 00 88 00
blk_update_request: I/O error, dev sda, sector 1057435000 op 0x0:(READ) flags 0x80700 phys_seg 16 prio class 0
ata1: EH complete
```

## Longhorn iSCSI 异常后日志

```dmesg
ata1.00: exception Emask 0x0 SAct 0x140180 SErr 0x0 action 0x6
ata1.00: irq_stat 0x40000008
ata1.00: failed command: READ FPDMA QUEUED
ata1.00: cmd 60/20:40:00:37:c7/00:00:47:00:00/40 tag 8 ncq dma 16384 in
         res 41/84:20:00:37:c7/00:00:47:00:00/00 Emask 0x410 (ATA bus error) <F>
ata1.00: status: { DRDY ERR }
ata1.00: error: { ICRC ABRT }
ata1: hard resetting link
ata1: SATA link up 6.0 Gbps (SStatus 133 SControl 300)
ata1.00: configured for UDMA/133
sd 0:0:0:0: [sda] tag#8 UNKNOWN(0x2003) Result: hostbyte=0x00 driverbyte=0x08
sd 0:0:0:0: [sda] tag#8 Sense Key : 0xb [current]
sd 0:0:0:0: [sda] tag#8 ASC=0x47 ASCQ=0x0
sd 0:0:0:0: [sda] tag#8 CDB: opcode=0x28 28 00 47 c7 37 00 00 00 20 00
blk_update_request: I/O error, dev sda, sector 1204238080 op 0x0:(READ) flags 0x80700 phys_seg 4 prio class 0
ata1: EH complete
scsi host4: iSCSI Initiator over TCP/IP
scsi 4:0:0:0: RAID              IET      Controller       0001 PQ: 0 ANSI: 5
scsi 4:0:0:1: Direct-Access     IET      VIRTUAL-DISK     0001 PQ: 0 ANSI: 5
sd 4:0:0:1: Power-on or device reset occurred
sd 4:0:0:1: [sdb] 41943040 512-byte logical blocks: (21.5 GB/20.0 GiB)
sd 4:0:0:1: [sdb] Write Protect is off
sd 4:0:0:1: [sdb] Mode Sense: 69 00 10 08
sd 4:0:0:1: [sdb] Write cache: enabled, read cache: enabled, supports DPO and FUA
sd 4:0:0:1: [sdb] Attached SCSI disk
 session2: session recovery timed out after 120 secs
sd 5:0:0:1: rejecting I/O to offline device
blk_update_request: I/O error, dev sdc, sector 0 op 0x1:(WRITE) flags 0x800 phys_seg 0 prio class 0
sd 5:0:0:1: rejecting I/O to offline device
blk_update_request: I/O error, dev sdc, sector 0 op 0x1:(WRITE) flags 0x800 phys_seg 0 prio class 0
sd 5:0:0:1: rejecting I/O to offline device
blk_update_request: I/O error, dev sdc, sector 0 op 0x1:(WRITE) flags 0x800 phys_seg 0 prio class 0
sd 5:0:0:1: rejecting I/O to offline device
blk_update_request: I/O error, dev sdc, sector 0 op 0x1:(WRITE) flags 0x800 phys_seg 0 prio class 0
sd 5:0:0:1: rejecting I/O to offline device
blk_update_request: I/O error, dev sdc, sector 21241888 op 0x1:(WRITE) flags 0x20800 phys_seg 1 prio class 0
buffer_io_error: 24 callbacks suppressed
Buffer I/O error on dev sdc, logical block 2655236, lost sync page write
JBD2: Error -5 detected when updating journal superblock for sdc-8.
Aborting journal on device sdc-8.
sd 5:0:0:1: rejecting I/O to offline device
blk_update_request: I/O error, dev sdc, sector 21241888 op 0x1:(WRITE) flags 0x20800 phys_seg 1 prio class 0
Buffer I/O error on dev sdc, logical block 2655236, lost sync page write
JBD2: Error -5 detected when updating journal superblock for sdc-8.
sd 5:0:0:1: rejecting I/O to offline device
blk_update_request: I/O error, dev sdc, sector 0 op 0x1:(WRITE) flags 0x20800 phys_seg 1 prio class 0
Buffer I/O error on dev sdc, logical block 0, lost sync page write
EXT4-fs: 24 callbacks suppressed
EXT4-fs (sdc): I/O error while writing superblock
```

## Unable to access opcode bytes at RIP 0xa906

```
apk[5410]: segfault at a930 ip 000000000000a930 sp 00007fff2eb32cd8 error 14 in apk[55df206ac000+4000]
Code: Unable to access opcode bytes at RIP 0xa906.
```

## BTRFS critical (device dm-2): corrupt leaf

只能离线 btrfs check，访问局部文件出现错误，但是整体文件系统还是可以访问的。

- RAID 5

```
md2: [Self Heal] Retry sector [3253080] round [1/3] choose d-disk
md2: [Self Heal] Retry sector [3253080] round [1/3] finished: get same result, retry next round
md2: [Self Heal] Retry sector [3253080] round [2/3] start: sh-sector [1626584], d-disk [2:sdj3], p-disk [0:sdh3], q-disk [1:sdi3]
md2: [Self Heal] Retry sector [3253080] round [2/3] choose p-disk
md2: [Self Heal] Retry sector [3253080] round [2/3] finished: get same result, retry next round
md2: [Self Heal] Retry sector [3253080] round [3/3] start: sh-sector [1626584], d-disk [2:sdj3], p-disk [0:sdh3], q-disk [1:sdi3]
md2: [Self Heal] Retry sector [3253080] round [3/3] choose q-disk
md2: [Self Heal] Retry sector [3253080] round [3/3] finished: get same result, give up
BTRFS warning (device dm-2): corrupt leaf fixed, bad key order, block=570261504, root=264, slot=161
BTRFS critical (device dm-2): corrupt leaf: root=264 block=570261504 slot=161 ino=69311, name hash mismatch with key, have 0x000000001dc4dc92 expect 0x000000001e00be13
BTRFS error (device dm-2): cannot fix 570261504, record in meta_err
```

## watchdog: BUG: soft lockup

HAProxy crash

**Mon May  1 07:02:03 2023**

```
[754398.348700] watchdog: BUG: soft lockup - CPU#0 stuck for 24s! [haproxy:1889]
[754398.688670] Modules linked in: sch_fq tcp_bbr ipv6 af_packet tun crct10dif_pclmul ghash_clmulni_intel mousedev aesni_intel crypto_simd cryptd evdev psmouse qemu_fw_cfg button virtio_net net_failover failover virtio_scsi crc32_pclmul bochs drm_vram_helper drm_ttm_helper ttm simpledrm drm_kms_helper cfbfillrect syscopyarea cfbimgblt sysfillrect sysimgblt fb_sys_fops cfbcopyarea drm fb fbdev i2c_core drm_panel_orientation_quirks firmware_class loop ext4 crc32c_generic crc32c_intel crc16 mbcache jbd2 usb_storage usbcore usb_common sd_mod t10_pi
[754398.688753] CPU: 0 PID: 1889 Comm: haproxy Not tainted 5.15.103-0-virt #1-Alpine
[754398.688761] Hardware name: Linode Compute Instance, BIOS Not Specified
[754398.688763] RIP: 0033:0x7f12519916b7
[754398.688774] Code: 0e 8b 71 18 85 f6 75 0b 8b 49 1c 85 c9 75 04 48 83 c2 03 48 83 fa 0d 0f 43 c5 48 63 d0 48 63 e8 49 8b 5c d7 50 48 85 db 74 2d <8b> 43 18 89 c2 f7 da 21 c2 74 22 29 d0 89 43 18 89 d0 f7 d8 21 d0
[754398.688777] RSP: 002b:00007ffe2c3201e0 EFLAGS: 00000202
[754398.688779] RAX: 000000000000000e RBX: 0000561d34aaf540 RCX: 0000000000000018
[754398.688781] RDX: 0000000000000019 RSI: 00007f12519f53c0 RDI: 000000000000017d
[754398.688782] RBP: 000000000000000e R08: 00007f1250c9c010 R09: 00007f1250dc2c78
[754398.688783] R10: 00007f12512bc0e0 R11: 0000000000000000 R12: 000000000000017a
[754398.688784] R13: 0000000000000153 R14: 00007f1251a03fdc R15: 00007f1251a01b00
[754398.688785] FS:  00007f1251466880 GS:  0000000000000000
```

**Sat May 13 04:16:27 2023**

```
[1781262.070997] watchdog: BUG: soft lockup - CPU#0 stuck for 29s! [kworker/u2:2:7241]
[1781272.465968] Modules linked in: sch_fq tcp_bbr ipv6 af_packet tun crct10dif_pclmul ghash_clmulni_intel mousedev aesni_intel crypto_simd cryptd evdev psmouse qemu_fw_cfg button virtio_net net_failover failover virtio_scsi crc32_pclmul bochs drm_vram_helper drm_ttm_helper ttm simpledrm drm_kms_helper cfbfillrect syscopyarea cfbimgblt sysfillrect sysimgblt fb_sys_fops cfbcopyarea drm fb fbdev i2c_core drm_panel_orientation_quirks firmware_class loop ext4 crc32c_generic crc32c_intel crc16 mbcache jbd2 usb_storage usbcore usb_common sd_mod t10_pi
[1781272.753556] CPU: 0 PID: 7241 Comm: kworker/u2:2 Tainted: G             L    5.15.103-0-virt #1-Alpine
[1781272.753561] Hardware name: Linode Compute Instance, BIOS Not Specified
[1781272.753574] Workqueue:  0x0 (events_unbound)
[1781272.753580] RIP: 0010:_raw_spin_unlock_irqrestore+0x21/0x30
[1781272.756309] Code: 88 cc cc cc cc cc cc cc cc c6 07 00 0f 1f 40 00 f7 c6 00 02 00 00 75 0b 31 c0 31 f6 31 ff e9 36 8b 20 00 fb 66 0f 1f 44 00 00 <31> c0 31 f6 31 ff e9 24 8b 20 00 0f 1f 40 00 8b 07 a9 ff 01 00 00
[1781272.756324] RSP: 0018:ffffaf59c057bd60 EFLAGS: 00000206
[1781272.756327] RAX: 0000000000000000 RBX: ffff8ab7c1173d00 RCX: 0000000000000000
[1781272.756329] RDX: 0000000000000000 RSI: 0000000000000283 RDI: ffff8ab7c1174534
[1781272.756330] RBP: ffff8ab7fec2bb00 R08: 0000000000000000 R09: 0000000000000000
[1781272.756332] R10: 0000000000000000 R11: 0000000000000000 R12: 0000000000000000
[1781272.757089] R13: 0000000000000283 R14: ffff8ab7c1174534 R15: 0000000000000000
[1781272.757093] FS:  0000000000000000(0000) GS:ffff8ab7fec00000(0000) knlGS:0000000000000000
[1781272.757095] CS:  0010 DS: 0000 ES: 0000 CR0: 0000000080050033
[1781272.757097] CR2: 00007fffc2444e18 CR3: 000000000442a000 CR4: 0000000000150eb0
[1781272.757101] Call Trace:
[1781272.757107]  <TASK>
[1781272.757109]  try_to_wake_up+0x1ea/0x450
[1781272.757128]  ? process_one_work+0x360/0x360
[1781272.757131]  __kthread_create_on_node+0xda/0x1b0
[1781272.757138]  kthread_create_on_node+0x44/0x70
[1781272.757141]  create_worker+0xef/0x1e0
[1781272.757145]  worker_thread+0x2d9/0x3c0
[1781272.757147]  ? process_one_work+0x360/0x360
[1781272.757149]  kthread+0x113/0x130
[1781272.757151]  ? set_kthread_struct+0x50/0x50
[1781272.757154]  ret_from_fork+0x22/0x30
[1781272.757161]  </TASK>
```

# TODO

```
mei_hdcp 0000:00:16.0-b638ab7e-94e2-4ea2-a552-d1c54b627000: bound 0000:00:02.0 (ops i915_hdcp_component_ops [i915])
snd_hda_codec_hdmi hdaudioC0D2: Monitor plugged-in, Failed to power up codec ret=[-13]
```

## mlx4_core Internal error detected

```
[  149.148339] mlx4_core 0000:82:00.0: Internal error detected:
[  149.148368] mlx4_core 0000:82:00.0:   buf[00]: ffffffff
[  149.148375] mlx4_core 0000:82:00.0:   buf[01]: ffffffff
[  149.148398] mlx4_core 0000:82:00.0:   buf[02]: ffffffff
[  149.148421] mlx4_core 0000:82:00.0:   buf[03]: ffffffff
[  149.148427] mlx4_core 0000:82:00.0:   buf[04]: ffffffff
[  149.148433] mlx4_core 0000:82:00.0:   buf[05]: ffffffff
[  149.148478] mlx4_core 0000:82:00.0:   buf[06]: ffffffff
[  149.148483] mlx4_core 0000:82:00.0:   buf[07]: ffffffff
[  149.148489] mlx4_core 0000:82:00.0:   buf[08]: ffffffff
[  149.148494] mlx4_core 0000:82:00.0:   buf[09]: ffffffff
[  149.148500] mlx4_core 0000:82:00.0:   buf[0a]: ffffffff
[  149.148523] mlx4_core 0000:82:00.0:   buf[0b]: ffffffff
[  149.148546] mlx4_core 0000:82:00.0:   buf[0c]: ffffffff
[  149.148568] mlx4_core 0000:82:00.0:   buf[0d]: ffffffff
[  149.148574] mlx4_core 0000:82:00.0:   buf[0e]: ffffffff
[  149.148579] mlx4_core 0000:82:00.0:   buf[0f]: ffffffff
[  149.148603] mlx4_core 0000:82:00.0: device is going to be reset
[  149.148607] mlx4_core 0000:82:00.0: crdump: FW doesn't support health buffer access, skipping
```

## [Firmware Bug]: TSC_DEADLINE disabled due to Errata: please update microcode to version: 0x52 (or later)

## [Firmware Bug]: the BIOS has corrupted hw-PMU resources (MSR 38d is 30)

## EDAC sbridge: Failed to register device with error -19.

### The NVM Checksum Is Not Valid

```
e1000e: Intel(R) PRO/1000 Network Driver - 3.2.6-k
e1000e: Copyright(c) 1999 - 2015 Intel Corporation.
e1000e 0000:00:1f.6: Interrupt Throttling Rate (ints/sec) set to dynamic conservative mode
e1000e 0000:00:1f.6: The NVM Checksum Is Not Valid
e1000e: probe of 0000:00:1f.6 failed with error -5
```

## lpc_ich: Resource conflict(s) found affecting gpio_ich

```
[    5.019593] ACPI Warning: SystemIO range 0x0000000000001C00-0x0000000000001C2F conflicts with OpRegion 0x0000000000001C00-0x0000000000001FFF (\GPR) (20190816/utaddress-204)
[    5.019594] ACPI: If an ACPI driver is available for this device, you should use it instead of the native driver


[    4.297023] wmi_bus wmi_bus-PNP0C14:00: WQBC data block query control method not found

[    0.172443] pmd_set_huge: Cannot satisfy [mem 0xf8000000-0xf8200000] with a huge-page mapping due to MTRR override.

[    0.172443] ENERGY_PERF_BIAS: Set to 'normal', was 'performance'
```

```
[    0.165743] MDS: Mitigation: Clear CPU buffers
[    0.165864] Freeing SMP alternatives memory: 28K
[    0.166679] smpboot: CPU0: Intel(R) Xeon(R) CPU E3-1265L v3 @ 2.50GHz (family: 0x6, model: 0x3c, stepping: 0x3)
[    0.166754] Performance Events: PEBS fmt2+, Haswell events, 16-deep LBR, full-width counters, Intel PMU driver.
[    0.166766] ... version:                3
[    0.166767] ... bit width:              48
[    0.166767] ... generic registers:      4
[    0.166768] ... value mask:             0000ffffffffffff
[    0.166768] ... max period:             00007fffffffffff
[    0.166768] ... fixed-purpose events:   3
[    0.166769] ... event mask:             000000070000000f
[    0.166792] rcu: Hierarchical SRCU implementation.
[    0.167184] NMI watchdog: Enabled. Permanently consumes one hw-PMU counter.
[    0.167241] smp: Bringing up secondary CPUs ...
[    0.167292] x86: Booting SMP configuration:
[    0.167292] .... node  #0, CPUs:      #1 #2 #3 #4
[    0.167683] MDS CPU bug present and SMT on, data leak possible. See https://www.kernel.org/doc/html/latest/admin-guide/hw-vuln/mds.html for more details.
[    0.167683]  #5 #6 #7
[    0.169202] smp: Brought up 1 node, 8 CPUs
[    0.169202] smpboot: Max logical packages: 1
[    0.169202] ----------------
[    0.169202] | NMI testsuite:
[    0.169202] --------------------
[    0.169202]   remote IPI:  ok  |
[    0.169202]    local IPI:  ok  |
[    0.169202] --------------------
[    0.169202] Good, all   2 testcases passed! |
[    0.169202] ---------------------------------
[    0.169202] smpboot: Total of 8 processors activated (39924.80 BogoMIPS)
```

```
Buffer I/O error on dev sdb, logical block 2655236, lost sync page write
JBD2: Error -5 detected when updating journal superblock for sdb-8.
Aborting journal on device sdb-8.
Buffer I/O error on dev sdb, logical block 2655236, lost sync page write
JBD2: Error -5 detected when updating journal superblock for sdb-8.
sd 3:0:0:1: [sdc] Synchronizing SCSI cache
```
