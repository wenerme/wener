---
id: virtio
title: Virtio
---

## Virtio

* virtio-net
* virtio-blk
  * /sys/block/vda
* virtio-scsi
* [virtio-fs](https://virtio-fs.gitlab.io/)
  * 9p
* https://blogs.oracle.com/linux/how-to-emulate-block-devices-with-qemu
* virtio-balloon
  * [virtio-balloon-stats](https://github.com/qemu/qemu/blob/master/docs/virtio-balloon-stats.txt)
  * https://pmhahn.github.io/virtio-balloon/
* virtio-serial-pci
* virtio-balloon-pci
* virtio-blk	-drive file=disk.img,if=virtio
* virtio-scsi-pci	-device virtio-scsi-pci -drive file=disk.img,if=none,id=hd0 -device scsi-hd,drive=hd0

```bash
qemu-system-x86_64 \
# vda - 存储
-drive file=alpine.qcow2,if=virtio \
# 网络
-netdev user,id=user.0,hostfwd=tcp::4287-:22 \
-device virtio-net,netdev=user.0

# PCI 10 GbE virtio-net-pci
-net nic,model=virtio

# libvirt <memballoon model='virtio' autodeflate='on'>
-device virtio-balloon,deflate-on-oom=on

# Linux AIO
-drive file=disk.qcow2,if=virtio,aio=native,cache.direct=on

# RNG/Random Number Generator
# =========================
# 默认
# 支持限速 例如 512 bytes/s -> max-bytes=512,period=1000
-device virtio-rng-pci
# UNIX 环境
-object rng-random,filename=/dev/random,id=rng0
# 硬件 rng
-object rng-random,filename=/dev/hwrng,id=rng0
# 网络 RNG
-chardev socket,host=10.199.13.151,port=9000,id=chr0 -object rng-egd,chardev=chr0,id=rng0
```

```xml
<domain>
  <!-- 单线程 -->
  <iothreads>1</iothreads>
  <disk type='file' device='disk'>
    <!-- 单线程 -->
    <driver name='qemu' type='raw' cache='none' iothread='1'/>
    <!-- virtio -->
    <target dev='vda' bus='virtio'/>
  </disk>
  <devices>
    <controller type='scsi' index='0' model='virtio-scsi'>
      <!-- 单线程 -->
      <driver iothread='1'/>
    </controller>
  </devices>
</domain>
```


```bash
# cluster_size 提高性能
qemu-img create -f qcow2 -o cluster_size=2M my.qcow2 100G

# 设置 cache-size 提高性能
qemu-system-x86_64 -drive file=my.qcow2,if=none,id=drive0,aio=native,cache=none,cache-size=16M

# mode
# off - 不预先申请
# falloc - 使用 posix_fallocate() 预留空间
# full - 填 0 预留
qemu-img create -f $fmt -o preallocation=$mode test.img 100G
```
# virtio-fs
* /usr/lib/qemu/virtiofsd
* [virtiofsd](https://www.qemu.org/docs/master/interop/virtiofsd.html)
* [virtfs-proxy-helper](https://www.qemu.org/docs/master/interop/virtfs-proxy-helper.html)

```bash
# 启动 daemon
virtiofsd --socket-path=/var/run/vm001-vhost-fs.sock -o source=/var/lib/fs/vm001

# -virtfs local,path=/tank/storage,mount_tag=host0,security_model=passthrough,id=host0

# QEMU
qemu-system-x86_64 \
  -chardev socket,id=char0,path=/var/run/vm001-vhost-fs.sock \
  -device vhost-user-fs-pci,chardev=char0,tag=myfs \
  -object memory-backend-memfd,id=mem,size=4G,share=on \
  -numa node,memdev=mem
# Guest 挂载
mount -t virtiofs myfs /mnt


# virtfs-proxy-helper
```

## ref
https://www.linux-kvm.org/page/9p_virtio
https://blog.csdn.net/gatieme/article/details/82912921
https://wiki.libvirt.org/page/Virtio
https://www.linux-kvm.org/page/Virtio
http://wiki.osdev.org/Virtio
https://www.ibm.com/developerworks/library/l-virtio/
https://fedoraproject.org/wiki/Windows_Virtio_Drivers
https://en.wikibooks.org/wiki/QEMU/Devices/Virtio
https://wiki.qemu.org/Features/VirtioVsock
https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/latest-virtio/virtio-win.iso
https://cloud.google.com/compute/docs/machine-types#verifying_the_driver_installation
https://events19.lfasiallc.com/wp-content/uploads/2017/11/Storage-Performance-Tuning-for-FAST-Virtual-Machines_Fam-Zheng.pdf

# Block format 'raw' does not support the option 'boot'
