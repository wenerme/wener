# Linux Kernel

## Tips
* [Kernel wiki](https://wiki.kernel.org/)
* [Linux Kernel Hackers' Guide](http://www.tldp.org/LDP/khg/HyperNews/get/khg.html)
  * 讲的 Linux 1.0 结构
  * 非常简单通俗易懂
* [Linux Kernel Module Cheat](https://github.com/cirosantilli/linux-kernel-module-cheat)


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
find /lib/modules/$(uname -r) -type f -name '*.ko'

/lib/modules/$(uname -r)/modules.dep
modules.dep.bin

depmod
生成 modules.dep 和 modules.dep.bin
depmod -av

已加载的
cat /proc/modules

lsmod | tail -n +2 | cut -f 1 -d ' ' | sort

内核内建模块
cat /lib/modules/$(uname -r)/modules.builtin

blob kernel


http://files.kroah.com/lkn/lkn_pdf/ch09.pdf

params
https://wiki.archlinux.org/index.php/kernel_parameters
https://www.kernel.org/doc/html/latest/admin-guide/kernel-parameters.html

blkid -o export /dev/root

update-extlinux.conf

## 参数
* [kernel-parameters.txt](https://www.kernel.org/doc/Documentation/admin-guide/kernel-parameters.txt)
* [Linux Kernel Boot Parameters](http://redsymbol.net/linux-kernel-boot-parameters/2.6.28/)

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
