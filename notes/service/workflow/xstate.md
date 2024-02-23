---
title: xstate
---

# xstate

- [statelyai/xstate](https://github.com/statelyai/xstate)
  - MIT, TS
  - 状态机
  - FSM - finite state machines - 有限状态机
  - 可以管理应用状态 - react, vue, sevelte
    - 例如： 登录、表单
  - 可以管理业务状态 - 作为 Workflow
  - 用 Declarative 的方式定义和管理状态
  - state orchestrator - 状态编排
  - actor model
  - ![](https://badgen.net/bundlephobia/min/xstate)
- 参考
  - [statelyai/xstate-viz](https://github.com/statelyai/xstate-viz)
    - 开源 可视化 ，现在官方推的是 自己的在线编辑器
  - XState V5
    - https://stately.ai/blog/2023-12-01-xstate-v5
    - actor model

```bash
npm add xstate

# for FW
# @xstate/react @xstate/vue @xstate/svelte
npm add @xstate/react
```

- @xstate/graph
- @xstate/test
- @statelyai/inspect
- setup - 定义上下文
  - 定义 context、事件、类型、guards、actions、actors
- createMachine
  - 基于 setup 定义的上下文构建状态机
  - 定义状态和 transition
- examples
  - https://github.com/statelyai/xstate/tree/main/examples

## Why XState/FSM {#why}

- 管理复杂基础业务逻辑
- 应用启动流程
- 认证
- 表单
- Zustand -> data container
- xstate -> state orchestration engine
- to start with modeling your state/data using events
  - event -> 类似 useReducer dispatching actions -> 修改 data/state
- state 不同于 useState
  - useState 的 state 实际是 reactive data
- FSM 的 S - state 为单独的一个状态而不是一组数据
  - 通过 条件/事件 转换到另一个状态
- 状态本身相对独立 encapsulated
  - 条件/时间 -> 驱动状态 -> 驱动业务
  - 而 reactive data 可能会涉及到外部交互 关联
  - reactive data 更面向 业务逻辑
- actor-based fsm

---

- https://www.reddit.com/r/reactjs/comments/yjaqhi/whats_the_deal_with_xstate/
