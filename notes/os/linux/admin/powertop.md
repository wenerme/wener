---
tags:
  - Tuning
---

# powertop

- [fenrus75/powertop](https://github.com/fenrus75/powertop)
  - GPLv2, C
  - by Intel in 2007
  - `powertop` 是一个 Linux 命令行工具，用于分析系统功耗、找出耗电最多的软件和硬件，并帮助进行节能优化。
- Idle stats (空闲统计) 显示处理器 C-state 状态。
- Frequency stats (频率统计) 显示处理器 P-state 状态。
- Device stats (设备统计) 显示各个设备的估计功耗。
- Tunables (可调参数) 显示可以调整以节省功耗的设置。
- RAPL (Running Average Power Limit)
  - 监控和限制 CPU 包（Package）、核心（Cores）、内存控制器（DRAM）甚至集成显卡（GPU/uncore）的功耗

```bash
# 生成报告
powertop --html
# 自动调优
powertop --auto-tune
```

```bash
sysctl vm.dirty_writeback_centisecs
```

```ini
# PowerTOP

# VM writeback timeout
vm.dirty_writeback_centisecs = 1500
# NMI watchdog should be turned off
kernel.nmi_watchdog = 0
```
