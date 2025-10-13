---
title: Cursor
---

# Cursor

- [getcursor/cursor](https://github.com/getcursor/cursor)
  - The AI Code Editor
- 注意 可能会用非常多 Token
- 参考
  - https://docs.cursor.com/en/models
  - MCP https://cursor.com/docs/context/mcp/directory

# Conf

- ~/.cursor
  - $CURSOR_CONFIG_DIR
  - $XDG_CONFIG_HOME/cursor
  - -> Windows `%USERPROFILE%\.cursor`
- ~/.cursor/mcp.json
- `.cursor/mcp.json`
- `~/.cursor/cli-config.json`
- `.cursor/cli.json`
  - 只有 permissions 生效

```json
{
  "version": 1,
  "editor": {
    "vimMode": false
  },
  "permissions": {
    "allow": [""],
    "deny": [""]
  },
  "model": {},
  "hasChangedDefaultModel": false
}
```

```json title="cli.json"
{
  "permissions": {
    "allow": ["Shell(ls)", "Shell(git)", "Read(src/**/*.ts)", "Write(package.json)"],
    "deny": ["Shell(rm)", "Read(.env*)", "Write(**/*.key)"]
  }
}
```

> 权限语法与 Claude Code 类似

# FAQ

## 不能补全 Markdown

**.vscode/settings.json**

```json
{
  "cursor.cpp.disabledLanguages": ["plaintext"]
}
```
