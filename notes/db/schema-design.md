---
title: Schema Design
---

# Schema Design

## 主键

- UUIDv4
  - 128bit - 编码后 36 字符
  - 随机
- [ulid/spec](https://github.com/ulid/spec) - Universally Unique Lexicographically Sortable Identifier
  - 例如 `01ARZ3NDEKTSV4RRFFQ69G5FAV`
  - 128bit - 编码后 26 字符
    - timestamp 48bits + 随机 80bits
    - Crockford base32 - 5 bit/char
    - `ttttttttttrrrrrrrrrrrrrrrr` - t 时间戳, r 随机
  - 可排序 - 单调递增
  - 大小写无关
  - 无特殊字符 - URL 安全 - `0123456789ABCDEFGHJKMNPQRSTVWXYZ`
