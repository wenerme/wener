---
tags:
  - FAQ
---

# Linux System FAQ

# CoW Memory

- fork 会 CoW 内存
  - parent's private, writable pages as read-only
- copy_page_range
- copy_page_rank
- Mach vm_copy
- vm_area_struct VMA
- do_wp_page
- Page Table Entry (PTE)
- memfd_create + mmap(MAP_PRIVATE) Linux 3.17+
- userfaultfd Linux 4.3+
  - UFFDIO_REGISTER_MODE_WP 写保护 - Linux 5.7+
  - UFFD_EVENT_PAGEFAULT
  - 用户处理 Page Fault
  - 提供内存页 UFFDIO_COPY UFFDIO_ZEROPAGE
- Firecracker create_snapshot
  - snapshot.snap - 配置信息
  - memory.snap
    - 启动时 mmap MAP_SHARED
    - clone 触发 sync memory.snap
    - cp --reflink memory.snap memory.snap.clone
      - fs 层能 CoW 因此能快速创建出来新的 memory.snap
    - 新 VM 运行使用 memory.snap.clone
- userfaultfd clone - 用户自定义处理逻辑
  - 父 VM 内存映射到 child
  - 额外注册 UFFDIO_REGISTER_MODE_WP
  - 从父 VM 复制内存页，然后移除 UFFDIO_WRITEPROTECT
  - ⚠️ 频繁上下文切换
- 事后复制（Post-copy）实时迁移
- mprotect
- Qcow2 + NBD
- ZFS + Snapshot + Clone

```bash
qemu-img create -f qcow2 base.qcow2 1G
qemu-img create -f qcow2 -b base.qcow2 -F qcow2 snapshot.qcow2

sudo modprobe nbd
# --cache-none
qemu-nbd --connect=/dev/nbd0 snapshot.qcow2
# 将 /dev/nbd0 作为内存

# 断开后能获取 snapshot 作为 diff
sudo nbd-client -d /dev/nbd0

# -o sync=disabled primarycache=all
zfs create -V 1G mypool/myvol
# 将 /dev/zvol/mypool/myvol 作为内存
zfs snapshot mypool/myvol@before
zfs snapshot mypool/myvol@after
zfs send -i mypool/myvol@before mypool/myvol@after > myvol.diff
```

- https://news.ycombinator.com/item?id=36666782
- https://codesandbox.io/blog/how-we-clone-a-running-vm-in-2-seconds
  - https://news.ycombinator.com/item?id=32683834
