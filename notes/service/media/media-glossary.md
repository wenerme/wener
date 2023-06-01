---
tags:
  - Glossary
---

# Media Glossary

- PTS - [Presentation timestamp](https://en.wikipedia.org/wiki/Presentation_timestamp)
- DTS - decoding time stamp
- I - Intra-coded picture - key frame
  - 不依赖前后帧进行压缩
- P - Predicted picture
  - 使用前面帧进行压缩
- B - Bidirectional predicted picture
  - 可使用前后帧进行压缩
- BDMV - blu-ray folder
- WHIP - WebRTC-HTTP ingestion protocol
  - https://github.com/ossrs/ffmpeg-webrtc/pull/1
  - https://news.ycombinator.com/item?id=36130191
- 参考
  - [Video compression picture types](https://en.wikipedia.org/wiki/Video_compression_picture_types)
  - what are pts and dts ? https://stackoverflow.com/a/6044365/1870054

## Audio

- [ABX 测试](https://en.wikipedia.org/wiki/ABX_test)
  - https://abx.digitalfeed.net/
- qaac - QuickTime AAC/ALAC encoder
- CVBR
- TVBR
- AAC-LC / LC-ACC - AAC Low Complexity
  - 主流
  - 常见立体声码率 128-192 kbps
  - 5.1 环绕声码率 320 kbps
- AAC Main
- AAC SSR - AAC Scalable Sampling Rate
- AOT - Audio Object Types
- ADIF - Audio Data Interchange Format
- ADTS - Audio Data Interchange Format

| Qaac (Quicktime) 5.1-48KHz | 2.0-48KHz |
| -------------------------: | --------: |
|       -V 1 AAC-LC 119 Kb/s |   46 Kb/s |
|       -V 9 AAC-LC 136 Kb/s |   53 Kb/s |
|      -V 18 AAC-LC 158 Kb/s |   61 Kb/s |
|      -V 27 AAC-LC 177 Kb/s |   69 Kb/s |
|      -V 36 AAC-LC 198 Kb/s |   74 Kb/s |
|      -V 45 AAC-LC 240 Kb/s |   95 Kb/s |
|      -V 54 AAC-LC 277 Kb/s |  108 Kb/s |
|      -V 64 AAC-LC 314 Kb/s |  120 Kb/s |
|      -V 73 AAC-LC 351 Kb/s |  134 Kb/s |
|      -V 82 AAC-LC 385 Kb/s |  147 Kb/s |
|      -V 91 AAC-LC 450 Kb/s |  173 Kb/s |
|     -V 100 AAC-LC 507 Kb/s |  195 Kb/s |
|     -V 109 AAC-LC 581 Kb/s |  224 Kb/s |
|     -V 118 AAC-LC 638 Kb/s |  247 Kb/s |
|     -V 125 AAC-LC 704 Kb/s |  276 Kb/s |
