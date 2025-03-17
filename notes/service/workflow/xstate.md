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
  - ~~[statelyai/xstate-viz](https://github.com/statelyai/xstate-viz)~~
    - 开源 可视化 ，现在官方推的是 自己的在线编辑器
  - XState V5
    - Docs https://stately.ai/docs
    - https://stately.ai/blog/2023-12-01-xstate-v5
    - actor model
  - [Has anyone used xstate for domain modeling?](https://github.com/statelyai/xstate/discussions/3398)
  - npm:@xstate/store
  - npm:@xstate/react
  - npm:@xstate/vue
  - npm:@xstate/svelte
  - npm:@xstate/test
  - npm:@xstate/graph
  - npm:@statelyai/inspect

```bash
npm add xstate

# for FW
# @xstate/react @xstate/vue @xstate/svelte
npm add @xstate/react
```

- @xstate/test
- @statelyai/inspect
- setup - 定义上下文
  - 定义 context、事件、类型、guards、actions、actors
- createMachine
  - 基于 setup 定义的上下文构建状态机
  - 定义状态和 transition
- examples
  - https://github.com/statelyai/xstate/tree/main/examples

## Notes

:::tip

- 使用 always 来做 条件 target

:::

- Actions - 即触发后不关心结果的副作用
  - 同步
- Services - 即触发后需要等待结果的副作用
  - 异步
- Actors - 可以与状态机 actor 进行通信的实体
  - `(state, event, actorCtx) => NextState`
- Guards - 决定是否应该进行状态转换的条件
- Delays - 指定延迟转换或发送延迟事件前的等待时间
- Input - 指提供给状态机的数据，用于影响其行为。
- Output - 指actor产生的最终数据。
- transition - 由事件触发的从一个有限状态到另一个状态的变化。
- Actor 能力
  - 接收事件 - `actor.send(event)`
  - 发送事件
  - swap actors - State machine actors can spawn/invoke actors and have child actors.
  - 输入
  - 输出
- PersistedSnapshot
  - status
  - output
  - error
- State
  - value
    - nested states
      - `{ paused: 'buffering' }`
    - 并行状态
      - `{ monitor: 'on', mode: 'dark' }`
  - context
  - meta
- Transition
  - `sibling.child.grandchild`
  - `.child.grandchild`
  - `#specificState`
  - Wildcard `'*': { target: 'awake' }`
    - `'feedback.*': { target: 'form' }`
    - `*` 只会匹配单层
    - catch-all
  - 禁止 `{ on: { forbidden: {} } }`
- event
  - @xstate.actor - 系统中创建了一个 actor 引用
  - @xstate.event - 系统中从源 actor 引用向目标 actor 引用发送了一个事件
  - @xstate.snapshot - actor 引用因接收到事件而发出快照
- StateNodeConfig
  - type
    - atomic - 无子状态节点
    - compound - 嵌套子状态节点 (XOR)
    - parallel - 正交嵌套子状态节点 (AND)
    - history - 历史状态节点
    - final - 终态节点
  - history
    - shallow - 仅保存当前状态
    - deep - 保存所有子状态
    - true - shallow
    - false - none - 默认
  - states - key -> StateNodeConfig
  - invoke - 进入节点时调用服务
  - on - event -> transition
  - entry - 进入状态执行的 action
  - exit - 离开状态执行的 action
  - onDone - `{[done(id)]: { target: '' }}`
  - after - delayed transition
  - always - active 的时候总是会执行
  - parent
  - meta
  - output - 基于 context, 放在 event.data
  - id - 通过 `#id` 来引用
  - order
  - tags - 合并到 state.tags
  - description
  - target

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
