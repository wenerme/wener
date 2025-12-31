---
title: gemini-cli
tags: [Agent, CLI]
---

# gemini-cli

- [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)
  - Apache-2.0, TypeScript
  - 使用 @gogole/genai
- .geminiignore
- settings.json
  - ~/.gemini/settings.json
  - .gemini/settings.json
  - /etc/gemini-cli/settings.json
  - `C:\ProgramData\gemini-cli\settings.json`
  - `/Library/Application Support/GeminiCli/settings.json`
- .env
  - 在 JSON 里直接使用 `"$MY_API_TOKEN"`
- .gemini/
  - sandbox-macos-custom.sb
  - sandbox.Dockerfile
- `~/.gemini/tmp/<project_hash>/shell_history`
- `<workspace>/.gemini/extensions`
- `<home>/.gemini/extensions/<name>/gemini-extension.json`
- 参考
  - https://geminicli.com/extensions/browse/
  - [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)
    - based on Gemini CLI
  - https://cloud.google.com/gemini/docs/codeassist/gemini-cli
  - https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/commands.md
- env
  - TERM_PROGRAM=vscode
    - 检测 IDE 类型
    - vscode 扩展 https://github.com/google-gemini/gemini-cli/tree/main/packages/vscode-ide-companion
    - Open Editor File Context
    - Selection Context
- 参考
  - 不支持修改 BaseURL https://github.com/google-gemini/gemini-cli/issues/6746
  - BaseURL https://generativelanguage.googleapis.com/

```bash
brew install gemini-cli
npm install -g @google/gemini-cli@latest

gemini
gemini -r # 恢复会话

# 支持修改 Provider
export GEMINI_API_KEY=""
export GOOGLE_GEMINI_BASE_URL=""
# 只能通过 ENV 配置主要模型，无法修改 Flash 模型，Flash 模型需要通过 settings.json 修改
export GEMINI_MODEL=""
gemini "Hello"
```

## 配置 {#configuration}

- 环境变量加载 - 用来配置 API KEY 和 BaseURL
  - .env
  - .env 往上搜索到 .git
  - .gemini/.env
  - ~/.env
  - ~/.gemini/.env
- 配置加载 - 用来配置模型、工具等
  - .gemini/settings.json
  - ~/.gemini/settings.json
  - 默认配置 https://github.com/google-gemini/gemini-cli/blob/main/packages/core/src/config/defaultModelConfigs.ts
- 参考
  - https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/configuration.md

