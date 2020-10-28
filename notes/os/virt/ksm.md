---
title: KSM
---

# KSM

- https://www.linux-kvm.org/page/KSM
- https://en.wikipedia.org/wiki/Kernel_same-page_merging
- https://www.kernel.org/doc/Documentation/vm/ksm.txt

```bash
# 启用
echo 1 > /sys/kernel/mm/ksm/run
# 在宿主机上查看 KSM 状态
# 如果有合并则 pages_shared 不为 0
grep . /sys/kernel/mm/ksm/*

# 页大小，默认 4k
getconf PAGE_SIZE

# 实际节省
echo $(($(sysctl -n /sys/kernel/mm/ksm/pages_sharing) - $(sysctl -n /sys/kernel/mm/ksm/pages_shared)))
```

| item           | desc                     |
| -------------- | ------------------------ |
| pages_shared   | 合并后页                 |
| pages_sharing  | 实际页                   |
| pages_unshared | 未能合并页               |
| pages_volatile | 变化太快未能放到树中跟踪 |
