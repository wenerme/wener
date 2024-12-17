---
tags:
  - Topic
---

# STT

- [FunASR](./funasr.md)
- [Whisper](./whisper.md)
- Kaldi
  - 声学模型+发音词典+语言模型

| abbr. | stand for                             | mean         |
| ----- | ------------------------------------- | ------------ |
| STT   | Speech To Text                        | 语音转文本   |
| ASR   | Automatic Speech Recognition          | 自动语音识别 |
| VAD   | Voice Activity Detection              | 语音活动检测 |
| CTC   | Connectionist Temporal Classification | 连接时序分类 |



## Notes

- VAD
  - 有效划分语音识别会话，避免缓存过多数据
  - 断句
- 热词
  - 分为 静态、动态
  - 用于识别 二义性、多音字
- 讲话人识别 - Speaker Diarization
  - 识别不同讲话人的语音
  - 识别讲话人的语音特征
- 考虑点
  - 噪音环境
  - 语速
  - 口音
  - 实时性 / 离线性
  - 多通道分离 - 是否需要区分通话双方的讲话内容
    - Speaker Diarization
    - Multi-Channel Separation
