# virtio-fs
* [virtio-fs - A Shared File System for Virtual Machines](https://fosdem.org/2020/schedule/event/vai_virtio_fs/attachments/slides/3666/export/events/attachments/vai_virtio_fs/slides/3666/virtio_fs_A_Shared_File_System_for_Virtual_Machines_FOSDEM.pdf)
  * File System as a Service
  * Boot guest from directory on host
  * Linux FUSE as Protocol
  * VIRTIO as Transport
    * shared memory resources
* 9p
  * https://www.linux-kvm.org/page/9p_virtio
  * https://wiki.qemu.org/Documentation/9psetup
  * https://kernel.taobao.org/2019/11/virtio-fs-intro-and-perf-optimize/
  * 使用host上overlayfs，能充分利用host pagecache；部署简单，不需要额外的组件

```xml
<!-- libvirtd -->
<filesystem type='mount' accessmode='passthrough'>
 <driver type='virtiofs'/>
 <source dir='/var/www'/>
 <target dir='website'/> <!-- not treated as a path -->
</filesystem>
```

```bash
mount -t virtiofs website /var/www
```
