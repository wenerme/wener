---
title: CBOR
tags:
  - RFC
---

# CBOR

- [cbor](https://cbor.io/) - Concise Binary Object Representation
  - RFC 8949
  - JSON 的二进制替代
  - 可替代 Protocol Buffers、MessagePack 等场景
  - 一般会和 JSON 混合使用
- 优势
  - 更紧凑 二进制
  - 解析速度更快
  - 支持更多数据类型
  - 支持通过标签扩展数据类型
- 适用场景
  - 带宽有限 - 减少传输数据量
  - 空间有限 - 减少存储数据量
  - 算力有限 - 加快解析速度
  - IoT、SOA、需要性能、需要减少带宽、高效传输
- adopted by
  - 安全通信/生物认证 - 生物识别身份验证, 安全通信协议的元数据编码
    - FIDO2/WebAuthn - 用于无密码身份验证的协议，CBOR 编码认证请求和响应。
    - COSE（CBOR Object Signing and Encryption）：用于签名、加密和密钥分发。
  - WebIntegraty
  - Web/HTTP
    - Amazon IOT
    - JSON Patch with CBOR
  - Blockchain
    - Cardano（ADA）：Cardano 区块链使用 CBOR 编码交易数据
    - COSE（CBOR Object Signing and Encryption）：一种基于 CBOR 的加密和签名标准，适用于区块链交易和智能合约。
  - IoT - 智能家居设备的数据交换, 传感器数据的上传和命令下发, 电力、农业等行业的边缘计算设备
    - CoAP - Constrained Application Protocol - 物联网中广泛使用的轻量级通信协议，CBOR 是默认的编码格式，用于设备之间的状态、命令和数据传输。
    - LwM2M - Lightweight M2M - 基于 CoAP 的设备管理协议，使用 CBOR 传输数据
- https://hildjj.github.io/cbor2/playground/
  - Playground
- ~~[cbor.me](https://cbor.me)~~
  - Debugger
  - 数据会发送到服务端
- Golang - [fxamacker/cbor](https://github.com/fxamacker/cbor)
- 参考
  - Working Group https://datatracker.ietf.org/group/cbor/about/
  - [rfc8949](https://datatracker.ietf.org/doc/html/rfc8949)
    CBOR - Concise Binary Object Representation
  - [rfc8610](https://datatracker.ietf.org/doc/html/rfc8610)
    CDDL - Concise Data Definition Language
  - [rfc8152](https://datatracker.ietf.org/doc/html/rfc8152)
    COSE - CBOR Object Signing and Encryption
  - [rfc8392](https://datatracker.ietf.org/doc/html/rfc8392)
    CWT - CBOR Web Token
  - [rfc8943](https://datatracker.ietf.org/doc/html/rfc8943)
    支持 date 类型
  - https://www.iana.org/assignments/cbor-tags/cbor-tags.xhtml
    - 已知标签


| tag       | Meaning               | Content                          | notes   |
| --------- | --------------------- | -------------------------------- | ------- |
| **Major** |
| 0         | unsigned integer N    | -                                |
| 1         | negative integer -1-N | -                                |
| 2         | byte string           | N bytes - base64url - wo pad     |
| 3         | text string           | N bytes (UTF-8 text)             |
| 4         | array                 | N data items (elements)          |
| 5         | map                   | 2N data items (key/ value pairs) |
| 6         | tag of number N       | 1 data item                      |
| 7         | simple/float          | -                                |
| **date**  |
| 1004      | UTF-8 text string     | full-date string                 | rfc8943 |
| 100       | days since 1970-01-01 | Unsigned or negative integer     | rfc8943 |

[major type]: https://datatracker.ietf.org/doc/html/rfc8949.html#section-3.1

## Schema
- CDDL - Concise data definition language
  - 用于描述 CBOR 数据的格式
  - 高效传输和存储数据
- JSON Schema
- 参考
  - [christian-bromann/cddl](https://github.com/christian-bromann/cddl)
  - https://github.com/google/cddlconv
