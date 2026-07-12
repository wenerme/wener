---
title: micro
tags:
  - Editor
---

# micro

- [micro-editor/micro](https://github.com/micro-editor/micro)
  - MIT, Go
  - 现代、直觉化的 terminal text editor
  - 支持 mouse、selection、multiple cursors。
  - 支持 splits / tabs。
  - 内置 diff gutter、简单 autocomplete、persistent undo。
  - 支持 130+ 语言语法高亮，支持 16 色、256 色、true color themes。
  - 支持 Lua plugin system 和内置 plugin manager。
  - 可用 JSON 配置选项和快捷键。
- 官网：<https://micro-editor.github.io/>
- 定位：比 `nano` 更现代，保留常见 GUI 编辑器快捷键，适合 SSH、终端临时编辑、轻量代码编辑。

shortcut | for
---|---
`Ctrl-Q` | 退出
`Ctrl-S` | 保存
`Ctrl-O` | 打开文件
`Ctrl-E` | 打开命令行 prompt
`Ctrl-G` | 帮助
`Ctrl-Z` | 撤销
`Ctrl-Y` | 重做
`Ctrl-C` | 复制选区
`Ctrl-X` | 剪切选区 / 当前行
`Ctrl-V` | 粘贴
`Ctrl-A` | 全选
`Ctrl-F` | 查找
`Ctrl-N` | 查找下一个
`Ctrl-P` | 查找上一个
`Ctrl-R` | 替换
`Ctrl-L` | 跳转到行
`Ctrl-U` | 向上半页
`Ctrl-D` | 向下半页
`Alt-Up` / `Alt-Down` | 上下移动当前行或选区
`Alt-Left` / `Alt-Right` | 按词移动
`Ctrl-W` | 切换 split / pane
`Ctrl-T` | 新建 tab
`Alt-,` / `Alt-.` | 切换上一个 / 下一个 tab
`Ctrl-B` | 执行 shell command
`Ctrl-K` | cut 当前行
`Ctrl-/` | toggle comment

:::note

不同终端可能会拦截部分 `Alt` / `Ctrl` 快捷键。macOS Terminal.app 需要开启 `Use Option as Meta key`；iTerm2 可把 Option 设置为 `Esc+`。

:::

```bash
brew install micro # macOS
apt install micro  # Ubuntu / Debian
dnf install micro  # Fedora
pacman -S micro    # Arch

# 快速安装脚本 - 第三方脚本，注意审计
curl https://getmic.ro | bash
```

```bash
micro -version
micro file.txt
```

## 配置

配置目录：

```bash
~/.config/micro/
```

常见文件：

| 文件            | 说明       |
| --------------- | ---------- |
| `settings.json` | 编辑器选项 |
| `bindings.json` | 快捷键绑定 |
| `plug/`         | 插件目录   |
| `colorschemes/` | 自定义配色 |

在 micro 内按 `Ctrl-E` 打开 command prompt：

```text
help
help keybindings
help commands
help options
set colorscheme simple
set tabsize 2
set softwrap true
```

示例 `settings.json`：

```json
{
  "colorscheme": "default",
  "tabsize": 2,
  "tabstospaces": true,
  "softwrap": true,
  "ruler": true
}
```

## Clipboard

Linux 桌面环境需要额外工具才能访问系统剪贴板：

```bash
# X11
apk add xclip
apt install xclip

# Wayland
apk add wl-clipboard
apt install wl-clipboard
```

没有这些工具时，micro 会退回内部 clipboard，复制粘贴只在 micro 内可用。
