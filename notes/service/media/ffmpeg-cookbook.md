---
title: FFmpeg Cookbook
tags:
  - Service
  - Media
  - FFmpeg
  - Cookbook
---

# FFmpeg Cookbook

```bash
ffmpeg -i video.mkv -codec copy video.mp4

ffmpeg -i video.mkv -ss 00:00:08.0 -c copy -t 00:01:45.0 output.mkv
```
