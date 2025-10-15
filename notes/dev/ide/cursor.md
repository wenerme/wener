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

# FAQ

## 不能补全 Markdown

**.vscode/settings.json**

```json
{
  "cursor.cpp.disabledLanguages": ["plaintext"]
}
```
