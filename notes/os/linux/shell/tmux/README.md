---
title: Tmux
---

# Tmux

- [tmux/tmux](https://github.com/tmux/tmux)
  - ISC, C
- [tmux.1](https://man7.org/linux/man-pages/man1/tmux.1.html)
- Cheat sheet
  - https://gist.github.com/andreyvit/2921703
  - https://gist.github.com/MohamedAlaa/2961058
- 参考
  - iTerm2 [tmux Integration Best Practices](https://gitlab.com/gnachman/iterm2/-/wikis/tmux-Integration-Best-Practices)
- 主要对象
  - session
  - window
  - pane
- Prefix Key Ctrl+b
- Command Mode

```bash
# 新建或 attach 到会话
tmux new -A -s main

tmuxrc new -A -s main # or tmuxrc

# 显示指定服务开启的会话
tmux -S /tmp/extratmuxserver/tmuxserver ls
# 创建新会话
tmux new -s myname
# Attach 到会话
tmux a -t myname
# 关闭会话
tmux kill-session -t myname

# 命令行控制
# ==========
# Zoom In
tmux list-panes -F '#F' | grep -q Z || tmux resize-pane -Z
# Zoom Out
tmux list-panes -F '#F' | grep -q Z && tmux resize-pane -Z
```

```bash
# session
tmux new -s session_name
tmux ls
tmux attach -t session_name
```

> prefix key = Ctrl+b

| Scope       | Key                     | command           | Description                      |
| :---------- | :---------------------- | :---------------- | :------------------------------- |
| **Session** | `Ctrl+b` `d`            | `detach-client`   | Detach current client            |
| **Window**  | `Ctrl+b` `c`            | `new-window`      | (create) 创建一个新窗口          |
|             | `Ctrl+b` `w`            | `choose-window`   | (windows) 列出所有窗口并进行选择 |
|             | `Ctrl+b` `p`            | `previous-window` | (previous) 切换到上一个窗口      |
|             | `Ctrl+b` `n`            | `next-window`     | (next) 切换到下一个窗口          |
|             | `Ctrl+b` `&`            | `kill-window`     | 关闭当前窗口                     |
| **Pane**    | `Ctrl+b` `%`            | `split-window -h` | 垂直分割当前窗格                 |
|             | `Ctrl+b` `"`            | `split-window -v` | 水平分割当前窗格                 |
|             | `Ctrl+b` `<arrow_keys>` | `select-pane`     | 根据箭头方向在窗格间移动         |
|             | `Ctrl+b` `x`            | `kill-pane`       | 关闭当前窗格                     |

**常用命令**

```bash
set -g mouse on

# 使用 - | 来分割窗口
unbind %
bind | split-window -h

unbind '"'
bind - split-window -v
```

**常用命令**

```bash
split-window -h # 水平分割
split-window -v # 垂直分割
```

## 管理

```bash
tmux list-panes -t main -F "#S:#I.#P" # 所有 pane

# PANE Title CMD PWD
tmux list-panes -t main -F "#S:#I.#P #T #{pane_current_command} @ #{pane_current_path}"

tmux display-message -p "#S:#I.#P"         # 当前 pane 位置
tmux display-message -p "#{pane_title}"    # 获取当前 pane title
tmux select-pane -T "My Title"             # 设置当前 pane title
tmux select-pane -t main:1.0 -T "My Title" # 设置指定 pane title

tmux send-keys -t main:1.0 "ls" C-m        # 发送命令到 pane
tmux send-keys -t main:1.0 "clear" C-m     # 清屏
tmux capture-pane -t main:1.0 -p           # 捕获 pane 内容
tmux capture-pane -t main:1.0 -p -S -10    # 捕获最近 10 行
tmux capture-pane -t main:1.0 -p -S - -E - # 捕获全部历史

tmux pipe-pane -t main:1.0 "cat >> /tmp/log" # 持续输出到文件
tmux pipe-pane -t main:1.0                   # 停止输出

tmux respawn-pane -t main:1.0 -k # 重启 pane
tmux kill-pane -t main:1.0       # 关闭 pane
```

| format                    | 说明             |
| :------------------------ | :--------------- |
| `#S`                      | 会话名           |
| `#I`                      | 窗口索引         |
| `#P`                      | pane 索引        |
| `#W`                      | 窗口名           |
| `#T`                      | pane 标题        |
| `#F`                      | 窗口标志 (\*-#~) |
| `#H`                      | 主机名           |
| `#h`                      | 短主机名         |
| `#D`                      | pane 唯一标识    |
| `#{pane_current_command}` | 当前命令         |
| `#{pane_current_path}`    | 当前目录         |
| `#{pane_pid}`             | pane PID         |
| `#{pane_width}`           | pane 宽度        |
| `#{pane_height}`          | pane 高度        |
| `#{pane_active}`          | 是否活动 pane    |
| `#{window_name}`          | 窗口名           |
| `#{window_index}`         | 窗口索引         |
| `#{window_active}`        | 是否活动窗口     |
| `#{window_panes}`         | 窗口 pane 数量   |
| `#{session_name}`         | 会话名           |
| `#{session_windows}`      | 会话窗口数量     |
| `#{session_attached}`     | 会话连接数       |
| `#{client_tty}`           | 客户端 tty       |
| `#{host}`                 | 主机名           |
| `#{pid}`                  | tmux 服务 PID    |

## 窗口管理

- 会话 - session
  - 窗口 - window
    - 面板 - pane

```bash
# 隐藏面板
# 将当前面板放到后台（-d）窗口，显示相关信息（-P）
# 显示位置 例如 1:2.0 表示 会话:窗口.面板
break-pane -dP

# 恢复隐藏面板
# -v 水平分割 -s 来源面板
join-pane -vs 1:2.0
```

### Commands

```bash
# 是其他链接全都 detach, 使得当前窗口能够最大化
# detach -> detach-client
detach -a
```

```bash
# 移动面板
# ==========
# 显示
bind-key j command-prompt -p "join pane from:" "join-pane -s '%%'"
# 隐藏
bind-key s command-prompt -p "send pane to:" "join-pane -t '%%'"

bind-key @ choose-window 'join-pane -h -s "%%"'
bind-key C-@ choose-window 'join-pane    -s "%%"'

# 添加到最近访问窗口
bind-key @ join-pane -h -s !
```

| usage                                                                                                                                                 | for（说明）          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| **Session 会话管理**                                                                                                                                  |                      |
| `new-session (new) [-AdDEP] [-c start-directory] [-F format] [-n window-name] [-s session-name] [-t target-session] [-x width] [-y height] [command]` | 新建会话             |
| `attach-session (attach) [-dEr] [-c working-directory] [-t target-session]`                                                                           | 连接到一个会话       |
| `kill-session [-aC] [-t target-session]`                                                                                                              | 关闭会话             |
| `list-sessions (ls) [-F format]`                                                                                                                      | 列出所有会话         |
| `rename-session (rename) [-t target-session] new-name`                                                                                                | 重命名会话           |
| `has-session (has) [-t target-session]`                                                                                                               | 检查会话是否存在     |
| **Window 窗口管理**                                                                                                                                   |                      |
| `new-window (neww) [-adkP] [-c start-directory] [-F format] [-n window-name] [-t target-window] [command]`                                            | 新建窗口             |
| `kill-window (killw) [-a] [-t target-window]`                                                                                                         | 关闭窗口             |
| `list-windows (lsw) [-a] [-F format] [-t target-session]`                                                                                             | 列出所有窗口         |
| `rename-window (renamew) [-t target-window] new-name`                                                                                                 | 重命名窗口           |
| `select-window (selectw) [-lnpT] [-t target-window]`                                                                                                  | 选择窗口             |
| `move-window (movew) [-dkr] [-s src-window] [-t dst-window]`                                                                                          | 移动窗口             |
| `swap-window (swapw) [-d] [-s src-window] [-t dst-window]`                                                                                            | 交换窗口             |
| `link-window (linkw) [-dk] [-s src-window] [-t dst-window]`                                                                                           | 链接窗口到其他会话   |
| `unlink-window (unlinkw) [-k] [-t target-window]`                                                                                                     | 取消窗口链接         |
| `last-window (last) [-t target-session]`                                                                                                              | 切换到上一个窗口     |
| `next-window (next) [-a] [-t target-session]`                                                                                                         | 切换到下一个窗口     |
| `previous-window (prev) [-a] [-t target-session]`                                                                                                     | 切换到上一个窗口     |
| `find-window (findw) [-CNT] [-t target-pane] match-string`                                                                                            | 查找窗口             |
| `select-layout (selectl) [-Enop] [-t target-pane] [layout-name]`                                                                                      | 选择窗口布局         |
| `next-layout (nextl) [-t target-window]`                                                                                                              | 下一个窗口布局       |
| `previous-layout (prevl) [-t target-window]`                                                                                                          | 上一个窗口布局       |
| `rotate-window (rotatew) [-DU] [-t target-window]`                                                                                                    | 旋转窗口布局         |
| **Pane 面板管理**                                                                                                                                     |                      |
| `split-window (splitw) [-bdfhvP] [-c start-directory] [-F format] [-p percentage\|-l size] [-t target-pane] [command]`                                | 分割面板             |
| `kill-pane (killp) [-a] [-t target-pane]`                                                                                                             | 关闭面板             |
| `list-panes (lsp) [-as] [-F format] [-t target-window]`                                                                                               | 列出所有面板         |
| `select-pane (selectp) [-DdegLlMmRU] [-P style] [-T title] [-t target-pane]`                                                                          | 选择面板             |
| `move-pane (movep) [-bdhv] [-p percentage\|-l size] [-s src-pane] [-t dst-pane]`                                                                      | 移动面板             |
| `swap-pane (swapp) [-dDU] [-s src-pane] [-t dst-pane]`                                                                                                | 交换面板             |
| `break-pane (breakp) [-dP] [-F format] [-n window-name] [-s src-pane] [-t dst-window]`                                                                | 拆分面板到新窗口     |
| `join-pane (joinp) [-bdhv] [-p percentage\|-l size] [-s src-pane] [-t dst-pane]`                                                                      | 合并面板             |
| `last-pane (lastp) [-de] [-t target-window]`                                                                                                          | 切换到上一个面板     |
| **Buffer/Clipboard 缓冲区与剪贴板**                                                                                                                   |                      |
| `copy-mode [-Mu] [-t target-pane]`                                                                                                                    | 进入复制模式         |
| `paste-buffer (pasteb) [-dpr] [-s separator] [-b buffer-name] [-t target-pane]`                                                                       | 粘贴缓冲区内容       |
| `list-buffers (lsb) [-F format]`                                                                                                                      | 列出所有缓冲区       |
| `save-buffer (saveb) [-a] [-b buffer-name] path`                                                                                                      | 保存缓冲区到文件     |
| `load-buffer (loadb) [-b buffer-name] path`                                                                                                           | 从文件加载缓冲区     |
| `delete-buffer (deleteb) [-b buffer-name]`                                                                                                            | 删除缓冲区           |
| `set-buffer (setb) [-a] [-b buffer-name] [-n new-buffer-name] data`                                                                                   | 设置缓冲区内容       |
| `show-buffer (showb) [-b buffer-name]`                                                                                                                | 显示缓冲区内容       |
| **Client/Server 客户端与服务端**                                                                                                                      |                      |
| `detach-client (detach) [-aP] [-E shell-command] [-s target-session] [-t target-client]`                                                              | 客户端断开连接       |
| `list-clients (lsc) [-F format] [-t target-session]`                                                                                                  | 列出所有客户端       |
| `kill-server`                                                                                                                                         | 关闭 tmux 服务端     |
| `refresh-client (refresh) [-S] [-C size] [-t target-client]`                                                                                          | 刷新客户端           |
| `lock-client (lockc) [-t target-client]`                                                                                                              | 锁定客户端           |
| `lock-server (lock)`                                                                                                                                  | 锁定服务端           |
| `lock-session (locks) [-t target-session]`                                                                                                            | 锁定会话             |
| `suspend-client (suspendc) [-t target-client]`                                                                                                        | 挂起客户端           |
| `switch-client (switchc) [-Elnpr] [-c target-client] [-t target-session] [-T key-table]`                                                              | 切换客户端           |
| **命令与配置**                                                                                                                                        |                      |
| `bind-key (bind) [-cnr] [-T key-table] key command [arguments]`                                                                                       | 绑定快捷键           |
| `unbind-key (unbind) [-an] [-T key-table] key`                                                                                                        | 解绑快捷键           |
| `command-prompt [-1Ni] [-I inputs] [-p prompts] [-t target-client] [template]`                                                                        | 命令提示             |
| `run-shell (run) [-b] [-t target-pane] shell-command`                                                                                                 | 执行 shell 命令      |
| `source-file (source) [-q] path`                                                                                                                      | 加载配置文件         |
| `set-option (set) [-aFgosquw] [-t target-window] option [value]`                                                                                      | 设置选项             |
| `set-window-option (setw) [-aFgoqu] [-t target-window] option [value]`                                                                                | 设置窗口选项         |
| `show-options (show) [-gqsvw] [-t target-session\|target-window] [option]`                                                                            | 显示选项             |
| `show-window-options (showw) [-gv] [-t target-window] [option]`                                                                                       | 显示窗口选项         |
| `set-environment (setenv) [-gru] [-t target-session] name [value]`                                                                                    | 设置环境变量         |
| `show-environment (showenv) [-gs] [-t target-session] [name]`                                                                                         | 显示环境变量         |
| `set-hook [-gu] [-t target-session] hook-name [command]`                                                                                              | 设置钩子             |
| `show-hooks [-g] [-t target-session]`                                                                                                                 | 显示钩子             |
| **显示与消息**                                                                                                                                        |                      |
| `display-message (display) [-p] [-c target-client] [-F format] [-t target-pane] [message]`                                                            | 显示消息             |
| `display-panes (displayp) [-d duration] [-t target-client]`                                                                                           | 显示所有面板编号     |
| `show-messages (showmsgs) [-JT] [-t target-client]`                                                                                                   | 显示历史消息         |
| **其它功能**                                                                                                                                          |                      |
| `clear-history (clearhist) [-t target-pane]`                                                                                                          | 清除历史记录         |
| `choose-buffer [-N] [-F format] [-f filter] [-O sort-order] [-t target-pane]`                                                                         | 选择缓冲区           |
| `choose-client [-N] [-F format] [-f filter] [-O sort-order] [-t target-pane]`                                                                         | 选择客户端           |
| `choose-tree [-GNsw] [-F format] [-f filter] [-O sort-order] [-t target-pane]`                                                                        | 选择树状结构         |
| `clock-mode [-t target-pane]`                                                                                                                         | 显示时钟             |
| `pipe-pane (pipep) [-IOo] [-t target-pane] [command]`                                                                                                 | 面板输出重定向到命令 |
| `wait-for (wait) [-L\|-S\|-U] channel`                                                                                                                | 等待事件             |
| `start-server (start)`                                                                                                                                | 启动 tmux 服务端     |
| `respawn-pane (respawnp) [-c start-directory] [-k] [-t target-pane] [command]`                                                                        | 重新启动面板         |
| `respawn-window (respawnw) [-c start-directory] [-k] [-t target-window] [command]`                                                                    | 重新启动窗口         |
| `send-keys (send) [-lXRM] [-N repeat-count] [-t target-pane] key ...`                                                                                 | 发送按键到面板       |
| `send-prefix [-2] [-t target-pane]`                                                                                                                   | 发送前缀键到面板     |

## tmux.conf

```bash
new-session
# 启用鼠标
set -g mouse on
# 允许鼠标选择面板
set -g mouse-select-pane on
# 允许鼠标调整面板大小
set -g mouse-resize-pane on
# 允许滚动的历史
set -g history-limit 30000

##########################################
# 状态栏
# UTF8
set -g status-utf8 on
# vi Style Editing
# set -g status-keys vi
set -g status-interval 1
set -g status-attr bright
set -g status-fg white
set -g status-bg black
set -g status-left-length 20
set -g status-left '#[fg=green][#[fg=red]#S#[fg=green]]#[default]'
set -g status-justify centre
set -g status-right '#[fg=green][ %m/%d %H:%M:%S ]#[default]'
setw -g window-status-current-format '#[fg=yellow](#I.#P#F#W)#[default]'
setw -g window-status-format '#I#F#W'

##########################################
# 模拟终端标题
set -g set-titles on
set -g set-titles-string "#(tmux ls | awk -F: '{print $1}' | xargs | sed 's/\ / | /g')"

##########################################
# 按键绑定
# C-a = prefix
# 默认 Ctrl+b 为前缀 - 取消默认
unbind C-b
# 使用 Ctrl+a 为前缀
set -g prefix C-a

# 上一个窗口
unbind l
bind C-a last-window

# 下一个窗口
bind C-c new-window

# 复制模式
unbind [
bind Escape copy-mode

# 垂直分割
unbind %
bind | split-window -h

# 水平分割
unbind '"'
bind - split-window -v

# 选择窗口
bind '"' choose-window

# h = display cheatsheet
# bind h run "cat ~/.tmux_cheatsheet"

# r = tmux renumbering script
# unbind r
# bind r run "~/bin/tmux_renum"

# r = respawn after exit or disconnect (zombie)
bind C-r respawn-window

# k = kill after exit or disconnect (zombie)
bind C-k kill-window

##########################################
# 基础配置
# UTF8
setw -g utf8 on

# Allow xterm titles in terminal window, terminal scrolling with scrollbar, and setting overrides of C-Up, C-Down, C-Left, C-Right
#set -g terminal-overrides "xterm*:XT:smcup@:rmcup@:kUP5=\eOA:kDN5=\eOB:kLFT5=\eOD:kRIT5=\eOC"

# Set ability to capture on start and restore on exit window data when running an application
setw -g alternate-screen on

# Lower escape timing from 500ms to 50ms for quicker response to scroll-buffer access.
set -s escape-time 50

set -g status-interval 1
set -g status-justify centre # center align window list
set -g status-left-length 20
set -g status-right-length 140
set -g status-left '#[fg=green]#H #[fg=black]• #[fg=green,bright]#(uname -r | cut -c 1-6)#[default]'
set -g status-right '#[fg=green,bg=default,bright]#(tmux-mem-cpu-load 1) #[fg=red,dim,bg=default]#(uptime | cut -f 4-5 -d " " | cut -f 1 -d ",") #[fg=white,bg=default]%a%l:%M:%S %p#[default] #[fg=blue]%Y-%m-%d'

# C-b is not acceptable -- Vim uses it
set-option -g prefix C-a
bind-key C-a last-window

# Start numbering at 1
set -g base-index 1

# Allows for faster key repetition
set -s escape-time 0

# Rather than constraining window size to the maximum size of any client
# connected to the *session*, constrain window size to the maximum size of any
# client connected to *that window*. Much more reasonable.
# setw -g aggressive-resize on

# Allows us to use C-a a <command> to send commands to a TMUX session inside
# another TMUX session
bind-key a send-prefix

# Activity monitoring
setw -g monitor-activity on
set -g visual-activity on

# Vi copypaste mode
# set-window-option -g mode-keys vi
# bind-key -t vi-copy 'v' begin-selection
# bind-key -t vi-copy 'y' copy-selection

# hjkl 面板选择
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

bind-key C command-prompt -p "Name of new window: " "new-window -n '%%'"

# 配置重载
bind r source-file ~/.tmux.conf \; display-message "Config reloaded..."

# 自动重命名窗口
set-window-option -g automatic-rename
set -g allow-rename on

# https://github.com/edkolev/dots/blob/master/tmux.conf
# Updates for tmux 1.9's current pane splitting paths.
if-shell "[[ $(tmux -V) == *1.9* ]]" 'unbind c; bind c new-window -c "#{pane_current_path}"'
if-shell "[[ $(tmux -V) == *1.9* ]]" 'unbind s; bind s split-window -v -c "#{pane_current_path}"'
if-shell "[[ $(tmux -V) == *1.9* ]]" "unbind '\"'; bind '\"' split-window -v -c '#{pane_current_path}'"
if-shell "[[ $(tmux -V) == *1.9* ]]" 'unbind v; bind v split-window -h -c "#{pane_current_path}"'
if-shell "[[ $(tmux -V) == *1.9* ]]" 'unbind %; bind % split-window -h -c "#{pane_current_path}"'

# Use xterm flavor
# set -g default-terminal "xterm-256color"
# set -g xterm-keys o
setw -g xterm-keys on

# 同步面板操作
bind F2 setw synchronize-panes on
bind F3 setw synchronize-panes off

set -g default-terminal "xterm"
```

## ~/.tmux.conf

```bash
set -g mouse on
set -g mouse-select-pane on
set -g mouse-resize-pane on
set -g history-limit 30000

unbind %
bind | split-window -h

unbind '"'
bind - split-window -v
```

# FAQ

## 窗口滚动

```bash
set -g mode-mouse on
```

## 选项变更

```
invalid option: mouse-select-pane                                                                                                                                                    [0/0]
invalid option: mouse-resize-pane
invalid option: status-utf8
invalid option: status-attr
invalid option: utf8
```
