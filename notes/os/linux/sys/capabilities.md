---
title: 能力管理
---

# Capabilities

- [capabilities.7](http://man7.org/linux/man-pages/man7/capabilities.7.html)
  - 自 2.2 将 root 权限拆分为多个能力
  - 能力是线程级别的属性

| cap | for |
| --- | --- |
| `CAP_CHOWN` | 任意修改文件 UID/GID |
| `CAP_DAC_OVERRIDE` | 绕过文件读/写/执行权限检查（DAC） |
| `CAP_DAC_READ_SEARCH` | 绕过文件读、目录读/执行权限检查；`open_by_handle_at` |
| `CAP_FOWNER` | 绕过要求 UID 匹配文件所有者的操作（chmod、utime、ACL、inode flags 等） |
| `CAP_FSETID` | 修改文件时不清除 setuid/setgid 位；设置不匹配 GID 的 setgid 位 |
| `CAP_KILL` | 绕过发送信号的权限检查 |
| `CAP_SETGID` | 任意修改进程 GID 及附属组；伪造 socket 凭证 GID；写 user namespace GID 映射 |
| `CAP_SETUID` | 任意修改进程 UID；伪造 socket 凭证 UID；写 user namespace UID 映射 |
| `CAP_SETPCAP` | 在 bounding set 内增减 inheritable 能力；修改 securebits |
| `CAP_LINUX_IMMUTABLE` | 设置 `FS_APPEND_FL`、`FS_IMMUTABLE_FL` inode flag |
| `CAP_NET_BIND_SERVICE` | 绑定 1024 以下特权端口 |
| `CAP_NET_BROADCAST` | （未使用）socket 广播、监听多播 |
| `CAP_NET_ADMIN` | 网卡配置、IP 防火墙/NAT/计费、路由表、透明代理绑定、TOS、混杂模式、多播开关等 |
| `CAP_NET_RAW` | 使用 RAW/PACKET socket；透明代理绑定 |
| `CAP_IPC_LOCK` | 锁定内存（mlock/mlockall/mmap/shmctl）；使用 huge pages |
| `CAP_IPC_OWNER` | 绕过 System V IPC 对象权限检查 |
| `CAP_SYS_MODULE` | 加载/卸载内核模块 |
| `CAP_SYS_RAWIO` | 访问 `/dev/mem`、`/dev/kmem`、原始磁盘 I/O 等 |
| `CAP_SYS_CHROOT` | 使用 `chroot(2)`；进入 mount namespace 等相关操作 |
| `CAP_SYS_PTRACE` | 跟踪任意进程（`ptrace(2)`）；读取任意进程 `/proc` 下部分信息 |
| `CAP_SYS_PACCT` | 使用 `acct(2)` 开启进程记账 |
| `CAP_SYS_ADMIN` | 大量系统管理操作：`mount`、`umount`、`pivot_root`、`swapon/off`、`sethostname`、`setdomainname`、特权 `syslog`（历史遗留）等；语义过载，内核较新能力（`CAP_BPF`、`CAP_PERFMON`、`CAP_CHECKPOINT_RESTORE` 等）用于拆分 |
| `CAP_SYS_BOOT` | 重启系统；加载新的 kexec 镜像 |
| `CAP_SYS_NICE` | 修改任意进程 nice 值、调度策略和 CPU 亲和性 |
| `CAP_SYS_RESOURCE` | 突破多数资源限制（`RLIMIT_*`、磁盘配额等） |
| `CAP_SYS_TIME` | 修改系统时钟（`settimeofday`、`adjtimex`） |
| `CAP_SYS_TTY_CONFIG` | 特权 `vhangup(2)` 等 TTY 配置操作 |
| `CAP_MKNOD` | 使用 `mknod(2)` 创建设备文件 |
| `CAP_LEASE` | 对任意文件建立 `fcntl` lease |
| `CAP_AUDIT_WRITE` | 向内核审计日志写记录 |
| `CAP_AUDIT_CONTROL` | 开关内核审计、修改审计过滤规则、读取审计状态 |
| `CAP_SETFCAP` | 为文件设置任意能力；Linux 5.12+ 也用于 user namespace 内映射 UID 0 |
| `CAP_MAC_OVERRIDE` | 绕过强制访问控制（MAC），针对 Smack LSM 实现 |
| `CAP_MAC_ADMIN` | 配置/修改 MAC 状态，针对 Smack LSM 实现 |
| `CAP_SYSLOG` | 特权 `syslog(2)` 操作（自 2.6.37 从 `CAP_SYS_ADMIN` 拆出） |
| `CAP_AUDIT_READ` | 通过 netlink multicast socket 读取审计日志（3.16+） |
| `CAP_BLOCK_SUSPEND` | 使用可阻止系统挂起的特性（`epoll EPOLLWAKEUP` 等，3.5+） |
| `CAP_BPF` | 执行特权 BPF 操作，从 `CAP_SYS_ADMIN` 拆分（5.8+） |
| `CAP_PERFMON` | 使用性能监控机制（`perf_event_open` 等），从 `CAP_SYS_ADMIN` 拆分（5.8+） |
| `CAP_CHECKPOINT_RESTORE` | checkpoint/restore 相关操作，从 `CAP_SYS_ADMIN` 拆分（5.9+） |

- 数字编号（35/36+）对应内核尚未命名或后续新增的能力位，参考 [capability.h](https://github.com/torvalds/linux/blob/master/include/uapi/linux/capability.h) 确认具体版本的最新编号。
