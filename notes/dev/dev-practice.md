---
tags:
  - Practice
---

# Dev Practice

- 不同项目区分下端口
  - 例如 前端 3052, 后端 8052, Storybook 6052
- 不同项目使用不同 localhost 作为 origin, 可以避免跨域问题
  - 例如 project1.localhost, project2.localhost
  - 这些都会解析为 127.0.0.1

```json title=".claude/setting.json"
{
  "permissions": {
    "allow": [
      "mcp__context7",
      "mcp__feishu__contact_v3_user_batchGetId",
      "mcp__feishu__docx_v1_document_rawContent",
      "mcp__feishu__im_v1_chat_list",
      "mcp__feishu__im_v1_chatMembers_get",
      "mcp__feishu__im_v1_message_list",
      "mcp__feishu__wiki_v2_space_getNode",
      "mcp__feishu-docs",
      "mcp__gitlab__get_project",
      "mcp__linear__get_user",
      "mcp__linear__list_issues",
      "mcp__linear__list_my_issues",
      "mcp__playwright",
      "mcp__todoist__find-projects",
      "mcp__todoist__find-tasks",
      "mcp__todoist__get-overview",
      "Bash(awk:*)",
      "Bash(cat:*)",
      "Bash(clear:*)",
      "Bash(cp:*)",
      "Bash(curl:*)",
      "Bash(cut:*)",
      "Bash(date:*)",
      "Bash(df:*)",
      "Bash(diff:*)",
      "Bash(du:*)",
      "Bash(echo:*)",
      "Bash(env:*)",
      "Bash(find:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(git pull:*)",
      "Bash(git push:*)",
      "Bash(git rev-parse:*)",
      "Bash(git shortlog:*)",
      "Bash(git tag:*)",
      "Bash(grep:*)",
      "Bash(head:*)",
      "Bash(history:*)",
      "Bash(less:*)",
      "Bash(ls:*)",
      "Bash(man:*)",
      "Bash(mkdir:*)",
      "Bash(more:*)",
      "Bash(mv:*)",
      "Bash(pnpm add:*)",
      "Bash(pnpm list:*)",
      "Bash(pnpm vitest*)",
      "Bash(ps:*)",
      "Bash(pwd:*)",
      "Bash(rm:*)",
      "Bash(sed:*)",
      "Bash(sort:*)",
      "Bash(tail:*)",
      "Bash(top:*)",
      "Bash(touch:*)",
      "Bash(tr:*)",
      "Bash(tree:*)",
      "Bash(uname:*)",
      "Bash(whoami:*)",
      "Bash(xargs:*)",
      "WebFetch(domain:base-ui.com)",
      "WebFetch(domain:daisyui.com)",
      "WebFetch(domain:docs.anthropic.com)",
      "WebFetch(domain:github.com)",
      "WebFetch(domain:open.feishu.cn)",
      "WebFetch(domain:raw.githubusercontent.com)",
      "WebSearch",
      "Write(**/*.local.md)"
    ]
  }
}
```

## AGENTS.md

```md
# RULES

- use "context7" tool for api docs checking
- may use "playwright" tool to verify storybook stories
- use "zod" for schema definition and validation
  - DONT use `nullable()` use `nullish()` instead
  - try to avoid using transform, use `z.coerce` instead
  - place `export const Type = z.infer<TypeSchema>` above `TypeSchema`
- React
  - using v19
  - no need to forwardRef
  - avoid using React namespace like `React.ReactNode`, using `ReactNode` instead
- TypeScript
  - avoid using `null`, use `undefined` or optional field instead
  - NEVER use `enum` , use `Object.freeze({__proto__:null} as const)` instead
  - NEVER use `namespace`, use `export * as XYZ from './xyz.mod'` instead
- HTML
  - `<button>` should always have `type` attribute
```
