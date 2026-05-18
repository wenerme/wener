---
title: dotprompt
---

# dotprompt

- [google/dotprompt](https://github.com/google/dotprompt)
  - Executable GenAI prompt templates
  - 使用 Handlebars 模板
  - `*.prompt`


**适合**

- 需要多语言一致 prompt 资产标准（TS/Python/Go/Rust/Java）。
- 需要 prompt 与 model 参数、输入输出 schema 同步维护。
- 需要模板复用（partial/helper）与可插拔 resolver。

**不适合**

- 直接当成企业 prompt studio（审批、发布、回滚、审计、RBAC）。
- 直接承担多租户治理与发布编排。
- 直接承担实验分析闭环（A/B 指标和评估系统在外层）。

---

```md
---
model: googleai/gemini-2.5-pro
input:
  schema:
    text: string
output:
  format: json
  schema:
    name?: string, the full name of the person
    age?: number, the age of the person
    occupation?: string, the person's occupation
---

Extract the requested information from the given text. If a piece of information
is not present, omit that field from the output.

Text: {{text}}
```
