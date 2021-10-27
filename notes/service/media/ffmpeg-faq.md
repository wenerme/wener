---
title: FFMpeg FAQ
tags:
  - FAQ
---

# FFMpeg FAQ

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
