
## initramfs
* [alpinelinux/mkinitfs](https://github.com/alpinelinux/mkinitfs)
  * `mkinitfs -L` - 特性 [features.d](https://github.com/alpinelinux/mkinitfs/tree/master/features.d)
  * `/etc/mkinitfs/mkinitfs.conf` - 默认 `ata base ide scsi usb virtio ext4`
* features
  * cryptsetup
    * LUKS
    * `apk add cryptsetup`
    * append `cryptroot=UUID=<UUID>`
* [initramfs-init](https://github.com/alpinelinux/mkinitfs/blob/master/initramfs-init.in)
  * 核心启动逻辑

```bash
# chroot 安装
mkinitfs -c /mnt/etc/mkinitfs/mkinitfs.conf -b /mnt/ $(ls /mnt/lib/modules/)
```
