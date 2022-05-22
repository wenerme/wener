# Xpenology

- https://www.wundertech.net/how-to-install-xpenology-on-a-linux-kvm-qemu-virtual-machine/
- https://xpenology.club/downloads/
- [Tutorial/Reference: 6.x Loaders and Platforms](https://xpenology.com/forum/topic/13333-tutorialreference-6x-loaders-and-platforms/)
- https://xpenology.com/forum/topic/7853-dsm-612-on-qemukvmvirtual-machine-manager-3615/

```bash
qemu-img convert -f raw -O qcow2 synoboot.img syno-ds918.qcow2

qemu-img create -f qcow2 hda.qcow2 120G
qemu-system-x86_64 -accel kvm -cpu host -smp 2 -m 4G -device driver=e1000,mac=00:11:32:12:34:56 -hda syno-ds918.qcow2 -vnc :1
```
