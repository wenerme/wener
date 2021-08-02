---
title: Terminal
---

# Terminal

## screen

- [Screen quick reference](http://aperiodic.net/screen/quick_reference)
- [Screen manual](http://www.gnu.org/software/screen/manual/screen.html)
- FAQ
  - 当连接串口, 强制把 screen kill 后, screen 可能出现 100% CPU 占用, 此时只能重启了

```bash
# 查看所有的会话
screen -ls
# 退出
screen -X -S ${SESSION} quit
# 连上 screen 会话
screen -r ${SESSION}
```

## minicom

- 默认 Meta 为 ESC

```
+-------------------------------------------------------------------+
|                      Minicom Command Summary                      |
|                                                                   |
|               Commands can be called by Meta-<key>                |
|                                                                   |
|               Main Functions                  Other Functions     |
|                                                                   |
| Dialing directory..D  run script (Go)....G | Clear Screen.......C |
| Send files.........S  Receive files......R | cOnfigure Minicom..O |
| comm Parameters....P  Add linefeed.......A | Suspend minicom....J |
| Capture on/off.....L  Hangup.............H | eXit and reset.....X |
| send break.........F  initialize Modem...M | Quit with no reset.Q |
| Terminal settings..T  run Kermit.........K | Cursor key mode....I |
| lineWrap on/off....W  local Echo on/off..E | Help screen........Z |
| Paste file.........Y  Timestamp toggle...N | scroll Back........B |
| Add Carriage Ret...U                                              |
|                                                                   |
|             Select function or press Enter for none.              |
+-------------------------------------------------------------------+
```
