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

## Why AlpineLinux

small footprint, non-systemd, fast enough, good community, sane defaults.

阿里云、腾讯云、物理服务器、虚拟机、容器都是用的 alpinelinux

1. 环境都一样，使用各方面熟悉，熟练
2. 小/快 - 阿里云 ECS 只需要上传一个 几十 MB 的镜像即可，从 0 安装只需要 3 分钟
3. 简单 - 可以由内而外的了解所有 alpine 细节，对于 debian 和 centos 我都做不到，因为太复杂
4. 跟上时代 - 内核 一般是最近的 lts，能快速利用上新的内核特性，比如现在 linux 内核支持 io_uring, ntfs
5. 快速更新 - 安全问题响应非常快 - 因为使用面非常广
6. 衍生业务集成系统 - 系统预装一些软件和服务 - 例如: k3sos

**不适用场景**

1. 机器学习 - ubuntu 是最好的 - 最新 Linux 开始要集成 Navdia 驱动，情况会有所好转
2. 商务用桌面系统 - 默认 xface - _生态_ 和体验没有 ubuntu 好
3. 定制化嵌入式设备 - alpine 支持的 arch 远没有 debian 的多，如果 arch 支持可以考虑 alpine

## 升级注意事项

- 注意用的镜像是否同步 - 否则可能导致安装异常
  - tuna 目前是最好的
- 避免跨版本升级
- OpenSSL version mismatch

## apk opening from cache No such file or directory

## 历史

alpine 早期思想来自于 FreeBSD

- /etc/periodic
- https://apk-tools.sourceforge.net
  - 第一版 apk-tools 基于 FreeBSD 的 pkg_add
  - 2005-06-13 第一次提交

## GPU

- Nvidia 未提供 musl 版本的驱动
- https://forums.developer.nvidia.com/t/219586

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

## 内核风格 - kernel flavors - lts vs virt {#flavors}

- 区别
  - 内核编译参数
  - OS 默认 module
  - 固件
- virt
  - 适用于虚拟化环境
  - 默认开启 virtio
  - 很少 linux-firmware - 因此很小
- lts
  - LTS 版本的 Linux 内核
  - 正常硬件环境
  - 完整 linux-firmware
- ~~hardened < 3.10~~
  - 支持架构: x86_64, x86, armhf
  - 启用了内核安全模块
  - grsecurity
  - pax
  - 安装完成后 500m 左右, boot 20m 左右
    - 固件: 210m
    - 内核模块: 270m
- ~~virthardened < 3.10~~
  - 支持架构: x86_64, x86
  - 安全和 hardened 相同
  - 调整内核参数以适应虚拟化环境
  - 镜像更小, 更快, 没有默认驱动和固件
  - 安装完成后 100m 左右, boot 13m 左右
- ~~vanilla < 3.10~~ -> lts
  - 支持架构: x86_64, x86, s390x, ppc64le, ppc, armhf, aarch64
  - 适用于调试
  - 适用于其他风格不支持的架构
  - 无安全部相关的补丁和内核配置
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

---

- https://git.alpinelinux.org/aports/tree/main/linux-lts
- ~~https://git.alpinelinux.org/cgit/aports/tree/main/linux-hardened~~
- ~~https://git.alpinelinux.org/cgit/aports/tree/main/linux-vanilla~~

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

```bash
apk add utmps
service utmpd start
rc-update add utmpd boot
```

## Password: chpasswd: PAM: Authentication failure

- 3.6+ BUG https://gitlab.alpinelinux.org/alpine/aports/issues/10209

## dmesg: read kernel buffer failed: Operation not permitted

3.14 内核设置了 `CONFIG_SECURITY_DMESG_RESTRICT=y`

可以关闭

```bash
sudo sysctl kernel.dmesg_restrict=0
```

## dmesg 保留上次

- /etc/init.d/bootmisc
  - previous_dmesg=yes 时会 mv /var/log/dmesg /var/log/dmesg.old
  - 在 /etc/conf.d/bootmisc 配置

```bash
echo previous_dmesg=yes | tee -a /etc/conf.d/bootmisc
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

## alpine glibc compat

- libc6-compat gcompat

## apk 从 edge 仓库安装

```bash
apk add tailscale -X https://mirrors.sjtug.sjtu.edu.cn/alpine/edge/community
```

## ca-certificates.crt does not contain exactly one certificate or CRL: skipping

```bash
sudo update-ca-certificates # 更新 CA 时出现

mkdir /usr/local/share/ca-certificates/extra
```

## SSL routines:tls_process_server_certificate:certificate verify failed:ssl/statem/statem_clnt.c:1919

```bash
# 1. 确认系统时间
date
chronyc tracking    # 查看当前状态
chronyc sources     # 查看同步源
chronyc -a makestep # 主动同步

