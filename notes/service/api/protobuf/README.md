---
title: protobuf
tags:
  - Awesome
---

# protobuf

- [protocolbuffers/protobuf](https://github.com/protocolbuffers/protobuf)
  - Protocol Buffers - Google's data interchange format
  - 包含实现: C++, Java, Python, Objective-C, C#, Ruby, PHP
- [protoc](./protoc.md)
  - 生成工具
- [protocolbuffers/txtpbfmt](https://github.com/protocolbuffers/txtpbfmt)
  - 格式化 textpb
- 实现
  - [Go](./protobuf-go.md)
  - Dart [dart-lang/protobuf](https://github.com/dart-lang/protobuf)
  - [protocolbuffers/upb](https://github.com/protocolbuffers/upb)
    - a small protobuf implementation in C
    - Runtime for Ruby, PHP, Python
  - [protobuf-c/protobuf-c](https://github.com/protobuf-c/protobuf-c)
  - [protobuf-net/protobuf-net](https://github.com/protobuf-net/protobuf-net)

```bash
brew install protobuf
```

## Reference

- 使用 protobuf 尽量将 零值 和 空值 平等对待
- proto2 特性 optional, group, required
  - ⚠️ 不再推荐使用 group, required
  - required & optional - 可以考虑使用 FieldMask
  - optional 使用 oneof 实现
    - 类似 jsonschema


```proto
message User {
  extensions 100 to 200;
}
```
