---
title: AGENTS.md
---

# AGENTS.md

- [openai/agents.md](https://github.com/openai/agents.md)
  - 支持 Codex, Amp, Jules, Cursor, Factory, RooCode
- 参考
  - https://agents.md/
  - Calude Code https://github.com/anthropics/claude-code/issues/6235
  - .agents/ https://github.com/openai/agents.md/issues/9
- 类似
  - CLAUDE.md
  - GEMINI.md
- https://github.com/search?q=path:**/CLAUDE.md&type=code
- https://github.com/search?q=path:**/settings.local.json&type=code

## Memory

- .cursor/rules
- Claude
  - https://code.claude.com/docs/en/memory

| type                   | location                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Enterprise policy      | /Library/Application Support/ClaudeCode/CLAUDE.md <br/> /etc/claude-code/CLAUDE.md <br/> C:\Program Files\ClaudeCode\CLAUDE.md |
| Project memory         | ./CLAUDE.md,./.claude/CLAUDE.md                                                                                                |
| Project rules          | `./.claude/rules/*.md`                                                                                                         |
| User memory            | ~/.claude/CLAUDE.md                                                                                                            |
| User rules             | ~/.claude/rules/                                                                                                               |
| Project memory (local) | ./CLAUDE.local.md                                                                                                              |

- @path/to/import

```md
---
paths: src/api/**/*.{ts,tsx}, tests/**/*.test.ts
---

#
```
