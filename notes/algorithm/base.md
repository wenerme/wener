---
title: BaseN
---

# BaseN

- 数字 0-9 - 10 个字符
- 字母 a-z - 26 个字符,大写 A-Z 26 个字符
- 26+26+10=62 个字符
- MIME 76 每行
- 参考
  - [rfc4648](https://datatracker.ietf.org/doc/html/rfc4648)
    - Base16, Base32, Base64
  - [Binary to text encoding](https://en.wikipedia.org/wiki/Binary-to-text_encoding)
  - [crockford base32](https://www.crockford.com/base32.html)
  - [ilyakurdyukov/crzy64](https://github.com/ilyakurdyukov/crzy64)
    - An easy to decode base64 modification

| BaseN  |      eff | chars                       |
| ------ | -------: | --------------------------- |
| Base10 |     ~42% | 0-9                         |
| Base16 |      50% | 0-9A-F                      |
| Base32 |    62.5% | `0-9A-V`,`2-7A-Z`           |
| Base36 |     ~64% | 0-9A-Z                      |
| Base64 | 3/4, 75% | `0-9A-Za-z+/`.`0-9A-Za-z-_` |
| Base85 | 4/5, 80% |                             |

- Base10=Decimal
- Base64 常见补充字符
  - `+`,`/` - 大多数场景
  - `-`,`_` - URL 安全
  - Pad 通常使用 =
  - 3/4 - 数据长度为 3 的倍数则不会有 Padding
- Base85=Ascii85
  - big-endian
  - used by ZMODEM, Adobe PostScript, PDF, Git Binary Patch
  - Z85 - ZeroMQ Base-85
  - Base85 RFC1924 62 `0–9A–Za–z` + 23 `` !#$%&()*+-;<=>?@^_`{|}~ ``
- 常见视觉混淆字符
  - 0,o,O
  - 1,l,I,i,j
  - 2,z,Z
  - 5,s,S

| bits | byte | hex |  b32 | b64 | e.g.           |
| ---- | ---- | --- | ---: | --: | -------------- |
| 32   | 4    | 8   |   ~7 |  ~7 | int            |
| 64   | 8    | 16  |  ~13 | ~11 | timestamp,long |
| 128  | 16   | 32  |   26 | ~22 | md5            |
| 160  | 20   | 40  |   32 | ~27 | sha1,uuid      |
| 224  | 28   | 56  |  ~45 | ~38 | sha2           |
| 256  | 32   | 64  |  ~52 | ~43 | sha2-256       |
| 384  | 48   | 96  |  ~77 |  64 |
| 512  | 64   | 128 | ~103 | ~86 |
| 1024 | 128  | 256 |      |     |                |
| 1280 | 160  | 320 |  256 |     |                |
| 1536 | 192  | 384 |      | 256 |                |

- byte=bits/8
- hex=bits/8/0.5=bits/4
- base32=bits/8/0.625
- base64=bits/8/0.75=bits/6

| type | bits | string  |
| ---- | ---- | ------- |
| uuid | 128  | 36=32+4 |
| sha1 | 160  |
