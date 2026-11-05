---
title: /proc/meminfo
---

# /proc/meminfo

- [proc_meminfo(5)](https://man7.org/linux/man-pages/man5/proc_meminfo.5.html)
- 每行格式：`字段名: 数值 [单位]`，单位通常是 `kB`
- `free(1)` 的数据来源

```bash
# cat /proc/meminfo
```

```
MemTotal:         500192 kB
MemFree:           64276 kB
Buffers:           32760 kB
Cached:           112976 kB
SwapCached:            0 kB
Active:           300212 kB
Inactive:          53464 kB
Active(anon):     208268 kB
Inactive(anon):      660 kB
Active(file):      91944 kB
Inactive(file):    52804 kB
Unevictable:           0 kB
Mlocked:               0 kB
SwapTotal:             0 kB
SwapFree:              0 kB
Dirty:                96 kB
Writeback:             0 kB
AnonPages:        207968 kB
Mapped:            22164 kB
Shmem:               988 kB
Slab:              61228 kB
SReclaimable:      42084 kB
SUnreclaim:        19144 kB
KernelStack:        1616 kB
PageTables:         6144 kB
NFS_Unstable:          0 kB
Bounce:                0 kB
WritebackTmp:          0 kB
CommitLimit:      250096 kB
Committed_AS:     753788 kB
VmallocTotal:   34359738367 kB
VmallocUsed:        3480 kB
VmallocChunk:   34359720156 kB
HardwareCorrupted:     0 kB
AnonHugePages:         0 kB
HugePages_Total:       0
HugePages_Free:        0
HugePages_Rsvd:        0
HugePages_Surp:        0
Hugepagesize:       2048 kB
DirectMap4k:       34816 kB
DirectMap2M:      620544 kB
```

## 字段

| 字段                                                                     | 说明                                                                                                                       |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `MemTotal`                                                               | 可用物理内存总量（物理内存减去保留部分和内核代码）                                                                         |
| `MemFree`                                                                | `LowFree + HighFree`                                                                                                       |
| `MemAvailable`（3.14+）                                                  | 不触发 swap 的情况下，可用于启动新应用的内存估算值                                                                         |
| `Buffers`                                                                | 内核用于原始磁盘块的临时缓冲，一般不会超过约 20 MB                                                                         |
| `Cached`                                                                 | 磁盘文件读取的 page cache，不含 `SwapCached`                                                                               |
| `SwapCached`                                                             | 曾被换出又换入、但仍保留在 swap 文件中的内存；再次换出时可省去 I/O                                                         |
| `Active`                                                                 | 近期被使用、非必要不会回收的内存                                                                                           |
| `Inactive`                                                               | 较少被使用、更容易被回收的内存                                                                                             |
| `Active(anon)` / `Inactive(anon)`（2.6.28+）                             | 匿名（非文件支持）内存的活跃/非活跃部分                                                                                    |
| `Active(file)` / `Inactive(file)`（2.6.28+）                             | 文件支持内存的活跃/非活跃部分                                                                                              |
| `Unevictable`（2.6.28+）                                                 | 不可被回收的内存（例如被锁定）                                                                                             |
| `Mlocked`（2.6.28+）                                                     | 被锁定（`mlock`）的内存量                                                                                                  |
| `HighTotal` / `HighFree`                                                 | 需要 `CONFIG_HIGHMEM`；highmem 总量/空闲量，highmem 是约 860 MB 以上的物理内存，内核需要额外机制访问，速度较慢             |
| `LowTotal` / `LowFree`                                                   | lowmem 总量/空闲量；lowmem 除用户态用途外，也用于内核自身数据结构（如 Slab），耗尽会有问题                                 |
| `SwapTotal` / `SwapFree`                                                 | swap 空间总量/当前未使用量                                                                                                 |
| `Dirty`                                                                  | 等待写回磁盘的内存                                                                                                         |
| `Writeback`                                                              | 正在写回磁盘的内存                                                                                                         |
| `AnonPages`（2.6.18+）                                                   | 映射到用户空间页表的非文件支持页                                                                                           |
| `Mapped`                                                                 | 通过 `mmap(2)` 映射到内存的文件（如库文件）                                                                                |
| `Shmem`（2.6.32+）                                                       | tmpfs、System V/POSIX 共享内存、`MAP_SHARED\|MAP_ANONYMOUS` 共享匿名映射占用的内存                                         |
| `KReclaimable`（4.20+）                                                  | 内存压力下内核会尝试回收的分配，包含 `SReclaimable` 及其他带 shrinker 的直接分配                                           |
| `Slab`                                                                   | 内核数据结构缓存，详见 [slabinfo(5)](https://man7.org/linux/man-pages/man5/slabinfo.5.html)                                |
| `SReclaimable`（2.6.19+）                                                | `Slab` 中可被回收的部分（如缓存）                                                                                          |
| `SUnreclaim`（2.6.19+）                                                  | `Slab` 中内存压力下不可回收的部分                                                                                          |
| `KernelStack`（2.6.32+）                                                 | 分配给内核栈的内存量                                                                                                       |
| `PageTables`（2.6.18+）                                                  | 最底层页表占用的内存量                                                                                                     |
| `NFS_Unstable`（2.6.18+）                                                | 已发送到 NFS 服务端但尚未提交到稳定存储的页                                                                                |
| `Bounce`（2.6.18+）                                                      | 块设备 "bounce buffer" 占用的内存                                                                                          |
| `WritebackTmp`（2.6.26+）                                                | FUSE 临时写回缓冲占用的内存                                                                                                |
| `CommitLimit`（2.6.10+）                                                 | 系统当前可分配的内存总量；仅在 `/proc/sys/vm/overcommit_memory=2`（严格 overcommit）时生效                                 |
| `Committed_AS`                                                           | 系统当前已分配（commit）的内存总量，是所有进程申请内存的总和，不代表实际已使用量                                           |
| `VmallocTotal`                                                           | vmalloc 内存区域总大小                                                                                                     |
| `VmallocUsed`                                                            | vmalloc 区域已用量；Linux 4.4+ 不再计算，固定为 0，参考 `/proc/vmallocinfo`                                                |
| `VmallocChunk`                                                           | vmalloc 区域最大连续空闲块；Linux 4.4+ 不再计算，固定为 0                                                                  |
| `HardwareCorrupted`（2.6.32+）                                           | 需要 `CONFIG_MEMORY_FAILURE`，未进一步文档化                                                                               |
| `LazyFree`（4.12+）                                                      | 被 `madvise(2) MADV_FREE` 标记的内存量                                                                                     |
| `AnonHugePages`（2.6.38+）                                               | 需要 `CONFIG_TRANSPARENT_HUGEPAGE`；映射到用户空间的非文件支持 huge page                                                   |
| `ShmemHugePages`（4.8+）                                                 | 需要 `CONFIG_TRANSPARENT_HUGEPAGE`；shmem/tmpfs 使用 huge page 分配的内存                                                  |
| `ShmemPmdMapped`（4.8+）                                                 | 需要 `CONFIG_TRANSPARENT_HUGEPAGE`；以 huge page 映射到用户空间的共享内存                                                  |
| `CmaTotal` / `CmaFree`（3.1+）                                           | 需要 `CONFIG_CMA`；CMA（Contiguous Memory Allocator）总页数/空闲页数                                                       |
| `HugePages_Total` / `HugePages_Free`                                     | 需要 `CONFIG_HUGETLB_PAGE`；huge page 池大小/池中尚未分配的数量                                                            |
| `HugePages_Rsvd`（2.6.17+）                                              | 已承诺分配但尚未实际分配的 huge page 数量，保证故障时能从池中取到                                                          |
| `HugePages_Surp`（2.6.24+）                                              | 池中超出 `/proc/sys/vm/nr_hugepages` 的数量，上限由 `/proc/sys/vm/nr_overcommit_hugepages` 控制                            |
| `Hugepagesize`                                                           | 需要 `CONFIG_HUGETLB_PAGE`；huge page 的大小                                                                               |
| `DirectMap4k` / `DirectMap4M` / `DirectMap2M` / `DirectMap1G`（2.6.27+） | 内核以 4k/4M/2M/1G 页线性映射的物理内存字节数（x86，依 `CONFIG_X86_64`/`CONFIG_X86_PAE`/`CONFIG_X86_DIRECT_GBPAGES` 而定） |

:::tip

`VmallocUsed`、`VmallocChunk` 自 Linux 4.4 起固定返回 0，不代表实际状态，需要查 `/proc/vmallocinfo`。

:::
