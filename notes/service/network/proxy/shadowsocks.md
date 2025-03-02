

# Shadowsocs

- 2012-04-20 by Clowwindy
-  very similar to SOCKS5 but encrypted and simpler
- 参考
  - 协议 https://web.archive.org/web/20151204034044/https://shadowsocks.org/en/spec/protocol.html
- 推荐的加密方式
  - 2022-blake3-aes-128-gcm
    - `openssl rand -base64 16`
  - 2022-blake3-aes-256-gcm
    - `openssl rand -base64 32`
  - 2022-blake3-chacha20-poly1305
- 其他加密方式
  - aes-256-gcm
  - aes-128-gcm
  - chacha20-poly1305 或称 chacha20-ietf-poly1305
  - xchacha20-poly1305 或称 xchacha20-ietf-poly1305
  - none 或 plain
- 2022 新协议格式提升了性能并带有完整的重放保护
## 协议 {#protocol}

```
+--------------+---------------------+------------------+----------+
| Address Type | Destination Address | Destination Port |   Data   |
+--------------+---------------------+------------------+----------+
|      1       |       Variable      |         2        | Variable |
+--------------+---------------------+------------------+----------+
```

- address type
  - 1 (IPv4)
  - 4 (IPv6)
  - 3 (hostname)
- Address
  - ipv4 -  32-bit (4-byte) big-endian integer
  - IPv6 -  compact representation (16-byte array)
  - hostname - 1-byte length + hostname

**第一个 Client -> Server 包**

```
+-------+----------+
|  IV   | Payload  |
+-------+----------+
| Fixed | Variable |
+-------+----------+
```
