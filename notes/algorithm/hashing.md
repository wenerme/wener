---
title: Hashing
---

# Hashing

- Broken - MD4, MD5, SHA-0, SHA-1

:::tip

- git 默认 sha2-256

:::

**参考**

- [Which hashing algorithm is best for uniqueness and speed?](http://softwareengineering.stackexchange.com/questions/49550)
  - 随机性和碰撞比较
- [Cryptography Center](https://cryptography.cc/)
- [List of hash functions](https://en.wikipedia.org/wiki/List_of_hash_functions)
- SHA1
  - 2017-02-23 [Announcing the first SHA1 collision](https://security.googleblog.com/2017/02/announcing-first-sha1-collision.html)
  - [shattered](https://shattered.io/)
    broken SHA-1 in practice
  - [cr-marcstevens/sha1collisiondetection](https://github.com/cr-marcstevens/sha1collisiondetection)

## git hash

- git 2.12 使用增强后的 SHA-1
- git 默认从 SHA-1 迁移为 SHA-256
  - [why git choose sha-256](https://stackoverflow.com/a/60088126/1870054)
- [hash-function-transition](https://git-scm.com/docs/hash-function-transition/)

## Hash/Digest

- adler32
- crc - Cyclic redundancy check
  - 16,32,64
- [fnv] - Fowler–Noll–Vo
  - 32,64,128,256,512,1024
  - xor
- MurmurHash
  - 32,64,128
- maphash
- tdigest

[fnv]: https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function

## Cryptographic hash algorithms

| hash  | variant  | bits | internal bites | block bits | rounds | hex | b64 |
| ----- | -------- | ---- | -------------- | ---------- | ------ | --- | --- |
| MD5   |          | 128  | 128=4×32       | 512        | 64     | 32  |
| SHA-0 |          | 160  | 160=5×32       | 512        | 80     | 40  |
| SHA-1 |          | 160  | 160=5×32       | 512        | 80     | 40  |
| SHA-2 | 224      | 224  | 256=8×32       | 512        | 64     | 56  |
| ^^    | 256      | 256  | ^^             | ^^         | ^^     | 64  |
| ^^    | 384      | 384  | 512=8×64       | 1024       | 80     | 96  |
| ^^    | 512      | 512  | ^^             | ^^         | ^^     | 128 |
| ^^    | 512/224  | 224  | ^^             | ^^         | ^^     |
| ^^    | 512/256  | 256  | ^^             | ^^         | ^^     |
| SHA-3 | 224      | 224  | 1600=5×5×64    | 1152       | 24     | 56  |
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

## SHA2 vs SHA3

- 安全性 - 两者区别不大 - 没有结构性问题，例如 sha1
- 性能 - SHA2 广泛，软实现性能更好，硬件支持更多

---

- [sha2 vs sha3](https://crypto.stackexchange.com/a/68314)
- [Should we be using SHA3](https://security.stackexchange.com/a/153058/130027)

## 性能

- [Intel SHA Extensions](https://en.wikipedia.org/wiki/Intel_SHA_extensions)
  - since 2013
  - SHA-1, SHA-256
- AVX-512 - Advanced Vector Extensions
  - since 2015
- [minio/sha256-simd](https://github.com/minio/sha256-simd)
  - Apache-2.0, Golang
