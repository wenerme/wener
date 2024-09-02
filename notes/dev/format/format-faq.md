---
tags:
  - FAQ
---

# Format FAQ

## Format vs Codec

- Format/格式 - 决定 **文件** 的组织和结构
  - 通常为一种容器
  - 容器变化不会导致实际内容变化
  - 可能存储多种编码数据
  - 可能存储多维度数据 - 音频+视频+字幕
  - 提供 兼容性 和 互操作性
  - 容器格式
    - 脱离于数据
    - 提供元信息 - 作者、标题、版权 - exif
    - 提供不同的访问方式
    - 提供二次压缩、加密
  - 也可能 Codec 也是 Format - 一个容器格式存储单一编码数据
- Codec/编解码器 - 数据的压缩和解压缩
  - 软件/设备 - 可能存在 offload
  - 编码 或 解码 数字数据流 或 信号
  - 压缩和解压数据 -> 以便于存储和传输
  - 数据的一种呈现方式 - 此时和 Format 可互换
    - JSON、YAML
  - 信息 <-> 数据 转化的方式
    - 声音 -> 数据
    - 文字 -> 数据
    - 图像 -> 数据
  - 通常为二进制 - 信息结构严格
  - Codec 过程可能会有信息转换

---

- e.g.
  - codec=opus, format=ogg,webm,mp4

## audio/amr

- 常用于电话录音、语音消息
- 低比特率
- chrome 不支持直接播放
- https://github.com/BenzLeung/benz-amr-recorder
- https://github.com/jpemartins/amr.js
- https://github.com/malcolmyu/amr-js
- https://github.com/alex374/amr-player
- https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs
