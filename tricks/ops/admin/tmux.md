# Tmux

## Tips
* [tmux.1](http://man.openbsd.org/OpenBSD-current/man1/tmux.1)
* Cheat sheet
  * https://gist.github.com/andreyvit/2921703
  * https://gist.github.com/MohamedAlaa/2961058
* 参考
  * iTerm2 [tmux Integration Best Practices](https://gitlab.com/gnachman/iterm2/-/wikis/tmux-Integration-Best-Practices)

```bash
# 新建或 attach 到会话
tmuxrc new -A -s main

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

### Commands

```
# 是其他链接全都 detach, 使得当前窗口能够最大化
# detach -> detach-client
detach -a
```


```
attach-session (attach) [-dEr] [-c working-directory] [-t target-session]
bind-key (bind) [-cnr] [-T key-table] key command [arguments]
break-pane (breakp) [-dP] [-F format] [-n window-name] [-s src-pane] [-t dst-window]
capture-pane (capturep) [-aCeJpPq] [-b buffer-name] [-E end-line] [-S start-line][-t target-pane]
choose-buffer [-N] [-F format] [-f filter] [-O sort-order] [-t target-pane]
choose-client [-N] [-F format] [-f filter] [-O sort-order] [-t target-pane]
choose-tree [-GNsw] [-F format] [-f filter] [-O sort-order] [-t target-pane]
clear-history (clearhist) [-t target-pane]
clock-mode [-t target-pane]
command-prompt [-1Ni] [-I inputs] [-p prompts] [-t target-client] [template]
confirm-before (confirm) [-p prompt] [-t target-client] command
copy-mode [-Mu] [-t target-pane]
delete-buffer (deleteb) [-b buffer-name]
detach-client (detach) [-aP] [-E shell-command] [-s target-session] [-t target-client]
display-message (display) [-p] [-c target-client] [-F format] [-t target-pane] [message]
display-panes (displayp) [-d duration] [-t target-client]
find-window (findw) [-CNT] [-t target-pane] match-string
has-session (has) [-t target-session]
if-shell (if) [-bF] [-t target-pane] shell-command command [command]
join-pane (joinp) [-bdhv] [-p percentage|-l size] [-s src-pane] [-t dst-pane]
kill-pane (killp) [-a] [-t target-pane]
kill-server
kill-session [-aC] [-t target-session]
kill-window (killw) [-a] [-t target-window]
last-pane (lastp) [-de] [-t target-window]
last-window (last) [-t target-session]
link-window (linkw) [-dk] [-s src-window] [-t dst-window]
list-buffers (lsb) [-F format]
list-clients (lsc) [-F format] [-t target-session]
list-commands (lscm) [-F format]
list-keys (lsk) [-T key-table]
list-panes (lsp) [-as] [-F format] [-t target-window]
list-sessions (ls) [-F format]
list-windows (lsw) [-a] [-F format] [-t target-session]
load-buffer (loadb) [-b buffer-name] path
lock-client (lockc) [-t target-client]
lock-server (lock)
lock-session (locks) [-t target-session]
move-pane (movep) [-bdhv] [-p percentage|-l size] [-s src-pane] [-t dst-pane]
move-window (movew) [-dkr] [-s src-window] [-t dst-window]
new-session (new) [-AdDEP] [-c start-directory] [-F format] [-n window-name] [-s session-name] [-t target-session] [-x width] [-y height] [command]
new-window (neww) [-adkP] [-c start-directory] [-F format] [-n window-name] [-t target-window] [command]
next-layout (nextl) [-t target-window]
next-window (next) [-a] [-t target-session]
paste-buffer (pasteb) [-dpr] [-s separator] [-b buffer-name] [-t target-pane]
pipe-pane (pipep) [-IOo] [-t target-pane] [command]
previous-layout (prevl) [-t target-window]
previous-window (prev) [-a] [-t target-session]
refresh-client (refresh) [-S] [-C size] [-t target-client]
rename-session (rename) [-t target-session] new-name
rename-window (renamew) [-t target-window] new-name
resize-pane (resizep) [-DLMRUZ] [-x width] [-y height] [-t target-pane] [adjustment]
respawn-pane (respawnp) [-c start-directory] [-k] [-t target-pane] [command]
respawn-window (respawnw) [-c start-directory] [-k] [-t target-window] [command]
rotate-window (rotatew) [-DU] [-t target-window]
run-shell (run) [-b] [-t target-pane] shell-command
save-buffer (saveb) [-a] [-b buffer-name] path
select-layout (selectl) [-Enop] [-t target-pane] [layout-name]
select-pane (selectp) [-DdegLlMmRU] [-P style] [-T title] [-t target-pane]
select-window (selectw) [-lnpT] [-t target-window]
send-keys (send) [-lXRM] [-N repeat-count] [-t target-pane] key ...
send-prefix [-2] [-t target-pane]
set-buffer (setb) [-a] [-b buffer-name] [-n new-buffer-name] data
set-environment (setenv) [-gru] [-t target-session] name [value]
set-hook [-gu] [-t target-session] hook-name [command]
set-option (set) [-aFgosquw] [-t target-window] option [value]
set-window-option (setw) [-aFgoqu] [-t target-window] option [value]
show-buffer (showb) [-b buffer-name]
show-environment (showenv) [-gs] [-t target-session] [name]
show-hooks [-g] [-t target-session]
show-messages (showmsgs) [-JT] [-t target-client]
show-options (show) [-gqsvw] [-t target-session|target-window] [option]
show-window-options (showw) [-gv] [-t target-window] [option]
source-file (source) [-q] path
split-window (splitw) [-bdfhvP] [-c start-directory] [-F format] [-p percentage|-l size] [-t target-pane] [command]
start-server (start)
suspend-client (suspendc) [-t target-client]
swap-pane (swapp) [-dDU] [-s src-pane] [-t dst-pane]
swap-window (swapw) [-d] [-s src-window] [-t dst-window]
switch-client (switchc) [-Elnpr] [-c target-client] [-t target-session] [-T key-table]
unbind-key (unbind) [-an] [-T key-table] key
unlink-window (unlinkw) [-k] [-t target-window]
wait-for (wait) [-L|-S|-U] channel
```

## ~/.tmux.conf

```
new-session

##########################################
# STATUS BAR
set -g status-utf8 on
set -g status-keys vi
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
# TERMINAL EMULATOR TITLES
set -g set-titles on
set -g set-titles-string "#(tmux ls | awk -F: '{print $1}' | xargs | sed 's/\ / | /g')"


##########################################
# KEY BINDINGS
# C-a = prefix
unbind C-b
set -g prefix C-a

# C-a = last-window
unbind l
bind C-a last-window

# C-c = new-window
bind C-c new-window

# Esc = copy-mode
unbind [
bind Escape copy-mode

# | = horizontal split
unbind %
bind | split-window -h

# - = vertical split
unbind '"'
bind - split-window -v

# " = choose-window
bind '"' choose-window

# h = display cheatsheet
bind h run "cat ~/.tmux_cheatsheet"

# r = tmux renumbering script
unbind r
bind r run "~/bin/tmux_renum"

# r = respawn after exit or disconnect (zombie)
bind C-r respawn-window

# k = kill after exit or disconnect (zombie)
bind C-k kill-window


##########################################
# BASIC CONFIG
# utf8 ability
setw -g utf8 on

# vi Style Editing
setw -g mode-keys vi
# Make mouse useful in copy mode
setw -g mode-mouse on

# Allow mouse to select which pane to use
set -g mouse-select-pane on

# Allow xterm titles in terminal window, terminal scrolling with scrollbar, and setting overrides of C-Up, C-Down, C-Left, C-Right
set -g terminal-overrides "xterm*:XT:smcup@:rmcup@:kUP5=\eOA:kDN5=\eOB:kLFT5=\eOD:kRIT5=\eOC"

# Scroll History
set -g history-limit 30000

# Set ability to capture on start and restore on exit window data when running an application
setw -g alternate-screen on

# Lower escape timing from 500ms to 50ms for quicker response to scroll-buffer access.
set -s escape-time 50

```
