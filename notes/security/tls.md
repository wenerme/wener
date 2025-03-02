---
title: TLS
---

# TLS

- TLS - Transport Layer Security
- ECH - Encrypted Client Hello
- ESNI - Encrypted SNI
  - ESNI -> ECH
- SNI - Server Name Indication
- Redis 支持 TLS
  - `redis-cli -u "rediss://default:$REDIS_PASSWORD@redis.example.com:443" --sni redis.example.com info`
- Postgres 17 支持 TLS
  - PG17 支持 `?sslnegotiation=direct&sslmode=require`
    - alpn postgresql
    - https://www.postgresql.org/docs/17/protocol-flow.html#PROTOCOL-FLOW-SSL
  - 旧版本 应用层实现的 SSL
  - PJJDBC v42.7.4
  - https://github.com/pgjdbc/pgjdbc/blob/master/pgjdbc/src/main/java/org/postgresql/PGProperty.java#L696
- SSH 不支持 TLS
  - 使用的应用层协议
- https://docs.kernel.org/networking/tls.html
- 不支持 TLS 的可以使用 stunnel/frp 等 tunnel - 但是需要额外运维

## ClientHello

> ClientHello 是明文的

- **协议版本 (Version)** - 指明客户端期望使用的 TLS 协议版本（例如 TLS 1.2、TLS 1.3）
- **随机数 (Random)** - 32 字节随机数据，用于生成会话密钥，其中可能包含时间戳等信息
- **会话 ID (Session ID)** - 用于标识可复用的会话，方便后续会话恢复
- **密码套件 (Cipher Suites)** - 客户端支持的加密算法组合列表，供服务器选择合适的套件
- **压缩方法 (Compression Methods)** - 客户端支持的数据压缩算法（通常仅包含"无压缩"选项）
- **扩展 (Extensions)** - 包含各种可选扩展:
  - SNI（服务器名称指示）
  - ALPN（应用层协议协商）
  - 支持组（支持的椭圆曲线等）
  - 签名算法
  - Key Share（用于 TLS 1.3 密钥交换）
  - 支持版本（用于协商实际使用的 TLS 版本）等
