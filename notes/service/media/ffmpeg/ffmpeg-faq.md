---
title: FFMpeg FAQ
tags:
  - FAQ
---

# FFMpeg FAQ

:::tip

- ffmpeg 不支持自动创建目录

:::

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
  -c:s srt output.mkv
```

## Tag hvc1 incompatible with output codec id avc1

```bash
ffmpeg -i in.mp4 -tag:v hvc1 -c:a copy -c:v copy -movflags faststart out.mp4
```

## ffprobe durations is different from ffmpeg

## chunk

```bash
ffmpeg -i input.mp4 -c copy -map 0 -segment_time 00:10:00 -f segment -reset_timestamps 1 output%03d.mp4
```

- 没有 `-reset_timestamps 1` 可能导致只有第一个能播放

## 丢弃完全相同帧 {#drop-exact-duplicate-frames}

**mpdecimate**

丢弃与上一帧没有太大差异的帧来减少帧率。主要用于非常低比特率的编码（例如通过拨号调制解调器进行流式传输），但理论上也可以用于修复逆向扫描不正确的电影。

8x8 像素块。

- **max**
  - 设置可以丢弃的最大连续帧数（如果为正数），或者丢弃帧之间的最小间隔（如果为负数）。如果值为 0，则丢弃帧时不考虑之前连续丢弃的帧数。
  - 默认值：0
- **keep**
  - 设置在开始丢弃之前忽略的最大连续相似帧数。如果值为 0，则丢弃帧时不考虑之前连续相似的帧数。
  - 默认值：0
- **hi**
  - 设置丢弃阈值的高值。
  - 默认值：`64*12=768`
  - 最大值：`64*255=16320`
  - 增加会丢弃更多帧
- **lo**
  - 设置丢弃阈值的低值。
  - 默认值：`64*5=320`
- **frac**
  - 设置丢弃阈值的分数值。当 hi 阈值内没有 8x8 块差异超过 hi 且没有超过 frac 块（1 表示整个图像）的差异超过 lo 阈值时，帧是丢弃的候选帧。
  - 默认值：0.33
  - 一张图中多少比例的块可以不同

```bash
# more than 1 pixel value difference to previous frame
ffmpeg -i input.mkv -vf mpdecimate=hi=1:lo=1:frac=1:max=0 output.mkv
```

---

- 有时候需要 -vsync vfr
  - https://superuser.com/a/1792778/242730
- https://www.ffmpeg.org/ffmpeg-all.html#mpdecimate

## frame count


```bash
ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames -of default=nokey=1:noprint_wrappers=1 input.mp4
```
