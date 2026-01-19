---
title: Agent
tags:
  - Topic
---

# Agent

:::tip

- AI 无法完全完成 当事人 也无法理解的任务。
- 让 Agent 能 Loop 起来是关键，因此人类的主要工作是上下文工程
  - 准备工具 - 例如 访问浏览器、访问日志、访问数据
    - 对应 MCP, tools
  - 准备环境 - 例如 测试环境、.env 配置、Terminal 环境
    - 对应 项目配置
  - 准备上下文 - 例如 描述现象，描述触发逻辑，描述需求，描述验收
    - 对应 skills, AGENTS.md, rules
  - 准备工作流 - 例如 自动知乎回答问题流程
    - 对应 skills, subagent
    - 对于 Coding 类任务 AI 已经非常熟悉 工作流程

:::

- 规则 - 提供决策依据
  - 默认包含的上下文
  - 可以基于规则动态添加的规则
  - AGENTS.md, rules
- 流程 - 定义执行路径
  - 重复性任务
  - Workflow, Subagent, Command
- 技能 - 整合所需能力
  - 上下文、环境、配套工具、参考、动态发现、组合
  - skills
- 工具 - 实现具体操作
  - MCP, cli , tools

---

- OODA - Observe Orient Decide Act - 观察 认知 决策 执行
