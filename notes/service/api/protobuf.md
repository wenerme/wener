---
title: Protobuf
---

# Protobuf


## FAQ

### null 值
* 字符串字段不设置则默认为空字符串, 无法设置为 `nil`
* 推荐是使用 `wrappers.proto`
* [google/protobuf#1606](https://github.com/google/protobuf/issues/1606)
  * Missing value/null support for scalar value types in proto 3
* 此外, 当整型值为 0 时也有这个问题
