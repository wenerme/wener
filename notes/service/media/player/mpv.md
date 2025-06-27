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

  | keyboard                                                 | for                              |
  | -------------------------------------------------------- | -------------------------------- |
  | <kbd>Left</kbd>/<kbd>Right</kbd>                         | 快退/快进 5 秒                   |
  | <kbd>Shift</kbd>+<kbd>Left/Right</kbd>                   | 精确快退/快进 1 秒               |
  | <kbd>Up</kbd>/<kbd>Down</kbd>                            | 快进/快退 1 分钟                 |
  | <kbd>Shift</kbd>+<kbd>Up/Down</kbd>                      | 精确快进/快退 5 秒               |
  | <kbd>Ctrl</kbd>+<kbd>Left/Right</kbd>                    | 上/下一个字幕                    |
  | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Left/Right</kbd>   | 字幕延迟同步到当前台词           |
  | <kbd>[</kbd>/<kbd>]</kbd>                                | 播放速度 -/+ 10%                 |
  | <kbd>{</kbd>/<kbd>}</kbd>                                | 播放速度减半/加倍                |
  | <kbd>BACKSPACE</kbd>                                     | 恢复正常播放速度                 |
  | <kbd>Shift</kbd>+<kbd>BACKSPACE</kbd>                    | 撤销上次跳转                     |
  | <kbd>Shift</kbd>+<kbd>Ctrl</kbd>+<kbd>BACKSPACE</kbd>    | 标记当前位置用于撤销跳转         |
  | <kbd>&lt;</kbd>/<kbd>&gt;</kbd>                          | 上/下一个播放列表项              |
  | <kbd>ENTER</kbd>                                         | 下一个播放列表项                 |
  | <kbd>Shift</kbd>+<kbd>HOME/END</kbd>                     | 跳到播放列表首/尾                |
  | <kbd>p</kbd>/<kbd>SPACE</kbd>                            | 暂停/继续播放                    |
  | <kbd>.</kbd>/<kbd>,</kbd>                                | 前进/后退 一帧（逐帧播放）       |
  | <kbd>q</kbd>                                             | 停止并退出                       |
  | <kbd>Q</kbd>                                             | 退出并保存播放进度               |
  | <kbd>/</kbd>/<kbd>\*</kbd>                               | 音量 -/+                         |
  | <kbd>KP_DIVIDE</kbd>/<kbd>KP_MULTIPLY</kbd>              | 音量 -/+                         |
  | <kbd>9</kbd>/<kbd>0</kbd>                                | 音量 -/+                         |
  | <kbd>m</kbd>                                             | 静音                             |
  | <kbd>\_</kbd>                                            | 切换视频轨道                     |
  | <kbd>#</kbd>                                             | 切换音轨                         |
  | <kbd>E</kbd>                                             | 切换版本（Edition）              |
  | <kbd>f</kbd>                                             | 切换全屏                         |
  | <kbd>ESC</kbd>                                           | 退出全屏                         |
  | <kbd>T</kbd>                                             | 窗口置顶切换                     |
  | <kbd>w</kbd>/<kbd>W</kbd>                                | 缩放画面（pan-and-scan）         |
  | <kbd>o</kbd>/<kbd>P</kbd>                                | 显示进度条/时间                  |
  | <kbd>O</kbd>                                             | 切换 OSD 状态                    |
  | <kbd>v</kbd>                                             | 切换字幕显示                     |
  | <kbd>j</kbd>/<kbd>J</kbd>                                | 切换字幕轨道                     |
  | <kbd>z</kbd>/<kbd>Z</kbd>                                | 字幕延迟 -/+ 0.1 秒              |
  | <kbd>l</kbd>                                             | 设置/清除 A-B 循环点             |
  | <kbd>L</kbd>                                             | 无限循环切换                     |
  | <kbd>Ctrl</kbd>+<kbd>+</kbd>/<kbd>-</kbd>                | 音频延迟 -/+ 0.1 秒              |
  | <kbd>Ctrl</kbd>+<kbd>KP_ADD</kbd>/<kbd>KP_SUBTRACT</kbd> | 音频延迟 -/+ 0.1 秒              |
  | <kbd>G</kbd>/<kbd>F</kbd>                                | 字幕字体大小 -/+ 10%             |
  | <kbd>u</kbd>                                             | 切换 SSA/ASS 字幕样式覆盖        |
  | <kbd>V</kbd>                                             | 切换 ASS 渲染视频数据            |
  | <kbd>r</kbd>/<kbd>R</kbd>                                | 字幕位置上/下                    |
  | <kbd>s</kbd>                                             | 截屏                             |
  | <kbd>S</kbd>                                             | 截屏（无字幕）                   |
  | <kbd>Ctrl</kbd>+<kbd>s</kbd>                             | 截屏（含 OSD/字幕/缩放）         |
  | <kbd>HOME</kbd>                                          | 跳到文件开头                     |
  | <kbd>PGUP</kbd>/<kbd>PGDWN</kbd>                         | 上/下章节                        |
  | <kbd>Shift</kbd>+<kbd>PGUP/PGDWN</kbd>                   | 快进/快退 10 分钟                |
  | <kbd>b</kbd>                                             | 开关去色带（debanding）          |
  | <kbd>d</kbd>                                             | 切换去隔行（deinterlacing）      |
  | <kbd>A</kbd>                                             | 切换宽高比                       |
  | <kbd>Ctrl</kbd>+<kbd>h</kbd>                             | 切换硬件解码                     |
  | <kbd>Alt</kbd>+方向键                                    | 平移画面                         |
  | <kbd>Alt</kbd>+<kbd>+</kbd>/<kbd>-</kbd>                 | 缩放画面                         |
  | <kbd>Alt</kbd>+<kbd>BACKSPACE</kbd>                      | 重置画面缩放/平移                |
  | <kbd>F8</kbd>                                            | 显示播放列表                     |
  | <kbd>F9</kbd>                                            | 显示音轨/字幕流列表              |
  | <kbd>Ctrl</kbd>+<kbd>v</kbd>                             | 粘贴剪贴板中的文件/URL到播放列表 |
  | <kbd>i</kbd>/<kbd>I</kbd>                                | 显示/切换统计信息                |
  | <kbd>?</kbd>                                             | 显示当前按键绑定                 |
  | <kbd>DEL</kbd>                                           | 切换 OSC 显示模式                |
  | <kbd>`</kbd>                                             | 打开控制台（ESC 关闭）           |
  | <kbd>1</kbd>/<kbd>2</kbd>                                | 对比度 -/+                       |
  | <kbd>3</kbd>/<kbd>4</kbd>                                | 亮度 -/+                         |
  | <kbd>5</kbd>/<kbd>6</kbd>                                | Gamma -/+                        |
  | <kbd>7</kbd>/<kbd>8</kbd>                                | 饱和度 -/+                       |
  | <kbd>Alt</kbd>+<kbd>0</kbd>                              | 窗口缩放为原始一半               |
  | <kbd>Alt</kbd>+<kbd>1</kbd>                              | 窗口缩放为原始大小               |
  | <kbd>Alt</kbd>+<kbd>2</kbd>                              | 窗口缩放为原始两倍               |
  | <kbd>Command</kbd>+<kbd>f</kbd> (macOS)                  | 切换全屏                         |

```bash
brew install mpv        # macOS brew mpv 命令行
brew install mpv --cask # macOS brew mpv 应用 https://laboratory.stolendata.net/~djinn/mpv_osx/

