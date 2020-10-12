# Qemu Manual


```bash
modprobe -av nbd
qemu-img create -f qcow2 rpi.img 2g
qemu-nbd -c /dev/nbd0 rpi.img

qemu-nbd --disconnect /dev/nbd0


qemu-img convert -f raw rpi.img -O qcow2 rpi.qcow2
qemu-nbd -c /dev/nbd0 rpi.qcow2


qemu-img convert alp-3.7.img -O raw alp-3.7.raw
```

```
label: dos
label-id: 0x4980cef8
device: rpi.img
unit: sectors

rpi.img1 : start=        2048, size=      258048, type=6, bootable
rpi.img2 : start=      260096, size=     3934208, type=83
```

PXE
https://gist.github.com/gdamjan/3063636

## FAQ

http://intermezzos.github.io/book/appendix/troubleshooting.html

### Could not read from CDROM (code 0009)
```bash
apk add grub xorriso
grub-mkrescue -o os.iso isofiles
```

### Qemu emulator with Kernel panic - not syncing: Attempted to kill init
https://serverfault.com/q/787038/190601

### 压缩 qcow2
* https://pve.proxmox.com/wiki/Shrink_Qcow2_Disk_Files

```bash
qemu-img convert -O qcow2 image.qcow2_backup image.qcow2
```

### Qemu cpu
```bash
QEMU_LD_PREFIX=/usr/gnemul/qemu-arm
```

### OSX
* [kholia/OSX-KVM](https://github.com/kholia/OSX-KVM)

## virtio
```
mount -t 9p -o trans=virtio,version=9p2000.L /hostshare /home/guest_user/host_files
```
