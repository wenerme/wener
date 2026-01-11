---
title: Agent Design
tags:
  - Design
---

# Agent Design

## mcp-cli

- claude code ENABLE_EXPERIMENTAL_MCP_CLI=true
  - 使用 Bash(mcp-cli run) 方式来调用 MCP
  - 减少上下文
  - 能自动发现

## Terminal

- 不同模型对 Terminal 的预期不同会影响工具调用成功率
- 例如每次 Reset PWD，那么 模型就会都带上 CD

---

- 原子化执行
  - 每次 Reset CWD
  - 都带上 CD
  - 链式命令 - Command Chaining
    - `cd backend && npm install`
  - 可以使用 subprocess
  - Claude Code
    - 以前版本的 Claue Code 是不会 Reset CWD 的
    - 1.0.18 CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR
      - 虚拟维护 CWD，记录 CD 信息，下次执行恢复 CWD
- 持久化终端会话 - PTY
  - Terminal 是实际存在，可以用户使用交互
  - 方便 SSH 这种场景
  - 存在 状态漂移和环境污染
  - 状态幻觉
    - 例如不知道自己所在目录，然后 `rm -rf *`
  - 可以支持类似 vim、top 这种交互持久操作

---

Sandbox

- sandbox-exec - Seatbelt - macOS
- bubblewrap - Linux

也可以配合 tmux 使用

通过 `tmux display-message -p "#S:#I.#P"` 可以得到 tmux pane 信息 Session:Window.Pane

```md
# Tmux Integration Rules

You have access to a tmux pane located at `main:1.1`.
Use this pane for all heavy execution tasks (servers, builds, logs) to keep the chat interface clean.

## Tools

- **Write**: `tmux send-keys -t <session>:<window>.<pane> "<command>" C-m`
- **Read**: `tmux capture-pane -pt <session>:<window>.<pane> -S -<lines>`
- **Clear**: `tmux send-keys -t <session>:<window>.<pane> "clear" C-m`
```
