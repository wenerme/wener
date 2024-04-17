---
title: 常见端口号
---

# Port

| range       | for                       | notes   |
| ----------- | ------------------------- | ------- |
| 0-1023      | System                    | by IANA |
| 1024-49151  | User                      | by IANA |
| 49152-65535 | Dynamic & Private         | by IANA |
| 32768–60999 | Linux ip_local_port_range |
| 32768–65535 | Solaris OS, AIX OS        |
| 1024–65535  | RFC 6056                  |
| 30000–32767 | Kubernetes NodePort       |

> 如果自己需要定义固定端口，建议控制在 10000-30000 以内

- `sysctl net.ipv4.ip_local_port_range`
- 参考
  - [Ephemeral port](https://en.wikipedia.org/wiki/Ephemeral_port)
  - [Service Name and Transport Protocol Port Number Registry](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml)

```bash
# https://www.kernel.org/doc/html/latest//networking/ip-sysctl.html#ip-variables
cat /proc/sys/net/ipv4/ip_local_port_range
cat /proc/sys/net/ipv4/ip_local_reserved_ports
```

| plain | secure | protocol               |
| ----- | ------ | ---------------------- |
| 25    | 465    | SMTP                   |
| 53    | 853    | DNS over QUIC/TLS/DTLS |
| 80    | 443    | HTTP,HTTPS             |
| 110   | 995    | POP3S,POP3S            |
| 220   | 993    | IMAP,IMAPS             |
| 389   | 636    | LDAP,LDAPS             |
| 3478  | 5349   | TURN/STURN             |
| 3306  |        | MySQL                  |
| 5432  |        | PostgreSQL             |
| 6379  |        | Redis                  |
| 8080  | 8443   | HTTP Alt               |
| 27017 |        | Mongo                  |

- over TLS/SSL/DTLS/QUIC
- Cloudflare’s proxy [Network ports](https://developers.cloudflare.com/fundamentals/reference/network-ports/)
  - Cloudflare Access 不支持自定义端口
  - 前端请求也得用这些端口，而不能 80-> 8080
  - HTTP
    - 80
    - 8080
    - 8880
    - 2052
    - 2082
    - 2086
    - 2095
  - HTTPS
    - 443
    - 2053
    - 2083
    - 2087
    - 2096
    - 8443
  - Cache Disabled
    - 2052
    - 2053
    - 2082
    - 2083
    - 2086
    - 2087
    - 2095
    - 2096
    - 8880
    - 8443

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

| Port            | for                            |
| --------------- | ------------------------------ |
| 2197            | APNS HTTP/2 JSON API           |
| 3000            | Node.js Web                    |
| 6443            | Kubernetes API                 |
| 8080            | HTTL Alt                       |
| 4222            | NATS 客户端                    |
| 8222            | NATS HTTP 管理和信息上报       |
| 6222            | NATS 集群路由                  |
| 7422            | NATS Leaf Node                 |
| 21115-21117/TCP | RustDesk Server                |
| 21116/UDP       | RustDesk Server                |
| 21119/TCP       | RustDesk Server for Web Client |
| 21118/TCP       | RustDesk Server for Web Client |

- IANA [Service Name and Transport Protocol Port Number Registry](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml)
- [List of TCP and UDP port numbers](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers)
