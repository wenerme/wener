---
title: Agent Goal
---

# Agent Goal

- [fitchmultz/pi-codex-goal](https://github.com/fitchmultz/pi-codex-goal)
  - Go
  - Codex goal workflow helper.
- 参考
  - [Run long-horizon tasks with Codex](https://developers.openai.com/blog/run-long-horizon-tasks-with-codex)

# Flow

外部交互循环：

```text
ask -> work -> result -> wait
```

- `ask`：用户给出目标、边界和验收期望。
- `work`：Agent 自主拆解、执行、验证。
- `result`：Agent 汇报结果、证据、风险和下一步。
- `wait`：等待用户确认、补充上下文，或进入下一轮目标。

内部迭代循环：

```text
work -> check -> continue or complete
```

- `work`：做一小步可回滚、可验证的改动。
- `check`：运行测试、构建、审查 diff 或收集证据。
- `continue`：如果未达到目标，记录当前状态并继续下一轮。
- `complete`：如果满足完成定义，输出结果、验证证据和交接信息。

# SMART

SMART 可以作为写 Goal 的检查框架，但不需要把任务写得过度官僚化。

| 维度       | 含义            | 在 Agent Goal 中的落点                             |
| ---------- | --------------- | -------------------------------------------------- |
| Specific   | 目标具体        | `Outcome`、`Boundaries`、`Non-goals`               |
| Measurable | 可衡量          | `Definition of Done`、`Verification surface`       |
| Achievable | 可完成          | `Context`、`Constraints`、`Blocked stop condition` |
| Relevant   | 相关            | `Context`、`Outcome`                               |
| Time-bound | 有时间/轮次边界 | `Iteration policy`、`Blocked stop condition`       |

实践上最重要的是：**目标要可验证、边界要清楚、失败时要知道何时停止**。

# Goal Spec

```md
Context:
当前背景、相关路径、已有状态、为什么要做。
尽量包含能让新 agent 接手的最小上下文，但不要塞入无关历史。

Outcome:
完成后应该是什么状态。
描述用户真正想要的结果，而不是只描述要执行的命令。

Definition of Done:
可验收的完成标准。
例如：功能行为、文档形态、CI 状态、数据迁移结果、性能指标等。

Verification surface:
用什么证据证明完成了。
例如：测试命令、构建输出、截图、日志、CI 链接、diff 摘要、人工检查点。

Constraints:
必须遵守什么，不能做什么。
例如：不要改公共 API、不要提交 secrets、不要触碰某些目录、保持兼容性。

Boundaries:
允许修改哪里，不应该扩展到哪里。
用于避免 agent 把任务扩大成重构、顺手修复或无关优化。

Non-goals:
明确这次不解决什么。
这比只写 Boundaries 更直接，适合排除容易跑偏的方向。

Iteration policy:
怎么一轮一轮推进。
例如：每次只做小范围修改；先跑相关测试，再跑全量检查；每轮记录已完成、失败项、下一步。

Blocked stop condition:
什么时候不要继续硬做。
例如：需要业务确认、外部凭证，或者同一测试连续 3 轮无法修复。
停止时报告 blocker、错误日志、已尝试方案和建议下一步。

Handoff:
如果任务中断，下一位 agent 应该从哪里继续。
包含当前状态、关键文件、验证命令、剩余问题和风险。
```

# Example

```md
Context:
当前仓库是 Docusaurus 文档站，最近新增 Java 版本笔记后 CI 构建失败。
相关路径：notes/java/version、site、.github/workflows/build.yaml。

Outcome:
修复 CI 构建失败，并保持 Java 版本笔记可读、链接有效、Markdown 表格正常。

Definition of Done:

- GitHub Actions Build 成功。
- 本地或 CI 中 Docusaurus build 不再因 frontmatter、Markdown 表格或链接格式失败。
- 修改范围只限相关文档和必要配置。

Verification surface:

- `git diff --check`
- `cd site && pnpm run build`
- GitHub Actions run URL 和最终状态。

Constraints:

- 不提交 secrets、缓存、构建产物。
- 不无关重构 Docusaurus 配置。
- JEP 链接使用 reference link，避免表格过宽。

Boundaries:
只处理 Java 版本笔记和导致构建失败的 Markdown 元数据问题。

Non-goals:
不重新设计整站导航，不调整主题，不迁移 Docusaurus major version。

Iteration policy:
每轮先定位一个构建错误，修复后重新验证；如果出现新错误，再进入下一轮。

Blocked stop condition:
如果失败依赖 GitHub secret、部署 token 或外部服务权限，停止并报告所需权限。

Handoff:
记录失败 run、修复文件、验证命令、剩余 warnings 和下一步建议。
```
