---
title: Repomix
---

# Repomix

- [yamadashy/repomix](https://github.com/yamadashy/repomix)
  - MIT, TypeScript
  - Repomix 可将整个代码仓库打包为一个适合AI处理的文件，方便用于 LLMs（如 Claude、ChatGPT、DeepSeek、Perplexity、Gemini、Gemma、Llama、Grok 等）分析代码。

```bash
npm add -g repomix
brew install repomix

repomix --init # repomix.config.json

repomix path/to/directory
repomix --include "src/**/*.ts,**/*.md"
repomix --ignore "**/*.log,tmp/"

# --remote-branch
repomix --remote https://github.com/wenerme/wode
repomix --remote wenerme/wode
```

| flag                                | for                                                   |
| ----------------------------------- | ----------------------------------------------------- |
| `-o, --output <file>`               | 指定输出文件名                                        |
| `--stdout`                          | 输出到标准输出（不能与 `--output` 同时使用）          |
| `--style <style>`                   | 指定输出格式（`xml`、`markdown`、`plain`）            |
| `--parsable-style`                  | 启用可解析输出，便于后续处理（可能增加 token 数量）   |
| `--compress`                        | 智能提取代码核心，减少 token 数量                     |
| `--output-show-line-numbers`        | 输出中显示行号                                        |
| `--copy`                            | 生成内容同时复制到剪贴板                              |
| `--no-file-summary`                 | 不输出文件摘要部分                                    |
| `--no-directory-structure`          | 不输出目录结构部分                                    |
| `--remove-comments`                 | 移除支持类型文件中的注释                              |
| `--remove-empty-lines`              | 移除输出中的空行                                      |
| `--header-text <text>`              | 自定义文件头部文本                                    |
| `--instruction-file-path <path>`    | 指定包含详细自定义指令的文件路径                      |
| `--include-empty-directories`       | 输出中包含空目录                                      |
| `--include-diffs`                   | 包含 git 差异（工作区和暂存区）                       |
| `--no-git-sort-by-changes`          | 不按 git 变更次数排序文件（默认启用排序）             |
| `--include <patterns>`              | 指定包含的文件模式（逗号分隔）                        |
| `-i, --ignore <patterns>`           | 额外忽略的文件模式（逗号分隔）                        |
| `--no-gitignore`                    | 不使用 .gitignore 文件                                |
| `--no-default-patterns`             | 不使用默认模式                                        |
| `--remote <url>`                    | 处理远程 Git 仓库                                     |
| `--remote-branch <name>`            | 指定远程分支、标签或提交（默认主分支）                |
| `-c, --config <path>`               | 指定自定义配置文件路径                                |
| `--init`                            | 创建配置文件                                          |
| `--global`                          | 使用全局配置                                          |
| `--no-security-check`               | 禁用安全检查                                          |
| `--token-count-encoding <encoding>` | 指定 token 计数编码（如 `o200k_base`、`cl100k_base`） |
| `--mcp`                             | 以 MCP 协议服务器模式运行                             |
| `--top-files-len <number>`          | 摘要中显示的文件数量                                  |
| `--verbose`                         | 输出详细日志                                          |
| `--quiet`                           | 禁止所有标准输出                                      |

- xml 格式
  - https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags
- compress
  - https://github.com/tree-sitter/tree-sitter
- .repomixignore

**MCP**

```bash
code --add-mcp '{"name":"repomix","command":"npx","args":["-y","repomix","--mcp"]}'
code-insiders --add-mcp '{"name":"repomix","command":"npx","args":["-y","repomix","--mcp"]}'
```

_Cline_

```json title="cline_mcp_settings.json"
{
  "mcpServers": {
    "repomix": {
      "command": "npx",
      "args": ["-y", "repomix", "--mcp"]
    }
  }
}
```

## prompts

**Code Review and Refactoring**

```
This file contains my entire codebase. Please review the overall structure and suggest any improvements or refactoring opportunities, focusing on maintainability and scalability.
```

```
这个文件包含了我整个代码库。请审查整体结构，并提出任何改进或重构的建议，重点关注可维护性和可扩展性。
```

```
分析此代码库的架构：
1. 评估整体结构和模式
2. 识别潜在的架构问题
3. 提出改进可扩展性的建议
4. 标注遵循最佳实践的部分

重点关注可维护性和模块化。
```

**Documentation Generation**

```
Based on the codebase in this file, please generate a detailed README.md that includes an overview of the project, its main features, setup instructions, and usage examples.
```

**Test Case Generation**

```
Analyze the code in this file and suggest a comprehensive set of unit tests for the main functions and classes. Include edge cases and potential error scenarios.
```

**Code Quality Assessment**

```
Review the codebase for adherence to coding best practices and industry standards. Identify areas where the code could be improved in terms of readability, maintainability, and efficiency. Suggest specific changes to align the code with best practices.
```

**Library Overview**

```
This file contains the entire codebase of library. Please provide a comprehensive overview of the library, including its main purpose, key features, and overall architecture.
```
