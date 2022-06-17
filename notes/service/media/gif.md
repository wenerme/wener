---
title: gif
---

# gif

- [kohler/gifsicle](https://github.com/kohler/gifsicle)
  - GPL 2.0, C
  - create, manipulate, and optimize GIF
  - https://www.lcdf.org/gifsicle/man.html

| flag                | default | value          |
| ------------------- | ------- | -------------- |
| -O,--optimize=level | 1       | 1,2,3 - 推荐 2 |

```bash
brew install gifsicle # macOS

# video to gif
ffmpeg -i in.mov -s 600x400 -pix_fmt rgb24 -r 10 -f gif - | gifsicle -O3 > out.gif

# keep scale
ffmpeg -i in.mov -pix_fmt rgb24 -r 18 -f gif - | gifsicle --optimize=3 --delay=3 > out.gif

# 优化现有 gif
gifsicle in.gif --optimize=3 > out.gif

gifsicle -I "#0" "#1" < in.gif # 输出帧信息
```
