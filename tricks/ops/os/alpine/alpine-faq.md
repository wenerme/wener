---
title: Alpine FAQ
id: alpine-faq
date: 2018-02-26
---

## apk 1 error
apk 操作时显示有错误, 例如 `1 error; 241 MiB in 67 packages`.

```bash
# 即可
apk fix
```

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

多半是分区坏了，可以直接从现有的系统复制 boot 内容到启动分区。

* 复制后切记修改 extlinux.conf 中的 UUID 喂正确的 rootfs。
* 复制后记得检查 kernel 版本，确保被复制的存储上 /lib/modules 下有对应 kernel 版本的模块。

## sh: can't access tty; job control turned off
一般会伴随分区损坏出现。


## initramfs emergency recovery shell launched. Type 'exit' to continue boot
分区损坏后会进入急救模式。


## /dev/null/utmp: Not a directory
* [#3282](https://bugs.alpinelinux.org/issues/3282) - users: /dev/null/utmp: Not a directory
  * 执行 who, last, screen 时
