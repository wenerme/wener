---
title: Linux 内存管理 (Memory Management)
tags:
  - Linux
  - Memory
  - Kernel
  - MMU
  - VirtualMemory
---

# Linux 内存管理 (Memory Management) {#linux-memory-management}

- [mman.h](./mman.md)
- [hugetlbpage](./hugetlbpage.md)
- [Pagemap - Kernel Docs](https://docs.kernel.org/6.12/admin-guide/mm/pagemap.html)
- [Address space layout randomization (ASLR) - Wikipedia](https://en.wikipedia.org/wiki/Address_space_layout_randomization)
- [Process Address Space (PDF)](https://students.mimuw.edu.pl/ZSO/Wyklady/04_processes2/ProcessAddressSpace.pdf)
- [Boot time memory management - Kernel Docs](https://docs.kernel.org/core-api/boot-time-mm.html)
- [Memory Layout - CS1610](https://read.seas.harvard.edu/cs1610/2025/doc/memory-layout/)
- `tools/mm`: `page-types`

| abbr. | stand for                    | meaning          |
| ----- | ---------------------------- | ---------------- |
| THP   | Transparent Huge Page        | 透明大页         |
| VMA   | Virtual Memory Area          | 虚拟内存区域     |
| TLB   | Translation Lookaside Buffer | 转换后备缓冲区   |
| UFFD  | Userfaultfd                  | 用户态页错误处理 |
| PTE   | Page Table Entry             | 页表项           |
| PFN   | Page Frame Number            | 页框号           |
| MMU   | Memory Management Unit       | 内存管理单元     |
| wp    | Write Protect                | 写保护           |
| pm    | Page Map                     | 页面映射         |

---

- /proc/pid/pagemap
  - fs/proc/task_mmu.c, pagemap_read
  - CAP_SYS_ADMIN
  - PFN - Page Frame Number
  - ioctl PAGEMAP_SCAN struct pm_scan_arg
    - PAGE_IS_WPALLOWED - 页面已启用异步写保护
    - PAGE_IS_WRITTEN - 页面自写保护以来已被写入
    - PAGE_IS_FILE - 页面是文件支持的
    - PAGE_IS_PRESENT - 页面存在于内存中
    - PAGE_IS_SWAPPED - 页面已被交换
    - PAGE_IS_PFNZERO - 页面具有零 PFN
    - PAGE_IS_HUGE - 页面是 PMD 映射的 THP 或 Hugetlb 支持的
    - PAGE_IS_SOFT_DIRTY - 页面是软脏的
- /proc/pid/maps
- /proc/kpagecount
  - 64bit counter
  - 页面被映射的次数，按 PFN 索引
- /proc/kpageflags
  - fs/proc/page.c，kpageflags_read
- /proc/kpagecgroup

# 参考

## 启动时物理内存概念布局

此表概述了在 x86-64 系统启动时，主内核内存管理激活之前，物理 RAM 的前几兆字节是如何按顺序使用的。

| 物理地址范围（约）                   | 阶段                     | 描述                                                                                                                       |
| ------------------------------------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| 0x00000000 - 0x0009FFFF（前 640 KB） | BIOS/UEFI 和引导加载程序 | 这是"常规内存"区域。系统 BIOS/UEFI 使用此区域的部分用于其数据和中断向量。引导加载程序（如 GRUB）被加载到此处并开始执行。   |
| 0x000A0000 - 0x000FFFFF              | 硬件和 BIOS ROM          | 保留给硬件使用，如视频缓冲区和 BIOS ROM 映射。                                                                             |
| 0x00100000（1 MB）及以上             | 内核加载                 | 引导加载程序将压缩的内核映像和初始 RAM 磁盘（initramfs）加载到物理内存的这个区域。                                         |
| 变化（低内存）                       | 早期内核数据             | 内核的初始页表和引导时内存管理器（memblock）的数据结构在低物理内存中设置，用于在最终内存管理初始化之前管理系统的内存映射。 |

## 内核虚拟地址空间布局（x86-64，4 级分页）

一旦内核在 64 位长模式下运行，它就会建立虚拟地址空间。当前的 x86-64 CPU 使用 48 位虚拟地址，创建一个巨大的 256 TB 空间，该空间在用户应用程序和内核本身之间分配。

| 虚拟地址范围                                          | 区域                    | 描述                                                                                                                                                   |
| ----------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0x0000000000000000 - 0x00007FFFFFFFFFFF               | 用户空间（128 TB）      | 整个下半部分可供用户进程使用。每个进程在此范围内都有自己的独立映射。此空间内的布局在表 3 中详述。                                                      |
| 0x0000800000000000 - 0xFFFF7FFFFFFFFFFF               | 非规范"空洞"            | 这个巨大的间隙未被使用。CPU 强制所有有效地址的高 16 位必须全为零（用户空间）或全为一（内核空间）。                                                     |
| 0xFFFF800000000000 - 0xFFFFFFFFFFFFFFFF               | 内核空间（128 TB）      | 上半部分保留给内核。它大部分是恒定的，并映射在每个进程的地址空间中，尽管它受到保护，不允许用户模式访问。                                               |
| 0xFFFF880000000000 - 0xFFFFC7FFFFFFFFFF（内核空间内） | 直接内存映射            | 这个 64 TB 区域是系统所有物理 RAM 的直接线性映射。这里的内核逻辑地址可以通过简单地减去偏移量转换为物理地址。这允许对任何物理页面进行快速、高效的访问。 |
| 变化（内核空间内）                                    | vmalloc 和 ioremap 区域 | 用于分配可能物理上分散的虚拟连续内存（vmalloc）和将硬件设备内存映射到内核地址空间（ioremap）。                                                         |
| 变化（内核空间内）                                    | 内核文本、数据、BSS     | 内核本身的实际代码和静态数据被加载到此处。内核映像通常放置在此区域的顶部。                                                                             |
| 变化（内核空间内）                                    | 特殊映射                | 包括 EFI 运行时服务的区域，仅在需要时映射。                                                                                                            |

## 用户空间虚拟地址布局（典型进程）

此表显示了单个运行程序在 128 TB 用户空间区域内的标准布局。确切的地址通过地址空间布局随机化（ASLR）进行随机化以提高安全性。

| 区域                  | 描述                                                                                                              | 增长方向                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------ |
| 文本段（.text）       | 程序的可执行代码。映射为只读和可执行。64 位程序的默认起始地址通常是 0x400000。                                    | 静态                     |
| 数据段（.data，.bss） | 存储已初始化（.data）和未初始化（.bss）的全局和静态变量。                                                         | 静态                     |
| 堆                    | 动态分配的内存，由 malloc() 和 brk() 等函数管理。用于必须超出创建它的函数调用生存期的数据。                       | 向上增长（朝向更高地址） |
| 内存映射段            | 用于内存映射文件和由动态链接器加载的共享库（.so 文件）。大的 malloc 分配也可能使用此区域。                        | 变化                     |
| 栈                    | 存储局部变量、函数参数和函数调用的返回地址。进程中的每个线程都有自己的栈。                                        | 向下增长（朝向更低地址） |
| vDSO 和 [vsyscall]    | 虚拟动态共享对象。内核暴露的一个小内存区域，用于加速某些系统调用（如 gettimeofday），而无需上下文切换的完整开销。 | 静态（地址随机化）       |
| 内核空间              | 虚拟地址空间的上 128 TB 为内核映射，但用户模式无法访问。                                                          | 静态                     |

## 物理内存区域

内核进一步将物理内存划分为逻辑"区域"，以处理硬件限制，特别是直接内存访问（DMA）。这些不是地址范围，而是物理页面的逻辑分组。

| 区域名称     | 描述                                                                                                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| ZONE_DMA     | 包含物理内存前 16 MB 内的页面。旧的 ISA 设备需要此区域，这些设备只能在此有限范围内执行 DMA。                                         |
| ZONE_DMA32   | 在 64 位系统上，包含前 4 GB 内的页面。用于 32 位设备，这些设备可以对 32 位范围内的任何地址执行 DMA，但不能在完整的 64 位空间内执行。 |
| ZONE_NORMAL  | 包含内核直接映射的所有"正常"物理内存。在 64 位系统上，这涵盖了大部分 RAM。这是大多数内核分配的首选区域。                             |
| ZONE_HIGHMEM | （主要是 32 位架构）~896 MB 标记以上的内存，未永久映射到内核的地址空间中。访问它需要创建临时映射（kmap()）。                         |
| ZONE_MOVABLE | 包含内核可以移动其物理位置的页面。这对于减少内存碎片和支持内存热插拔至关重要。                                                       |
| ZONE_DEVICE  | 表示设备上的内存，如持久内存（PMEM）或 GPU，这些设备具有与标准 RAM 不同的特性。                                                      |
