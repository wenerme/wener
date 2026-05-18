---
tags:
  - FAQ
---

# macOS 开发 FAQ

| abbr. | stand for                   | cn             | notes |
| ----- | --------------------------- | -------------- | ----- |
| SIP   | System Integrity Protection | 系统完整性保护 |
| AMFI  | Apple Mobile File Integrity |                |
| TCC   |

## 内存扫描

- 不关闭 SIP 的情况，大多都不能扫描内存
- `task_for_pid`
- `mach_vm_region`
- `mach_vm_read`
- `mach_vm_read_overwrite`
- `vm_region_recurse_64`
- `mach_vm_protect`
- SIP 保护
  - `WindowServer`
  - `launchd`
  - Apple 系统服务
  - 部分 Finder/Dock 相关进程
- securityd 等安全相关进程

---

- Hardened Runtime
