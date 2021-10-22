---
title: udhcpc
---

# udhcpc

- 默认配置 /etc/udhcpc/udhcpc.conf
  - RESOLV_CONF=no - 不修改 resolve.conf
- 默认脚本 /usr/share/udhcpc/default.script
  - 获取到配置后，调用脚本进行配置
  - udhcpc.conf 内变量影响配置逻辑
- signals
  - SIGUSR1 - 刷新状态，会从新获取 IP
  - SIGUSR2 - 释放当前租约，进入不活跃状态，发送 SIGUSR1 信号可激活
- 参考
  - https://udhcp.busybox.net/README.udhcpc
  - https://wiki.alpinelinux.org/wiki/Udhcpc

```bash
# 手动申请地址
udhcpc -i eth1 -q
```

## default.script

**脚本变量**

| env       | desc                                            |
| --------- | ----------------------------------------------- |
| `$HOME`   | `$HOME` 变量或 "/"                              |
| `$PATH`   | `$PATH` 变量或 "/bin:/usr/bin:/sbin:/usr/sbin"  |
| `$1`      | action                                          |
| interface | interface                                       |
| ip        | ip                                              |
| siaddr    | bootp next server option                        |
| sname     | bootp server name option                        |
| boot_file | bootp boot file option                          |
| subnet    | subnet mask                                     |
| timezone  | Offset in seconds from UTC                      |
| router    | A list of routers                               |
| timesvr   | A list of time servers                          |
| namesvr   | A list of IEN 116 name servers                  |
| dns       | A list of DNS server                            |
| logsvr    | A list of MIT LCS UDP log servers               |
| cookiesvr | A list of RFC 865 cookie servers                |
| lprsvr    | A list of LPR servers                           |
| hostname  | The assigned hostname                           |
| bootsize  | The length in 512 octect blocks of the bootfile |
| domain    | The domain name of the network                  |
| swapsvr   | The IP address of the client's swap server      |
| rootpath  | The path name of the client's root disk         |
| ipttl     | The TTL to use for this network                 |
| mtu       | The MTU to use for this network                 |
| broadcast | The broadcast address for this network          |
| ntpsrv    | A list of NTP servers                           |
| wins      | A list of WINS servers                          |
| lease     | The lease time, in seconds                      |
| dhcptype  | DHCP message type (safely ignored)              |
| serverid  | The IP of the server                            |
| message   | Reason for a DHCPNAK                            |
| tftp      | The TFTP server name                            |
| bootfile  | The bootfile name                               |
