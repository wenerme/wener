---
title: Hashing
---

# Hashing

- 参考
  - [Which hashing algorithm is best for uniqueness and speed?](http://softwareengineering.stackexchange.com/questions/49550)
    - 随机性和碰撞比较
  - [Cryptography Center](https://cryptography.cc/)
  - [shattered](https://shattered.io/)
    broken SHA-1 in practice
  - [multiformats/multihash](https://github.com/multiformats/multihash)

:::tip

- git 默认 sha2-256

:::

## git hash

- git 2.12 使用增强后的 SHA-1
- git 默认从 SHA-1 迁移为 SHA-256
  - [why git choose sha-256](https://stackoverflow.com/a/60088126/1870054)
- [hash-function-transition](https://git-scm.com/docs/hash-function-transition/)

## Hash

- adler32
- crc16
- crc32
- crc64
- fnv
- maphash

## Cryptographic hash algorithms

| hash  | variant  | bits | internal bites | block bits | rounds |
| ----- | -------- | ---- | -------------- | ---------- | ------ |
| MD5   |          | 128  | 128=4×32       | 512        | 64     |
| SHA-0 |          | 160  | 160=5×32       | 512        | 80     |
| SHA-1 |          | 160  | 160=5×32       | 512        | 80     |
| SHA-2 | 224      | 224  | 256=8×32       | 512        | 64     |
| ^^    | 256      | 256  | ^^             | ^^         | ^^     |
| ^^    | 384      | 384  | 512=8×64       | 1024       | 80     |
| ^^    | 512      | 512  | ^^             | ^^         | ^^     |
| ^^    | 512/224  | 224  | ^^             | ^^         | ^^     |
| ^^    | 512/256  | 256  | ^^             | ^^         | ^^     |
| SHA-3 | 224      | 224  | 1600=5×5×64    | 1152       | 24     |
| ^^    | 256      | 256  | ^^             | 1088       | ^^     |
| ^^    | 384      | 384  | ^^             | 832        | ^^     |
| ^^    | 512      | 512  | ^^             | 576        | ^^     |
| ^^    | SHAKE128 | any  | ^^             | 1344       | ^^     |
| ^^    | SHAKE256 | any  | ^^             | 1088       | ^^     |

- x86
  - SHA3-256 - MMX,AVX-512VL, AVX2 - OpenSSL
  - SHA3 - SSE2 - Crypto++
- Apple A13 ARMv8
  - SHA-3/SHA-512 EOR3, RAX1, XAR, BCAX - ARMv8.2-SHA
- ARM
  - SVE, SVE2

---

- [Cryptographic hash function](https://en.wikipedia.org/wiki/Cryptographic_hash_function)
- MD5
- SHA-1
- RIPEMD-160
- Whirlpool
- SHA-2
- SHA-3
- BLAKE2

## SHA

- SHA - Secure Hash Algorithm
- SHA-2 - 2001
  - 224, 256, 384, 512
- SHA-3 - 2015
  - 224, 256, 384, 512

## Reverse

- https://md5.gromweb.com/
- https://sha1.gromweb.com/
