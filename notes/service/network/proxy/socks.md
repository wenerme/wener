---
tags:
  - Protocol
---

# Socks

- socks4
  - 不支持认证，只能 匿名
  - 不支持 IPv6
  - 不支持 UDP, 只支持 TCP(CONNECT)
- socks4a
- socks5
  - 支持匿名、GSSAPI、用户名密码认证
  - 支持 IPv6
  - 支持 UDP 关联(UDP ASSOCIATE), BIND, CONNECT
- 参考
  - [RFC 1928](https://tools.ietf.org/html/rfc1928)
    - SOCKS Protocol Version 5
  - [RFC 1929](https://tools.ietf.org/html/rfc1929)
    - Username/Password Authentication for SOCKS V5
  - [RFC 1961](https://tools.ietf.org/html/rfc1961)
    - GSS-API Authentication Method for SOCKS Version 5
  - [RFC 3089](https://tools.ietf.org/html/rfc3089)
    - A SOCKS-based IPv6/IPv4 Gateway Mechanism

## Socks5

**协商**

```
+-----+----------+----------+
| VER | NMETHODS | METHODS  |
+-----+----------+----------+
| 1   |    1     | 1 to 255 |
+-----+----------+----------+
```

- VER: 版本号 (1 字节，固定为 5)
- NMETHODS: 支持的认证方法数量 (1 字节)
- METHODS: 支持的认证方法列表 (1 到 255 字节)
  - 0x00: 不需要认证
  - 0x01: GSSAPI
  - 0x02: 用户名/密码认证
  - 0x03-0x7F: IANA 分配
  - 0x80-0xFE: 私有方法保留
  - 0xFF: 无可接受的方法

**请求**

```
+-----+-----+-------+------+----------+----------+
| VER | CMD |  RSV  | ATYP | DST.ADDR | DST.PORT |
+-----+-----+-------+------+----------+----------+
|  1  |  1  | X'00' |  1   | Variable |    2     |
+-----+-----+-------+------+----------+----------+
```

- CMD
  - 0x01: CONNECT
  - 0x02: BIND
  - 0x03: UDP ASSOCIATE
- ATYP (地址类型)
  - 0x01: IPv4
  - 0x03: 域名
  - 0x04: IPv6

## Socks4

```
+----+----+----------+----------+----------+
| VN | CD | DSTPORT  | DSTIP    | USERID   |
+----+----+----------+----------+----------+
| 1  | 1  |    2     |    4     | variable |
+----+----+----------+----------+----------+
```

- VN: 版本号 (1 字节，固定为 4)
- CD: 命令代码 (1 字节)
  - 0x01: CONNECT
  - 0x02: BIND
- DSTPORT: 目标端口 (2 字节)
- DSTIP: 目标 IPv4 地址 (4 字节)
- USERID: 用户 ID (变长，以 null 结尾)

**响应**

```
+----+----+----------+----------+
| VN | CD | DSTPORT  | DSTIP    |
+----+----+----------+----------+
| 1  | 1  |    2     |    4     |
+----+----+----------+----------+
```

- CD: 响应代码
  - 0x5A: 请求通过
  - 0x5B: 请求被拒绝
  - 0x5C: 请求失败（无法连接到 identd）
  - 0x5D: 请求失败（identd 用户 ID 不匹配）
