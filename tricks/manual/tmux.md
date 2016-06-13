

## Cheat sheet

* https://gist.github.com/andreyvit/2921703
* https://gist.github.com/MohamedAlaa/2961058


## ~/.tmux.conf

```
new-session
set-window-option -g mode-mouse on
set -g history-limit 30000

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


##########################################                                                             # KEY BINDINGS
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
