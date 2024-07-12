---
title: lossless-cut
---

# lossless-cut

- [mifi/lossless-cut](https://github.com/mifi/lossless-cut)
  - GPLv2, TS, ffmpeg
  - 无损裁剪 - 不支持除此以外的其他视频编辑功能，因此不需要重新编码
  - segments: MP4/MKV chapter marks, Text file, YouTube, CSV, CUE, XML (DaVinci, Final Cut Pro)
  - 有 CLI 和 HTTP API

| key           | for            |
| ------------- | -------------- |
| I             | cut start      |
| O             | cut end        |
| ,             | previous frame |
| .             | next frame     |
| SHIFT + LEFT  | jump cut start |
| SHIFT + RIGHT | jump cut end   |

```ts
export interface LLCData {
  version: number;
  mediaFileName: string;
  cutSegments: CutSegment[];
}

export interface CutSegment {
  start: number;
  end: number;
  name: string;
}
```
