# U-Boot

## Ttips
* [Das U-Boot](https://en.wikipedia.org/wiki/Das_U-Boot)
* 主要用于嵌入式系统的开机加载程序,可以支持多种不同的计算机系统结构.

https://pkgs.alpinelinux.org/contents?branch=edge&name=uboot-tools&arch=x86_64&repo=testing

DIY Fully working Alpine Linux for Allwinner and Other ARM SOCs
https://wiki.alpinelinux.org/wiki/DIY_Fully_working_Alpine_Linux_for_Allwinner_and_Other_ARM_SOCs


https://www.denx.de/wiki/U-Boot/

https://elinux.org/RPi_U-Boot


qemu-system-arm -machine vexpress-a9 -cpu cortex-a9 -m 128M -dtb kernel/arch/arm/boot/dts/vexpress-v2p-ca9.dtb -kernel uboot/u-boot -sd sd.img -nographic

qemu-system-arm -machine vexpress-a9 -cpu cortex-a9 -m 512M -smp 4 -dtb rootfs/boot/dtbs/vexpress-v2p-ca9.dtb -kernel rootfs/boot/vmlinuz-hardened -initrd rootfs/boot/initramfs-hardened -sd rpi.img -nographic

-clock unix -serial stdio -usb -device usb-host,hostbus=2,hostaddr=1

qemu-system-arm -machine vexpress-a9 -cpu cortex-a9 -m 128M -dtb rootfs/boot/dtbs/vexpress-v2p-ca9.dtb -kernel rootfs/boot/vmlinuz-hardened -initrd rootfs/boot/initramfs-hardened -sd rpi.img -serial stdio -nographic -clock unix -serial stdio -usb -device usb-host,hostbus=2,hostaddr=1


-device usb-host,vendorid=0x148f,productid=0x5370

qemu-system-arm -M raspi2 -cpu ?

qemu-system-arm -M raspi2 -cpu arm1176 -m 128M -kernel rootfs/boot/vmlinuz-hardened -initrd rootfs/boot/initramfs-hardened -sd rpi.img  -nographic

qemu-system-arm -machine vexpress-a9 -cpu cortex-a9 -m 128M -dtb rootfs/boot/dtbs/vexpress-v2p-ca9.dtb   -kernel rootfs/boot/vmlinuz-hardened -initrd rootfs/boot/initramfs-hardened -sd rpi.img  -nographic -usb -device usb-host,vendorid=0x2701,productid=0x6901

qemu-system-arm -machine vexpress-a9 -cpu cortex-a9 -m 128M -dtb rootfs/boot/dtbs/vexpress-v2p-ca9.dtb   -kernel rootfs/boot/vmlinuz-hardened -initrd rootfs/boot/initramfs-hardened -sd rpi.img  -nographic -device usb-ehci,id=usb,bus=pci.0,addr=0x4 -device usb-host,vendorid=0x2701,productid=0x6901


qemu-system-arm -machine vexpress-a9 -cpu cortex-a9 -m 128M -dtb rootfs/boot/dtbs/vexpress-v2p-ca9.dtb -kernel rootfs/boot/vmlinuz-hardened -initrd rootfs/boot/initramfs-hardened -sd rpi.img -nographic -net nic -net user

Product ID: 0x2701
Vendor ID: 0x6901

BCM2835

qemu-system-arm -M raspi2 -cpu arm1176 -m 128M -kernel rootfs/boot/vmlinuz-hardened -initrd rootfs/boot/initramfs-hardened -dtb rpifs/bcm2835-rpi-zero.dtb -sd rpi.img  -nographic

qemu-system-arm -M raspi2 -cpu arm1176 -m 128M -kernel rpifs/boot/vmlinuz-rpi2 -initrd rpifs/boot/initramfs-rpi2 -dtb rpifs/bcm2835-rpi-zero.dtb -sd rpi.img

qemu-system-arm -smp 4 -M raspi2 -cpu cortex-a7 -m 128M -kernel rpifs/boot/vmlinuz-rpi2 -initrd rpifs/boot/initramfs-rpi2 -dtb rpifs/bcm2835-rpi-zero.dtb -sd rpi.img -net nic -net user



qemu-system-arm -M virt -m 1024 \
  -kernel rpifs/boot/vmlinuz-rpi2 \
  -initrd rpifs/boot/initramfs-rpi2 \
  -drive if=none,file=rpi.img,format=raw,id=hd \
  -device virtio-blk-device,drive=hd

https://github.com/u-boot/u-boot/tree/master/configs

https://elinux.org/RPi_U-Boot

http://mediawiki.compulab.com/w/index.php5/U-Boot_quick_reference

qemu-system-arm -M raspi2 -kernel raspbian-boot/kernel7.img -sd
  2015-09-24-raspbian-jessie.vhd -append "rw earlyprintk loglevel=8
  console=ttyAMA0 root=/dev/mmcblk0p2" -serial stdio

qemu-system-arm -M vexpress-a9 -kernel linux-vanilla-4.9.65-r0/boot/vmlinuz -vnc :1 -append "rw earlyprintk loglevel=8 console=ttyAMA0" -serial stdio -curses

qemu-system-arm -M vexpress-a9 -kernel linux-rpi2-4.9.65-r0/boot/vmlinuz-rpi2 -vnc :1 -append "rw earlyprintk loglevel=8 console=ttyS0" -serial stdio -curses

```bash
git clone --depth=1000 https://github.com/u-boot/u-boot
cd u-boot
docker run --rm -it -v $PWD:/src -w /src wener/base:aarch64

apk add alpine-sdk

make O=/tmp/build distclean
make O=/tmp/build canyonlands_config
make O=/tmp/build all

make O=/tmp/rpi rpi_defconfig

make rpi_2_defconfig
make rpi_3_defconfig

make rpi_0_w_defconfig

make -j8 -s

make O=$PWD/build/rpi_3 rpi_3_defconfig
make O=$PWD/build/rpi_3 -j8

make O=$PWD/build/rpi_0_w rpi_0_w_defconfig

apk add swig python python-dev
make O=$PWD/build/orangepi_zero -j 40

riscv32
nx25-ae250
```

qemu-system-aarch64 -M raspi3 -no-reboot -kernel build/rpi_3/u-boot

wget ftp://ftp.denx.de/pub/u-boot/u-boot-1.3.2.tar.bz2
$ rm -f u-boot
$ bunzip2 < u-boot-1.3.2.tar.bz2 | tar xf -
$ ln -s u-boot-1.3.2 u-boot
$ cd u-boot


modules=loop,squashfs,sd-mod,usb-storage quiet dwc_otg.lpm_enable=0 console=ttyAMA0,115200 console=tty1

disable_splash=1
boot_delay=0
gpu_mem=256
gpu_mem_256=64
[pi0]
kernel=boot/vmlinuz-rpi
initramfs boot/initramfs-rpi
[pi1]
kernel=boot/vmlinuz-rpi
initramfs boot/initramfs-rpi
[pi2]
kernel=boot/vmlinuz-rpi2
initramfs boot/initramfs-rpi2
[pi3]
kernel=boot/vmlinuz-rpi2
initramfs boot/initramfs-rpi2
[all]
include usercfg.txt


 bootcode.bin
 https://www.raspberrypi.org/forums/viewtopic.php?t=5170

 https://www.raspberrypi.org/forums/viewtopic.php?t=173308



# swarren's branch already sets this automatically, so you can skip this
# Mainline U-Boot will set the following automatically soon
setenv fdtfile bcm2835-rpi-b.dtb

setenv bootargs earlyprintk console=tty0 console=ttyAMA0 root=/dev/mmcblk0p2 rootfstype=ext4 rootwait noinitrd

mmc dev 0
fatload mmc 0:1 ${kernel_addr_r} boot/vmlinuz-rpi
# IMPORTANT NOTE: On mainline u-boot, the correct variable to use here is ${fdt_addr} and NOT ${fdt_addr_r}
fatload mmc 0:1 ${fdt_addr_r} ${fdtfile}

# IMPORTANT NOTE: On mainline u-boot, the correct variable to use here is ${fdt_addr} and NOT ${fdt_addr_r}
bootz ${kernel_addr_r} - ${fdt_addr_r}


## Executing script at 00100000

Wrong image format for "source" command

mkimage -T script -C none -n 'Demo Script File' -d setenv-commands setenv.img


brew install u-boot-tools
