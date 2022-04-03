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

| encoding | eff      | chars           | rfc      |
| -------- | -------- | --------------- | -------- |
| Decimal  | ~42%     | 0-9             |
| Base16   | 50%      | 0-9A-F          |
| Base32   | 62.5%    | 0-9,A-V/A-Z,2-7 |
| Base36   | ~64%     | 0-9A-Z          |
| Base64   | 3/4, 75% | 0-9A-Za-z+/     |
| Base85   | 4/5, 80% |                 | RFC 1924 |
| Ascii85  | 80%      |

- Base85 是 Ascii85 修订版
- Base64 常见补充字符
  - +,/ - 大多数场景
  - -,\_ - URL 安全
  - Pad 通常使用 =
  - 3/4 - 数据长度为 3 的倍数则不会有 Padding
- 常见冲突字符
  - 0,O
  - 1,I,i,j
  - 2,Z,z

| encoding | eff      | chars             |
| -------- | -------- | ----------------- |
| Base16   | 50%      | 0-9A-F            |
| Base32   | 62.5%    | `0-9A-V`,`2-7A-Z` |
| Base64   | 3/4, 75% | 0-9A-Za-z+/       |

| bits | hex size | base32 size | base64 size |
| ---- | -------- | ----------- | ----------- |
| 64   | 16       |             |
| 128  | 32       | 26          |
| 160  | 40       | 32          |

- hex=bits/8/0.5
- base32=bits/8/0.625
- base64=bits/8/0.75

| type | bits | string  |
| ---- | ---- | ------- |
| uuid | 128  | 36=32+4 |
| sha1 | 160  |
