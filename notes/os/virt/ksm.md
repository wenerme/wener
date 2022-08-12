---
title: KSM
---

# KSM

- 是什么？
  - Kernel Same page Mergeing - 内核相同页合并
  - Linux 2.6.32+ - CONFIG_KSM=y
- 使用场景
  - 虚拟机多开 - 大部分执行内容都差不多, 合并后相同内容只占一份内存
- 参考
  - https://www.linux-kvm.org/page/KSM
  - https://en.wikipedia.org/wiki/Kernel_same-page_merging
  - https://www.kernel.org/doc/Documentation/vm/ksm.txt
- 注意
  - ksm 扫描 page 是循序渐进的过程，需要比较长的时间，因此效果不是立即看得到

```bash
# 在 Host 启用
echo 1 > /sys/kernel/mm/ksm/run
# 在宿主机上查看 KSM 状态
# 如果有合并则 pages_shared 不为 0
grep . /sys/kernel/mm/ksm/*

# 页大小，默认 4k
getconf PAGE_SIZE

# 实际节省 page
echo $(($(sysctl -n /sys/kernel/mm/ksm/pages_sharing) - $(sysctl -n /sys/kernel/mm/ksm/pages_shared)))
# 节省内存
# numfmt 由 coreutils 提供
echo $((($(cat /sys/kernel/mm/ksm/pages_sharing) - $(cat /sys/kernel/mm/ksm/pages_shared)) * $(getconf PAGE_SIZE))) | numfmt --to=iec-i

echo $(($(cat /sys/kernel/mm/ksm/pages_sharing) * $(getconf PAGE_SIZE))) | numfmt --to=iec-i
echo $(($(cat /sys/kernel/mm/ksm/pages_volatile) * $(getconf PAGE_SIZE))) | numfmt --to=iec-i
echo $(($(cat /sys/kernel/mm/ksm/pages_unshared) * $(getconf PAGE_SIZE))) | numfmt --to=iec-i
```

| item             | desc                                        | default |
| ---------------- | ------------------------------------------- | ------- |
| pages_shared     | 合并后页                                    |
| pages_sharing    | 实际页                                      |
| pages_unshared   | 未能合并页                                  |
| pages_volatile   | 变化太快未能放到树中跟踪                    |
| full_scans       | 全扫描次数                                  |
| max_page_sharing | 最多共享次数                                | 256     |
| pages_to_scan    | 一次 sleep 扫描多少页                       | 100     |
| sleep_millisecs  | 扫描间隔                                    | 20      |
| run              | 0 stop keep merged, 1 run, 2 stop & unmerge |

- pages_sharing 高意味着效果较好
- pages_unshared 高意味着效果不好 - 可考虑关闭
- max_page_sharing 限制了最多可共享页 - 可调整
