---
title: iostat
---

# iostat

- [iostat.1](https://man7.org/linux/man-pages/man1/iostat.1.html)

```bash
iostat -cdxy 2
```

| column   |
| -------- | -------------------------------------------------------------------------------------------------------- |
| %user    | CPU usage at the normal user level                                                                       |
| %nice    | CPU usage at the user level with priorities                                                              |
| %system  | CPU utilization that occurred while executing at the system level (kernel)                               |
| %iowait  | CPUs were idle and the system received I/O requests                                                      |
| %steal   | involuntary wait by the virtual CPU or CPUs while the hypervisor was servicing another virtual processor |
| %idle    | CPU or CPUs were idle and the system did not have an outstanding disk I/O request                        |
| tps      | r/s+w/s+d/s+f/s                                                                                          |
| r/s      | read/second                                                                                              |
| w/s      | write/second                                                                                             |
| d/s      | discard/second                                                                                           |
| f/s      | flush/second                                                                                             |
| %rrqm    | read requests merged                                                                                     |
| %util    | Percentage of elapsed time during which I/O requests were issued to the device                           |
| avgqu-sz |
| svctm    | average amount of time an operation takes                                                                |

- 串行和并行 存储设备参考逻辑上有差异
- 并行设备无参考价值的信息: svctm, %util
- 参考
  - [Two traps in iostat: %util and svctm](https://brooker.co.za/blog/2014/07/04/iostat-pct.html)