# 2.
openssl s_client -connect wener.me:443 # 测试证书是否正确
```

## 镜像

```bash
echo "https://mirrors.tuna.tsinghua.edu.cn/alpine/v$(sed -n 's/\.\d\+$//p' /etc/alpine-release)/main
https://mirrors.tuna.tsinghua.edu.cn/alpine/v$(sed -n 's/\.\d\+$//p' /etc/alpine-release)/community" > /etc/apk/repositories
```

## grub netboot

**lts**

```bash
curl -k -f -# https://mirrors.tuna.tsinghua.edu.cn/alpine/latest-stable/releases/x86_64/netboot/vmlinuz-lts -o /boot/vmlinuz-netboot
curl -k -f -# https://mirrors.tuna.tsinghua.edu.cn/alpine/latest-stable/releases/x86_64/netboot/initramfs-lts -o /boot/initramfs-netboot
```

```bash title="/etc/grub.d/40_netboot"
#!/bin/sh
exec tail -n +3 \$0

menuentry 'Alpine' {
    linux /boot/vmlinuz-netboot alpine_repo="https://mirrors.tuna.tsinghua.edu.cn/alpine/latest-stable/main" modloop="https://mirrors.tuna.tsinghua.edu.cn/alpine/latest-stable/releases/x86_64/netboot/modloop-lts" modules="loop,squashfs" initrd="initramfs-netboot" console="tty0" ssh_key="https://github.com/wenerme.keys"
    initrd /boot/initramfs-netboot
}
```

**virt**

```bash
curl -k -f -# https://mirrors.tuna.tsinghua.edu.cn/alpine/latest-stable/releases/x86_64/netboot/vmlinuz-virt -o /boot/vmlinuz-netboot
curl -k -f -# https://mirrors.tuna.tsinghua.edu.cn/alpine/latest-stable/releases/x86_64/netboot/initramfs-virt -o /boot/initramfs-netboot
```

```bash title="/etc/grub.d/40_netboot"
#!/bin/sh
exec tail -n +3 \$0

menuentry 'Alpine' {
    linux /boot/vmlinuz-netboot alpine_repo="https://mirrors.tuna.tsinghua.edu.cn/alpine/latest-stable/main" modloop="https://mirrors.tuna.tsinghua.edu.cn/alpine/latest-stable/releases/x86_64/netboot/modloop-virt" modules="loop,squashfs" initrd="initramfs-netboot" console="tty0" ssh_key="https://github.com/wenerme.keys"
    initrd /boot/initramfs-netboot
}
```

- 注意修改 ssh_key="https://github.com/wenerme.keys"
- https://wiki.alpinelinux.org/wiki/PXE_boot
- https://wiki.alpinelinux.org/wiki/Netboot_Alpine_Linux_using_iPXE
- https://github.com/52fancy/NetInstallAlpine/blob/main/alpine.sh

## 8AB0D52247F0000:error:0A000086:SSL routines:tls_post_process_server_certificate:certificate verify failed:ssl/statem/statem_clnt.c:1889:

```bash
# 确保时间正确
setup-ntp chrony

# 确保有 ca
apk add \
  --no-cache \
  --repository http://mirrors.tuna.tsinghua.edu.cn/alpine/latest-stable/main/ \
  ca-certificates

# 能通
openssl s_client -connect google.com:443
```

## apk Permission denied

检查网络，通常是 下载失败

```bash
apk update
```

## apk-new

- apk 升级如果检测到本地修改，则会创建 .apk-new 文件
- --clean-protected 不创建 .apk-new 文件

```bash
find /etc -name '*.apk-new'

# rebase
mv /etc/conf.d/k3s{.apk-new,}
```

## ping: permission denied (are you root?)

```bash
# 推荐
apk add iputils
realpath $(which ping) # /bin/ping
ping 1.1.1.1

# 原因
realpath $(which ping) # /bin/busybox
# ping 需要 suid bit
# chmod u+s /bin/ping # 不建议给 busybox 太高的权限
# setcap cap_net_raw+p $(which ping) # 可以使用 cap 方式
getcap $(which ping)

stat /bin/busybox # 0755
stat /bin/ping    # 4755 - with suid
```

- https://github.com/iputils/iputils
- https://gitlab.alpinelinux.org/alpine/aports/-/tree/master/main/iputils

## mdev: unknown user/group 'root:uucp' on line 54

```bash
getent group uucp
id uucp
# ttyS[0-9]*	root:uucp 0660
cat /etc/mdev.conf | grep uucp

# 如果没修改过 mdef.conf, 直接使用新版本覆盖
mv /etc/mdev.conf{.apk-new,}
# 重新制作 initramfs
mkinitfs
```
