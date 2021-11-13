---
title: rpcx
---

# rpcx

- [smallnest/rpcx](https://github.com/smallnest/rpcx)
  - 国产 RPC 框架
  - [smallnest/rpcx-java](https://github.com/smallnest/rpcx-java)
    - Java 实现，不活跃

:::tip

- 适用方便
- 设计上没有 go-micro 灵活
- 耦合了很多内容
  - 通过 server.AuthFunc 设置认证处理而不是 middleware
  - 自定义的协议
  - Server 有注册能力
  - 通过 tag 控制能力

:::
