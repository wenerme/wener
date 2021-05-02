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

```bash
# 显示支持的命令
asterisk -rx 'manager show commands'
```

**manager.conf**

- [1.8/configs/manager.conf.sample](https://github.com/asterisk/asterisk/blob/1.8/configs/manager.conf.sample)

## AMI 协议
* 初始服务端会发送一条信息包含版本
  * `Asterisk Call Manager/1.1`
* 客户端会接收到 FullyBooted 表示启动完成
* Newchannel - 通道建立
  * 包含 Uniqueid 可用于持续跟踪通道
