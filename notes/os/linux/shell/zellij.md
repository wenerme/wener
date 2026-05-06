---
title: zellij
---

# zellij

- [zellij-org/zellij](https://github.com/zellij-org/zellij)
  - MIT, Rust, WebAssembly
  - Zellij 是一个用 Rust 编写的新一代终端工作区和复用器（Terminal Multiplexer）。它旨在提供“开箱即用”的体验，具有直观的 UI、布局系统（Layouts）和基于 WebAssembly 的插件系统。
- 参考
  - [Zellij Official Website](https://zellij.dev/)
  - [Zellij Documentation](https://zellij.dev/documentation/)
  - https://zellijcheatsheet.dev/
  - https://github.com/zellij-org/zellij/blob/main/zellij-utils/assets/config/default.kdl
    - 默认按键绑定

```bash
brew install zellij
cargo install --locked zellij

zellij

zellij list-sessions
zellij action list-panes
zellij action list-panes --json
# 0 NAME ID
echo $ZELLIJ $ZELLIJ_SESSION_NAME $ZELLIJ_PANE_ID

zellij attach <SESSION_NAME>

# 远程控制操作
zellij action

# 常用快捷键 (默认 Ctrl+g 进入 Locked 模式，Ctrl+p 进入 Pane 模式)
# Ctrl + n: 下一个布局
# Ctrl + h: Pane 模式
# Ctrl + t: Tab 模式

# ac=action
# rename-tab|pane|session
zellij ac rename-pane "abc"

# 获取屏幕内容
zellij ac dump-screen
# --full --ansi
zellij ac dump-screen out.txt

# 输入文字和按键
zellij ac write-chars "ls -l"
zellij ac send-keys "Enter"

# 实时监听终端输出
zellij subscribe --ansi

zellij action dump-layout > session.kdl # 得到 layout
zellij action override-layout session.kdl --retain-existing-terminal-panes # 恢复

# 会话管理
zellij -s SESSION # 会话名字
zellij -s SESSION -n NAME # 会用 ~/.config/zellij/layouts/NAME.kdl
zellij attach -c SESSION # 没有则会创建
zellij --session SESSION --layout session.kdl

# 分屏
zellij action new-pane -d down   # 水平分屏
zellij action new-pane -d right  # 垂直分屏
```

| flag                      | for                                                              |
| ------------------------- | ---------------------------------------------------------------- |
| `-p, --pane-id <PANE_ID>` | 窗口 ID (可通过 `list-panes` 获取)；用于 `subscribe` 或 `action` |
| `-s, --session <SESSION>` | 指定会话名称；用于连接特定会话或发送指令                         |

| action                  | for                                    |
| ----------------------- | -------------------------------------- |
| `new-pane`              | 创建新窗格 (可指定 `-d down/right`)    |
| `close-pane`            | 关闭当前窗格                           |
| `new-tab`               | 创建新标签页 (可指定 `-n name`)        |
| `close-tab`             | 关闭当前标签页                         |
| `focus-next-pane`       | 聚焦到下一个窗格                       |
| `move-focus [dir]`      | 按方向移动焦点 (left, right, up, down) |
| `go-to-next-tab`        | 切换到下个标签页                       |
| `toggle-fullscreen`     | 切换全屏模式                           |
| `toggle-floating-panes` | 切换悬浮窗显示                         |
| `rename-tab <NAME>`     | 重命名当前标签页                       |
| `rename-pane <NAME>`    | 重命名当前窗格                         |
| `rename-session <NAME>` | 重命名当前会话                         |
| `edit <FILE>`           | 在新窗格中用默认编辑器打开文件         |
| `detach`                | 断开当前会话                           |
| `switch-mode <MODE>`    | 切换输入模式 (locked, pane, tab, etc.) |
| `dump-screen <FILE>`    | 将当前屏幕内容导出到文件               |
| `write-chars <STR>`     | 向当前窗格写入字符串                   |
| `send-keys <KEYS>`      | 发送快捷键按键 (如 "Ctrl a", "Enter")  |

| command                 | for                                            |
| :---------------------- | :--------------------------------------------- |
| `Alt` + `n`             | 新建窗格 (New Pane)                            |
| `Alt` + `f`             | 切换全屏 (Toggle Fullscreen)                   |
| `Alt` + `i`             | 切换到下一个窗格 (Next Pane)                   |
| `Alt` + `o`             | 切换到上一个窗格 (Previous Pane)               |
| `Alt` + `h`/`j`/`k`/`l` | 移动焦点 (左/下/上/右)                         |
| `Alt` + `[` / `]`       | 切换标签页 (Tab)                               |
| `Alt` + `w`             | 切换堆叠模式 (Toggle Stacked)                  |
| `Ctrl` + `g`            | **Locked** 模式 (禁用快捷键，防冲突)           |
| `Ctrl` + `p`            | **Pane** 模式 (窗格管理：新建、重命名、移动等) |
| `Ctrl` + `t`            | **Tab** 模式 (标签页管理)                      |
| `Ctrl` + `n`            | **Resize** 模式 (调整窗格大小)                 |
| `Ctrl` + `h`            | **Move** 模式 (调整窗格位置)                   |
| `Ctrl` + `s`            | **Search** 模式 (搜索、过滤内容)               |
| `Ctrl` + `o`            | **Session** 模式 (会话管理：分离、重命名等)    |
| `Ctrl` + `q`            | 退出 Zellij                                    |

```kdl
layout {
    tab name="Frontend" cwd="./apps/web" {
        pane split_direction="vertical" {
            pane command="npm" args="run" "dev"
            pane command="git" args="status"
        }
    }
    tab name="Backend" cwd="./apps/api-server" {
        pane command="go" args="run" "main.go"
    }
    tab name="DB Monitor" cwd="./docker" {
        pane command="lazydocker"
    }
}
```

- Session > Tab > Pane
- KDL - KDL Document Language
  - 实体 + 属性 + 子实体
  - https://github.com/kdl-org/kdl
  - https://github.com/kdl-org/kdljs
    - based on chevrotain
  - https://kdl.dev/
- ~/.config/zellij/layouts/

# FAQ

## zellij vs Tmux

**Pros**

- 更现代化
- 更友好
- 性能更好
- 插件 wasm
- YAML/KDL 窗口布局
- stack/floating/tabs

**Cons**

- 不支持 CC
- 跨session操作不好
- 没有 server 概念

---

- tmux window -> zellij tab
