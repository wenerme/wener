---
tags:
  - Protocol
---

# Shadowsocks

- 2012-04-20 by Clowwindy
- very similar to SOCKS5 but encrypted and simpler
- 推荐的加密方式
  - Blake3 作为密钥生成函数
    - 原始默认 KDF 为 MD5
  - 2022-blake3-aes-128-gcm
    - `openssl rand -base64 16`
  - 2022-blake3-aes-256-gcm
    - `openssl rand -base64 32`
  - 2022-blake3-chacha20-poly1305
- 2022 AEAD / Authenticated Encryption with Associated Data
  - 同时保证数据的保密性和完整性：AEAD 在加密数据的同时，还能生成一个认证标签（MAC），确保数据在传输过程中没有被篡改。
  - 支持附加数据：除了要加密的数据，AEAD 还可以对一些不需要加密但需要认证的数据（比如报文头部）进行保护，这部分数据称为附加数据（Associated Data）。
  - 抗篡改能力：使用 AEAD 加密的数据，如果在传输过程中被修改，解密时会失败，从而保证了数据的真实性和完整性。
  - AES-GCM
  - golang.org/x/crypto/chacha20poly1305
  - 避免 DPI
- 其他加密方式
  - aes-256-gcm
  - aes-128-gcm
  - chacha20-poly1305 或称 chacha20-ietf-poly1305
  - xchacha20-poly1305 或称 xchacha20-ietf-poly1305
  - dummy, none, plain
  - github.com/shadowsocks/go-shadowsocks2
    - dummy, chacha20-ietf-poly1305, aes-256-gcm, aes-128-gcm
  - ~~github.com/shadowsocks/shadowsocks-go~~ - 这些都尽量不要用
    - aes-128-cfb
    - aes-192-cfb
    - aes-256-cfb
    - aes-128-ctr
    - aes-192-ctr
    - aes-256-ctr
    - des-cfb
    - bf-cfb
    - cast5-cfb
    - rc4-md5
    - rc4-md5-6
    - chacha20
    - chacha20-ietf
    - salsa20
- 2022 新协议格式提升了性能并带有完整的重放保护
- 参考
  - 协议 https://web.archive.org/web/20151204034044/https://shadowsocks.org/en/spec/protocol.html
  - https://github.com/Shadowsocks-NET/shadowsocks-specs/blob/main/2022-1-shadowsocks-2022-edition.md

```bash
# ghcr.io/shadowsocks/sslocal-rust:latest
brew install shadowsocks-rust

# 生成密码 32 for
openssl rand -base64 32 | tr -d '\n' | pbcopy
sslocal -b "127.0.0.1:1080" --protocol http -s "[::1]:1234" -m "2022-blake3-aes-256-gcm" -k "hello-kitty"
http_proxy=127.0.0.1:1080 wget icanhazip.com -O- -q
```

## Awesome

- [database64128/shadowsocks-go](https://github.com/database64128/shadowsocks-go)
  - AGPLv3, Go
- [SagerNet/sing-shadowsocks](https://github.com/SagerNet/sing-shadowsocks)
  - GPLv3, Go
- [shadowsocks/go-shadowsocks2](https://github.com/shadowsocks/go-shadowsocks2)
  - Apache-2.0, Go
  - 不支持 2022
- [shadowsocks/shadowsocks-rust](https://github.com/shadowsocks/shadowsocks-rust)
  - MIT, Rust

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
  - ipv4 - 32-bit (4-byte) big-endian integer
  - IPv6 - compact representation (16-byte array)
  - hostname - 1-byte length + hostname

**第一个 Client -> Server 包**

```
+-------+----------+
|  IV   | Payload  |
+-------+----------+
| Fixed | Variable |
+-------+----------+
```
