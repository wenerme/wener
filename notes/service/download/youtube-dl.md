---
title: youtube-dl
---

# youtube-dl

- [yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp)
  - 开发活跃
- [ytdl-org/youtube-dl](https://github.com/ytdl-org/youtube-dl)
  - 开发不活跃
- 默认配置 --config-location
  - ~/.config/youtube-dl/config
  - /etc/youtube-dl.conf
  - %APPDATA%/youtube-dl/config.txt
- ~/.cache/youtube-dl 缓存部分 yt 信息
- 参考
  - [支持站点](https://github.com/ytdl-org/youtube-dl/blob/master/docs/supportedsites.md)
  - [ytdl-org/youtube-dl#9302](https://github.com/ytdl-org/youtube-dl/issues/9302)
  - [Youtube Format IDs](https://gist.github.com/AgentOak/34d47c65b1d28829bb17c24c04a0096f)
  - yt-dlp

```bash
sudo curl -L https://yt-dl.org/downloads/latest/youtube-dl --create-file-mode 0755 -o /usr/local/bin/youtube-dl
sudo chmod a+rx /usr/local/bin/youtube-dl

# 测试文件名
# --restrict-filenames 将空格转换为下划线
youtube-dl --get-filename -o '%(title)s.%(ext)s' d0yGdNEWdn0
# 默认格式
youtube-dl --get-filename -o '%(title)s-%(id)s.%(ext)s' d0yGdNEWdn0

# 生成列表增量下载
youtube-dl --download-archive archive.txt "https://www.youtube.com/playlist?list=PLwiyx1dc3P2JR9N8gQaQN_BCvlSlap7re"

# 当前目录 youtube-dl.conf
# 或直接指向文件
youtube-dl --config-location $PWD

# 可以同时利用全局配置
youtube-dl $(cat youtube-dl.conf)

# 查看所有格式
# -f best 不一定会选择最佳 audio - 最佳 video+最佳 audio 不一定存在
# 可以单独下载最佳 audio
youtube-dl -F J9bjJEjK2dQ
# -f best 也可以会选择差的
youtube-dl -F anbrb2u9GYI

# 最好的 mp4 或其他任意格式
youtube-dl -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best'
# 最好 video 但小于 480p
youtube-dl -f 'bestvideo[height<=480]+bestaudio/best[height<=480]'
# 最好 video 但小于 50M
youtube-dl -f 'best[filesize<50M]'
# HTTP/HTTPS 直接链接下载
youtube-dl -f '(bestvideo+bestaudio/best)[protocol^=http]'
# 最好的音频和视频但不合并
youtube-dl -f 'bestvideo,bestaudio' -o '%(title)s.f%(format_id)s.%(ext)s'

# -f bestvideo[vcodec=vp9]+bestaudio[acodec=opus]/best
# -xf bestaudio[acodec=opus]
# -f bestvideo[vcodec=av1]+bestaudio[acodec=opus]/best

# -f 'bestvideo[vcodec=av1]+bestaudio[acodec=opus]/bestvideo[vcodec=vp9]+bestaudio[acodec=opus]/bestvideo[ext=mp4]+bestaudio[ext=m4a]/best'

# archiving videos
# bestvideo[ext=webm]+251/bestvideo[ext=mp4]+(258/256/140)/bestvideo[ext=webm]+(250/249)/best
# archiving audio
# 258/251/22/256/140/250/18/249/139
# streaming videos
# bestvideo+bestaudio/best
```

| Option                          | Desc                                                          |
| ------------------------------- | ------------------------------------------------------------- |
| `-o ~/Movies/%(title)s.%(ext)s` | 按照模板输出到指定位置                                        |
| --proxy 127.0.0.1:3128          | 代理，支持 socks                                              |
| -f, --format best               | 选择最好的格式,默认                                           |
| --no-playlist                   | 复制了播放列表中的视频，但只下载单个视频                      |
| --all-subs                      | 下载所有字幕                                                  |
| -R 50                           | 失败重试                                                      |
| --ignore-errors                 | 忽略列表中的错误视频                                          |
| --download-archive archive.txt  | 记录已经下载的视频，下次不再下载，每行记录 `<extractor> <id>` |
| -a, --batch-file urls.txt       | 批量下载地址,支持 `#`,`;` 注释                                |
| --id                            | 批量文件里只有 ID                                             |
| -w, --no-overwrites             | 不覆盖                                                        |
| --write-thumbnail               | 写入缩略图                                                    |
| **后处理**                      |
| -x, --extract-audio             | 提取音频                                                      |
| --embed-subs                    |
| --embed-thumbnail               |
| --add-metadata                  | 写入元信息到媒体文件                                          |
| --xattrs                        | 写入元信息到文件 xattrs                                       |
| --convert-subs FORMAT           |

**youtube-dl.conf**

```
--all-subs
--geo-bypass
--ignore-errors
--proxy socks5://127.0.0.1:8888
--write-thumbnail
-f best
-R 50
```

:::warn

- -f best 不一定会下载最优格式

推荐

```
-f 'bestvideo[vcodec=av1]+bestaudio[acodec=opus]/bestvideo[vcodec=vp9]+bestaudio[acodec=opus]/bestvideo[ext=mp4]+bestaudio[ext=m4a]/best'
```

:::

## 下载翻译字幕

- --convert-subs srt
- --all-subs 下载所有字幕
- --embed-subs
- --write-auto-sub - 下载生成字幕

```bash
# 中文字幕
youtube-dl --write-auto-sub --write-sub --skip-download --sub-lang=en,zh-Hans
# 查看所有字幕
youtube-dl --list-subs
```

## yt-dlp

```bash
sudo curl -o /usr/local/bin/yt-dlp -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp
```

## 常用

```bash
yt-dlp --download-archive archive.txt -a urls.txt
```

- ~/.config/yt-dlp/config

```txt
--all-subs
--geo-bypass
--ignore-errors
--proxy 127.0.0.1:8888
--write-thumbnail
--write-info-json
-R 50
```

根据支持的格式选择，例如旧的 AppleTV 不支持 av1，h264 是最安全的选择

```
-f 'bestvideo[vcodec=av1]+bestaudio[acodec=opus]/bestvideo[vcodec=vp9]+bestaudio[acodec=opus]/bestvideo[ext=mp4]+bestaudio[ext=m4a]/best'
```

# FAQ

## unable to download video data: HTTP Error 403: Forbidden

尝试 `--rm-cache-dir`
