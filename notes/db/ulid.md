---
title: ulid
---

# ulid

- [ulid/spec](https://github.com/ulid/spec) - Universally Unique Lexicographically Sortable Identifier
- 例如 `01ARZ3NDEKTSV4RRFFQ69G5FAV`
- 128bit - 编码后 26 字符
  - timestamp 48bits + 随机 80bits
  - Crockford base32 - 5 bit/char
  - `ttttttttttrrrrrrrrrrrrrrrr` - t 时间戳, r 随机
  - 时间戳保留到 毫秒
- 可排序 - 单调递增 - Monotonicity 保证同 ms 内递增
  - 有些实现不一定能保证 - 因为需要状态
  - 如果已经有 时间 信息可直接用于生成 ULID
    - 例如 create_at 列, 创建时间, 一个能标识消息且不会变的时间
- 大小写无关 - Crockford base32
  - encode 为大写
  - decode 接受大写和小写 - https://github.com/ulid/spec/issues/3#issuecomment-406077611
  - 大多实现使用 大写 - 但个人倾向小写
- 无特殊字符 - URL 安全 - `0123456789ABCDEFGHJKMNPQRSTVWXYZ`
