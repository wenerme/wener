---
title: VoIP FAQ
---

# VoIP FAQ

## Asterisk vs FreeSWITCH

- Asterisk
  - 轻量，资源占用少
  - 社区支撑更好
  - 模块化程度更高
  - 线程资源共享 - 存在资源锁，性能弱于 fs
  - 主要定位是 PBX
- FreeSWITCH
  - 原本是 Asterisk 开发者想要修复问题，最后完全重写
  - 对资源要求更高
  - 多租户，高并发 - 适用于 SaaS 平台
  - 集群能力 - 不同实例处理不同功能
  - 通道线程资源独立 - 对资源要求高，性能更高
  - XML 配置
  - 支持 XMPP - 提供 IM 能力
  - 不只是 PBX - 多协议通讯平台
  - 视频处理能力强
  - 支持 Linux, macOS, BSD 等平台
  - libfreeswitch 可作为库来使用

| -          | Since | License | by     | dr                             |
| ---------- | ----- | ------- | ------ | ------------------------------ |
| Asterisk   | 1999  | GPL     | Digium | FreePBX,Elastix,PBX in a Flash |
| FreeSWITCH | 2006  | MPL     |        | sipXcom,FusionPBX              |

---

- [FreeSWITCH Versus Asterisk Comparison](https://www.whichvoip.com/articles/freeswitch-vs-asterisk.htm)

## What is overlap dialing ?

影响按键之间的超时间隔, 关闭后, 网关会一个数字一个数字的接收, 开启后, 网关会有一定的等待延时, 例如 2s.

主要用于在拨号时处理歧义, 例如 `23163441`, 在接收到一部分的时候, 可能就已经开始拨号, 这是不对的, 应该等待输入完成

- [What is overlap dialing ?](https://www.3cx.com/blog/voip-howto/overlap-dialing/)
