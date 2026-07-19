---
title: Vibe Coding
tags:
  - Thoughs
---

# Vibe Coding

:::tip

- 如果你 review 了所有的代码，那就不算是 vibe coding。
- AI 无法完全完成 当事人 也无法理解的任务。
- 让 Agent 能 Loop 起来是关键，因此人类的主要工作是
  - 准备工具 - 例如 访问浏览器、访问日志、访问数据
    - 对应 MCP, tools
  - 准备环境 - 例如 测试环境、.env 配置、Terminal 环境
    - 对应 项目配置
  - 准备上下文 - 例如 描述现象，描述触发逻辑，描述需求，描述验收
    - 对应 skills, AGENTS.md, rules
  - 准备工作流 - 例如 自动知乎回答问题流程
    - 对应 skills, subagent
    - 对于 Coding 类任务 AI 已经非常熟悉 工作流程
- 工程中最难的不是“造出一个能用的东西”，而是以正确的方式构建它，让它易于理解，也易于扩展。
  - 但 过早的优化是万恶之源
  - 过于 "right" 的架构设计得到可能是不需要的产出
  - Make it DONE, Make it Right, Make it Fast

:::

- 明确项目需求和范围
- 建立全面的设计指南和编码标准
- 记录所有约束和限制
- 创建并维护包含信息的 markdown 文件，便于客户端访问
- 只有在完成上述步骤后再启动编码过程
- OODA - Observe Orient Decide Act - 观察 认知 决策 执行

## 如何增加并行 {#how-to-increase-parallel}

1. use worktree
2. use tmux
3. use session name

- the /rename command

**worktree**

- ~/gits/foo
  - main repo
- ~/gits/foo-1
  - workrtree
  - symlink CLAUDE.md, .mcp.json, .claude, .agents, local
- 可快速增加并行程度，不丢失上下文
- 通过组织目录可 share 上下文

**tmux**

```
prefer tmux to run dev server, use title to find the target pane like `xyz-dev`
```

with [tmux-session-manager](https://github.com/wenerme/ai/tree/main/skills/tmux-session-manager) skill

## Share Context

- 让模型知道你知道的
- 让你知道模型知道的

我的习惯性结构

```
.agents/
  docs/       # 让模型持续更新跟踪相关知识上下文
  skills/     # 基础技能
local/
  docs/       # 我应该需要知道的
  YYYY-MM-DD/ # 模型应该知道的，每次的上下文
```

- 知识技能梳理 https://github.com/wenerme/ai

## Best Practice

- Simplicity is always the best
- 使用 Worktree 增加并行 - Poor man's Team or Parallel Agent
  - 使用 softlink 共享文件 - .claude, .mcp.json, CLAUDE.md 配置等
  - 使用 local/ 本地共享目录来维护本地共享知识和本地开发用数据和各种 case
  - 使用 `local/docs/*` 来跟踪相关文档
- 规划自己的 prompt 历史记录跟踪书写内容
- 确保能 Handoff
  - 完整的环境、配置、测试条件
- Command line first
  - 很多工作，command line 工具能更好胜任
  - argocd, kubectl, git, glab, gh, agent-browser, mcp-cli

## 提示词

:::tip

- 使用伪代码驱动 AI 进行编码
- 先 Plan 再编码

:::

- 为待完成的工作提供详细的规格说明
- 必要时包含相关上下文和文件
- 针对具体任务有策略性地应用提示，便于审查和测试
- 将大型任务拆解为更小、更聚焦的子任务，以获得更好结果

---

- 对每次更改进行增量测试
- 尽可能实现自动化测试
- 根据原始需求进行验证
- 维护完善的测试套件（CI/CD）
- 定期进行自动化安全和质量扫描

---

- 明确制定代码生成和修改的规则
- 各环境保持一致的配置
- 记录特殊规则和例外情况
- 定期回顾和更新配置设置
- 实施模块化设计原则

---

- Goal / Spec - 控制目标和思想
- DESIGN.md - 保存系统模型
- Sandbox / Hooks - 控制能力边界
- Tests / Oracle - 验证行为
- Review - 查找设计与实现缺口
- Verify - 证明真实路径成立
- Diff identity - 保证证据没有过期
- CI / Human gate - 控制最终交付

## Control the ideas, not the code

人应该拥有软件的思想、模型和不变量，而不是执着于拥有每一行代码。

- DESIGN.md 记录核设计思想、技巧、目标、边界
- 代码已经不再是唯一的知识载体
  - 很多关键设计只隐含在代码中，这本来就是软件工程长期存在的问题。AI 让代码生成速度提升后，这个问题更加明显。
- 逐行 Review 无法随生成速度扩展
  - 当 Agent 每天产生几千行变更时，人类不可能继续采用传统的等比例审查方式。
- 设计、模型和 QA 的杠杆更高
  - 人花一个小时发现错误的数据模型，可能避免 Agent 生成几万行错误实现；花一个小时修改代码风格，通常没有同等价值。
- DESIGN.md 会变得更重要
  - 这和我们刚才研究的“human rationale + machine-readable contract”一致。它既帮助人建立 mental model，也给 Agent 提供高质量设计上下文。
- 年轻开发者不能只学 Review AI 输出
  - 通过实现解释器、数据库、Hash Table 等小型系统建立基础能力。
- https://antirez.com/news/169

```
设计成为主要的人类知识界面
代码成为 Agent 可维护的执行产物
测试和验证证明行为
风险决定人工需要深入到哪一层
```

## 参考

```
Code is cheap. Understanding is expensive.
You own the thinking, not the typing.
```

- 2025-11 Claude Opus 4.5 标志着 AI Codeing Agent 从 Copilot -> Coworker 的转变
- Time to Edit (TTE)
- https://cognition.ai/blog/devin-annual-performance-review-2025
- https://cursor.com/blog/productivity
- https://news.ycombinator.com/item?id=46515696
