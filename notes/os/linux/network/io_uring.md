---
title: io_uring
---

# io_uring

Zero Copy, ring bazed communication channel.

- Linux v5.1 - 2019-03-03
- 场景
  - userspace <-> kernel 数据交互
  - async io
- SQ - Submission Queue - `struct io_uring_sqe`
  - 应用
  - 维护 tail, kernel 消费 head
- CQ - Completion Queue - `struct io_uring_cqe`
  - Kernel
  - 维护 tail, 应用 消费 head


```c
int io_uring_setup(u32 nentries, struct io_uring_params *p);
int io_uring_enter(int ring_fd, u32 to_submit, u32 min_complete, u32 flags, sigset_t *sigset);

struct io_uring_params {
  __u32 sq_entries;
  __u32 cq_entries;
  __u32 flags;
  __u32 sq_thread_cpu;
  __u32 sq_thread_idle;
  __u32 features;
  __u32 resv[4];
  struct io_sqring_offsets sq_off;
  struct io_cqring_offsets cq_off;
};

struct io_sqring_offsets {
  __u32 head;
  __u32 tail;
  __u32 ring_mask;
  __u32 ring_entries;
  __u32 flags;
  __u32 dropped;
  __u32 array;
  __u32 resv1;
  __u64 resv2;
};

#define IORING_OFF_SQ_RING 0ULL
#define IORING_OFF_CQ_RING 0x8000000ULL
#define IORING_OFF_SQES 0x10000000ULL

// 通过 mmap 建立通道
sq->ring_ptr = mmap(
  0,sq->ring_sz,
  PROT_READ|PROT_WRITE|MAP_SHARED|MAP_POPULATE,
  ring_fd,
  IORING_OFF_SQ_RING
  );
```

- opcode
  - nop
  - readv, writev, fsync, read_fixed, write_fixed
  - poll_add, poll_remove, sync_file_range, sendmsg, recvmsg, timeout
- liburing - 简化操作
- Golang
  - [go#31908](https://github.com/golang/go/issues/31908)
    internal/poll: transparently support new linux io_uring interface
  - [dshulyak/uring](https://github.com/dshulyak/uring)
  - [godzie44/go-uring](https://github.com/godzie44/go-uring)
- used by
  - [btrfs] Linux 6.1 支持 io_uring
    - 性能提升明显
  - zfs 支持 io_uring 接口
  - Rust, C++ IO executors
  - Ceph blustore
  - libuv
  - Postgres
    - https://github.com/anarazel/postgres/tree/aio
    - https://anarazel.de/talks/2020-01-31-fosdem-aio/aio.pdf
  - RocksDB, MyRocks
  - TyrDB, DragonflyDB
- aio 500K iops/core
- io_uring 1-2M iops/core - 2-4x
- 参考
  - https://git.kernel.dk/fio
  - 2019 https://kernel.dk/io_uring.pdf
  - 2022 https://kernel.dk/io_uring-whatsnew.pdf
  - January 15, 2019 https://lwn.net/Articles/776703/
    Ringing in a new asynchronous I/O API
  - https://lwn.net/Articles/779472/
  - https://man.archlinux.org/man/io_uring.7.en
  - Kernel Recipes 2019 - Faster IO through io_uring https://youtu.be/-5T4Cjw46ys
  - Windows 11 ioring
    - [IoRing vs. io_uring: a comparison of Windows and Linux implementations](https://windows-internals.com/ioring-vs-io_uring-a-comparison-of-windows-and-linux-implementations/)
