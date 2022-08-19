---
title: HEVC
---

# HEVC

```bash
open /Applications/Google\ Chrome\ Canary.app --args --enable-features=PlatformHEVCDecoderSupport
```

- [StaZhu/enable-chromium-hevc-hardware-decoding](https://github.com/StaZhu/enable-chromium-hevc-hardware-decoding)

## is hevc/h265 ready

**NO**

---

- hevc 专利费用高
  - chrome 支持开源 av1
- Intel Skylake Core 6 开始支持解码 - 2015-08
- https://caniuse.com/?search=hevc
- Windows https://www.free-codecs.com/hevc_video_extension_download.htm
- 测试视频 https://www.libde265.org/downloads-videos/
- Google Chromecast 支持 https://developers.google.com/cast/docs/media
- [HEVC media on Apple devices](https://support.apple.com/en-hk/HT207022)

## 浏览器不支持 H.265 / HEVC

因为专利费用过高，目前基本没有浏览器支持 HEVC。

推荐使用 webm 包装。

厂商们联合构建了 [AOMedia](https://aomedia.org/about/) 来反抗 HEVC，使用 AV1 编码。

- Can I Use [hevc](https://caniuse.com/hevc)
  - safari 支持
    - 但是 jellyfin 播放的时候还是转码了
    - 原始视频编码 HEVC Main
- Can I Use [webm](https://caniuse.com/webm/embed/)
- Can I Use [av1](https://caniuse.com/av1)
- [Supported Media for Google Cast](https://developers.google.com/cast/docs/media)

## fMP4-HLS

- Jellyfin 启用后 Safari 支持 HEVC
- fragmented MP4
- https://docs.unified-streaming.com/documentation/package/fmp4-hls.html
- https://docs.unified-streaming.com/documentation/drm/fmp4-hls.html
