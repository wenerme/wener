---
tags:
  - Topic
  - Glossary
---

# Voice

- [FunASR](./funasr.md)
- [Whisper](./whisper.md)
- Kaldi
  - 声学模型+发音词典+语言模型

| abbr. | stand for                             | mean           |
| ----- | ------------------------------------- | -------------- |
| STT   | Speech To Text                        | 语音转文本     |
| TTS   | Text To Speech                        | 文本转语音     |
| ASR   | Automatic Speech Recognition          | 自动语音识别   |
| VAD   | Voice Activity Detection              | 语音活动检测   |
| CTC   | Connectionist Temporal Classification | 连接时序分类   |
| ITN   | Inverse Text Normalization            | 逆文本归一化   |
| TN    | Text Normalization                    | 文本归一化     |
| FST   | Finite State Transducer               | 有限状态转换器 |
| AED   | Automatic Error Detection             | 自动错误检测   |
| FBank | Filter Bank                           | 滤波器组       |
| UTT   | Utterance                             | 话语, 语音片段 |

- ITN - Inverse Text Normalization - 逆文本归一化
  - 将识别出的文本转换为自然语言文本
  - 例如 “一百五十块钱” -> “150元”
  - 例如 “今天是二零二三年十月三日” → “今天是2023年10月3日”
  - 例如 FunASR, NVIDIA NeMo
  - 场景
    - 字幕生成
    - 语音助手
    - 文档生成
    - 客服系统
  - 难点
    - 口语歧义
    - 多语言支持
    - 上下文依赖
    - 模型兼容性 - ITN 必须与 ASR 系统的输出无缝结合，以保证正确的语义理解。
- Punctuation Restoration
  - 为识别出的文本添加合适的标点符号（如逗号、句号）。
  - ASR 通常输出的纯文本没有标点符号，这个模型可以让文本更接近自然书写形式。
- VAD - Voice Activity Detection - 语音活动检测
  - 去掉无效的静音部分
  - 有效划分语音识别会话，避免缓存过多数据
  - 断句
  - 类似 OCR 里的 Detection/Layout Analysis
- ASR - Automatic Speech Recognition - 自动语音识别
  - 识别语音内容
  - 类似 OCR 里的 Recognition
- Speaker Identification / Speaker Diarization
  - 适用于多说话人场景，可以为每段语音标注对应的说话人。
  - 在会议记录、电话录音等多说话人场景中尤为关键。

## Notes

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

# FAQ

## fbank

- FBank - Filter Bank
  - 语音特征
  - 深度学习直接输入
- MFCC - Mel-Frequency Cepstral Coefficients
  - 语音特征
  - 传统语音识别方法
