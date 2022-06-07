---
title: twirp
---

# twirp

- [twitchtv/twirp](https://github.com/twitchtv/twirp)
  - unary RPC
  - 支持 JSON 协议
  - 使用 GRPC 定义，走 HTTP 协议
  - 开发不活跃
- 官方支持语言: PHP, Ruby, Go
- 参考
  - [SpecV7](https://twitchtv.github.io/twirp/docs/spec_v7.html)

:::caution

- 不支持 streaming [#3](https://github.com/twitchtv/twirp/issues/3)

:::

```
POST [<prefix>]/[<package>.]<Service>/<Method>
```

- prefix 默认 /twirp - twirp.WithServerPathPrefix

## Twirp Go

- 客户端会生成 JSON 和 PB 版
  - New{{Service}}ProtobufClient
  - New{{Service}}JSONClient

```bash
go install github.com/twitchtv/twirp/protoc-gen-twirp@latest
```
