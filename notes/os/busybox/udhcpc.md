---
title: udhcpc
---

# udhcpc

## Tips

- https://udhcp.busybox.net/README.udhcpc
- /usr/share/udhcpc/default.script
- https://wiki.alpinelinux.org/wiki/Udhcpc
- signals
  - SIGUSR1 - 刷新状态，会从新获取 IP
  - SIGUSR2 - 释放当前租约，进入不活跃状态，发送 SIGUSR1 信号可激活

```bash
udhcpc -i eth1 -q
```

脚本变量

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
