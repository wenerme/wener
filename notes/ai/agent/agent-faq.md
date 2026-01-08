---
tags:
  - FAQ
---

# Agent FAQ

## Notification

- 任务完成后通知
- macOS terminal-notifier
- Linux notify-send

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "idle_prompt",
        "hooks": [
          {
            "type": "command",
            "command": "terminal-notifier -title '🔔 Claude Code: Input Needed' -message 'Claude is waiting for your input'"
          }
        ]
      }
    ]
  }
}
```

## IDE vs Agent

- 类似 Cursor, Antigravity 其实更接近 Agent 而非 IDE
  - IDE 功能由 VSC 提供
  - Cursor 和 Antigravity 在这基础上提供了 Agent 功能
- 工具范式转移
- IDE 输出=思考 × 编码速度
- Agent 输出=决策 × AI 执行力

> 代码写的越少，效率越高

| 特性     | 传统 IDE (VS Code / IntelliJ) | AI Agent (Cursor / Windsurf)           |
| -------- | ----------------------------- | -------------------------------------- |
| 交互模式 | 被动 (Passive)                | 主动 (Proactive)                       |
| 核心动作 | 编辑 (Edit)、保存、调试       | 规划 (Plan)、生成、执行                |
| 上下文   | 此时此刻打开的文件            | 整个代码库 (Project Awareness)         |
| 人类角色 | 驾驶员 (Driver)               | 指挥官 (Commander) / 审核员 (Reviewer) |
| 输出物   | 字符 (Characters)             | Diff (变更集)                          |

- I (Integrated) -> Intelligent (智能)
  - 死工具 -> 活 Agent / 有认知的工具
- D (Development) -> Delegation (委派)
  - 操作员 -> 指挥官
- E (Environment) -> Entity (实体)
  - 被动 -> 主动
