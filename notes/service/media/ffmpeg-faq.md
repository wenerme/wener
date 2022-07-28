---
title: FFMpeg FAQ
tags:
  - FAQ
---

# FFMpeg FAQ

## 提取音轨

```bash
# 确认音频信息
ffprobe in.avi

ffmpeg -i in.avi -vn -acodec copy out.aac      # 单音频时
ffmpeg -i in.mkv -map 0:a:3 -c copy out.m4a    # 提取 #3
ffmpeg -i in.mov -map 0:a -c copy out.mov      # 提取所有
ffmpeg -i in.mp4 -q:a 0 -map a -c copy out.aac # 提取 #0 音轨
```

## 添加音轨

```bash
# 替换 #0
ffmpeg -i in.mp4 -i in.wav -map 0:v -map 1:a -c:v copy -shortest out.mp4
# 添加 并设置语言
ffmpeg -i in.mkv -i in.mp3 -map 0 -map 1:a -metadata:s:a:1 language=chi -c:v copy -shortest out.mkv
# 混合
ffmpeg -i in.mkv -i in.m4a -filter_complex "[0:a][1:a]amerge=inputs=2[a]" -map 0:v -map "[a]" -c:v copy -ac 2 -shortest out.mkv
```

## Protocol 'https' not on whitelist 'file,crypto,data'

```bash
ffmpeg -protocol_whitelist file,http,https,tcp,tls,crypto -i MIE.m3u8 -c copy -bsf:a aac_adtstoasc MIE.mp4
```

## FFmpeg Service01.kms key

加密视频

```m3u8
#EXT-X-KEY:MEATHOD=AES-128,URI=""
```

- 以 encrypt-stream.m3u8 一般为阿里云加密,不好解密
- 解密方式
  - [nilaoda/N_m3u8DL-CLI#473](https://github.com/nilaoda/N_m3u8DL-CLI/issues/473)

## 添加字幕

```bash
# 嵌套
# 烧录字幕到视频 -vf subtitles=subtitles.srt
# -vf ass=subtitles.ass
# 单独指定 copy - -c:v copy -c:a copy -c:s mov_text
ffmpeg -i in.mp4 -i in.srt -c copy -c:s mov_text out.mp4


# MKV
# -metadata:s:s:0 language=eng
ffmpeg -i input.mp4 -f srt -i input.srt \
  -map 0:0 -map 0:1 -map 1:0 -c:v copy -c:a copy \
  -c:s srt  output.mkv
```


## Tag hvc1 incompatible with output codec id avc1

```bash
ffmpeg -i in.mp4 -tag:v hvc1 -c:a copy -c:v copy -movflags faststart out.mp4
```
