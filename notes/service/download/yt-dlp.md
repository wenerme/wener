---
title: yt-dlp
---

# yt-dlp

- [yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp)

```bash
# 下载
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
