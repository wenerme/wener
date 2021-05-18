---
title: Asterisk AMI
---

# Asterisk AMI

- AMI - Asterisk Manager Interface
- 配置文件 `manager.conf`
- 默认端口 5038
- 服务端会主动发送头 `Asterisk Call Manager/3.2.0`
- 响应均为异步事件
- 包类型分为: 事件, 响应, 和发送的操作
- 格式类似于 HTTP 头
- Action,Response,Event 必须在第一行
- 请求通过 ActionID, 服务端返回 ActionID 来识别响应
- 一次请求除了会返回一个响应以外, 可能还会范围一列数据, 此时列数据是通过事件发送的, 没有 ActionID
  - 例如: 以 `EndpointDetail` 开始, 以 `EndpointDetailComplete` 结束
- Action
  - CLIENT -> Asterisk
- Response
  - CLIENT -> Asterisk -Response-> CLIENT
- Event
  - Asterisk -> CLIENT
- 参考
  - [AMI v2 Specification](https://wiki.asterisk.org/wiki/display/AST/AMI+v2+Specification)
    - asterisk 12+
    - 版本号为 2.0.0 - asterisk 1.8 是 1.1

:::caution

- AMI v1 可能内容包含换行
- UTF8 包含 BOM - EF BB BF

:::

```bash
# 命令文档
asterisk -rx 'manager show commands'
# 事件文档
asterisk -rx 'manager show events'
```

**manager.conf**

- [1.8/configs/manager.conf.sample](https://github.com/asterisk/asterisk/blob/1.8/configs/manager.conf.sample)

## AMI 协议

- 初始服务端会发送一条信息包含版本
  - `Asterisk Call Manager/1.1`
- 客户端会接收到 FullyBooted 表示启动完成
- 新版本会返回 SuccessfulAuth - 包含账号权限、链接等信息
- 服务退出或重启会发送 Shutdown
- Newchannel - 通道建立
  - 包含 Uniqueid 可用于持续跟踪通道
