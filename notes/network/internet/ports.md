---
title: 常见端口号
---

# Port

| protocol               | plain | secure |
| ---------------------- | ----- | ------ |
| HTTP,HTTPS             | 80    | 443    |
| LDAP,LDAPS             | 389   | 636    |
| SMTP                   | 25    | 465    |
| POP3S,POP3S            | 110   | 995    |
| TURN/STURN             |
| IMAP,IMAPS             | 220   | 993    |
| DNS over QUIC/TLS/DTLS | 53    | 853    |

- over TLS/SSL/DTLS/QUIC

## Well-known ports

- Well-known 端口
  - 端口号 < 1024

| Port   | for                               |
| ------ | --------------------------------- |
| 9      | Discard Protocol<br/> Wake on LAN |
| 22     | SSH                               |
| 23     | Telnet                            |
| 25     | SMTP                              |
| 43     | WHOIS                             |
| 53     | DNS                               |
| 67/UDP | BOOTP Server                      |
| 68/UDP | BOOTP Client                      |
| 69/UDP | TFTP                              |
| 70     | Gopher                            |
| 80     | HTTP, QUIC                        |
| 88     | Kerberos                          |
| 123    | NTP                               |
| 137    | NetBIOS Name Service              |
| 138    | NetBIOS Datagram Service          |
| 139    | NetBIOS Session Service           |
| 179    | BGP                               |
| 194    | IRC                               |
| 220    | IMAPv3                            |
| 264    | BGMP                              |
| 389    | LDAP                              |
| 443    | HTTPS                             |
| 514    | syslog                            |
| 546    | DHCPv6 Client                     |
| 547    | DHCPv6 Server                     |
| 548    | AFP                               |
| 554    | RTSP                              |
| 873    | rsync                             |

## Registered ports

> 官方注册端口，既定事实端口。

| Port      | for                                                                              |
| --------- | -------------------------------------------------------------------------------- |
| 1080      | SOCKS/HTTP Proxy                                                                 |
| 3306      | MySQL                                                                            |
| 5432      | PostgreSQL                                                                       |
| 6379      | Redis                                                                            |
| 32274     | FabricRPC                                                                        |
| 5900      | RFB<br/>VNC                                                                      |
| 3478      | STUN<br/>TURN<br/>STUN Behavior Discovery                                        |
| 5349      | STUN over TLS/DTLS<br/> TURN over TLS/DTLS<br/> STUN Behavior Discovery over TLS |
| 6000-6063 | X11 Client/Server                                                                |

## Application ports

> 非官方，但实际使用常见的端口

| Port | for                  |
| ---- | -------------------- |
| 6443 |
| 8080 |
| 3000 |
| 2197 | APNS HTTP/2 JSON API |

- IANA [Service Name and Transport Protocol Port Number Registry](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml)
- [List of TCP and UDP port numbers](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers)
