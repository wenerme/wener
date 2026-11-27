---
title: 什么让 Agent 成为 Assistant
slug: what-makes-agent-become-an-assistant
tags:
  - Thoughts
---

# 什么让 Agent 成为 Assistant

Agent = Model + Harness + Workspace

Assistant = Agent + Event Driven

<!-- more -->

## What is an Agent

我对 Agent 的定义理解是

- Model + Harness + Workspace
- Harness
  - tools
  - skills
  - mcp
  - System Prompt
  - extensions
- Workspace
  - 文件系统
  - 一个目录
  - 一个可读写的地方
  - exec/bash/shell - 一个可以执行命令的工具
  - commands - 环境里提供的命令行工具
  - 一个 sandbox 也是一个完整的 workspace

## What is an Assistant

- Agent + Event Driven
- Assistant 本身是一个 Agent
- Event Driven 本质是指 Agent 事件行为

初级的事件驱动

- 定时任务
- 让 Agent 固定增量扫描一些消息渠道

中级的事件驱动

- Channel 消息对接到 Agent 会话

高级的事件驱动

- 上层 Agent 分流
- 支持 Agent 主动订阅 Channel 消息
- 支持通过分类器识别消息内容并做路由分发

---

Assistant 和 Agent 最大的区别在于驱动不同

- Agent 是人作为输入
- Assistant 是脱离当事人的方式接受输入
  - 订阅消息 - 代替了人去关注消息
  - 定时事件 - 主动地去操作和行动
  - 能形成工作流的方式来持续地行动

## What is Workflow or Loop

- Workflow
  - Event driven pipeline
  - 对于 Agent 时代来说，固定的 Workflow 价值越来越低了
  - 需要能形成动态的 workflow，能互相交互感知和变化的 workflow
  - Workflow 能增加确定性，本质是在什么东西都想好了的场景下能带来长期收益，但是现在的 Moving speed 是传统 workflow 远远跟不上的。
- Loop
  - Do things in a loop, achieve the goal
  - 本质与 Workflow 没有太大的区别，是一个更简化版本的表述
  - 可能围绕一个核心业务对象推进

这两种工作方式目前都可以通过语言描述的方式实现，配合周期性的事件触发都能完成。例如

```
把 XYZ 记录到 wip.md，使用 subagent 推进开发测试验收。
每 15m 进行检查，完成后关闭 schedule 任务。
```

这便是一个基础的 `/loop`、`/goal`。

而复杂一点的 workflow，只是在这之上继续完善描述，本质没有太大区别。

## Foundation

Agent & Assistant 两者的区别可能在于一个依赖等待人进行交互输入，一个 7×24 小时运行。
但两者底层核心的东西都是一样的

- Agent Native
  - Command based interaction
  - Shell is all you need
- Context Curation
  - 想要持续运行下去，依赖设计合理的上下文信息结构，在长周期执行后能产生效果的提升
- Build your own tools
  - 让事情做得越来越丝滑
