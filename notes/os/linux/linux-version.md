---
title: Linux Releases
---

# Linux Releases

## Tips

- https://kernelnewbies.org/LinuxVersions
- [Linux kernel version history](https://en.wikipedia.org/wiki/Linux_kernel_version_history)
- [Active kernel releases](https://www.kernel.org/category/releases.html)
  - 一般年底的最后一个版本会变成 LTS

## 5.10 - LTS

- EXT4
  - 支持 fast commit - fsync 和元数据操作更快 - mkfs 启用
  - 优化文件覆写
- XFS
  - 时间戳 2038 -> 2468
- Nintendo Switch Joy Cons 和 Pro 手柄控制器 - USB 和 蓝牙
- Raspberry Pi 4 VC4
- RISC-V boot EFI
- [Linux 5.10](https://kernelnewbies.org/Linux_5.10)

## 5.8

- Raspberry Pi 4
- Broadcom BCM2711

## 5.4

- virtio-fs
- fs-verity - 检测文件修改
  - 块级别，类似 dm-verity，支持 ext4、f2fs
- [Linux 5.10](https://kernelnewbies.org/Linux_5.4)

## 4.8

- Support for using Transparent Huge Pages in the page cache
- Support for eXpress Data Path
- XFS reverse mapping
- Stricter checking of memory copies with hardened usercopy
- GCC plugin support
- virtio-vsocks for easier guest/host communication
- Support IPv6 security labeling (CALIPSO, RFC 5570)
- Add New Vegas TCP congestion control
- Documentation moved to the reStructuredText format

## 4.7

- Support for Radeon RX480 GPUs
- Parallel directory lookups
- New 'schedutil" frequency governor
- Histograms of events in ftrace
- perf trace calls stack
- Allow BPF programs to attach to tracepoints
- EFI 'Capsule' firmware updates
- Support for creating virtual USB Device Controllers in USB/IP
- Android's sync_file fencing mechanism considered stable
- LoadPin, a security module to restrict the origin of kernel modules

## 4.6

- USB 3.1 SuperSpeedPlus (10 Gbps) support
- Improve the reliability of the Out Of Memory task killer
- Support for Intel memory protection keys
- OrangeFS, a new distributed file system
- Kernel Connection Multiplexor, a facility for accelerating application layer protocols
- 802.1AE MAC-level encryption (MACsec)
- BATMAN V protocol
- dma-buf: new ioctl to manage cache coherency between CPU and GPU
- OCFS2 online inode checker
- Support for cgroup namespaces
- Add support for the pNFS SCSI layout

### 4.5

- Copy offloading with new copy_file_range(2) system call
- Experimental PowerPlay supports brings high performance to the amdgpu driver
- Btrfs free space handling scalability improvements
- Support for GCC's Undefined Behavior Sanitizer (-fsanitize=undefined)
- Forwarded Error Correction support in the device-mapper's verity target
- Add MADV_FREE flag to madvise(2)
- Better epoll multithread scalability
- cgroup unified hierarchy is considered stable
- Performance improvements for SO_REUSEPORT UDP sockets
- Proper control of socket memory usage in the memory controller

### 4.4

- https://kernelnewbies.org/Linux_4.4
- Faster and leaner loop device with Direct I/O and Asynchronous I/O support
- 3D support in virtual GPU driver
  - 3D 支持虚拟 GPU
- LightNVM adds support for Open-Channel SSDs
- TCP listener handling completely lockless, making TCP servers faster and more scalable
  - TCP 监听处理完全无锁, 使得 TCP 服务更快更高效.
  - [Commit](https://git.kernel.org/cgit/linux/kernel/git/torvalds/linux.git/commit/?id=c3fc7ac9a0b978ee8538058743d21feef25f7b33)
- Journalled RAID5 MD support
- Unprivileged eBPF + persistent eBPF programs
- perf + eBPF integration
- Block polling support
- mlock2() syscall allow users to request memory to be locked on page fault

### 4.3

- The Ext3 filesystem has been removed
- userfaultfd(), a system call for handling page-faults in user space
- membarrier(), a system call for issuing memory barriers on a set of threads
- New PID controller for limiting the number of PIDs in cgroups
- Ambient capabilities
- Introduce idle page tracking, a more precise way to track the memory being used by applications
- Support for IPv6 Identifier Locator Addressing
- Network light weight tunnels
- Virtual Routing and Forwarding (Lite) support
