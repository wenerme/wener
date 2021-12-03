---
title: Linux Kernel
---

# Linux Kernel

- https://www.kernel.org/doc/man-pages/
- [Kernel wiki](https://wiki.kernel.org/)
- [Linux Kernel Hackers' Guide](http://www.tldp.org/LDP/khg/HyperNews/get/khg.html)
  - 讲的 Linux 1.0 结构
  - 非常简单通俗易懂
- [Linux Kernel Module Cheat](https://github.com/cirosantilli/linux-kernel-module-cheat)
- 参考
  - [现在的 Linux 内核和 Linux 2.6 的内核有多大区别？](https://www.zhihu.com/question/35484429/answer/62964898)
- 调度
  - SCHED_FIFO
  - SCHED_RR
  - SCHED_OTHER -> SCHED_NORMAL
  - SCHED_IDLE
  - SCHED_BATCH
  - SCHED_DEADLINE
  - `O(1)`
  - CFS
  - Fair Group Scheduling - 2.6.24 - 2008-01
  - RT Group Scheduling - 2.6.25 - 2008-04
  - CFS bandwidth control - 3.2 - 2012-01
  - Auto Group Scheduling - 2.6.38 - 2011-03
  - 基于调度域的负载均衡 - [Scheduling domains](http://lwn.net/Articles/80911/) - 2.6.7 - 2004-06
  - HRTICK - 2.6.25 - 2008-04
  - Automatic NUMA balancing - 3.8 - 2013-02
  - [Steps toward power-aware scheduling](https://lwn.net/Articles/655479/)
- 内存管理 - MM
  - Physical Address - DIMM - byte unit
  - Virtual Address - MMU
  - NUMA - Non-Uniform Memory Access
    - ZONE_DMA
    - ZONE_NORMAL
    - ZONE_HIGH
  - page - 4KB
  - page table - Virtual Address -> Physical Address
  - swap
  - PageCache Page - 预缓存 - 代码、系统文件
  - Anonymous Page - 进程栈、malloc
- 内存分配
  - [Buddy memory allocation](https://en.wikipedia.org/wiki/Buddy_memory_allocation)
  - SLAB - 2.0 - 1996
  - SLUB - 2.6.22 - 2007-07
  - SLOB - 2.6.16 - 2006-03
  - CMA - Continue Memory Allocation - 3.5 - 2012-07
- 内存去碎片化
  - Lumpy Reclaim - 2.6.23 引入(2007 年 7 月), 3.5 移除(2012 年 7 月)
  - Page Clustering by Page Mobility - 2.6.23 - 2007-07
  - Memory Compaction - 2.6.35 - 2010-08
- 页表管理
  - 四级页表 2.6.11 - 2005-03
  - Lazy-TLB flushing
- 页面回收
  - 页框替换算法(Page Frame Replacement Algorithm, PFRA)
  - 增强的 LRU 算法 (2.6 前引入, 具体时间难考)
  - active 与 inactive 链表拆分, 2.6.28(2008 年 12 月)
  - 再拆分出被锁页的链表, 2.6.28(2008 年 12 月)
  - 让代码文件缓存页多待一会, 2.6.31(2009 年 9 月发布)
  - 工作集大小的探测, 3.15(2014 年 6 月发布)
- 页面写回
  - 由全局的脏页门槛到每设备脏页门槛 2.6.24(2008 年 1 月发布)
  - 引入更具体扩展性的回写线程 2.6.32(2009 年 12 月发布)
  - 动态的脏页生成扼制和写回扼制算法 3.1(2011 年 11 月发布), 3.2(2012 年 1 月发布)
- 页面预读
  - 原始的预读方案
  - 按需预读(On-demand Readahead) 2.6.23(2007 年 10 月发布)
- 大内存页支持
  - HUGETLB 支持 (2.6 前引入)
  - 透明大页的支持 2.6.38(2011 年 3 月发布)
- 内存控制组(Memory Cgroup)支持
  - Memory Cgroup - 2.6.25(2008 年 4 月发布)
- 内存热插拔支持
  - 内存热插入支持 2.6.15(2006 年 1 月发布)
  - 初步的内存逻辑热拔除支持 2.6.24(2008 年 1 月发布)
  - 完善的内存逻辑热拔除支持 3.8(2013 年 2 月发布)
  - 物理热拔除的支持 3.9(2013 年 4 月支持)
- 超然内存(Transcendent Memory)支持
  - 前端接口之 CLEANCACHE 3.0(2011 年 7 月发布)
  - 前端接口之 FRONTSWAP 3.5(2012 年 7 月发布)
  - 后端之 ZCACHE (没能进入内核主线)
  - 后端之 ZRAM 3.14(2014 年 3 月发布)
  - 后端之 ZSWAP 3.11(2013 年 9 月发布)
- 非易失性内存 (NVDIMM, Non-Volatile DIMM) 支持
  - libnvdimm 4.2(2015 年 8 月 30 日发布)
  - DAX 4.0(2015 年 4 月发布)
- 内存管理调试支持
  - 页分配的调试支持 2.5(2003 年 7 月之后发布)
  - SLAB 子系统的调试支持
  - 错误注入机制 2.6.20(2007 年 2 月发布)
  - KMEMCHECK - 内存非法访问检测工具 2.6.31(2009 年 9 月发布)
  - KMEMLEAK - 内存泄漏检测工具 2.6.31(2009 年 9 月发布)
  - KASan - 内核地址净化器 4.0(2015 年 4 月发布)
- Misc
  - KSM - 内存去重 2.6.32(2009 年 12 月发布)
  - HWPoison - 内存页错误的处理 2.6.32(2009 年 12 月发布)

```bash
# module parameters
cat /proc/modules | cut -f 1 -d " " | while read module; do \
 echo "Module: $module"; \
 if [ -d "/sys/module/$module/parameters" ]; then \
  ls /sys/module/$module/parameters/ | while read parameter; do \
   echo -n "Parameter: $parameter --> "; \
   cat /sys/module/$module/parameters/$parameter; \
  done; \
 fi; \
 echo; \
done
```
<!--
```
# norandmaps: Don't use address space randomization. Equivalent to echo 0 > /proc/sys/kernel/randomize_va_space.
# printk.time=y: log in format: "[time ] msg" for all printk messages.
# nokaslr: https://unix.stackexchange.com/questions/397939/turning-off-kaslr-to-debug-linux-kernel-using-qemu-and-gdb
#   Turned on by default since v4.12
nokaslr norandmaps printk.devkmsg=on printk.time=y
```

https://en.wikipedia.org/wiki/Linux_kernel

System.map
https://en.wikipedia.org/wiki/System.map

https://en.wikipedia.org/wiki/Vmlinux

所有模块
find /lib/modules/\$(uname -r) -type f -name '\*.ko'

/lib/modules/\$(uname -r)/modules.dep
modules.dep.bin

depmod
生成 modules.dep 和 modules.dep.bin
depmod -av

已加载的
cat /proc/modules

lsmod | tail -n +2 | cut -f 1 -d ' ' | sort

内核内建模块
cat /lib/modules/\$(uname -r)/modules.builtin

blob kernel

http://files.kroah.com/lkn/lkn_pdf/ch09.pdf

params
https://wiki.archlinux.org/index.php/kernel_parameters
https://www.kernel.org/doc/html/latest/admin-guide/kernel-parameters.html

blkid -o export /dev/root

update-extlinux.conf

-->

## 参数

- [kernel-parameters.txt](https://www.kernel.org/doc/Documentation/admin-guide/kernel-parameters.txt)
- [Linux Kernel Boot Parameters](http://redsymbol.net/linux-kernel-boot-parameters/2.6.28/)

acpi Advanced Configuration and Power Interface
apic Advanced Programmable Interrupt Controller
apm Advanced Power Management

```
	console=	[KNL] Output console device and options.

		tty<n>	Use the virtual console device <n>.

		ttyS<n>[,options]
		ttyUSB0[,options]
			Use the specified serial port.  The options are of
			the form "bbbbpnf", where "bbbb" is the baud rate,
			"p" is parity ("n", "o", or "e"), "n" is number of
			bits, and "f" is flow control ("r" for RTS or
			omit it).  Default is "9600n8".

			See Documentation/admin-guide/serial-console.rst for more
			information.  See
			Documentation/networking/netconsole.txt for an
			alternative.

		uart[8250],io,<addr>[,options]
		uart[8250],mmio,<addr>[,options]
		uart[8250],mmio16,<addr>[,options]
		uart[8250],mmio32,<addr>[,options]
		uart[8250],0x<addr>[,options]
			Start an early, polled-mode console on the 8250/16550
			UART at the specified I/O port or MMIO address,
			switching to the matching ttyS device later.
			MMIO inter-register address stride is either 8-bit
			(mmio), 16-bit (mmio16), or 32-bit (mmio32).
			If none of [io|mmio|mmio16|mmio32], <addr> is assumed
			to be equivalent to 'mmio'. 'options' are specified in
			the same format described for ttyS above; if unspecified,
			the h/w is not re-initialized.

		hvc<n>	Use the hypervisor console device <n>. This is for
			both Xen and PowerPC hypervisors.

		If the device connected to the port is not a TTY but a braille
		device, prepend "brl," before the device type, for instance
			console=brl,ttyS0
		For now, only VisioBraille is supported.

dis_ucode_ldr	[X86] Disable the microcode loader.

edac_report=	[HW,EDAC] Control how to report EDAC event

init=		[KNL]
    Format: <full_path>
    Run specified binary instead of /sbin/init as init
    process.

initrd=		[BOOT] Specify the location of the initial ramdisk

ip=		[IP_PNP]
			See Documentation/filesystems/nfs/nfsroot.txt.

load_ramdisk=	[RAM] List of ramdisks to load from floppy
			See Documentation/admin-guide/blockdev/ramdisk.rst.

noinitrd	[RAM] Tells the kernel not to load any configured
			initial RAM disk.

nomodule	Disable module load

ro		[KNL] Mount root device read-only on boot

root=		[KNL] Root filesystem
			See name_to_dev_t comment in init/do_mounts.c.

rootdelay=	[KNL] Delay (in seconds) to pause before attempting to
			mount the root filesystem

rootflags=	[KNL] Set root filesystem mount option string

rootfstype=	[KNL] Set root filesystem type

rootwait	[KNL] Wait (indefinitely) for root device to show up.
    Useful for devices that are detected asynchronously
    (e.g. USB and MMC devices).

rw		[KNL] Mount root device read-write on boot

```

手动设置用于 Linux 引导的“nomodeset”内核引导行选项
https://www.dell.com/support/article/zh-hk/sln306327

https://itectec.com/ubuntu/ubuntu-what-do-the-nomodeset-quiet-and-splash-kernel-parameters-mean/

You have booted with nomodeset. This means your GPU drivers are DISABLED
Any video related functionality will be severely degraded, and you may not even be able tospend the system properly
Unless you actually understand what nomodeset does, you should reboot without enabling it

## 解压

```bash
curl -LOC- https://mirrors.aliyun.com/alpine/v3.12/releases/x86_64/netboot/vmlinuz-virt

# extract-vmlinux
# ===========
curl -LOC- https://raw.githubusercontent.com/torvalds/linux/master/scripts/extract-vmlinux
chmod +x extract-vmlinux
./extract-vmlinux $PWD/vmlinuz-virt > vmlinux-virt

# valid kernel
readelf -h ./vmlinux-virt

# bzImage 原始方法
# ==========
od -A d -t x1 vmlinuz-virt | grep '1f 8b 08 00'
# offset 0017328 + colume 1
dd if=vmlinuz-virt bs=1 skip=17329 | zcat > vmlinux-virt
```
