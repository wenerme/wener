# Qemu FAQ

## FAQ

7 ways we harden our KVM hypervisor at Google Cloud: security in plaintext
https://cloudplatform.googleblog.com/2017/01/7-ways-we-harden-our-KVM-hypervisor-at-Google-Cloud-security-in-plaintext.html


## 访问远程镜像

```bash
# apk add qemu-block-ssh
qemu -drive file=ssh://host/path/to/file,if=virtio,cache=none
```

## virtfs
https://wiki.qemu.org/Documentation/9psetup

ProjectZero
QEMU: virtfs permits guest to access entire host filesystem
https://news.ycombinator.com/item?id=13753950

## convert 后无法启动

* 在 macOS 下从 qcow2 转换为 raw 后分区信息丢失
* Linux 未遇到这样的问题
* 转换后可使用 fdisk 检查分区信息

## Overhead
[Containerization vs. Virtualization – More on Overhead](http://www.brightcomputing.com/blog/containerization-vs.-virtualization-more-on-overhead)


## USB
https://github.com/qemu/qemu/blob/master/docs/usb2.txt

https://unix.stackexchange.com/a/251406/47774

qemu-system-x86_64 \
    -enable-kvm \
    -M q35 \
    -m 2G \
    -usb -usbdevice host:16b2:1001 \
    -usb -usbdevice host:0529:0001 \
    -usbdevice tablet \
    -net nic \
    -net bridge,br=br0 \
    -vga qxl \
    -spice port=5930,disable-ticketing \
    -device virtio-serial-pci \
    -device virtserialport,chardev=spicechannel0,name=com.redhat.spice.0 \
    -chardev spicevmc,id=spicechannel0,name=vdagent \
    -drive file=/mnt/data/win-patch.img,if=virtio
