---
title: hugetlbpage
---

# hugetlbpage

- Translation Lookaside Buffer, TLB
- 2MB,1GB
- 减少 TLB 压力
- 提升性能
- 锁定内存 - 不可交换
- /proc/sys/vm/nr_hugepages
- hugepages=N
  - 预留多少页
- CONFIG_HUGETLBFS
- CONFIG_HUGETLB_PAGE
- mmap MAP_HUGETLB
- hugetlbfs
- /proc/meminfo 查看使用情况
- 参考
  - https://wiki.debian.org/Hugepages
  - https://www.ibm.com/support/knowledgecenter/zh/linuxonibm/liabp/liabptunconfighp.htm
  - https://access.redhat.com/solutions/36741
  - https://docs.kernel.org/admin-guide/mm/hugetlbpage.html
  - https://web.archive.org/web/20190129035458/https://www.peuss.de/node/67
  - Java -XX:+UseLargePages
  - Qemu -mem-prealloc -mem-path /dev/hugepages/qemu/windows

```bash
# 需要的页大小 2G
HUGE_SIZE_MB=2048
# 通过查看 /proc/meminfo 文件中的 Hugepagesize 条目来识别超大页面的大小。 例如：
HUGE_PAGE_SIZE_KB=$(grep Hugepagesize /proc/meminfo | awk '{print $2}')
HUGE_PAGE_SIZE_MB=$((HUGE_PAGE_SIZE_KB / 1024))
# 计算需要的超大页面数
HUGE_PAGES_NEEDED=$(((HUGE_SIZE_MB + HUGE_PAGE_SIZE_MB - 1) / HUGE_PAGE_SIZE_MB))
# 在此示例中，您用需要的超大页面内存量除以超大页面的大小。
# 通过将超大页面数写入 /proc/sys/vm/nr_hugepages 文件来分配作为超大页面的内存。 例如：
echo $HUGE_PAGES_NEEDED > /proc/sys/vm/nr_hugepages
HUGE_PAGES_ALLOCATED=$(cat /proc/sys/vm/nr_hugepages)
# 通过将超大页面内存的大小（以字节计）写入 /proc/sys/kernel/shmmax 文件来设置共享内存的任何独立部分的最大大小： 例如：
SHMMAX_NEEDED=$((HUGE_PAGES_ALLOCATED * HUGE_PAGE_SIZE_KB * 1024))
echo $SHMMAX_NEEDED > /proc/sys/kernel/shmmax
# 设置要分配的总共享内存量：
# 通过使用 getconf 命令来识别页面（而不是超大页面）的大小。 例如：
PAGE_SIZE=$(getconf PAGE_SIZE)
# 将超大页面内存的页面数（而不是超大页面数）写入 /proc/sys/kernel/shmall 文件。 例如：
SHMALL_NEEDED=$((SHMMAX_NEEDED / PAGE_SIZE))
echo $SHMALL_NEEDED > /proc/sys/kernel/shmall

# 挂载后即可开始使用
mkdir -p /dev/hugepages
mount -t hugetlbfs hugetlbfs /dev/hugepages
# fstab
# hugetlbfs    /dev/hugepages    hugetlbfs    defaults    0 0

# 查看
cat /proc/meminfo | grep Huge
```
