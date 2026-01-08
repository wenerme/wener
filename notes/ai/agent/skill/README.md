---
title: skill
tags:
  - Awesome
---

# skill

- [agentskills.io](https://agentskills.io/)
  - 由 Anthropic 推动
- [agentskills/agentskills](https://github.com/agentskills/agentskills)
  - 规范和文档
- [skillsmp.com](https://skillsmp.com/)
  - Agent Skills文档和使用指南
- 参考
  - [What are skills](https://support.claude.com/en/articles/12512176-what-are-skills)


:::tip

- claude code 2.1 支持 hot reload skill, 支持 context: fork 让 skill 独立运行
- [vercel/ai#11446](https://github.com/vercel/ai/issues/11446)
  - vercel/ai Add native support for skills
- Cursor Skill
  - https://cursor.com/docs/context/skills
- [google-gemini/gemini-cli#15327](https://github.com/google-gemini/gemini-cli/issues/15327)

:::

```bash
/plugin marketplace add anthropics/skills

/plugin install document-skills@anthropic-agent-skills
```

- .claude/skills/
- .github/skills/
- .codex/skills/
- .gemini/skills/


```
skill-name/
├── SKILL.md              # 技能主文档说明
├── scripts/              # 技能相关可执行代码或脚本
├── references/           # 技术参考资料与结构化文档
│   ├── REFERENCE.md      # 技术详解说明
│   ├── FORMS.md          # 表单模板或结构化数据格式
│   └── *.md              # 领域相关参考文件
└── assets/               # 模板文件、图片、数据资料等
```

- Metadata < 100 tokens
- Instructions < 5000 tokens
  - SKILL.md 建议 < 500 lines

---

- Agent Skills
  - SOP 手册，教程
  - 静态知识
- MCP
  - USB 接口，驱动程序
  - 动态能力
- SubAgent
  - 人设，Persona

# spec

```md
---
name: my-skill-name
description: A clear description of what this skill does and when to use it
---

<!-- 引用文件方式 -->

See [the reference guide](references/REFERENCE.md) for details.

Run the extraction script:
scripts/extract.py

# My Skill Name

[Add your instructions here that Claude will follow when this skill is active]

## Examples

- Example usage 1
- Example usage 2

## Guidelines

- Guideline 1
- Guideline 2
```

**注入内容**

```xml
<available_skills>
  <skill>
    <name>pdf-processing</name>
    <description>Extracts text and tables from PDF files, fills forms, merges documents.</description>
    <location>/path/to/skills/pdf-processing/SKILL.md</location>
  </skill>
  <skill>
    <name>data-analysis</name>
    <description>Analyzes datasets, generates charts, and creates summary reports.</description>
    <location>/path/to/skills/data-analysis/SKILL.md</location>
  </skill>
</available_skills>
```
