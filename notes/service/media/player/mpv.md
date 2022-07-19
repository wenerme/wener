---
title: mpv
---

# mpv

- [mpv-player/mpv](https://github.com/mpv-player/mpv)
  - GPLv2, LGPLv2.1, C, Lua
- [manual](https://mpv.io/manual/master/)
  - dir
    - ~/.config/mpv/
    - /usr/local/etc/mpv
    - /etc/mpv
    - %APPDATA%/mpv
  - mpv/
    - mpv.conf
    - input.conf
    - fonts.conf
    - subfont.ttf - fallback subtitle font
    - fonts/
    - scripts/
    - watch_later/
    - script-opts/osc.conf
- --sub-auto
  - no
  - exact - default
  - fuzzy
  - all
- 参考
  - [joaquintorres/autosubsync-mpv](https://github.com/joaquintorres/autosubsync-mpv)

| Shortcut                         |                          |
| -------------------------------- | ------------------------ |
| <kbd>Left/Right</kbd>            | +- 5s                    |
| <kbd>UP/DOWN</kbd>               | +- 1m                    |
| <kbd>Ctrl+Left/Right</kbd>       | 上/下 一个字幕           |
| <kbd>Ctrl+Shift+Left/Right</kbd> | Sub delay 上/下 一句台词 |
| <kbd>[</kbd> / <kbd>]</kbd>      | 播放速度 +- 10%          |
| BACKSPACE                        | 播放速度 正常            |
| p / SPACE                        | 暂停                     |
| ./,                              | 前/后 一帧               |
| q                                | 退出                     |
| Q                                | 退出 - 保留播放位置      |
| <kbd>/</kbd>,<kbd>\*</kbd>       | -+ 音量                  |
| <kbd>m</kbd>                     | 静音                     |
| <kbd>f</kbd>，<kbd>ESC</kbd>     | 切换全屏                 |
| <kbd>v</kbd>                     | 切换 字幕 显示           |
| Shift+g, Shift+f                 | 字体大小 +- 10%          |
| r,R                              | 字幕位置 上、下          |
| s                                | 截屏                     |
| S                                | 截屏 - 无字幕            |
| <kbd>`</kbd>                     | Console                  |

```bash
# yt-dlp
mpv 'https://www.youtube.com/watch?v=xyz'
# 终端渲染
mpv --vo=tct "https://youtube.com/watch?v=xyz"
# 纯音乐
# --ytdl-format='bestaudio'
mpv --no-video --vo=null --ytdl-format='bestaudio/best' 'https://www.youtube.com/watch?v=xyz'
# Strming
mpv -vo=gpu --hwdec=vaapi --gpu-context=wayland  https://www.twitch.tv/gorgc


```

```ini
video-sync=display-resample
# https://github.com/mpv-player/mpv/wiki/Interpolation
interpolation
tscale=oversample
```

- [iina/iina](https://github.com/iina/iina)
  - macOS
- [disco0/mpv-types-lua](https://github.com/disco0/mpv-types-lua)
  - Lua type declarations for mpv scripting
- [igv/FSRCNN-TensorFlow](https://github.com/igv/FSRCNN-TensorFlow)
  - upscale
  - mpv shader
- [TianZerL/ACNetGLSL](https://github.com/TianZerL/ACNetGLSL)
  - real-time anime upscaling
- https://mpv.io/manual/master/
- ~/.config/mpv/
  - ~/.config/mpv/mpv.conf
- ~/.config/mpv/watch_later
- [kljohann/mpv.el](https://github.com/kljohann/mpv.el)
  - control mpv for easy note-taking

