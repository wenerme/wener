---
title: Alpine Config
tags:
  - OS
  - Alpine
  - Config
---

# Alpine Internal

## Tips

- alpine-base
- alpine-mirrors
- network-extras
- [alpinelinux/alpine-iso](https://github.com/alpinelinux/alpine-iso)
- [alpinelinux/alpine-conf](https://github.com/alpinelinux/alpine-conf)
- [alpinelinux/aports](https://github.com/alpinelinux/aports)
- [setup-disk.in](https://github.com/alpinelinux/alpine-conf/blob/master/setup-disk.in)
- [alpine-chroot-install](https://github.com/alpinelinux/alpine-chroot-install)
- [Alpine Linux in a chroot](https://wiki.alpinelinux.org/wiki/Alpine_Linux_in_a_chroot)

```bash
apk add haveged haveged-openrc
rc-update add haveged

# OpenRC init scripts
for svc in devfs dmesg hwdrivers mdev; do rc-update --quiet add $svc sysinit; done
for svc in killprocs mount-ro savecache; do rc-update --quiet add $svc shutdown; done
for svc in modules sysctl hostname bootmisc swclock syslog swap; do ln -s /etc/init.d/$svc /etc/runlevels/boot; done
for svc in haveged sshd local networking; do rc-update --quiet add $svc default; done

rc-update add networking default

rc-update add hwclock boot
rc-update add modules boot
rc-update add sysctl boot
rc-update add hostname boot
rc-update add bootmisc boot
rc-update add syslog boot

rc-service --exists network

apk add ca-certificates
update-ca-certificates

setup-ntp -c busybox
```

- [setup-alpine.in#L153](https://github.com/alpinelinux/alpine-conf/blob/master/setup-alpine.in#L153)

> adding things to the boot runlevel from a chroot is bugged in openrc right now
> Adding to another runlevel should work

## Chroot Setup

```bash
touch /etc/network/interfaces
mkdir /lib/modules

chroot /alpine

mount -t proc none /proc
/etc/init.d/devfs start
/etc/init.d/sysfs start

apk add dosfstools

auto lo
iface lo inet loopback

cat << EOF > /etc/network/interfaces
auto lo
iface lo inet loopback

auto eth0
iface eth0 inet dhcp

auto wlan0
iface wlan0 inet dhcp
EOF

touch /run/openrc/softlevel

apk add nano htop curl wget bash bash-completion
sed -i 's/\/bin\/ash/\/bin\/bash/g' /etc/passwd
```

## QEMU ARM

```bash
qemu-system-arm -kernel armhf/boot/vmlinuz-rpi2 -initrd armhf/boot/initramfs-rpi2 -M raspi2 -serial stdio -dtb armhf/bcm2709-rpi-2-b.dtb -append "console=ttyAMA0,115200 kgdboc=ttyAMA0,115200 root=/dev/mmcblk0p2 rootfstype=ext4 rootwait" -sd target.img

qemu-system-arm -kernel armhf/boot/vmlinuz-rpi2 -initrd armhf/boot/initramfs-rpi2 -M raspi2 -serial stdio -dtb armhf/bcm2709-rpi-2-b.dtb -append "dwc_otg.lpm_enable=0 console=serial0,115200 console=tty1 root=/dev/mmcblk0p2 rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait" -sd target.img

# cmdline
dwc_otg.lpm_enable=0 console=serial0,115200 console=tty1 root=/dev/mmcblk0p2 rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait

echo -e 'brcmfmac' >> /etc/modules

qemu-system-aarch64 -kernel aarch64/boot/vmlinuz-rpi -initrd aarch64/boot/initramfs-rpi -M raspi3 -serial stdio -dtb aarch64/bcm2710-rpi-3-b.dtb -append "dwc_otg.lpm_enable=0 console=serial0,115200 console=tty1 root=/dev/mmcblk0p2 rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait" -sd demo-aarch64.img
```

## NBD

```bash
nbd-client 192.168.1.100 10809 /dev/nbd0
nbd-client 192.168.1.100 9998 /dev/nbd1

qemu-storage-daemon \
  --blockdev driver=qcow2,node-name=test,file.filename=test.qcow2,file.locking=off,file.driver=file \
  --nbd-server addr.type=inet,addr.host=0.0.0.0,addr.port=6789 \
  --export nbd,device=test

qemu-nbd -f raw target.img -x target

modprobe nbd-client
```

- [NBD Admin Guide](https://www.kernel.org/doc/html/latest/admin-guide/blockdev/nbd.html)
- [BUSE - A block device in userspace](https://github.com/acozzette/BUSE)

> Couldn't resolve the nbd netlink family, make sure the nbd module is loaded and your nbd driver supports the netlink interface.

- [docker/for-mac#4549](https://github.com/docker/for-mac/issues/4549)
- [pi-gen#349](https://github.com/RPi-Distro/pi-gen/pull/349)
- [Gentoo OpenRC Chroot support](https://wiki.gentoo.org/wiki/OpenRC#Chroot_support)

## Setup

- 早期即便 -s 0 也会创建 swap 分区,现在不会创建
- setup-disk 的包基于当前的 world 进行安装，目前无法修改
- [alpinelinux/alpine-conf](https://github.com/alpinelinux/alpine-conf)
