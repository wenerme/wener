---
title: CBOR
tags:
  - RFC
---

# CBOR

- [cbor](https://cbor.io/) - Concise Binary Object Representation
  - RFC 8949
  - JSON 的二进制替代
  - 一般会和 JSON 混合使用
- 适用场景： IoT、SOA、需要性能、需要减少带宽
- adopted by
  - WebAuthN
  - WebIntegraty
- [cbor.me](https://cbor.me)
  Online converter
- Golang - [fxamacker/cbor](https://github.com/fxamacker/cbor)
- 参考
  - [rfc8949](https://datatracker.ietf.org/doc/html/rfc8949)
    CBOR - Concise Binary Object Representation
  - [rfc8610](https://datatracker.ietf.org/doc/html/rfc8610)
    CDDL - Concise Data Definition Language
  - [rfc8152](https://datatracker.ietf.org/doc/html/rfc8152)
    COSE - CBOR Object Signing and Encryption
  - [rfc8392](https://datatracker.ietf.org/doc/html/rfc8392)
    CWT - CBOR Web Token

| [Major Type] | Meaning               | Content                          |
| ------------ | --------------------- | -------------------------------- |
| 0            | unsigned integer N    | -                                |
| 1            | negative integer -1-N | -                                |
| 2            | byte string           | N bytes - base64url - wo pad                          |
| 3            | text string           | N bytes (UTF-8 text)             |
| 4            | array                 | N data items (elements)          |
| 5            | map                   | 2N data items (key/ value pairs) |
| 6            | tag of number N       | 1 data item                      |
| 7            | simple/float          | -                                |

[major type]: https://datatracker.ietf.org/doc/html/rfc8949.html#section-3.1
