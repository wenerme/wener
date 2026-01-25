---
title: Agent Rule
---

# Agent Rule

```
~/                                   # 全局配置
├── .claude/CLAUDE.md                # Claude Code
├── .codex/AGENTS.md                 # Codex
└── .gemini/GEMINI.md                # Gemini

project/                             # 项目配置
├── .github/
│   ├── copilot-instructions.md      # Copilot
│   └── instructions/*.md            # Copilot (细粒度)
├── .cursor/rules/*.mdc              # Cursor
├── .claude/
│   ├── CLAUDE.md
│   └── rules/*.md                   # Claude Code
├── .windsurf/rules/*.md             # Windsurf
├── .agent/rules/                    # Generic Agent
├── .antigravity/rules.md            # Antigravity
├── CLAUDE.md                        # Claude Code
├── CLAUDE.local.md                  # Claude Code (gitignore)
├── AGENTS.md                        # Codex + 通用
├── AGENTS.override.md               # Codex (最高优先级)
├── agent.md                         # Generic Agent
├── .cursorrules                     # Cursor (废弃)
└── .windsurfrules                   # Windsurf (旧)
```
