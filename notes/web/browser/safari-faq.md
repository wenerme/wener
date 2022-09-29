---
tags:
  - FAQ
---

# Safari FAQ

## Failed to load resource: Plug-in handled load

- 第一次会发起 byte-range 请求 - 要求服务端支持 byte-range
  - https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/CreatingVideoforSafarioniPhone/CreatingVideoforSafarioniPhone.html#//apple_ref/doc/uid/TP40006514-SW6
- iOS/Safari 期望服务端部分返回媒体，但是正常的文件服务是一次性返回
- ServiceWorker 可能影响 video 使用

```bash
curl -r 0-199 http://example.com/video.mp4 # 测试 byte-range 支持
```

- 也有可能是视频的原因 - 需要 faststart
  - moov atom

```bash
ffmpeg -i in.mp4 -c:a copy -c:v copy -movflags faststart out.mp4

ffmpeg -i in.mp4 -c copy -movflags +faststart out.mp4

ffmpeg -i in.mp4 -map 0 -c:v copy -c:a copy -c:s copy -c:d copy -c:t copy -movflags +faststart out.mp4

# 检测是否存在
# 先出现 moov 则说明有这个 flag
ffmpeg -v trace -i out.mp4 NUL 2>&1 | egrep -m 1 -o -e "type:'(mdat|moov)'"
```

- handbrake
  - web optimize
  - zerolatency
  - fast decode
- -tag:v hvc1
- [How to check if Fast Start is enabled for playback](https://trac.ffmpeg.org/wiki/HowToCheckIfFaststartIsEnabledForPlayback)
- [danielgtaylor/qtfaststart](https://github.com/danielgtaylor/qtfaststart)

---

- https://stackoverflow.com/a/51213384/1870054
- https://bugs.webkit.org/show_bug.cgi?id=184447
- https://github.com/GoogleChrome/workbox/issues/1663
- gitlab pages 有同样问题 https://forum.gitlab.com/t/44691