| 变量名                            | 默认值              | 用途说明                                                                                                                                                                                    |
| --------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GEMINI_API_KEY`                  |                     | Gemini API 的 API Key。可作为多种认证方法之一。请设置在你的 shell 配置文件（如 `~/.bashrc` 或 `~/.zshrc`）或 `.env` 文件中。**需保密**。                                                    |
| `GEMINI_MODEL`                    |                     | 指定 Gemini 默认使用的模型，覆盖内置默认模型。                                                                                                                                              |
| `GOOGLE_API_KEY`                  |                     | 你的 Google Cloud API Key，用于 express 模式的 Vertex AI。需要相应权限。                                                                                                                    |
| `GOOGLE_CLOUD_PROJECT`            |                     | 你的 Google Cloud 项目 ID。用于 Code Assist 或 Vertex AI。Vertex AI 需此项并具有必要权限。在 Cloud Shell 环境中默认会被自动分配的项目覆盖。若需指定项目，需在 `.env` 中定义。               |
| `GOOGLE_APPLICATION_CREDENTIALS`  |                     | 指向 Google Application Credentials JSON 文件的路径。                                                                                                                                       |
| `OTLP_GOOGLE_CLOUD_PROJECT`       |                     | 用于 Google Cloud Telemetry 的项目 ID。                                                                                                                                                     |
| `GEMINI_TELEMETRY_ENABLED`        |                     | 是否启用 telemetry。设为 `true`/`1` 启用，其他值为关闭，覆盖 telemetry.enabled 配置。                                                                                                       |
| `GEMINI_TELEMETRY_TARGET`         |                     | 设置 telemetry 目标（如 `local` 或 `gcp`），覆盖 telemetry.target 配置。                                                                                                                    |
| `GEMINI_TELEMETRY_OTLP_ENDPOINT`  |                     | 设置 telemetry 的 OTLP 端点地址，覆盖 telemetry.otlpEndpoint 配置。                                                                                                                         |
| `GEMINI_TELEMETRY_OTLP_PROTOCOL`  |                     | 设置 OTLP 协议（`grpc` 或 `http`），覆盖 telemetry.otlpProtocol 配置。                                                                                                                      |
| `GEMINI_TELEMETRY_LOG_PROMPTS`    |                     | 是否日志记录用户 prompt，`true`/`1` 启用，其他禁用，覆盖 telemetry.logPrompts 配置。                                                                                                        |
| `GEMINI_TELEMETRY_OUTFILE`        |                     | telemetry target 为 `local` 时，写入 telemetry 的文件路径，覆盖 telemetry.outfile 配置。                                                                                                    |
| `GEMINI_TELEMETRY_USE_COLLECTOR`  |                     | 启用/禁用外部 OTLP collector，`true`/`1` 启用，其他禁用，覆盖 telemetry.useCollector 配置。                                                                                                 |
| `GOOGLE_CLOUD_LOCATION`           |                     | 你的 Google Cloud 项目地域，用于非 express 模式下的 Vertex AI。                                                                                                                             |
| `GEMINI_CLI`                      | 1                   | Shell 检测 CLI 运行环境（1 表示由 CLI 启动）                                                                                                                                                |
| `GEMINI_CONFIG_DIR`               | `.gemini`           | 配置目录名。                                                                                                                                                                                |
| `GEMINI_SYSTEM_MD`                | `.gemini/system.md` | 替换内置 system prompt 的 Markdown 文件路径。`true/1` 使用项目默认路径（`./.gemini/system.md`），填写其他字符串为自定义路径（支持相对/绝对路径和 `~`），`false/0` 或未设置则用内置 prompt。 |
| `GEMINI_WRITE_SYSTEM_MD`          |                     | 是否写入当前内置 system prompt 到文件。`true/1` 写入 `./.gemini/system.md`，如填其他则作为目标路径。建议首次运行时设置以生成模板。                                                          |
| `GEMINI_CLI_NO_RELAUNCH`          |                     | 禁用自动重启。                                                                                                                                                                              |
| `GEMINI_CLI_SYSTEM_SETTINGS_PATH` |                     | 覆盖默认 `settings.json` 路径。                                                                                                                                                             |
| `GEMINI_CLI_DISABLE_AUTOUPDATER`  |                     | 禁用自动更新。                                                                                                                                                                              |
| `SANDBOX`                         |                     | 安全隔离与沙箱配置。除 settings.json 的 sandbox 外，也可通过此变量指定沙箱方式（支持 true, false, docker, podman 或自定义命令行字符串）。                                                   |
| `GEMINI_SANDBOX`                  |                     | 作为 sandbox 配置的替代项，语法同 `SANDBOX`。                                                                                                                                               |
| `SEATBELT_PROFILE` (仅 macOS)     |                     | macOS 沙箱 seatbelt（sandbox-exec）profile。`permissive-open`（默认）允许写操作在项目等目录，`strict` 更严格，或提供自定义 profile（如项目目录下 `.gemini/sandbox-macos-<profile>.sb`）。   |
| `TERM_PROGRAM`                    |                     | 终端程序环境变量用于检测 IDE 类型等。                                                                                                                                                       |
| `GOOGLE_GENAI_USE_VERTEXAI`       |                     | 为启用 Vertex AI，需设置 `GOOGLE_CLOUD_PROJECT` 和 `GOOGLE_CLOUD_LOCATION` 或 `GOOGLE_API_KEY`。                                                                                            |
| `DEBUG` `DEBUG_MODE`              |                     | 启用详细调试日志，`true`/`1` 启用（用于底层库/cli）。此变量默认不会从项目 `.env` 加载，否则可能影响 gemini-cli，请用 `.gemini/.env` 指定。                                                  |
| `NO_COLOR`                        |                     | 设任意值禁用 CLI 彩色输出。                                                                                                                                                                 |
| `CLI_TITLE`                       |                     | 自定义 CLI 窗口标题。                                                                                                                                                                       |
| `CODE_ASSIST_ENDPOINT`            |                     | 指定代码辅助 server endpoint，适用于开发/测试等场景。                                                                                                                                       |

- https://github.com/google-gemini/gemini-cli/blob/main/docs/get-started/configuration.md

**说明：**

- 支持多配置文件优先级（如 `~/.gemini/settings.json`、`.gemini/settings.json`、`/etc/gemini-cli/settings.json` 等）
- `.env` 文件中可用 shell 变量（如 `"$MY_API_TOKEN"`）进行变量展开

## 自定义模型

- 例如修改 gemini-3-pro-preview -> google/gemini-3-pro-preview
  - 用于第三方 Provider 场景

```json
{
  "model": {
    "name": "google/gemini-3-pro-preview"
  },
  "modelConfigs": {
    "customAliases": {
      "gemini-2.5-pro": {
        "extends": "chat-base-2.5",
        "modelConfig": {
          "model": "google/gemini-3-pro-preview"
        }
      },
      "gemini-3-pro-preview": {
        "extends": "chat-base-3",
        "modelConfig": {
          "model": "google/gemini-3-pro-preview"
        }
      },
      "gemini-2.5-flash": {
        "extends": "chat-base-2.5",
        "modelConfig": {
          "model": "google/gemini-3-flash-preview"
        }
      },
      "gemini-2.5-flash-lite": {
        "extends": "chat-base-2.5",
        "modelConfig": {
          "model": "google/gemini-3-flash-preview"
        }
      },
      "gemini-3-flash-preview": {
        "extends": "chat-base-3",
        "modelConfig": {
          "model": "google/gemini-3-flash-preview"
        }
      },
      "gemini-2.5-flash-base": {
        "extends": "base",
        "modelConfig": {
          "model": "google/gemini-3-flash-preview"
        }
      },
      "classifier": {
        "extends": "base",
        "modelConfig": {
          "model": "google/gemini-3-flash-preview",
          "generateContentConfig": {
            "maxOutputTokens": 1024,
            "thinkingConfig": {
              "thinkingBudget": 512
            }
          }
        }
      },
      "prompt-completion": {
        "extends": "base",
        "modelConfig": {
          "model": "google/gemini-3-flash-preview",
          "generateContentConfig": {
            "temperature": 0.3,
            "maxOutputTokens": 16000,
            "thinkingConfig": {
              "thinkingBudget": 0
            }
          }
        }
      },
      "edit-corrector": {
        "extends": "base",
        "modelConfig": {
          "model": "google/gemini-3-flash-preview",
          "generateContentConfig": {
            "thinkingConfig": {
              "thinkingBudget": 0
            }
          }
        }
      },
      "summarizer-default": {
        "extends": "base",
        "modelConfig": {
          "model": "google/gemini-3-flash-preview",
          "generateContentConfig": {
            "maxOutputTokens": 2000
          }
        }
      },
      "summarizer-shell": {
        "extends": "base",
        "modelConfig": {
          "model": "google/gemini-3-flash-preview",
          "generateContentConfig": {
            "maxOutputTokens": 2000
          }
        }
      },
      "web-search": {
        "extends": "gemini-2.5-flash-base",
        "modelConfig": {
          "generateContentConfig": {
            "tools": [{ "googleSearch": {} }]
          }
        }
      },
      "web-fetch": {
        "extends": "gemini-2.5-flash-base",
        "modelConfig": {
          "generateContentConfig": {
            "tools": [{ "urlContext": {} }]
          }
        }
      },
      "web-fetch-fallback": {
        "extends": "gemini-2.5-flash-base",
        "modelConfig": {}
      },
      "loop-detection": {
        "extends": "gemini-2.5-flash-base",
        "modelConfig": {}
      },
      "loop-detection-double-check": {
        "extends": "base",
        "modelConfig": {
          "model": "google/gemini-3-pro-preview"
        }
      },
      "llm-edit-fixer": {
        "extends": "gemini-2.5-flash-base",
        "modelConfig": {}
      },
      "next-speaker-checker": {
        "extends": "gemini-2.5-flash-base",
        "modelConfig": {}
      },
      "chat-compression-3-pro": {
        "modelConfig": {
          "model": "google/gemini-3-pro-preview"
        }
      },
      "chat-compression-3-flash": {
        "modelConfig": {
          "model": "google/gemini-3-flash-preview"
        }
      },
      "chat-compression-2.5-pro": {
        "modelConfig": {
          "model": "google/gemini-3-pro-preview"
        }
      },
      "chat-compression-2.5-flash": {
        "modelConfig": {
          "model": "google/gemini-3-flash-preview"
        }
      },
      "chat-compression-2.5-flash-lite": {
        "modelConfig": {
          "model": "google/gemini-3-flash-preview"
        }
      },
      "chat-compression-default": {
        "modelConfig": {
          "model": "google/gemini-3-pro-preview"
        }
      }
    }
  }
}
```

## commands

| command         | for                            | notes                                                          |
| --------------- | ------------------------------ | -------------------------------------------------------------- |
| `/about`        | 显示版本信息                   |
| `/auth`         | 更换认证方式                   |
| `/bug`          | 提交 Gemini CLI 问题           | `/bug <标题>`                                                  |
| `/chat`         | 保存/恢复会话历史              | `save <tag>`<br>`resume <tag>`<br>`list`                       |
| `/clear`        | 清屏，清除可见历史             | Ctrl+L                                                         |
| `/compress`     | 用摘要替换全部上下文           |
| `/copy`         | 复制上次输出到剪贴板           |
| `/corgi`        | 切换 Corgi 模式（AI 角色）     |
| `/editor`       | 选择支持的编辑器               |
| `/extensions`   | 列出当前会话扩展               |
| `/help` `/？`   | 显示帮助信息                   |
| `/ide`          |                                | `/ide status`, `/ide install`                                  |
| `/mcp`          | 管理 MCP 服务器和工具          | `desc`/`descriptions`<br>`nodesc`/`nodescriptions`<br>`schema` |
| `/memory`       | 管理 AI 指令上下文             | `add <内容>`<br>`show`<br>`refresh`                            |
| `/privacy`      | 显示隐私声明及同意设置         |
| `/quit` `/exit` | 退出 CLI                       |
| `/restore`      | 恢复文件到工具执行前状态       | `/restore [tool_call_id]`                                      |
| `/stats`        | 显示会话统计信息               |
| `/theme`        | 更换 CLI 主题                  |
| `/tools`        | 列出可用工具                   | `desc`/`descriptions`<br>`nodesc`/`nodescriptions`             |
| `!<shell命令>`  | 执行 shell 命令                | `!ls -la`<br>`!git status`                                     |
| `!`             | 切换 shell 模式                |
| `@<路径>`       | 注入指定文件/目录内容到 prompt | `@README.md`<br>`@src/`                                        |
| `@`             | 单独 `@` 传递原始查询          |

> ⚠️ Shell 模式下命令拥有与终端同等权限，请谨慎操作。

## settings.json

```json
{
  "contextFileName": "GEMINI.md",
  "bugCommand": {
    "urlTemplate": "https://bug.example.com/new?title={title}&info={info}"
  },
  "fileFiltering": {
    "respectGitIgnore": true,
    "enableRecursiveFileSearch": false
  },
  // https://github.com/google-gemini/gemini-cli/blob/main/docs/core/tools-api.md#built-in-tools
  "coreTools": [],
  "excludeTools": [],
  "allowMCPServers": [],
  "excludeMCPServers": [],
  "autoAccept": false,
  "sandbox": false, // docker
  "toolDiscoveryCommand": "",
  "toolCallCommand": "",
  "mcpServers": {
    "myPythonServer": {
      "command": "python",
      "args": ["mcp_server.py", "--port", "8080"],
      "cwd": "./mcp_tools/python",
      "timeout": 5000
    }
  },
  "checkpointing": { "enabled": false },
  "preferredEditor": "vscode",
  "telemetry": {
    "enabled": false,
    "target": "local",
    "otlpEndpoint": "http://localhost:4317",
    "logPrompts": true
  },
  "usageStatisticsEnabled": false,
  "hideTips": false,
  "hideBanner": false,
  "summarizeToolOutput": {
    "run_shell_command": {
      "tokenBudget": 2000
    }
  },
  "maxSessionTurns": -1,
  "theme": "Atom One",
  "selectedAuthType": "oauth-personal"
}
```

| tool              | for                            |
| ----------------- | ------------------------------ |
| **FS**            | 文件系统工具                   |
| LSTool            | 列出目录内容                   |
| ReadFileTool      | 读取单个文件内容               |
| WriteFileTool     | 写入内容到文件                 |
| GrepTool          | 在文件中搜索模式               |
| GlobTool          | 查找匹配 glob 模式的文件       |
| EditTool          | 对文件进行原地修改             |
| ReadManyFilesTool | 读取并拼接多个文件或 glob 内容 |
| **Execution**     | 执行工具                       |
| ShellTool         | 执行 shell 命令                |
| **Web**           | Web 工具                       |
| WebFetchTool      | 获取指定 URL 内容              |
| WebSearchTool     | 执行网页搜索                   |
| **Memory**        | 内存工具                       |
| MemoryTool        | 与 AI 的记忆交互               |

- Promopts
  - https://github.com/google-gemini/gemini-cli/blob/main/packages/core/src/core/prompts.ts
  - getCoreSystemPrompt
  - getCompressionPrompt

| env                    | for                  |
| ---------------------- | -------------------- |
| GEMINI_MODEL           | gemini-2.5-pro       |
| GEMINI_FLASH_MODEL     | gemini-2.5-flash     |
| GEMINI_EMBEDDING_MODEL | gemini-embedding-001 |
| GOOGLE_GEMINI_BASE_URL |
| GEMINI_API_KEY         |

- 目前只支持 Gemini 模型
  - https://github.com/google-gemini/gemini-cli/discussions/1974#discussioncomment-13591013
  - LiteLLM 代理 https://docs.litellm.ai/docs/tutorials/litellm_gemini_cli
  - multi provider fork https://github.com/acoliver/llxprt-code

## extensions

```json title="gemini-extension.json"
{
  "name": "my-extension",
  "version": "1.0.0",
  "mcpServers": {
    "my-server": {
      "command": "node my-server.js"
    }
  },
  "contextFileName": "GEMINI.md",
  "excludeTools": ["run_shell_command"]
}
```

```
.gemini/extensions/gcp/
├── gemini-extension.json
└── commands/
    ├── deploy.toml
    └── gcs/
        └── sync.toml
```

- https://github.com/google-gemini/gemini-cli/blob/main/docs/extension.md

## conductor

- https://github.com/gemini-cli-extensions/conductor
- CDD - Context Driven Development - 上下文驱动开发
- 不依赖聊天记录，而是将项目的上下文（Context）、技术栈（Tech Stack）、代码规范（Style Guide）等信息以 Markdown 文件的形式存储在代码仓库中。AI 会始终遵循这些文件，确保开发的一致性。
- 相比于 SpecIt 或 OpenSpec 等类似工具，Conductor 与 Gemini CLI 集成更紧密

```bash
gemini extensions install https://github.com/gemini-cli-extensions/conductor

# CONTEXT.md
gemini /conductor:setup

# spec, plan
gemini /conductor:newTrack
```

```bash
/conductor setup
# tracks/
/conductor newTrack

/conductor implement
/conductor status
/conductor revert
```

- .conductor/tracks/

## GEMINI.md

- 现在支持 [AGENTS.md](./agents.md)
- 使用 `@file.md` 可注入指定文件内容到 prompt
