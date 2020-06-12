---
id: htop
title: htop
---

# htop

## Tips
* [htop explained](https://peteris.rocks/blog/htop/)
* 内存
  * VIRT/VSZ - Virtual Image - 虚拟镜像
    * 意义不大
    * 所用到的虚拟内存，包含所有代码、数据、共享包、交换区页、映射但未使用页
    * 应用申请 1GB 但只用 1MB 也会计算为 1G。
    * 如果 mmap 1G 的文件，但未使用，也算 1G。
  * RES/RSS - Resident size - 常驻内存
    * 未被交换的物理内存
    * 不包含在交换区的内存
    * 部分内存可能与其他进程共享
    * 例如一个 1GB 的 进程 fork 后，新的进程也会占用 1G，但实际只用到了 1G。Linux 会对内存 写时复制。
  * SHR - Shared Mem size - 共享内存
    * 进程用到的共享内存
    * 内存可能被共享，但不一定已经被其他进程共享使用。
    