---
title: Cursor
tags:
  - IDE
  - CLI
  - Agent
---

# Cursor

- [getcursor/cursor](https://github.com/getcursor/cursor)
  - The AI Code Editor
- 注意 可能会用非常多 Token
- 参考
  - https://docs.cursor.com/en/models
  - MCP https://cursor.com/docs/context/mcp/directory

## INFO

| 类型                      | 域名/地址                                                                | 用途描述                                                                                     |
| ------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| **Core API Domains**      | api2.cursor.sh<br>api3.cursor.sh<br>api4.cursor.sh                       | 主要 API 请求<br>Cursor Tab 请求（仅 HTTP/2）<br>基于地理位置的 Cursor Tab 请求（仅 HTTP/2） |
| **Regional API Domains**  | us-asia.gcpp.cursor.sh<br>us-eu.gcpp.cursor.sh<br>us-only.gcpp.cursor.sh | 区域性 Cursor Tab 请求（仅 HTTP/2）                                                          |
| **Codebase Indexing**     | repo42.cursor.sh                                                         | 代码库索引（仅 HTTP/2）                                                                      |
| **Extension and Updates** | marketplace.cursorapi.com<br>cursor-cdn.com<br>download.todesktop.com    | 下载扩展<br>下载扩展<br>检查和下载更新                                                       |

- `api2.cursor.sh` - 用于大部分 API 请求
- `api3.cursor.sh` - 用于 Cursor Tab 请求（仅 HTTP/2）
- `api4.cursor.sh` - 用于基于位置的 Cursor Tab 请求（仅 HTTP/2）

- 区域性 API 域名（仅用于 Cursor Tab，HTTP/2）:
  - `us-asia.gcpp.cursor.sh`
  - `us-eu.gcpp.cursor.sh`
  - `us-only.gcpp.cursor.sh`

- 代码索引:
  - `repo42.cursor.sh` - 用于代码库索引（仅 HTTP/2）

- 扩展与更新:
  - `marketplace.cursorapi.com` - 用于下载扩展
  - `cursor-cdn.com` - 用于下载扩展
  - `download.todesktop.com` - 用于检测和下载更新

# 配置 {#conf}

## 配置文件位置

| 类型    | 平台        | 路径                                    |
| ------- | ----------- | --------------------------------------- |
| Global  | macOS/Linux | `~/.cursor/cli-config.json`             |
| Global  | Windows     | `%USERPROFILE%\.cursor\cli-config.json` |
| Project | All         | `.cursor/cli.json`                      |

**环境变量覆盖：**

- `CURSOR_CONFIG_DIR` - 自定义配置目录
- `XDG_CONFIG_HOME` (Linux/BSD) - 使用 `$XDG_CONFIG_HOME/cursor/cli-config.json`

**其他配置文件：**

- `~/.cursor/mcp.json` - MCP 全局配置
- `.cursor/mcp.json` - MCP 项目配置

**注意：**

- Project 级别的 `.cursor/cli.json` 只能配置 permissions
- 其他 CLI 设置必须在 Global 配置中设置

## 配置字段说明

### 必填字段

| 字段                | 类型     | 描述                             |
| ------------------- | -------- | -------------------------------- |
| `version`           | number   | 配置 schema 版本（当前：`1`）    |
| `editor.vimMode`    | boolean  | 启用 Vim 键绑定（默认：`false`） |
| `permissions.allow` | string[] | 允许的操作列表                   |
| `permissions.deny`  | string[] | 禁止的操作列表                   |

### 可选字段

| 字段                     | 类型    | 描述                   |
| ------------------------ | ------- | ---------------------- |
| `model`                  | object  | 选择的模型配置         |
| `hasChangedDefaultModel` | boolean | CLI 管理的模型覆盖标志 |

## 配置示例

### 基础配置

**~/.cursor/cli-config.json**

```json
{
  "version": 1,
  "editor": {
    "vimMode": false
  },
  "permissions": {
    "allow": ["Shell(ls)"],
    "deny": []
  }
}
```

### 启用 Vim 模式

```json
{
  "version": 1,
  "editor": {
    "vimMode": true
  },
  "permissions": {
    "allow": ["Shell(ls)"],
    "deny": []
  }
}
```

### 项目级权限配置

**.cursor/cli.json**

```json
{
  "permissions": {
    "allow": [
      "Shell(ls)",
      "Shell(git)",
      "Shell(npm)",
      "Shell(pnpm)",
      "Read(src/**/*.ts)",
      "Read(src/**/*.tsx)",
      "Write(src/**/*.ts)",
      "Write(src/**/*.tsx)",
      "Write(package.json)"
    ],
    "deny": ["Shell(rm)", "Shell(rm -rf)", "Read(.env*)", "Read(**/*.key)", "Read(**/*.pem)", "Write(**/*.key)"]
  }
}
```

## Pricing

- Pro $20/mo, $16/mo/y
  - ~225 credits/mo
- Pro+ = Pro &times; 3
  - ~675 credits/mo
- Ultra = Pro &times; 10 的价格, Pro &times; 20 credits/mo
  - ~2250 credits/mo
- Team $40/seat/mo
  - 500 credits/seat/mo

# FAQ

## 不能补全 Markdown

**.vscode/settings.json**

```json
{
  "cursor.cpp.disabledLanguages": ["plaintext"]
}
```
