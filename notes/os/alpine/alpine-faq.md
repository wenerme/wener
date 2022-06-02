---
title: Alpine FAQ
tags:
  - FAQ
---

## 术语

- HWE Hardware Enablement
  - https://askubuntu.com/questions/248914
- ECC - Error-correcting memory
- [EDAC](<https://en.wikipedia.org/wiki/EDAC_(Linux)>) - Error Detection and Correction
  - [EDAC Project](http://bluesmoke.sourceforge.net/)
  - [EDAC Device](https://www.kernel.org/doc/html/v4.19/driver-api/edac.html)

## apk 1 error

apk 操作时显示有错误, 例如 `1 error; 241 MiB in 67 packages`.

```bash
# 即可
apk fix
```

## ifupdown 包不会启动

- ifupdown 来自 debian - 虽然依赖 iproute2 但是不会使用
- busybox 的 ifup 会调用 ip li set eth0 up
- 3.10 是 0.7.x 版本的，下一个大版本应该可用

## 没有提示登陆

- 可能是 tty 不对
- 尝试修改 `/etc/inittab` 里的 `ttyS0::respawn:/sbin/getty -L ttyS0 115200 vt100`
- qemu aarch64 使用的 ttyAMA0

## Login incorrect - 没有询问密码

- 可能 root 关闭了 serial console 登陆
- 允许的 tty `/etc/securetty`
- 如果使用的 ttyAMA0 可以添加

## process '/sbin/getty -L ttyAMA0 115200 vt100' (pid 1929) exited. Scheduling for restart.

## getty: console: TIOCSCTTY: Operation not permitted

## 内核风格/kernel flavors

https://git.alpinelinux.org/cgit/aports/tree/main/linux-hardened/APKBUILD
https://git.alpinelinux.org/cgit/aports/tree/main/linux-vanilla

- 区别在于不同的内核编译参数和安全补丁
- hardened < 3.10
  - 支持架构: x86_64, x86, armhf
  - 启用了内核安全模块
  - grsecurity
  - pax
  - 安装完成后 500m 左右, boot 20m 左右
    - 固件: 210m
    - 内核模块: 270m
- virthardened < 3.10
  - 支持架构: x86_64, x86
  - 安全和 hardened 相同
  - 调整内核参数以适应虚拟化环境
  - 镜像更小, 更快, 没有默认驱动和固件
  - 安装完成后 100m 左右, boot 13m 左右
- vanilla < 3.10
  - 支持架构: x86_64, x86, s390x, ppc64le, ppc, armhf, aarch64
  - 适用于调试
  - 适用于其他风格不支持的架构
  - 无安全部相关的补丁和内核配置
- virt
  - 支持架构: x86_64, x86
  - 适用于虚拟化环境
- lts
  - LTS 版本的 Linux 内核
- standard - 打包包含更多内容
  - 电源管理
  - CPU 管理
  - PCI 控制器
  - 性能监控
  - 内存
  - 移除特殊硬件相关配置
    - 无线
    - 蓝牙
    - IRDA
    - NFC
    - SIP
    - I2C
    - 键盘
    - 鼠标
    - 触屏
    - 博通 SoC
    - 物理控制
      - 电源重置
    - 雷电
    - 安卓
  - 不会构建固件
  - 移除硬件相关驱动
  - 移除硬件相关兼容设置
  - 添加 XEN
  - 移除 JFFS, UBIFS

## rc-update: failed to add service `loadkmap' to runlevel `boot': No such file or directory

- 确保 `/etc/init.d/loadkmap` 存在
- 确保 `/etc/runlevels/boot/` 目录存在
- chroot 添加 boot runlevel 有问题
- 使用 ln - `ln -s /etc/init.d/$svc /etc/runlevels/boot`

## virt vs standard

## microcode

- AlpineLinux 的 microcode 在 non-free 下，需要自己编译
- 编译完成可直接拷贝进行安装 `apk add --allow-untrusted intel-ucode-20180312-r0.apk`
- 然后需要修改 `/boot/extlinux.conf`
  - 如果想要 extlinux 能够自动检测，可参考 https://patchwork.alpinelinux.org/patch/3443/
- 这是我目前的调整，比描述的简单些

```bash
		if [ -f "/boot/intel-ucode.img" ]; then
			everbose "Found microcode for Intel CPUs: /boot/intel-ucode.img"
			echo "  INITRD intel-ucode.img,initramfs-$tag" >> $conf.new
		else
			echo "  INITRD initramfs-$tag" >> $conf.new
		fi
```

- 然后 `update-extlinux` 即可
- 可再次确认 `/boot/extlinux.conf` 中的 INITRD 有了 intel-ucode.img

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

- 可能系统还没发现设备就就行挂载了
  - 通常出现在使用 usb 启动的情况
  - 因为 rootdelay 这样的参数在 extlinux 挂载时还未生效，可能系统启动但设备还未发现
  - 尝试修改启动脚本，增加 sleep 10
    - https://github.com/alpinelinux/mkinitfs/blob/master/initramfs-init.in#L474
  - 第一次出现时候可以考虑手动挂载
  - 也可以考虑多重启几次，有一定几率进入系统

```bash
mount UUID=x-x-x-x /sysroot
# 挂载完成后退出会继续启动
# exit
```

- 可能启动分区坏了 - 可以直接从现有的系统复制 boot 内容到启动分区。
  - 复制后切记修改 extlinux.conf 中的 UUID 喂正确的 rootfs。
  - 复制后记得检查 kernel 版本，确保被复制的存储上 /lib/modules 下有对应 kernel 版本的模块。

## sh: can't access tty; job control turned off

一般会伴随分区损坏出现。

## initramfs emergency recovery shell launched. Type 'exit' to continue boot

分区损坏后会进入急救模式。

## /dev/null/utmp: Not a directory

- [#3282](https://bugs.alpinelinux.org/issues/3282) - users: /dev/null/utmp: Not a directory
  - 执行 who, last, screen 时
- 3.16 包含 utmp

## Password: chpasswd: PAM: Authentication failure

- 3.6+ BUG https://gitlab.alpinelinux.org/alpine/aports/issues/10209

## dmesg: read kernel buffer failed: Operation not permitted

3.14 内核设置了 `CONFIG_SECURITY_DMESG_RESTRICT=y`

可以关闭

```bash
sudo sysctl kernel.dmesg_restrict=0
```

## mirrors

- https://mirrors.alpinelinux.org

## 避免 udhcp 修改 DNS

```bash
mkdir -p /etc/udhcpc
echo 'RESOLV_CONF=no' > /etc/udhcpc/udhcpc.conf
```

## alpine musl performance

- musl malloc 性能弱于 glibc malloc
- [maillist answer](https://lists.alpinelinux.org/~alpine/users/%3C6df8863e77b970b466dbfc9a3a5c2bcec3199f48.camel%40aquilenet.fr%3E#%3C4dcedd5d-e2ce-e8e-e231-874997bbe9f6@dereferenced.org%3E)
- 参考
  - https://superuser.com/a/1234279/242730
  - https://www.linkedin.com/pulse/testing-alternative-c-memory-allocators-pt-2-musl-mystery-gomes/

## apk 从 edge 仓库安装

```bash
apk add tailscale -X https://mirrors.sjtug.sjtu.edu.cn/alpine/edge/community
```
