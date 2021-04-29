---
id: dmesg-faq
title: Linux Kernel 日志常见问题
---

# Linux Kernel 日志常见问题

## ACPI Error: No handler for Region [POWR]

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

## Write cache: disabled, read cache: enabled, doesn't support DPO or FUA

- DPO - Disable Page Out
  - caching hint that indicates the data referenced by the command is not likely to be accessed again and therefore is not a good candidate to keep or maintain within cache.
- FUA - Force Unit Access
  - caching hint that indicates the data should be referenced directly from the media of the device. That is cache should be bypassed for this command.
- 参考
  - [What do "doesn't support DPO or FUA" and other disk cache messages mean ?](https://access.redhat.com/solutions/1527943)

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

# TODO

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

## ext4 filesystem being mounted at /boot supports timestamps until 2038 (0x7fffffff)

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
