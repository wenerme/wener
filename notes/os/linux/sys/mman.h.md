---
title: sys/mman.h
---

## sys/mman.h - 内存管理定义

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
```

### mmap

```c
#include <sys/mman.h>

void *mmap(void \*addr, size_t len, int prot, int flags,int fildes, off_t off);
```

建立进程地址空间到内存对象之间的映射,支持以下内存对象

- 常规文件
- _SHM_ 共享内存对象
- _TYM_ Typed memory object
  - [posix_typed_mem_open](http://pubs.opengroup.org/onlinepubs/9699919799/functions/posix_typed_mem_open.html)
    用于打开一个 Typed memory object

MAP_SHARED 修改内存时其他进程可见;MAP_PRIVATE 修改时其他进程不可见, 并且不会修改底层对象.
MAP_FIXED 指定后,返回值即`addr`,该操作会替换之前的映射,不推荐使用.

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
