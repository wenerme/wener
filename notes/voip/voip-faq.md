---
title: VoIP FAQ
---

# VoIP FAQ
## What is overlap dialing ?

影响按键之间的超时间隔, 关闭后, 网关会一个数字一个数字的接收, 开启后, 网关会有一定的等待延时, 例如 2s.

主要用于在拨号时处理歧义, 例如 `23163441`, 在接收到一部分的时候, 可能就已经开始拨号, 这是不对的, 应该等待输入完成

* [What is overlap dialing ?](https://www.3cx.com/blog/voip-howto/overlap-dialing/)
