---
title: Alpine FAQ
id: alpine-faq
date: 2018-02-26
---

## 术语
* HWE Hardware Enablement 
  * https://askubuntu.com/questions/248914
* ECC - Error-correcting memory
* [EDAC](https://en.wikipedia.org/wiki/EDAC_(Linux)) - Error Detection and Correction
  * [EDAC Project](http://bluesmoke.sourceforge.net/)
  * [EDAC Device](https://www.kernel.org/doc/html/v4.19/driver-api/edac.html)

## apk 1 error
apk 操作时显示有错误, 例如 `1 error; 241 MiB in 67 packages`.

```bash
# 即可
apk fix
```

## ifupdown 包不会启动
* ifupdown 来自 debian - 虽然依赖 iproute2 但是不会使用
* busybox 的 ifup 会调用 ip li set eth0 up
* 3.10 是 0.7.x 版本的，下一个大版本应该可用

## 内核风格/kernel flavors
https://git.alpinelinux.org/cgit/aports/tree/main/linux-hardened/APKBUILD
https://git.alpinelinux.org/cgit/aports/tree/main/linux-vanilla

* 区别在于不同的内核编译参数和安全补丁
* hardened
  * 支持架构: x86_64, x86, armhf
  * 启用了内核安全模块
  * grsecurity
  * pax
  * 安装完成后 500m 左右, boot 20m 左右
    * 固件: 210m
    * 内核模块: 270m
* virthardened
  * 支持架构: x86_64, x86
  * 安全和 hardened 相同
  * 调整内核参数以适应虚拟化环境
  * 镜像更小, 更快, 没有默认驱动和固件
  * 安装完成后 100m 左右, boot 13m 左右
* vanilla
  * 支持架构: x86_64, x86, s390x, ppc64le, ppc, armhf, aarch64
  * 适用于调试
  * 适用于其他风格不支持的架构
  * 无安全部相关的补丁和内核配置
* virt
  * 支持架构: x86_64, x86
  * 适用于虚拟化环境


* virt
  * 电源管理
  * CPU 管理
  * PCI 控制器
  * 性能监控
  * 内存
  * 移除特殊硬件相关配置
    * 无线
    * 蓝牙
    * IRDA
    * NFC
    * SIP
    * I2C
    * 键盘
    * 鼠标
    * 触屏
    * 博通 SoC
    * 物理控制
      * 电源重置
    * 雷电
    * 安卓
  * 不会构建固件
  * 移除硬件相关驱动
  * 移除硬件相关兼容设置
  * 添加 XEN
  * 移除 JFFS, UBIFS


## virt vs standard

## [Firmware Bug]: TSC_DEADLINE disabled due to Errata: please update microcode to version: 0x52 (or later)

## [Firmware Bug]: the BIOS has corrupted hw-PMU resources (MSR 38d is 30)

## EDAC sbridge: Failed to register device with error -19.

## EDAC DEBUG: ie31200_check: MC0
* 内存问题，尝试更换内存。
* 如果是双通道，但是只有一根内存条，尝试补齐

## pstore: crypto_comp_decompress failed, ret = -22!
```
pstore: crypto_comp_decompress failed, ret = -22!
pstore: decompression failed: -22
```
* [fs/pstore/platform.c#L280](https://github.com/torvalds/linux/blob/bf929479893052b1c7bfe23a4e7a903643076350/fs/pstore/platform.c#L280)
* 与该目录相关 `/sys/fs/pstore/`
* 与升级内核有关
* 参考 [pstore: crypto_comp_decompress failed](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=902966)

```bash
# root 执行 - sudo 不会展开
rm /sys/fs/pstore/dmesg*
```

## AER: Corrected error received
```
pcieport 0000:00:1c.7: AER: Corrected error received: 0000:00:1c.7
pcieport 0000:00:1c.7: PCIe Bus Error: severity=Corrected, type=Physical Layer, (Recei
pcieport 0000:00:1c.7:   device [8086:a297] error status/mask=00000001/00002000
pcieport 0000:00:1c.7:    [ 0] RxErr                  (First)
```

* 内核参数 - 建议依次尝试
  * `pci=nomsi` - 关闭部分中断 - MSI=Message Signaled Interrupts - PCI_MSI 编译内核参数
  * `pci=noaer` - 关闭报错 - AER=Advanced Error Reporting - PCIEAER 编译内核参数
  * `pcie_aspm=off` - 关闭 PCIe 省电管理 - 可能会更耗电 - ASPM=Active State Power Management
* 参考
  * [PCIe Bus Error: severity=Corrected, type=Physical Layer, id=00e5(Receiver ID)](https://askubuntu.com/questions/863150)
    * 可能是由于 PCI 的额电源管理将链路设置为低电模式触发的异常
  * [PCIe Bus Error: severity=Corrected, type=Physical Layer, (Receiver ID)](https://bbs.archlinux.org/viewtopic.php?id=242182)
    * 可能是带宽问题
    * Corrected 消息不影响，链路层自动矫正。Uncorrected 有问题

### The NVM Checksum Is Not Valid
```
e1000e: Intel(R) PRO/1000 Network Driver - 3.2.6-k
e1000e: Copyright(c) 1999 - 2015 Intel Corporation.
e1000e 0000:00:1f.6: Interrupt Throttling Rate (ints/sec) set to dynamic conservative mode
e1000e 0000:00:1f.6: The NVM Checksum Is Not Valid
e1000e: probe of 0000:00:1f.6 failed with error -5
```


## microcode
* AlpineLinux 的 microcode 在 non-free 下，需要自己编译
* 编译完成可直接拷贝进行安装 `apk add --allow-untrusted intel-ucode-20180312-r0.apk`
* 然后需要修改 `/boot/extlinux.conf`
  * 如果想要 extlinux 能够自动检测，可参考 https://patchwork.alpinelinux.org/patch/3443/
* 这是我目前的调整，比描述的简单些
```bash
		if [ -f "/boot/intel-ucode.img" ]; then
			everbose "Found microcode for Intel CPUs: /boot/intel-ucode.img"
			echo "  INITRD intel-ucode.img,initramfs-$tag" >> $conf.new
		else
			echo "  INITRD initramfs-$tag" >> $conf.new
		fi
```
* 然后 `update-extlinux` 即可
* 可再次确认 `/boot/extlinux.conf` 中的 INITRD 有了 intel-ucode.img

```bash
# 启动后会看到 microcode 升级的信息
dmesg | grep microcode
```

例如

```
microcode: sig=0x906e9, pf=0x2, reversion=0x84
microcode: Microcode Update Driver: v2.2
```

## mount: mounting UUID=x-x-x-x on /sysroot failed: No such file or directory

* 可能系统还没发现设备就就行挂载了
  * 通常出现在使用 usb 启动的情况
  * 因为 rootdelay 这样的参数在 extlinux 挂载时还未生效，可能系统启动但设备还未发现
  * 尝试修改启动脚本，增加 sleep 10
  * 第一次出现时候可以考虑手动挂载
  * 也可以考虑多重启几次，有一定几率进入系统

```bash
mount UUID=x-x-x-x /sysroot
# 挂载完成后退出会继续启动
# exit
```

* 可能启动分区坏了 - 可以直接从现有的系统复制 boot 内容到启动分区。
  * 复制后切记修改 extlinux.conf 中的 UUID 喂正确的 rootfs。
  * 复制后记得检查 kernel 版本，确保被复制的存储上 /lib/modules 下有对应 kernel 版本的模块。

## sh: can't access tty; job control turned off
一般会伴随分区损坏出现。


## initramfs emergency recovery shell launched. Type 'exit' to continue boot
分区损坏后会进入急救模式。


## /dev/null/utmp: Not a directory
* [#3282](https://bugs.alpinelinux.org/issues/3282) - users: /dev/null/utmp: Not a directory
  * 执行 who, last, screen 时

## Password: chpasswd: PAM: Authentication failure
* 3.6+ BUG https://gitlab.alpinelinux.org/alpine/aports/issues/10209

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
