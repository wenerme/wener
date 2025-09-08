---
title: sys/mman.h
alias:
  - mman.h
---

## sys/mman.h

- 内存管理
- 参考
  - https://git.musl-libc.org/cgit/musl/tree/include/sys/mman.h
    - https://github.com/kraj/musl/blob/kraj/master/include/sys/mman.h
  - https://github.com/bminor/glibc/tree/master/include/sys/mman.h
  - https://github.com/bminor/glibc/blob/master/misc/sys/mman.h
  - https://github.com/torvalds/linux/blob/master/include/linux/mman.h

```c
// 锁定部分进程地址空间
int mlock(const void *, size_t);
// 锁定进程地址空间
int mlockall(int);
// 建立内存映射
void *mmap(void *, size_t, int, int, int, off_t);
// 为内存映射设置保护, 修改 mmap 时的保护设置
int mprotect(void *, size_t, int);
// 同步内存到物理存储
int msync(void *, size_t, int);
// 解锁部分进程地址空间
int munlock(const void *, size_t);
// 解锁进程地址空间
int munlockall(void);
// 取消内存映射页
int munmap(void *, size_t);


// mmap
// 访问保护设置
const PROT_READ // 可读
const PROT_WRITE // 可写
const PROT_EXEC // 可执行
const PROT_NONE // 不能被访问

const MAP_SHARED // 修改为共享
const MAP_PRIVATE // 修改为私有
const MAP_FIXED // Interpret addr exactly.

// msync
const MS_ASYNC // 异步写
const MS_SYNC // 同步写
const MS_INVALIDATE // 使缓存时效

// mlocalall
const MCL_CURRENT // 锁定当前映射页
const MCL_FUTURE // 锁定将来会被映射页


// _GNU_SOURCE 扩展函数

/**
 * 调整已有内存映射大小和位置
 * @param old_addr 原映射区域的起始地址
 * @param old_len 原映射区域的长度
 * @param new_len 新的映射区域长度
 * @param flags 重映射标志 (MREMAP_MAYMOVE, MREMAP_FIXED)
 * @param ... 可选的新地址参数 (当使用 MREMAP_FIXED 时)
 * @return 成功时返回新的映射地址，失败时返回 MAP_FAILED
 * @note 可以扩展、收缩或移动现有的内存映射区域
 */
void *mremap(void *old_addr, size_t old_len, size_t new_len, int flags, ...);

/**
 * 重新映射文件页到不同的虚拟地址 (已弃用，Linux 2.6.16 后移除)
 * @param addr 映射区域的起始地址
 * @param size 映射区域的大小，必须是页大小的倍数
 * @param prot 内存保护标志 (PROT_READ, PROT_WRITE, PROT_EXEC)
 * @param pgoff 文件中的页偏移量
 * @param flags 映射标志
 * @return 成功时返回 0，失败时返回 -1
 * @deprecated 此函数已被弃用，不建议使用
 */
int remap_file_pages(void *addr, size_t size, int prot, size_t pgoff, int flags);

/**
 * 创建匿名文件并返回文件描述符，可用于 mmap
 * @param name 文件名称（仅用于调试，不会在文件系统中创建实际文件）
 * @param flags 创建标志 (MFD_CLOEXEC, MFD_ALLOW_SEALING, MFD_HUGETLB 等)
 * @return 成功时返回文件描述符，失败时返回 -1
 * @note 创建的文件存在于内存中，可以像普通文件一样进行 read/write/mmap 操作
 */
int memfd_create(const char *name, unsigned int flags);

/**
 * 锁定内存页，支持额外标志位 (Linux 4.4+)
 * @param addr 要锁定的内存区域起始地址
 * @param len 要锁定的内存区域长度
 * @param flags 锁定标志 (MLOCK_ONFAULT 等)
 * @return 成功时返回 0，失败时返回 -1
 * @note 相比 mlock()，支持 MLOCK_ONFAULT 标志实现按需锁定
 */
int mlock2(const void *addr, size_t len, unsigned int flags);

```

### mmap

```c
#include <sys/mman.h>

/**
 * @brief 将文件或设备映射到内存
 *
 * 将从 addr 附近开始，长度为 len 字节的地址空间进行映射。
 * 映射到文件描述符 fildes 所描述的文件的 off 偏移处，映射方式由 prot 和 flags 决定。
 * 如果 addr 非零，则它表示期望的映射起始地址。
 * 如果 flags 中设置了 MAP_FIXED 位，映射将精确地位于 addr（该地址必须是页对齐的）；
 * 否则系统会选择一个方便的附近地址。
 *
 * @return 成功时返回实际选择的映射地址，出错则返回 MAP_FAILED（并设置 `errno`）。
 *         一次成功的 `mmap` 调用会解除受影响区域内任何先前的映射。
 */
void *mmap(
  void *addr,   // 期望的映射起始地址, 通常为 NULL, 由内核选择
  size_t len,   // 映射的长度
  int prot,     // 内存保护标志 (PROT_READ, PROT_WRITE, ...)
  int flags,    // 映射对象的类型和属性 (MAP_SHARED, MAP_PRIVATE, ...)
  int fildes,   // 文件描述符
  off_t off     // 文件偏移量
);
```

建立进程地址空间到内存对象之间的映射,支持以下内存对象

- 常规文件
- _SHM_ 共享内存对象
- _TYM_ Typed memory object
  - [posix_typed_mem_open](http://pubs.opengroup.org/onlinepubs/9699919799/functions/posix_typed_mem_open.html)
    用于打开一个 Typed memory object
- MAP_SHARED 修改内存时其他进程可见;
- MAP_PRIVATE 修改时其他进程不可见, 并且 **不会修改底层对象** .
- MAP_FIXED 指定后,返回值即`addr`,该操作会替换之前的映射,不推荐使用.

支持内存保护的硬件能够很好地支持 MAP_PRIVATE, 在不支持的硬件上可能会形成一份完整的拷贝,这和 `read` 类似.

### 内存锁

用于对性能要求非常高的场景(即便是一次内存交换也会对性能有所影响)和对安全要求较高的常见(不允许内存被交换到磁盘).

- 内存不会被交换到磁盘
- 操作时间固定
- 不受页交换延迟影响
- 锁不能叠加
- 该操作会影响其他进程,如果文件映射 `mlockall` 会导致内存占用量不断增长

- [mlock - manpage](http://linux.die.net/man/2/mlock)
- [Locked Memory Details](http://www.gnu.org/software/libc/manual/html_node/Locked-Memory-Details.html)

## Example

<!-- _SC_PAGESIZE 之所以加 \ 是因为 atom 不加这个会语法高亮错误 -->

```c
// 获取内存页大小
long sz = sysconf(_SC_PAGESIZE);
```

```c
fildes = open(...)
lseek(fildes, some_offset)
read(fildes, buf, len)
/* Use data in buf. */

// becomes:

fildes = open(...)
address = mmap(0, len, PROT_READ, MAP_PRIVATE, fildes, some_offset)
/* Use data at address. */
```

## Reference

- [mmap - susv4](http://pubs.opengroup.org/onlinepubs/9699919799/functions/mmap.html)
