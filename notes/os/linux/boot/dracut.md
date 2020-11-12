---
id: dracut
---

# dracut

- 是什么
  - 构建 initramfs
  - 定位和挂载 rootfs
  - 支持 btrfs, DM RAID, MD RAID, LVM2, device mapper multipath I/O, dm-crypt, cifs, FCoE, iSCSI, NBD, NFS
  - 源自 Redhat - 因此 CentOS、Fedora、RHEL 都是
  - 除了 Redhat 之外默认使用的 - openSUSE、SLES
- [dracutdevs/dracut](https://github.com/dracutdevs/dracut)
- [dracut.wiki.kernel.org](https://dracut.wiki.kernel.org)
- 模块位于 /usr/lib/dracut/modules.d
  - [modules.d](https://github.com/dracutdevs/dracut/tree/master/modules.d)
  - rngd
    - 虚拟机环境最好启动 rngd/haveged 否则启动非常慢 200s+
  - fs-lib
    - ext4
  - [qemu](https://github.com/dracutdevs/dracut/blob/master/modules.d/90qemu/module-setup.sh)
    - 包含 virtio
  - [dracut-systemd](https://github.com/dracutdevs/dracut/tree/master/modules.d/98dracut-systemd)
    - 大部分实际启动脚本逻辑
- [文档](https://mirrors.edge.kernel.org/pub/linux/utils/boot/dracut/dracut.html)
- 参考
  - [Creating a New Initial RAM Disk](https://wiki.centos.org/TipsAndTricks/CreateNewInitrd)
- `rd.luks=0 rd.lvm=0 rd.md=0 rd.dm=0` - 不扫描不必要的设备可以加速启动

```bash
# 基础包
yum install -y rng-tools nano
systemctl enable rngd

lsinitrd /boot/initrd.img-4.6.0-1-amd64
modprobe --show-depends dm-raid|grep crc


# --hostonly 仅安装主机需要模块
# --add-drivers 添加内核模块
dracut --kver 4.18.0-193.19.1.el8_2.x86_64 --no-hostonly --add fs-lib initramfs
lsinitrd initramfs

# rootfs 只安装 kernel-core 用于构建 initrd
yum install -y yum-utils
rpm -Uvh --nodeps $(repoquery --location kernel-core)

# 查看所有模块
dracut --kver 4.18.0-193.19.1.el8_2.x86_64 --no-hostonly --list-modules

dracut -m "nfs network base" --no-hostonly initramfs-nfs-only.img

yum install -y rng-tools
# dracut-systemd systemd-initrd
# virtio_mmio
dracut initramfs --kver 4.18.0-193.19.1.el8_2.x86_64 \
  -f --no-hostonly -v \
  -m "base bash systemd dracut-systemd systemd-initrd qemu qemu-net fs-lib rngd busybox"  \
  --kernel-cmdline "rd.debug rd.shell rd.udev.debug rd.driver.pre=ext4 rd.driver.pre=virtio_mmio rd.break=cmdline rd.luks=0 rd.lvm=0 rd.md=0"

```

## modules
* 05-bash - 安装 bash 作为 /bin/sh
* 05-systemd - 安装 systemd 和基础服务
* 05-busybox - 安装 /usr/bin/busybox
* 06-rngd

```bash
# busybox
curl -o /usr/bin/busybox https://busybox.net/downloads/binaries/1.31.0-defconfig-multiarch-musl/busybox-x86_64
chmod +x /usr/bin/busybox

# rngd
yum install rng-tools -y
```

## cmdline
* debug
  * rd.info 日志级别
  * rd.debug Shell 执行会 set -x
  * rd.shell root 挂载失败进入 shell
  * rd.break={cmdline|pre-udev|pre-trigger|initqueue|pre-mount|mount|pre-pivot|cleanup} 进入 shell
  * rd.udev.info
  * rd.udev.debug

rd.emergency=[reboot|poweroff|halt]
specify, what action to execute in case of a critical failure. rd.shell=0 also be specified.
rd.driver.blacklist=`<drivername>[,<drivername>,…]`
do not load kernel module `<drivername>`. This parameter can be specified multiple times.
rd.driver.pre=`<drivername>[,<drivername>,…]`
force loading kernel module `<drivername>`. This parameter can be specified multiple times.
rd.driver.post=`<drivername>[,<drivername>,…]`
force loading kernel module `<drivername>` after all automatic loading modules have been loaded. This parameter can be specified multiple times.
rd.retry=`<seconds>`
specify how long dracut should retry the initqueue to configure devices. The default is 30 seconds. After 2/3 of the time, degraded raids are force started. If you have hardware, which takes a very long time to announce its drives, you might want to extend this value.
rd.timeout=`<seconds>`
specify how long dracut should wait for devices to appear. The default is 0, which means forever. Note that this timeout should be longer than rd.retry to allow for proper configuration.
rd.noverifyssl
accept self-signed certificates for ssl downloads.
rd.ctty=`<terminal device>`
specify the controlling terminal for the console. This is useful, if you have multiple "console=" arguments.

cp -r usr/lib/modules/4.18.0-193.19.1.el8_2.x86_64 lib/modules/



## 启动流程

- [dracut.bootup](https://mirrors.edge.kernel.org/pub/linux/utils/boot/dracut/dracut.html#dracutbootup7)

```
                                    systemd-journal.socket
                                               |
                                               v
                                    dracut-cmdline.service
                                               |
                                               v
                                    dracut-pre-udev.service
                                               |
                                               v
                                     systemd-udevd.service
                                               |
                                               v
local-fs-pre.target                dracut-pre-trigger.service
         |                                     |
         v                                     v
 (various mounts)                systemd-udev-trigger.service
         |        (swap devices)               |             (various low-level   (various low-level
         |               |                     |             services: seed,       API VFS mounts:
         v               v                     v             tmpfiles, random     mqueue, configfs,
  local-fs.target   swap.target     dracut-initqueue.service    sysctl, ...)        debugfs, ...)
         |               |                     |                    |                    |
         \_______________|____________________ | ___________________|____________________/
                                              \|/
                                               v
                                        sysinit.target
                                               |
                             _________________/|\___________________
                            /                  |                    \
                            |                  |                    |
                            v                  |                    v
                        (various               |              rescue.service
                       sockets...)             |                    |
                            |                  |                    v
                            v                  |              rescue.target
                     sockets.target            |
                            |                  |
                            \_________________ |                                 emergency.service
                                              \|                                         |
                                               v                                         v
                                         basic.target                             emergency.target
                                               |
                        ______________________/|
                       /                       |
                       |                       v
                       |            dracut-pre-mount.service
                       |                       |
                       |                       v
                       |                  sysroot.mount
                       |                       |
                       |                       v
                       |             initrd-root-fs.target
           (custom initrd services)            |
                       |                       v
                       |             dracut-mount.service
                       |                       |
                       |                       v
                       |            initrd-parse-etc.service
                       |                       |
                       |                       v
                       |            (sysroot-usr.mount and
                       |             various mounts marked
                       |               with fstab option
                       |                x-initrd.mount)
                       |                       |
                       |                       v
                       |                initrd-fs.target
                       \______________________ |
                                              \|
                                               v
                                          initrd.target
                                               |
                                               v
                                    dracut-pre-pivot.service
                                               |
                                               v
                                     initrd-cleanup.service
                                          isolates to
                                    initrd-switch-root.target
                                               |
                                               v
                        ______________________/|
                       /                       |
                       |        initrd-udevadm-cleanup-db.service
                       |                       |
           (custom initrd services)            |
                       |                       |
                       \______________________ |
                                              \|
                                               v
                                   initrd-switch-root.target
                                               |
                                               v
                                   initrd-switch-root.service
                                               |
                                               v
                                          switch-root
```