# fake gui
mpv --no-video

# yt-dlp
mpv 'https://www.youtube.com/watch?v=xyz'
# 终端渲染
mpv --vo=tct "https://youtube.com/watch?v=xyz"
# 纯音乐
# --ytdl-format='bestaudio'
mpv --no-video --vo=null --ytdl-format='bestaudio/best' 'https://www.youtube.com/watch?v=xyz'
# Strming
mpv -vo=gpu --hwdec=vaapi --gpu-context=wayland https://www.twitch.tv/gorgc
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
- 下载 https://mpv.io/installation/
  - macOS https://laboratory.stolendata.net/~djinn/mpv_osx/
    - https://laboratory.stolendata.net/~djinn/mpv_osx/mpv-latest.tar.gz
    - 暂不支持 Apple M1/M2

```conf
profile=gpu-hq

# alang = 'jpn,jp,eng,en'
# slang = 'eng,en,enUS'

autofit-larger=1920x1080 # Set max window size.
autofit-smaller=858x480 # Set min window size.
no-osd-bar # Hide OSD bar when seeking.
osd-duration=500 # Hide OSD text after x ms.
# osd-font='Trebuchet MS'

deband=yes # Default values are 1:64:16:48
deband-iterations=4 # Range 1-16. Higher = better quality but more GPU usage. >5 is redundant.
deband-threshold=50 # Range 0-4096. Deband strength.
deband-range=20 # Range 1-64. Range of deband. Too high may destroy details.
deband-grain=5 # Range 0-4096. Inject grain to cover up bad banding, higher value needed for poor sources.

dither-depth=auto
```

- https://wiki.archlinux.org/index.php/Mpv#Configuration
