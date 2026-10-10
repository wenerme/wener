---
title: Asyar
tags:
  - Software
  - Launcher
---

# Asyar

- [Xoshbin/asyar](https://github.com/Xoshbin/asyar)
  - GPL-3.0, Rust, TypeScript, Tauri 2, Svelte 5, SvelteKit
  - 跨平台应用启动器，支持文件搜索、剪贴板历史、文本展开、脚本、AI Agent 和 MCP
  - 支持 macOS、Windows、Linux
  - 启动器 `asyar-launcher` 使用 GPL-3.0；`asyar-sdk` 和扩展工具 `asyar-ext-builder` 使用 MIT
- 参考
  - [官网](https://asyar.org/)
  - [下载](https://github.com/Xoshbin/asyar/releases)
  - [Getting Started](https://asyar.org/docs/guide/getting-started)
  - [Technology Stack](https://asyar.org/docs/explanation/technology-stack)
  - [Scripts](https://asyar.org/docs/guide/features/scripts)
  - [Extensions](https://asyar.org/docs/guide/features/extensions)
  - [AI Providers](https://asyar.org/docs/explanation/ai-provider-plugins)
  - [MCP](https://asyar.org/docs/guide/features/mcp)
  - [Migrating from Raycast](https://asyar.org/docs/guide/features/migrating-from-raycast)

## 安装

```bash
# macOS
brew tap Xoshbin/asyar
# Homebrew 6+ 按上游说明需要信任第三方 tap
brew trust --tap xoshbin/asyar
brew install --cask asyar

# macOS / Linux - 上游安装脚本
curl -fsSL https://raw.githubusercontent.com/Xoshbin/asyar/main/install.sh | sh
```

- 手动安装：从 Releases 选择对应操作系统、CPU 架构的安装包
  - macOS - `.dmg`
  - Windows - `.msi`
  - Linux - 安装脚本使用 AppImage，默认安装到 `~/.local/bin/asyar`
- 首次启动打开引导，配置全局快捷键、主题与扩展；快捷键可在 Settings 中修改
  - `0.1.1-50` 默认唤起快捷键为 macOS `⌥Space`，对应 `Alt + Space`
- macOS 文本展开、粘贴和获取选中文本需要 Accessibility 权限

## 数据目录

```text
~/Library/Application Support/org.asyar.app/
├── settings.dat        # 设置，顶层键为 settings
├── asyar_data.db       # 应用数据、搜索历史等
└── file_index_snapshot.bin # 文件索引快照，独立于 SQLite

~/Library/Logs/org.asyar.app/
```

- macOS `0.1.1-50` 的主设置保存在 `settings.dat`
- 日志中的 `Application initialization complete.` 表示前端初始化完成；快捷键和跨应用操作仍需实际交互验证

## File Search

- Settings → File Search - 配置扫描范围、排除规则与索引重建
- `settings.fileSearch.enabled` - 启停文件索引
- `settings.fileSearch.includeRoots` - 扫描根目录，空数组表示整个家目录
  - 使用 Add Root 选择目录；配置保存的是绝对路径，不自动展开 `~`
  - 需要降低扫描量时，优先选择实际要搜索的目录
- `settings.fileSearch.excludePatterns` - 自定义排除，叠加到内置规则
  - `*.log` - 排除匹配文件名
  - `node_modules`、`.git`、`Library`、`target`、`dist`、`build`、`.venv`、`vendor` 等已内置排除
  - 全家目录扫描时，可按需增加 `go/pkg`、`.npm/_cacache`、`.nvm/versions` 等依赖和运行时缓存路径
  - 使用名称或相对路径模式；`~` 不展开，前导 `/` 在扫描与增量监听中的语义不一致
- 修改根目录或排除规则会启动后台全量重建；等待 Index Status 返回 Ready 或显示容量限制
  - 重建期间仍可能看到旧结果
  - 旧快照没有配置指纹；有过期结果时使用 Rebuild Index，单纯重启不保证重新扫描
  - 离线修改 `settings.dat` 时先退出应用并备份设置；把旧 `file_index_snapshot.bin` 移到备份目录，再正常启动应用，可触发完整重建
- 全量扫描上限为 1,000,000 个条目，包含目录和符号链接；界面的 files indexed 不只统计普通文件

:::caution 0.1.1-50 的隐藏文件与忽略规则

`indexHidden` 字段尚未接入实际扫描和查询逻辑。扫描允许未被规则排除的隐藏目录；查询只过滤条目本身的点名前缀，隐藏目录内的普通文件仍可能入索引并显示。

初次扫描遵守 `.gitignore` / `.ignore`，增量监听不重新解析这些文件；需要持续排除的目录应加入显式 Exclude Patterns。

:::

## 功能

- 搜索 - 应用、文件、命令；支持命令别名和独立快捷键
- Calculator - 在搜索栏计算，支持货币转换
- Clipboard History - 搜索、复用剪贴板内容；可合并多个条目后粘贴
- Snippets - 带关键词的文本片段与后台文本展开
- Portals - URL、搜索入口；支持 `{query}` 等动态参数
- Window Management - 窗口布局、跨屏移动、自定义布局和恢复上一次位置
- Scripts - 从监听目录发现脚本，支持参数、执行状态和定时更新结果
- AI Agents - 自定义模型、提示词、会话和可调用工具
  - Silent AI Commands - 使用选中文本或剪贴板作为输入，将结果原位替换到应用中
- Extensions - 社区扩展、主题、命令；可通过 SDK 开发

## 操作

以下组合键以 macOS 为例；唤起启动器使用首次设置时选择的全局快捷键。

| 操作                  | 按键 / 输入           |
| --------------------- | --------------------- |
| 选择结果              | `↑` / `↓`             |
| 执行选中结果          | `Enter`               |
| 打开选中结果的 Actions | `⌘K`                  |
| 打开 Settings         | `⌘,`                  |
| 返回、清空或隐藏窗口  | `Esc`                 |
| 打开扩展商店          | 输入 `store`          |
| 打开脚本库            | 输入 `Script Library` |

## Scripts

- Settings → Scripts → Add Directory：添加脚本监听目录
- 脚本需要可执行权限；增删脚本后自动更新搜索结果
- `@asyar.title` - 命令显示名称
- `@asyar.icon` - 图标
- `@asyar.argument:1` ~ `@asyar.argument:3` - 输入参数，最多三个
- `@asyar.mode` - `silent`、`compact`、`fullOutput`、`inline`；默认 `compact`
- `@asyar.refreshTime` - `inline` 模式自动刷新间隔，如 `30s`、`5m`；最小 10 秒

```bash title="hello.sh"
#!/bin/bash
# @asyar.title 打招呼
# @asyar.icon icon:terminal
# @asyar.mode compact
# @asyar.argument:1 { "name": "name", "type": "text", "required": true }

printf 'Hello, %s\n' "$1"
```

```bash
chmod +x hello.sh
```

## AI 与 MCP

- 模型提供商 - OpenAI、Anthropic、Google Gemini、OpenRouter、Ollama、自定义 OpenAI-compatible endpoint
  - BYOK（Bring Your Own Key）：使用自己的 API key；云端模型按服务商规则计费
  - 本机 Ollama 可用于本地推理；云端模型会将输入发送到配置的服务商
- Agent 运行时由 Rust 管理：模型请求、流式响应、会话状态、工具调用、取消和持久化
- MCP（Model Context Protocol）支持 `stdio` 本地进程和 HTTP 远程服务
  1. 搜索 `Install MCP Server`，填写命令、参数、环境变量或 URL、Headers
  2. 使用 `Test Connection` 确认连接与工具发现，再安装
  3. 在 `Manage Agents` 的 Tools 中勾选该 Agent 可使用的工具
- `Import MCP Servers` - 从已检测到的其他应用配置或粘贴的 JSON 导入
- Permissions - 查看、撤销已保存的工具授权；Strict mode 下每次 MCP 工具调用都请求确认

## Extensions

- `store` - 浏览和安装社区扩展；扩展商店仍处于早期开发阶段
- Settings → Extensions - 启停扩展、为命令设置别名和全局快捷键
- Developer Mode - 可从本地文件安装扩展
- `asyar-sdk` - 扩展开发接口；通过宿主服务访问剪贴板、通知等能力
- 扩展视图运行于 iframe；访问宿主能力受权限与 IPC 检查约束

# FAQ

## 从 Raycast 迁移

1. 在 Raycast 执行 `Export Settings & Data`，导出 `.rayconfig`
2. 在 Asyar 搜索 `Import from Raycast`，选择导出文件；加密导出需要输入密码
3. 预览并选择导入类别，确认导入；重复条目会跳过

| Raycast 数据           | Asyar 对应项                   |
| ---------------------- | ------------------------------ |
| Snippets               | Snippets                       |
| Quicklinks             | Portals                        |
| 应用快捷键与别名       | 已安装且被索引的应用快捷键与别名 |

- 支持 Raycast 单独导出的 snippets / quicklinks JSON
- AI 提供商配置、第三方扩展需要另行设置

## Wayland 全局快捷键

- 在桌面环境或 compositor 中绑定快捷键，调用 `asyar-summon`
- 上游 Linux 安装脚本将辅助程序放到 `~/.local/bin/asyar-summon`
- 桌面快捷键执行环境未包含该目录时，使用辅助程序的完整路径
- GNOME / KDE 使用自定义快捷键；Hyprland / Sway 在各自配置中绑定命令
