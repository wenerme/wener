---
title: 能力管理
---

# Capabilities

- [capabilities.7](http://man7.org/linux/man-pages/man7/capabilities.7.html)
  - 自 2.2 将 root 权限拆分为多个能力
  - 能力是线程级别的属性
- 主要能力
  - CAP_NET_ADMIN
    - 网卡配置
    - IP 管理
    - 路由表
    - 建立广播
  - CAP_SYS_ADMIN
    - 挂载、赔额
    - 主机名

"cap_chown",
"cap_dac_override",
"cap_dac_read_search",
"cap_fowner",
"cap_fsetid",
"cap_kill",
"cap_setgid",
"cap_setuid",
"cap_setpcap",
"cap_linux_immutable",
"cap_net_bind_service",
"cap_net_broadcast",
"cap_net_admin",
"cap_net_raw",
"cap_ipc_lock",
"cap_ipc_owner",
"cap_sys_module",
"cap_sys_rawio",
"cap_sys_chroot",
"cap_sys_ptrace",
"cap_sys_pacct",
"cap_sys_admin",
"cap_sys_boot",
"cap_sys_nice",
"cap_sys_resource",
"cap_sys_time",
"cap_sys_tty_config",
"cap_mknod",
"cap_lease",
"cap_audit_write",
"cap_audit_control",
"cap_setfcap",
"cap_mac_override",
"cap_mac_admin",
"cap_syslog",
"35",
"36+ep"
