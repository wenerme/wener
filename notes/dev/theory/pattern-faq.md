---
title: Pattern FAQ
---

# Pattern FAQ

## Actor vs CSP

- [Comparison with the actor model](https://en.wikipedia.org/wiki/Communicating_sequential_processes#Comparison_with_the_actor_model)
  - CSP 消息内容无关，Actor 消息类型明确
  - CSP 基于 channel，Actor 基于明确的终端标识
  - CSP channel 收发两端存在“约会”定点，Actor 全异步不存在等待
- [How are Akka actors different from Go channels?](https://www.quora.com/How-are-Akka-actors-different-from-Go-channels-How-are-two-related-to-each-other)
  - channel
    - limit buffer
    - select - waiting faster
    - wait - 不消耗 CPU，只需要一点内存
      - 无 buffer - 等待对方存在
      - buffer 满 - 等待空间
      - 空 buffer - 等待数据存在
    - 劣势
      - 互相依赖可能导致死锁
  - actor
    - 每个 actor 类似一个 goroutine `for {}`
    - 只有一个输入 channel
    - infinite buffer
    - unbounded number of writer - writer 也是 actor
    - 不存在 wait - 全异步 - 不存在 select
    - 劣势
      - 当需要流控交互时会变得麻烦 - 请求/响应 - 失去性能优势
      - 无法拒绝通讯 - go 可以选择 close channel，可 select 部分
      - 无限的 buffer 并不能实际被保障 - 内存总是会满的
