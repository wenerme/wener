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

## Monitor
* [QEMU Monitor](https://qemu.weilnetz.de/doc/qemu-doc.html#pcsys_005fmonitor)
* [QEMU/Monitor](https://en.wikibooks.org/wiki/QEMU/Monitor)
* [使用 monitor command 监控 QEMU 运行状态](https://www.ibm.com/developerworks/cn/linux/l-cn-qemu-monitor/)
* curses
  * Esc+1, Esc+2
* nographic
  * ctrl+a c
* 正常
  * Ctrl+Alt+2

```
```

system_powerdown

qemu-system-i386 -net nic,model=rtl8139 -net user,hostfwd=tcp::3389-:3389 -redir tcp:443::443 -redir tcp:992::992 -redir tcp:1194::1194 -redir tcp:5555::5555 -redir udp:1194::1194 -redir udp:500::500 -redir udp:4500::4500 -m 512M -localtime -cpu core2duo,+nx -smp 2 -usbdevice tablet -k en-us -hda win.img -nographic

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
